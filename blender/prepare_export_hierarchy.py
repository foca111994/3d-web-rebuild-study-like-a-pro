from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-web-materials-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-export-ready-v1.blend"


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
scene = bpy.context.scene

pair_root = bpy.data.objects["PAIR_TURNTABLE"]
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
female_root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
pair_root.name = "SLP_STUDENTS_PAIR"

# Bake only outstanding object scales. This preserves the approved world-space
# silhouettes while ensuring predictable glTF transforms.
normalized = []
for obj in list(scene.objects):
    if not any(abs(value - 1.0) > 1e-5 for value in obj.scale):
        continue
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    normalized.append(obj.name)


def descendants(root):
    result = set()
    pending = list(root.children)
    while pending:
        obj = pending.pop()
        if obj in result:
            continue
        result.add(obj)
        pending.extend(obj.children)
    return result


male_objects = descendants(male_root) | {male_root}
female_objects = descendants(female_root) | {female_root}

# Build an explicit export collection while retaining one shared root and two
# independent character roots for combined or separate future exports.
for name in ("WEB_EXPORT", "WEB_EXPORT_MALE", "WEB_EXPORT_FEMALE"):
    old = bpy.data.collections.get(name)
    if old:
        bpy.data.collections.remove(old)

export_collection = bpy.data.collections.new("WEB_EXPORT")
male_collection = bpy.data.collections.new("WEB_EXPORT_MALE")
female_collection = bpy.data.collections.new("WEB_EXPORT_FEMALE")
scene.collection.children.link(export_collection)
export_collection.children.link(male_collection)
export_collection.children.link(female_collection)

for obj in list(scene.objects):
    for collection in list(obj.users_collection):
        collection.objects.unlink(obj)
    if obj == pair_root:
        export_collection.objects.link(obj)
    elif obj in male_objects:
        male_collection.objects.link(obj)
    elif obj in female_objects:
        female_collection.objects.link(obj)
    else:
        export_collection.objects.link(obj)

for collection in list(bpy.data.collections):
    if collection.name not in {"WEB_EXPORT", "WEB_EXPORT_MALE", "WEB_EXPORT_FEMALE"}:
        bpy.data.collections.remove(collection)

scene["export_root"] = pair_root.name
scene["male_export_root"] = male_root.name
scene["female_export_root"] = female_root.name
scene["export_hierarchy_stage"] = "v1 clean collection hierarchy and normalized object scales"
scene["web_model_status"] = "export-ready Blender checkpoint; no GLB exported"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))

print(f"NORMALIZED_SCALES {len(normalized)}")
for name in normalized:
    print(name)
print(f"PAIR_ROOT {pair_root.name} children={len(pair_root.children)}")
print(f"MALE_ROOT {male_root.name} descendants={len(male_objects) - 1}")
print(f"FEMALE_ROOT {female_root.name} descendants={len(female_objects) - 1}")
print(f"Saved {OUTPUT}")
