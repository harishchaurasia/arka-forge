"use client";

import * as React from "react";
import * as THREE from "three";

let Canvas: any;
let useFrame: any;

if (typeof window !== "undefined") {
  try {
    const r3f = require("@react-three/fiber");
    Canvas = r3f.Canvas;
    useFrame = r3f.useFrame;
  } catch (e) {
    console.warn("Failed to load @react-three/fiber", e);
  }
}

/* ── Star field ─────────────────────────────── */
function StarField({ count = 1200 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);

  const [positions, sizes] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell (radius 6–18)
      const r = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.5 + Math.random() * 1.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.008;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.005) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8ab4f8"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Nebula glow layers ─────────────────────── */
function NebulaGlow() {
  const ref = React.useRef<THREE.Group>(null);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.015;
    }
  });

  return (
    <group ref={ref}>
      {/* Large ambient glow */}
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#1d4ed8"
          transparent
          opacity={0.03}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Mid glow */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.045}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Inner haze */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.06}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ── Orbital rings ──────────────────────────── */
function OrbitalRings() {
  const ring1 = React.useRef<THREE.Mesh>(null);
  const ring2 = React.useRef<THREE.Mesh>(null);
  const ring3 = React.useRef<THREE.Mesh>(null);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    const t = clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.15;
      ring1.current.rotation.z = t * 0.08;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.2;
      ring2.current.rotation.x = t * 0.1;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.18;
      ring3.current.rotation.y = t * 0.12;
    }
  });

  return (
    <group scale={1.3}>
      {/* Outer ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.8, 0.12, 32, 128]} />
        <meshStandardMaterial
          color="#4d9af5"
          emissive="#4d9af5"
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Middle ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[2.1, 0.09, 32, 128]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          roughness={0.25}
          metalness={0.35}
        />
      </mesh>

      {/* Inner ring */}
      <mesh ref={ring3}>
        <torusGeometry args={[1.4, 0.07, 32, 100]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#93c5fd"
          emissiveIntensity={0.4}
          transparent
          opacity={0.75}
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>

      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.28, 48, 48]} />
        <meshStandardMaterial
          color="#dbeafe"
          emissive="#dbeafe"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Core glow bloom */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color="#4d9af5"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ── Full scene ─────────────────────────────── */
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-6, -6, -8]} intensity={0.8} color="#4d9af5" />
      <pointLight position={[0, 0, 6]} intensity={0.5} color="#93c5fd" />

      <StarField count={1400} />
      <NebulaGlow />
      <OrbitalRings />
    </>
  );
}

export function HeroScene() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const ok = !!gl && typeof Canvas !== "undefined" && typeof useFrame !== "undefined";
    setReady(ok);
  }, []);

  if (!ready || !Canvas) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
