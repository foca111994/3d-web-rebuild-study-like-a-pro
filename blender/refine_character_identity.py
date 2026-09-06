from pathlib import Path
import math

import bmesh
import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-female-outfit-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-identity-v2.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy(); obj.parent = parent; obj.matrix_world = world


def head_center(rig):
    bone = rig.pose.bones["head"]
    return (rig.matrix_world @ bone.head + rig.matrix_world @ bone.tail) / 2


def ellipsoid(name, location, scale, material, rotation):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=36, ring_count=24, location=location, rotation=rotation)
    obj = bpy.context.object; obj.name = name; obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    return obj


def move_to_collection(obj, collection, parent):
    for old in list(obj.users_collection): old.objects.unlink(obj)
    collection.objects.link(obj); parent_keep_world(obj, parent)


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
for obj in bpy.data.objects:
    if obj.name.startswith(("FEMALE_BOB_", "FEMALE_GLASSES_", "FEMALE_HEADPHONE_")):
        obj.hide_viewport = True; obj.hide_render = True

collection = bpy.data.collections.new("CHARACTER_IDENTITY_V2")
bpy.context.scene.collection.children.link(collection)
hair = bpy.data.materials["Hair near black"]
frames = bpy.data.materials["Glasses dark frame"]
blue = bpy.data.materials["Female headphone blue"]
purple = bpy.data.materials["Female headphone purple"]
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
female_root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
male_rig = bpy.data.objects["MALE_RIG"]
female_rig = bpy.data.objects["FEMALE_RIG"]
mc = head_center(male_rig); fc = head_center(female_rig)
mr = male_root.matrix_world.to_quaternion().to_euler(); fr = female_root.matrix_world.to_quaternion().to_euler()
fq = female_root.matrix_world.to_quaternion(); forward = fq @ Vector((0, -1, 0)); right = fq @ Vector((1, 0, 0))

body = bpy.data.objects["GEO-body_male_realistic"]
depsgraph = bpy.context.evaluated_depsgraph_get()
mesh = bpy.data.meshes.new_from_object(body.evaluated_get(depsgraph), depsgraph=depsgraph)
buzz = bpy.data.objects.new("MALE_BUZZ_CUT_V2", mesh)
bpy.context.scene.collection.objects.link(buzz)
buzz.matrix_world = body.matrix_world.copy()
bm = bmesh.new(); bm.from_mesh(mesh)
discard = [vert for vert in bm.verts if (buzz.matrix_world @ vert.co).z < mc.z + .025]
bmesh.ops.delete(bm, geom=discard, context="VERTS"); bm.to_mesh(mesh); bm.free(); mesh.update()
mesh.materials.append(hair)
for polygon in mesh.polygons: polygon.use_smooth = True
decimate = buzz.modifiers.new("Buzz cut reduction", "DECIMATE"); decimate.ratio = .12
bpy.context.view_layer.objects.active = buzz; buzz.select_set(True)
bpy.ops.object.modifier_apply(modifier=decimate.name); buzz.select_set(False)
solidify = buzz.modifiers.new("Buzz cut thickness", "SOLIDIFY"); solidify.thickness = .006; solidify.offset = 1.0
pieces = [(buzz, male_root)]
for name, offset, scale in (
    ("FEMALE_BOB_CROWN_V2", -forward*.035 + Vector((0,0,.055)), (.132,.112,.115)),
    ("FEMALE_BOB_NAPE_V2", -forward*.065 + Vector((0,0,-.075)), (.125,.075,.105)),
    ("FEMALE_BOB_LEFT_V2", right*.105 - forward*.018 + Vector((0,0,-.055)), (.052,.068,.135)),
    ("FEMALE_BOB_RIGHT_V2", -right*.105 - forward*.018 + Vector((0,0,-.055)), (.052,.068,.135)),
): pieces.append((ellipsoid(name, fc+offset, scale, hair, fr), female_root))

lenses=[]
for side, sign in (("L",1),("R",-1)):
    center=fc+forward*.113+right*(sign*.057)+Vector((0,0,.002))
    bpy.ops.mesh.primitive_torus_add(major_radius=.041, minor_radius=.005, major_segments=28, minor_segments=8,
                                     location=center, rotation=(math.radians(90),0,fr.z))
    lens=bpy.context.object; lens.name=f"FEMALE_GLASSES_V2_{side}"; lens.scale.x=1.08
    lens.data.materials.append(frames); pieces.append((lens,female_root)); lenses.append(center)

head_right = right
for side, sign in (("L",1),("R",-1)):
    cup=ellipsoid(f"FEMALE_HEADPHONE_CUP_V2_{side}", fc+head_right*(sign*.118), (.035,.061,.078), purple, fr)
    pieces.append((cup,female_root))
bpy.ops.mesh.primitive_torus_add(major_radius=.118, minor_radius=.016, major_segments=32, minor_segments=10,
                                 location=fc+Vector((0,0,.06)), rotation=(math.radians(90),0,fr.z))
band=bpy.context.object; band.name="FEMALE_HEADPHONE_BAND_V2"; band.data.materials.append(blue); pieces.append((band,female_root))

for obj,parent in pieces: move_to_collection(obj,collection,parent)
bpy.context.scene["identity_stage"]="v2 close buzz cut, layered bob, lighter glasses and reduced headphones"
bpy.context.scene["web_model_status"]="not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
