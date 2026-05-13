"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

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

/* ── Mouse parallax ────────────────────────────── */
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

/* ── Deterministic PRNG so the greeble layout is stable ─ */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── HDR colors (>1.0) so emissives bloom ───────── */
const WING_RED   = new THREE.Color(3.6, 0.45, 0.20);
const WING_CYAN  = new THREE.Color(0.25, 1.8, 2.8);
const COCKPIT_C  = new THREE.Color(0.6, 1.6, 2.4);

/* ── Running lights shader (hull dots) ──────────── */
const lightsVert = /* glsl */ `
  attribute float aPhase;
  attribute float aRate;
  attribute float aSize;
  attribute vec3  aColor;
  uniform   float uTime;
  varying   vec3  vColor;
  varying   float vAlpha;

  void main() {
    float pulse = 0.55 + 0.45 * sin(uTime * aRate + aPhase);
    vAlpha = pulse;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (1.8 + pulse * 2.4) * aSize * (44.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const lightsFrag = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float a = exp(-d * d * 2.6) * vAlpha;
    // Push into HDR so bloom catches it
    gl_FragColor = vec4(vColor * (1.0 + vAlpha * 0.8), a);
  }
`;

/* ── Engine exhaust shader (hot disk) ───────────── */
const exhaustVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const exhaustFrag = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  varying vec2  vUv;
  void main() {
    vec2 p = vUv - 0.5;
    float d = length(p) * 2.0;
    if (d > 1.0) discard;
    float core  = pow(1.0 - d, 3.4);
    float outer = pow(1.0 - d, 1.3);
    float flick = 0.85 + 0.15 * sin(uTime * 13.0 + uSeed * 17.3);
    // HDR — core is hot white-blue, edge orange
    vec3 col = mix(
      vec3(1.0, 0.45, 0.10),
      vec3(2.6, 2.0, 1.4),
      core
    );
    float alpha = (outer * 0.55 + core * 1.2) * flick;
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ── Ship — procedural sci-fi vessel ─────────────── */
function Ship({ lowPower }: { lowPower: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const lightsMatRef = React.useRef<THREE.ShaderMaterial>(null);
  const exhaust1Ref = React.useRef<THREE.ShaderMaterial>(null);
  const exhaust2Ref = React.useRef<THREE.ShaderMaterial>(null);
  const exhaust3Ref = React.useRef<THREE.ShaderMaterial>(null);

  /* Greebles: small panel boxes scattered along the hull */
  const greebleInstance = React.useMemo(() => {
    const count = lowPower ? 44 : 90;
    const rng = mulberry32(0xc0ffee);
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: "#2a3239",
      roughness: 0.55,
      metalness: 0.85,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();

    for (let i = 0; i < count; i++) {
      const u = rng();
      const x = (u - 0.5) * 3.6 - 0.15; // mostly along the fuselage
      const taper = Math.max(0.42, Math.cos((Math.abs(x) / 2.4) * 0.85));
      const side = Math.floor(rng() * 6);
      const w = 0.07 + rng() * 0.18;
      const h = 0.04 + rng() * 0.14;
      const d = 0.07 + rng() * 0.18;
      const hullR = 0.42 * taper;
      let y = 0,
        z = 0;

      if (side < 2) {
        y =  hullR + h * 0.46;
        z = (rng() - 0.5) * 0.58 * taper;
      } else if (side < 4) {
        y = -hullR - h * 0.46;
        z = (rng() - 0.5) * 0.58 * taper;
      } else if (side === 4) {
        z = -hullR - d * 0.46;
        y = (rng() - 0.5) * 0.48 * taper;
      } else {
        z =  hullR + d * 0.46;
        y = (rng() - 0.5) * 0.48 * taper;
      }

      m4.compose(
        new THREE.Vector3(x, y, z),
        q.setFromEuler(new THREE.Euler(0, rng() * 0.18 - 0.09, 0)),
        new THREE.Vector3(w, h, d),
      );
      mesh.setMatrixAt(i, m4);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }, [lowPower]);

  /* Running lights — points along hull + wings */
  const lightsGeom = React.useMemo(() => {
    const hullCount = lowPower ? 18 : 32;
    const wingCount = 6; // 3 per wing, leading edge
    const count = hullCount + wingCount;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const rates = new Float32Array(count);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const rng = mulberry32(0xbadf00d);

    // Hull running lights
    for (let i = 0; i < hullCount; i++) {
      const u = (i + rng() * 0.5) / hullCount;
      const x = (u - 0.5) * 4.2 - 0.15;
      const taper = Math.max(0.45, Math.cos((Math.abs(x) / 2.3) * 0.85));
      const r = 0.50 * taper;
      const edge = i % 4;
      let y = 0,
        z = 0;
      switch (edge) {
        case 0: y =  r * 0.96; z = -r * 0.32; break;
        case 1: y = -r * 0.96; z = -r * 0.32; break;
        case 2: y =  r * 0.96; z =  r * 0.32; break;
        case 3: y = -r * 0.96; z =  r * 0.32; break;
      }
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      phases[i] = rng() * Math.PI * 2;
      rates[i] = 1.2 + rng() * 1.6;
      sizes[i] = 1.0;

      const c = rng();
      if (c < 0.60) {
        // cool cyan — most common
        colors[i * 3]     = 0.40;
        colors[i * 3 + 1] = 0.82;
        colors[i * 3 + 2] = 1.0;
      } else if (c < 0.92) {
        // warm amber
        colors[i * 3]     = 1.0;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 0.12;
      } else {
        // red beacon
        colors[i * 3]     = 1.0;
        colors[i * 3 + 1] = 0.18;
        colors[i * 3 + 2] = 0.10;
      }
    }

    // Wing running lights — 3 per wing along the leading edge
    for (let w = 0; w < 2; w++) {
      const zSign = w === 0 ? 1 : -1;
      for (let j = 0; j < 3; j++) {
        const i = hullCount + w * 3 + j;
        const t = (j + 0.5) / 3; // 0..1 across wing span
        positions[i * 3]     = -0.85 + (1 - t) * 0.4; // sweep back
        positions[i * 3 + 1] = -0.05;
        positions[i * 3 + 2] = zSign * (0.65 + t * 0.80);
        phases[i] = rng() * Math.PI * 2;
        rates[i] = 1.4;
        sizes[i] = 1.15;
        colors[i * 3]     = 0.40;
        colors[i * 3 + 1] = 0.82;
        colors[i * 3 + 2] = 1.0;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aPhase",   new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("aRate",    new THREE.BufferAttribute(rates, 1));
    geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aColor",   new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [lowPower]);

  const lightsUniforms = React.useMemo(
    () => ({ uTime: { value: 0 } }),
    [],
  );
  const exhaustU1 = React.useMemo(
    () => ({ uTime: { value: 0 }, uSeed: { value: 0.31 } }),
    [],
  );
  const exhaustU2 = React.useMemo(
    () => ({ uTime: { value: 0 }, uSeed: { value: 0.67 } }),
    [],
  );
  const exhaustU3 = React.useMemo(
    () => ({ uTime: { value: 0 }, uSeed: { value: 0.92 } }),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.085;
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.42) * 0.06;
    }
    if (lightsMatRef.current) {
      lightsMatRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
    if (exhaust1Ref.current) exhaust1Ref.current.uniforms.uTime.value = clock.elapsedTime;
    if (exhaust2Ref.current) exhaust2Ref.current.uniforms.uTime.value = clock.elapsedTime;
    if (exhaust3Ref.current) exhaust3Ref.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.18, -0.55, 0.05]}
      position={[0.15, 0.15, 0]}
      scale={0.66}
    >
      {/* Engine block (rear) */}
      <mesh position={[-1.95, 0, 0]}>
        <boxGeometry args={[0.95, 0.80, 1.10]} />
        <meshStandardMaterial color="#1a2028" roughness={0.50} metalness={0.86} />
      </mesh>

      {/* Main fuselage cylinder — axis along X */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 3.2, 14]} />
        <meshStandardMaterial color="#1c232c" roughness={0.48} metalness={0.88} />
      </mesh>

      {/* Nose cone */}
      <mesh rotation={[0, 0, -Math.PI / 2]} position={[1.95, 0, 0]}>
        <coneGeometry args={[0.42, 1.10, 14]} />
        <meshStandardMaterial color="#1c232c" roughness={0.48} metalness={0.88} />
      </mesh>

      {/* Dorsal plating */}
      <mesh position={[-0.20, 0.45, 0]}>
        <boxGeometry args={[2.85, 0.10, 0.78]} />
        <meshStandardMaterial color="#252c34" roughness={0.55} metalness={0.85} />
      </mesh>
      {/* Ventral plating */}
      <mesh position={[-0.20, -0.45, 0]}>
        <boxGeometry args={[2.80, 0.08, 0.62]} />
        <meshStandardMaterial color="#252c34" roughness={0.55} metalness={0.85} />
      </mesh>

      {/* Bridge tower — two stacked boxes, forward of mid */}
      <mesh position={[0.50, 0.62, 0]}>
        <boxGeometry args={[0.72, 0.28, 0.55]} />
        <meshStandardMaterial color="#1f262e" roughness={0.50} metalness={0.86} />
      </mesh>
      <mesh position={[0.55, 0.84, 0]}>
        <boxGeometry args={[0.36, 0.18, 0.40]} />
        <meshStandardMaterial color="#181c22" roughness={0.50} metalness={0.86} />
      </mesh>
      {/* Cockpit canopy strip — emissive cyan */}
      <mesh position={[0.78, 0.84, 0]}>
        <boxGeometry args={[0.10, 0.08, 0.30]} />
        <meshBasicMaterial color={COCKPIT_C} toneMapped={false} />
      </mesh>

      {/* Wings — port and starboard, swept */}
      <mesh position={[-0.55, -0.05, 1.10]} rotation={[0, 0.22, 0]}>
        <boxGeometry args={[1.50, 0.06, 0.90]} />
        <meshStandardMaterial color="#222931" roughness={0.55} metalness={0.85} />
      </mesh>
      <mesh position={[-0.55, -0.05, -1.10]} rotation={[0, -0.22, 0]}>
        <boxGeometry args={[1.50, 0.06, 0.90]} />
        <meshStandardMaterial color="#222931" roughness={0.55} metalness={0.85} />
      </mesh>

      {/* Wing-tip beacons (HDR) */}
      <mesh position={[-0.78, -0.05, 1.52]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial color={WING_RED} toneMapped={false} />
      </mesh>
      <mesh position={[-0.78, -0.05, -1.52]}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial color={WING_CYAN} toneMapped={false} />
      </mesh>

      {/* Engine nozzle rings — black metal cylinders surrounding the exhausts */}
      <mesh position={[-2.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.21, 0.20, 14, 1, true]} />
        <meshStandardMaterial color="#13181e" roughness={0.40} metalness={0.92} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-2.43, 0.28, 0.36]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.14, 0.16, 12, 1, true]} />
        <meshStandardMaterial color="#13181e" roughness={0.40} metalness={0.92} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-2.43, 0.28, -0.36]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.14, 0.16, 12, 1, true]} />
        <meshStandardMaterial color="#13181e" roughness={0.40} metalness={0.92} side={THREE.DoubleSide} />
      </mesh>

      {/* Greebles — instanced panel boxes */}
      <primitive object={greebleInstance} />

      {/* Running lights */}
      <points geometry={lightsGeom}>
        <shaderMaterial
          ref={lightsMatRef}
          vertexShader={lightsVert}
          fragmentShader={lightsFrag}
          uniforms={lightsUniforms}
          transparent
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Engine exhausts — additive disks behind the nozzles */}
      <mesh position={[-2.56, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.46, 0.46]} />
        <shaderMaterial
          ref={exhaust1Ref}
          vertexShader={exhaustVert}
          fragmentShader={exhaustFrag}
          uniforms={exhaustU1}
          transparent
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-2.54, 0.28, 0.36]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.30, 0.30]} />
        <shaderMaterial
          ref={exhaust2Ref}
          vertexShader={exhaustVert}
          fragmentShader={exhaustFrag}
          uniforms={exhaustU2}
          transparent
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-2.54, 0.28, -0.36]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.30, 0.30]} />
        <shaderMaterial
          ref={exhaust3Ref}
          vertexShader={exhaustVert}
          fragmentShader={exhaustFrag}
          uniforms={exhaustU3}
          transparent
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Engine glow point lights — illuminate hull from behind */}
      <pointLight position={[-2.80, 0,    0]} color="#ff7026" intensity={1.6} distance={4.0} decay={2} />
      <pointLight position={[-2.80, 0.28, 0]} color="#ff9040" intensity={0.7} distance={2.2} decay={2} />
    </group>
  );
}

/* ── Starfield ───────────────────────────────── */
function Stars({ count }: { count: number }) {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 12 + Math.random() * 24;
      const t = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3]     = r * Math.sin(phi) * Math.cos(t);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(t);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9bbfff"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Scene ───────────────────────────────────── */
function SceneContent({ lowPower }: { lowPower: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  usePointerParallax();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (pointer.x * 0.40 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (pointer.y * 0.25 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <>
      {/* Warm fill — like dock lights from below-right */}
      <pointLight position={[2, -3, 2]}  color="#ff8a3a" intensity={1.1} distance={14} decay={2} />
      {/* Cool key light — engine-bay overhead */}
      <pointLight position={[-5, 5, 4]}  color="#5aa0ff" intensity={1.3} distance={22} decay={2} />
      {/* Soft directional for hull definition */}
      <directionalLight position={[3, 4, 6]} intensity={0.55} />
      {/* Faint rim from behind */}
      <pointLight position={[-2, 2, -6]} color="#3a5a9a" intensity={0.6} distance={20} decay={2} />
      <ambientLight intensity={0.12} />

      <group ref={groupRef}>
        <Stars count={lowPower ? 160 : 360} />
        <Ship lowPower={lowPower} />
      </group>

      {/* Tight, intentional bloom — only hot things glow */}
      {!lowPower && (
        <EffectComposer>
          <Bloom
            intensity={0.85}
            kernelSize={KernelSize.MEDIUM}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.30}
          />
        </EffectComposer>
      )}
    </>
  );
}

/* ── Canvas + detection ──────────────────────── */
export function HeroScene() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [ready, setReady] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [tabVisible, setTabVisible] = React.useState(true);
  const [lowPower, setLowPower] = React.useState(false);
  const [disableWebgl, setDisableWebgl] = React.useState(false);

  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    setReady(!!gl);
  }, []);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const onChange = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    onChange();
    return () => document.removeEventListener("visibilitychange", onChange);
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
        camera={{ position: [0, 0.6, 8], fov: 46 }}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: lowPower ? "default" : "high-performance",
        }}
        dpr={[1, lowPower ? 1 : 1.5]}
        frameloop={visible && tabVisible ? "always" : "never"}
        performance={{ min: 0.5 }}
      >
        <SceneContent lowPower={lowPower} />
      </Canvas>
    </div>
  );
}
