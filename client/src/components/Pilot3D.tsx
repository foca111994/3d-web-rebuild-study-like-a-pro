/* Style direction: Study Like a Pro — piloto de mecánica 3D real con movimiento de inventario escaneado. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StudentModel, {
  STUDENT_COMPANION_MODEL_URL,
  STUDENT_MODEL_URL,
  STUDENTS_BLOCKOUT_MODEL_URL,
} from "./StudentModel";

type PilotAvatarProps = { active?: boolean; source?: "production" | "blockout" };

function ResponsiveCamera() {
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);

  useEffect(() => {
    camera.position.z = width < 480 ? 10.4 : width < 900 ? 9.5 : 8.7;
    camera.updateProjectionMatrix();
  }, [camera, width]);

  return null;
}

function PilotAvatar({ active = true, source = "production" }: PilotAvatarProps) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!group.current || !active) return;
    elapsed.current += delta;
    group.current.rotation.y += delta * 0.48;
  });

  return (
    <group ref={group} position={[0, 0.1, 0]} scale={source === "blockout" ? 0.68 : 1}>
      {source === "blockout" ? (
        <StudentModel url={STUDENTS_BLOCKOUT_MODEL_URL} />
      ) : (
        <>
          <group position={[-1.05, 0, 0]} scale={0.92}><StudentModel /></group>
          <group position={[1.05, 0, 0]} scale={0.92}><StudentModel url={STUDENT_COMPANION_MODEL_URL} /></group>
        </>
      )}
    </group>
  );
}

export default function Pilot3D({ active = true }: PilotAvatarProps) {
  const [source, setSource] = useState<"production" | "blockout" | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const isGlb = async (url: string) => {
      const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) return false;
        const header = new Uint8Array((await response.arrayBuffer()).slice(0, 4));
        return header[0] === 0x67 && header[1] === 0x6c && header[2] === 0x54 && header[3] === 0x46;
    };
    Promise.all([
      isGlb(STUDENT_MODEL_URL),
      isGlb(STUDENT_COMPANION_MODEL_URL),
      isGlb(STUDENTS_BLOCKOUT_MODEL_URL),
    ])
      .then(([student, companion, blockout]) => {
        if (student && companion) setSource("production");
        else if (blockout) setSource("blockout");
        else setSource(null);
      })
      .catch(() => setSource(null));
    return () => controller.abort();
  }, []);

  return (
    <div className="pilot-canvas" aria-label="Piloto 3D del estudiante con giro y flotación automática">
      {source ? (
        <>
          {source === "blockout" && <span className="pilot-blockout-badge">BLOCKOUT · NO ES ARTE FINAL</span>}
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.25, 8.7], fov: 22 }} gl={{ antialias: true, alpha: true }}>
          <ResponsiveCamera />
          <color attach="background" args={["#efefed"]} />
          <ambientLight intensity={2.05} />
          <directionalLight position={[3, 6, 5]} intensity={2.15} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-4, 3, 3]} intensity={1.35} color="#e8edf0" />
          <Suspense fallback={null}>
            <PilotAvatar active={active} source={source} />
          </Suspense>
        </Canvas>
        </>
      ) : (
        <div className="pilot-model-status" role="status">
          <span>Modelos 3D pendientes</span>
          <code>{STUDENT_MODEL_URL}<br />{STUDENT_COMPANION_MODEL_URL}</code>
        </div>
      )}
    </div>
  );
}
