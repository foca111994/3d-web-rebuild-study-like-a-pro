from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-female-hoodie-finished-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-female-outfit-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def bone_points(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


def capsule(name, start, end, radius, material, depth=.88):
    direction = end - start
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=20, location=(start + end) / 2)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (radius, radius * depth, direction.length / 2 + radius * .20)
    obj.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    return obj


def rounded_box(name, location, dimensions, rotation, material, bevel):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new("Rounded footwear", "BEVEL")
    mod.width = bevel
    mod.segments = 4
    obj.data.materials.append(material)
    return obj


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
rig = bpy.data.objects["FEMALE_RIG"]
denim = bpy.data.materials["Female denim blue"]
blue = bpy.data.materials["Female shoe blue"]
cream = bpy.data.materials["Female shoe cream"]

for obj in bpy.data.objects:
    if obj.name.startswith(("FEMALE_JEANS_", "FEMALE_SHOE_")):
        obj.hide_viewport = True
        obj.hide_render = True

collection = bpy.data.collections.new("FEMALE_LOWER_OUTFIT_REFINED_V1")
bpy.context.scene.collection.children.link(collection)
pieces = []
rotation = root.matrix_world.to_quaternion().to_euler()
forward = root.matrix_world.to_quaternion() @ Vector((0, -1, 0))

for side in ("L", "R"):
    thigh_start, thigh_end = bone_points(rig, f"thigh.{side}")
    shin_start, shin_end = bone_points(rig, f"shin.{side}")
    pieces.append(capsule(f"FEMALE_JEANS_REFINED_THIGH_{side}", thigh_start, thigh_end, .148, denim, .84))
    pieces.append(capsule(f"FEMALE_JEANS_REFINED_SHIN_{side}", shin_start, shin_end, .122, denim, .86))
    bpy.ops.mesh.primitive_uv_sphere_add(segments=28, ring_count=16, location=thigh_end)
    knee = bpy.context.object
    knee.name = f"FEMALE_JEANS_KNEE_{side}"
    knee.scale = (.128, .108, .105)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    knee.data.materials.append(denim)
    pieces.append(knee)

    foot_start, foot_end = bone_points(rig, f"foot.{side}")
    center = (foot_start + foot_end) / 2 + forward * .018 + Vector((0, 0, .018))
    pieces.append(rounded_box(f"FEMALE_SHOE_REFINED_{side}", center, (.205, .355, .125), rotation, blue, .052))
    pieces.append(rounded_box(f"FEMALE_SHOE_REFINED_SOLE_{side}", center + Vector((0, 0, -.067)),
                              (.218, .37, .038), rotation, cream, .016))
    pieces.append(rounded_box(f"FEMALE_SHOE_REFINED_TOE_{side}", center + forward * .168,
                              (.16, .035, .07), rotation, cream, .016))

for obj in pieces:
    for old in list(obj.users_collection): old.objects.unlink(obj)
    collection.objects.link(obj)
    parent_keep_world(obj, root)

bpy.context.scene["female_lower_outfit_stage"] = "v1 smoother jeans knees and layered rounded shoes"
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
