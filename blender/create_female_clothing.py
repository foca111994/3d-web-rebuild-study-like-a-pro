from pathlib import Path
import math

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-male-clothes-v2.blend"
OUTPUT = ROOT / "blender/students-pair-production-both-clothes-v1.blend"


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


def ellipsoid(name, location, scale, mat, rotation):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    return obj


def capsule_between(name, start, end, radius, mat):
    start = Vector(start)
    end = Vector(end)
    midpoint = (start + end) / 2
    direction = end - start
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=16, location=midpoint)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (radius, radius, direction.length / 2 + radius * .42)
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    return obj


def rounded_box(name, location, dimensions, mat, rotation, bevel=.035):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new("Soft edges", "BEVEL")
    mod.width = bevel
    mod.segments = 3
    obj.data.materials.append(mat)
    return obj


def bone_points(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
female_root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
rig = bpy.data.objects["FEMALE_RIG"]

collection = bpy.data.collections.new("FEMALE_CLOTHING_V1")
bpy.context.scene.collection.children.link(collection)

yellow = make_material("Female hoodie yellow", (.92, .50, .015, 1), roughness=.72)
yellow_dark = make_material("Female hoodie shadow", (.58, .245, .008, 1), roughness=.76)
denim = make_material("Female denim blue", (.035, .20, .39, 1), roughness=.78)
shoe_blue = make_material("Female shoe blue", (.025, .13, .34, 1), roughness=.52)
shoe_cream = make_material("Female shoe cream", (.84, .78, .65, 1), roughness=.7)
headphone_blue = make_material("Female headphone blue", (.015, .12, .48, 1), metallic=.22, roughness=.35)
headphone_purple = make_material("Female headphone purple", (.29, .025, .53, 1), metallic=.12, roughness=.42)

rotation = female_root.matrix_world.to_quaternion().to_euler()
root_quat = female_root.matrix_world.to_quaternion()
pelvis_head, _ = bone_points(rig, "pelvis")
_, chest_tail = bone_points(rig, "chest")
torso_center = (pelvis_head + chest_tail) / 2 + Vector((0, 0, .025))

pieces = [
    ellipsoid("FEMALE_HOODIE_UPPER", torso_center + Vector((0, 0, .11)),
              (.285, .155, .22), yellow, rotation),
    ellipsoid("FEMALE_HOODIE_LOWER", torso_center + Vector((0, 0, -.16)),
              (.29, .16, .18), yellow, rotation),
]

# Hood volume stays separate so its final cloth shape can be rebuilt later.
_, neck_tail = bone_points(rig, "neck")
hood_center = neck_tail + (root_quat @ Vector((0, .085, -.015)))
pieces.append(ellipsoid("FEMALE_HOOD", hood_center, (.19, .13, .20), yellow_dark, rotation))

for side in ("L", "R"):
    upper_start, upper_end = bone_points(rig, f"upper_arm.{side}")
    fore_start, fore_end = bone_points(rig, f"forearm.{side}")
    pieces.append(capsule_between(f"FEMALE_HOODIE_SLEEVE_UPPER_{side}", upper_start, upper_end, .105, yellow))
    pieces.append(capsule_between(f"FEMALE_HOODIE_SLEEVE_FORE_{side}", fore_start, fore_end, .095, yellow))

    thigh_start, thigh_end = bone_points(rig, f"thigh.{side}")
    shin_start, shin_end = bone_points(rig, f"shin.{side}")
    pieces.append(capsule_between(f"FEMALE_JEANS_THIGH_{side}", thigh_start, thigh_end, .145, denim))
    pieces.append(capsule_between(f"FEMALE_JEANS_SHIN_{side}", shin_start, shin_end, .125, denim))

    foot_start, foot_end = bone_points(rig, f"foot.{side}")
    shoe_center = (foot_start + foot_end) / 2 + Vector((0, -.02, .012))
    pieces.append(rounded_box(f"FEMALE_SHOE_{side}", shoe_center, (.21, .35, .14), shoe_blue, rotation, .05))
    sole_center = shoe_center + Vector((0, 0, -.07))
    pieces.append(rounded_box(f"FEMALE_SHOE_SOLE_{side}", sole_center, (.22, .36, .045), shoe_cream, rotation, .018))

head_start, head_end = bone_points(rig, "head")
head_center = (head_start + head_end) / 2
right = root_quat @ Vector((1, 0, 0))
for side, sign in (("L", 1), ("R", -1)):
    ear_center = head_center + right * (sign * .115)
    pieces.append(ellipsoid(f"FEMALE_HEADPHONE_CUP_{side}", ear_center,
                            (.045, .075, .095), headphone_purple, rotation))

bpy.ops.mesh.primitive_torus_add(major_radius=.125, minor_radius=.022, major_segments=32, minor_segments=10,
                                 location=head_center + Vector((0, 0, .055)),
                                 rotation=(math.radians(90), 0, rotation.z))
band = bpy.context.object
band.name = "FEMALE_HEADPHONE_BAND"
band.data.materials.append(headphone_blue)
pieces.append(band)

for obj in pieces:
    for existing_collection in list(obj.users_collection):
        existing_collection.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, female_root)

bpy.context.scene["female_clothing_stage"] = (
    "v1 stylized silhouette; separate hoodie, jeans, shoes and headphones; final topology pending"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
