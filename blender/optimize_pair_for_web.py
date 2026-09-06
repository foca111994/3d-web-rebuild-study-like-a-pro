from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-cleanup-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-web-optimized-v1.blend"


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))

# Remove previous construction versions and reference-only objects from this copy.
# The cleanup checkpoint remains untouched and is the recoverable source.
for obj in list(bpy.data.objects):
    if obj.hide_render:
        bpy.data.objects.remove(obj, do_unlink=True)

for collection_name in ("REFERENCES", "SCENE_GUIDES", "MODELS"):
    collection = bpy.data.collections.get(collection_name)
    if collection:
        bpy.data.collections.remove(collection)

# Reduce only dense visible surfaces. Small props and silhouette-defining pieces
# remain unchanged. Decimate is applied in this web copy, never in the source.
optimized = []
for obj in list(bpy.data.objects):
    if (
        obj.type != "MESH"
        or len(obj.data.polygons) < 2000
        or obj.name.startswith("GEO-body_")
    ):
        continue
    before = len(obj.data.polygons)
    modifier = obj.modifiers.new(name="WEB_DECIMATE_V1", type="DECIMATE")
    modifier.decimate_type = "COLLAPSE"
    modifier.ratio = 0.68
    modifier.use_collapse_triangulate = True
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.modifier_apply(modifier=modifier.name)
    obj.select_set(False)
    optimized.append((obj.name, before, len(obj.data.polygons)))

# Remove unused data left by deleted construction versions.
for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.images):
    for datablock in list(datablocks):
        if datablock.users == 0:
            datablocks.remove(datablock)

bpy.context.scene["web_optimization_stage"] = (
    "v1 removed hidden construction/reference objects and conservatively decimated dense visible meshes"
)
bpy.context.scene["web_model_status"] = "optimized review copy; no GLB exported"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))

print("OPTIMIZED_MESHES")
for name, before, after in optimized:
    print(f"{name}: {before} -> {after} polygons")
print(f"Saved {OUTPUT}")
