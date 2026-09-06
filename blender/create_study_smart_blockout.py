from pathlib import Path
import math
import bpy


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_BLEND = ROOT / "blender/study-smart-cassette-blockout.blend"
OUTPUT_GLB = ROOT / "client/public/models/blockout/study-smart-cassette-blockout.glb"


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
        bsdf.inputs["Emission Strength"].default_value = 0.35
    return mat


def cube(name, location, scale, mat, bevel=0.05, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    beveler = obj.modifiers.new("Rounded edges", "BEVEL")
    beveler.width = bevel
    beveler.segments = 3
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


def cylinder(name, location, radius, depth, mat, rotation=(math.radians(90), 0, 0), vertices=36):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


def torus(name, location, major_radius, minor_radius, mat):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=major_radius,
        minor_radius=minor_radius,
        major_segments=36,
        minor_segments=10,
        location=location,
        rotation=(math.radians(90), 0, 0),
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


bpy.ops.wm.read_factory_settings(use_empty=True)
root = bpy.data.objects.new("STUDY_SMART_ROOT", None)
bpy.context.collection.objects.link(root)

charcoal = material("Charcoal shell", (0.025, 0.032, 0.04), metallic=0.08, roughness=0.48)
cream = material("Warm cassette", (0.83, 0.79, 0.68), roughness=0.82)
cream_light = material("Label paper", (0.96, 0.92, 0.81), roughness=0.9)
red = material("SLP red", (0.68, 0.02, 0.035), roughness=0.5)
yellow = material("SLP yellow", (0.98, 0.57, 0.02), roughness=0.62)
blue = material("Sky display", (0.15, 0.55, 0.74), roughness=0.25, emission=(0.10, 0.42, 0.62))
clear_dark = material("Cassette window", (0.07, 0.11, 0.13), metallic=0.15, roughness=0.22)

# Portable cassette player: enough depth and controls to read from a full 360° turn.
cube("PLAYER_BODY", (0, 0.13, 1.25), (1.05, 0.36, 1.18), charcoal, 0.15)
cube("PLAYER_FRONT_PANEL", (0, -0.255, 1.25), (0.91, 0.035, 1.01), cream, 0.10)
cube("PLAYER_REAR_PANEL", (0, 0.50, 1.25), (0.86, 0.025, 0.98), charcoal, 0.08)
cube("DISPLAY", (0, -0.305, 1.96), (0.60, 0.025, 0.19), blue, 0.045)
for x, height in ((-0.40, 0.055), (-0.22, 0.10), (-0.04, 0.145), (0.14, 0.085), (0.32, 0.125)):
    cube("DISPLAY_BAR", (x, -0.337, 1.95), (0.045, 0.012, height), cream_light, 0.01)

# The tape sits visibly inside the player, but projects forward as a hero detail.
cube("CASSETTE_BODY", (0, -0.37, 1.13), (0.72, 0.075, 0.48), cream_light, 0.075)
cube("CASSETTE_LABEL", (0, -0.455, 1.31), (0.58, 0.018, 0.19), yellow, 0.04)
cube("CASSETTE_WINDOW", (0, -0.48, 1.03), (0.38, 0.018, 0.15), clear_dark, 0.035)
for side, x in (("LEFT", -0.28), ("RIGHT", 0.28)):
    torus(f"REEL_{side}", (x, -0.505, 1.08), 0.14, 0.035, red)
    cylinder(f"REEL_HUB_{side}", (x, -0.515, 1.08), 0.055, 0.025, charcoal)
for x in (-0.52, 0.52):
    cylinder("CASSETTE_SCREW", (x, -0.503, 0.82), 0.025, 0.018, charcoal, vertices=20)

# Physical controls: play is intentionally the red focal button.
button_x = (-0.64, -0.32, 0.0, 0.32, 0.64)
for index, x in enumerate(button_x):
    mat = red if index == 2 else cream_light
    cube(f"CONTROL_{index}", (x, -0.36, 0.46), (0.12, 0.10, 0.12), mat, 0.035)
cube("PLAY_TRIANGLE_PROXY", (0, -0.485, 0.46), (0.035, 0.012, 0.055), yellow, 0.012, (0, 0, math.radians(45)))

# Headphone jack, volume dial and handle give useful side/back silhouettes.
cylinder("VOLUME_DIAL", (1.09, 0.08, 1.72), 0.19, 0.12, yellow, rotation=(0, math.radians(90), 0), vertices=28)
cylinder("HEADPHONE_JACK", (-1.09, 0.08, 1.65), 0.10, 0.08, red, rotation=(0, math.radians(90), 0), vertices=28)
cube("HANDLE_TOP", (0, 0.16, 2.72), (0.72, 0.11, 0.10), cream, 0.07)
cube("HANDLE_LEFT", (-0.72, 0.16, 2.48), (0.10, 0.11, 0.28), cream, 0.07)
cube("HANDLE_RIGHT", (0.72, 0.16, 2.48), (0.10, 0.11, 0.28), cream, 0.07)

# Turntable base visually connects this object to the rest of the inventory.
cylinder("DISPLAY_PLINTH", (0, 0, 0.12), 1.45, 0.18, charcoal, rotation=(0, 0, 0), vertices=64)
cylinder("DISPLAY_PLINTH_ACCENT", (0, 0, 0.225), 1.38, 0.035, red, rotation=(0, 0, 0), vertices=64)

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
