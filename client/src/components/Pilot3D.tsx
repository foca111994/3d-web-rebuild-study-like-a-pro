/* Style direction: Study Like a Pro — piloto de mecánica 3D real con movimiento de inventario escaneado. */
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type PilotAvatarProps = { active?: boolean };

function PilotAvatar({ active = true }: PilotAvatarProps) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!group.current || !active) return;
    elapsed.current += delta;
    group.current.rotation.y += delta * 0.42;
    group.current.position.y = Math.sin(elapsed.current * 1.45) * 0.1;
  });

  return (
    <group ref={group} position={[0, -0.28, 0]} scale={0.72}>
      <mesh position={[0, 1.78, 0]} castShadow>
        <sphereGeometry args={[0.48, 32, 24]} />
        <meshStandardMaterial color="#d8a27e" roughness={0.76} />
      </mesh>
      <mesh position={[0, 2.08, 0]} scale={[0.58, 0.22, 0.58]} castShadow>
        <sphereGeometry args={[0.72, 32, 16]} />
        <meshStandardMaterial color="#bd463d" roughness={0.68} />
      </mesh>
      <mesh position={[0.16, 1.98, 0.22]} rotation={[0.02, -0.08, -0.06]} castShadow>
        <boxGeometry args={[0.55, 0.08, 0.25]} />
        <meshStandardMaterial color="#bd463d" roughness={0.68} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[1.2, 1.4, 0.72]} />
        <meshStandardMaterial color="#201c24" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.74, 0.38]} castShadow>
        <boxGeometry args={[1.16, 0.32, 0.05]} />
        <meshStandardMaterial color="#913c86" roughness={0.76} />
      </mesh>
      <mesh position={[-0.74, 0.78, 0.02]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.17, 0.86, 8, 16]} />
        <meshStandardMaterial color="#201c24" roughness={0.9} />
      </mesh>
      <mesh position={[0.74, 0.78, 0.02]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.17, 0.86, 8, 16]} />
        <meshStandardMaterial color="#201c24" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.48, 0.52]} rotation={[-0.24, 0, 0]} castShadow>
        <boxGeometry args={[0.7, 0.9, 0.08]} />
        <meshStandardMaterial color="#2b3038" metalness={0.22} roughness={0.44} />
      </mesh>
      <mesh position={[-0.3, -0.55, 0]} castShadow>
        <boxGeometry args={[0.42, 1.28, 0.48]} />
        <meshStandardMaterial color="#242328" roughness={0.94} />
      </mesh>
      <mesh position={[0.3, -0.55, 0]} castShadow>
        <boxGeometry args={[0.42, 1.28, 0.48]} />
        <meshStandardMaterial color="#242328" roughness={0.94} />
      </mesh>
      <mesh position={[-0.3, -1.28, 0.2]} castShadow>
        <boxGeometry args={[0.52, 0.25, 0.85]} />
        <meshStandardMaterial color="#7a3c8d" roughness={0.74} />
      </mesh>
      <mesh position={[0.3, -1.28, 0.2]} castShadow>
        <boxGeometry args={[0.52, 0.25, 0.85]} />
        <meshStandardMaterial color="#e08734" roughness={0.72} />
      </mesh>
    </group>
  );
}

export default function Pilot3D({ active = true }: PilotAvatarProps) {
  return (
    <div className="pilot-canvas" aria-label="Piloto 3D del estudiante con giro y flotación automática">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.3, 7.2], fov: 24 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#fbfaf7"]} />
        <ambientLight intensity={2.15} />
        <directionalLight position={[3, 5, 4]} intensity={3.2} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 2, 2]} intensity={1.25} color="#d9e9ef" />
        <pointLight position={[0, -1, 3]} intensity={0.55} color="#bd463d" />
        <PilotAvatar active={active} />
      </Canvas>
    </div>
  );
}
