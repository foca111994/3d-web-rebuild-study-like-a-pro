from pathlib import Path
import math

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-rigged.blend"
OUTPUT = ROOT / "blender/previews/students-pair-rigged-front.png"


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
scene.world.color = (0.055, 0.055, 0.055)

for collection_name in ("REFERENCES", "SCENE_GUIDES", "MODELS"):
    collection = bpy.data.collections.get(collection_name)
    if collection:
        collection.hide_render = True

skin = bpy.data.materials.new("Preview skin")
skin.diffuse_color = (.48, .22, .12, 1)
female_skin = bpy.data.materials.new("Preview female skin")
female_skin.diffuse_color = (.62, .38, .22, 1)
for name, material in (
    ("GEO-body_male_realistic", skin),
    ("GEO-body_female_realistic", female_skin),
):
    obj = bpy.data.objects[name]
    obj.data.materials.clear()
    obj.data.materials.append(material)

bpy.ops.object.camera_add(location=(0, -6.2, 2.2))
camera = bpy.context.object
camera.data.lens = 58
look_at(camera, (0, 0, .85))
scene.camera = camera

for location, energy, size in (((-3, -4, 5), 1100, 4.0), ((3, -2, 3), 700, 3.0)):
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    look_at(light, (0, 0, .9))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
scene.render.filepath = str(OUTPUT)
bpy.ops.render.render(write_still=True)
print(f"Rendered {OUTPUT}")
