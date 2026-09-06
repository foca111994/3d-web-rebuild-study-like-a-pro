from pathlib import Path

import bmesh
import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-sweater-shell-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-sweater-full-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def bone_segment(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


def segment_metrics(point, start, end):
    axis = end - start
    length_squared = axis.length_squared
    if length_squared == 0:
        return (point - start).length, 0.0
    factor = max(0.0, min(1.0, (point - start).dot(axis) / length_squared))
    closest = start + axis * factor
    return (point - closest).length, factor


def segment_distance(point, start, end):
    return segment_metrics(point, start, end)[0]


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
body = bpy.data.objects["GEO-body_male_realistic"]
rig = bpy.data.objects["MALE_RIG"]
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]

for side in ("L", "R"):
    for prefix in ("MALE_SLEEVE_UPPER", "MALE_SLEEVE_FORE"):
        obj = bpy.data.objects.get(f"{prefix}_{side}")
        if obj:
            obj.hide_viewport = True
            obj.hide_render = True

segments = []
for side in ("L", "R"):
    segments.append(("upper", *bone_segment(rig, f"upper_arm.{side}")))
    segments.append(("fore", *bone_segment(rig, f"forearm.{side}")))

depsgraph = bpy.context.evaluated_depsgraph_get()
evaluated = body.evaluated_get(depsgraph)
mesh = bpy.data.meshes.new_from_object(evaluated, depsgraph=depsgraph)
sleeves = bpy.data.objects.new("MALE_SLEEVES_ANATOMICAL_V1", mesh)
bpy.context.scene.collection.objects.link(sleeves)
sleeves.matrix_world = body.matrix_world.copy()

bm = bmesh.new()
bm.from_mesh(mesh)
discard = []
for vert in bm.verts:
    world = sleeves.matrix_world @ vert.co
    inside = False
    for region, start, end in segments:
        distance, factor = segment_metrics(world, start, end)
        radius = .135 if region == "upper" else .115
        # Stop the forearm shell before the wrist so fingers retain skin.
        allowed_length = factor <= .88 if region == "fore" else True
        if distance <= radius and allowed_length:
            inside = True
            break
    if not inside or world.z < .73:
        discard.append(vert)
bmesh.ops.delete(bm, geom=discard, context="VERTS")
bm.to_mesh(mesh)
bm.free()
mesh.update()

black = bpy.data.materials["Male sweater black"]
purple = bpy.data.materials["Male sweater purple"]
sleeves.data.materials.append(black)
sleeves.data.materials.append(purple)
for polygon in sleeves.data.polygons:
    world = sleeves.matrix_world @ polygon.center
    upper_distance = min(segment_distance(world, start, end) for region, start, end in segments if region == "upper")
    fore_distance = min(segment_distance(world, start, end) for region, start, end in segments if region == "fore")
    polygon.material_index = 1 if fore_distance < upper_distance else 0
    polygon.use_smooth = True

decimate = sleeves.modifiers.new("Web preview reduction", "DECIMATE")
decimate.ratio = .09
bpy.context.view_layer.objects.active = sleeves
sleeves.select_set(True)
bpy.ops.object.modifier_apply(modifier=decimate.name)
sleeves.select_set(False)

solidify = sleeves.modifiers.new("Garment thickness", "SOLIDIFY")
solidify.thickness = .026
solidify.offset = 1.0
solidify.use_rim = True

collection = bpy.data.collections.new("MALE_SLEEVES_ANATOMICAL_V1")
bpy.context.scene.collection.children.link(collection)
for old_collection in list(sleeves.users_collection):
    old_collection.objects.unlink(sleeves)
collection.objects.link(sleeves)
parent_keep_world(sleeves, male_root)

bpy.context.scene["male_sleeves_stage"] = (
    "v1 reduced anatomical sleeve shells copied from posed arms; cuffs and final retopology pending"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT} with {len(mesh.vertices)} vertices and {len(mesh.polygons)} polygons")
