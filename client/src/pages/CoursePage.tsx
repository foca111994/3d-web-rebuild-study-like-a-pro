/*
 * Style direction: Cine editorial de taller — cada curso se presenta como una ficha
 * de campo: portada visual, metadata precisa, promesa clara y una acción directa.
 */
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Link, useRoute } from "wouter";
import { getCourseBySlug } from "@/lib/courses";
import NotFound from "@/pages/NotFound";

const HERO_POSTER = "/manus-storage/hero-study-room-poster_67da5b48.png";
const LOGO_SKY = "/manus-storage/logo-sky_37c3df06.png";

export default function CoursePage() {
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const course = params?.slug ? getCourseBySlug(params.slug) : undefined;

  if (!course) return <NotFound />;

  return (
    <main className="course-page">
      <header className="course-page-nav">
        <Link href="/" className="course-back"><ArrowLeft size={15} /> Volver a Study Like a Pro</Link>
        <a href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer" className="course-catalog-link">Catálogo original <ExternalLink size={13} /></a>
      </header>
      <section className="course-hero">
        <div className="course-hero-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, .78), rgba(0, 0, 0, .2)), url(${HERO_POSTER})` }} />
        <div className="course-hero-copy">
          <p className="mono-label">{course.mode} / {course.modeLabel}</p>
          <p className="course-detail-category">{course.category}</p>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <a href={course.officialUrl} target="_blank" rel="noreferrer" className="detail-cta">Abrir curso oficial <ArrowUpRight size={17} /></a>
        </div>
        <span className="course-hero-number">{course.number}</span>
      </section>
      <section className="course-detail-body">
        <div className="course-detail-intro">
          <p className="mono-label">/ UNA RUTA CONCRETA</p>
          <h2>Aprendé con<br /><em>más criterio.</em></h2>
        </div>
        <div className="course-detail-copy">
          <p>{course.longDescription}</p>
          <div className="course-detail-note">
            <span className="note-number">{course.number}</span>
            <span>La disponibilidad, el programa completo y la inscripción se consultan en la página oficial del curso.</span>
          </div>
          <a href={course.officialUrl} target="_blank" rel="noreferrer" className="detail-text-link">Ver disponibilidad y programa <ArrowUpRight size={16} /></a>
        </div>
      </section>
      <footer className="course-detail-footer">
        <Link href="/" className="footer-logo-link"><img src={LOGO_SKY} alt="Study Like a Pro" /></Link>
        <span>© 2026 Study Like a Pro / Sin humo</span>
      </footer>
    </main>
  );
}
