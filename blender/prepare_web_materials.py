from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-web-optimized-v1.blend"
OUTPUT = ROOT / "blender/students-pair-production-web-materials-v1.blend"


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))


def web_material(name, color, roughness=.62, metallic=0.0):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.diffuse_color = color
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf is None:
        bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    output = nodes.get("Material Output") or nodes.new("ShaderNodeOutputMaterial")
    for node in list(nodes):
        if node not in (bsdf, output):
            nodes.remove(node)
    mat.node_tree.links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


# Normalize the existing shared palette while preserving its approved colors.
for mat in list(bpy.data.materials):
    web_material(mat.name, tuple(mat.diffuse_color), roughness=.62)

male_skin = web_material("SLP web male skin", (.50, .245, .13, 1), .68)
female_skin = web_material("SLP web female skin", (.68, .42, .25, 1), .68)
book_pages = web_material("SLP web book pages", (.86, .76, .55, 1), .82)
book_cover = web_material("SLP web book cover", (.025, .12, .24, 1), .58)
tablet_frame = web_material("SLP web tablet frame", (.055, .07, .09, 1), .28, .45)
tablet_screen = web_material("SLP web tablet screen", (.015, .26, .39, 1), .18, .08)


def assign(object_name, mat):
    obj = bpy.data.objects[object_name]
    obj.data.materials.clear()
    obj.data.materials.append(mat)


assign("GEO-body_male_realistic", male_skin)
assign("GEO-body_female_realistic", female_skin)
for name in ("MALE_BOOK_PAGE_LEFT_REFINED", "MALE_BOOK_PAGE_RIGHT_REFINED"):
    assign(name, book_pages)
for name in ("MALE_BOOK_COVER_REFINED", "MALE_BOOK_SPINE_REFINED"):
    assign(name, book_cover)
for name in ("FEMALE_TABLET_REFINED", "FEMALE_TABLET_BUTTON", "FEMALE_TABLET_CAMERA"):
    assign(name, tablet_frame)
assign("FEMALE_TABLET_SCREEN_REFINED", tablet_screen)

# Delete only unused material datablocks in this copy.
for mat in list(bpy.data.materials):
    if mat.users == 0:
        bpy.data.materials.remove(mat)

bpy.context.scene["web_material_stage"] = (
    "v1 shared opaque Principled palette; missing skin, book and tablet materials completed"
)
bpy.context.scene["web_model_status"] = "material review copy; no GLB exported"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))

used = {mat.name for obj in bpy.data.objects if obj.type == "MESH" for mat in obj.data.materials if mat}
unassigned = [obj.name for obj in bpy.data.objects if obj.type == "MESH" and len(obj.data.materials) == 0]
print(f"USED_MATERIALS {len(used)}")
print(f"UNASSIGNED_MESHES {len(unassigned)}")
for name in unassigned:
    print(name)
print(f"Saved {OUTPUT}")
