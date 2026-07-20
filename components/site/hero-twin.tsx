"use client";

import * as React from "react";
import type * as THREE from "three";

const MODEL = "/models/rover.glb";
const FALLBACK = "/models/rover-fallback.png";
const ORANGE = 0xff6a00;
const SKY = 0x38bdf8;

// Interactive "digital twin" hero visual: a rover scanned from full-fidelity
// reality into its orange wireframe twin, sky-blue scan line sweeping between.
// Heavily gated for performance: desktop + motion-ok + WebGL only, otherwise a
// static image. three.js is dynamically imported so it stays out of the initial
// bundle, and the render loop pauses when the tab is hidden or the hero scrolls
// out of view.
export function HeroTwin() {
  const [mode, setMode] = React.useState<"pending" | "live" | "image">(
    "pending",
  );
  const mountRef = React.useRef<HTMLDivElement>(null);

  // Decide up front whether to run the live visual at all.
  React.useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } })
      .connection;
    const saveData = conn?.saveData === true;
    setMode(reduced || !desktop || saveData ? "image" : "live");
  }, []);

  React.useEffect(() => {
    if (mode !== "live") return;
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        if (!mount) return;
        const THREE = await import("three");
        const [{ GLTFLoader }, { DRACOLoader }, { OrbitControls }, { RoomEnvironment }] =
          await Promise.all([
            import("three/examples/jsm/loaders/GLTFLoader.js"),
            import("three/examples/jsm/loaders/DRACOLoader.js"),
            import("three/examples/jsm/controls/OrbitControls.js"),
            import("three/examples/jsm/environments/RoomEnvironment.js"),
          ]);
        if (disposed || !mount) return;
        const el: HTMLDivElement = mount;
        const fail = () => {
          if (!disposed) setMode("image");
        };

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.localClippingEnabled = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        el.appendChild(renderer.domElement);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
        // GPU context loss (driver reset, laptop GPU switch) -> static image.
        renderer.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          fail();
        });

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100000);
        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(3, 4, 2);
        const rim = new THREE.DirectionalLight(0xff8a3a, 1.4);
        rim.position.set(-3, 1, -2);
        scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.25));

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.7;
        controls.enablePan = false;
        controls.enableZoom = true; // mouse wheel zoom, clamped below

        // Clip planes: solid below the sweep, wireframe above.
        const planeSolid = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
        const planeWire = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

        const VIEW_DIR = new THREE.Vector3(0.7, 0.35, 0.72).normalize();
        const PAD = 1.15; // fit reference (whole model, with margin)
        const ZOOM_MIN = 0.74; // cap: cannot zoom in bigger than this
        const ZOOM_MAX = 1.1; // farthest zoom out
        const START_ZOOM = 0.74; // start at the cap (biggest)
        let modelRadius = 0;
        let modelBottom = -1;
        let modelH = 2;

        function fitDist() {
          const vFov = (camera.fov * Math.PI) / 180;
          const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
          return (modelRadius / Math.sin(Math.min(vFov, hFov) / 2)) * PAD;
        }
        function fitCamera(reset: boolean) {
          if (!modelRadius) return;
          const d = fitDist();
          controls.minDistance = d * ZOOM_MIN;
          controls.maxDistance = d * ZOOM_MAX;
          if (reset) {
            camera.position
              .copy(controls.target)
              .addScaledVector(VIEW_DIR, d * START_ZOOM);
          }
          controls.update();
        }
        function resize() {
          const w = el.clientWidth;
          const h = el.clientHeight;
          if (!w || !h) return;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          fitCamera(false);
        }

        // Sky-blue scan ring (thin glowing ring + faint additive fill).
        const scan = new THREE.Group();
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.94, 1.0, 64),
          new THREE.MeshBasicMaterial({
            color: SKY,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        const fill = new THREE.Mesh(
          new THREE.CircleGeometry(1.0, 64),
          new THREE.MeshBasicMaterial({
            color: SKY,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        scan.add(fill, ring);
        scan.rotation.x = Math.PI / 2;
        scene.add(scan);

        const loader = new GLTFLoader();
        const draco = new DRACOLoader();
        draco.setDecoderPath(
          "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
        );
        loader.setDRACOLoader(draco);

        loader.load(MODEL, (gltf) => {
          if (disposed) return;
          const root = gltf.scene;
          root.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.isMesh && mesh.geometry) {
              const mat = mesh.material as THREE.Material;
              mat.clippingPlanes = [planeSolid];
              mat.side = THREE.DoubleSide;
              mat.needsUpdate = true;
              const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(mesh.geometry, 28),
                new THREE.LineBasicMaterial({
                  color: ORANGE,
                  transparent: true,
                  opacity: 0.9,
                  clippingPlanes: [planeWire],
                }),
              );
              mesh.add(edges);
            }
          });
          const box = new THREE.Box3().setFromObject(root);
          const s = box.getSize(new THREE.Vector3());
          const c = box.getCenter(new THREE.Vector3());
          root.position.sub(c);
          modelH = s.y;
          modelBottom = -s.y / 2;
          modelRadius = s.length() / 2;
          controls.target.set(0, -modelH * 0.26, 0); // lift clear of the caption row
          resize();
          fitCamera(true);
          scene.add(root);
        },
        undefined,
        fail); // model / Draco-decoder load failure -> static image

        // Render loop, paused when hidden or off-screen.
        let running = true;
        const clock = new THREE.Clock();
        let raf = 0;
        function frame() {
          if (disposed) return;
          const t = clock.getElapsedTime();
          // auto wireframe-reveal sweep
          const f = 0.5 + 0.5 * Math.sin(t * 0.28);
          const y = modelBottom + f * modelH;
          planeSolid.constant = y;
          planeWire.constant = -y;
          scan.position.y = y;
          scan.scale.setScalar(0.62 * modelH);
          controls.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(frame);
        }
        function start() {
          if (!running) {
            running = true;
            frame();
          }
        }
        function stop() {
          running = false;
          cancelAnimationFrame(raf);
        }

        const io = new IntersectionObserver(
          ([e]) => (e.isIntersecting ? start() : stop()),
          { threshold: 0.05 },
        );
        io.observe(el);
        const onVis = () => {
          if (document.hidden) stop();
          else start();
        };
        document.addEventListener("visibilitychange", onVis);
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        resize();
        frame();

        cleanup = () => {
          stop();
          io.disconnect();
          ro.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          controls.dispose();
          pmrem.dispose();
          renderer.dispose();
          if (renderer.domElement.parentNode === el)
            el.removeChild(renderer.domElement);
        };
      } catch {
        if (!disposed) setMode("image");
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [mode]);

  if (mode === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={FALLBACK}
        alt="Wireframe digital twin of an exploration rover"
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-[64px] z-[2] flex items-end justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em]">
        <span className="text-muted-foreground/60">
          Perseverance Rover
          <span className="ml-2 text-muted-foreground/35">3D model: NASA</span>
        </span>
        <span className="text-muted-foreground/40">
          scroll to zoom &middot; drag to rotate
        </span>
      </div>
    </div>
  );
}
