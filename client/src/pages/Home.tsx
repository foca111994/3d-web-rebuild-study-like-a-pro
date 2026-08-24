/*
 * Style direction: Cine editorial de taller — el video abre la experiencia,
 * el scroll revela manifiesto, modos y cursos con la energía táctil de la marca.
 */
import { ArrowDown, ArrowUpRight, ExternalLink, Instagram, Menu, Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MODE_ONE, MODE_TWO, type Course } from "@/lib/courses";

const HERO_VIDEO = "/manus-storage/hero-study-room_ec80bb6f.mp4";
const HERO_POSTER = "/manus-storage/hero-study-room-poster_67da5b48.png";
const LOGO_SKY = "/manus-storage/logo-sky_37c3df06.png";
const LOGO_TRANSPARENT = "/manus-storage/logo-transparent_be5a9d37.webp";
const ILLUSTRATED_BREAK = "/manus-storage/illustrated-study-break_839b1fe1.png";
const CATALOG_HERO = "/manus-storage/catalog-hero_4d0f98de.jpg";

function CourseRail({ courses, mode, heading, light = false }: { courses: Course[]; mode: string; heading: string; light?: boolean }) {
  return (
    <section className={`mode-section ${light ? "mode-section--orange" : "mode-section--ink"}`} id={mode === "Modo 1" ? "modo-1" : "modo-2"}>
      <div className="section-rail">
        <div className="section-index">{mode} <span>/ {String(courses.length).padStart(2, "0")}</span></div>
        <div className="section-rule" aria-hidden="true" />
        <p className="section-kicker">{mode === "Modo 1" ? "START SMART" : "NINJA MODE"}</p>
      </div>
      <div className="mode-heading">
        <div>
          <p className="mono-label">{mode === "Modo 1" ? "01 / START SMART" : "02 / NINJA MODE"}</p>
          <h2>{heading}</h2>
        </div>
        <p className="mode-description">Skills prácticas, explicadas sin vueltas y pensadas para usarlas en el mundo real.</p>
      </div>
      <div className="course-grid">
        {courses.map((course) => (
          <a className="course-row" href={`/${course.slug}`} key={`${course.mode}-${course.number}-${course.title}`}>
            <span className="course-row-number">{course.number}</span>
            <span className="course-row-copy">
              <span className="course-row-category">{course.category}</span>
              <strong>{course.title}</strong>
              <span className="course-row-description">{course.description}</span>
              <span className="course-row-status">{course.status}</span>
            </span>
            <span className="course-row-arrow" aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.6} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) videoRef.current?.pause();
    else if (!videoFailed) videoRef.current?.play().catch(() => setVideoFailed(true));
  }, [reducedMotion, videoFailed]);

  const recoverVideo = () => {
    if (reducedMotion || videoFailed) return;
    window.setTimeout(() => {
      videoRef.current?.play().catch(() => setVideoFailed(true));
    }, 700);
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setVideoFailed(true));
      setVideoPaused(false);
    } else {
      video.pause();
      setVideoPaused(true);
    }
  };

  return (
    <main className="rebuild-site">
      <section className="hero-stage" id="top">
        <div className="hero-media" aria-hidden="true">
          {!videoFailed && !reducedMotion && (
            <video
              ref={videoRef}
              className="hero-video"
              autoPlay
              loop
              muted
              playsInline
              poster={HERO_POSTER}
              onCanPlay={recoverVideo}
              onStalled={recoverVideo}
              onWaiting={recoverVideo}
              onError={() => setVideoFailed(true)}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          )}
          <img className={`hero-poster ${videoFailed || reducedMotion ? "hero-poster--visible" : ""}`} src={HERO_POSTER} alt="Cuatro estudiantes reunidos alrededor de una mesa de estudio" />
          <div className="hero-vignette" />
          <div className="hero-grain" />
        </div>

        <header className="site-nav">
          <a href="#top" className="nav-brand" aria-label="Study Like a Pro, volver al inicio">
            <span className="nav-brand-serial">SLP <b>/</b> 01</span>
            <img src={LOGO_TRANSPARENT} alt="Study Like a Pro" />
          </a>
          <div className="nav-actions">
            <a href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer" className="nav-catalog">Cursos / Courses <ExternalLink size={13} /></a>
            <button className="index-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="main-index">
              {menuOpen ? <X size={17} /> : <Menu size={17} />} <span>Índice</span>
            </button>
          </div>
          {menuOpen && (
            <nav className="main-index" id="main-index" aria-label="Índice principal">
              <a href="#manifesto" onClick={() => setMenuOpen(false)}>Claridad sin humo</a>
              <a href="#modo-1" onClick={() => setMenuOpen(false)}>Modo 1 / Empezá Pro</a>
              <a href="#modo-2" onClick={() => setMenuOpen(false)}>Modo 2 / Ninja Mode</a>
              <a href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer">Catálogo completo <ExternalLink size={13} /></a>
            </nav>
          )}
        </header>

        <div className="hero-copy">
          <p className="hero-kicker">Cursos + mentorías / edición 2026</p>
          <h1>Claridad<br /><em>sin humo.</em></h1>
          <p className="hero-lede">Aprendé una skill que puedas usar. Estudiá mejor, trabajá mejor y avanzá con más criterio.</p>
          <a className="hero-cta" href="#cursos">Explorar cursos <ArrowDown size={16} /></a>
        </div>
        <div className="hero-side-note">/ Subí de nivel<br />/ con skills<br />/ que sí usás<br />/ en el mundo real</div>
        <div className="hero-bottomline">
          <span>STUDY LIKE A PRO</span>
          <span>PLAY / STUDY / REPEAT</span>
        </div>
        <button className="video-toggle" onClick={toggleVideo} aria-label={videoPaused ? "Reproducir video" : "Pausar video"}>
          {videoPaused ? <Play size={14} /> : <Pause size={14} />} <span>{videoPaused ? "Play" : "Pause"}</span>
        </button>
      </section>

      <section className="manifesto-section" id="manifesto">
        <div className="manifesto-image-wrap">
          <img src={ILLUSTRATED_BREAK} alt="Estudiantes rodeados de libros y una ventana de Skills? Get 'em." className="manifesto-image" />
          <span className="image-caption">01 / Dejá de scrollear sin aprender</span>
        </div>
        <div className="manifesto-copy">
          <p className="mono-label">UNA IDEA SIMPLE</p>
          <h2>Skills que<br /><span>sí usás.</span></h2>
          <p>Hay demasiada información suelta. Nosotros armamos rutas claras para que aprendas algo concreto y lo lleves a tu mundo: tu trabajo, tu negocio, tu proyecto o tu próxima etapa.</p>
          <div className="manifesto-stats">
            <span><strong>02</strong> modos</span>
            <span><strong>11</strong> skills públicas</span>
            <span><strong>01</strong> criterio: que sirva</span>
          </div>
        </div>
      </section>

      <section className="catalog-intro" id="cursos">
        <div className="catalog-image" style={{ backgroundImage: `url(${CATALOG_HERO})` }} aria-hidden="true" />
        <div className="catalog-copy">
          <p className="mono-label">/ CURSOS / COURSES</p>
          <h2>Elegí tu<br /><em>siguiente skill.</em></h2>
          <p>Dos modos para encontrar una ruta que tenga sentido. Empezá por lo que te da curiosidad y seguí por lo que te abre una puerta.</p>
          <a className="outline-cta" href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer">Ver catálogo completo <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <CourseRail courses={MODE_ONE} mode="Modo 1" heading="Empezá Pro" />
      <CourseRail courses={MODE_TWO} mode="Modo 2" heading="Ninja" light />

      <section className="closing-section">
        <div className="closing-stamp">SLP<br /><span>01</span></div>
        <p className="mono-label">SIN HUMO / SIN EXCUSAS</p>
        <h2>Lo que aprendés<br /><em>te mueve.</em></h2>
        <a className="dark-cta" href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer">Explorar cursos <ArrowUpRight size={16} /></a>
      </section>

      <footer className="new-footer">
        <a className="footer-logo" href="https://studylikeapro.art/" target="_blank" rel="noreferrer" aria-label="Visitar Study Like a Pro">
          <img src={LOGO_SKY} alt="Study Like a Pro" />
        </a>
        <div className="footer-meta">
          <p>Study Like a Pro es una biblioteca de skills prácticas para avanzar sin humo.</p>
          <div className="footer-links">
            <a href="#top">Volver arriba <ArrowUpRight size={13} /></a>
            <a href="https://www.instagram.com/studylikeapro.art/" target="_blank" rel="noreferrer" aria-label="Instagram de Study Like a Pro"><Instagram size={17} /> Instagram</a>
          </div>
          <span>© 2026 Study Like a Pro / Todos los derechos reservados.</span>
        </div>
      </footer>
    </main>
  );
}
