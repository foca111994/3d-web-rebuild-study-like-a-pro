from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-female-hoodie-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-female-hoodie-finished-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def bone_points(rig, name):
    bone = rig.pose.bones[name]
    return rig.matrix_world @ bone.head, rig.matrix_world @ bone.tail


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]
rig = bpy.data.objects["FEMALE_RIG"]
yellow = bpy.data.materials["Female hoodie yellow"]
collection = bpy.data.collections.new("FEMALE_HOODIE_FINISH_V1")
bpy.context.scene.collection.children.link(collection)

for side in ("L", "R"):
    start, end = bone_points(rig, f"forearm.{side}")
    direction = (end - start).normalized()
    center = start.lerp(end, .82)
    bpy.ops.mesh.primitive_torus_add(
        major_radius=.057,
        minor_radius=.014,
        major_segments=28,
        minor_segments=10,
        location=center,
        rotation=direction.to_track_quat("Z", "Y").to_euler(),
    )
    cuff = bpy.context.object
    cuff.name = f"FEMALE_HOODIE_CUFF_{side}"
    cuff.data.materials.append(yellow)
    for old in list(cuff.users_collection):
        old.objects.unlink(cuff)
    collection.objects.link(cuff)
    parent_keep_world(cuff, root)

bpy.context.scene["female_hoodie_stage"] = "v1 finished anatomical shell with separate wrist cuffs"
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
