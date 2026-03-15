"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";

/* ── Shared mouse state (avoid re-renders) ───── */
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

/* ── Fire Core (origin) ──────────────────────── */

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
    // tight upward rise
    pos.y += t * 0.55;
    // subtle horizontal turbulence, tighter at base, wider at top
    float spread = t * 0.1;
    pos.x += sin(t * 12.56 + aLife * 30.0) * spread;
    pos.z += cos(t * 10.0 + aLife * 25.0) * spread;
    // scale: quick fade in, gradual fade out
    float scale = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.25, t);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * scale * (180.0 / -mvPosition.z);
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
    // soft gaussian-ish falloff
    float alpha = exp(-d * d * 3.0);
    float fade = smoothstep(0.0, 0.08, vT) * smoothstep(1.0, 0.25, vT);
    // realistic color ramp: white-hot -> yellow -> orange -> red -> dark
    vec3 white = vec3(1.0, 0.98, 0.9);
    vec3 yellow = vec3(1.0, 0.8, 0.2);
    vec3 orange = vec3(1.0, 0.4, 0.05);
    vec3 red = vec3(0.7, 0.08, 0.0);
    vec3 col = mix(white, yellow, smoothstep(0.0, 0.2, vT));
    col = mix(col, orange, smoothstep(0.15, 0.5, vT));
    col = mix(col, red, smoothstep(0.45, 0.85, vT));
    // flicker
    float flicker = 0.85 + 0.15 * sin(uTime * 15.0 + vLife * 50.0);
    alpha *= fade * flicker * 0.9;
    gl_FragColor = vec4(col, alpha);
  }
`;

const FIRE_COUNT = 300;

function FireCore() {
  const matRef = React.useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes, lives, speeds } = React.useMemo(() => {
    const pos = new Float32Array(FIRE_COUNT * 3);
    const sz = new Float32Array(FIRE_COUNT);
    const lf = new Float32Array(FIRE_COUNT);
    const sp = new Float32Array(FIRE_COUNT);
    for (let i = 0; i < FIRE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * 0.16;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.4) * 0.1;
      pos[i * 3 + 2] = Math.sin(angle) * r;
      sz[i] = 0.35 + Math.random() * 0.45;
      lf[i] = Math.random();
      sp[i] = 0.35 + Math.random() * 0.25;
    }
    return { positions: pos, sizes: sz, lives: lf, speeds: sp };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-aLife" args={[lives, 1]} />
          <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
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

      {/* Incandescent core */}
      <mesh>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshBasicMaterial
          color="#fffaf0"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshBasicMaterial
          color="#FF8800"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer warm halo */}
      <mesh>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshBasicMaterial
          color="#FF4400"
          transparent
          opacity={0.04}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ── Orbital Glass Rings (X / Y / Z axes) ───── */
function OrbitalRings() {
  const xOrbit = React.useRef<THREE.Group>(null);
  const yOrbit = React.useRef<THREE.Group>(null);
  const zOrbit = React.useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (xOrbit.current) xOrbit.current.rotation.y = t * 0.6;
    if (yOrbit.current) yOrbit.current.rotation.z = t * -0.8;
    if (zOrbit.current) zOrbit.current.rotation.x = t * 0.7;
  });

  return (
    <group>
      <group ref={xOrbit}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[2.7, 0.18, 24, 64]} />
          <MeshTransmissionMaterial
            color="#ffffff"
            thickness={0.2}
            roughness={0}
            transmission={1}
            ior={1.3}
            chromaticAberration={0.02}
            backside
            samples={2}
            resolution={512}
          />
        </mesh>
      </group>

      <group ref={yOrbit}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.2, 24, 64]} />
          <MeshTransmissionMaterial
            color="#ffffff"
            thickness={0.2}
            roughness={0}
            transmission={1}
            ior={1.3}
            chromaticAberration={0.02}
            backside
            samples={2}
            resolution={256}
          />
        </mesh>
      </group>

      <group ref={zOrbit}>
        <mesh>
          <torusGeometry args={[1.4, 0.2, 24, 64]} />
          <MeshTransmissionMaterial
            color="#1e293b"
            thickness={0.2}
            roughness={0}
            transmission={0.95}
            ior={1.3}
            chromaticAberration={0.02}
            backside
            samples={2}
            resolution={256}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ── Star field ─────────────────────────────── */
function StarField({ count = 600 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8ab4f8"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Full scene with parallax ────────────────── */
function SceneContent() {
  const orreryRef = React.useRef<THREE.Group>(null);
  usePointerParallax();

  useFrame(() => {
    if (!orreryRef.current) return;
    orreryRef.current.rotation.y +=
      (pointer.x * 1.2 - orreryRef.current.rotation.y) * 0.1;
    orreryRef.current.rotation.x +=
      (pointer.y * 0.8 - orreryRef.current.rotation.x) * 0.1;
  });

  return (
    <>
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <ambientLight intensity={0.4} />
      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        color="#FF9933"
        distance={10}
        decay={2}
      />

      <group ref={orreryRef}>
        <StarField count={400} />
        <FireCore />
        <OrbitalRings />
      </group>

      <Environment files="/potsdamer_platz_1k.hdr" />
    </>
  );
}

export function HeroScene() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [ready, setReady] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

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
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!ready) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        performance={{ min: 0.5 }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
