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
  checkoutUrl?: string;
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
  {
    number: "10",
    level: "war-mode",
    category: "Automotor / especialización",
    title: "Curso Profesional de Wrapping Vehicular",
    slug: "curso-profesional-de-wrapping-vehicular",
    description: "Preparación, materiales e instalación para aprender wrapping con un proceso profesional.",
    longDescription: "No necesitás veinte tutoriales más. Necesitás entender el proceso completo: cómo preparar la superficie, elegir y manipular materiales, instalar con criterio y resolver terminaciones de manera profesional.",
    officialUrl: "https://go.hotmart.com/N104872993F",
    checkoutUrl: "https://go.hotmart.com/N104872993F?ap=bfbe",
    status: "Curso disponible",
    image: "/courses/wrapping-vehicular.webp",
    catalog: { title: "Curso Profesional de Wrapping Vehicular", category: "Automotor · Especialización", description: "Del material a la terminación: aprendé el proceso completo del wrapping vehicular." },
  },
  {
    number: "11",
    level: "war-mode",
    category: "Automotor / negocios",
    title: "Administración de Taller",
    slug: "administracion-de-taller",
    description: "Clientes, costos, proveedores y procesos para administrar el negocio detrás del taller.",
    longDescription: "Saber reparar vehículos no significa automáticamente saber administrar un taller. Esta formación pone el foco en la operación del negocio: finanzas, presupuestos, clientes, proveedores, equipo y herramientas de gestión.",
    officialUrl: "https://go.hotmart.com/E106993767F",
    status: "Curso disponible",
    image: "/courses/administracion-taller.webp",
    catalog: { title: "Administración de Taller", category: "Automotor · Negocios", description: "Ordená la gestión del taller con más control sobre clientes, costos, equipo y procesos." },
  },
  {
    number: "12",
    level: "war-mode",
    category: "Automotor / especialización",
    title: "Sistemas de Seguridad Total",
    slug: "sistemas-de-seguridad-total",
    description: "Formación técnica para profundizar en sistemas de seguridad automotriz.",
    longDescription: "Una especialización de siete módulos para estudiar sistemas de seguridad automotriz con una ruta técnica estructurada. Pensada para quienes quieren sumar criterio profesional y ampliar sus capacidades dentro del sector automotor.",
    officialUrl: "https://go.hotmart.com/D106993769O",
    checkoutUrl: "https://go.hotmart.com/D106993769O?ap=2bad",
    status: "Curso disponible",
    image: "/courses/seguridad-automotriz.webp",
    catalog: { title: "Sistemas de Seguridad Total", category: "Automotor · Especialización", description: "Una ruta técnica de siete módulos sobre seguridad automotriz." },
  },
  {
    number: "13",
    level: "war-mode",
    category: "Oficios / skills",
    title: "Plomería Profesional",
    slug: "plomeria-profesional",
    description: "Fundamentos, instalación y reparación en una formación práctica de 59 clases.",
    longDescription: "Una ruta práctica para avanzar desde los fundamentos de plomería hasta instalaciones, reparaciones y procedimientos más profesionales. Incluye 59 clases, cerca de 17 horas de contenido original y certificación.",
    officialUrl: "https://go.hotmart.com/U107095157L?ap=e91c",
    status: "Curso disponible",
    image: "/courses/plomeria-profesional.webp",
    catalog: { title: "Plomería Profesional", category: "Oficios · Skills", description: "Aprendé plomería desde las bases hasta procedimientos de aplicación profesional." },
  },
  {
    number: "14",
    level: "start-smart",
    category: "Manualidades & creatividad",
    title: "Resina Epóxica",
    slug: "resina-epoxica",
    description: "Una entrada práctica para crear productos, superficies y proyectos con resina.",
    longDescription: "Aprendé a trabajar con resina epóxica desde cero y empezá a aplicarla en objetos, superficies y proyectos propios. Una skill visual y práctica para entender materiales, preparación, mezcla y terminaciones.",
    officialUrl: "https://go.hotmart.com/O105088058Y?ap=8534",
    status: "Curso disponible",
    image: "/courses/resina-epoxica.webp",
    catalog: { title: "Resina Epóxica", category: "Manualidades · Creatividad", description: "Empezá desde cero y convertí la resina en proyectos concretos." },
  },
  {
    number: "15",
    level: "war-mode",
    category: "Estética / servicios",
    title: "Depilación Profesional con Cera",
    slug: "depilacion-profesional-con-cera",
    description: "Método, higiene y técnica para trabajar distintas zonas y tipos de piel.",
    longDescription: "No alcanza con calentar cera y aplicarla. La diferencia profesional está en saber qué usar, cómo aplicarlo, sobre qué piel y con qué protocolo. La formación reúne dos sistemas de depilación, práctica sobre modelos reales y criterios de higiene y seguridad.",
    officialUrl: "https://go.hotmart.com/J104803489M",
    status: "Curso disponible",
    image: "/courses/depilacion-cera.webp",
    catalog: { title: "Depilación Profesional con Cera", category: "Estética · Servicios", description: "Aprendé depilación con método, higiene y aplicación profesional." },
  },
];

export const MODE_ONE = COURSES.filter((course) => course.level === "start-smart");
export const MODE_TWO = COURSES.filter((course) => course.level === "war-mode");

export function getCourseBySlug(slug: string) {
  return COURSES.find((course) => course.slug === slug);
}
