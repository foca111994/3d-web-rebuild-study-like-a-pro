/*
 * Style direction: Editorial de Taller — fotografía táctil, composición de portada,
 * rojo ladrillo, marfil de papel y señales utilitarias de catálogo.
 */
import { ArrowUpRight, ExternalLink, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";
import { MODE_ONE } from "@/lib/courses";

const START_SMART_COURSES = MODE_ONE;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="site-shell">
      <div className="photo-layer" aria-hidden="true" />
      <div className="blueprint-layer" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />

      <header className="topbar">
        <a href="#top" className="mini-mark" aria-label="Study Like a Pro, volver al inicio">
          <span>SLP</span><b>/</b><span>01</span>
        </a>
        <button className="menu-button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>Índice</span>
        </button>
        {menuOpen && (
          <nav className="quick-menu" aria-label="Navegación rápida">
            <a href="#cursos" onClick={() => setMenuOpen(false)}>Cursos del Modo 1</a>
            <a href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer">Catálogo completo <ExternalLink size={13} /></a>
            <a href="https://studylikeapro.art/" target="_blank" rel="noreferrer">SLP - Skills? Get 'em. <ExternalLink size={13} /></a>
          </nav>
        )}
      </header>

      <div className="content-column" id="top">
        <section className="identity-block" aria-labelledby="page-title">
          <a className="logo-plaque" href="https://playlikeapro.art/" target="_blank" rel="noreferrer" aria-label="Visitar Play Like a Pro">
            <img src="/manus-storage/study-like-a-pro-sky_86076399.png" alt="Study Like a Pro" />
          </a>
          <div className="identity-meta">
            <p className="eyebrow">HOT LINKS / 2026</p>
            <p className="edition">Modo 1 — Start Smart<br />/ Empezá Pro</p>
          </div>
        </section>

        <section className="intro-block">
          <p className="section-kicker">Elegí una skill. Empezá hoy.</p>
          <h1 id="page-title">Cursos que<br /><em>hacen</em> avanzar.</h1>
          <p className="intro-copy">Una selección corta de cursos prácticos para aprender algo que puedas usar en el mundo real. Sin humo, directo al punto.</p>
          <div className="intro-rule"><span /> <small>disponibles ahora</small></div>
        </section>

        <section className="courses-section" id="cursos" aria-labelledby="courses-title">
          <div className="section-heading">
            <div className="section-heading-main">
              <img className="stamp-mark" src="/manus-storage/slp-red-stamp_a602131d.png" alt="" />
              <p className="eyebrow">01 / START SMART</p>
              <h2 id="courses-title">Empezá Pro</h2>
            </div>
            <span className="count-label">{String(START_SMART_COURSES.length).padStart(2, "0")} skills / issue 01</span>
          </div>

          <div className="course-list">
            {START_SMART_COURSES.map((course, index) => (
              <a key={course.slug} className="course-card" href={`https://studylikeapro.art/${course.slug}`} target="_blank" rel="noreferrer">
                <div className="course-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="course-content">
                  <p className="course-category">{course.category.toUpperCase()}</p>
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <span className="course-status">{course.status}</span>
                </div>
                <span className="course-arrow" aria-hidden="true"><ArrowUpRight size={21} strokeWidth={1.7} /></span>
              </a>
            ))}
          </div>
        </section>

        <footer className="footer-block">
          <a className="footer-brand" href="https://studylikeapro.art/" target="_blank" rel="noreferrer" aria-label="Visitar la website de Study Like a Pro"><img src="/manus-storage/high-res-logo_a5feb20b.png" alt="Study Like a Pro" /><span>Study Like a Pro</span></a>
          <p>Actualizamos los hot links cada una o dos semanas.<br />Volvé cuando quieras ver qué skill sigue.</p>
          <div className="footer-bottom">
            <span>© 2026 SLP / Sin humo</span>
            <a href="https://www.instagram.com/studylikeapro.art/" target="_blank" rel="noreferrer" aria-label="Instagram de Study Like a Pro"><Instagram size={17} /></a>
          </div>
        </footer>
      </div>
    </main>
  );
}
