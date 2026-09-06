from pathlib import Path
import math
import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_BLEND = ROOT / "blender/courses-computer-blockout.blend"
OUTPUT_GLB = ROOT / "client/public/models/blockout/courses-computer-blockout.glb"


def material(name, color, metallic=0.0, roughness=0.7, emission=None):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1.0)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = 0.45
    return mat


def cube(name, location, scale, mat, bevel=0.06, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    modifier = obj.modifiers.new("Rounded edges", "BEVEL")
    modifier.width = bevel
    modifier.segments = 3
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


def cylinder(name, location, radius, depth, mat, rotation=(0, 0, 0), vertices=32):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


def cable(name, points, radius=0.018):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = radius
    curve.bevel_resolution = 3
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for point, coordinate in zip(spline.bezier_points, points):
        point.co = coordinate
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(charcoal)
    obj.parent = root
    return obj


bpy.ops.wm.read_factory_settings(use_empty=True)
root = bpy.data.objects.new("COURSES_COMPUTER_ROOT", None)
bpy.context.collection.objects.link(root)

cream = material("Warm computer shell", (0.73, 0.68, 0.55), roughness=0.82)
cream_light = material("Keyboard keys", (0.88, 0.83, 0.70), roughness=0.88)
charcoal = material("Charcoal details", (0.035, 0.045, 0.05), roughness=0.58)
screen_blue = material("Sky screen", (0.18, 0.58, 0.76), roughness=0.24, emission=(0.12, 0.48, 0.70))
red = material("SLP red accent", (0.64, 0.025, 0.035), roughness=0.55)
yellow = material("SLP yellow key", (0.95, 0.55, 0.03), roughness=0.62)

# CRT monitor: deliberately deep so the silhouette reads from every angle.
cube("MONITOR_CASE", (0, 0.15, 1.72), (0.92, 0.62, 0.75), cream, 0.13)
cube("MONITOR_REAR", (0, 0.62, 1.74), (0.70, 0.38, 0.60), cream, 0.18)
cube("MONITOR_BEZEL", (0, -0.49, 1.74), (0.78, 0.075, 0.61), charcoal, 0.09)
screen = cube("SCREEN", (0, -0.575, 1.79), (0.64, 0.025, 0.46), screen_blue, 0.12)
screen.scale.x = 0.98
cube("SCREEN_RED_STRIPE", (0, -0.606, 1.42), (0.61, 0.012, 0.035), red, 0.018)
for x in (-0.48, -0.16, 0.16, 0.48):
    cube("SCREEN_PIXEL", (x, -0.609, 1.79), (0.055, 0.012, 0.055), yellow if x < 0 else cream_light, 0.012)

cube("MONITOR_NECK", (0, 0.12, 0.89), (0.25, 0.23, 0.18), cream, 0.07)
cube("MONITOR_BASE", (0, 0.10, 0.69), (0.68, 0.48, 0.10), cream, 0.08)
cylinder("POWER_BUTTON", (0.67, -0.585, 1.37), 0.055, 0.035, red, rotation=(math.radians(90), 0, 0))

# Keyboard angled toward the viewer, with simplified but dimensional keys.
keyboard_rotation = (math.radians(5), 0, 0)
cube("KEYBOARD_BODY", (0, -1.18, 0.47), (1.18, 0.48, 0.12), cream, 0.09, keyboard_rotation)
for row in range(4):
    key_count = 10 if row < 3 else 7
    spacing = 0.20
    start = -(key_count - 1) * spacing / 2
    for column in range(key_count):
        key_mat = red if row == 0 and column == key_count - 1 else yellow if row == 3 and column == 0 else cream_light
        cube(
            f"KEY_{row}_{column}",
            (start + column * spacing, -1.44 + row * 0.19, 0.61 + row * 0.015),
            (0.075 if row < 3 else 0.085, 0.065, 0.035),
            key_mat,
            0.018,
            keyboard_rotation,
        )
cube("SPACE_BAR", (0.18, -1.01, 0.65), (0.42, 0.055, 0.035), cream_light, 0.018, keyboard_rotation)

# Mouse, wheel and visible cable complete the recognizable desktop set.
cube("MOUSE", (1.52, -1.05, 0.43), (0.23, 0.34, 0.12), cream, 0.12, (math.radians(8), 0, math.radians(-8)))
cylinder("MOUSE_WHEEL", (1.52, -1.37, 0.54), 0.035, 0.09, red, rotation=(0, math.radians(90), 0), vertices=20)
cable("MOUSE_CABLE", [Vector((1.52, -0.78, 0.48)), Vector((1.65, -0.38, 0.49)), Vector((1.25, 0.02, 0.52)), Vector((0.78, 0.05, 0.64))])

# A low pedestal gives the complete object a grounded, turntable-ready profile.
cylinder("DISPLAY_PLINTH", (0, 0, 0.12), 1.62, 0.18, charcoal, vertices=64)
cylinder("DISPLAY_PLINTH_ACCENT", (0, 0, 0.225), 1.55, 0.035, red, vertices=64)

bpy.context.scene["blockout_notice"] = "PROXY ONLY - not approved production art"
OUTPUT_BLEND.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT_BLEND))

OUTPUT_GLB.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action="SELECT")
bpy.context.view_layer.objects.active = root
bpy.ops.export_scene.gltf(
    filepath=str(OUTPUT_GLB),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_materials="EXPORT",
)
print(f"Saved {OUTPUT_BLEND}")
print(f"Exported {OUTPUT_GLB}")
