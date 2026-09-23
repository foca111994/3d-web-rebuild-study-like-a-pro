export type CourseDetail = {
  image: string;
  eyebrow: string;
  audience: string[];
  includes: string[];
  pdf?: string;
  videos?: string[];
};

export const courseDetails: Record<string, CourseDetail> = {
  "car-detailing": {
    image: "/courses/car-detailing.webp",
    eyebrow: "Aprendé todos los procesos del detallado",
    audience: [
      "Querés empezar un negocio real de detailing desde cero.",
      "Ya estás en el rubro y querés mejorar resultados y cobrar mejor.",
      "Te frustra no saber qué producto usar, en qué orden y con qué técnica.",
      "Querés aprender con un método claro, explicado paso a paso.",
    ],
    includes: [
      "Clases paso a paso con procesos completos de detallado.",
      "Acceso al contenido para avanzar a tu ritmo.",
      "Material y recursos de apoyo.",
      "Comunidad privada para soporte y dudas.",
      "Recursos extra y curso de Polarizado Automotriz.",
    ],
    pdf: "https://drive.google.com/file/d/1dzzGooGFxbOZ-Y2hUJqPGTDoe_OGzNp5/preview",
  },
  "academia-del-macrame": {
    image: "/courses/macrame.webp",
    eyebrow: "Un sistema paso a paso para crear piezas con criterio",
    audience: [
      "Te motiva crear, decorar o vender tus piezas.",
      "Querés dejar de improvisar y seguir un método claro.",
      "Los tutoriales sueltos no te dan el orden que necesitás.",
      "Buscás una formación práctica y simple de seguir.",
    ],
    includes: [
      "Más de 40 proyectos, desde nudos básicos hasta piezas completas.",
      "Acceso de por vida al contenido.",
      "Certificado al terminar, según disponibilidad.",
      "Grupo de apoyo y comunidad creativa.",
      "Recursos para seguir creando con confianza.",
    ],
    pdf: "https://drive.google.com/file/d/1a1lDqR3IvsQ7uTtd6_JCLickHoNtYdBw/preview",
  },
  "tu-negocio-de-jabones-artesanales": {
    image: "/courses/jabones.webp",
    eyebrow: "De la idea al producto y del producto al negocio",
    audience: [
      "Querés empezar con jabones artesanales y necesitás una ruta clara.",
      "Te interesa elegir ingredientes y fabricar tus productos.",
      "Buscás aprender a presentar, empaquetar y vender.",
      "Querés mirar el proyecto con más cabeza de negocio.",
    ],
    includes: [
      "Manual de ingredientes.",
      "Hoja de formulación.",
      "Plantilla de costos.",
      "Guía para crear moldes de silicona.",
      "Actualizaciones y acceso permanente.",
    ],
    pdf: "https://drive.google.com/file/d/1-twmD3MO2BC5Oat9VnYwfaBGnlc8Nf0P/preview",
  },
  "aprenda-a-cantar-con-adrian-lozano": {
    image: "/courses/canto.webp",
    eyebrow: "Mejorá tu voz y cantá con más seguridad",
    audience: [
      "Te gusta cantar, pero sentís que te falta técnica.",
      "Querés practicar con una guía más ordenada.",
      "Buscás entender mejor tu voz y sus dificultades comunes.",
      "Estás empezando o querés avanzar con más criterio.",
    ],
    includes: [
      "Fundamentos del canto explicados con claridad.",
      "Introducción a la vocalización.",
      "Ejercicios prácticos y progresivos.",
      "Corrección de dificultades comunes.",
      "Recomendaciones de práctica y bonos del programa.",
    ],
    videos: [
      "https://player.vimeo.com/video/534238478",
      "https://player.vimeo.com/video/454519672",
      "https://player.vimeo.com/video/452313121",
    ],
  },
  "mecanica-de-motos-vip": {
    image: "/courses/mecanica.webp",
    eyebrow: "De mantenimiento básico a diagnóstico y motor",
    audience: [
      "Te gustan las motos y querés depender menos de otros.",
      "Querés dejar de adivinar fallas.",
      "Buscás algo más completo que tips sueltos.",
      "Querés avanzar con una ruta técnica seria y práctica.",
    ],
    includes: [
      "Funcionamiento, partes y mantenimiento general.",
      "Frenos, arrastre, llantas, suspensión y dirección.",
      "Carburación, motor, caja, inyección y sistema eléctrico.",
      "Diagnóstico, desarme, armado y revisión de fallas.",
      "Módulo emprendedor, soporte y certificado VIP.",
    ],
    videos: [
      "https://videomng.builderall.com/embed/Tj9BTfEhCf/?controls=1&allowpause=1",
      "https://fast.wistia.net/embed/iframe/tov9w71jr8?videoFoam=true",
    ],
  },
  "curso-cocteleria-de-autor-online": {
    image: "/courses/cocteleria.webp",
    eyebrow: "Construí una experiencia dentro de un vaso",
    audience: [
      "Querés entender qué hace que un cóctel funcione.",
      "Te interesan la técnica y la lógica de cada preparación.",
      "Buscás una skill creativa con potencial profesional.",
      "Querés crear con criterio, no solo hacer un trago lindo.",
    ],
    includes: [
      "Fundamentos y técnica de coctelería.",
      "Combinación de sabores e ingredientes.",
      "Construcción y presentación de tragos.",
      "Recursos para desarrollar un estilo propio.",
    ],
    videos: [
      "https://www.youtube.com/embed/wAa5WP4HlU4?rel=0&modestbranding=1&playsinline=1",
      "https://www.youtube.com/embed/puOrWvvzJjg?rel=0&modestbranding=1&playsinline=1",
    ],
  },
  "el-rentable-negocio-de-la-sublimacion": {
    image: "/courses/sublimacion.webp",
    eyebrow: "Sublimación con cabeza de negocio",
    audience: [
      "Querés aprender desde cero sin perderte entre videos.",
      "Necesitás elegir equipos e insumos antes de gastar.",
      "Buscás mejorar técnica y presentación.",
      "Querés convertir una skill en una fuente de ingresos.",
    ],
    includes: [
      "Técnica de sublimación paso a paso.",
      "Equipos, tintas, papeles e insumos.",
      "Diseño y producción de productos personalizados.",
      "Criterios para cobrar y ordenar la operación.",
      "Marketing digital y enfoque comercial.",
    ],
    pdf: "https://drive.google.com/file/d/1Gx8J8EaDW70iBCAwBLgSGOEDLHleyJmb/preview",
    videos: [
      "https://www.youtube.com/embed/aDiLmMURZlI?rel=0&modestbranding=1&playsinline=1",
    ],
  },
  "carpinteria-y-muebles-de-melamina": {
    image: "/courses/carpinteria.webp",
    eyebrow: "Aprendé carpintería para construir de verdad",
    audience: [
      "Querés hacer cosas con tus manos y no sabés por dónde empezar.",
      "Necesitás bases para medir, cortar y armar.",
      "Los tutoriales muestran resultados, pero no el proceso.",
      "Buscás una skill útil para tu casa o para generar ingresos.",
    ],
    includes: [
      "Bases del oficio y uso de herramientas.",
      "Medición, corte y armado con criterio.",
      "Trabajo con madera y melamina.",
      "Proyectos guiados de principio a fin.",
      "Una ruta para dejar de improvisar.",
    ],
    pdf: "https://drive.google.com/file/d/1F-gOLJtkguLudXfrYflnsLWImt1EoTMu/preview",
  },
  "master-en-miradas-todo-sobre-cejas-y-pestanas": {
    image: "/courses/miradas.webp",
    eyebrow: "De la técnica de belleza a una habilidad monetizable",
    audience: [
      "Te gusta la belleza y querés empezar profesionalmente.",
      "Buscás construir algo propio.",
      "Querés generar ingresos desde casa con una habilidad real.",
      "Te frena no tener experiencia o un camino ordenado.",
    ],
    includes: [
      "Fundamentos y técnicas de cejas.",
      "Técnicas aplicadas a pestañas.",
      "Práctica orientada a resultados profesionales.",
      "Organización del servicio y atención.",
      "Bases para convertir la skill en negocio.",
    ],
    pdf: "https://drive.google.com/file/d/14fysgRq6M-OtR1Qv_2TUFNzgXCfUPRlg/preview",
    videos: [
      "https://www.youtube.com/embed/WiO8gUKKWnw?rel=0&modestbranding=1&playsinline=1",
      "https://www.youtube.com/embed/7XnZnq9QNN0?rel=0&modestbranding=1&playsinline=1",
    ],
  },
  "curso-profesional-de-wrapping-vehicular": {
    image: "/courses/wrapping-vehicular.webp",
    eyebrow: "Aprendé el proceso completo, no una colección de trucos",
    audience: [
      "Querés empezar wrapping con una base técnica seria.",
      "Ya trabajás con autos y querés incorporar un nuevo servicio.",
      "Probaste tutoriales sueltos, pero te falta un proceso ordenado.",
      "Buscás mejorar preparación, instalación y terminaciones.",
    ],
    includes: [
      "Preparación correcta de superficies y áreas de trabajo.",
      "Criterios para elegir y manipular materiales.",
      "Proceso de instalación explicado paso a paso.",
      "Técnicas para resolver curvas, bordes y terminaciones.",
      "Lógica profesional para incorporar wrapping como servicio.",
    ],
    videos: [
      "https://drive.google.com/file/d/1IW4nKEfjB8WWVj-z6-m2TkL0UM5cGyr3/preview",
    ],
  },
  "administracion-de-taller": {
    image: "/courses/administracion-taller.webp",
    eyebrow: "Administrá el negocio detrás del trabajo técnico",
    audience: [
      "Tenés un taller y necesitás ordenar la operación.",
      "Dominás la parte técnica, pero la gestión sigue siendo improvisada.",
      "Empezás a coordinar clientes, proveedores o personal.",
      "Querés tomar decisiones con mejor información financiera.",
    ],
    includes: [
      "Finanzas e ingresos del taller.",
      "Presupuestos y relación con clientes.",
      "Gestión de proveedores y recursos.",
      "Capital humano y organización del equipo.",
      "Herramientas para ordenar procesos administrativos.",
    ],
    videos: [
      "https://drive.google.com/file/d/1w4-CBQPWeD77E_OTNgmIHURIOFKy4gZW/preview",
    ],
  },
  "sistemas-de-seguridad-total": {
    image: "/courses/seguridad-automotriz.webp",
    eyebrow: "Especialización técnica en seguridad automotriz",
    audience: [
      "Trabajás en el sector automotor y querés ampliar tu especialización.",
      "Buscás una formación más profunda que un tutorial aislado.",
      "Querés entender sistemas de seguridad con una ruta estructurada.",
      "Necesitás sumar criterio técnico para aplicaciones profesionales.",
    ],
    includes: [
      "Siete módulos de formación técnica.",
      "Fundamentos de sistemas de seguridad automotriz.",
      "Procedimientos y criterios de aplicación profesional.",
      "Contenido organizado para avanzar por etapas.",
      "Material de apoyo del productor.",
    ],
  },
  "plomeria-profesional": {
    image: "/courses/plomeria-profesional.webp",
    eyebrow: "De los fundamentos a procedimientos profesionales",
    audience: [
      "Querés aprender un oficio práctico desde las bases.",
      "Necesitás una ruta más completa que tutoriales sueltos.",
      "Buscás mejorar instalaciones y reparaciones domésticas.",
      "Querés desarrollar una skill con aplicación profesional.",
    ],
    includes: [
      "59 clases organizadas paso a paso.",
      "Cerca de 17 horas de contenido original.",
      "Fundamentos, instalación y reparación.",
      "Aplicaciones y procedimientos más avanzados.",
      "Certificación y material de apoyo.",
    ],
    pdf: "https://drive.google.com/file/d/1Ng2KLuWr6prOs8PYFaZ1eybWTKQFHYUs/preview",
    videos: [
      "https://drive.google.com/file/d/1Aav5fipRtUV5qgW4bwVN7y3SuOIcZcB9/preview",
    ],
  },
  "resina-epoxica": {
    image: "/courses/resina-epoxica.webp",
    eyebrow: "Empezá con resina y llevá la idea a un objeto real",
    audience: [
      "Querés probar una skill creativa desde cero.",
      "Te interesan los proyectos de resina, pero no sabés cómo empezar.",
      "Buscás entender materiales, mezcla y preparación.",
      "Querés aplicar lo aprendido en objetos o superficies propias.",
    ],
    includes: [
      "Introducción a materiales y tipos de resina.",
      "Preparación, mezcla y seguridad básica.",
      "Aplicación en objetos, superficies y proyectos.",
      "Recursos para evitar errores frecuentes.",
      "Ideas para seguir practicando desde una base concreta.",
    ],
  },
  "depilacion-profesional-con-cera": {
    image: "/courses/depilacion-cera.webp",
    eyebrow: "Técnica, higiene y criterio para un servicio profesional",
    audience: [
      "Querés entrar al área de estética con una formación estructurada.",
      "Ya trabajás en belleza y querés ampliar tus servicios.",
      "Necesitás comprender piel, vello y tipos de cera.",
      "Buscás aplicar técnicas con más seguridad y protocolo.",
    ],
    includes: [
      "Aplicación y retiro correcto de la cera.",
      "Evaluación de piel, vello e higiene.",
      "Sistema español y sistema roll-on descartable.",
      "Procedimientos demostrados sobre modelos reales.",
      "Material en PDF, certificado y contenidos complementarios.",
    ],
    videos: [
      "https://drive.google.com/file/d/1pDRs56lCg3Ohz_gN1PbVzhJMdh0uL2r9/preview",
    ],
  },
  "accesorios-en-resina": {
    image: "/courses/accesorios-resina.webp",
    eyebrow: "Una técnica concreta para crear accesorios reales",
    audience: [
      "Querés empezar con resina sin una barrera técnica enorme.",
      "Te interesa una skill manual y visual para practicar desde cero.",
      "Buscás transformar ideas en accesorios y productos propios.",
      "Querés explorar un pequeño emprendimiento creativo con una ruta clara.",
    ],
    includes: [
      "Introducción a materiales, herramientas y preparación.",
      "Proceso guiado para crear accesorios con resina.",
      "Ejemplos de piezas y práctica paso a paso.",
      "Material de apoyo para acompañar el recorrido.",
      "Certificado y comunidad de apoyo según las condiciones del productor.",
    ],
    pdf: "https://drive.google.com/file/d/1YAwz_nW19hu5slYD3NjCeeflhUD-dAfN/preview",
    videos: [
      "https://drive.google.com/file/d/1Fv68xYt1w-9_cT4ILI_einTPDQVEY7Sv/preview",
    ],
  },
  "piezas-decorativas-en-cemento": {
    image: "/courses/piezas-cemento.webp",
    eyebrow: "Convertí una referencia visual en un objeto hecho por vos",
    audience: [
      "Querés empezar una práctica creativa con materiales accesibles.",
      "Guardás ideas de decoración, pero no sabés cómo ejecutarlas.",
      "Te interesa aprender moldes, mezclas y terminaciones.",
      "Buscás crear objetos para tu espacio o productos para vender.",
    ],
    includes: [
      "Bases para trabajar el cemento en proyectos decorativos.",
      "Materiales, preparación y proceso de mezcla.",
      "Uso de moldes y creación de piezas desde cero.",
      "Criterios para mejorar acabados y terminaciones.",
      "Recorrido del curso, material de apoyo y certificado.",
    ],
    pdf: "https://drive.google.com/file/d/1FVTTSzVgkkcQiQuG1NhEdLumq3gyMTM4/preview",
    videos: [
      "https://drive.google.com/file/d/1gJLvtK8lqtBZivUfeaaefLMq0KKr3cr6/preview",
    ],
  },
  "full-reposteria-desde-cero": {
    image: "/courses/full-reposteria.webp",
    eyebrow: "Dejá de coleccionar recetas y empezá a entender la técnica",
    audience: [
      "Querés aprender repostería desde una base ordenada.",
      "Cocinás en casa, pero tus resultados todavía son irregulares.",
      "Buscás comprender técnicas en lugar de seguir recetas a ciegas.",
      "Te interesa crear productos para disfrutar o empezar a vender.",
    ],
    includes: [
      "Introducción y bases para organizar el aprendizaje.",
      "Bizcochos, masas y preparaciones esenciales.",
      "Galletas, postres y productos de repostería.",
      "Aplicación práctica en distintas presentaciones.",
      "Orientación para pensar una propuesta de productos propia.",
    ],
    pdf: "https://drive.google.com/file/d/1O2Putcg008eYpRVQ5OI80lwrHdGmJSOX/preview",
  },
  "velas-artesanales-para-emprender": {
    image: "/courses/velas-artesanales.webp",
    eyebrow: "Controlá el proceso detrás de una vela bien terminada",
    audience: [
      "Querés empezar una skill artesanal desde cero.",
      "Te interesan las velas, pero necesitás entender materiales y proceso.",
      "Buscás una actividad creativa que produzca objetos concretos.",
      "Querés explorar una línea de productos hechos a mano.",
    ],
    includes: [
      "Fundamentos, materiales y preparación del espacio de trabajo.",
      "Control de temperatura, mezcla, aroma y acabado.",
      "Creación de distintos tipos de velas.",
      "Práctica guiada para evitar errores frecuentes.",
      "Material de apoyo, comunidad y certificado según el productor.",
    ],
    pdf: "https://drive.google.com/file/d/1acWZ4kTC6Xb7RCEARwUjLiwkO9zXl219/preview",
    videos: [
      "https://drive.google.com/file/d/1DaKLQA3qwAyNznmpbzWpAbxCv8254JUr/preview",
    ],
  },
  "aprende-costura-industrial": {
    image: "/courses/costura-industrial.webp",
    eyebrow: "De piezas aisladas a prendas construidas con método",
    audience: [
      "Querés empezar en costura con una progresión técnica completa.",
      "Ya cosés y necesitás ordenar patronaje, confección y acabados.",
      "Te interesa desarrollar prendas o proyectos de indumentaria propios.",
      "Buscás una skill práctica con aplicación profesional y comercial.",
    ],
    includes: [
      "Más de 90 lecciones organizadas por módulos.",
      "Bases de costura y manejo progresivo de la técnica.",
      "Patronaje, confección y construcción de prendas.",
      "Progresión desde fundamentos hacia aplicaciones más avanzadas.",
      "Criterios para desarrollar proyectos y una marca propia.",
    ],
    pdf: "https://drive.google.com/file/d/1rkh1PgELKB3mdBm9EGnib6PlE4H1fts4/preview",
    videos: [
      "https://drive.google.com/file/d/1iWEj2XpgJfVYDxHyj3liqvrPgPchhrfc/preview",
    ],
  },
};
