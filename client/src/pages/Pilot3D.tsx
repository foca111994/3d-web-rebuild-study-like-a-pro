/* Style direction: Study Like a Pro — inventario 3D horizontal, mobile first y progresivo. */
import { useGLTF } from "@react-three/drei";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import InventoryObject3D from "@/components/InventoryObject3D";
import InstagramLink from "@/components/InstagramLink";

const inventory = [
  { number: "01", title: "Recursos gratuitos", subtitle: "Free Resources", short: "Free Resources", description: "Plantillas, guías y herramientas gratuitas para estudiar mejor, organizarte y pasar a la acción.", model: "/models/production/free-resources.glb", preview: "/models/source/hunyuan-inputs/free-resources-v1-white.png", size: 3.12 },
  { number: "02", title: "Cursos", subtitle: "Courses", short: "Courses", description: "No necesitás otra pestaña abierta. Necesitás una skill que te sirva, una ruta clara y cero humo.", model: "/models/production/students-pair.glb", preview: "/models/source/hunyuan-inputs/students-pair-v2-white.png", size: 3.36 },
  { number: "03", title: "Empezá Pro", subtitle: "Start Smart", short: "Start Smart", description: "Tu skill no se aprende por accidente. Elegí una dirección, practicá con criterio y empezá a usarla de verdad.", model: "/models/production/start-smart.glb", preview: "/models/source/hunyuan-inputs/start-smart-v1-white.png", size: 3.58 },
  { number: "04", title: "Ninja Mode", subtitle: "War Mode", short: "Ninja Mode", description: "Entrá en flow, afiná la técnica y dominá la herramienta hasta que parezca que siempre supiste usarla.", model: "/models/production/ninja-mode.glb", preview: "/models/source/hunyuan-inputs/ninja-mode-v1-white.png", size: 3.58 },
] as const;

const inventoryRoutes = ["/free-resources", "/courses", "/start-smart", "/ninja-mode"] as const;

export default function Pilot3D() {
  const [active, setActive] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);
  const touchCanNavigate = useRef(false);
  const objectPointerStart = useRef<{ x: number; y: number } | null>(null);
  const objectWasDragged = useRef(false);
  const current = inventory[activeIndex];
  const total = String(inventory.length).padStart(2, "0");
  const previous = inventory[(activeIndex - 1 + inventory.length) % inventory.length];
  const next = inventory[(activeIndex + 1) % inventory.length];

  const move = (direction: number) => {
    setDirection(direction >= 0 ? 1 : -1);
    setActiveIndex((value) => (value + direction + inventory.length) % inventory.length);
    setActive(true);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Precarga el siguiente modelo cuando la primera escena ya tuvo prioridad.
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    if (connection?.saveData || connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g") return;

    const timer = window.setTimeout(() => {
      useGLTF.preload(inventory[(activeIndex + 1) % inventory.length].model);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const onTouchStart = (event: React.TouchEvent) => {
    const target = event.target as HTMLElement;
    touchCanNavigate.current = !target.closest(".pilot-active-slot, .pilot-controls, a, button");
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (touchCanNavigate.current && Math.abs(delta) > 42) move(delta < 0 ? 1 : -1);
    touchStartX.current = null;
    touchCanNavigate.current = false;
  };

  const onObjectPointerDown = (event: React.PointerEvent) => {
    objectPointerStart.current = { x: event.clientX, y: event.clientY };
    objectWasDragged.current = false;
  };

  const onObjectPointerMove = (event: React.PointerEvent) => {
    if (!objectPointerStart.current) return;
    const distance = Math.hypot(
      event.clientX - objectPointerStart.current.x,
      event.clientY - objectPointerStart.current.y,
    );
    if (distance > 8) objectWasDragged.current = true;
  };

  const onObjectPointerUp = () => {
    objectPointerStart.current = null;
  };

  return (
    <main className="pilot-page">
      <header className="pilot-header">
        <a href="/" className="pilot-brand" aria-label="Volver a Study Like a Pro"><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /></a>
        <span className="pilot-title">Skills? Get 'Em</span>
        <div className="pilot-header-instagram"><InstagramLink compact /></div>
      </header>

      <section className="pilot-stage" aria-label={`Objeto ${current.number}: ${current.title}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="pilot-object-heading" aria-hidden="true">
          <span>{current.number} / {total}</span>
          <h1>{current.title}</h1>
          {current.subtitle && <small>{current.subtitle}</small>}
        </div>
        <div className="pilot-neighbors" aria-hidden="true">
          <div className="pilot-neighbor pilot-neighbor--previous"><InventoryObject3D active label={`Vista previa 3D de ${previous.title}`} modelSize={previous.size} preview synchronized url={previous.model} /><span>{previous.number} · {previous.short}</span></div>
          <div className="pilot-neighbor pilot-neighbor--next"><InventoryObject3D active label={`Vista previa 3D de ${next.title}`} modelSize={next.size} preview synchronized url={next.model} /><span>{next.number} · {next.short}</span></div>
        </div>
        <div
          key={current.number}
          className={`pilot-active-slot pilot-active-slot--${direction > 0 ? "forward" : "back"} is-clickable`}
          onClick={() => {
            if (objectWasDragged.current) {
              objectWasDragged.current = false;
              return;
            }
            window.location.href = inventoryRoutes[activeIndex];
          }}
          onPointerDown={onObjectPointerDown}
          onPointerMove={onObjectPointerMove}
          onPointerUp={onObjectPointerUp}
          onPointerCancel={onObjectPointerUp}
          role="link"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") window.location.href = inventoryRoutes[activeIndex];
          }}
          aria-label={`Abrir ${current.title}. Arrastrá para explorar el modelo en 3D.`}
        >
          <InventoryObject3D active={active} label={`Modelo 3D de ${current.title}`} modelSize={current.size} url={current.model} />
        </div>
        <div className="pilot-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Objeto anterior"><ArrowLeft size={16} /></button>
          <button type="button" className="pilot-toggle" onClick={() => setActive((value) => !value)} aria-pressed={active}>{active ? "PAUSE" : "PLAY"}</button>
          <button type="button" onClick={() => move(1)} aria-label="Siguiente objeto"><ArrowRight size={16} /></button>
        </div>
        <div className="pilot-inventory-dots" aria-label={`Objeto ${activeIndex + 1} de ${inventory.length}`}>{inventory.map((item, index) => <i className={index === activeIndex ? "is-active" : ""} key={item.number} />)}</div>
      </section>

      <footer className="pilot-footer">
        <p className="pilot-footer-description">{current.description}</p>
        <div className="pilot-footer-mobile-copy">
          <p className="pilot-footer-short">Claridad sin humo</p>
        </div>
        <InstagramLink compact />
        <a href="/" className="pilot-link pilot-link-desktop">Volver al inventario <ArrowUpRight size={14} /></a>
      </footer>
    </main>
  );
}
