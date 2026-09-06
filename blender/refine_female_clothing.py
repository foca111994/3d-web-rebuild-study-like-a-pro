from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-both-clothes-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-both-clothes-v2.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def ellipsoid(name, location, scale, material, rotation):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    return obj


def bone_points(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
female_root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
rig = bpy.data.objects["FEMALE_RIG"]

for name in ("FEMALE_HOODIE_UPPER", "FEMALE_HOODIE_LOWER", "FEMALE_HOOD"):
    obj = bpy.data.objects.get(name)
    if obj:
        obj.hide_viewport = True
        obj.hide_render = True

collection = bpy.data.collections.new("FEMALE_CLOTHING_V2")
bpy.context.scene.collection.children.link(collection)

yellow = bpy.data.materials["Female hoodie yellow"]
yellow_dark = bpy.data.materials["Female hoodie shadow"]
rotation = female_root.matrix_world.to_quaternion().to_euler()
root_quat = female_root.matrix_world.to_quaternion()

pelvis_head, _ = bone_points(rig, "pelvis")
_, chest_tail = bone_points(rig, "chest")
torso_center = (pelvis_head + chest_tail) / 2 + Vector((0, 0, .02))
_, neck_tail = bone_points(rig, "neck")

pieces = [
    ellipsoid("FEMALE_HOODIE_UPPER_V2", torso_center + Vector((0, 0, .10)),
              (.255, .135, .205), yellow, rotation),
    ellipsoid("FEMALE_HOODIE_LOWER_V2", torso_center + Vector((0, 0, -.145)),
              (.265, .14, .16), yellow, rotation),
    ellipsoid("FEMALE_HOOD_V2", neck_tail + (root_quat @ Vector((0, .065, -.025))),
              (.15, .10, .165), yellow_dark, rotation),
]

# Tighten the construction volumes around the posed limbs without changing
# their length or losing the deliberately relaxed student silhouette.
for side in ("L", "R"):
    for prefix in ("FEMALE_HOODIE_SLEEVE_UPPER", "FEMALE_HOODIE_SLEEVE_FORE"):
        sleeve = bpy.data.objects[f"{prefix}_{side}"]
        sleeve.scale.x *= .82
        sleeve.scale.y *= .82
    for prefix in ("FEMALE_JEANS_THIGH", "FEMALE_JEANS_SHIN"):
        jeans = bpy.data.objects[f"{prefix}_{side}"]
        jeans.scale.x *= .86
        jeans.scale.y *= .86
    cup = bpy.data.objects[f"FEMALE_HEADPHONE_CUP_{side}"]
    cup.scale *= .88

for obj in pieces:
    for existing_collection in list(obj.users_collection):
        existing_collection.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, female_root)

bpy.context.scene["female_clothing_stage"] = (
    "v2 refined silhouette; reduced hoodie depth, hood size and limb volume; final topology pending"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
