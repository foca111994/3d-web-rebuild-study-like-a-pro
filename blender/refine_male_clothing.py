from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-male-clothes-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-male-clothes-v2.blend"


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


def rounded_box(name, location, dimensions, material, rotation, bevel=.025):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new("Pocket softness", "BEVEL")
    mod.width = bevel
    mod.segments = 3
    obj.data.materials.append(material)
    return obj


def bone_points(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
rig = bpy.data.objects["MALE_RIG"]

v1 = bpy.data.collections.get("MALE_CLOTHING_V1")
if v1:
    for name in ("MALE_SWEATER_TORSO", "MALE_SWEATER_STRIPE"):
        obj = bpy.data.objects.get(name)
        if obj:
            obj.hide_viewport = True
            obj.hide_render = True

collection = bpy.data.collections.get("MALE_CLOTHING_V2")
if not collection:
    collection = bpy.data.collections.new("MALE_CLOTHING_V2")
    bpy.context.scene.collection.children.link(collection)

black = bpy.data.materials["Male sweater black"]
purple = bpy.data.materials["Male sweater purple"]
cargo = bpy.data.materials["Male cargo charcoal"]

pelvis_head, _ = bone_points(rig, "pelvis")
_, chest_tail = bone_points(rig, "chest")
torso_center = (pelvis_head + chest_tail) / 2 + Vector((0, 0, .035))
rotation = male_root.matrix_world.to_quaternion().to_euler()

pieces = [
    ellipsoid("MALE_SWEATER_UPPER_V2", torso_center + Vector((0, 0, .145)),
              (.295, .155, .225), black, rotation),
    ellipsoid("MALE_SWEATER_BAND_V2", torso_center + Vector((0, 0, -.045)),
              (.305, .165, .105), purple, rotation),
    ellipsoid("MALE_SWEATER_LOWER_V2", torso_center + Vector((0, 0, -.19)),
              (.27, .15, .145), black, rotation),
]

root_quat = male_root.matrix_world.to_quaternion()
for side, sign in (("L", 1), ("R", -1)):
    thigh_start, thigh_end = bone_points(rig, f"thigh.{side}")
    midpoint = (thigh_start + thigh_end) / 2
    outward = root_quat @ Vector((sign * .18, 0, 0))
    pocket_center = midpoint + outward
    pieces.append(rounded_box(f"MALE_CARGO_POCKET_{side}_V2", pocket_center,
                              (.13, .08, .19), cargo, rotation))

for obj in pieces:
    for existing_collection in list(obj.users_collection):
        existing_collection.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, male_root)

bpy.context.scene["male_clothing_stage"] = (
    "v2 anatomical silhouette; rounded sweater sections and editable cargo pockets; final topology pending"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
