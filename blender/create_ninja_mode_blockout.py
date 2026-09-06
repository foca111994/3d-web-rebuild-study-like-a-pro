from pathlib import Path
import math
import bpy


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_BLEND = ROOT / "blender/ninja-mode-blockout.blend"
OUTPUT_GLB = ROOT / "client/public/models/blockout/ninja-mode-blockout.glb"


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
        bsdf.inputs["Emission Strength"].default_value = 0.4
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


def cylinder(name, location, radius, depth, mat, rotation=(0, 0, 0), vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


def torus(name, location, major_radius, minor_radius, mat, rotation=(math.radians(90), 0, 0)):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=major_radius,
        minor_radius=minor_radius,
        major_segments=48,
        minor_segments=12,
        location=location,
        rotation=rotation,
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    obj.parent = root
    return obj


def shuriken(name, location, radius, thickness, mat, rotation=(math.radians(90), 0, 0)):
    points = []
    for index in range(16):
        angle = math.radians(22.5 * index)
        point_radius = radius if index % 4 == 0 else radius * (0.27 if index % 2 else 0.48)
        points.append((math.cos(angle) * point_radius, math.sin(angle) * point_radius))
    vertices = [(x, y, -thickness / 2) for x, y in points] + [(x, y, thickness / 2) for x, y in points]
    faces = [tuple(range(15, -1, -1)), tuple(range(16, 32))]
    for index in range(16):
        nxt = (index + 1) % 16
        faces.append((index, nxt, 16 + nxt, 16 + index))
    mesh = bpy.data.meshes.new(f"{name}_MESH")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler = rotation
    obj.data.materials.append(mat)
    obj.parent = root
    beveler = obj.modifiers.new("Blade bevel", "BEVEL")
    beveler.width = 0.035
    beveler.segments = 2
    return obj


bpy.ops.wm.read_factory_settings(use_empty=True)
root = bpy.data.objects.new("NINJA_MODE_ROOT", None)
bpy.context.collection.objects.link(root)

charcoal = material("Charcoal", (0.018, 0.025, 0.032), metallic=0.12, roughness=0.4)
steel = material("Training steel", (0.35, 0.42, 0.46), metallic=0.7, roughness=0.25)
red = material("SLP red", (0.68, 0.018, 0.03), metallic=0.12, roughness=0.48)
yellow = material("SLP yellow", (0.96, 0.54, 0.02), roughness=0.58)
blue = material("Focus blue", (0.10, 0.48, 0.68), roughness=0.28, emission=(0.07, 0.34, 0.55))
cream = material("Warm paper", (0.90, 0.86, 0.74), roughness=0.88)

# A compact training shrine: recognizable from the front and strong in silhouette from the side.
cube("TARGET_FRAME", (0, 0.25, 1.55), (1.05, 0.18, 1.18), charcoal, 0.10)
cube("TARGET_FACE", (0, 0.04, 1.55), (0.90, 0.045, 1.02), cream, 0.09)
torus("TARGET_RING_OUTER", (0, -0.025, 1.55), 0.67, 0.055, red)
torus("TARGET_RING_MIDDLE", (0, -0.035, 1.55), 0.43, 0.045, yellow)
cylinder("TARGET_CENTER", (0, -0.075, 1.55), 0.19, 0.06, blue, rotation=(math.radians(90), 0, 0))

# Hero shuriken floats in front of the target and retains real thickness for the 360° turn.
shuriken("HERO_SHURIKEN", (0.15, -0.42, 1.62), 0.82, 0.14, steel, (math.radians(90), 0, math.radians(12)))
torus("SHURIKEN_GRIP", (0.15, -0.50, 1.62), 0.15, 0.035, charcoal)

# Progress blocks communicate training/levels without committing to final art direction.
for level, height in enumerate((0.22, 0.38, 0.56), start=1):
    cube(f"LEVEL_{level}", (-0.86 + (level - 1) * 0.30, -0.30, 0.40 + height / 2), (0.11, 0.16, height / 2), yellow if level < 3 else red, 0.035)
cube("PROGRESS_PANEL", (-0.55, 0.03, 0.45), (0.56, 0.15, 0.14), charcoal, 0.055)

# Rolled practice scroll balances the base and gives the back view more detail.
cylinder("SCROLL_LEFT", (0.77, -0.15, 0.48), 0.14, 0.62, red, rotation=(0, math.radians(90), 0), vertices=32)
cylinder("SCROLL_RIGHT", (0.77, -0.15, 0.48), 0.10, 0.70, cream, rotation=(0, math.radians(90), 0), vertices=32)

cylinder("DISPLAY_PLINTH", (0, 0, 0.12), 1.48, 0.18, charcoal, vertices=64)
cylinder("DISPLAY_PLINTH_ACCENT", (0, 0, 0.225), 1.41, 0.035, red, vertices=64)

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
