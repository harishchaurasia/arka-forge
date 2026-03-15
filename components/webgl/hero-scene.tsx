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
  uniform float uTime;
  varying float vLife;
  varying float vDist;

  void main() {
    vLife = aLife;
    float t = fract(uTime * 0.3 + aLife);
    vec3 pos = position;
    pos.y += t * 1.2;
    pos.x += sin(t * 6.28 + aLife * 20.0) * 0.15;
    pos.z += cos(t * 6.28 + aLife * 15.0) * 0.15;
    float scale = smoothstep(0.0, 0.15, t) * smoothstep(1.0, 0.4, t);
    vDist = length(pos);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * scale * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fireFragmentShader = `
  varying float vLife;
  varying float vDist;
  uniform float uTime;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float alpha = smoothstep(1.0, 0.0, d);
    float t = fract(uTime * 0.3 + vLife);
    float fade = smoothstep(0.0, 0.15, t) * smoothstep(1.0, 0.4, t);
    vec3 innerColor = vec3(1.0, 0.95, 0.7);
    vec3 midColor = vec3(1.0, 0.5, 0.05);
    vec3 outerColor = vec3(0.8, 0.1, 0.0);
    vec3 col = mix(innerColor, midColor, smoothstep(0.0, 0.5, t));
    col = mix(col, outerColor, smoothstep(0.4, 0.9, t));
    alpha *= fade * 0.85;
    gl_FragColor = vec4(col, alpha);
  }
`;

const FIRE_COUNT = 200;

function FireCore() {
  const pointsRef = React.useRef<THREE.Points>(null);
  const matRef = React.useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes, lives } = React.useMemo(() => {
    const pos = new Float32Array(FIRE_COUNT * 3);
    const sz = new Float32Array(FIRE_COUNT);
    const lf = new Float32Array(FIRE_COUNT);
    for (let i = 0; i < FIRE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.25;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.3) * 0.2;
      pos[i * 3 + 2] = Math.sin(angle) * r;
      sz[i] = 0.3 + Math.random() * 0.5;
      lf[i] = Math.random();
    }
    return { positions: pos, sizes: sz, lives: lf };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-aLife" args={[lives, 1]} />
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

      {/* Hot white core */}
      <mesh>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Warm glow halo */}
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial
          color="#FF6600"
          transparent
          opacity={0.06}
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
        <StarField count={600} />
        <FireCore />
        <OrbitalRings />
      </group>

      <Environment files="/potsdamer_platz_1k.hdr" />
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
