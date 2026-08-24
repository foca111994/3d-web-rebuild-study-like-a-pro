/*
 * Style direction: Study Like a Pro — inventario horizontal minimalista.
 * Cinco objetos como rutas de aprendizaje; el objeto activo toma el foco y el clic revela contexto.
 */
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Headphones, Laptop, Play, RotateCcw, Swords, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MODE_ONE } from "@/lib/courses";

type Language = "es" | "en";

type ObjectItem = {
  id: string;
  number: string;
  label: string;
  title: string;
  accent: string;
  description: string;
  micro: string;
  action: string;
  href?: string;
  icon: "student" | "computer" | "smart" | "ninja" | "discman";
};

const ITEMS: Record<Language, ObjectItem[]> = {
  es: [
    { id: "student", number: "01", label: "YOU", title: "El estudiante", accent: "que empieza.", description: "Una persona curiosa, concentrada y lista para aprender algo que pueda usar en su mundo real.", micro: "Identidad / foco / curiosidad", action: "Conocer la idea", icon: "student" },
    { id: "computer", number: "02", label: "COURSES", title: "La computadora", accent: "abre la ruta.", description: "El punto de entrada al catálogo: cursos, programas y skills para elegir con criterio.", micro: "Cursos / catálogo / compra", action: "Explorar cursos", href: "https://studylikeapro.art/cursos-courses", icon: "computer" },
    { id: "smart", number: "03", label: "MODE 01", title: "Study Smart", accent: "sin humo.", description: "Aprendé con foco, una ruta clara y herramientas que te acompañan hasta el próximo resultado.", micro: "Start Smart / Empezá Pro", action: "Ver modo 1", href: "#modo-1", icon: "smart" },
    { id: "ninja", number: "04", label: "MODE 02", title: "Ninja Mode", accent: "subí de nivel.", description: "Skills tácticas para meterte de lleno, practicar y salir con una herramienta dominada.", micro: "Ninja / práctica / dominio", action: "Ver modo 2", href: "#modo-2", icon: "ninja" },
    { id: "study-lab", number: "05", label: "STUDY LAB", title: "Study Lab", accent: "poné play.", description: "El laboratorio de concentración de la marca: sonido, ritual y contexto para sostener el ritmo mientras aprendés.", micro: "Música / ritual / concentración", action: "Abrir concepto", icon: "discman" },
  ],
  en: [
    { id: "student", number: "01", label: "YOU", title: "The student", accent: "who starts.", description: "A curious, focused person ready to learn something they can use in the real world.", micro: "Identity / focus / curiosity", action: "Meet the idea", icon: "student" },
    { id: "computer", number: "02", label: "COURSES", title: "The computer", accent: "opens the route.", description: "The entrance to the catalog: courses, programs and skills to choose with intention.", micro: "Courses / catalog / purchase", action: "Explore courses", href: "https://studylikeapro.art/cursos-courses", icon: "computer" },
    { id: "smart", number: "03", label: "MODE 01", title: "Study Smart", accent: "without noise.", description: "Learn with focus, a clear route and tools that carry you toward your next result.", micro: "Start Smart / clear route", action: "View mode 1", href: "#modo-1", icon: "smart" },
    { id: "ninja", number: "04", label: "MODE 02", title: "Ninja Mode", accent: "level up.", description: "Tactical skills to go deep, practice and leave with a tool you truly own.", micro: "Ninja / practice / mastery", action: "View mode 2", href: "#modo-2", icon: "ninja" },
    { id: "study-lab", number: "05", label: "STUDY LAB", title: "Study Lab", accent: "press play.", description: "The brand's focus lab: sound, ritual and context to keep your rhythm while you learn.", micro: "Music / ritual / concentration", action: "Open concept", icon: "discman" },
  ],
};

const OBJECT_ASSETS: Record<ObjectItem["icon"], string> = {
  student: "/manus-storage/student-render_a932cb44.png",
  computer: "/manus-storage/course-computer-render_1e992c81.png",
  smart: "/manus-storage/study-smart-render_889b0043.png",
  ninja: "/manus-storage/ninja-mode-render_24cd8bb9.png",
  discman: "/manus-storage/study-lab-render_03d5812e.png",
};

function ObjectIcon({ type }: { type: ObjectItem["icon"] }) {
  return <img className="object-render" src={OBJECT_ASSETS[type]} alt="" />;
}

const LOGO_SKY = "/manus-storage/logo-sky_37c3df06.png";

export default function Prototype() {
  const [language, setLanguage] = useState<Language>("es");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const items = ITEMS[language];
  const active = items[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setActiveIndex((value) => Math.min(items.length - 1, value + 1));
      if (event.key === "ArrowLeft") setActiveIndex((value) => Math.max(0, value - 1));
      if (event.key === "Escape") setSelected(null);
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 5 && Math.abs(event.deltaX) < 5) return;
      event.preventDefault();
      const direction = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      setActiveIndex((value) => Math.max(0, Math.min(items.length - 1, value + (direction > 0 ? 1 : -1))));
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("wheel", onWheel); };
  }, [items.length]);

  const move = (direction: number) => setActiveIndex((value) => Math.max(0, Math.min(items.length - 1, value + direction)));
  const onTouchStart = (event: React.TouchEvent) => { touchStartX.current = event.touches[0]?.clientX ?? null; };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(delta) > 35) move(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <main className="prototype-shell" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <header className="prototype-header">
        <a href="/" className="prototype-wordmark" aria-label="Study Like a Pro"><img src={LOGO_SKY} alt="Study Like a Pro" /><span>/ inventory</span></a>
        <div className="prototype-header-actions">
          <span className="prototype-meta">{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          <label className="prototype-language"><span className="sr-only">Language</span><select value={language} onChange={(event) => { setLanguage(event.target.value as Language); setActiveIndex(0); setSelected(null); }} aria-label="Seleccionar idioma"><option value="es">ES</option><option value="en">EN</option></select></label>
          <a className="prototype-close" href="/" aria-label="Volver a Study Like a Pro"><X size={18} /></a>
        </div>
      </header>

      <section className="prototype-intro">
        <p className="prototype-kicker">STUDY LIKE A PRO / OBJECT SYSTEM</p>
        <h1>{language === "es" ? "Aprendé algo." : "Learn something."}<br /><em>{language === "es" ? "Usalo de verdad." : "Use it for real."}</em></h1>
        <p>{language === "es" ? "Deslizá para explorar el kit de skills. Elegí un objeto para ver qué abre." : "Slide through the skill kit. Choose an object to see what it opens."}</p>
      </section>

      <a className="proto-hotlink" href={`/${MODE_ONE[0].slug}`}>
        <span className="proto-hotlink-number">01 / SKILL LINK</span>
        <span className="proto-hotlink-copy"><strong>{MODE_ONE[0].title}</strong><em>{language === "es" ? "Entrá al curso" : "Enter the course"}</em></span>
        <ArrowUpRight size={19} />
      </a>

      <section className="object-stage" aria-label={language === "es" ? "Inventario de Study Like a Pro" : "Study Like a Pro inventory"}>
        <div className="object-track" style={{ transform: `translateX(calc(50vw - ${activeIndex * 264}px - 132px))` }}>
          {items.map((item, index) => (
            <button className={`object-card ${index === activeIndex ? "object-card--active" : ""} ${selected === item.id ? "object-card--selected" : ""}`} key={item.id} onClick={() => { setActiveIndex(index); setSelected(item.id); }} aria-pressed={selected === item.id} aria-label={`${item.number} ${item.title}`}>
              <span className="object-card-top"><span>{item.number}</span><span>{item.label}</span></span>
              <span className="object-art"><span className="object-shadow" /><ObjectIcon type={item.icon} /></span>
              <span className="object-card-bottom"><strong>{item.title}</strong><em>{item.accent}</em></span>
            </button>
          ))}
        </div>
        <div className="object-axis" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <div className="prototype-controls">
        <button onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Objeto anterior"><ArrowLeft size={16} /></button>
        <span>{language === "es" ? "Deslizá o usá las flechas" : "Slide or use the arrows"}</span>
        <button onClick={() => move(1)} disabled={activeIndex === items.length - 1} aria-label="Siguiente objeto"><ArrowRight size={16} /></button>
      </div>

      <section className={`object-detail ${selected ? "object-detail--open" : ""}`} aria-live="polite">
        {selected && (
          <div className="object-detail-inner">
            <div><p className="prototype-kicker">{active.number} / {active.micro}</p><h2>{active.title}<br /><em>{active.accent}</em></h2></div>
            <p>{active.description}</p>
            {active.href ? <a href={active.href} target={active.href.startsWith("http") ? "_blank" : undefined} rel={active.href.startsWith("http") ? "noreferrer" : undefined} className="prototype-cta">{active.action} <ArrowUpRight size={15} /></a> : <button className="prototype-cta prototype-cta--quiet" onClick={() => setSelected(null)}>{active.action} <RotateCcw size={15} /></button>}
            <button className="detail-close" onClick={() => setSelected(null)} aria-label="Cerrar detalle"><X size={17} /></button>
          </div>
        )}
      </section>

      <footer className="prototype-footer"><span>LEARN A SKILL / SKILLS GET 'EM</span><span>SCROLL HORIZONTAL / NO NOISE</span></footer>
    </main>
  );
}
