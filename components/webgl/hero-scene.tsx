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

/* ── Mouse ───────────────────────────────────── */
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

/* ── Planet geometry with terrain displacement ─ */
function buildPlanetGeo(detail: number) {
  const geo = new THREE.SphereGeometry(1.9, detail, detail);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const count = pos.count;

  const elevations = new Float32Array(count);
  const scatterOffsets = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const len = Math.sqrt(x * x + y * y + z * z);
    const nx = x / len, ny = y / len, nz = z / len;

    // Multi-octave trig noise — gives convincing continent/ocean shapes
    const n1 = Math.sin(nx * 3.4 + ny * 2.1) * Math.cos(nz * 4.2 - nx * 1.7);
    const n2 = Math.sin(ny * 6.5 - nz * 5.1) * Math.cos(nx * 5.8 + nz * 3.1);
    const n3 = Math.sin(nz * 10.1 + nx * 8.4) * Math.cos(ny * 9.2 - nz * 7.3);
    const n4 = Math.sin(nx * 15.8 - ny * 13.0) * Math.cos(nz * 14.7 + nx * 11.3);
    const n5 = Math.cos(ny * 22.4 + nz * 18.9) * Math.sin(nx * 20.1 - ny * 17.6);

    const raw = n1 * 0.38 + n2 * 0.26 + n3 * 0.17 + n4 * 0.11 + n5 * 0.06;
    const e = Math.max(0, Math.min(1, (raw + 0.98) / 1.96));
    elevations[i] = e;

    // Displace: oceans are flat basins, land rises
    const sealevel = 0.44;
    const r = e < sealevel
      ? 1.9 * 0.955                                    // ocean floor — slightly inset
      : 1.9 * 0.955 + (e - sealevel) * 0.75;         // terrain heights

    pos.setXYZ(i, nx * r, ny * r, nz * r);

    // Scatter offsets: random shell around the planet, points converge in
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const sr = 2.2 + Math.random() * 2.8;
    scatterOffsets[i * 3]     = sr * Math.sin(phi) * Math.cos(theta) - nx * r;
    scatterOffsets[i * 3 + 1] = sr * Math.sin(phi) * Math.sin(theta) - ny * r;
    scatterOffsets[i * 3 + 2] = sr * Math.cos(phi) - nz * r;
  }

  geo.setAttribute("aElevation",     new THREE.BufferAttribute(elevations,     1));
  geo.setAttribute("aScatterOffset", new THREE.BufferAttribute(scatterOffsets, 3));
  geo.computeVertexNormals();
  return geo;
}

/* ── Shaders ─────────────────────────────────── */

// Stage 0 — point cloud scatter / gather
const pointsVert = `
  attribute float aElevation;
  attribute vec3  aScatterOffset;
  uniform   float uGather;
  uniform   float uTime;
  uniform   float uOpacity;
  varying   float vElev;
  varying   float vOpacity;

  void main() {
    vElev   = aElevation;
    vOpacity = uOpacity;
    vec3 pos = position + aScatterOffset * (1.0 - uGather);
    // subtle orbital drift while scattered
    float drift = (1.0 - uGather) * 0.06;
    pos.x += sin(uTime * 0.9 + aElevation * 23.0) * drift;
    pos.y += cos(uTime * 0.7 + aElevation * 17.0) * drift;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = mix(2.8, 1.6, uGather) * (220.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const pointsFrag = `
  varying float vElev;
  varying float vOpacity;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float a = exp(-d * d * 2.8) * vOpacity;
    // Ocean verts = cyan-blue, land = hot orange — topology visible before the world forms
    vec3 col = mix(vec3(0.3, 0.65, 1.0), vec3(1.0, 0.50, 0.08), vElev);
    gl_FragColor = vec4(col, a);
  }
`;

// Stage 3 — full lit planet: biomes + ocean specularity + atmospheric rim
const terrainVert = `
  attribute float aElevation;
  varying   vec3  vNormal;
  varying   vec3  vViewPos;
  varying   float vElev;

  void main() {
    vElev   = aElevation;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const terrainFrag = `
  uniform float uOpacity;
  uniform vec3  uLightDir;
  varying vec3  vNormal;
  varying vec3  vViewPos;
  varying float vElev;

  void main() {
    float e = vElev;

    // Biome gradient
    vec3 c;
    if      (e < 0.26) c = mix(vec3(0.01,0.05,0.17), vec3(0.03,0.13,0.34), e/0.26);
    else if (e < 0.40) c = mix(vec3(0.03,0.13,0.34), vec3(0.05,0.27,0.52), (e-0.26)/0.14);
    else if (e < 0.44) c = mix(vec3(0.05,0.27,0.52), vec3(0.68,0.60,0.38), (e-0.40)/0.04);
    else if (e < 0.52) c = mix(vec3(0.68,0.60,0.38), vec3(0.18,0.34,0.10), (e-0.44)/0.08);
    else if (e < 0.64) c = mix(vec3(0.18,0.34,0.10), vec3(0.22,0.27,0.13), (e-0.52)/0.12);
    else if (e < 0.74) c = mix(vec3(0.22,0.27,0.13), vec3(0.42,0.34,0.22), (e-0.64)/0.10);
    else if (e < 0.84) c = mix(vec3(0.42,0.34,0.22), vec3(0.54,0.48,0.42), (e-0.74)/0.10);
    else               c = mix(vec3(0.54,0.48,0.42), vec3(0.88,0.91,0.96), (e-0.84)/0.16);

    vec3 n = normalize(vNormal);
    vec3 l = normalize(uLightDir);
    vec3 v = normalize(vViewPos);

    float diff = max(dot(n, l), 0.0);
    float amb  = 0.18;

    // Ocean specularity
    float spec = 0.0;
    if (e < 0.44) {
      vec3 h = normalize(l + v);
      spec = pow(max(dot(n, h), 0.0), 100.0) * 0.95 * smoothstep(0.44, 0.36, e);
    }

    // Atmospheric rim glow
    float rim = pow(1.0 - max(dot(n, v), 0.0), 3.2) * 0.50;

    vec3 finalCol = c * (amb + diff * 0.82) + vec3(spec) + vec3(0.25, 0.55, 1.0) * rim;
    gl_FragColor = vec4(finalCol, uOpacity);
  }
`;

// Atmosphere shell
const atmVert = `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vNormal  = normalize(normalMatrix * normal);
    vec4 mv  = modelViewMatrix * vec4(position, 1.0);
    vViewPos = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;
const atmFrag = `
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewPos)), 0.0), 2.2);
    float a   = rim * 0.70 * uOpacity;
    gl_FragColor = vec4(0.25, 0.52, 1.0, a);
  }
`;

/* ── Build sequence — the planet being forged ── */
const CYCLE = 20;
//  0 – 3.5   points (gather)
//  2.5– 7    wireframe
//  6  – 11   flat shaded
//  10 – 20   lit planet (11.5 hold, 15 dissolve begins, 20 loop)

function Planet({ lowPower }: { lowPower: boolean }) {
  const groupRef = React.useRef<THREE.Group>(null);
  const tRef     = React.useRef(0);

  const pointsMatRef  = React.useRef<THREE.ShaderMaterial>(null);
  const edgesMatRef   = React.useRef<THREE.LineBasicMaterial>(null);
  const flatMatRef    = React.useRef<THREE.MeshStandardMaterial>(null);
  const terrainMatRef = React.useRef<THREE.ShaderMaterial>(null);
  const atmMatRef     = React.useRef<THREE.ShaderMaterial>(null);

  const pointsMeshRef  = React.useRef<THREE.Points>(null);
  const edgesMeshRef   = React.useRef<THREE.LineSegments>(null);
  const flatMeshRef    = React.useRef<THREE.Mesh>(null);
  const terrainMeshRef = React.useRef<THREE.Mesh>(null);
  const atmMeshRef     = React.useRef<THREE.Mesh>(null);

  const detail  = lowPower ? 36 : 52;
  const geo     = React.useMemo(() => buildPlanetGeo(detail), [detail]);
  const edgesGeo = React.useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  const atmGeo  = React.useMemo(() => new THREE.SphereGeometry(2.08, 32, 32), []);

  const lightDir = React.useMemo(() => new THREE.Vector3(2.5, 1.5, 3.0).normalize(), []);

  const pointsUniforms = React.useMemo(() => ({
    uGather:  { value: 0 },
    uTime:    { value: 0 },
    uOpacity: { value: 0 },
  }), []);

  const terrainUniforms = React.useMemo(() => ({
    uOpacity:  { value: 0 },
    uLightDir: { value: lightDir },
  }), [lightDir]);

  const atmUniforms = React.useMemo(() => ({
    uOpacity: { value: 0 },
  }), []);

  useFrame(({ clock }, delta) => {
    tRef.current = (tRef.current + delta) % CYCLE;
    const t = tRef.current;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x  = Math.sin(clock.elapsedTime * 0.06) * 0.10;
    }

    const c = (v: number) => Math.max(0, Math.min(1, v));
    const e = (x: number) => x < 0.5 ? 2*x*x : 1 - Math.pow(-2*x+2, 2)/2;

    // Points
    let pO = 0, gather = 1;
    if      (t < 1.2) { pO = e(c(t/1.2));               gather = e(c(t/1.2)); }
    else if (t < 2.5) { pO = 1;                          gather = 1; }
    else if (t < 3.5) { pO = e(c(1-(t-2.5)));           gather = 1; }
    else if (t >= 15) { pO = e(c((t-15)/4.0));           gather = e(c(1-(t-15)/5.0)); }

    // Wireframe
    let wO = 0;
    if (t >= 2.5 && t < 7) {
      if      (t < 4)   wO = e(c((t-2.5)/1.5));
      else if (t < 6)   wO = 1;
      else              wO = e(c(1-(t-6)));
    }

    // Flat shaded
    let fO = 0;
    if (t >= 6 && t < 11) {
      if      (t < 7.5) fO = e(c((t-6)/1.5));
      else if (t < 10)  fO = 1;
      else              fO = e(c(1-(t-10)));
    }

    // Lit planet + atmosphere
    let lO = 0;
    if (t >= 10) {
      if      (t < 11.5) lO = e(c((t-10)/1.5));
      else if (t < 15)   lO = 1;
      else               lO = e(c(1-(t-15)/5.0));
    }

    // Apply uniforms directly — no setState, no re-renders
    if (pointsMatRef.current) {
      pointsMatRef.current.uniforms.uOpacity.value = pO;
      pointsMatRef.current.uniforms.uGather.value  = gather;
      pointsMatRef.current.uniforms.uTime.value    = clock.elapsedTime;
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
    if (terrainMatRef.current) {
      terrainMatRef.current.uniforms.uOpacity.value = lO;
      if (terrainMeshRef.current) terrainMeshRef.current.visible = lO > 0.01;
    }
    if (atmMatRef.current) {
      atmMatRef.current.uniforms.uOpacity.value = lO * 0.85;
      if (atmMeshRef.current) atmMeshRef.current.visible = lO > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* Stage 0 — point cloud: topology visible before world forms */}
      <points ref={pointsMeshRef} geometry={geo}>
        <shaderMaterial
          ref={pointsMatRef}
          vertexShader={pointsVert}
          fragmentShader={pointsFrag}
          uniforms={pointsUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Stage 1 — wireframe: the mesh topology */}
      <lineSegments ref={edgesMeshRef} geometry={edgesGeo}>
        <lineBasicMaterial
          ref={edgesMatRef}
          color="#ff7030"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Stage 2 — flat shaded: chunky, geometric, unmistakably game */}
      <mesh ref={flatMeshRef} geometry={geo}>
        <meshStandardMaterial
          ref={flatMatRef}
          color="#1a3820"
          flatShading
          transparent
          opacity={0}
          roughness={0.92}
          metalness={0.02}
          depthWrite={false}
        />
      </mesh>

      {/* Stage 3 — lit planet: biomes, ocean specularity, atmosphere rim */}
      <mesh ref={terrainMeshRef} geometry={geo}>
        <shaderMaterial
          ref={terrainMatRef}
          vertexShader={terrainVert}
          fragmentShader={terrainFrag}
          uniforms={terrainUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere shell (lit stage only) */}
      <mesh ref={atmMeshRef} geometry={atmGeo}>
        <shaderMaterial
          ref={atmMatRef}
          vertexShader={atmVert}
          fragmentShader={atmFrag}
          uniforms={atmUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ── Forge fire — energy rising toward the world */

const fireVert = `
  attribute float aSize;
  attribute float aLife;
  attribute float aSpeed;
  uniform   float uTime;
  varying   float vLife;
  varying   float vT;
  void main() {
    vLife = aLife;
    float t = fract(uTime * aSpeed + aLife);
    vT = t;
    vec3 pos = position;
    pos.y += t * 1.6;
    float spread = t * 0.16;
    pos.x += sin(t * 12.56 + aLife * 30.0) * spread;
    pos.z += cos(t * 10.00 + aLife * 25.0) * spread;
    float scale = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.25, t);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * scale * (200.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const fireFrag = `
  varying float vLife;
  varying float vT;
  uniform float uTime;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float alpha  = exp(-d * d * 3.0);
    float fade   = smoothstep(0.0, 0.08, vT) * smoothstep(1.0, 0.25, vT);
    vec3 white   = vec3(1.0, 0.98, 0.9);
    vec3 yellow  = vec3(1.0, 0.80, 0.2);
    vec3 orange  = vec3(1.0, 0.40, 0.05);
    vec3 red     = vec3(0.7, 0.08, 0.0);
    vec3 col     = mix(white,  yellow, smoothstep(0.00, 0.20, vT));
    col          = mix(col,    orange, smoothstep(0.15, 0.50, vT));
    col          = mix(col,    red,    smoothstep(0.45, 0.85, vT));
    float flicker = 0.85 + 0.15 * sin(uTime * 15.0 + vLife * 50.0);
    alpha *= fade * flicker * 0.92;
    gl_FragColor  = vec4(col, alpha);
  }
`;

const FIRE_COUNT = 380;

function ForgeFlame() {
  const matRef = React.useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes, lives, speeds } = React.useMemo(() => {
    const pos = new Float32Array(FIRE_COUNT * 3);
    const sz  = new Float32Array(FIRE_COUNT);
    const lf  = new Float32Array(FIRE_COUNT);
    const sp  = new Float32Array(FIRE_COUNT);
    for (let i = 0; i < FIRE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * 0.2;
      pos[i*3]   = Math.cos(angle) * r;
      pos[i*3+1] = (Math.random() - 0.4) * 0.12;
      pos[i*3+2] = Math.sin(angle) * r;
      sz[i] = 0.4 + Math.random() * 0.5;
      lf[i] = Math.random();
      sp[i] = 0.28 + Math.random() * 0.30;
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
          vertexShader={fireVert}
          fragmentShader={fireFrag}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* White-hot core */}
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#fffaf0" transparent opacity={0.95} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color="#FF4400" transparent opacity={0.032} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ── Starfield ───────────────────────────────── */
function Stars({ count }: { count: number }) {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 20;
      const t = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i*3]   = r * Math.sin(phi) * Math.cos(t);
      p[i*3+1] = r * Math.sin(phi) * Math.sin(t);
      p[i*3+2] = r * Math.cos(phi);
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
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.4}
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
    groupRef.current.rotation.y += (pointer.x * 0.7 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (pointer.y * 0.45 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <>
      {/* Warm light from the forge below */}
      <pointLight position={[0, -2.2, 0]} color="#ff7700" intensity={4} distance={14} decay={2} />
      {/* Cold key light — engine monitor side */}
      <pointLight position={[-5, 4, 5]}   color="#4488ff" intensity={1.2} distance={24} decay={2} />
      {/* Soft fill */}
      <directionalLight position={[3, 5, 3]} intensity={0.8} />
      <ambientLight intensity={0.15} />

      <group ref={groupRef}>
        <Stars count={lowPower ? 150 : 350} />
        {/* Fire: base of planet */}
        <group position={[0, -2.2, 0]}>
          <ForgeFlame />
        </group>
        {/* The world being forged */}
        <Planet lowPower={lowPower} />
      </group>

      {/* Bloom — makes the fire and ocean highlights actually glow */}
      {!lowPower && (
        <EffectComposer>
          <Bloom
            intensity={1.4}
            kernelSize={KernelSize.LARGE}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.6}
          />
        </EffectComposer>
      )}
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
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
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
        camera={{ position: [0, 0.5, 8], fov: 48 }}
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
