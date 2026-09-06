from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("/private/tmp/slp-students-pair-test-v6.glb")
OUTPUT_DIR = ROOT / "blender/previews/glb-test-v6"


def look_at(obj, point):
    obj.rotation_euler = (Vector(point) - obj.location).to_track_quat("-Z", "Y").to_euler()


bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(SOURCE))
scene = bpy.context.scene

# Blender creates viewport-only armature shapes during import. They are not GLB
# mesh nodes, but hide them from this visual review if present.
for obj in list(scene.objects):
    if obj.parent is None and obj.name != "SLP_STUDENTS_PAIR":
        obj.hide_render = True

scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = 900
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
if scene.world is None:
    scene.world = bpy.data.worlds.new("GLB review world")
scene.world.color = (.018, .022, .032)

floor_mat = bpy.data.materials.new("GLB review floor")
floor_mat.diffuse_color = (.07, .075, .085, 1)
bpy.ops.mesh.primitive_plane_add(size=20, location=(0, 0, -.035))
bpy.context.object.data.materials.append(floor_mat)

bpy.ops.object.camera_add()
camera = bpy.context.object
camera.data.lens = 62
scene.camera = camera

for location, energy, size, color in (
    ((-3.6, -4.2, 5.0), 1300, 4.2, (1.0, .73, .52)),
    ((3.4, -2.0, 3.5), 900, 3.2, (.48, .68, 1.0)),
    ((0, 4.0, 4.2), 850, 3.0, (.78, .55, 1.0)),
):
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    light.data.color = color
    look_at(light, (0, 0, .9))

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
for name, location in {
    "front": (0, -5.1, 2.0),
    "right": (5.1, 0, 2.0),
    "back": (0, 5.1, 2.0),
    "left": (-5.1, 0, 2.0),
}.items():
    camera.location = location
    look_at(camera, (0, 0, .83))
    scene.render.filepath = str(OUTPUT_DIR / f"students-pair-glb-{name}.png")
    bpy.ops.render.render(write_still=True)
    print(f"Rendered {scene.render.filepath}")
