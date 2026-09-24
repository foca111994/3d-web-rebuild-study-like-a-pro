import {
  ArrowUpRight,
  BookOpen,
  CalendarRange,
  Check,
  Clipboard,
  FileText,
  Folder,
  Shuffle,
} from "lucide-react";
import { useMemo, useState } from "react";
import "./StudyMethodsLab.css";
import {
  visibleStudyMethods,
  type LocalizedText,
} from "@/data/studyMethods";
import { useLanguage } from "@/contexts/LanguageContext";

type MethodsTab = "methods" | "journal" | "archive";

const tabCopy: Record<
  MethodsTab,
  { label: LocalizedText; description: LocalizedText }
> = {
  methods: {
    label: { es: "Métodos", en: "Methods" },
    description: {
      es: "Estrategias de estudio paso a paso.",
      en: "Study strategies, step by step.",
    },
  },
  journal: {
    label: { es: "Journal", en: "Journal" },
    description: {
      es: "Pasos listos para copiar y practicar.",
      en: "Steps ready to copy and practise.",
    },
  },
  archive: {
    label: { es: "Archivo", en: "Archive" },
    description: {
      es: "Fuentes verificadas para profundizar.",
      en: "Verified sources for going deeper.",
    },
  },
};

const tabIcons = {
  methods: BookOpen,
  journal: FileText,
  archive: Folder,
} satisfies Record<MethodsTab, typeof BookOpen>;

function copyFallback(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function StudyMethodsLab() {
  const { language } = useLanguage();
  const locale = language === "en" ? "en" : "es";
  const [activeTab, setActiveTab] = useState<MethodsTab>("methods");
  const [selectedId, setSelectedId] = useState(visibleStudyMethods[0].id);
  const [copied, setCopied] = useState(false);

  const method = useMemo(
    () =>
      visibleStudyMethods.find(item => item.id === selectedId) ??
      visibleStudyMethods[0],
    [selectedId]
  );

  const openMethod = (id: string) => {
    setSelectedId(id);
    setCopied(false);
    setActiveTab("journal");
  };

  const copyMethod = async () => {
    const markdown = [
      `# ${method.title[locale]}`,
      "",
      `**${language === "en" ? "Attribution" : "Atribución"}:** ${method.attribution[locale]}`,
      "",
      method.journalIntro[locale],
      "",
      ...method.steps.flatMap((step, index) => [
        `${index + 1}. **${step.title[locale]}**`,
        `   ${step.detail[locale]}`,
      ]),
    ].join("\n");

    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(markdown);
      else copyFallback(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      copyFallback(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      className="study-methods-section"
      aria-labelledby="study-methods-heading"
    >
      <div className="study-methods-grid">
        <div className="study-methods-copy">
          <p className="resources-eyebrow">
            01 / {language === "en" ? "Study methods" : "Métodos de estudio"}
          </p>
          <h1 id="study-methods-heading">
            {language === "en" ? "Methods to" : "Métodos para"}
            <br />
            <em>{language === "en" ? "study better." : "estudiar mejor."}</em>
          </h1>
          <p className="study-methods-lede">
            {language === "en"
              ? "Evidence-informed techniques turned into simple actions."
              : "Técnicas con respaldo, convertidas en acciones simples."}
          </p>

          <div
            className="study-methods-guide"
            aria-label={
              language === "en"
                ? "How this section works"
                : "Cómo funciona esta sección"
            }
          >
            {(Object.keys(tabCopy) as MethodsTab[]).map(tab => {
              const Icon = tabIcons[tab];
              return (
                <button
                  type="button"
                  className={activeTab === tab ? "is-active" : ""}
                  onClick={() => setActiveTab(tab)}
                  key={tab}
                >
                  <Icon aria-hidden="true" />
                  <span>
                    <strong>{tabCopy[tab].label[locale]}</strong>
                    <small>{tabCopy[tab].description[locale]}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="methods-window">
          <div
            className="methods-window-tabs"
            role="tablist"
            aria-label={
              language === "en"
                ? "Study method views"
                : "Vistas del método de estudio"
            }
          >
            <span className="methods-window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            {(Object.keys(tabCopy) as MethodsTab[]).map(tab => {
              const Icon = tabIcons[tab];
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`methods-panel-${tab}`}
                  id={`methods-tab-${tab}`}
                  className={activeTab === tab ? "is-active" : ""}
                  onClick={() => setActiveTab(tab)}
                  key={tab}
                >
                  <Icon aria-hidden="true" />
                  {tabCopy[tab].label[locale]}
                </button>
              );
            })}
          </div>

          {activeTab === "methods" && (
            <div
              className="methods-window-body methods-list-view"
              role="tabpanel"
              id="methods-panel-methods"
              aria-labelledby="methods-tab-methods"
            >
              <div className="methods-panel-meta">
                <span>
                  {language === "en" ? "Study methods" : "Métodos de estudio"}
                </span>
                <span>
                  {visibleStudyMethods.length}{" "}
                  {language === "en" ? "methods" : "métodos"}
                </span>
              </div>
              <div className="methods-list">
                {visibleStudyMethods.map(item => (
                  <button
                    type="button"
                    className={
                      item.id === selectedId
                        ? "method-list-item is-selected"
                        : "method-list-item"
                    }
                    onClick={() => openMethod(item.id)}
                    aria-pressed={item.id === selectedId}
                    key={item.id}
                  >
                    <span className="method-list-number">
                      {String(item.order).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        item.secondaryImage
                          ? "method-list-avatar is-pair"
                          : "method-list-avatar"
                      }
                    >
                      {item.image ? (
                        <>
                          <img
                            src={item.image}
                            alt={item.imageAlt?.[locale] ?? ""}
                          />
                          {item.secondaryImage && (
                            <img
                              src={item.secondaryImage}
                              alt={item.secondaryImageAlt?.[locale] ?? ""}
                            />
                          )}
                        </>
                      ) : item.identityVisual ? (
                        <span
                          className={`method-identity is-${item.identityVisual}`}
                          aria-label={item.identityLabel?.[locale]}
                        >
                          {item.identityVisual === "spacing" ? (
                            <CalendarRange aria-hidden="true" />
                          ) : (
                            <Shuffle aria-hidden="true" />
                          )}
                          <small>{item.identityLabel?.[locale]}</small>
                        </span>
                      ) : (
                        <span>{item.initials}</span>
                      )}
                    </span>
                    <span className="method-list-copy">
                      <small>{item.authors}</small>
                      <strong>{item.title[locale]}</strong>
                      <span>{item.summary[locale]}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </button>
                ))}
              </div>
              {method.imageCredit && method.id === selectedId && (
                <p className="method-image-credit">
                  {language === "en" ? "Photo" : "Foto"}: {method.imageCredit}
                </p>
              )}
            </div>
          )}

          {activeTab === "journal" && (
            <div
              className="methods-window-body journal-view"
              role="tabpanel"
              id="methods-panel-journal"
              aria-labelledby="methods-tab-journal"
            >
              <div className="method-detail-head">
                <span>
                  {language === "en"
                    ? "Selected method"
                    : "Método seleccionado"}
                </span>
                <strong>{method.title[locale]}</strong>
                <p>{method.journalIntro[locale]}</p>
              </div>
              <ol className="journal-steps">
                {method.steps.map((step, index) => (
                  <li key={step.title.es}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{step.title[locale]}</strong>
                      <p>{step.detail[locale]}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="journal-copy-bar">
                <button type="button" onClick={copyMethod}>
                  {copied ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Clipboard aria-hidden="true" />
                  )}
                  {copied
                    ? language === "en"
                      ? "Method copied"
                      : "Método copiado"
                    : language === "en"
                      ? "Copy method"
                      : "Copiar método"}
                </button>
                <span>
                  {language === "en"
                    ? "Copies as Markdown-ready text for your notes."
                    : "Se copia como texto Markdown listo para tus notas."}
                </span>
              </div>
              <span className="sr-only" aria-live="polite">
                {copied
                  ? language === "en"
                    ? "Method copied"
                    : "Método copiado"
                  : ""}
              </span>
            </div>
          )}

          {activeTab === "archive" && (
            <div
              className="methods-window-body archive-view"
              role="tabpanel"
              id="methods-panel-archive"
              aria-labelledby="methods-tab-archive"
            >
              <div className="method-detail-head">
                <span>
                  {language === "en"
                    ? "Verified sources"
                    : "Fuentes verificadas"}
                </span>
                <strong>{method.title[locale]}</strong>
                <p>{method.archiveNote[locale]}</p>
                <div className="method-evidence-meta">
                  <span>{method.attribution[locale]}</span>
                  <span>{method.evidenceLevel[locale]}</span>
                </div>
              </div>
              <ol className="archive-sources">
                {method.sources.map((source, index) => (
                  <li key={source.url}>
                    <span className="archive-source-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <small>{source.kind[locale]}</small>
                      <strong>{source.title}</strong>
                      <span>
                        {source.authors}
                        {source.year ? ` · ${source.year}` : ""}
                      </span>
                      <p>{source.note[locale]}</p>
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${language === "en" ? "Open source" : "Abrir fuente"}: ${source.title}`}
                    >
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
              <p className="archive-summary">
                {method.sources.length}{" "}
                {language === "en" ? "curated sources" : "fuentes curadas"} ·{" "}
                {method.evidenceLevel[locale]}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
