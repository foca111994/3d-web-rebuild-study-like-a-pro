import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MOBILE_SCENE_QUERY } from "@/lib/inventoryLoading";
import StudentModel from "./StudentModel";

type InventoryObject3DProps = {
  active?: boolean;
  onReady?: () => void;
  label: string;
  modelSize?: number;
  preview?: boolean;
  synchronized?: boolean;
  url: string;
};

export const preloadModel = (url: string) => useGLTF.preload(url);

function ResponsiveCamera({ modelSize }: { modelSize: number }) {
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);

  const height = useThree((state) => state.size.height);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    camera.position.z = width < 480 ? 10.4 : width < 900 ? 9.9 : 9.35;
    // Fit the narrower mobile column, including room for the rotating model.
    if (window.matchMedia(MOBILE_SCENE_QUERY).matches) {
      camera.position.z = Math.max(camera.position.z, modelSize * 1.13 / (2 * Math.tan(12 * Math.PI / 180) * (width / height)));
    }
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, width, height, modelSize, invalidate]);

  return null;
}

function Turntable({ active, modelSize, synchronized, url, onReady }: Pick<InventoryObject3DProps, "active" | "modelSize" | "synchronized" | "url" | "onReady">) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!group.current || !active) return;
    if (synchronized) {
      group.current.rotation.y = clock.getElapsedTime() * 1.34;
      return;
    }
    elapsed.current += delta;
    // Una vuelta en unos 4.7 segundos evita que la espalda permanezca demasiado tiempo en cuadro.
    group.current.rotation.y += delta * 1.34;
  });

  return (
    <group ref={group} position={[0, -0.02, 0]} scale={0.96}>
      <StudentModel url={url} targetSize={modelSize} onReady={onReady} />
    </group>
  );
}

export default function InventoryObject3D({ onReady, active = true, label, modelSize = 3.12, preview = false, synchronized = false, url }: InventoryObject3DProps) {
  const [visible, setVisible] = useState(!document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visibility = () => setVisible(!document.hidden);
    const motion = () => setReducedMotion(media.matches);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", motion);
    return () => { document.removeEventListener("visibilitychange", visibility); media.removeEventListener("change", motion); };
  }, []);
  const animate = active && visible && !reducedMotion;
  return (
    <div className={`pilot-canvas${preview ? " pilot-canvas--preview" : ""}`} aria-label={label}>
      <Canvas
        frameloop={animate ? "always" : "demand"}
        shadows={preview ? false : "percentage"}
        dpr={preview ? [0.7, 1] : [1, 1.5]}
        camera={{ position: [0, 0.18, 9.35], fov: 24 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
      >
        <ResponsiveCamera modelSize={modelSize} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 6, 5]} intensity={1.55} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 3, 3]} intensity={0.58} color="#dce8ff" />
        <directionalLight position={[0, 1, -4]} intensity={0.32} color="#d26a86" />
        <Suspense fallback={null}>
          <Turntable onReady={onReady} active={animate} modelSize={modelSize} synchronized={synchronized} url={url} />
          <Environment files="/models/environment/studio_small_03_1k.hdr" environmentIntensity={0.22} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI * 0.38} maxPolarAngle={Math.PI * 0.62} rotateSpeed={0.55} />
      </Canvas>
    </div>
  );
}
