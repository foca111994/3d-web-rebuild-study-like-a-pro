from pathlib import Path
import bpy
import math


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "client/public/models/source/students-pair"
OUTPUT = ROOT / "blender/students-pair.blend"


def collection(name: str) -> bpy.types.Collection:
    value = bpy.data.collections.get(name) or bpy.data.collections.new(name)
    if value.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(value)
    return value


def image_reference(name: str, filename: str, location, rotation, target_collection):
    image = bpy.data.images.load(str(SOURCE / filename), check_existing=True)
    obj = bpy.data.objects.new(name, None)
    obj.empty_display_type = "IMAGE"
    obj.data = image
    obj.empty_display_size = 3.2
    obj.color[3] = 0.72
    obj.empty_image_depth = "BACK"
    obj.show_in_front = False
    obj.location = location
    obj.rotation_euler = rotation
    target_collection.objects.link(obj)
    return obj


bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
for item in list(bpy.data.collections):
    if item.name != "Collection":
        bpy.data.collections.remove(item)
default = bpy.data.collections.get("Collection")
if default:
    bpy.data.collections.remove(default)

scene = bpy.context.scene
scene.unit_settings.system = "METRIC"
scene.unit_settings.length_unit = "METERS"
scene.unit_settings.scale_length = 1.0
scene.render.engine = "BLENDER_EEVEE"

refs = collection("REFERENCES")
models = collection("MODELS")
controls = collection("SCENE_GUIDES")

# Image empties face toward the origin and stay outside the modeling volume.
image_reference(
    "REF_0_FRONT_MALE",
    "view-0-front-male.png",
    (0.0, -4.0, 1.55),
    (math.radians(90), 0.0, 0.0),
    refs,
)
image_reference(
    "REF_180_FRONT_FEMALE",
    "view-180-front-female.png",
    (0.0, 4.0, 1.55),
    (math.radians(-90), 0.0, math.radians(180)),
    refs,
)
image_reference(
    "REF_90_PROFILE",
    "view-90-profile.png",
    (4.0, 0.0, 1.55),
    (math.radians(90), 0.0, math.radians(90)),
    refs,
)
image_reference(
    "REF_270_PROFILE",
    "view-270-profile.png",
    (-4.0, 0.0, 1.55),
    (math.radians(90), 0.0, math.radians(-90)),
    refs,
)

# A 1.75 m guide makes later scale checks explicit without becoming geometry.
bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0.0, 0.0, 0.0))
origin = bpy.context.object
origin.name = "ORIGIN_GROUP_ROTATION"
for current in list(origin.users_collection):
    current.objects.unlink(origin)
controls.objects.link(origin)

bpy.ops.object.empty_add(type="CUBE", location=(0.0, 0.0, 0.875))
guide = bpy.context.object
guide.name = "GUIDE_1_75M_HEIGHT"
guide.scale = (0.45, 0.45, 0.875)
guide.empty_display_size = 1.0
for current in list(guide.users_collection):
    current.objects.unlink(guide)
controls.objects.link(guide)

refs.hide_render = True
controls.hide_render = True
models.color_tag = "COLOR_04"
refs.color_tag = "COLOR_03"
controls.color_tag = "COLOR_05"

scene["slp_orientation_rule"] = (
    "Male and female keep a fixed 180-degree Y rotation difference. "
    "Never show both fronts or both backs simultaneously."
)
scene["slp_export_targets"] = "student.glb, student-companion.glb"

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
