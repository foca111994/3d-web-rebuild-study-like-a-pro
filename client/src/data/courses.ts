export type Course = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
};

const base = "https://studylikeapro.art";

export const courses: Course[] = [
  { id: "sublimacion", title: "El Rentable Negocio de la Sublimación", category: "Negocios · Hobbies", description: "Entendé la sublimación desde la técnica y su potencial como línea de productos y servicios.", image: "/courses/sublimacion.webp", url: `${base}/el-rentable-negocio-de-la-sublimacion` },
  { id: "carpinteria", title: "Carpintería y Muebles de Melamina", category: "Oficios · Skills", description: "De los fundamentos al mueble terminado: una ruta clara para aprender haciendo.", image: "/courses/carpinteria.webp", url: `${base}/carpinteria-y-muebles-de-melamina` },
  { id: "macrame", title: "Academia del Macramé", category: "Manualidades · Creatividad", description: "Nudos, proyectos y práctica guiada para transformar inspiración en resultados.", image: "/courses/macrame.webp", url: `${base}/academia-del-macrame` },
  { id: "cocteleria", title: "Curso Coctelería de Autor Online", category: "Hobbies", description: "Aprendé sabores, combinaciones y recursos para desarrollar tu propio estilo.", image: "/courses/cocteleria.webp", url: `${base}/curso-cocteleria-de-autor-online` },
  { id: "car-detailing", title: "Car Detailing", category: "Automotor", description: "Interiores, pulido, ópticas y más: paso a paso y sin tecnicismos innecesarios.", image: "/courses/car-detailing.webp", url: `${base}/car-detailing` },
  { id: "mecanica", title: "Mecánica de Motos VIP", category: "Automotor", description: "Del mantenimiento básico al diagnóstico y motor: entendé tu moto de verdad.", image: "/courses/mecanica.webp", url: `${base}/mecanica-de-motos-vip` },
  { id: "canto", title: "Aprenda a Cantar con Adrián Lozano", category: "Música", description: "Entrená tu voz con una ruta práctica para ganar técnica, control y confianza al cantar.", image: "/courses/canto.webp", url: `${base}/aprenda-a-cantar-con-adrian-lozano` },
  { id: "miradas", title: "Master en miradas", category: "Negocios · Estética", description: "Cejas y pestañas: de la técnica a una práctica profesional que puedas cobrar.", image: "/courses/miradas.webp", url: `${base}/master-en-miradas-todo-sobre-cejas-y-pestanas` },
  { id: "jabones", title: "Tu Negocio de Jabones Artesanales", category: "Manualidades · Creatividad", description: "Aprendé a crear jabones artesanales y convertí el proceso en una propuesta propia.", image: "/courses/jabones.webp", url: `${base}/tu-negocio-de-jabones-artesanales-1` },
];
