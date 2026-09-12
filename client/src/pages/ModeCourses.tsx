import { ArrowLeft, ArrowUpRight } from "lucide-react";
import InstagramLink from "@/components/InstagramLink";
import { MODE_ONE, MODE_TWO, type Course } from "@/lib/courses";
import { courseEnglish } from "@/data/english";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const imageBySlug: Record<string, string> = {
  "car-detailing": "/courses/car-detailing.webp",
  "academia-del-macrame": "/courses/macrame.webp",
  "tu-negocio-de-jabones-artesanales": "/courses/jabones.webp",
  "aprenda-a-cantar-con-adrian-lozano": "/courses/canto.webp",
  "mecanica-de-motos-vip": "/courses/mecanica.webp",
  "curso-cocteleria-de-autor-online": "/courses/cocteleria.webp",
  "el-rentable-negocio-de-la-sublimacion": "/courses/sublimacion.webp",
};

function ModeRow({ course, index, language }: { course: Course; index: number; language: Language }) {
  const localized = language === "en" ? courseEnglish[course.slug] : course;
  return (
    <article className="mode-course-row">
      <span className="mode-course-number">{String(index + 1).padStart(2, "0")}</span>
      <img src={imageBySlug[course.slug]} alt={language === "en" ? `Cover of ${localized.title}` : `Portada de ${localized.title}`} loading={index < 2 ? "eager" : "lazy"} />
      <div>
        <span className="mode-course-category">{localized.category}</span>
        <h2>{localized.title}</h2>
        <p>{localized.longDescription}</p>
        <a href={`/${course.slug}`}>{language === "en" ? "View course" : "Ver curso"} <ArrowUpRight size={17} /></a>
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
  const { language } = useLanguage();
  const start = mode === "start";
  return (
    <main className={`mode-courses-page mode-courses-page--${mode}`}>
      <header className="mode-courses-header">
        <a href="/" className="mode-courses-brand" aria-label={language === "en" ? "Back to home" : "Volver al inicio"}><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /><span>/ {start ? "Start Smart" : "Ninja Mode"}</span></a>
        <a href="/pilot-3d"><ArrowLeft size={16} /> Skills?</a>
      </header>
      <section className="mode-courses-hero">
        <div>
          <p>{start ? (language === "en" ? "03 / Mode 1" : "03 / Modo 1") : (language === "en" ? "04 / Expert mode" : "04 / Modo experto")}</p>
          <h1>{start ? (language === "en" ? <>Start<br /><em>Smart.</em></> : <>Empezá<br /><em>Pro.</em></>) : <><strong className="ninja-word">Ninja</strong><br /><em>Mode.</em></>}</h1>
          <span>{start ? "Start Smart" : (language === "en" ? "Level up" : "Subí de nivel")}</span>
        </div>
        <img src={start ? "/art/start-smart-computer-student.webp" : "/art/ninja-mode.webp"} alt={start ? "Personaje Start Smart" : "Personaje Ninja Mode"} />
      </section>
      <section className="mode-courses-intro"><p>{start ? (language === "en" ? "Five routes to begin a new skill with clarity and put it into practice." : "Cinco rutas para empezar una nueva skill con claridad y llevarla a la práctica.") : (language === "en" ? "Two routes to go deeper, practise and master a skill with better judgment." : "Dos rutas para profundizar, practicar y dominar una skill con más criterio.")}</p><span>{String(courses.length).padStart(2, "0")} {language === "en" ? "selected courses" : "cursos seleccionados"}</span></section>
      <section className="mode-courses-list">{courses.map((course, index) => <ModeRow course={course} index={index} language={language} key={course.slug} />)}</section>
      <footer className="mode-courses-footer"><span>Study Like a Pro · {start ? "Start Smart" : "Ninja Mode"}</span><InstagramLink /><a href="/pilot-3d">{language === "en" ? "Back to inventory" : "Volver al inventario"}</a></footer>
    </main>
  );
}
