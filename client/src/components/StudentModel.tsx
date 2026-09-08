import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export const STUDENT_MODEL_URL = "/models/student.glb";
export const STUDENT_COMPANION_MODEL_URL = "/models/student-companion.glb";
export const STUDENTS_BLOCKOUT_MODEL_URL = "/models/blockout/students-pair-blockout-open.glb";

type StudentModelProps = { url?: string; targetSize?: number; onReady?: () => void };

export default function StudentModel({ url = STUDENT_MODEL_URL, targetSize = 3.12, onReady }: StudentModelProps) {
  const { scene } = useGLTF(url);

  const normalized = useMemo(() => {
    const model = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const longestSide = Math.max(size.x, size.y, size.z);
    // A little more breathing room than the original blockout: the generated
    // pair and vending machine are much wider and must remain visible while rotating.
    const scale = longestSide > 0 ? targetSize / longestSide : 1;
    const softenKnittedSurface = url.includes("start-smart");

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        const tuned = materials.map((source) => {
          const material = source.clone();
          if (material instanceof THREE.MeshStandardMaterial) {
            material.envMapIntensity = softenKnittedSurface ? 0.22 : 0.38;
            if (softenKnittedSurface && material.normalMap) {
              material.normalScale.setScalar(0.16);
              material.roughness = Math.max(material.roughness, 0.78);
            }
            if (material.map) {
              material.map.anisotropy = 4;
              material.map.generateMipmaps = true;
              material.map.minFilter = THREE.LinearMipmapLinearFilter;
            }
          }
          return material;
        });
        child.material = Array.isArray(child.material) ? tuned : tuned[0];
      }
    });

    return { model, position: center.multiplyScalar(-scale), scale };
  }, [scene, targetSize, url]);

  useEffect(() => { onReady?.(); }, [normalized]);
  useEffect(() => () => {
    normalized.model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach(material => material.dispose());
      }
    });
  }, [normalized]);

  return (
    <primitive
      dispose={null}
      object={normalized.model}
      position={normalized.position}
      scale={normalized.scale}
    />
  );
}
