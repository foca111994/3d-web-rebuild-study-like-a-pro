from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-skin-weights-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-static-web-v4.blend"


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
baked = []
depsgraph = bpy.context.evaluated_depsgraph_get()

# Push garment thickness outward so exported clothing does not overlap the skin.
for obj in bpy.context.scene.objects:
    if obj.type == "MESH":
        for modifier in obj.modifiers:
            if modifier.type == "SOLIDIFY" and ("SWEATER" in obj.name or "HOODIE" in obj.name):
                modifier.offset = 1.0
                modifier.thickness = max(modifier.thickness, .008)

# The website rotates the complete pair and does not need skeletal animation.
# Bake the approved seated pose into every skinned mesh in this separate copy.
for obj in list(bpy.context.scene.objects):
    if obj.type != "MESH":
        continue
    armature_modifiers = [modifier for modifier in obj.modifiers if modifier.type == "ARMATURE"]
    if not armature_modifiers:
        continue
    for modifier in obj.modifiers:
        if modifier.type == "MULTIRES":
            modifier.levels = 0
            modifier.render_levels = 0
    bpy.context.view_layer.update()
    old_mesh = obj.data
    evaluated = obj.evaluated_get(depsgraph)
    obj.data = bpy.data.meshes.new_from_object(
        evaluated,
        preserve_all_data_layers=True,
        depsgraph=depsgraph,
    )
    obj.modifiers.clear()
    obj.vertex_groups.clear()
    if old_mesh.users == 0:
        bpy.data.meshes.remove(old_mesh)
    baked.append(obj.name)

# Reparent any direct rig children before removing the now-unneeded rigs.
for rig_name, root_name in (
    ("MALE_RIG", "MALE_CHARACTER_ROOT"),
    ("FEMALE_RIG", "FEMALE_CHARACTER_ROOT"),
):
    rig = bpy.data.objects.get(rig_name)
    root = bpy.data.objects[root_name]
    if rig:
        for child in list(rig.children):
            world = child.matrix_world.copy()
            child.parent = root
            child.matrix_world = world
        bpy.data.objects.remove(rig, do_unlink=True)

bpy.context.scene["static_web_stage"] = "v4 base multires pose baked and garment thickness offset outward"
bpy.context.scene["web_model_status"] = "static export checkpoint; no repository GLB exported"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))

print(f"BAKED_MESHES {len(baked)}")
for name in baked:
    print(name)
print(f"ARMATURES_REMAINING {sum(obj.type == 'ARMATURE' for obj in bpy.context.scene.objects)}")
print(f"Saved {OUTPUT}")
