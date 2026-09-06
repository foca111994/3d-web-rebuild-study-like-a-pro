import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link, useRoute } from "wouter";
import InstagramLink from "@/components/InstagramLink";
import { courseDetails } from "@/data/courseDetails";
import { getCourseBySlug } from "@/lib/courses";
import NotFound from "@/pages/NotFound";

export default function CoursePage() {
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const course = params?.slug ? getCourseBySlug(params.slug) : undefined;
  const detail = course ? courseDetails[course.slug] : undefined;
  if (!course || !detail) return <NotFound />;
  const hasCheckout = course.officialUrl.startsWith("https://go.hotmart.com/");
  const checkoutLabel = hasCheckout ? "Ver curso en Hotmart" : "Ver disponibilidad";

  return (
    <main className={`course-page course-page--${course.mode === "Modo 2" ? "ninja" : "start"}`}>
      <header className="course-page-nav">
        <Link href={course.mode === "Modo 1" ? "/start-smart" : course.mode === "Modo 2" ? "/ninja-mode" : "/courses"} className="course-back"><ArrowLeft size={15} /> {course.mode === "Catálogo" ? "Volver a cursos" : "Volver al modo"}</Link>
        <Link href="/courses" className="course-catalog-link">Todos los cursos <ExternalLink size={13} /></Link>
      </header>
      <section className="course-hero">
        <img className="course-hero-image" src={detail.image} alt={`Portada de ${course.title}`} />
        <div className="course-hero-shade" />
        <div className="course-hero-copy"><p className="mono-label">{course.mode} / {course.modeLabel}</p><p className="course-detail-category">{course.category}</p><h1>{course.title}</h1><p>{detail.eyebrow}</p><a href={course.officialUrl} target="_blank" rel="noreferrer" className="detail-cta">Ir al curso <ArrowUpRight size={17} /></a></div>
        <span className="course-hero-number">{course.number}</span>
      </section>
      <section className="course-story"><div><p className="mono-label">/ La propuesta</p><h2>Una ruta<br /><em>concreta.</em></h2></div><div><p className="course-story-lede">{course.longDescription}</p><p>{course.description}</p><a className="course-inline-cta" href={course.officialUrl} target="_blank" rel="noreferrer">{checkoutLabel} <ArrowUpRight size={17} /></a></div></section>
      <section className="course-audience"><div className="course-section-heading"><span>01</span><p>Este curso es para vos si…</p></div><div className="course-points">{detail.audience.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div></section>
      {detail.videos && <section className="course-videos"><div className="course-section-heading"><span>02</span><p>Conocé el curso</p></div><div className={`course-video-grid${detail.videos.length === 1 ? " is-single" : ""}`}>{detail.videos.map((video, index) => <div className="course-video-frame" key={video}><iframe src={video} title={`${course.title}: video ${index + 1}`} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>)}</div></section>}
      <section className="course-includes"><div className="course-section-heading"><span>{detail.videos ? "03" : "02"}</span><p>Qué incluye</p></div><div className="course-includes-list">{detail.includes.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div><a className="course-inline-cta course-inline-cta--light" href={course.officialUrl} target="_blank" rel="noreferrer">{checkoutLabel} <ArrowUpRight size={17} /></a></section>
      {detail.pdf && <section className="course-program"><div><p className="mono-label">03 / Programa</p><h2>Explorá el<br /><em>temario.</em></h2><p>Revisá el documento publicado para conocer el recorrido antes de decidir.</p></div><iframe src={detail.pdf} title={`Programa de ${course.title}`} loading="lazy" allow="autoplay" /></section>}
      <section className="course-final-cta"><span>Final / Próximo paso</span><h2>¿Es la skill<br />que querés aprender?</h2><a href={course.officialUrl} target="_blank" rel="noreferrer">Ver disponibilidad <ArrowUpRight size={20} /></a></section>
      <footer className="course-detail-footer"><Link href="/pilot-3d" className="footer-logo-link"><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /></Link><InstagramLink compact /><span>© 2026 Study Like a Pro / Sin humo</span></footer>
    </main>
  );
}
