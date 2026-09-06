import { Instagram } from "lucide-react";

export default function InstagramLink({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`site-instagram${compact ? " site-instagram--compact" : ""}`}
      href="https://www.instagram.com/studylikeapro.art/"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram de Study Like a Pro"
    >
      <Instagram size={compact ? 17 : 20} strokeWidth={1.7} />
      {!compact && <span>Instagram</span>}
    </a>
  );
}
