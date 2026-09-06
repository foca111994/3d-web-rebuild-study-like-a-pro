export type FreeResource = {
  id: string;
  name: string;
  slug: string;
  officialUrl: string;
  category: string;
  secondaryCategories: string[];
  accessType: "Sin registro" | "Descarga gratuita" | "Extensión";
  priceType: "Gratis" | "Acceso gratuito";
  shortHook: string;
  description: string;
  whyWeLikeIt: string;
  status: "Verificado" | "Revisar antes de instalar";
  batch: "01";
  lastVerified: "2026-09-06";
};

export const freeResources: FreeResource[] = [
  { id: "fr-001", name: "PDF24 Tools", slug: "pdf24-tools", officialUrl: "https://tools.pdf24.org/", category: "Documentos", secondaryCategories: ["Estudio"], accessType: "Sin registro", priceType: "Gratis", shortHook: "Tu caja de herramientas PDF, sin suscripción.", description: "Une, divide, comprime, convierte, firma y edita archivos PDF desde el navegador.", whyWeLikeIt: "Resuelve muchos problemas cotidianos de PDF en un solo lugar.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-002", name: "Photopea", slug: "photopea", officialUrl: "https://www.photopea.com/", category: "Diseño", secondaryCategories: [], accessType: "Sin registro", priceType: "Gratis", shortHook: "Photoshop, sin Photoshop.", description: "Editor de imágenes en el navegador compatible con PSD, capas, máscaras y flujos profesionales.", whyWeLikeIt: "Podés empezar a editar en segundos sin instalar nada.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-003", name: "Mermaid Live Editor", slug: "mermaid-live-editor", officialUrl: "https://mermaid.ai/live/", category: "Estudio", secondaryCategories: ["Coding"], accessType: "Sin registro", priceType: "Gratis", shortHook: "Convertí texto estructurado en diagramas.", description: "Crea flujos, secuencias, cronologías y otros esquemas visuales a partir de sintaxis Mermaid.", whyWeLikeIt: "Transforma apuntes ordenados en diagramas claros.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-004", name: "RAWGraphs", slug: "rawgraphs", officialUrl: "https://app.rawgraphs.io/", category: "Datos", secondaryCategories: ["Diseño"], accessType: "Sin registro", priceType: "Gratis", shortHook: "Hacé que tus datos sean más fáciles de ver.", description: "Herramienta abierta para convertir datos tabulares en visualizaciones exportables.", whyWeLikeIt: "Acerca la visualización de datos sin exigir una plataforma compleja.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-005", name: "Buzz", slug: "buzz", officialUrl: "https://github.com/chidiwilliams/buzz", category: "IA", secondaryCategories: ["Estudio", "Audio"], accessType: "Descarga gratuita", priceType: "Gratis", shortHook: "Transcribí localmente con Whisper.", description: "Aplicación abierta para transcribir y traducir audio o video en tu computadora.", whyWeLikeIt: "Es útil para clases y entrevistas, y mantiene el flujo de trabajo local.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-006", name: "Excalidraw", slug: "excalidraw", officialUrl: "https://excalidraw.com/", category: "Estudio", secondaryCategories: ["Diseño"], accessType: "Sin registro", priceType: "Gratis", shortHook: "Pensalo. Dibujalo. Explicalo.", description: "Pizarra de estilo dibujado a mano para ideas, explicaciones, esquemas y notas visuales.", whyWeLikeIt: "Reduce al mínimo la distancia entre una idea y un diagrama.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-007", name: "GoFullPage", slug: "gofullpage", officialUrl: "https://gofullpage.com/", category: "Navegador", secondaryCategories: ["Estudio"], accessType: "Extensión", priceType: "Gratis", shortHook: "Capturá la página completa.", description: "Extensión para guardar una página web entera como imagen o PDF.", whyWeLikeIt: "Sirve para investigación, referencias y documentación visual completa.", status: "Revisar antes de instalar", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-008", name: "EZGIF", slug: "ezgif", officialUrl: "https://ezgif.com/", category: "Video", secondaryCategories: ["Diseño"], accessType: "Sin registro", priceType: "Gratis", shortHook: "Pequeños trabajos multimedia, resueltos.", description: "Utilidades para crear, convertir, recortar y optimizar GIF, imágenes y clips breves.", whyWeLikeIt: "Evita abrir un editor completo para una tarea pequeña.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-009", name: "WebsitePrompts.ai", slug: "websiteprompts-ai", officialUrl: "https://websiteprompts.ai/prompts", category: "Coding", secondaryCategories: ["IA"], accessType: "Sin registro", priceType: "Gratis", shortHook: "Empezá la web con una mejor instrucción.", description: "Biblioteca de prompts para constructores web y asistentes de programación con IA.", whyWeLikeIt: "Ofrece un punto de partida cuando la página en blanco frena el proyecto.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
  { id: "fr-010", name: "Citizen DJ", slug: "citizen-dj", officialUrl: "https://citizen-dj.labs.loc.gov/", category: "Audio", secondaryCategories: ["Creatividad"], accessType: "Sin registro", priceType: "Acceso gratuito", shortHook: "Explorá la historia a través del sonido.", description: "Proyecto de la Library of Congress para descubrir y remezclar colecciones históricas de audio.", whyWeLikeIt: "Abre una forma creativa de investigar y producir; revisá los derechos de cada colección.", status: "Verificado", batch: "01", lastVerified: "2026-09-06" },
];

