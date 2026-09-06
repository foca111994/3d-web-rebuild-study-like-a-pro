from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-sweater-finished-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-cargo-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def bone_points(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


def capsule(name, start, end, radius, material):
    direction = end - start
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, location=(start + end) / 2)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (radius, radius * .86, direction.length / 2 + radius * .24)
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    return obj


def pocket(name, location, rotation, material, side):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = (.135, .052, .17)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bevel = obj.modifiers.new("Soft cargo pocket", "BEVEL")
    bevel.width = .018
    bevel.segments = 3
    obj.data.materials.append(material)
    return obj


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
rig = bpy.data.objects["MALE_RIG"]
cargo = bpy.data.materials["Male cargo charcoal"]

for obj in bpy.data.objects:
    if obj.name.startswith(("MALE_CARGO_THIGH_", "MALE_CARGO_SHIN_", "MALE_CARGO_POCKET_")):
        obj.hide_viewport = True
        obj.hide_render = True

collection = bpy.data.collections.new("MALE_CARGO_REFINED_V1")
bpy.context.scene.collection.children.link(collection)
pieces = []
root_rotation = male_root.matrix_world.to_quaternion().to_euler()
root_quat = male_root.matrix_world.to_quaternion()

for side, sign in (("L", 1), ("R", -1)):
    thigh_start, thigh_end = bone_points(rig, f"thigh.{side}")
    shin_start, shin_end = bone_points(rig, f"shin.{side}")
    pieces.append(capsule(f"MALE_CARGO_REFINED_THIGH_{side}", thigh_start, thigh_end, .175, cargo))
    pieces.append(capsule(f"MALE_CARGO_REFINED_SHIN_{side}", shin_start, shin_end, .142, cargo))
    midpoint = thigh_start.lerp(thigh_end, .57)
    outward = root_quat @ Vector((sign * .176, 0, 0))
    pieces.append(pocket(f"MALE_CARGO_REFINED_POCKET_{side}", midpoint + outward,
                         root_rotation, cargo, side))

for obj in pieces:
    for old_collection in list(obj.users_collection):
        old_collection.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, male_root)

bpy.context.scene["male_cargo_stage"] = "v1 cleaner seated silhouette with separate editable side pockets"
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
