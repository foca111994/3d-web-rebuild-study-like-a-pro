from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-identity-v2.blend"
OUTPUT = ROOT / "blender/students-pair-production-props-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy(); obj.parent = parent; obj.matrix_world = world


def rounded_box(name, location, dimensions, rotation, material, bevel):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object; obj.name = name; obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new("Soft prop edges", "BEVEL"); mod.width = bevel; mod.segments = 4
    obj.data.materials.append(material); return obj


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
female_root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
pages = bpy.data.materials.get("Book pages")
cover_mat = bpy.data.materials.get("Book cover blue")
tablet_mat = bpy.data.materials.get("Tablet dark")
screen_mat = bpy.data.materials.get("Tablet screen")

for obj in bpy.data.objects:
    if obj.name.startswith(("MALE_BOOK_", "FEMALE_TABLET")):
        obj.hide_viewport = True; obj.hide_render = True

collection = bpy.data.collections.new("STUDY_PROPS_REFINED_V1")
bpy.context.scene.collection.children.link(collection)
pieces = []

old_cover = bpy.data.objects["MALE_BOOK_COVER"]
loc = old_cover.matrix_world.translation
rot = old_cover.matrix_world.to_euler()
pieces += [
    (rounded_box("MALE_BOOK_COVER_REFINED", loc, (.625,.395,.022), rot, cover_mat, .012), male_root),
    (rounded_box("MALE_BOOK_PAGE_LEFT_REFINED", loc+Vector((-.145,-.012,.034)), (.292,.37,.028),
                 (rot.x,rot.y,rot.z-.14), pages, .010), male_root),
    (rounded_box("MALE_BOOK_PAGE_RIGHT_REFINED", loc+Vector((.145,-.012,.034)), (.292,.37,.028),
                 (rot.x,rot.y,rot.z+.14), pages, .010), male_root),
]
spine=rounded_box("MALE_BOOK_SPINE_REFINED",loc+Vector((0,-.012,.04)),(.035,.36,.025),rot,cover_mat,.010)
pieces.append((spine,male_root))

old_tablet=bpy.data.objects["FEMALE_TABLET"]
tloc=old_tablet.matrix_world.translation; trot=old_tablet.matrix_world.to_euler()
pieces += [
    (rounded_box("FEMALE_TABLET_REFINED",tloc,(.465,.032,.33),trot,tablet_mat,.028),female_root),
    (rounded_box("FEMALE_TABLET_SCREEN_REFINED",old_tablet.matrix_world @ Vector((0,-.013,.004)),(.407,.010,.272),trot,screen_mat,.014),female_root),
]
for name, offset, radius in (("FEMALE_TABLET_CAMERA",Vector((-.19,-.022,.135)),.009),
                             ("FEMALE_TABLET_BUTTON",Vector((.19,-.022,0)),.012)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=12, radius=radius, location=old_tablet.matrix_world @ offset)
    detail=bpy.context.object; detail.name=name; detail.data.materials.append(tablet_mat); pieces.append((detail,female_root))

for obj,parent in pieces:
    for old in list(obj.users_collection): old.objects.unlink(obj)
    collection.objects.link(obj); parent_keep_world(obj,parent)

bpy.context.scene["study_props_stage"]="v1 layered book and detailed tablet; approved hand poses preserved"
bpy.context.scene["web_model_status"]="not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
