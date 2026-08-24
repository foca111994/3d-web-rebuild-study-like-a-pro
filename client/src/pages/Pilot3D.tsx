/* Style direction: Study Like a Pro — laboratorio de movimiento 3D limpio, centrado y sin ruido visual. */
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Pilot3DScene from "@/components/Pilot3D";

export default function Pilot3D() {
  const [active, setActive] = useState(true);

  return (
    <main className="pilot-page">
      <header className="pilot-header">
        <a href="/" className="pilot-brand" aria-label="Volver a Study Like a Pro"><img src="/manus-storage/logo-sky_37c3df06.png" alt="Study Like a Pro" /><span>/ 3D pilot</span></a>
        <div className="pilot-meta"><span>01 / 01</span><span>MECHANICS TEST</span></div>
        <a className="pilot-close" href="/" aria-label="Cerrar piloto">×</a>
      </header>

      <section className="pilot-stage" aria-label="Piloto tridimensional del estudiante">
        <div className="pilot-label pilot-label--top"><span>Object 01</span><span>Live turntable</span></div>
        <Pilot3DScene active={active} />
        <div className="pilot-controls">
          <button type="button" onClick={() => setActive(false)} aria-label="Pausar giro"><ArrowLeft size={16} /></button>
          <button type="button" className="pilot-toggle" onClick={() => setActive((value) => !value)} aria-pressed={active}>{active ? "PAUSE" : "PLAY"}</button>
          <button type="button" onClick={() => setActive(true)} aria-label="Reanudar giro"><ArrowRight size={16} /></button>
        </div>
        <div className="pilot-label pilot-label--bottom"><span>Y axis / 24 fps feel</span><span>Hover + rotation</span></div>
      </section>

      <footer className="pilot-footer">
        <p>Este piloto valida el lenguaje de movimiento del inventario. El avatar se reemplazará por el personaje final cuando tengamos el modelo 3D completo.</p>
        <a href="/" className="pilot-link">Volver al inventario <ArrowUpRight size={14} /></a>
      </footer>
    </main>
  );
}
