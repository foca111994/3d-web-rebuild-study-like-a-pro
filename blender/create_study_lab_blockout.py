from pathlib import Path
import math
import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_BLEND = ROOT / "blender/study-lab-blockout.blend"
OUTPUT_GLB = ROOT / "client/public/models/blockout/study-lab-blockout.glb"


def material(name, color, metallic=0.0, roughness=0.65, emission=None):
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


def cube(name, location, scale, mat, bevel=0.05, rotation=(0, 0, 0)):
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


def cylinder(name, location, radius, depth, mat, rotation=(0, 0, 0), vertices=40):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


def tube(name, points, radius, mat):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = radius
    curve.bevel_resolution = 4
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for point, coordinate in zip(spline.bezier_points, points):
        point.co = coordinate
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


bpy.ops.wm.read_factory_settings(use_empty=True)
root = bpy.data.objects.new("STUDY_LAB_ROOT", None)
bpy.context.collection.objects.link(root)

charcoal = material("Charcoal audio gear", (0.018, 0.025, 0.035), metallic=0.12, roughness=0.42)
cream = material("Warm controls", (0.88, 0.84, 0.73), roughness=0.82)
red = material("SLP red", (0.69, 0.018, 0.03), roughness=0.5)
yellow = material("SLP yellow", (0.98, 0.56, 0.02), roughness=0.56)
blue = material("Audio blue", (0.08, 0.48, 0.72), metallic=0.08, roughness=0.30, emission=(0.06, 0.34, 0.58))
purple = material("Audio purple", (0.40, 0.06, 0.48), roughness=0.48)

# Full-size headphones on a display stand; the curved tubes stay legible from every angle.
tube("HEADBAND_OUTER", [Vector((-0.82, 0, 1.62)), Vector((-0.73, 0, 2.35)), Vector((0, 0, 2.75)), Vector((0.73, 0, 2.35)), Vector((0.82, 0, 1.62))], 0.105, blue)
tube("HEADBAND_INNER", [Vector((-0.66, 0, 1.67)), Vector((-0.58, 0, 2.24)), Vector((0, 0, 2.54)), Vector((0.58, 0, 2.24)), Vector((0.66, 0, 1.67))], 0.065, charcoal)
for side, x in (("LEFT", -0.82), ("RIGHT", 0.82)):
    cube(f"YOKE_{side}", (x, 0, 1.55), (0.12, 0.18, 0.30), charcoal, 0.055)
    cylinder(f"EAR_CUP_{side}", (x, 0, 1.22), 0.39, 0.28, blue, rotation=(0, math.radians(90), 0))
    cylinder(f"EAR_PAD_{side}", (x + (0.15 if x < 0 else -0.15), 0, 1.22), 0.31, 0.10, charcoal, rotation=(0, math.radians(90), 0))
    cylinder(f"EAR_ACCENT_{side}", (x + (-0.16 if x < 0 else 0.16), 0, 1.22), 0.17, 0.025, red, rotation=(0, math.radians(90), 0))

# A miniature mixing deck signals Study Lab without fixing the eventual art direction.
cube("MIXER_BODY", (0, -0.66, 0.50), (1.12, 0.58, 0.19), charcoal, 0.10, (math.radians(7), 0, 0))
cube("MIXER_FACE", (0, -0.79, 0.63), (0.98, 0.45, 0.055), cream, 0.065, (math.radians(7), 0, 0))
for channel, x in enumerate((-0.67, -0.23, 0.23, 0.67)):
    cube(f"FADER_TRACK_{channel}", (x, -0.90, 0.71), (0.025, 0.25, 0.018), charcoal, 0.008, (math.radians(7), 0, 0))
    cube(f"FADER_{channel}", (x, -0.96 + channel * 0.045, 0.76), (0.10, 0.065, 0.045), red if channel == 2 else yellow, 0.025, (math.radians(7), 0, 0))
    cylinder(f"KNOB_{channel}", (x, -0.56, 0.80), 0.095, 0.065, blue if channel % 2 else purple, rotation=(math.radians(83), 0, 0), vertices=28)
for step, height in enumerate((0.10, 0.19, 0.30, 0.22, 0.13)):
    cube(f"LEVEL_METER_{step}", (-0.38 + step * 0.19, -1.055, 0.84), (0.055, 0.018, height / 2), blue if step < 3 else red, 0.012)

# Stand, audio cable and turntable tie the composition together.
cube("STAND_POLE", (0, 0.30, 1.12), (0.11, 0.11, 0.82), charcoal, 0.045)
cube("STAND_TOP", (0, 0.30, 1.82), (0.62, 0.12, 0.10), charcoal, 0.055)
tube("HEADPHONE_CABLE", [Vector((0.82, 0.04, 0.98)), Vector((1.12, -0.20, 0.58)), Vector((0.92, -0.72, 0.42)), Vector((0.70, -0.88, 0.65))], 0.025, red)
cylinder("DISPLAY_PLINTH", (0, 0, 0.12), 1.52, 0.18, charcoal, vertices=64)
cylinder("DISPLAY_PLINTH_ACCENT", (0, 0, 0.225), 1.45, 0.035, red, vertices=64)

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
