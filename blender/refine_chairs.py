from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-props-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-chairs-v1.blend"


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy(); obj.parent = parent; obj.matrix_world = world


def rounded_box(name, location, dimensions, rotation, material, bevel):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj=bpy.context.object; obj.name=name; obj.dimensions=dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod=obj.modifiers.new("Chair softness","BEVEL"); mod.width=bevel; mod.segments=5
    obj.data.materials.append(material); return obj


def leg_between(name, start, end, material):
    direction=end-start
    bpy.ops.mesh.primitive_cylinder_add(vertices=20, radius=.022, depth=direction.length, location=(start+end)/2)
    obj=bpy.context.object; obj.name=name; obj.rotation_euler=direction.to_track_quat("Z","Y").to_euler()
    obj.data.materials.append(material); return obj


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
chair_mat=bpy.data.materials["Proxy chair"]
leg_mat=bpy.data.materials["Proxy wood"]
for obj in bpy.data.objects:
    if obj.name.startswith(("MALE_CHAIR_","FEMALE_CHAIR_")):
        obj.hide_viewport=True; obj.hide_render=True

collection=bpy.data.collections.new("CHAIRS_REFINED_V1")
bpy.context.scene.collection.children.link(collection)

for prefix,root_name in (("MALE","MALE_CHARACTER_ROOT"),("FEMALE","FEMALE_CHARACTER_ROOT")):
    root=bpy.data.objects[root_name]
    old_seat=bpy.data.objects[f"{prefix}_CHAIR_SEAT"]
    old_back=bpy.data.objects[f"{prefix}_CHAIR_BACK"]
    rotation=old_seat.matrix_world.to_euler()
    seat_center=old_seat.matrix_world.translation+Vector((0,0,-.005))
    back_center=old_back.matrix_world.translation+Vector((0,0,-.075))
    pieces=[
        rounded_box(f"{prefix}_CHAIR_REFINED_SEAT",seat_center,(.48,.50,.075),rotation,chair_mat,.055),
        rounded_box(f"{prefix}_CHAIR_REFINED_BACK",back_center,(.47,.075,.49),rotation,chair_mat,.075),
    ]
    q=root.matrix_world.to_quaternion()
    for x in (-.19,.19):
        for y in (-.17,.17):
            top=seat_center+q@Vector((x,y,-.025))
            bottom=top+q@Vector((x*.18,y*.22,-.62))
            pieces.append(leg_between(f"{prefix}_CHAIR_REFINED_LEG",top,bottom,leg_mat))
    for obj in pieces:
        for old in list(obj.users_collection): old.objects.unlink(obj)
        collection.objects.link(obj); parent_keep_world(obj,root)

bpy.context.scene["chair_stage"]="v1 rounded lower backs, compact seats and subtly splayed legs"
bpy.context.scene["web_model_status"]="not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
