import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import StudentModel from "./StudentModel";

type InventoryObject3DProps = {
  active?: boolean;
  label: string;
  modelSize?: number;
  preview?: boolean;
  synchronized?: boolean;
  url: string;
};

function ResponsiveCamera() {
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);

  useEffect(() => {
    camera.position.z = width < 480 ? 10.4 : width < 900 ? 9.9 : 9.35;
    camera.updateProjectionMatrix();
  }, [camera, width]);

  return null;
}

function Turntable({ active, modelSize, synchronized, url }: Pick<InventoryObject3DProps, "active" | "modelSize" | "synchronized" | "url">) {
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
      <StudentModel url={url} targetSize={modelSize} />
    </group>
  );
}

export default function InventoryObject3D({ active = true, label, modelSize = 3.12, preview = false, synchronized = false, url }: InventoryObject3DProps) {
  return (
    <div className={`pilot-canvas${preview ? " pilot-canvas--preview" : ""}`} aria-label={label}>
      <Canvas
        shadows={!preview}
        dpr={preview ? [0.7, 1] : [1, 1.5]}
        camera={{ position: [0, 0.18, 9.35], fov: 24 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
      >
        <ResponsiveCamera />
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 6, 5]} intensity={1.55} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 3, 3]} intensity={0.58} color="#dce8ff" />
        <directionalLight position={[0, 1, -4]} intensity={0.32} color="#d26a86" />
        <Suspense fallback={null}>
          <Turntable active={active} modelSize={modelSize} synchronized={synchronized} url={url} />
          <Environment preset="studio" environmentIntensity={0.22} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI * 0.38} maxPolarAngle={Math.PI * 0.62} rotateSpeed={0.55} />
      </Canvas>
    </div>
  );
}
