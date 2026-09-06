from pathlib import Path
import math

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-composed-v2.blend"
OUTPUT = ROOT / "blender/students-pair-production-male-clothes-v1.blend"


def make_material(name, color, metallic=0.0, roughness=.6):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.diffuse_color = color
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def rounded_box(name, location, dimensions, mat, rotation=(0, 0, 0), bevel=.04):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new("Garment softness", "BEVEL")
    mod.width = bevel
    mod.segments = 3
    obj.data.materials.append(mat)
    return obj


def capsule_between(name, start, end, radius, mat):
    start = Vector(start)
    end = Vector(end)
    midpoint = (start + end) / 2
    direction = end - start
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=12, location=midpoint)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (radius, radius, direction.length / 2 + radius * .45)
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    return obj


def bone_points(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
rig = bpy.data.objects["MALE_RIG"]

collection = bpy.data.collections.get("MALE_CLOTHING_V1")
if not collection:
    collection = bpy.data.collections.new("MALE_CLOTHING_V1")
    bpy.context.scene.collection.children.link(collection)

black = make_material("Male sweater black", (.018, .022, .028, 1), roughness=.72)
purple = make_material("Male sweater purple", (.34, .025, .48, 1), roughness=.62)
cargo = make_material("Male cargo charcoal", (.055, .048, .045, 1), roughness=.82)
shoe_purple = make_material("Male shoe purple", (.28, .035, .46, 1), roughness=.48)
shoe_orange = make_material("Male shoe orange", (1.0, .22, .015, 1), roughness=.5)

created = []
root_rotation = male_root.matrix_world.to_quaternion().to_euler()
pelvis_head, _ = bone_points(rig, "pelvis")
_, chest_tail = bone_points(rig, "chest")
torso_center = (pelvis_head + chest_tail) / 2 + Vector((0, 0, .035))
created.append(rounded_box("MALE_SWEATER_TORSO", torso_center, (.66, .38, .59), black,
                           rotation=root_rotation, bevel=.12))
forward = male_root.matrix_world.to_quaternion() @ Vector((0, -1, 0))
stripe_center = torso_center + forward * .205
created.append(rounded_box("MALE_SWEATER_STRIPE", stripe_center, (.675, .026, .19), purple,
                           rotation=root_rotation, bevel=.025))

for side in ("L", "R"):
    upper_start, upper_end = bone_points(rig, f"upper_arm.{side}")
    fore_start, fore_end = bone_points(rig, f"forearm.{side}")
    created.append(capsule_between(f"MALE_SLEEVE_UPPER_{side}", upper_start, upper_end, .115, black))
    created.append(capsule_between(f"MALE_SLEEVE_FORE_{side}", fore_start, fore_end, .105, purple))

    thigh_start, thigh_end = bone_points(rig, f"thigh.{side}")
    shin_start, shin_end = bone_points(rig, f"shin.{side}")
    created.append(capsule_between(f"MALE_CARGO_THIGH_{side}", thigh_start, thigh_end, .17, cargo))
    created.append(capsule_between(f"MALE_CARGO_SHIN_{side}", shin_start, shin_end, .145, cargo))

    foot_start, foot_end = bone_points(rig, f"foot.{side}")
    shoe_center = (foot_start + foot_end) / 2 + Vector((0, -.025, .015))
    shoe = rounded_box(f"MALE_SHOE_{side}", shoe_center, (.23, .38, .15), shoe_purple,
                       rotation=root_rotation, bevel=.055)
    created.append(shoe)
    accent_center = shoe_center + (male_root.matrix_world.to_quaternion() @ Vector((0, -.195, .01)))
    created.append(rounded_box(f"MALE_SHOE_ACCENT_{side}", accent_center, (.16, .025, .07), shoe_orange,
                               rotation=root_rotation, bevel=.018))

for obj in created:
    for existing_collection in list(obj.users_collection):
        existing_collection.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, male_root)

bpy.context.scene["male_clothing_stage"] = (
    "v1 stylized silhouette; separate editable garments; topology and skinning pending"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
