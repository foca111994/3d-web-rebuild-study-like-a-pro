# Student model contract

Place the licensed production assets at:

- `client/public/models/student.glb` (central male student)
- `client/public/models/student-companion.glb` (woman immediately to his left)

- Include the complete student and embed its textures/materials in the GLB.
- Keep the model upright on the Y axis and facing the positive Z axis.
- Apply transforms before export and avoid hidden geometry.
- Prefer a web-sized asset with few materials and compressed textures.
- Record the source, author and licence before committing the binary.

The pilot calculates each model's bounds at runtime, centres it and normalizes its
largest dimension. Future versions can therefore replace either GLB in place
without changing the React scene in normal cases. Turnaround sheets are stored in
`client/public/models/reference/`; they are modeling references, not runtime models.
