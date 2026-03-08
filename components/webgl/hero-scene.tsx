"use client";

import * as React from "react";
import * as THREE from "three";

let Canvas: any;
let useFrame: any;
let useThree: any;
let MeshTransmissionMaterial: any;
let Environment: any;

if (typeof window !== "undefined") {
  try {
    const r3f = require("@react-three/fiber");
    Canvas = r3f.Canvas;
    useFrame = r3f.useFrame;
    useThree = r3f.useThree;
    const drei = require("@react-three/drei");
    MeshTransmissionMaterial = drei.MeshTransmissionMaterial;
    Environment = drei.Environment;
  } catch (e) {
    console.warn("Failed to load three.js libraries", e);
  }
}

/* ── Glass Torus ─────────────────────────────── */
function GlassTorus() {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2.5, 0.35, 64, 128]} />
      <MeshTransmissionMaterial
        thickness={0.2}
        roughness={0}
        transmission={1}
        ior={1.3}
        chromaticAberration={0.04}
        backside={false}
      />
    </mesh>
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
      <GlassTorus />
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
    const ok =
      !!gl &&
      typeof Canvas !== "undefined" &&
      typeof MeshTransmissionMaterial !== "undefined";
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
