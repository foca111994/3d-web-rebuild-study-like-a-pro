from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-static-web-v4.blend"
OUTPUT = Path("/private/tmp/slp-students-pair-test-v6.glb")


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
bpy.ops.object.select_all(action="SELECT")

bpy.ops.export_scene.gltf(
    filepath=str(OUTPUT),
    export_format="GLB",
    use_selection=True,
    export_animations=False,
    export_cameras=False,
    export_lights=False,
    export_apply=False,
    export_yup=True,
)

print(f"TEST_GLB {OUTPUT}")
print(f"TEST_GLB_BYTES {OUTPUT.stat().st_size}")
