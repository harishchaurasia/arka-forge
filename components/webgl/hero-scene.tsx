"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";

/* ── Shared mouse state (avoid re-renders) ───── */
const pointer = { x: 0, y: 0 };

function useMouseParallax() {
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}

/* ── Saffron Sun (origin) ────────────────────── */
function GlassSun() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#FF9933"
          emissive="#FF7700"
          emissiveIntensity={3}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshBasicMaterial
          color="#FF9933"
          transparent
          opacity={0.08}
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
          <torusGeometry args={[2.7, 0.18, 48, 100]} />
          <MeshTransmissionMaterial
            color="#ffffff"
            thickness={0.2}
            roughness={0}
            transmission={1}
            ior={1.3}
            chromaticAberration={0.03}
            backside
            samples={4}
            resolution={512}
          />
        </mesh>
      </group>

      <group ref={yOrbit}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.2, 48, 100]} />
          <MeshTransmissionMaterial
            color="#ffffff"
            thickness={0.2}
            roughness={0}
            transmission={1}
            ior={1.3}
            chromaticAberration={0.03}
            backside
            samples={4}
            resolution={512}
          />
        </mesh>
      </group>

      <group ref={zOrbit}>
        <mesh>
          <torusGeometry args={[1.4, 0.2, 48, 100]} />
          <MeshTransmissionMaterial
            color="#1e293b"
            thickness={0.2}
            roughness={0}
            transmission={0.95}
            ior={1.3}
            chromaticAberration={0.02}
            backside
            samples={4}
            resolution={512}
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
  useMouseParallax();

  useFrame(() => {
    if (!orreryRef.current) return;
    orreryRef.current.rotation.y +=
      (pointer.x * 0.6 - orreryRef.current.rotation.y) * 0.08;
    orreryRef.current.rotation.x +=
      (pointer.y * 0.4 - orreryRef.current.rotation.x) * 0.08;
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
        <StarField count={600} />
        <GlassSun />
        <OrbitalRings />
      </group>

      <Environment preset="city" />
    </>
  );
}

export function HeroScene() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    setReady(!!gl);
  }, []);

  if (!ready) return null;

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
