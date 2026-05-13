"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

type NetworkInformation = { effectiveType?: string };

function getClientRenderMode() {
  const params = new URLSearchParams(window.location.search);
  const forcedConstrained = params.get("constrained") === "1";
  const lowConcurrency = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMemory =
    "deviceMemory" in navigator &&
    Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory) <= 4;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const slowNetwork =
    connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
  return {
    constrained: forcedConstrained || lowConcurrency || lowMemory || slowNetwork,
    forceDisableWebgl: forcedConstrained,
  };
}

/* ── Shared mouse state ──────────────────────── */
const pointer = { x: 0, y: 0 };

function usePointerParallax() {
  React.useEffect(() => {
    const update = (x: number, y: number) => {
      pointer.x = (x / window.innerWidth) * 2 - 1;
      pointer.y = -(y / window.innerHeight) * 2 + 1;
    };
    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) update(t.clientX, t.clientY);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);
}

/* ── Forge fire (origin energy source) ──────── */

const fireVertexShader = `
  attribute float aSize;
  attribute float aLife;
  attribute float aSpeed;
  uniform float uTime;
  varying float vLife;
  varying float vT;

  void main() {
    vLife = aLife;
    float t = fract(uTime * aSpeed + aLife);
    vT = t;
    vec3 pos = position;
    pos.y += t * 1.4;
    float spread = t * 0.14;
    pos.x += sin(t * 12.56 + aLife * 30.0) * spread;
    pos.z += cos(t * 10.0 + aLife * 25.0) * spread;
    float scale = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.25, t);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * scale * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fireFragmentShader = `
  varying float vLife;
  varying float vT;
  uniform float uTime;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float alpha = exp(-d * d * 3.0);
    float fade = smoothstep(0.0, 0.08, vT) * smoothstep(1.0, 0.25, vT);
    vec3 white  = vec3(1.0, 0.98, 0.9);
    vec3 yellow = vec3(1.0, 0.80, 0.2);
    vec3 orange = vec3(1.0, 0.40, 0.05);
    vec3 red    = vec3(0.7, 0.08, 0.0);
    vec3 col = mix(white,  yellow, smoothstep(0.0,  0.2,  vT));
    col      = mix(col,    orange, smoothstep(0.15, 0.5,  vT));
    col      = mix(col,    red,    smoothstep(0.45, 0.85, vT));
    float flicker = 0.85 + 0.15 * sin(uTime * 15.0 + vLife * 50.0);
    alpha *= fade * flicker * 0.92;
    gl_FragColor = vec4(col, alpha);
  }
`;

const FIRE_COUNT = 350;

function FireCore() {
  const matRef = React.useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes, lives, speeds } = React.useMemo(() => {
    const pos = new Float32Array(FIRE_COUNT * 3);
    const sz  = new Float32Array(FIRE_COUNT);
    const lf  = new Float32Array(FIRE_COUNT);
    const sp  = new Float32Array(FIRE_COUNT);
    for (let i = 0; i < FIRE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * 0.18;
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.4) * 0.12;
      pos[i * 3 + 2] = Math.sin(angle) * r;
      sz[i] = 0.4 + Math.random() * 0.5;
      lf[i] = Math.random();
      sp[i] = 0.3 + Math.random() * 0.28;
    }
    return { positions: pos, sizes: sz, lives: lf, speeds: sp };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize"    args={[sizes,     1]} />
          <bufferAttribute attach="attributes-aLife"    args={[lives,     1]} />
          <bufferAttribute attach="attributes-aSpeed"   args={[speeds,    1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          vertexShader={fireVertexShader}
          fragmentShader={fireFragmentShader}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* White-hot core */}
      <mesh>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshBasicMaterial color="#fffaf0" transparent opacity={0.95} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshBasicMaterial color="#FF8800" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshBasicMaterial color="#FF4400" transparent opacity={0.035} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ── The build sequence ──────────────────────── */
/*   point cloud → wireframe → flat shaded → lit hot metal → dissolve   */

const CYCLE = 18; // seconds per full loop

// Stage timing (with crossfade overlaps):
//  0  – 3.5  Points   (gather 0–1s, hold 1–2.5s, fade 2.5–3.5s; re-emerge 14–18s)
//  2.5– 7    Wireframe (fade in 2.5–4s, hold 4–6s, fade 6–7s)
//  6  – 11   Flat      (fade in 6–7.5s, hold 7.5–10s, fade 10–11s)
//  10 – 18   Lit       (fade in 10–11.5s, hold 11.5–14s, dissolve 14–18s)

function ForgedObject({ lowPower }: { lowPower: boolean }) {
  const groupRef   = React.useRef<THREE.Group>(null);
  const tRef       = React.useRef(0);

  const pointsMatRef = React.useRef<THREE.PointsMaterial>(null);
  const edgesMatRef  = React.useRef<THREE.LineBasicMaterial>(null);
  const flatMatRef   = React.useRef<THREE.MeshStandardMaterial>(null);
  const litMatRef    = React.useRef<THREE.MeshStandardMaterial>(null);
  const glowMatRef   = React.useRef<THREE.MeshBasicMaterial>(null);

  const pointsMeshRef = React.useRef<THREE.Points>(null);
  const edgesMeshRef  = React.useRef<THREE.LineSegments>(null);
  const flatMeshRef   = React.useRef<THREE.Mesh>(null);
  const litMeshRef    = React.useRef<THREE.Mesh>(null);
  const glowMeshRef   = React.useRef<THREE.Mesh>(null);

  const geo      = React.useMemo(() => new THREE.IcosahedronGeometry(1.6, 1),   []);
  const edgesGeo = React.useMemo(() => new THREE.EdgesGeometry(geo),             [geo]);
  const glowGeo  = React.useMemo(() => new THREE.IcosahedronGeometry(1.78, 1),  []);

  useFrame(({ clock }, delta) => {
    tRef.current = (tRef.current + delta) % CYCLE;
    const t = tRef.current;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x  = Math.sin(clock.elapsedTime * 0.07) * 0.12;
    }

    const c = (v: number) => Math.max(0, Math.min(1, v));
    const e = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

    // Points
    let pO = 0;
    if      (t < 1)            pO = e(c(t));
    else if (t < 2.5)          pO = 1;
    else if (t < 3.5)          pO = e(c(1 - (t - 2.5)));
    else if (t >= 14)          pO = e(c((t - 14) / 3.2));

    // Wireframe
    let wO = 0;
    if (t >= 2.5 && t < 7) {
      if      (t < 4)   wO = e(c((t - 2.5) / 1.5));
      else if (t < 6)   wO = 1;
      else              wO = e(c(1 - (t - 6)));
    }

    // Flat
    let fO = 0;
    if (t >= 6 && t < 11) {
      if      (t < 7.5) fO = e(c((t - 6) / 1.5));
      else if (t < 10)  fO = 1;
      else              fO = e(c(1 - (t - 10)));
    }

    // Lit + glow halo
    let lO = 0;
    if (t >= 10) {
      if      (t < 11.5) lO = e(c((t - 10) / 1.5));
      else if (t < 14)   lO = 1;
      else               lO = e(c(1 - (t - 14) / 4.0));
    }

    if (pointsMatRef.current) {
      pointsMatRef.current.opacity = pO;
      if (pointsMeshRef.current) pointsMeshRef.current.visible = pO > 0.01;
    }
    if (edgesMatRef.current) {
      edgesMatRef.current.opacity = wO;
      if (edgesMeshRef.current) edgesMeshRef.current.visible = wO > 0.01;
    }
    if (flatMatRef.current) {
      flatMatRef.current.opacity = fO;
      if (flatMeshRef.current) flatMeshRef.current.visible = fO > 0.01;
    }
    if (litMatRef.current) {
      litMatRef.current.opacity = lO;
      if (litMeshRef.current) litMeshRef.current.visible = lO > 0.01;
      if (lO > 0.01) {
        const pulse = 0.32 + Math.sin(clock.elapsedTime * 2.3) * 0.13;
        litMatRef.current.emissiveIntensity = pulse * Math.min(lO * 1.4, 1);
      }
    }
    if (glowMatRef.current && glowMeshRef.current) {
      glowMatRef.current.opacity = lO * 0.09;
      glowMeshRef.current.visible = lO > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Stage 0 — Point cloud */}
      <points ref={pointsMeshRef} geometry={geo}>
        <pointsMaterial
          ref={pointsMatRef}
          color="#ff8030"
          size={lowPower ? 0.058 : 0.044}
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Stage 1 — Wireframe */}
      <lineSegments ref={edgesMeshRef} geometry={edgesGeo}>
        <lineBasicMaterial
          ref={edgesMatRef}
          color="#ff6522"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Stage 2 — Flat shaded */}
      <mesh ref={flatMeshRef} geometry={geo}>
        <meshStandardMaterial
          ref={flatMatRef}
          color="#c03010"
          flatShading
          transparent
          opacity={0}
          roughness={0.88}
          metalness={0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Stage 3 — Lit hot metal */}
      <mesh ref={litMeshRef} geometry={geo}>
        <meshStandardMaterial
          ref={litMatRef}
          color="#ff4000"
          emissive="#ff3000"
          emissiveIntensity={0.35}
          transparent
          opacity={0}
          roughness={0.22}
          metalness={0.72}
          depthWrite={false}
        />
      </mesh>

      {/* Glow halo around lit mesh */}
      {!lowPower && (
        <mesh ref={glowMeshRef} geometry={glowGeo}>
          <meshBasicMaterial
            ref={glowMatRef}
            color="#ff4000"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}

/* ── Starfield ───────────────────────────────── */
function StarField({ count = 300 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r     = 9 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8ab4f8"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Full scene ──────────────────────────────── */
function SceneContent({ lowPower }: { lowPower: boolean }) {
  const sceneRef = React.useRef<THREE.Group>(null);
  usePointerParallax();

  useFrame(() => {
    if (!sceneRef.current) return;
    sceneRef.current.rotation.y += (pointer.x * 0.9 - sceneRef.current.rotation.y) * 0.06;
    sceneRef.current.rotation.x += (pointer.y * 0.6 - sceneRef.current.rotation.x) * 0.06;
  });

  return (
    <>
      {/* Warm light from the forge below */}
      <pointLight position={[0, -0.6, 0]} color="#ff7700" intensity={3} distance={12} decay={2} />
      {/* Cold fill — "engine monitor" side */}
      <pointLight position={[-4, 3, 4]} color="#4488ff" intensity={0.8} distance={20} decay={2} />
      {/* Key directional */}
      <directionalLight position={[3, 5, 3]} intensity={1.2} />
      <ambientLight intensity={0.25} />

      <group ref={sceneRef}>
        <StarField count={lowPower ? 120 : 300} />
        {/* Fire at base of object */}
        <group position={[0, -1.2, 0]}>
          <FireCore />
        </group>
        {/* The forged object, centered slightly above fire */}
        <ForgedObject lowPower={lowPower} />
      </group>
    </>
  );
}

/* ── Canvas + detection ──────────────────────── */
export function HeroScene() {
  const containerRef    = React.useRef<HTMLDivElement>(null);
  const [ready,        setReady]        = React.useState(false);
  const [visible,      setVisible]      = React.useState(true);
  const [tabVisible,   setTabVisible]   = React.useState(true);
  const [lowPower,     setLowPower]     = React.useState(false);
  const [disableWebgl, setDisableWebgl] = React.useState(false);

  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setReady(!!gl);
  }, []);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const onVisibilityChange = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibilityChange);
    onVisibilityChange();
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  React.useEffect(() => {
    const mode = getClientRenderMode();
    setLowPower(mode.constrained);
    setDisableWebgl(mode.forceDisableWebgl);
  }, []);

  if (!ready || disableWebgl) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: lowPower ? "default" : "high-performance" }}
        dpr={[1, lowPower ? 1 : 1.5]}
        frameloop={visible && tabVisible ? "always" : "never"}
        performance={{ min: 0.5 }}
      >
        <SceneContent lowPower={lowPower} />
      </Canvas>
    </div>
  );
}
