from pathlib import Path

import bmesh
import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-heads-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-sweater-shell-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
body = bpy.data.objects["GEO-body_male_realistic"]
rig = bpy.data.objects["MALE_RIG"]
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]

for name in ("MALE_SWEATER_UPPER_V2", "MALE_SWEATER_BAND_V2", "MALE_SWEATER_LOWER_V2"):
    obj = bpy.data.objects.get(name)
    if obj:
        obj.hide_viewport = True
        obj.hide_render = True

depsgraph = bpy.context.evaluated_depsgraph_get()
evaluated = body.evaluated_get(depsgraph)
mesh = bpy.data.meshes.new_from_object(evaluated, depsgraph=depsgraph)
sweater = bpy.data.objects.new("MALE_SWEATER_ANATOMICAL_V1", mesh)
bpy.context.scene.collection.objects.link(sweater)
sweater.matrix_world = body.matrix_world.copy()

chest = rig.pose.bones["chest"]
spine = rig.pose.bones["spine"]
center = (
    rig.matrix_world @ spine.head
    + rig.matrix_world @ chest.tail
) / 2

bm = bmesh.new()
bm.from_mesh(mesh)
discard = []
for vert in bm.verts:
    world = sweater.matrix_world @ vert.co
    relative = world - center
    if not (.98 <= world.z <= 1.47 and abs(relative.x) <= .32 and abs(relative.y) <= .25):
        discard.append(vert)
bmesh.ops.delete(bm, geom=discard, context="VERTS")
bm.to_mesh(mesh)
bm.free()
mesh.update()

black = bpy.data.materials["Male sweater black"]
purple = bpy.data.materials["Male sweater purple"]
sweater.data.materials.append(black)
sweater.data.materials.append(purple)
for polygon in sweater.data.polygons:
    center_world = sweater.matrix_world @ polygon.center
    polygon.material_index = 1 if 1.15 <= center_world.z <= 1.29 else 0
    polygon.use_smooth = True

decimate = sweater.modifiers.new("Web preview reduction", "DECIMATE")
decimate.ratio = .045
bpy.context.view_layer.objects.active = sweater
sweater.select_set(True)
bpy.ops.object.modifier_apply(modifier=decimate.name)
sweater.select_set(False)

solidify = sweater.modifiers.new("Garment thickness", "SOLIDIFY")
solidify.thickness = .032
solidify.offset = 1.0
solidify.use_rim = True

collection = bpy.data.collections.new("MALE_SWEATER_ANATOMICAL_V1")
bpy.context.scene.collection.children.link(collection)
for old_collection in list(sweater.users_collection):
    old_collection.objects.unlink(sweater)
collection.objects.link(sweater)
parent_keep_world(sweater, male_root)

bpy.context.scene["male_sweater_stage"] = (
    "v1 reduced anatomical torso shell copied from posed body; separate sleeves and final retopology pending"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT} with {len(mesh.vertices)} vertices and {len(mesh.polygons)} polygons")
