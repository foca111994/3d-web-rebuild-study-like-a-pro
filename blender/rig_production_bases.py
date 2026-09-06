from pathlib import Path
import math

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "blender/students-pair-production.blend"
OUTPUT = ROOT / "blender/students-pair-production-rigged.blend"


def make_bone(armature, name, head, tail, parent=None, connected=False):
    bone = armature.edit_bones.new(name)
    bone.head = head
    bone.tail = tail
    bone.parent = parent
    bone.use_connect = connected
    return bone


def build_rig(prefix, center_x, height):
    scale = height / 1.69
    armature = bpy.data.armatures.new(f"{prefix}_RIG_DATA")
    rig = bpy.data.objects.new(f"{prefix}_RIG", armature)
    bpy.data.collections["PRODUCTION_BASES"].objects.link(rig)
    rig.show_in_front = True
    rig.display_type = "WIRE"

    bpy.context.view_layer.objects.active = rig
    rig.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")

    pelvis = make_bone(armature, "pelvis", (center_x, 0, .82*scale), (center_x, 0, .98*scale))
    spine = make_bone(armature, "spine", pelvis.tail, (center_x, 0, 1.25*scale), pelvis, True)
    chest = make_bone(armature, "chest", spine.tail, (center_x, 0, 1.42*scale), spine, True)
    neck = make_bone(armature, "neck", chest.tail, (center_x, 0, 1.51*scale), chest, True)
    make_bone(armature, "head", neck.tail, (center_x, 0, 1.68*scale), neck, True)

    for side, sign in (("L", 1), ("R", -1)):
        shoulder = make_bone(
            armature, f"shoulder.{side}",
            (center_x, 0, 1.39*scale), (center_x + sign*.20*scale, 0, 1.39*scale), chest,
        )
        upper_arm = make_bone(
            armature, f"upper_arm.{side}", shoulder.tail,
            (center_x + sign*.34*scale, 0, 1.12*scale), shoulder, True,
        )
        forearm = make_bone(
            armature, f"forearm.{side}", upper_arm.tail,
            (center_x + sign*.38*scale, -.01*scale, .86*scale), upper_arm, True,
        )
        make_bone(
            armature, f"hand.{side}", forearm.tail,
            (center_x + sign*.39*scale, -.02*scale, .76*scale), forearm, True,
        )

        thigh = make_bone(
            armature, f"thigh.{side}",
            (center_x + sign*.12*scale, 0, .88*scale),
            (center_x + sign*.13*scale, 0, .48*scale), pelvis,
        )
        shin = make_bone(
            armature, f"shin.{side}", thigh.tail,
            (center_x + sign*.13*scale, 0, .10*scale), thigh, True,
        )
        make_bone(
            armature, f"foot.{side}", shin.tail,
            (center_x + sign*.13*scale, -.18*scale, .07*scale), shin, True,
        )

    bpy.ops.object.mode_set(mode="OBJECT")
    rig.select_set(False)
    return rig


def remove_temporary_eyes(eyes):
    # Separate eyeballs do not deform reliably during this silhouette pass.
    # Final eyes will be added after the head and facial direction are approved.
    for eye in eyes:
        bpy.data.objects.remove(eye, do_unlink=True)


def bind_body(rig, body):
    bpy.ops.object.select_all(action="DESELECT")
    body.select_set(True)
    rig.select_set(True)
    bpy.context.view_layer.objects.active = rig
    bpy.ops.object.parent_set(type="ARMATURE_AUTO")

def pose_seated(rig, female=False):
    bpy.context.view_layer.objects.active = rig
    bpy.ops.object.mode_set(mode="POSE")
    pose = rig.pose.bones

    # Hips bend forward and knees fold downward into a seated silhouette.
    for side in ("L", "R"):
        pose[f"thigh.{side}"].rotation_mode = "XYZ"
        pose[f"shin.{side}"].rotation_mode = "XYZ"
        pose[f"upper_arm.{side}"].rotation_mode = "XYZ"
        pose[f"forearm.{side}"].rotation_mode = "XYZ"
        pose[f"thigh.{side}"].rotation_euler.x = math.radians(-82)
        pose[f"shin.{side}"].rotation_euler.x = math.radians(83)
        pose[f"upper_arm.{side}"].rotation_euler.x = math.radians(-28 if female else -34)
        pose[f"forearm.{side}"].rotation_euler.x = math.radians(-58 if female else -68)

    pose["spine"].rotation_mode = "XYZ"
    pose["chest"].rotation_mode = "XYZ"
    pose["neck"].rotation_mode = "XYZ"
    pose["spine"].rotation_euler.x = math.radians(7)
    pose["chest"].rotation_euler.x = math.radians(5)
    pose["neck"].rotation_euler.x = math.radians(-8)
    bpy.ops.object.mode_set(mode="OBJECT")


bpy.ops.wm.open_mainfile(filepath=str(SOURCE))

male_body = bpy.data.objects["GEO-body_male_realistic"]
female_body = bpy.data.objects["GEO-body_female_realistic"]
male_eyes = [bpy.data.objects["GEO-body_male_realistic.eye.L"], bpy.data.objects["GEO-body_male_realistic.eye.R"]]
female_eyes = [bpy.data.objects["GEO-body_female_realistic.eye.L"], bpy.data.objects["GEO-body_female_realistic.eye.R"]]

remove_temporary_eyes(male_eyes)
remove_temporary_eyes(female_eyes)
male_rig = build_rig("MALE", -.58, 1.69)
female_rig = build_rig("FEMALE", .58, 1.639)
bind_body(male_rig, male_body)
bind_body(female_rig, female_body)
pose_seated(male_rig, female=False)
pose_seated(female_rig, female=True)

bpy.context.scene["rigging_stage"] = "first seated silhouette; clothing and props pending"
bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
print(f"Saved {OUTPUT}")
