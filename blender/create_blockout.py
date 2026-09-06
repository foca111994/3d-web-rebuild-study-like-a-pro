from pathlib import Path
import bpy
import math
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE_BLEND = ROOT / "blender/students-pair.blend"
OUTPUT_BLEND = ROOT / "blender/students-pair-blockout-open.blend"
OUTPUT_GLB = ROOT / "client/public/models/blockout/students-pair-blockout-open.glb"

# Open the otherwise back-to-back composition by 12 degrees per student.
# Their shortest angular separation becomes 156 degrees, forming a soft V.
PAIR_OPEN_ANGLE = math.radians(12)


def material(name, color, metallic=0.0, roughness=0.75):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1.0)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return mat


def move_to_collection(obj, target):
    for current in list(obj.users_collection):
        current.objects.unlink(obj)
    target.objects.link(obj)


def cube(name, location, scale, mat, parent, target, bevel=0.05):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    modifier = obj.modifiers.new("Soft edges", "BEVEL")
    modifier.width = bevel
    modifier.segments = 3
    obj.data.materials.append(mat)
    obj.parent = parent
    move_to_collection(obj, target)
    return obj


def sphere(name, location, scale, mat, parent, target):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=16, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    obj.parent = parent
    move_to_collection(obj, target)
    return obj


def limb(name, start, end, radius, mat, parent, target):
    start_v, end_v = Vector(start), Vector(end)
    midpoint = (start_v + end_v) * 0.5
    direction = end_v - start_v
    bpy.ops.mesh.primitive_cylinder_add(vertices=20, radius=radius, depth=direction.length, location=midpoint)
    obj = bpy.context.object
    obj.name = name
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = direction.to_track_quat("Z", "Y")
    obj.data.materials.append(mat)
    obj.parent = parent
    move_to_collection(obj, target)
    return obj


def chair(prefix, parent, target, seat_mat):
    cube(f"{prefix}_CHAIR_SEAT", (0, 0.02, 0.76), (0.34, 0.34, 0.055), seat_mat, parent, target)
    cube(f"{prefix}_CHAIR_BACK", (0, 0.32, 1.08), (0.34, 0.055, 0.34), seat_mat, parent, target)
    for x in (-0.27, 0.27):
        for y in (-0.24, 0.24):
            limb(f"{prefix}_CHAIR_LEG", (x, y, 0.72), (x * 1.16, y * 1.16, 0.05), 0.027, wood, parent, target)


def seated_student(prefix, group_location, group_rotation, palette, female=False):
    parent = bpy.data.objects.new(f"{prefix}_ROOT", None)
    parent.empty_display_type = "PLAIN_AXES"
    parent.location = group_location
    parent.rotation_euler[2] = group_rotation
    models.objects.link(parent)

    chair(prefix, parent, models, chair_black)
    skin = palette["skin"]
    top = palette["top"]
    trouser = palette["trouser"]
    shoe = palette["shoe"]

    sphere(f"{prefix}_PELVIS", (0, -0.02, 0.90), (0.28, 0.22, 0.20), trouser, parent, models)
    torso_mat = top if female else dark
    cube(f"{prefix}_TORSO", (0, -0.02, 1.28), (0.34 if not female else 0.30, 0.19, 0.34), torso_mat, parent, models, 0.10)
    sphere(f"{prefix}_HEAD", (0, -0.04, 1.72), (0.17, 0.15, 0.21), skin, parent, models)

    if not female:
        # First visual pass for the main student: recognizable clothing and face,
        # still intentionally simple enough to remain a lightweight web model.
        cube(f"{prefix}_PURPLE_CHEST_BAND", (0, -0.215, 1.30), (0.345, 0.028, 0.105), top, parent, models, 0.025)
        cube(f"{prefix}_WHITE_SHIRT_HEM", (0, -0.205, 0.99), (0.30, 0.025, 0.035), shirt_white, parent, models, 0.015)
        sphere(f"{prefix}_HAIR", (0, -0.025, 1.84), (0.174, 0.153, 0.105), hair_dark, parent, models)
        sphere(f"{prefix}_EAR_L", (-0.172, -0.045, 1.73), (0.028, 0.018, 0.045), skin, parent, models)
        sphere(f"{prefix}_EAR_R", (0.172, -0.045, 1.73), (0.028, 0.018, 0.045), skin, parent, models)
        for side, x in (("L", -0.063), ("R", 0.063)):
            sphere(f"{prefix}_EYE_{side}", (x, -0.181, 1.745), (0.018, 0.010, 0.012), face_dark, parent, models)
            cube(f"{prefix}_BROW_{side}", (x, -0.188, 1.780), (0.038, 0.009, 0.008), hair_dark, parent, models, 0.004)
        cube(f"{prefix}_NOSE", (0, -0.192, 1.705), (0.012, 0.015, 0.025), skin, parent, models, 0.008)
        cube(f"{prefix}_MOUTH", (0, -0.194, 1.665), (0.048, 0.009, 0.007), face_dark, parent, models, 0.004)
        # Gold chain echoes the supplied character artwork.
        bpy.ops.mesh.primitive_torus_add(major_radius=0.105, minor_radius=0.009, major_segments=24, minor_segments=8, location=(0, -0.218, 1.50), rotation=(math.radians(90), 0, 0))
        chain = bpy.context.object
        chain.name = f"{prefix}_CHAIN"
        chain.scale.z = 0.72
        chain.data.materials.append(gold)
        chain.parent = parent
        move_to_collection(chain, models)
    else:
        # Companion pass: bob haircut, glasses and hoodie details based on the
        # supplied yellow-jacket student, kept low-poly for real-time rotation.
        sphere(f"{prefix}_HAIR_BACK", (0, 0.025, 1.73), (0.205, 0.165, 0.235), female_hair, parent, models)
        sphere(f"{prefix}_HAIR_FRINGE", (0, -0.155, 1.815), (0.175, 0.035, 0.075), female_hair, parent, models)
        for side, x in (("L", -0.105), ("R", 0.105)):
            cube(f"{prefix}_HAIR_SIDE_{side}", (x, -0.04, 1.69), (0.065, 0.15, 0.18), female_hair, parent, models, 0.045)
            cube(f"{prefix}_GLASSES_{side}", (x * 0.58, -0.191, 1.75), (0.058, 0.012, 0.038), glasses_dark, parent, models, 0.012)
            sphere(f"{prefix}_EYE_{side}", (x * 0.58, -0.205, 1.748), (0.014, 0.008, 0.011), face_dark, parent, models)
        cube(f"{prefix}_GLASSES_BRIDGE", (0, -0.195, 1.75), (0.028, 0.009, 0.008), glasses_dark, parent, models, 0.004)
        cube(f"{prefix}_MOUTH", (0, -0.197, 1.67), (0.045, 0.009, 0.006), face_dark, parent, models, 0.004)
        cube(f"{prefix}_HOOD", (0, 0.19, 1.43), (0.22, 0.08, 0.20), top, parent, models, 0.09)
        cube(f"{prefix}_HOODIE_POCKET", (0, -0.215, 1.16), (0.18, 0.025, 0.09), hoodie_shadow, parent, models, 0.035)
        for side, x in (("L", -0.055), ("R", 0.055)):
            limb(f"{prefix}_HOOD_STRING_{side}", (x, -0.216, 1.50), (x, -0.225, 1.34), 0.009, cord_white, parent, models)

    # Seated legs extend toward local -Y; the whole female rig rotates 180°.
    for side, x in (("L", -0.18), ("R", 0.18)):
        limb(f"{prefix}_{side}_THIGH", (x, -0.05, 0.87), (x, -0.48, 0.78), 0.105, trouser, parent, models)
        limb(f"{prefix}_{side}_SHIN", (x, -0.48, 0.77), (x, -0.52, 0.22), 0.09, trouser, parent, models)
        cube(f"{prefix}_{side}_SHOE", (x, -0.61, 0.12), (0.12, 0.22, 0.08), shoe, parent, models, 0.045)

    prop_z = 1.15
    if female:
        prop = cube(f"{prefix}_TABLET", (0, -0.44, prop_z), (0.23, 0.025, 0.17), tablet_mat, parent, models, 0.02)
        prop.rotation_euler[0] = math.radians(12)
        screen = cube(f"{prefix}_TABLET_SCREEN", (0, -0.469, prop_z + 0.004), (0.195, 0.008, 0.135), tablet_screen, parent, models, 0.015)
        screen.rotation_euler[0] = math.radians(12)
        limb(f"{prefix}_ARM_L", (-0.27, -0.05, 1.48), (-0.20, -0.41, 1.17), 0.065, top, parent, models)
        limb(f"{prefix}_ARM_R", (0.27, -0.05, 1.48), (0.20, -0.41, 1.17), 0.065, top, parent, models)
        sphere(f"{prefix}_HAND_L", (-0.20, -0.43, 1.17), (0.065, 0.04, 0.042), skin, parent, models)
        sphere(f"{prefix}_HAND_R", (0.20, -0.43, 1.17), (0.065, 0.04, 0.042), skin, parent, models)
        # Headphones remain visually legible from all angles.
        bpy.ops.mesh.primitive_torus_add(major_radius=0.185, minor_radius=0.025, major_segments=28, minor_segments=10, location=(0, -0.04, 1.74), rotation=(0, math.radians(90), 0))
        phones = bpy.context.object
        phones.name = f"{prefix}_HEADPHONES"
        phones.data.materials.append(headphone_blue)
        phones.parent = parent
        move_to_collection(phones, models)
        for side, x in (("L", -0.185), ("R", 0.185)):
            sphere(f"{prefix}_HEADPHONE_CUP_{side}", (x, -0.04, 1.73), (0.045, 0.055, 0.075), headphone_blue, parent, models)
            cube(f"{prefix}_{side}_SHOE_SOLE", (x * 0.97, -0.615, 0.055), (0.125, 0.225, 0.025), cord_white, parent, models, 0.018)
            cube(f"{prefix}_{side}_SHOE_ACCENT", (x * 0.97, -0.79, 0.135), (0.075, 0.035, 0.035), denim_light, parent, models, 0.012)
    else:
        prop = cube(f"{prefix}_BOOK_COVER", (0, -0.46, prop_z), (0.30, 0.20, 0.025), book_blue, parent, models, 0.015)
        prop.rotation_euler[0] = math.radians(8)
        left_page = cube(f"{prefix}_BOOK_PAGE_L", (-0.145, -0.472, prop_z + 0.035), (0.145, 0.185, 0.012), paper, parent, models, 0.01)
        right_page = cube(f"{prefix}_BOOK_PAGE_R", (0.145, -0.472, prop_z + 0.035), (0.145, 0.185, 0.012), paper, parent, models, 0.01)
        left_page.rotation_euler[0] = right_page.rotation_euler[0] = math.radians(8)
        left_page.rotation_euler[1] = math.radians(-5)
        right_page.rotation_euler[1] = math.radians(5)
        limb(f"{prefix}_ARM_L", (-0.30, -0.04, 1.49), (-0.21, -0.48, 1.18), 0.07, top, parent, models)
        limb(f"{prefix}_ARM_R", (0.30, -0.04, 1.49), (0.21, -0.48, 1.18), 0.07, top, parent, models)
        sphere(f"{prefix}_HAND_L", (-0.21, -0.49, 1.18), (0.07, 0.045, 0.045), skin, parent, models)
        sphere(f"{prefix}_HAND_R", (0.21, -0.49, 1.18), (0.07, 0.045, 0.045), skin, parent, models)
        for side, x in (("L", -0.18), ("R", 0.18)):
            cube(f"{prefix}_{side}_SHOE_SOLE", (x, -0.615, 0.055), (0.125, 0.225, 0.025), shirt_white, parent, models, 0.018)
            cube(f"{prefix}_{side}_SHOE_ACCENT", (x, -0.79, 0.135), (0.075, 0.035, 0.035), top, parent, models, 0.012)

    return parent


bpy.ops.wm.open_mainfile(filepath=str(SOURCE_BLEND))
models = bpy.data.collections["MODELS"]

skin_male = material("Skin Male", (0.55, 0.30, 0.18))
skin_female = material("Skin Female", (0.70, 0.46, 0.30))
purple = material("Male Purple", (0.43, 0.06, 0.48))
yellow = material("Female Yellow", (0.95, 0.58, 0.03))
dark = material("Dark Cargo", (0.055, 0.05, 0.045))
denim = material("Denim", (0.12, 0.28, 0.48))
orange = material("Male Shoes", (0.95, 0.25, 0.025))
blue = material("Female Shoes", (0.04, 0.18, 0.48))
chair_black = material("Chair Black", (0.025, 0.025, 0.03))
wood = material("Chair Wood", (0.34, 0.15, 0.055))
book_blue = material("Book", (0.03, 0.10, 0.18))
tablet_mat = material("Tablet", (0.13, 0.15, 0.18), metallic=0.35, roughness=0.3)
headphone_blue = material("Headphones", (0.02, 0.16, 0.55), metallic=0.15, roughness=0.35)
hair_dark = material("Male Hair", (0.025, 0.018, 0.014), roughness=0.9)
face_dark = material("Face Details", (0.035, 0.018, 0.012), roughness=0.8)
shirt_white = material("Shirt and Soles", (0.88, 0.86, 0.79), roughness=0.85)
paper = material("Book Pages", (0.92, 0.87, 0.72), roughness=0.95)
gold = material("Gold Chain", (0.82, 0.53, 0.08), metallic=0.55, roughness=0.3)
female_hair = material("Female Hair", (0.018, 0.025, 0.035), roughness=0.82)
glasses_dark = material("Glasses", (0.015, 0.025, 0.035), metallic=0.15, roughness=0.35)
hoodie_shadow = material("Hoodie Pocket", (0.72, 0.38, 0.015), roughness=0.85)
cord_white = material("Hoodie Cords", (0.84, 0.82, 0.72), roughness=0.8)
tablet_screen = material("Tablet Screen", (0.12, 0.34, 0.43), metallic=0.2, roughness=0.22)
denim_light = material("Denim Accent", (0.16, 0.38, 0.62), roughness=0.75)

male = seated_student(
    "MALE", (-0.39, 0.0, 0.0), -PAIR_OPEN_ANGLE,
    {"skin": skin_male, "top": purple, "trouser": dark, "shoe": orange},
)
female = seated_student(
    "FEMALE", (0.39, 0.0, 0.0), math.radians(180) + PAIR_OPEN_ANGLE,
    {"skin": skin_female, "top": yellow, "trouser": denim, "shoe": blue},
    female=True,
)
male.parent = bpy.data.objects["ORIGIN_GROUP_ROTATION"]
female.parent = bpy.data.objects["ORIGIN_GROUP_ROTATION"]

bpy.context.scene["blockout_notice"] = "PROXY ONLY - not approved production character art"
OUTPUT_BLEND.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT_BLEND))

OUTPUT_GLB.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action="DESELECT")
for obj in models.objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = male
bpy.ops.export_scene.gltf(
    filepath=str(OUTPUT_GLB),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_materials="EXPORT",
)
print(f"Saved {OUTPUT_BLEND}")
print(f"Exported {OUTPUT_GLB}")
