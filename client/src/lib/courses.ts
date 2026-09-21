/*
 * Canonical course catalogue.
 * Every published course belongs to COURSES and exactly one learning level.
 */

export type CourseLevel = "start-smart" | "war-mode";

export type Course = {
  number: string;
  level: CourseLevel;
  category: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  officialUrl: string;
  status: string;
  image: string;
  catalog: {
    title: string;
    category: string;
    description: string;
  };
  featured?: boolean;
};

export const COURSES: Course[] = [
  {
    number: "01",
    level: "war-mode",
    category: "Negocios & hobbies",
    title: "El Rentable Negocio de la Sublimación",
    slug: "el-rentable-negocio-de-la-sublimacion",
    description: "Sublimación, equipos y pasos claros para arrancar con más criterio.",
    longDescription: "Aprendé a crear, personalizar y vender productos con una ruta más clara para convertir la sublimación en un negocio real. La formación mezcla sublimación, equipos, diseño y marketing digital en una ruta paso a paso.",
    officialUrl: "https://go.hotmart.com/K105051193P?ap=ffc2",
    status: "Curso disponible",
    image: "/courses/sublimacion.webp",
    catalog: { title: "El Rentable Negocio de la Sublimación", category: "Negocios · Hobbies", description: "Entendé la sublimación desde la técnica y su potencial como línea de productos y servicios." },
  },
  {
    number: "02",
    level: "war-mode",
    category: "Oficios / skills",
    title: "Carpintería y Muebles de Melamina",
    slug: "carpinteria-y-muebles-de-melamina",
    description: "De los fundamentos al mueble terminado: aprender haciendo.",
    longDescription: "Una formación para entender el oficio, ganar seguridad y construir con más criterio: medición, herramientas, madera, melamina y proyectos reales.",
    officialUrl: "https://go.hotmart.com/U105088163T?ap=74a2",
    status: "Curso disponible",
    image: "/courses/carpinteria.webp",
    catalog: { title: "Carpintería y Muebles de Melamina", category: "Oficios · Skills", description: "De los fundamentos al mueble terminado: una ruta clara para aprender haciendo." },
  },
  {
    number: "03",
    level: "start-smart",
    category: "Manualidades & creatividad",
    title: "Academia del Macramé",
    slug: "academia-del-macrame",
    description: "Nudos, proyectos y práctica guiada para transformar inspiración en resultado.",
    longDescription: "De la inspiración al resultado: nudos, proyectos y práctica guiada en un solo lugar. Un espacio para aprender haciendo y convertir una idea manual en una skill concreta.",
    officialUrl: "https://go.hotmart.com/B104803495T?ap=8974",
    status: "Curso disponible",
    image: "/courses/macrame.webp",
    catalog: { title: "Academia del Macramé", category: "Manualidades · Creatividad", description: "Nudos, proyectos y práctica guiada para transformar inspiración en resultados." },
    featured: true,
  },
  {
    number: "04",
    level: "start-smart",
    category: "Hobbies",
    title: "Curso Coctelería de Autor Online",
    slug: "curso-cocteleria-de-autor-online",
    description: "Técnica, creatividad y una mirada más profesional del bar.",
    longDescription: "Aprendé a crear cócteles con una base más sólida, entendiendo sabores, combinaciones y recursos para desarrollar tu propio estilo.",
    officialUrl: "https://go.hotmart.com/U105038331X?dp=1",
    status: "Ver disponibilidad",
    image: "/courses/cocteleria.webp",
    catalog: { title: "Curso Coctelería de Autor Online", category: "Hobbies", description: "Aprendé sabores, combinaciones y recursos para desarrollar tu propio estilo." },
  },
  {
    number: "05",
    level: "war-mode",
    category: "Automotor",
    title: "Car Detailing Pro",
    slug: "car-detailing",
    description: "Interiores, pulido y ópticas. Paso a paso, sin tecnicismos raros.",
    longDescription: "Aprendé a restaurar interiores, pulir pintura, recuperar ópticas y usar productos y máquinas de detailing con criterio. Una ruta práctica para mejorar autos, subir su valor o empezar un servicio con base real.",
    officialUrl: "https://go.hotmart.com/R104881712P?ap=7e05",
    status: "Curso disponible",
    image: "/courses/car-detailing.webp",
    catalog: { title: "Car Detailing", category: "Automotor", description: "Interiores, pulido, ópticas y más: paso a paso y sin tecnicismos innecesarios." },
    featured: true,
  },
  {
    number: "06",
    level: "war-mode",
    category: "Automotor",
    title: "Mecánica de Motos VIP",
    slug: "mecanica-de-motos-vip",
    description: "Mantenimiento, diagnóstico y motor para entender una moto de verdad.",
    longDescription: "Una formación pensada para pasar de tener una idea general a entender cómo funciona una moto y cómo trabajarla con más seguridad: mantenimiento básico, diagnóstico y motor.",
    officialUrl: "https://go.hotmart.com/O104962434L",
    status: "Ver disponibilidad",
    image: "/courses/mecanica.webp",
    catalog: { title: "Mecánica de Motos VIP", category: "Automotor", description: "Del mantenimiento básico al diagnóstico y motor: entendé tu moto de verdad." },
    featured: true,
  },
  {
    number: "07",
    level: "start-smart",
    category: "Música & voz",
    title: "Aprenda a Cantar con Adrián Lozano",
    slug: "aprenda-a-cantar-con-adrian-lozano",
    description: "Técnica vocal para empezar a entrenar la voz con más orden y menos caos.",
    longDescription: "Una introducción práctica para entender qué ajustar, cómo entrenar y cómo empezar a trabajar la voz con más orden. La información pública del curso queda conectada al catálogo oficial mientras completamos la ficha original.",
    officialUrl: "https://go.hotmart.com/H104958164K?ap=3273",
    status: "Ver disponibilidad",
    image: "/courses/canto.webp",
    catalog: { title: "Aprenda a Cantar con Adrián Lozano", category: "Música", description: "Entrená tu voz con una ruta práctica para ganar técnica, control y confianza al cantar." },
    featured: true,
  },
  {
    number: "08",
    level: "start-smart",
    category: "Negocios / estética",
    title: "Master en miradas: Todo sobre cejas y pestañas",
    slug: "master-en-miradas-todo-sobre-cejas-y-pestanas",
    description: "De la técnica de belleza a una habilidad con potencial de ingresos.",
    longDescription: "Una ruta ordenada para aprender técnicas de cejas y pestañas desde cero, practicar con criterio y empezar a construir un servicio propio.",
    officialUrl: "https://go.hotmart.com/W104803503H",
    status: "Curso disponible",
    image: "/courses/miradas.webp",
    catalog: { title: "Master en miradas", category: "Negocios · Estética", description: "Cejas y pestañas: de la técnica a una práctica profesional que puedas cobrar." },
  },
  {
    number: "09",
    level: "start-smart",
    category: "Oficios / skills",
    title: "Tu Negocio de Jabones Artesanales",
    slug: "tu-negocio-de-jabones-artesanales",
    description: "Una ruta clara para crear, presentar y vender jabones con más criterio.",
    longDescription: "Aprendé a crear, presentar y vender jabones artesanales con una guía más ordenada y aterrizada. La información pública del curso queda conectada al catálogo oficial mientras completamos la ficha original.",
    officialUrl: "https://go.hotmart.com/F104947873X",
    status: "Ver disponibilidad",
    image: "/courses/jabones.webp",
    catalog: { title: "Tu Negocio de Jabones Artesanales", category: "Manualidades · Creatividad", description: "Aprendé a crear jabones artesanales y convertí el proceso en una propuesta propia." },
    featured: true,
  },
];

export const MODE_ONE = COURSES.filter((course) => course.level === "start-smart");
export const MODE_TWO = COURSES.filter((course) => course.level === "war-mode");

export function getCourseBySlug(slug: string) {
  return COURSES.find((course) => course.slug === slug);
}
