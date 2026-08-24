# Auditoría inicial de reconstrucción

## Fuente pública revisada

- Home: https://studylikeapro.art/
- Catálogo: https://studylikeapro.art/cursos-courses
- Curso revisado: https://studylikeapro.art/el-rentable-negocio-de-la-sublimacion

## Estructura observada

La Home presenta un hero fotográfico circular con el mensaje “Claridad Sin Humo”, una introducción de marca, un enlace a explorar cursos, un bloque ilustrado de transición, el Modo 1 Start Smart / Empezá Pro, el Modo 2 Ninja / Ninja Mode y un footer con el logo de Study Like a Pro.

El catálogo usa una cabecera fotográfica, una grilla de cursos y paginación. En la primera página pública aparecen rutas como `/el-rentable-negocio-de-la-sublimacion`, `/carpinteria-y-muebles-de-melamina`, `/academia-del-macrame`, `/curso-cocteleria-de-autor-online`, `/car-detailing` y `/plomeria-criterio-y-practica-para-dejar-de-improvisar`. El catálogo muestra 12 cursos en total y requiere completar la auditoría de la segunda página mediante navegación y/o inventario de contenidos.

Las páginas individuales siguen una plantilla editorial: hero, categoría, promesa principal, descripción, lista de perfiles/beneficios, CTA a checkout externo, sección de contenido incluido, recurso visual o video y CTA final. En el curso de sublimación el checkout se dirige a Hotmart y no debe ser reemplazado por una URL inventada.

## Modelo de contenido propuesto

Cada curso debe ser un registro reutilizable con `slug`, `title`, `category`, `mode`, `coverImage`, `heroImage`, `summary`, `description`, `audience`, `benefits`, `includedContent`, `videoUrl`, `publicFiles`, `checkoutUrl` y `status`. La Home y el catálogo consumirán esos registros; cada slug tendrá una ruta independiente y las rutas antiguas deberán conservarse o redirigirse.

## Separación pública/privada

Las imágenes, logos y videos promocionales públicos pueden migrarse al almacenamiento del nuevo sitio. Los videos completos, PDFs de temario o programas y materiales descargables que estén detrás de una compra deben permanecer en Hotmart u otra plataforma con control de acceso. La nueva web puede enlazarlos o mostrar una presentación pública sin exponer material privado.

## Estrategia de reconstrucción

La primera entrega debe ser un Home paralelo con el nuevo video hero, fallback estático, scroll narrativo, Modo 1, Modo 2 y footer. Después se incorpora el catálogo y una plantilla individual de curso. Solo cuando la paridad visual, las rutas, los CTAs y los recursos estén validados se debe cambiar el dominio principal.
