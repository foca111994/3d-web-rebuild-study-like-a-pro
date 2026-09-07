import { ArrowLeft, ArrowUpRight } from "lucide-react";
import InstagramLink from "@/components/InstagramLink";
import { MODE_ONE, MODE_TWO, type Course } from "@/lib/courses";

const imageBySlug: Record<string, string> = {
  "car-detailing": "/courses/car-detailing.webp",
  "academia-del-macrame": "/courses/macrame.webp",
  "tu-negocio-de-jabones-artesanales": "/courses/jabones.webp",
  "aprenda-a-cantar-con-adrian-lozano": "/courses/canto.webp",
  "mecanica-de-motos-vip": "/courses/mecanica.webp",
  "curso-cocteleria-de-autor-online": "/courses/cocteleria.webp",
  "el-rentable-negocio-de-la-sublimacion": "/courses/sublimacion.webp",
};

function ModeRow({ course, index }: { course: Course; index: number }) {
  return (
    <article className="mode-course-row">
      <span className="mode-course-number">{String(index + 1).padStart(2, "0")}</span>
      <img src={imageBySlug[course.slug]} alt={`Portada de ${course.title}`} loading={index < 2 ? "eager" : "lazy"} />
      <div>
        <span className="mode-course-category">{course.category}</span>
        <h2>{course.title}</h2>
        <p>{course.longDescription}</p>
        <a href={`/${course.slug}`}>Ver curso <ArrowUpRight size={17} /></a>
      </div>
    </article>
  );
}

export function StartSmartCourses() {
  return <ModeCoursesPage mode="start" courses={MODE_ONE} />;
}

export function NinjaCourses() {
  return <ModeCoursesPage mode="ninja" courses={MODE_TWO} />;
}

function ModeCoursesPage({ mode, courses }: { mode: "start" | "ninja"; courses: Course[] }) {
  const start = mode === "start";
  return (
    <main className={`mode-courses-page mode-courses-page--${mode}`}>
      <header className="mode-courses-header">
        <a href="/pilot-3d" className="mode-courses-brand"><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /><span>/ {start ? "Start Smart" : "Ninja Mode"}</span></a>
        <a href="/pilot-3d"><ArrowLeft size={16} /> Skills?</a>
      </header>
      <section className="mode-courses-hero">
        <div>
          <p>{start ? "03 / Modo 1" : "04 / Modo experto"}</p>
          <h1>{start ? <>Empezá<br /><em>Pro.</em></> : <>Ninja<br /><em>Mode.</em></>}</h1>
          <span>{start ? "Start Smart" : "Subí de nivel"}</span>
        </div>
        <img src={start ? "/art/start-smart-computer-student.webp" : "/art/ninja-mode.webp"} alt={start ? "Personaje Start Smart" : "Personaje Ninja Mode"} />
      </section>
      <section className="mode-courses-intro"><p>{start ? "Cinco rutas para empezar una nueva skill con claridad y llevarla a la práctica." : "Tres rutas para profundizar, practicar y dominar una skill con más criterio."}</p><span>{String(courses.length).padStart(2, "0")} cursos seleccionados</span></section>
      <section className="mode-courses-list">{courses.map((course, index) => <ModeRow course={course} index={index} key={course.slug} />)}</section>
      <footer className="mode-courses-footer"><span>Study Like a Pro · {start ? "Start Smart" : "Ninja Mode"}</span><InstagramLink /><a href="/pilot-3d">Volver al inventario</a></footer>
    </main>
  );
}
