from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-composed.blend"
OUTPUT = ROOT / "blender/students-pair-production-composed-v2.blend"


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))

male_root = bpy.data.objects["MALE_CHARACTER_ROOT"]
female_root = bpy.data.objects["FEMALE_CHARACTER_ROOT"]

# Keep the pair visually connected while preventing the temporary chairs from
# merging into one unreadable mass during the side views.
male_root.location.x -= .07
female_root.location.x += .07

for prefix in ("MALE", "FEMALE"):
    seat = bpy.data.objects[f"{prefix}_CHAIR_SEAT"]
    back = bpy.data.objects[f"{prefix}_CHAIR_BACK"]
    seat.scale.x *= .86
    back.scale.x *= .86

# Fine placement of the interaction proxies relative to each character root.
for name in ("MALE_BOOK_LEFT", "MALE_BOOK_RIGHT", "MALE_BOOK_COVER"):
    bpy.data.objects[name].location.y += .035
    bpy.data.objects[name].location.z -= .018

for name in ("FEMALE_TABLET", "FEMALE_TABLET_SCREEN"):
    bpy.data.objects[name].location.y += .025
    bpy.data.objects[name].location.z -= .012

bpy.context.scene["composition_stage"] = (
    "v2 silhouette checkpoint; separated proxy chairs and hand-prop alignment"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
