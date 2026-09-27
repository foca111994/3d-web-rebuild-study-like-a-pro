import type { LocalizedText, StudyMethod } from "./studyMethods";

export function buildStudyMethodCopy(
  method: StudyMethod,
  locale: keyof LocalizedText
) {
  return [
    "STUDY LIKE A PRO",
    "Skills? Get 'Em",
    "https://studylikeapro.art/",
    "",
    "# " + method.title[locale],
    "",
    "**" + (locale === "en" ? "Attribution" : "Atribución") + ":** " + method.attribution[locale],
    "",
    method.journalIntro[locale],
    "",
    ...method.steps.flatMap((step, index) => [
      (index + 1) + ". **" + step.title[locale] + "**",
      "   " + step.detail[locale],
    ]),
  ].join("\n");
}
