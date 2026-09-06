from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-export-ready-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-skin-weights-v1.blend"


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))

changed_vertices = 0
affected_meshes = []

for obj in bpy.context.scene.objects:
    if obj.type != "MESH" or not obj.vertex_groups:
        continue

    changed_on_mesh = 0
    for vertex in obj.data.vertices:
        weighted = sorted(
            ((item.group, item.weight) for item in vertex.groups if item.weight > 0.0),
            key=lambda item: item[1],
            reverse=True,
        )
        if len(weighted) <= 4:
            continue

        keep = weighted[:4]
        remove = weighted[4:]
        total = sum(weight for _, weight in keep)
        for group_index, _ in remove:
            obj.vertex_groups[group_index].remove([vertex.index])
        if total > 0.0:
            for group_index, weight in keep:
                obj.vertex_groups[group_index].add([vertex.index], weight / total, "REPLACE")
        changed_vertices += 1
        changed_on_mesh += 1

    if changed_on_mesh:
        affected_meshes.append((obj.name, changed_on_mesh))

bpy.context.scene["skin_weight_stage"] = "v1 maximum four normalized influences per vertex"
bpy.context.scene["web_model_status"] = "skin-weight review copy; no repository GLB exported"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))

remaining = []
for obj in bpy.context.scene.objects:
    if obj.type == "MESH":
        for vertex in obj.data.vertices:
            if sum(item.weight > 0.0 for item in vertex.groups) > 4:
                remaining.append((obj.name, vertex.index))

print(f"CHANGED_VERTICES {changed_vertices}")
print(f"AFFECTED_MESHES {len(affected_meshes)}")
for name, count in affected_meshes:
    print(f"{name}: {count}")
print(f"REMAINING_OVER_FOUR {len(remaining)}")
print(f"Saved {OUTPUT}")
