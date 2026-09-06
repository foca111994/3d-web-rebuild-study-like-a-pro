from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-heads-v1.blend"
OUTPUT_DIR = ROOT / "blender/previews/heads-v1"


def look_at(obj, point):
    obj.rotation_euler = (Vector(point) - obj.location).to_track_quat("-Z", "Y").to_euler()


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = 900
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.film_transparent = False
scene.world.color = (.035, .035, .04)

for collection_name in ("REFERENCES", "SCENE_GUIDES", "MODELS"):
    collection = bpy.data.collections.get(collection_name)
    if collection:
        collection.hide_render = True

skin = bpy.data.materials.get("Review male skin") or bpy.data.materials.new("Review male skin")
skin.diffuse_color = (.46, .20, .10, 1)
female_skin = bpy.data.materials.get("Review female skin") or bpy.data.materials.new("Review female skin")
female_skin.diffuse_color = (.63, .36, .19, 1)
for name, mat in (
    ("GEO-body_male_realistic", skin),
    ("GEO-body_female_realistic", female_skin),
):
    obj = bpy.data.objects[name]
    obj.data.materials.clear()
    obj.data.materials.append(mat)

bpy.ops.object.camera_add()
camera = bpy.context.object
camera.data.lens = 58
scene.camera = camera

for location, energy, size in (((-3.5, -4, 5), 1150, 4.0), ((3.5, -1, 3.4), 750, 3.0), ((0, 4, 3), 500, 2.5)):
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    look_at(light, (0, 0, .9))

views = {
    "front": (0, -5.35, 2.05),
    "right": (5.35, 0, 2.05),
    "back": (0, 5.35, 2.05),
    "left": (-5.35, 0, 2.05),
}
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
for name, location in views.items():
    camera.location = location
    look_at(camera, (0, 0, .86))
    scene.render.filepath = str(OUTPUT_DIR / f"students-pair-{name}.png")
    bpy.ops.render.render(write_still=True)
    print(f"Rendered {scene.render.filepath}")
