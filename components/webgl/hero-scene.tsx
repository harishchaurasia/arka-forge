"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";

const GLASS_PROPS = {
  thickness: 0.2,
  roughness: 0,
  transmission: 1,
  ior: 1.3,
  chromaticAberration: 0.04,
  backside: false,
};

/* ── Orbital Glass Rings ─────────────────────── */
function OrbitalRings() {
  const outer = React.useRef<THREE.Mesh>(null);
  const middle = React.useRef<THREE.Mesh>(null);
  const inner = React.useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (outer.current) {
      outer.current.rotation.x = Math.PI * 0.35 + t * 0.08;
      outer.current.rotation.y = t * 0.12;
    }
    if (middle.current) {
      middle.current.rotation.z = Math.PI * 0.25 + t * 0.15;
      middle.current.rotation.x = t * 0.1;
    }
    if (inner.current) {
      inner.current.rotation.y = Math.PI * 0.15 + t * 0.2;
      inner.current.rotation.z = t * 0.14;
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <torusGeometry args={[3.0, 0.1, 64, 128]} />
        <MeshTransmissionMaterial {...GLASS_PROPS} />
      </mesh>

      <mesh ref={middle}>
        <torusGeometry args={[2.2, 0.12, 64, 128]} />
        <MeshTransmissionMaterial {...GLASS_PROPS} />
      </mesh>

      <mesh ref={inner}>
        <torusGeometry args={[1.4, 0.14, 64, 128]} />
        <MeshTransmissionMaterial {...GLASS_PROPS} />
      </mesh>
    </group>
  );
}

/* ── Star field ─────────────────────────────── */
function StarField({ count = 1000 }: { count?: number }) {
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

/* ── Full scene ─────────────────────────────── */
function SceneContent() {
  return (
    <>
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <ambientLight intensity={0.3} />

      <StarField count={1000} />
      <OrbitalRings />
      <Environment preset="sunset" />
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
