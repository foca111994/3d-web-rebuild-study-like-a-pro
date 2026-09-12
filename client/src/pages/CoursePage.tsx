import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link, useRoute } from "wouter";
import InstagramLink from "@/components/InstagramLink";
import { courseDetails } from "@/data/courseDetails";
import { getCourseBySlug } from "@/lib/courses";
import NotFound from "@/pages/NotFound";
import { courseDetailEnglish, courseEnglish } from "@/data/english";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CoursePage() {
  const { language } = useLanguage();
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const course = params?.slug ? getCourseBySlug(params.slug) : undefined;
  const detail = course ? courseDetails[course.slug] : undefined;
  if (!course || !detail) return <NotFound />;
  const localizedCourse = language === "en" ? courseEnglish[course.slug] : course;
  const localizedDetail = language === "en" ? courseDetailEnglish[course.slug] : detail;

  return (
    <main className={`course-page course-page--${course.mode === "Modo 2" ? "ninja" : "start"}`}>
      <header className="course-page-nav">
        <Link href={course.mode === "Modo 1" ? "/start-smart" : course.mode === "Modo 2" ? "/ninja-mode" : "/courses"} className="course-back"><ArrowLeft size={15} /> {language === "en" ? (course.mode === "Catálogo" ? "Back to courses" : "Back to mode") : (course.mode === "Catálogo" ? "Volver a cursos" : "Volver al modo")}</Link>
        <Link href="/courses" className="course-catalog-link">{language === "en" ? "All courses" : "Todos los cursos"} <ExternalLink size={13} /></Link>
      </header>
      <section className="course-hero">
        <img className="course-hero-image" src={detail.image} alt={language === "en" ? `Cover of ${localizedCourse.title}` : `Portada de ${localizedCourse.title}`} />
        <div className="course-hero-shade" />
        <div className="course-hero-copy"><p className="mono-label">{language === "en" ? course.mode.replace("Modo", "Mode").replace("Catálogo", "Catalogue") : course.mode} / {course.modeLabel}</p><p className="course-detail-category">{localizedCourse.category}</p><h1>{localizedCourse.title}</h1><p>{localizedDetail.eyebrow}</p><a href={course.officialUrl} target="_blank" rel="noreferrer" className="detail-cta">{language === "en" ? "More about this skill" : "Más de este skill"} <ArrowUpRight size={17} /></a></div>
        <span className="course-hero-number">{course.number}</span>
      </section>
      <section className="course-story"><div><p className="mono-label">/ {language === "en" ? "The idea" : "La propuesta"}</p><h2>{language === "en" ? <>A clear<br /><em>route.</em></> : <>Una ruta<br /><em>concreta.</em></>}</h2></div><div><p className="course-story-lede">{localizedCourse.longDescription}</p><p>{localizedCourse.description}</p></div></section>
      <section className="course-audience"><div className="course-section-heading"><span>01</span><p>{language === "en" ? "This course is for you if…" : "Este curso es para vos si…"}</p></div><div className="course-points">{localizedDetail.audience.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div></section>
      {detail.videos && <section className="course-videos"><div className="course-section-heading"><span>02</span><p>{language === "en" ? "Discover the course" : "Conocé el curso"}</p></div><div className={`course-video-grid${detail.videos.length === 1 ? " is-single" : ""}`}>{detail.videos.map((video, index) => <div className="course-video-frame" key={video}><iframe src={video} title={`${localizedCourse.title}: video ${index + 1}`} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>)}</div></section>}
      <section className="course-includes"><div className="course-section-heading"><span>{detail.videos ? "03" : "02"}</span><p>{language === "en" ? "What is included" : "Qué incluye"}</p></div><div className="course-includes-list">{localizedDetail.includes.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div><a className="course-inline-cta course-inline-cta--light" href={course.officialUrl} target="_blank" rel="noreferrer">{language === "en" ? "View skill" : "Ver skill"} <ArrowUpRight size={17} /></a></section>
      {detail.pdf && <section className="course-program"><div><p className="mono-label">03 / {language === "en" ? "Program" : "Programa"}</p><h2>{language === "en" ? <>Explore the<br /><em>syllabus.</em></> : <>Explorá el<br /><em>temario.</em></>}</h2><p>{language === "en" ? "Review the published document to understand the route before deciding." : "Revisá el documento publicado para conocer el recorrido antes de decidir."}</p></div><iframe src={detail.pdf} title={language === "en" ? `Program for ${localizedCourse.title}` : `Programa de ${localizedCourse.title}`} loading="lazy" allow="autoplay" /></section>}
      <section className="course-final-cta"><span>{language === "en" ? "Final / Next step" : "Final / Próximo paso"}</span><h2>{language === "en" ? <>Is this the skill<br />you want to learn?</> : <>¿Es la skill<br />que querés aprender?</>}</h2><a href={course.officialUrl} target="_blank" rel="noreferrer">{language === "en" ? "Check availability" : "Ver disponibilidad"} <ArrowUpRight size={20} /></a></section>
      <footer className="course-detail-footer"><Link href="/" className="footer-logo-link" aria-label={language === "en" ? "Back to home" : "Volver al inicio"}><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /></Link><InstagramLink compact /><span>© 2026 Study Like a Pro / {language === "en" ? "No noise" : "Sin humo"}</span></footer>
    </main>
  );
}
