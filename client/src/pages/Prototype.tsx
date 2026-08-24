/* Style direction: Study Like a Pro — inventario horizontal 3D sobre fondo blanco. La primera capa es visual y limpia; el detalle aparece solo al seleccionar. */
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MODE_ONE } from "@/lib/courses";

type Language = "es" | "en";

type ObjectItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  micro: string;
  action: string;
  href?: string;
  asset: string;
};

const CATALOG_URL = "https://studylikeapro.art/cursos-courses";
const OBJECT_ASSETS = {
  student: "/manus-storage/student-central-3d_924cb6b1.png",
  computer: "/manus-storage/course-computer-render_1e992c81.png",
  smart: "/manus-storage/cassette-3d_4e7eb85a.png",
  ninja: "/manus-storage/ninja-3d_afe44b24.png",
  headphones: "/manus-storage/retro-headphones-3d_676d596d.png",
} as const;
const LOGO_SKY = "/manus-storage/logo-sky_37c3df06.png";

const ITEMS: Record<Language, ObjectItem[]> = {
  es: [
    { id: "student", number: "01", title: "El estudiante", description: "El punto de partida: foco, curiosidad y una skill que puedas usar en el mundo real.", micro: "Identidad / foco / curiosidad", action: "Cerrar", asset: OBJECT_ASSETS.student },
    { id: "computer", number: "02", title: "Cursos", description: "El catálogo completo para elegir una skill, revisar el programa y entrar al curso indicado.", micro: "Catálogo / cursos / compra", action: "Explorar cursos", href: CATALOG_URL, asset: OBJECT_ASSETS.computer },
    { id: "smart", number: "03", title: "Study Smart", description: `Un recorrido de ${MODE_ONE.length || 10} cursos para estudiar con foco, una ruta clara y herramientas aplicables.`, micro: "Modo 01 / 10 cursos", action: "Ver Study Smart", href: CATALOG_URL, asset: OBJECT_ASSETS.smart },
    { id: "ninja", number: "04", title: "Ninja Mode", description: "Un recorrido de 10 cursos para practicar, subir de nivel y dominar una herramienta.", micro: "Modo 02 / 10 cursos", action: "Ver Ninja Mode", href: CATALOG_URL, asset: OBJECT_ASSETS.ninja },
    { id: "study-lab", number: "05", title: "Study Lab", description: "El ritual sonoro de Study Like a Pro: música, concentración y contexto para sostener el ritmo.", micro: "Música / ritual / concentración", action: "Cerrar", asset: OBJECT_ASSETS.headphones },
  ],
  en: [
    { id: "student", number: "01", title: "The student", description: "The starting point: focus, curiosity and a skill you can use in the real world.", micro: "Identity / focus / curiosity", action: "Close", asset: OBJECT_ASSETS.student },
    { id: "computer", number: "02", title: "Courses", description: "The complete catalog to choose a skill, review the program and enter the right course.", micro: "Catalog / courses / purchase", action: "Explore courses", href: CATALOG_URL, asset: OBJECT_ASSETS.computer },
    { id: "smart", number: "03", title: "Study Smart", description: "A 10-course path to study with focus, a clear route and tools you can apply.", micro: "Mode 01 / 10 courses", action: "View Study Smart", href: CATALOG_URL, asset: OBJECT_ASSETS.smart },
    { id: "ninja", number: "04", title: "Ninja Mode", description: "A 10-course path to practice, level up and truly own a tool.", micro: "Mode 02 / 10 courses", action: "View Ninja Mode", href: CATALOG_URL, asset: OBJECT_ASSETS.ninja },
    { id: "study-lab", number: "05", title: "Study Lab", description: "Study Like a Pro's sound ritual: music, concentration and context to keep your rhythm.", micro: "Music / ritual / concentration", action: "Close", asset: OBJECT_ASSETS.headphones },
  ],
};

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
      if (event.key === "Enter" && document.activeElement?.getAttribute("data-object") === active.id) setSelected(active.id);
      if (event.key === "Escape") setSelected(null);
    };
    const onWheel = (event: WheelEvent) => {
      if (selected || (Math.abs(event.deltaY) < 5 && Math.abs(event.deltaX) < 5)) return;
      event.preventDefault();
      const direction = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      setActiveIndex((value) => Math.max(0, Math.min(items.length - 1, value + (direction > 0 ? 1 : -1))));
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("wheel", onWheel); };
  }, [active.id, items.length, selected]);

  const move = (direction: number) => {
    setActiveIndex((value) => Math.max(0, Math.min(items.length - 1, value + direction)));
    setSelected(null);
  };
  const onTouchStart = (event: React.TouchEvent) => { touchStartX.current = event.touches[0]?.clientX ?? null; };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || selected) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(delta) > 35) move(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <main className="prototype-shell prototype-shell--objects prototype-shell--white" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <header className="prototype-header">
        <a href="/" className="prototype-wordmark" aria-label="Study Like a Pro"><img src={LOGO_SKY} alt="Study Like a Pro" /><span>/ inventory</span></a>
        <div className="prototype-header-actions">
          <span className="prototype-meta" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          <label className="prototype-language"><span className="sr-only">Seleccionar idioma</span><select value={language} onChange={(event) => { setLanguage(event.target.value as Language); setActiveIndex(0); setSelected(null); }} aria-label="Seleccionar idioma"><option value="es">ES</option><option value="en">EN</option></select></label>
          <a className="prototype-close" href="/" aria-label="Volver a Study Like a Pro"><X size={18} /></a>
        </div>
      </header>

      <section className="object-stage object-stage--pure object-stage--white" aria-label={language === "es" ? "Objetos interactivos de Study Like a Pro" : "Interactive Study Like a Pro objects"}>
        <div className="object-track object-track--pure" style={{ transform: `translateX(calc(50vw - ${activeIndex * 286}px - 143px))` }}>
          {items.map((item, index) => (
            <button className={`object-card object-card--pure ${index === activeIndex ? "object-card--active" : ""} ${selected === item.id ? "object-card--selected" : ""}`} data-object={item.id} key={item.id} onClick={() => { setActiveIndex(index); setSelected(item.id); }} aria-pressed={selected === item.id} aria-label={`${item.number} ${item.title}`}>
              <span className="object-art object-art--pure"><span className="object-shadow" />{item.id === "computer" ? <span className="object-render object-laptop" aria-hidden="true"><span className="object-laptop-screen"><img src={LOGO_SKY} alt="" /></span><span className="object-laptop-base" /></span> : <img className="object-render" src={item.asset} alt="" draggable="false" />}</span>
            </button>
          ))}
        </div>
        <div className="object-axis" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </section>

      <div className="prototype-controls prototype-controls--minimal">
        <button onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Objeto anterior"><ArrowLeft size={17} /></button>
        <span className="prototype-dots" aria-hidden="true">{items.map((item, index) => <i className={index === activeIndex ? "is-active" : ""} key={item.id} />)}</span>
        <button onClick={() => move(1)} disabled={activeIndex === items.length - 1} aria-label="Siguiente objeto"><ArrowRight size={17} /></button>
      </div>

      <section className={`object-detail object-detail--layer ${selected ? "object-detail--open" : ""}`} aria-live="polite">
        {selected && (
          <div className="object-detail-inner">
            <div><p className="prototype-kicker">{active.number} / {active.micro}</p><h1>{active.title}</h1></div>
            <p>{active.description}</p>
            {active.href ? <a href={active.href} target="_blank" rel="noreferrer" className="prototype-cta">{active.action} <ArrowUpRight size={15} /></a> : <button className="prototype-cta prototype-cta--quiet" onClick={() => setSelected(null)}>{active.action} <RotateCcw size={15} /></button>}
            <button className="detail-close" onClick={() => setSelected(null)} aria-label="Cerrar detalle"><X size={17} /></button>
          </div>
        )}
      </section>
    </main>
  );
}
