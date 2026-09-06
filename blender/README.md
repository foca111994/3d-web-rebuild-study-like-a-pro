# Study Like a Pro — Blender workspace

`students-pair.blend` is the editable source scene for the paired students.

`students-pair-production.blend` contains the official Blender CC0 realistic
male and female anatomy bases. They remain unposed until the rigging pass is
validated; the existing blockout is not replaced by this file.

`students-pair-production-rigged.blend` is the non-destructive first rigging
and seated-silhouette pass. Clothing, props and final pair orientation remain
separate later stages.

## Regenerate the reference scene

Run Blender in background mode with `setup_reference_scene.py`. The script
loads the four images from `client/public/models/source/students-pair/`, sets
metric units and creates separate `REFERENCES`, `MODELS`, and `SCENE_GUIDES`
collections.

The final models must remain separate and export to:

- `client/public/models/student.glb`
- `client/public/models/student-companion.glb`

The female model must keep a fixed 180-degree Y orientation offset relative to
the male model so one faces forward whenever the other faces backward.
## Production composition review

`students-pair-production-composed.blend` is the non-destructive composition checkpoint. It adds independent roots for both characters, the approved 24-degree soft-V opening, and temporary chair/book/tablet proxies. It is not exported to the website and is not the final visual design.

The four renders under `previews/composition/` verify full-body framing and the relationship of the two silhouettes throughout a 360-degree turn before clothing work begins.

`students-pair-production-composed-v2.blend` is the refined silhouette checkpoint. It preserves the 24-degree relationship, gives the two temporary chairs cleaner separation, and brings the interaction props closer to the posed hands. Its four review renders live under `previews/composition-v2/`.

`students-pair-production-male-clothes-v1.blend` introduces the first editable style pass for the male student: a black sweater with a purple band, charcoal cargo silhouettes, and purple/orange shoes. Every garment remains separate from the body so proportions and final topology can be replaced without rebuilding the composition.

`students-pair-production-male-clothes-v2.blend` replaces the rectangular sweater proxy with rounded chest, color-band, and waist volumes that better follow the seated anatomy. It also introduces separate cargo-pocket forms while preserving the complete v1 checkpoint.

`students-pair-production-both-clothes-v1.blend` adds the first separate style pass for the female student: yellow hoodie forms, blue denim silhouettes, blue/cream shoes, and blue/purple headphones. It is a 360-degree proportion checkpoint, not final cloth topology.

`students-pair-production-both-clothes-v2.blend` refines the female silhouette by reducing hoodie and hood depth, tightening the sleeve and denim construction volumes, and slightly reducing the headphone cups. The v1 scene remains available for comparison.

`students-pair-production-heads-v1.blend` adds the first editable identity pass: the male base keeps its clean shaved silhouette for a later buzz-cut texture, while the female student receives a separate dark bob and glasses. These details can be remodeled without affecting the rigs.

`render_art_direction_review.py` produces a clean four-angle review under `previews/art-direction-v1/`. It assigns readable temporary materials to skin, chairs, book and tablet, then adds a neutral floor and warm/cool studio lighting. This is for evaluating the art direction only and does not alter or export the source scene.

`students-pair-production-sweater-shell-v1.blend` replaces the male torso ellipsoids with the first anatomical garment shell copied from the already posed body. It has its own thickness and black/purple material regions; sleeves remain separate construction volumes until the torso fit is approved.

`students-pair-production-sweater-full-v1.blend` replaces the male arm capsules with reduced anatomical sleeve shells copied from both posed arms. Upper-arm regions remain black and forearm regions purple; cuffs and final retopology are intentionally deferred.

`students-pair-production-sweater-finished-v1.blend` adds the first clean graphic finish to the anatomical sweater: a separate rounded purple torso band, black shoulder transitions, and independent black cuffs. This removes the most visible face-selection edges while keeping every finishing piece editable.

`students-pair-production-cargo-v1.blend` refines the male cargo trousers into smoother seated thigh and shin volumes with separate rounded side pockets. The approved sweater, pose and pair composition remain unchanged, and this checkpoint is not exported to the website.

`students-pair-production-female-hoodie-v1.blend` replaces the female torso and sleeve construction volumes with reduced anatomical garment shells copied from the posed body. The hood remains a separate editable piece, and the web blockout is not replaced.

`students-pair-production-female-hoodie-finished-v1.blend` tightens the anatomical hand exclusion and adds separate rounded wrist cuffs. It remains an editable art-direction checkpoint rather than a web export.

`students-pair-production-female-outfit-v1.blend` refines the female lower outfit with smoother seated denim volumes, dedicated knee transitions, and layered rounded shoes with separate soles and toe panels. It remains separate from the active web model.

`students-pair-production-identity-v2.blend` adds a close male buzz-cut layer and rebuilds the female identity with a layered bob, lighter glasses and reduced headphones. Facial likeness and textures remain a later art pass.

`students-pair-production-props-v1.blend` rebuilds the study props as editable layered objects: an open book with separate cover, pages and spine, plus a tablet with frame, screen, camera and button. Existing approved hand poses are preserved.

`students-pair-production-chairs-v1.blend` replaces the tall chair proxies with compact rounded seats, lower soft-edged backs and subtly splayed legs. Character positions and poses are unchanged.

`previews/final-silhouette-review/` contains the eight-angle pre-export audit and `geometry-report.json`. This review measures the current visible source geometry without writing or replacing either website GLB.

`students-pair-production-cleanup-v1.blend` applies the first pre-export silhouette cleanup: smaller male shoulder caps, softer female knees, compact cuffs and copied body meshes with shoe-enclosed foot geometry removed. All earlier checkpoints retain the complete anatomy.

`students-pair-production-web-optimized-v1.blend` is a separate web-preparation copy. It removes hidden legacy construction objects and reference-only objects, then applies conservative polygon reduction only to dense visible meshes. It is an eight-angle review checkpoint and is not a GLB export.

`students-pair-production-web-materials-v1.blend` normalizes the compact shared palette to simple opaque Principled materials and adds the previously missing skin, book and tablet assignments. It contains no texture-image dependency and remains a review copy rather than a GLB export.

`students-pair-production-export-ready-v1.blend` adds the clean `SLP_STUDENTS_PAIR` export root, retains independent male and female roots, organizes all objects under explicit web-export collections and applies the remaining object scales. This checkpoint can later produce a combined pair or separate character files, but no GLB is written at this stage.

`export_test_glb.py` writes a combined, animation-free GLB to a temporary path for import validation. The temporary test does not replace the active website model.

`students-pair-production-skin-weights-v1.blend` limits every skinned vertex to its four strongest normalized influences for reliable glTF/WebGL playback. The updated temporary export is `/private/tmp/slp-students-pair-test-v2.glb` and still does not replace the website model.

`render_imported_glb_review.py` reimports that temporary v2 GLB and renders its actual exported materials from four cardinal angles under `previews/glb-test-v2/`.

`students-pair-production-static-web-v1.blend` bakes the approved seated pose into the six skinned meshes and removes both armatures in a separate checkpoint. The website only needs to rotate the complete pair, so the v3 temporary GLB uses this static geometry to prevent rest-pose changes during import.
