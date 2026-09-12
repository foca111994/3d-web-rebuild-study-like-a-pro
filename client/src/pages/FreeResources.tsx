import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { freeResources } from "@/data/freeResources";
import InstagramLink from "@/components/InstagramLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { resourceEnglish } from "@/data/english";

const categories = [
  ["Todos", "All"], ["Estudio", "Study"], ["IA", "AI"], ["Diseño", "Design"], ["Coding", "Coding"],
  ["Documentos", "Documents"], ["Datos", "Data"], ["Audio", "Audio"], ["Video", "Video"], ["Navegador", "Browser"],
] as const;
const accessOptions = [["Todos", "All"], ["Sin registro", "No sign-up"], ["Descarga gratuita", "Free download"], ["Extensión", "Extension"]] as const;

export default function FreeResources() {
  const { language } = useLanguage();
  const [category, setCategory] = useState("Todos");
  const [access, setAccess] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => freeResources.filter((resource) => {
    const categoryMatch = category === "Todos" || resource.category === category || resource.secondaryCategories.includes(category);
    const accessMatch = access === "Todos" || resource.accessType === access;
    const translated = language === "en" ? resourceEnglish[resource.id] : resource;
    const searchMatch = `${resource.name} ${translated.shortHook} ${translated.description}`.toLowerCase().includes(query.trim().toLowerCase());
    return categoryMatch && accessMatch && searchMatch;
  }), [access, category, language, query]);

  return (
    <main className="resources-page">
      <header className="resources-header">
        <a href="/" className="resources-brand" aria-label={language === "en" ? "Back to home" : "Volver al inicio"}><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /><span>/ Free Resources</span></a>
        <a href="/pilot-3d" className="resources-back"><ArrowLeft size={16} /> Skills?</a>
      </header>

      <section className="resources-hero">
        <p className="resources-eyebrow">01 / {language === "en" ? "Curated library" : "Biblioteca curada"}</p>
        <h1>{language === "en" ? "Free" : "Recursos"}<br /><em>{language === "en" ? "resources." : "gratuitos."}</em></h1>
        <div className="resources-intro">
          <p>{language === "en" ? "Useful tools to study, create and work better. We prioritize free access and no sign-up." : "Herramientas útiles para estudiar, crear y trabajar mejor. Priorizamos acceso gratuito y sin registro."}</p>
          <span>Batch 01 · 10 {language === "en" ? "resources · Reviewed" : "recursos · Revisado"} 06.09.2026</span>
        </div>
      </section>

      <section className="resources-browser" aria-label={language === "en" ? "Explore free resources" : "Explorar recursos gratuitos"}>
        <div className="resources-filters">
          <div className="resource-filter-group"><span>{language === "en" ? "Category" : "Categoría"}</span><div>{categories.map(([value, english]) => <button type="button" className={category === value ? "is-active" : ""} onClick={() => setCategory(value)} key={value}>{language === "en" ? english : value}</button>)}</div></div>
          <div className="resource-filter-group"><span>{language === "en" ? "Access" : "Acceso"}</span><div>{accessOptions.map(([value, english]) => <button type="button" className={access === value ? "is-active" : ""} onClick={() => setAccess(value)} key={value}>{language === "en" ? english : value}</button>)}</div></div>
          <label className="resources-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "en" ? "Search for a tool" : "Buscar una herramienta"} aria-label={language === "en" ? "Search for a tool" : "Buscar una herramienta"} /></label>
        </div>

        <div className="resources-result-meta"><span>{String(filtered.length).padStart(2, "0")} {language === "en" ? "results" : "resultados"}</span><span>{language === "en" ? "P1 priority" : "Prioridad P1"}</span></div>
        <div className="resources-grid">
          {filtered.map((resource, index) => {
            const localized = language === "en" ? resourceEnglish[resource.id] : resource;
            return <article className="resource-card" key={resource.id}>
              <div className="resource-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{localized.category}</span></div>
              <h2>{resource.name}</h2>
              <p className="resource-hook">{localized.shortHook}</p>
              <p className="resource-description">{localized.description}</p>
              <div className="resource-badges"><span>{localized.priceType}</span><span>{localized.accessType}</span>{localized.status !== (language === "en" ? "Verified" : "Verificado") && <span className="is-warning">{language === "en" ? "Review" : "Revisar"}</span>}</div>
              <p className="resource-why"><strong>{language === "en" ? "Why we like it:" : "Por qué nos gusta:"}</strong> {localized.whyWeLikeIt}</p>
              <a href={resource.officialUrl} target="_blank" rel="noreferrer">{language === "en" ? "Open tool" : "Abrir herramienta"} <ArrowUpRight size={16} /></a>
            </article>;
          })}
        </div>
        {filtered.length === 0 && <p className="resources-empty">{language === "en" ? "We couldn't find any tools matching those filters." : "No encontramos herramientas con esos filtros."}</p>}
      </section>

      <footer className="resources-footer"><span>Study Like a Pro · Free Resources</span><InstagramLink /><a href="/pilot-3d">{language === "en" ? "Back to inventory" : "Volver al inventario"}</a></footer>
    </main>
  );
}
