# Auditoría del hero animado

## Archivo analizado

`Students_studying_in_room_202608242218.mp4`

## Observaciones

El video dura aproximadamente 7 segundos y está compuesto en formato 16:9. Es una toma única sin cortes, con un zoom-in o dolly-in suave y continuo que empieza mostrando al grupo completo y termina en un primer plano del estudiante central con gafas de sol y gorro negro. Los personajes conservan sus posiciones y presentan micro-movimientos naturales, como sonrisas y ajustes de postura.

El video no contiene texto superpuesto. Tiene una pista musical rítmica y alegre, sin diálogos. Las esquinas presentan una viñeta circular negra fija, por lo que el contenedor del hero debe usar negro puro para que el borde se funda correctamente.

## Decisiones de integración

El primer frame debe usarse como poster/fallback porque conserva a los cuatro estudiantes y el contexto de estudio. El texto de la Home debe ubicarse en un lateral o en una capa controlada, no sobre el rostro central, porque el zoom termina ocupando el centro de la composición. El video debe configurarse con `autoPlay`, `muted`, `loop` y `playsInline`.

Para accesibilidad, la interfaz debe respetar `prefers-reduced-motion: reduce`: en ese caso se muestra el poster estático o se mantiene el video pausado en el primer frame. También conviene ofrecer una salida visible hacia “Explorar cursos” sin exigir que el visitante vea el video.

## Arquitectura recomendada

El hero animado será solo la primera capa de la experiencia. El scroll posterior debe mostrar una sección de transición/manifesto, el catálogo de Modo 1, el catálogo de Modo 2 y el footer. Cada curso debe tener un objeto de contenido reutilizable y una ruta independiente, con el CTA enlazado al checkout o plataforma correspondiente. Los materiales privados, como videos o PDFs para alumnos, deben mantenerse en el proveedor que controla el acceso, mientras que los recursos públicos pueden migrarse al almacenamiento del nuevo sitio.
