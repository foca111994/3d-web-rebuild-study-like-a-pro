import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { freeResources } from "@/data/freeResources";
import InstagramLink from "@/components/InstagramLink";

const categories = ["Todos", "Estudio", "IA", "Diseño", "Coding", "Documentos", "Datos", "Audio", "Video", "Navegador"];
const accessOptions = ["Todos", "Sin registro", "Descarga gratuita", "Extensión"];

export default function FreeResources() {
  const [category, setCategory] = useState("Todos");
  const [access, setAccess] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => freeResources.filter((resource) => {
    const categoryMatch = category === "Todos" || resource.category === category || resource.secondaryCategories.includes(category);
    const accessMatch = access === "Todos" || resource.accessType === access;
    const searchMatch = `${resource.name} ${resource.shortHook} ${resource.description}`.toLowerCase().includes(query.trim().toLowerCase());
    return categoryMatch && accessMatch && searchMatch;
  }), [access, category, query]);

  return (
    <main className="resources-page">
      <header className="resources-header">
        <a href="/pilot-3d" className="resources-brand" aria-label="Volver al inventario 3D"><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /><span>/ Free Resources</span></a>
        <a href="/pilot-3d" className="resources-back"><ArrowLeft size={16} /> Inventario 3D</a>
      </header>

      <section className="resources-hero">
        <p className="resources-eyebrow">01 / Biblioteca curada</p>
        <h1>Recursos<br /><em>gratuitos.</em></h1>
        <div className="resources-intro">
          <p>Herramientas útiles para estudiar, crear y trabajar mejor. Priorizamos acceso gratuito y sin registro.</p>
          <span>Batch 01 · 10 recursos · Revisado 06.09.2026</span>
        </div>
      </section>

      <section className="resources-browser" aria-label="Explorar recursos gratuitos">
        <div className="resources-filters">
          <div className="resource-filter-group"><span>Categoría</span><div>{categories.map((item) => <button type="button" className={category === item ? "is-active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div>
          <div className="resource-filter-group"><span>Acceso</span><div>{accessOptions.map((item) => <button type="button" className={access === item ? "is-active" : ""} onClick={() => setAccess(item)} key={item}>{item}</button>)}</div></div>
          <label className="resources-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar una herramienta" aria-label="Buscar una herramienta" /></label>
        </div>

        <div className="resources-result-meta"><span>{String(filtered.length).padStart(2, "0")} resultados</span><span>Prioridad P1</span></div>
        <div className="resources-grid">
          {filtered.map((resource, index) => (
            <article className="resource-card" key={resource.id}>
              <div className="resource-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{resource.category}</span></div>
              <h2>{resource.name}</h2>
              <p className="resource-hook">{resource.shortHook}</p>
              <p className="resource-description">{resource.description}</p>
              <div className="resource-badges"><span>{resource.priceType}</span><span>{resource.accessType}</span>{resource.status !== "Verificado" && <span className="is-warning">Revisar</span>}</div>
              <p className="resource-why"><strong>Por qué nos gusta:</strong> {resource.whyWeLikeIt}</p>
              <a href={resource.officialUrl} target="_blank" rel="noreferrer">Abrir herramienta <ArrowUpRight size={16} /></a>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="resources-empty">No encontramos herramientas con esos filtros.</p>}
      </section>

      <footer className="resources-footer"><span>Study Like a Pro · Free Resources</span><InstagramLink /><a href="/pilot-3d">Volver al inventario</a></footer>
    </main>
  );
}
