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
const WING_RED  = new THREE.Color(3.6, 0.45, 0.20);
const WING_CYAN = new THREE.Color(0.25, 1.8, 2.8);
const COCKPIT_C = new THREE.Color(0.6, 1.6, 2.4);

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
  uniform float uBoost;
  varying vec2  vUv;
  void main() {
    vec2 p = vUv - 0.5;
    float d = length(p) * 2.0;
    if (d > 1.0) discard;
    float core  = pow(1.0 - d, 3.4);
    float outer = pow(1.0 - d, 1.3);
    float flick = 0.85 + 0.15 * sin(uTime * 13.0 + uSeed * 17.3);
    vec3 col = mix(
      vec3(1.0, 0.45, 0.10),
      vec3(2.6, 2.0, 1.4),
      core
    );
    float alpha = (outer * 0.55 + core * 1.2) * flick * uBoost;
    gl_FragColor = vec4(col * uBoost, alpha);
  }
`;

/* ── Flight choreography ─────────────────────── */
const FLY_DURATION = 6.8;
const DISPLAY_EULER = new THREE.Euler(0.18, -0.55, 0.05);

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function smoothstep(a: number, b: number, t: number) {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

// Orient an object so its local +X faces `forward`, with `upHint` as the up direction.
function alignForwardQuat(
  forward: THREE.Vector3,
  upHint: THREE.Vector3,
  scratchRight: THREE.Vector3,
  scratchUp: THREE.Vector3,
  scratchMat: THREE.Matrix4,
  out: THREE.Quaternion,
) {
  const f = forward;
  // If forward is too parallel to upHint, fall back to a different up
  let upH = upHint;
  if (Math.abs(f.dot(upH)) > 0.97) {
    upH = new THREE.Vector3(0, 0, 1);
  }
  scratchRight.crossVectors(f, upH).normalize();
  scratchUp.crossVectors(scratchRight, f).normalize();
  scratchMat.makeBasis(f, scratchUp, scratchRight);
  out.setFromRotationMatrix(scratchMat);
  return out;
}

/* ── Ship — procedural sci-fi vessel + flyby ──── */
function Ship({
  lowPower,
  replayTrigger,
}: {
  lowPower: boolean;
  replayTrigger: number;
}) {
  const groupRef = React.useRef<THREE.Group>(null);
  const flightStartRef = React.useRef(-1);
  const inFlightRef = React.useRef(true);

  const lightsMatRef = React.useRef<THREE.ShaderMaterial>(null);
  const exhaust1Ref = React.useRef<THREE.ShaderMaterial>(null);
  const exhaust2Ref = React.useRef<THREE.ShaderMaterial>(null);
  const exhaust3Ref = React.useRef<THREE.ShaderMaterial>(null);
  const engineLight1Ref = React.useRef<THREE.PointLight>(null);
  const engineLight2Ref = React.useRef<THREE.PointLight>(null);

  /* Greebles: instanced panel boxes */
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
      const x = (u - 0.5) * 3.6 - 0.15;
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

  /* Running lights */
  const lightsGeom = React.useMemo(() => {
    const hullCount = lowPower ? 18 : 32;
    const wingCount = 6;
    const count = hullCount + wingCount;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const rates = new Float32Array(count);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const rng = mulberry32(0xbadf00d);

    for (let i = 0; i < hullCount; i++) {
      const u = (i + rng() * 0.5) / hullCount;
      const x = (u - 0.5) * 4.2 - 0.15;
      const taper = Math.max(0.45, Math.cos((Math.abs(x) / 2.3) * 0.85));
      const r = 0.5 * taper;
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
      if (c < 0.6) {
        colors[i * 3]     = 0.4;
        colors[i * 3 + 1] = 0.82;
        colors[i * 3 + 2] = 1.0;
      } else if (c < 0.92) {
        colors[i * 3]     = 1.0;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 0.12;
      } else {
        colors[i * 3]     = 1.0;
        colors[i * 3 + 1] = 0.18;
        colors[i * 3 + 2] = 0.1;
      }
    }

    for (let w = 0; w < 2; w++) {
      const zSign = w === 0 ? 1 : -1;
      for (let j = 0; j < 3; j++) {
        const i = hullCount + w * 3 + j;
        const t = (j + 0.5) / 3;
        positions[i * 3]     = -0.85 + (1 - t) * 0.4;
        positions[i * 3 + 1] = -0.05;
        positions[i * 3 + 2] = zSign * (0.65 + t * 0.8);
        phases[i] = rng() * Math.PI * 2;
        rates[i] = 1.4;
        sizes[i] = 1.15;
        colors[i * 3]     = 0.4;
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

  const lightsUniforms = React.useMemo(() => ({ uTime: { value: 0 } }), []);
  const exhaustU1 = React.useMemo(
    () => ({ uTime: { value: 0 }, uSeed: { value: 0.31 }, uBoost: { value: 1 } }),
    [],
  );
  const exhaustU2 = React.useMemo(
    () => ({ uTime: { value: 0 }, uSeed: { value: 0.67 }, uBoost: { value: 1 } }),
    [],
  );
  const exhaustU3 = React.useMemo(
    () => ({ uTime: { value: 0 }, uSeed: { value: 0.92 }, uBoost: { value: 1 } }),
    [],
  );

  /* Flight path — Catmull-Rom curve through control points.
     Coords are in world space; ship enters off-screen lower-left,
     swoops past the camera, arcs up and around behind the upper-right,
     comes back down and settles at the display pose. */
  const curve = React.useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-11, -3.2, -5),
          new THREE.Vector3(-4, -2.4, 1.5),
          new THREE.Vector3(1.5, -1.2, 4),
          new THREE.Vector3(5, 0.6, 2.5),
          new THREE.Vector3(4.5, 2.4, -1.5),
          new THREE.Vector3(0.5, 3.2, -3),
          new THREE.Vector3(-2.5, 2.6, -1),
          new THREE.Vector3(-2.2, 1.0, 0.8),
          new THREE.Vector3(0.15, 0.15, 0),
        ],
        false,
        "catmullrom",
        0.5,
      ),
    [],
  );

  const displayQuat = React.useMemo(
    () => new THREE.Quaternion().setFromEuler(DISPLAY_EULER),
    [],
  );

  // Scratch objects — reused across frames to avoid GC pressure
  const scratch = React.useMemo(
    () => ({
      pos: new THREE.Vector3(),
      tan: new THREE.Vector3(),
      tan2: new THREE.Vector3(),
      right: new THREE.Vector3(),
      up: new THREE.Vector3(),
      mat: new THREE.Matrix4(),
      flightQuat: new THREE.Quaternion(),
      bankQuat: new THREE.Quaternion(),
      finalQuat: new THREE.Quaternion(),
      axis: new THREE.Vector3(),
    }),
    [],
  );

  // Re-trigger flight when replayTrigger changes
  React.useEffect(() => {
    inFlightRef.current = true;
    flightStartRef.current = -1;
  }, [replayTrigger]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    if (inFlightRef.current) {
      if (flightStartRef.current < 0) flightStartRef.current = t;
      const elapsed = t - flightStartRef.current;
      const rawT = Math.min(1, elapsed / FLY_DURATION);
      const tPath = easeOutCubic(rawT);

      // Position along curve
      curve.getPoint(tPath, scratch.pos);
      groupRef.current.position.copy(scratch.pos);

      // Orientation from tangent + banking from turn rate
      curve.getTangent(tPath, scratch.tan);
      const tNext = Math.min(0.998, tPath + 0.015);
      curve.getTangent(tNext, scratch.tan2);
      const turnSign =
        scratch.tan.x * scratch.tan2.z - scratch.tan.z * scratch.tan2.x;
      const bank = Math.max(-0.55, Math.min(0.55, turnSign * 28));

      alignForwardQuat(
        scratch.tan,
        new THREE.Vector3(0, 1, 0),
        scratch.right,
        scratch.up,
        scratch.mat,
        scratch.flightQuat,
      );
      scratch.axis.copy(scratch.tan).normalize();
      scratch.bankQuat.setFromAxisAngle(scratch.axis, bank);
      scratch.finalQuat.copy(scratch.bankQuat).multiply(scratch.flightQuat);

      // Settle: blend to display pose in the last 15%
      const settleT = smoothstep(0.85, 1.0, rawT);
      scratch.finalQuat.slerp(displayQuat, settleT);
      groupRef.current.quaternion.copy(scratch.finalQuat);

      // Engine boost during flight, falling to nominal as it settles
      const boost = 1.0 + (1 - settleT) * 0.95;
      exhaustU1.uBoost.value = boost;
      exhaustU2.uBoost.value = boost;
      exhaustU3.uBoost.value = boost;
      if (engineLight1Ref.current) engineLight1Ref.current.intensity = 1.6 * boost;
      if (engineLight2Ref.current) engineLight2Ref.current.intensity = 0.7 * boost;

      if (rawT >= 1) {
        inFlightRef.current = false;
        flightStartRef.current = -1;
      }
    } else {
      // Display mode — turntable + bob
      groupRef.current.rotation.y += delta * 0.085;
      groupRef.current.position.set(
        0.15,
        0.15 + Math.sin(t * 0.42) * 0.06,
        0,
      );
      exhaustU1.uBoost.value = 1.0;
      exhaustU2.uBoost.value = 1.0;
      exhaustU3.uBoost.value = 1.0;
      if (engineLight1Ref.current) engineLight1Ref.current.intensity = 1.6;
      if (engineLight2Ref.current) engineLight2Ref.current.intensity = 0.7;
    }

    // Shader uniforms
    if (lightsMatRef.current) lightsMatRef.current.uniforms.uTime.value = t;
    if (exhaust1Ref.current)  exhaust1Ref.current.uniforms.uTime.value  = t;
    if (exhaust2Ref.current)  exhaust2Ref.current.uniforms.uTime.value  = t;
    if (exhaust3Ref.current)  exhaust3Ref.current.uniforms.uTime.value  = t;
  });

  return (
    <group ref={groupRef} scale={0.66}>
      {/* Engine block (rear) */}
      <mesh position={[-1.95, 0, 0]}>
        <boxGeometry args={[0.95, 0.8, 1.1]} />
        <meshStandardMaterial color="#1a2028" roughness={0.5} metalness={0.86} />
      </mesh>

      {/* Main fuselage cylinder — axis along X */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 3.2, 14]} />
        <meshStandardMaterial color="#1c232c" roughness={0.48} metalness={0.88} />
      </mesh>

      {/* Nose cone */}
      <mesh rotation={[0, 0, -Math.PI / 2]} position={[1.95, 0, 0]}>
        <coneGeometry args={[0.42, 1.1, 14]} />
        <meshStandardMaterial color="#1c232c" roughness={0.48} metalness={0.88} />
      </mesh>

      {/* Dorsal plating */}
      <mesh position={[-0.2, 0.45, 0]}>
        <boxGeometry args={[2.85, 0.1, 0.78]} />
        <meshStandardMaterial color="#252c34" roughness={0.55} metalness={0.85} />
      </mesh>
      {/* Ventral plating */}
      <mesh position={[-0.2, -0.45, 0]}>
        <boxGeometry args={[2.8, 0.08, 0.62]} />
        <meshStandardMaterial color="#252c34" roughness={0.55} metalness={0.85} />
      </mesh>

      {/* Bridge tower */}
      <mesh position={[0.5, 0.62, 0]}>
        <boxGeometry args={[0.72, 0.28, 0.55]} />
        <meshStandardMaterial color="#1f262e" roughness={0.5} metalness={0.86} />
      </mesh>
      <mesh position={[0.55, 0.84, 0]}>
        <boxGeometry args={[0.36, 0.18, 0.4]} />
        <meshStandardMaterial color="#181c22" roughness={0.5} metalness={0.86} />
      </mesh>
      {/* Cockpit canopy strip — emissive cyan */}
      <mesh position={[0.78, 0.84, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.3]} />
        <meshBasicMaterial color={COCKPIT_C} toneMapped={false} />
      </mesh>

      {/* Wings — port and starboard, swept */}
      <mesh position={[-0.55, -0.05, 1.1]} rotation={[0, 0.22, 0]}>
        <boxGeometry args={[1.5, 0.06, 0.9]} />
        <meshStandardMaterial color="#222931" roughness={0.55} metalness={0.85} />
      </mesh>
      <mesh position={[-0.55, -0.05, -1.1]} rotation={[0, -0.22, 0]}>
        <boxGeometry args={[1.5, 0.06, 0.9]} />
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

      {/* Engine nozzle rings */}
      <mesh position={[-2.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.21, 0.2, 14, 1, true]} />
        <meshStandardMaterial color="#13181e" roughness={0.4} metalness={0.92} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-2.43, 0.28, 0.36]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.14, 0.16, 12, 1, true]} />
        <meshStandardMaterial color="#13181e" roughness={0.4} metalness={0.92} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-2.43, 0.28, -0.36]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.14, 0.16, 12, 1, true]} />
        <meshStandardMaterial color="#13181e" roughness={0.4} metalness={0.92} side={THREE.DoubleSide} />
      </mesh>

      {/* Greebles */}
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

      {/* Engine exhausts */}
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
        <planeGeometry args={[0.3, 0.3]} />
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
        <planeGeometry args={[0.3, 0.3]} />
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

      {/* Engine glow point lights */}
      <pointLight ref={engineLight1Ref} position={[-2.8, 0, 0]}    color="#ff7026" intensity={1.6} distance={4.0} decay={2} />
      <pointLight ref={engineLight2Ref} position={[-2.8, 0.28, 0]} color="#ff9040" intensity={0.7} distance={2.2} decay={2} />
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
  const [replayTrigger, setReplayTrigger] = React.useState(0);
  usePointerParallax();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (pointer.x * 0.25 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (pointer.y * 0.18 - groupRef.current.rotation.x) * 0.04;
  });

  const replay = React.useCallback(() => {
    setReplayTrigger((k) => k + 1);
  }, []);

  return (
    <>
      <pointLight position={[2, -3, 2]}  color="#ff8a3a" intensity={1.1} distance={14} decay={2} />
      <pointLight position={[-5, 5, 4]}  color="#5aa0ff" intensity={1.3} distance={22} decay={2} />
      <directionalLight position={[3, 4, 6]} intensity={0.55} />
      <pointLight position={[-2, 2, -6]} color="#3a5a9a" intensity={0.6} distance={20} decay={2} />
      <ambientLight intensity={0.12} />

      <group ref={groupRef}>
        <Stars count={lowPower ? 160 : 360} />
        {/* Wrapper makes the ship clickable — bubbles up from any child mesh */}
        <group
          onPointerDown={(e) => {
            e.stopPropagation();
            replay();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "";
          }}
        >
          <Ship lowPower={lowPower} replayTrigger={replayTrigger} />
        </group>
      </group>

      {!lowPower && (
        <EffectComposer>
          <Bloom
            intensity={0.85}
            kernelSize={KernelSize.MEDIUM}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.3}
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

  // Restore cursor when component unmounts (defensive)
  React.useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  if (!ready || disableWebgl) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto">
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
