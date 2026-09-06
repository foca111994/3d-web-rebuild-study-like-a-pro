/*
 * Style direction: Editorial de Taller evolucionado a cine editorial.
 * Este archivo concentra el contenido para que el catálogo sea actualizable sin duplicar páginas.
 */

export type Course = {
  number: string;
  mode: "Modo 1" | "Modo 2" | "Catálogo";
  modeLabel: string;
  category: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  officialUrl: string;
  status: string;
  featured?: boolean;
};

export const COURSES: Course[] = [
  {
    number: "01",
    mode: "Modo 1",
    modeLabel: "Start Smart / Empezá Pro",
    category: "Automotor",
    title: "Car Detailing Pro",
    slug: "car-detailing",
    description: "Interiores, pulido y ópticas. Paso a paso, sin tecnicismos raros.",
    longDescription: "Aprendé a restaurar interiores, pulir pintura, recuperar ópticas y usar productos y máquinas de detailing con criterio. Una ruta práctica para mejorar autos, subir su valor o empezar un servicio con base real.",
    officialUrl: "https://go.hotmart.com/R104881712P?ap=7e05",
    status: "Curso disponible",
    featured: true,
  },
  {
    number: "02",
    mode: "Modo 1",
    modeLabel: "Start Smart / Empezá Pro",
    category: "Manualidades & creatividad",
    title: "Academia del Macramé",
    slug: "academia-del-macrame",
    description: "Nudos, proyectos y práctica guiada para transformar inspiración en resultado.",
    longDescription: "De la inspiración al resultado: nudos, proyectos y práctica guiada en un solo lugar. Un espacio para aprender haciendo y convertir una idea manual en una skill concreta.",
    officialUrl: "https://go.hotmart.com/B104803495T?ap=8974",
    status: "Curso disponible",
    featured: true,
  },
  {
    number: "03",
    mode: "Modo 1",
    modeLabel: "Start Smart / Empezá Pro",
    category: "Oficios / skills",
    title: "Tu Negocio de Jabones Artesanales",
    slug: "tu-negocio-de-jabones-artesanales",
    description: "Una ruta clara para crear, presentar y vender jabones con más criterio.",
    longDescription: "Aprendé a crear, presentar y vender jabones artesanales con una guía más ordenada y aterrizada. La información pública del curso queda conectada al catálogo oficial mientras completamos la ficha original.",
    officialUrl: "https://go.hotmart.com/F104947873X",
    status: "Ver disponibilidad",
    featured: true,
  },
  {
    number: "04",
    mode: "Modo 1",
    modeLabel: "Start Smart / Empezá Pro",
    category: "Música & voz",
    title: "Aprenda a Cantar con Adrián Lozano",
    slug: "aprenda-a-cantar-con-adrian-lozano",
    description: "Técnica vocal para empezar a entrenar la voz con más orden y menos caos.",
    longDescription: "Una introducción práctica para entender qué ajustar, cómo entrenar y cómo empezar a trabajar la voz con más orden. La información pública del curso queda conectada al catálogo oficial mientras completamos la ficha original.",
    officialUrl: "https://go.hotmart.com/H104958164K?ap=3273",
    status: "Ver disponibilidad",
    featured: true,
  },
  {
    number: "05",
    mode: "Modo 1",
    modeLabel: "Start Smart / Empezá Pro",
    category: "Automotor",
    title: "Mecánica de Motos VIP",
    slug: "mecanica-de-motos-vip",
    description: "Mantenimiento, diagnóstico y motor para entender una moto de verdad.",
    longDescription: "Una formación pensada para pasar de tener una idea general a entender cómo funciona una moto y cómo trabajarla con más seguridad: mantenimiento básico, diagnóstico y motor.",
    officialUrl: "https://go.hotmart.com/O104962434L",
    status: "Ver disponibilidad",
    featured: true,
  },
  {
    number: "01",
    mode: "Modo 2",
    modeLabel: "Ninja / Ninja Mode",
    category: "Idiomas",
    title: "Aprende Japonés Desde Cero",
    slug: "aprende-japones-desde-cero",
    description: "Una base clara para empezar a leer, escuchar y comunicarte con más estructura.",
    longDescription: "Empezá japonés con una base práctica y pensada para avanzar sin sentir que estás adivinando todo el tiempo. Ideal para quienes buscan un punto de partida ordenado y realista.",
    officialUrl: "https://studylikeapro.art/cursos-courses",
    status: "Ver disponibilidad",
  },
  {
    number: "02",
    mode: "Modo 2",
    modeLabel: "Ninja / Ninja Mode",
    category: "Hobbies",
    title: "Curso Coctelería de Autor Online",
    slug: "curso-cocteleria-de-autor-online",
    description: "Técnica, creatividad y una mirada más profesional del bar.",
    longDescription: "Aprendé a crear cócteles con una base más sólida, entendiendo sabores, combinaciones y recursos para desarrollar tu propio estilo.",
    officialUrl: "https://go.hotmart.com/U105038331X?dp=1",
    status: "Ver disponibilidad",
  },
  {
    number: "03",
    mode: "Modo 2",
    modeLabel: "Ninja / Ninja Mode",
    category: "Negocios & hobbies",
    title: "El Rentable Negocio de la Sublimación",
    slug: "el-rentable-negocio-de-la-sublimacion",
    description: "Sublimación, equipos y pasos claros para arrancar con más criterio.",
    longDescription: "Aprendé a crear, personalizar y vender productos con una ruta más clara para convertir la sublimación en un negocio real. La formación mezcla sublimación, equipos, diseño y marketing digital en una ruta paso a paso.",
    officialUrl: "https://go.hotmart.com/K105051193P?ap=ffc2",
    status: "Curso disponible",
  },
  {
    number: "08",
    mode: "Catálogo",
    modeLabel: "Courses",
    category: "Oficios / skills",
    title: "Carpintería y Muebles de Melamina",
    slug: "carpinteria-y-muebles-de-melamina",
    description: "De los fundamentos al mueble terminado: aprender haciendo.",
    longDescription: "Una formación para entender el oficio, ganar seguridad y construir con más criterio: medición, herramientas, madera, melamina y proyectos reales.",
    officialUrl: "https://go.hotmart.com/U105088163T?ap=74a2",
    status: "Curso disponible",
  },
  {
    number: "09",
    mode: "Catálogo",
    modeLabel: "Courses",
    category: "Negocios / estética",
    title: "Master en miradas: Todo sobre cejas y pestañas",
    slug: "master-en-miradas-todo-sobre-cejas-y-pestanas",
    description: "De la técnica de belleza a una habilidad con potencial de ingresos.",
    longDescription: "Una ruta ordenada para aprender técnicas de cejas y pestañas desde cero, practicar con criterio y empezar a construir un servicio propio.",
    officialUrl: "https://go.hotmart.com/W104803503H",
    status: "Curso disponible",
  },
];

export const MODE_ONE = COURSES.filter((course) => course.mode === "Modo 1");
export const MODE_TWO = COURSES.filter((course) => course.mode === "Modo 2");

export function getCourseBySlug(slug: string) {
  return COURSES.find((course) => course.slug === slug);
}
