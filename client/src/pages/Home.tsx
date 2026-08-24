/*
 * Style direction: Cine editorial de taller — el hero se convierte en una secuencia
 * scrollytelling: cámara por frames, escenas superpuestas, azul fotográfico y papel.
 */
import { ArrowDown, ArrowUpRight, ExternalLink, Instagram, Menu, Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MODE_ONE, MODE_TWO, type Course } from "@/lib/courses";

type Language = "es" | "en";

const HERO_VIDEO = "/manus-storage/hero-study-room_ec80bb6f.mp4";
const HERO_POSTER = "/manus-storage/hero-study-room-poster_67da5b48.png";
const LOGO_SKY = "/manus-storage/logo-sky_37c3df06.png";
const ILLUSTRATED_BREAK = "/manus-storage/illustrated-study-break_839b1fe1.png";
const CATALOG_HERO = "/manus-storage/catalog-hero_4d0f98de.jpg";

const COPY = {
  es: {
    catalog: "Cursos / Courses",
    index: "Índice",
    heroKicker: "Cursos + mentorías / edición 2026",
    heroTitle: "Claridad",
    heroTitleAccent: "sin humo.",
    heroLede: "Aprendé una skill que puedas usar. Estudiá mejor, trabajá mejor y avanzá con más criterio.",
    explore: "Explorar cursos",
    sideNote: ["/ Subí de nivel", "/ con skills", "/ que sí usás", "/ en el mundo real"],
    sequence: [
      { kicker: "01 / MIRÁ DE CERCA", title: "Una skill", accent: "empieza con curiosidad." },
      { kicker: "02 / BAJÁ EL RUIDO", title: "Aprendé", accent: "sin humo." },
      { kicker: "03 / LLEVÁLO A TU MUNDO", title: "Lo que aprendés", accent: "te mueve." },
      { kicker: "04 / AHORA SÍ", title: "Elegí tu", accent: "siguiente skill." },
    ],
    manifestoLabel: "Una idea simple",
    manifestoTitle: "Skills que",
    manifestoAccent: "sí usás.",
    manifestoCopy: "Hay demasiada información suelta. Nosotros armamos rutas claras para que aprendas algo concreto y lo lleves a tu mundo: tu trabajo, tu negocio, tu proyecto o tu próxima etapa.",
    catalogLabel: "/ Cursos / Courses",
    catalogTitle: "Elegí tu",
    catalogAccent: "siguiente skill.",
    catalogCopy: "Dos modos para encontrar una ruta que tenga sentido. Empezá por lo que te da curiosidad y seguí por lo que te abre una puerta.",
    fullCatalog: "Ver catálogo completo",
    modes: { one: "Empezá Pro", two: "Ninja" },
    modeDescription: "Skills prácticas, explicadas sin vueltas y pensadas para usarlas en el mundo real.",
    closingLabel: "Sin humo / sin excusas",
    closingTitle: "Lo que aprendés",
    closingAccent: "te mueve.",
    backTop: "Volver arriba",
    footerCopy: "Study Like a Pro es una biblioteca de skills prácticas para avanzar sin humo.",
    available: "disponibles ahora",
    pause: "Pausa",
    play: "Reproducir",
  },
  en: {
    catalog: "Courses",
    index: "Index",
    heroKicker: "Courses + mentoring / 2026 edition",
    heroTitle: "Clarity",
    heroTitleAccent: "without noise.",
    heroLede: "Learn a skill you can use. Study better, work better and move forward with better judgment.",
    explore: "Explore courses",
    sideNote: ["/ Level up", "/ with skills", "/ you actually use", "/ in the real world"],
    sequence: [
      { kicker: "01 / LOOK CLOSER", title: "A skill", accent: "starts with curiosity." },
      { kicker: "02 / CUT THE NOISE", title: "Learn", accent: "without noise." },
      { kicker: "03 / TAKE IT WITH YOU", title: "What you learn", accent: "moves you." },
      { kicker: "04 / NOW CHOOSE", title: "Pick your", accent: "next skill." },
    ],
    manifestoLabel: "A simple idea",
    manifestoTitle: "Skills you",
    manifestoAccent: "actually use.",
    manifestoCopy: "There is too much scattered information. We build clear paths so you can learn something concrete and take it into your work, business, project or next chapter.",
    catalogLabel: "/ Courses",
    catalogTitle: "Pick your",
    catalogAccent: "next skill.",
    catalogCopy: "Two modes to find a path that makes sense. Start with what sparks your curiosity and follow what opens a door.",
    fullCatalog: "View full catalog",
    modes: { one: "Start Smart", two: "Ninja" },
    modeDescription: "Practical skills, explained clearly and built for the real world.",
    closingLabel: "No noise / no excuses",
    closingTitle: "What you learn",
    closingAccent: "moves you.",
    backTop: "Back to top",
    footerCopy: "Study Like a Pro is a library of practical skills for moving forward without noise.",
    available: "available now",
    pause: "Pause",
    play: "Play",
  },
} as const;

const COURSE_EN: Record<string, { title: string; category: string; description: string; status: string }> = {
  "Car Detailing Pro": { title: "Car Detailing Pro", category: "Automotive", description: "Interiors, polishing and headlights. Step by step, without the jargon.", status: "Course available" },
  "Academia del Macramé": { title: "Macramé Academy", category: "Crafts & creativity", description: "Knots, projects and guided practice to turn inspiration into results.", status: "Course available" },
  "Tu Negocio de Jabones Artesanales": { title: "Your Handmade Soap Business", category: "Trades / skills", description: "A clear route to create, present and sell handmade soaps with more intention.", status: "Check availability" },
  "Aprenda a Cantar con Adrián Lozano": { title: "Learn to Sing with Adrián Lozano", category: "Music & voice", description: "Vocal technique to start training your voice with more order and less chaos.", status: "Check availability" },
  "Mecánica de Motos VIP": { title: "VIP Motorcycle Mechanics", category: "Automotive", description: "Maintenance, diagnostics and engines to truly understand a motorcycle.", status: "Check availability" },
  "Aprende Japonés Desde Cero": { title: "Learn Japanese from Scratch", category: "Languages", description: "A clear foundation to start reading, listening and communicating with structure.", status: "Check availability" },
  "El Arte de Hablar en Público": { title: "The Art of Public Speaking", category: "Communication", description: "Organize your ideas, strengthen your presence and speak with clarity.", status: "Check availability" },
  "Yoga, Medicina para el Espíritu": { title: "Yoga, Medicine for the Spirit", category: "Wellbeing", description: "A practice to slow down, reconnect with your body and find more calm.", status: "Check availability" },
  "Curso Coctelería de Autor Online": { title: "Online Signature Cocktail Course", category: "Hobbies", description: "Technique, creativity and a more professional view of the bar.", status: "Check availability" },
  "Gestión Emocional Para Niños": { title: "Emotional Management for Children", category: "Education & family", description: "More tools, more calm and less frustration for everyday support.", status: "Check availability" },
  "El Rentable Negocio de la Sublimación": { title: "The Profitable Sublimation Business", category: "Business & hobbies", description: "Sublimation, equipment and clear steps to start with better judgment.", status: "Course available" },
};

function localizeCourse(course: Course, language: Language) {
  if (language === "es") return { title: course.title, category: course.category, description: course.description, status: course.status };
  return COURSE_EN[course.title] ?? { title: course.title, category: course.category, description: course.description, status: "View availability" };
}

function CourseRail({ courses, mode, heading, language, light = false }: { courses: Course[]; mode: string; heading: string; language: Language; light?: boolean }) {
  const text = COPY[language];
  return (
    <section className={`mode-section ${light ? "mode-section--orange" : "mode-section--ink"}`} id={mode === "Modo 1" ? "modo-1" : "modo-2"}>
      <div className="section-rail">
        <div className="section-index">{mode === "Modo 1" ? "01" : "02"} <span>/ {String(courses.length).padStart(2, "0")}</span></div>
        <div className="section-rule" aria-hidden="true" />
        <p className="section-kicker">{mode === "Modo 1" ? "START SMART" : "NINJA MODE"}</p>
      </div>
      <div className="mode-heading">
        <div>
          <p className="mono-label">{mode === "Modo 1" ? "01 / START SMART" : "02 / NINJA MODE"}</p>
          <h2>{heading}</h2>
        </div>
        <p className="mode-description">{text.modeDescription}</p>
      </div>
      <div className="course-grid">
        {courses.map((course) => {
          const localized = localizeCourse(course, language);
          return (
            <a className="course-row" href={`/${course.slug}`} key={`${course.mode}-${course.number}-${course.title}`}>
              <span className="course-row-number">{course.number}</span>
              <span className="course-row-copy">
                <span className="course-row-category">{localized.category}</span>
                <strong>{localized.title}</strong>
                <span className="course-row-description">{localized.description}</span>
                <span className="course-row-status">{localized.status}</span>
              </span>
              <span className="course-row-arrow" aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.6} /></span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  const scrollSequenceRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("es");
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const text = COPY[language];
  const sceneIndex = Math.min(text.sequence.length - 1, Math.floor(progress * text.sequence.length));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScrollProgress = () => {
      const section = scrollSequenceRef.current;
      if (!section) return;
      const distance = section.offsetHeight - window.innerHeight;
      const nextProgress = distance > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance)) : 0;
      setProgress(nextProgress);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollProgress);
    };
    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed || reducedMotion) return;
    const seekToScroll = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.pause();
        video.currentTime = progress * Math.max(0, video.duration - 0.05);
      }
    };
    if (video.readyState >= 1) seekToScroll();
    else video.addEventListener("loadedmetadata", seekToScroll, { once: true });
    return () => video.removeEventListener("loadedmetadata", seekToScroll);
  }, [progress, reducedMotion, videoFailed]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video || reducedMotion || videoFailed) return;
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
      <section className="scroll-sequence" ref={scrollSequenceRef} id="top">
        <div className="scroll-sticky">
          <section className="hero-stage">
            <div className="hero-media" aria-hidden="true">
              {!videoFailed && !reducedMotion && (
                <video ref={videoRef} className="hero-video" autoPlay loop muted playsInline preload="auto" poster={HERO_POSTER} onError={() => setVideoFailed(true)}>
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
                <img src={LOGO_SKY} alt="Study Like a Pro" />
              </a>
              <div className="nav-actions">
                <a href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer" className="nav-catalog">{text.catalog} <ExternalLink size={13} /></a>
                <label className="language-select"><span className="sr-only">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label="Seleccionar idioma"><option value="es">ES</option><option value="en">EN</option></select></label>
                <button className="index-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="main-index">
                  {menuOpen ? <X size={17} /> : <Menu size={17} />} <span>{text.index}</span>
                </button>
              </div>
              {menuOpen && (
                <nav className="main-index" id="main-index" aria-label={text.index}>
                  <a href="#manifesto" onClick={() => setMenuOpen(false)}>{language === "es" ? "Claridad sin humo" : "Clarity without noise"}</a>
                  <a href="#modo-1" onClick={() => setMenuOpen(false)}>{language === "es" ? "Modo 1 / Empezá Pro" : "Mode 1 / Start Smart"}</a>
                  <a href="#modo-2" onClick={() => setMenuOpen(false)}>{language === "es" ? "Modo 2 / Ninja Mode" : "Mode 2 / Ninja"}</a>
                  <a href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer">{text.fullCatalog} <ExternalLink size={13} /></a>
                </nav>
              )}
            </header>

            <div className="hero-copy scene-copy scene-copy--base">
              <p className="hero-kicker">{text.heroKicker}</p>
              <h1>{text.heroTitle}<br /><em>{text.heroTitleAccent}</em></h1>
              <p className="hero-lede">{text.heroLede}</p>
              <a className="hero-cta" href="#cursos">{text.explore} <ArrowDown size={16} /></a>
            </div>
            <div className="scene-stack" aria-live="polite">
              {text.sequence.map((scene, index) => (
                <div className={`scene-copy scene-copy--frame ${index === sceneIndex ? "scene-copy--active" : ""}`} key={scene.kicker}>
                  <p className="hero-kicker">{scene.kicker}</p>
                  <h2>{scene.title}<br /><em>{scene.accent}</em></h2>
                </div>
              ))}
            </div>
            <div className="hero-side-note">{text.sideNote.map((line) => <span key={line}>{line}</span>)}</div>
            <div className="hero-bottomline"><span>STUDY LIKE A PRO</span><span>SCROLL / {String(Math.round(progress * 100)).padStart(2, "0")} %</span></div>
            <button className="video-toggle" onClick={toggleVideo} aria-label={videoPaused ? text.play : text.pause}>
              {videoPaused ? <Play size={14} /> : <Pause size={14} />} <span>{videoPaused ? text.play : text.pause}</span>
            </button>
            <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleY(${Math.max(.04, progress)})` }} /></div>
          </section>
        </div>
      </section>

      <section className="manifesto-section" id="manifesto">
        <div className="manifesto-image-wrap"><img src={ILLUSTRATED_BREAK} alt="Estudiantes rodeados de libros y una ventana de Skills? Get 'em." className="manifesto-image" /><span className="image-caption">01 / {language === "es" ? "Dejá de scrollear sin aprender" : "Stop scrolling without learning"}</span></div>
        <div className="manifesto-copy"><p className="mono-label">{text.manifestoLabel}</p><h2>{text.manifestoTitle}<br /><span>{text.manifestoAccent}</span></h2><p>{text.manifestoCopy}</p><div className="manifesto-stats"><span><strong>02</strong> {language === "es" ? "modos" : "modes"}</span><span><strong>11</strong> {language === "es" ? "skills públicas" : "public skills"}</span><span><strong>01</strong> {language === "es" ? "criterio: que sirva" : "rule: make it useful"}</span></div></div>
      </section>

      <section className="catalog-intro" id="cursos"><div className="catalog-image" style={{ backgroundImage: `url(${CATALOG_HERO})` }} aria-hidden="true" /><div className="catalog-copy"><p className="mono-label">{text.catalogLabel}</p><h2>{text.catalogTitle}<br /><em>{text.catalogAccent}</em></h2><p>{text.catalogCopy}</p><a className="outline-cta" href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer">{text.fullCatalog} <ArrowUpRight size={16} /></a></div></section>
      <CourseRail courses={MODE_ONE} mode="Modo 1" heading={text.modes.one} language={language} />
      <CourseRail courses={MODE_TWO} mode="Modo 2" heading={text.modes.two} language={language} light />

      <section className="closing-section"><div className="closing-stamp">SLP<br /><span>01</span></div><p className="mono-label">{text.closingLabel}</p><h2>{text.closingTitle}<br /><em>{text.closingAccent}</em></h2><a className="dark-cta" href="https://studylikeapro.art/cursos-courses" target="_blank" rel="noreferrer">{text.explore} <ArrowUpRight size={16} /></a></section>
      <footer className="new-footer"><a className="footer-logo" href="https://studylikeapro.art/" target="_blank" rel="noreferrer"><img src={LOGO_SKY} alt="Study Like a Pro" /></a><div className="footer-meta"><p>{text.footerCopy}</p><div className="footer-links"><a href="#top">{text.backTop} <ArrowUpRight size={13} /></a><a href="https://www.instagram.com/studylikeapro.art/" target="_blank" rel="noreferrer" aria-label="Instagram de Study Like a Pro"><Instagram size={17} /> Instagram</a></div><span>© 2026 Study Like a Pro / All rights reserved.</span></div></footer>
    </main>
  );
}
