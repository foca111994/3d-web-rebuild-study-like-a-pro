import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle" role="group" aria-label="Language / Idioma">
      <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>
        EN
      </button>
      <button type="button" aria-pressed={language === "es"} onClick={() => setLanguage("es")}>
        ES
      </button>
    </div>
  );
}
