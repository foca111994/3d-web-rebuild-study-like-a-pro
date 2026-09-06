from pathlib import Path
import math

import bpy


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production-rigged.blend"
OUTPUT = ROOT / "blender/students-pair-production-composed.blend"


def material(name, color, metallic=0.0, roughness=0.55):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.diffuse_color = color
    mat.metallic = metallic
    mat.roughness = roughness
    return mat


def parent_keep_world(obj, parent):
    world = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = world


def rounded_box(name, location, scale, mat, bevel=0.04, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (scale[0] / 2, scale[1] / 2, scale[2] / 2)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    modifier = obj.modifiers.new("Soft edges", "BEVEL")
    modifier.width = bevel
    modifier.segments = 3
    obj.data.materials.append(mat)
    return obj


def cylinder(name, location, radius, depth, mat):
    bpy.ops.mesh.primitive_cylinder_add(vertices=20, radius=radius, depth=depth, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    return obj


def make_root(name, center_x):
    root = bpy.data.objects.new(name, None)
    root.empty_display_type = "ARROWS"
    root.empty_display_size = 0.28
    root.location = (center_x, 0, 0)
    bpy.data.collections["PRODUCTION_BASES"].objects.link(root)
    return root


def make_chair(prefix, center_x, root, seat_mat, leg_mat):
    pieces = [
        rounded_box(f"{prefix}_CHAIR_SEAT", (center_x, .06, .67), (.58, .58, .10), seat_mat, .055),
        rounded_box(f"{prefix}_CHAIR_BACK", (center_x, .31, 1.02), (.60, .10, .68), seat_mat, .06),
    ]
    for x in (-.23, .23):
        for y in (-.18, .22):
            pieces.append(cylinder(f"{prefix}_CHAIR_LEG", (center_x + x, y, .33), .026, .66, leg_mat))
    for piece in pieces:
        parent_keep_world(piece, root)


def make_book(center_x, root, page_mat, cover_mat):
    left = rounded_box("MALE_BOOK_LEFT", (center_x - .15, -.47, .99), (.31, .38, .035), page_mat, .012,
                       rotation=(math.radians(8), 0, math.radians(-9)))
    right = rounded_box("MALE_BOOK_RIGHT", (center_x + .15, -.47, .99), (.31, .38, .035), page_mat, .012,
                        rotation=(math.radians(8), 0, math.radians(9)))
    cover = rounded_box("MALE_BOOK_COVER", (center_x, -.455, .968), (.64, .40, .025), cover_mat, .014,
                        rotation=(math.radians(8), 0, 0))
    for piece in (cover, left, right):
        parent_keep_world(piece, root)


def make_tablet(center_x, root, tablet_mat, screen_mat):
    body = rounded_box("FEMALE_TABLET", (center_x, -.44, 1.02), (.48, .035, .34), tablet_mat, .035,
                       rotation=(math.radians(68), 0, 0))
    screen = rounded_box("FEMALE_TABLET_SCREEN", (center_x, -.457, 1.026), (.42, .012, .28), screen_mat, .018,
                         rotation=(math.radians(68), 0, 0))
    parent_keep_world(body, root)
    parent_keep_world(screen, root)


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))

collection = bpy.data.collections["PRODUCTION_BASES"]
male_root = make_root("MALE_CHARACTER_ROOT", -.58)
female_root = make_root("FEMALE_CHARACTER_ROOT", .58)
pair_root = bpy.data.objects.new("PAIR_TURNTABLE", None)
pair_root.empty_display_type = "CIRCLE"
pair_root.empty_display_size = .55
collection.objects.link(pair_root)

parent_keep_world(male_root, pair_root)
parent_keep_world(female_root, pair_root)
parent_keep_world(bpy.data.objects["MALE_RIG"], male_root)
parent_keep_world(bpy.data.objects["FEMALE_RIG"], female_root)

chair_mat = material("Proxy chair", (.025, .03, .04, 1), metallic=.05, roughness=.42)
wood_mat = material("Proxy wood", (.24, .085, .028, 1), roughness=.48)
page_mat = material("Proxy pages", (.82, .74, .56, 1), roughness=.8)
cover_mat = material("Proxy book cover", (.04, .14, .23, 1), roughness=.55)
tablet_mat = material("Proxy tablet", (.055, .07, .085, 1), metallic=.5, roughness=.26)
screen_mat = material("Proxy screen", (.03, .24, .34, 1), metallic=.15, roughness=.18)

make_chair("MALE", -.58, male_root, chair_mat, wood_mat)
make_chair("FEMALE", .58, female_root, chair_mat, wood_mat)
make_book(-.58, male_root, page_mat, cover_mat)
make_tablet(.58, female_root, tablet_mat, screen_mat)

# Bring the pair closer, then open their opposing directions into a soft 24-degree V.
male_root.location.x += .16
female_root.location.x -= .16
male_root.rotation_euler.z = math.radians(-12)
female_root.rotation_euler.z = math.radians(192)

bpy.context.scene["composition_stage"] = (
    "two independent character roots; 24-degree soft V; proxy chairs, book and tablet"
)
bpy.context.scene["web_model_status"] = "not exported; existing web blockout remains active"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
