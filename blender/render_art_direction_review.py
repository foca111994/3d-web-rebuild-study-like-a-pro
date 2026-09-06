from pathlib import Path
import json

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-export-ready-v1.blend"
OUTPUT_DIR = ROOT / "blender/previews/export-ready-v1"


def look_at(obj, point):
    obj.rotation_euler = (Vector(point) - obj.location).to_track_quat("-Z", "Y").to_euler()


def material(name, color, metallic=0.0, roughness=.6):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.diffuse_color = color
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


def assign_prefix(prefix, mat):
    for obj in bpy.data.objects:
        if obj.type == "MESH" and obj.name.startswith(prefix):
            obj.data.materials.clear()
            obj.data.materials.append(mat)


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = 1100
scene.render.resolution_y = 1100
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.film_transparent = False
scene.render.image_settings.color_mode = "RGBA"
scene.world.color = (.018, .022, .032)

for collection_name in ("REFERENCES", "SCENE_GUIDES", "MODELS"):
    collection = bpy.data.collections.get(collection_name)
    if collection:
        collection.hide_render = True

male_skin = material("Art review male skin", (.50, .245, .13, 1), roughness=.62)
female_skin = material("Art review female skin", (.68, .42, .25, 1), roughness=.62)
chair = material("Art review chair", (.032, .04, .055, 1), metallic=.08, roughness=.38)
wood = material("Art review wood", (.34, .115, .035, 1), roughness=.5)
pages = material("Art review pages", (.86, .76, .55, 1), roughness=.82)
book = material("Art review book", (.025, .12, .24, 1), roughness=.55)
tablet = material("Art review tablet", (.055, .07, .09, 1), metallic=.55, roughness=.25)
screen = material("Art review screen", (.015, .26, .39, 1), metallic=.1, roughness=.16)
floor_mat = material("Art review floor", (.07, .075, .085, 1), roughness=.86)

for name, mat in (
    ("GEO-body_male_realistic", male_skin),
    ("GEO-body_female_realistic", female_skin),
):
    obj = bpy.data.objects[name]
    obj.data.materials.clear()
    obj.data.materials.append(mat)

assign_prefix("MALE_CHAIR_SEAT", chair)
assign_prefix("MALE_CHAIR_BACK", chair)
assign_prefix("FEMALE_CHAIR_SEAT", chair)
assign_prefix("FEMALE_CHAIR_BACK", chair)
assign_prefix("MALE_CHAIR_LEG", wood)
assign_prefix("FEMALE_CHAIR_LEG", wood)
assign_prefix("MALE_CHAIR_REFINED", chair)
assign_prefix("FEMALE_CHAIR_REFINED", chair)
assign_prefix("MALE_CHAIR_REFINED_LEG", wood)
assign_prefix("FEMALE_CHAIR_REFINED_LEG", wood)
assign_prefix("MALE_BOOK_LEFT", pages)
assign_prefix("MALE_BOOK_RIGHT", pages)
assign_prefix("MALE_BOOK_COVER", book)
assign_prefix("FEMALE_TABLET", tablet)
assign_prefix("FEMALE_TABLET_SCREEN", screen)

bpy.ops.mesh.primitive_plane_add(size=20, location=(0, 0, -.035))
floor = bpy.context.object
floor.name = "ART_REVIEW_FLOOR"
floor.data.materials.append(floor_mat)

bpy.ops.object.camera_add()
camera = bpy.context.object
camera.data.lens = 62
scene.camera = camera

lights = (
    ((-3.6, -4.2, 5.0), 1300, 4.2, (1.0, .73, .52)),
    ((3.4, -2.0, 3.5), 900, 3.2, (.48, .68, 1.0)),
    ((0, 4.0, 4.2), 850, 3.0, (.78, .55, 1.0)),
)
for location, energy, size, color in lights:
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    light.data.color = color
    look_at(light, (0, 0, .9))

views = {
    "front": (0, -5.1, 2.0),
    "front-right": (3.6, -3.6, 2.0),
    "right": (5.1, 0, 2.0),
    "back-right": (3.6, 3.6, 2.0),
    "back": (0, 5.1, 2.0),
    "back-left": (-3.6, 3.6, 2.0),
    "left": (-5.1, 0, 2.0),
    "front-left": (-3.6, -3.6, 2.0),
}
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
visible_meshes = [obj for obj in scene.objects if obj.type == "MESH" and not obj.hide_render]
triangles = 0
vertices = 0
for obj in visible_meshes:
    obj.data.calc_loop_triangles()
    triangles += len(obj.data.loop_triangles)
    vertices += len(obj.data.vertices)
(OUTPUT_DIR / "geometry-report.json").write_text(json.dumps({
    "source": SOURCE.name,
    "visible_mesh_objects": len(visible_meshes),
    "source_vertices": vertices,
    "source_triangles": triangles,
    "review_status": "pre-export audit; no GLB written",
}, indent=2) + "\n")
for name, location in views.items():
    camera.location = location
    look_at(camera, (0, 0, .83))
    scene.render.filepath = str(OUTPUT_DIR / f"students-pair-{name}.png")
    bpy.ops.render.render(write_still=True)
    print(f"Rendered {scene.render.filepath}")
