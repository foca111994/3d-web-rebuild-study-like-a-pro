from pathlib import Path

import bmesh
import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-cargo-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-female-hoodie-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def distance_to_segment(point, start, end):
    line = end - start
    factor = max(0.0, min(1.0, (point - start).dot(line) / line.length_squared))
    return (point - (start + line * factor)).length, factor


def evaluated_copy(body, name):
    depsgraph = bpy.context.evaluated_depsgraph_get()
    mesh = bpy.data.meshes.new_from_object(body.evaluated_get(depsgraph), depsgraph=depsgraph)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    obj.matrix_world = body.matrix_world.copy()
    return obj


def finish_shell(obj, material, ratio):
    obj.data.materials.append(material)
    for polygon in obj.data.polygons:
        polygon.use_smooth = True
    decimate = obj.modifiers.new("Web preview reduction", "DECIMATE")
    decimate.ratio = ratio
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.modifier_apply(modifier=decimate.name)
    obj.select_set(False)
    solidify = obj.modifiers.new("Garment thickness", "SOLIDIFY")
    solidify.thickness = .025
    solidify.offset = 1.0


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
body = bpy.data.objects["GEO-body_female_realistic"]
rig = bpy.data.objects["FEMALE_RIG"]
root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
yellow = bpy.data.materials["Female hoodie yellow"]

for obj in bpy.data.objects:
    if obj.name.startswith(("FEMALE_HOODIE_UPPER", "FEMALE_HOODIE_LOWER", "FEMALE_HOODIE_SLEEVE_")):
        obj.hide_viewport = True
        obj.hide_render = True

collection = bpy.data.collections.new("FEMALE_HOODIE_ANATOMICAL_V1")
bpy.context.scene.collection.children.link(collection)

torso = evaluated_copy(body, "FEMALE_HOODIE_TORSO_ANATOMICAL_V1")
bm = bmesh.new(); bm.from_mesh(torso.data)
discard = []
for vert in bm.verts:
    world = torso.matrix_world @ vert.co
    if not (1.00 <= world.z <= 1.39):
        discard.append(vert)
bmesh.ops.delete(bm, geom=discard, context="VERTS"); bm.to_mesh(torso.data); bm.free()
finish_shell(torso, yellow, .05)

sleeves = evaluated_copy(body, "FEMALE_HOODIE_SLEEVES_ANATOMICAL_V1")
hand_groups = {sleeves.vertex_groups[name].index for name in ("hand.L", "hand.R")}
hand_vertices = {
    vert.index for vert in sleeves.data.vertices
    if any(group.group in hand_groups and group.weight > 0.0 for group in vert.groups)
}
segments = []
for side in ("L", "R"):
    for bone_name, end_limit in ((f"upper_arm.{side}", 1.0), (f"forearm.{side}", .78)):
        bone = rig.pose.bones[bone_name]
        segments.append((rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail, end_limit))
bm = bmesh.new(); bm.from_mesh(sleeves.data)
discard = []
for vert in bm.verts:
    world = sleeves.matrix_world @ vert.co
    matches = [distance_to_segment(world, a, b)[0] <= .125 and distance_to_segment(world, a, b)[1] <= limit
               for a, b, limit in segments]
    if vert.index in hand_vertices or not any(matches):
        discard.append(vert)
bmesh.ops.delete(bm, geom=discard, context="VERTS"); bm.to_mesh(sleeves.data); bm.free()
finish_shell(sleeves, yellow, .055)

for obj in (torso, sleeves):
    for old in list(obj.users_collection): old.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, root)

bpy.context.scene["female_hoodie_stage"] = "v1 anatomical torso and sleeve shells; hood remains independently editable"
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT} with torso {len(torso.data.vertices)} verts and sleeves {len(sleeves.data.vertices)} verts")
