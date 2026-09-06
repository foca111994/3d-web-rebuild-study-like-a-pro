from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SCENE_SOURCE = ROOT / "blender/students-pair.blend"
BASE_SOURCE = (
    ROOT
    / "blender/vendor/human-base-meshes-bundle-v1.4.1"
    / "human_base_meshes_bundle.blend"
)
OUTPUT = ROOT / "blender/students-pair-production.blend"

BASES = (
    ("Body Male - Realistic", "PRODUCTION_MALE_BASE", -0.58, -2.2643022537),
    ("Body Female - Realistic", "PRODUCTION_FEMALE_BASE", 0.58, -1.3400524855),
)


def append_collection(source_name: str):
    with bpy.data.libraries.load(str(BASE_SOURCE), link=False) as (source, target):
        if source_name not in source.collections:
            raise RuntimeError(f"Missing official Blender asset: {source_name}")
        target.collections = [source_name]
    return target.collections[0]


bpy.ops.wm.open_mainfile(filepath=str(SCENE_SOURCE))

production = bpy.data.collections.get("PRODUCTION_BASES")
if production is None:
    production = bpy.data.collections.new("PRODUCTION_BASES")
    bpy.context.scene.collection.children.link(production)

for source_name, final_name, target_x, source_x in BASES:
    collection = append_collection(source_name)
    collection.name = final_name
    production.children.link(collection)

    # The official asset bundle stores the bodies in a horizontal catalogue.
    # Recenter each body and keep enough space for rigging inspection.
    for obj in collection.objects:
        obj.location.x += target_x - source_x
        obj.hide_render = False
        obj.hide_viewport = False
        if obj.type == "MESH":
            obj.show_wire = False
            obj.show_all_edges = False

    collection["source"] = "Blender Human Base Meshes v1.4.1"
    collection["license"] = "CC0"
    collection["workflow_stage"] = "unposed production anatomy base"

# The blockout stays hidden in this file as a measurable pose reference.
models = bpy.data.collections.get("MODELS")
if models:
    models.hide_viewport = True
    models.hide_render = True

bpy.context.scene["production_note"] = (
    "Official CC0 anatomy bases imported. Next stage: rig and seated pose."
)
bpy.context.scene["approved_pair_opening_degrees"] = 24.0
bpy.context.scene["approved_pair_separation_degrees"] = 156.0

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")

