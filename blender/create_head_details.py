from pathlib import Path
import math

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-both-clothes-v2.blend"
OUTPUT = ROOT / "blender/students-pair-production-heads-v1.blend"


def make_material(name, color, metallic=0.0, roughness=.55):
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


def ellipsoid(name, location, scale, material, rotation):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    return obj


def cylinder_between(name, start, end, radius, material):
    start = Vector(start)
    end = Vector(end)
    direction = end - start
    bpy.ops.mesh.primitive_cylinder_add(vertices=20, radius=radius, depth=direction.length,
                                       location=(start + end) / 2)
    obj = bpy.context.object
    obj.name = name
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    obj.data.materials.append(material)
    return obj


def head_center(rig):
    bone = rig.pose.bones["head"]
    return (rig.matrix_world @ bone.head + rig.matrix_world @ bone.tail) / 2


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
collection = bpy.data.collections.new("HEAD_DETAILS_V1")
bpy.context.scene.collection.children.link(collection)

hair = make_material("Hair near black", (.012, .016, .022, 1), roughness=.7)
frames = make_material("Glasses dark frame", (.012, .018, .026, 1), metallic=.25, roughness=.3)

male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
female_root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
male_rig = bpy.data.objects["MALE_RIG"]
female_rig = bpy.data.objects["FEMALE_RIG"]
male_head = head_center(male_rig)
female_head = head_center(female_rig)

male_rotation = male_root.matrix_world.to_quaternion().to_euler()
female_rotation = female_root.matrix_world.to_quaternion().to_euler()
female_forward = female_root.matrix_world.to_quaternion() @ Vector((0, -1, 0))
female_right = female_root.matrix_world.to_quaternion() @ Vector((1, 0, 0))

# The male base already carries the correct shaved silhouette. Fine buzz-cut
# detail belongs in its later texture pass rather than as floating geometry.
male_pieces = []

female_pieces = [
    ellipsoid("FEMALE_BOB_CROWN", female_head - female_forward * .045 + Vector((0, 0, .035)),
              (.135, .115, .13), hair, female_rotation),
    ellipsoid("FEMALE_BOB_LEFT", female_head + female_right * .105 - female_forward * .025 + Vector((0, 0, -.07)),
              (.055, .075, .14), hair, female_rotation),
    ellipsoid("FEMALE_BOB_RIGHT", female_head - female_right * .105 - female_forward * .025 + Vector((0, 0, -.07)),
              (.055, .075, .14), hair, female_rotation),
]

lens_center = female_head + female_forward * .112 + Vector((0, 0, .005))
lens_centers = []
for side, sign in (("L", 1), ("R", -1)):
    center = lens_center + female_right * (sign * .058)
    lens_centers.append(center)
    bpy.ops.mesh.primitive_torus_add(major_radius=.044, minor_radius=.007,
                                     major_segments=24, minor_segments=8,
                                     location=center,
                                     rotation=(math.radians(90), 0, female_rotation.z))
    lens = bpy.context.object
    lens.name = f"FEMALE_GLASSES_LENS_{side}"
    lens.data.materials.append(frames)
    female_pieces.append(lens)

female_pieces.append(cylinder_between("FEMALE_GLASSES_BRIDGE", lens_centers[0], lens_centers[1], .006, frames))

for obj in male_pieces:
    for old_collection in list(obj.users_collection):
        old_collection.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, male_root)

for obj in female_pieces:
    for old_collection in list(obj.users_collection):
        old_collection.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, female_root)

bpy.context.scene["head_detail_stage"] = (
    "v1 editable identity pass; shaved male base, female bob and glasses; facial detailing pending"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
