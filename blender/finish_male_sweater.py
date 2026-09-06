from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-sweater-full-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-sweater-finished-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def bone_segment(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


def capsule_between(name, start, end, radius, material):
    direction = end - start
    bpy.ops.mesh.primitive_uv_sphere_add(segments=28, ring_count=18, location=(start + end) / 2)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (radius, radius, direction.length / 2 + radius * .32)
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    return obj


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
rig = bpy.data.objects["MALE_RIG"]
torso = bpy.data.objects["MALE_SWEATER_ANATOMICAL_V1"]
sleeves = bpy.data.objects["MALE_SLEEVES_ANATOMICAL_V1"]
black = bpy.data.materials["Male sweater black"]
purple = bpy.data.materials["Male sweater purple"]

# Clean base colors remove face-by-face sawtooth transitions.
for polygon in torso.data.polygons:
    polygon.material_index = 0
for polygon in sleeves.data.polygons:
    polygon.material_index = 1

collection = bpy.data.collections.new("MALE_SWEATER_FINISH_V1")
bpy.context.scene.collection.children.link(collection)
pieces = []

# A shallow rounded band overlaps the anatomical torso shell and creates a
# deliberate clean graphic stripe instead of a polygon-selection boundary.
spine = rig.pose.bones["spine"]
chest = rig.pose.bones["chest"]
torso_center = (rig.matrix_world @ spine.head + rig.matrix_world @ chest.tail) / 2
rotation = male_root.matrix_world.to_quaternion().to_euler()
bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=18,
                                     location=torso_center + Vector((0, 0, -.035)),
                                     rotation=rotation)
band = bpy.context.object
band.name = "MALE_SWEATER_CLEAN_BAND"
band.scale = (.31, .17, .085)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
band.data.materials.append(purple)
pieces.append(band)

for side in ("L", "R"):
    upper_start, upper_end = bone_segment(rig, f"upper_arm.{side}")
    shoulder_end = upper_start.lerp(upper_end, .42)
    pieces.append(capsule_between(f"MALE_SWEATER_SHOULDER_{side}", upper_start, shoulder_end, .138, black))

    fore_start, fore_end = bone_segment(rig, f"forearm.{side}")
    cuff_center = fore_start.lerp(fore_end, .87)
    direction = (fore_end - fore_start).normalized()
    bpy.ops.mesh.primitive_torus_add(major_radius=.092, minor_radius=.017,
                                     major_segments=28, minor_segments=10,
                                     location=cuff_center,
                                     rotation=direction.to_track_quat("Z", "Y").to_euler())
    cuff = bpy.context.object
    cuff.name = f"MALE_SWEATER_CUFF_{side}"
    cuff.data.materials.append(black)
    pieces.append(cuff)

for obj in pieces:
    for old_collection in list(obj.users_collection):
        old_collection.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, male_root)

bpy.context.scene["male_sweater_stage"] = (
    "v1 graphic finish; anatomical base, clean purple band, shoulder transitions and separate cuffs"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
