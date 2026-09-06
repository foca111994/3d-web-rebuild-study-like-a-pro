from pathlib import Path

import bmesh
import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-chairs-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-cleanup-v1.blend"


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))

# Reduce the graphic shoulder caps without changing the anatomical sleeves.
for side in ("L", "R"):
    shoulder = bpy.data.objects[f"MALE_SWEATER_SHOULDER_{side}"]
    shoulder.scale.x *= .70
    shoulder.scale.y *= .70
    shoulder.scale.z *= .84

# Keep a readable denim bend while removing the spherical knee appearance.
for side in ("L", "R"):
    knee = bpy.data.objects[f"FEMALE_JEANS_KNEE_{side}"]
    knee.scale.x *= .78
    knee.scale.y *= .72
    knee.scale.z *= .68

# Compact the construction cuffs so they read as garment edges.
for prefix in ("MALE_SWEATER_CUFF_", "FEMALE_HOODIE_CUFF_"):
    for side in ("L", "R"):
        cuff = bpy.data.objects[f"{prefix}{side}"]
        cuff.scale *= .78

# Remove only anatomy assigned to foot bones, which is fully enclosed by shoes.
for body_name in ("GEO-body_male_realistic", "GEO-body_female_realistic"):
    body = bpy.data.objects[body_name]
    body.data = body.data.copy()
    foot_groups = {body.vertex_groups[name].index for name in ("foot.L", "foot.R")}
    delete_indices = {
        vert.index for vert in body.data.vertices
        if any(group.group in foot_groups and group.weight > .12 for group in vert.groups)
    }
    bm = bmesh.new(); bm.from_mesh(body.data)
    bmesh.ops.delete(bm, geom=[vert for vert in bm.verts if vert.index in delete_indices], context="VERTS")
    bm.to_mesh(body.data); bm.free(); body.data.update()

bpy.context.scene["cleanup_stage"] = (
    "v1 reduced shoulders and knees, compact cuffs, shoe-enclosed foot anatomy removed on copied meshes"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
