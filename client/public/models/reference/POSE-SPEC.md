# Paired students pose and responsive framing

The final 360-degree composition is represented by
`students-study-pose-360-final.png`. Earlier pose images remain as exploration
history.

- The central male student sits reading an open physical book.
- The female student sits on his right using a tablet.
- Her blue headphones remain worn over her ears.
- Their chairs and bodies retain an opposed composition but open outward by
  12 degrees each, producing a softer 156-degree relationship instead of a
  rigid 180-degree line.
- At 0 degrees the male reads as a front three-quarter view and the female as
  an opposing rear three-quarter view.
- At 90 and 270 degrees they appear in opposite-facing profiles.
- At 180 degrees the male faces away and the female faces the camera.
- They must never read as both facing the camera or both facing away at the
  same time.
- Both characters form one compact selectable inventory object while remaining
  separate GLB assets for easier optimization and replacement.
- Chairs, book and tablet belong to their respective model exports.
- Every surface must be complete for 360-degree rotation: backs of heads,
  hood, clothing, chairs, props, hands and shoes cannot use camera-only cheats.

## Responsive framing

### Smartphone (portrait priority)

- Keep both complete bodies, props and chair legs visible.
- Fit the combined group to roughly 70–78% of the available stage height.
- Preserve a safe margin around the silhouette and the minimal UI labels.
- Use the tighter three-quarter composition shown in the pose reference.

### Tablet

- Fit the group to roughly 64–72% of the stage height.
- Add modest horizontal breathing room without separating the characters.
- Allow neighbouring inventory objects to become more visible.

### Desktop

- Fit the group to roughly 58–66% of the stage height.
- Keep the pair visually central inside the phone-like frame.
- Use the wider canvas for adjacent inventory objects, not for enlarging UI text.

## Runtime rules

- Recalculate bounds from both loaded GLBs as a single visual group.
- Prefer camera-distance and group-scale changes over per-model offsets.
- Cap device pixel ratio and load compressed meshes/textures on mobile.
- Respect `prefers-reduced-motion` by stopping automatic rotation and floating.
- Never substitute this PNG for the production 3D models.
