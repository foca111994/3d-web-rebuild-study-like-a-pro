import { describe, expect, it } from "vitest";
import { studyMethods } from "./studyMethods";
import { buildStudyMethodCopy } from "./studyMethodClipboard";

describe("study method clipboard text", () => {
  it("includes the exact brand block and method content in the active language", () => {
    const feynman = studyMethods.find(method => method.id === "feynman");
    if (!feynman) throw new Error("Feynman method is missing");

    const spanish = buildStudyMethodCopy(feynman, "es");
    const english = buildStudyMethodCopy(feynman, "en");
    const brandBlock = [
      "STUDY LIKE A PRO",
      "Skills? Get 'Em",
      "https://studylikeapro.art/",
    ].join("\n");

    expect(spanish.startsWith(brandBlock + "\n\n")).toBe(true);
    expect(english.startsWith(brandBlock + "\n\n")).toBe(true);
    expect(spanish).toContain("# Método Feynman");
    expect(spanish).toContain("**Atribución:** Inspirado en Richard Feynman");
    expect(spanish).toContain("Elige un concepto");
    expect(spanish).not.toContain("Choose one concept");
    expect(english).toContain("# Feynman Method");
    expect(english).toContain("**Attribution:** Inspired by Richard Feynman");
    expect(english).toContain("Choose one concept");
    expect(english).not.toContain("Elige un concepto");
  });
});
