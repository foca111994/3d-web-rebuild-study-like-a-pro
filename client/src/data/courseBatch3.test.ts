import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { courseDetails } from "./courseDetails";
import { courseDetailEnglish, courseEnglish } from "./english";
import { COURSES, MODE_ONE, MODE_TWO, getCourseBySlug } from "@/lib/courses";

const expected = [
  {
    slug: "soy-barbero",
    mode: MODE_TWO,
    landing: "https://go.hotmart.com/C107732309U",
    final: "https://go.hotmart.com/C107732309U?ap=5fb6",
    image: "/courses/soy-barbero-corte.webp",
  },
  {
    slug: "japones-basico",
    mode: MODE_ONE,
    landing: "https://go.hotmart.com/S107732338D",
    final: "https://go.hotmart.com/S107732338D",
    image: "https://img.youtube.com/vi/pB_542j0gP4/hqdefault.jpg",
  },
  {
    slug: "oratoria-desde-casa",
    mode: MODE_ONE,
    landing: "https://go.hotmart.com/H107732434N?ap=6b54",
    final: "https://go.hotmart.com/H107732434N?ap=6db9",
    image: "/courses/oratoria-desde-casa.webp",
  },
  {
    slug: "digital-profit-lab-academy",
    mode: MODE_TWO,
    landing: "https://go.hotmart.com/E107732386E",
    final: "https://go.hotmart.com/E107732386E",
  },
];

const replacedCovers = [
  ["piezas-decorativas-en-cemento", "/courses/piezas-cemento-v20260927.webp"],
  ["full-reposteria-desde-cero", "/courses/full-reposteria-v20260927.webp"],
  ["velas-artesanales-para-emprender", "/courses/velas-artesanales-v20260927.webp"],
  ["curso-profesional-de-wrapping-vehicular", "/courses/wrapping-vehicular-v20260927.webp"],
  ["administracion-de-taller", "/courses/administracion-taller-v20260927.webp"],
  ["sistemas-de-seguridad-total", "/courses/seguridad-automotriz-v20260927.webp"],
  ["accesorios-en-resina", "/courses/accesorios-resina-v20260927.webp"],
] as const;

describe("Batch 3 course integration", () => {
  it("registers every course in Courses and exactly one requested mode", () => {
    for (const item of expected) {
      const course = getCourseBySlug(item.slug);
      expect(course).toBeDefined();
      expect(COURSES.filter(candidate => candidate.slug === item.slug)).toHaveLength(1);
      expect(MODE_ONE.some(candidate => candidate.slug === item.slug)).toBe(
        item.mode === MODE_ONE
      );
      expect(MODE_TWO.some(candidate => candidate.slug === item.slug)).toBe(
        item.mode === MODE_TWO
      );
    }
  });

  it("keeps landing, final CTA, and preview assets tied to their own course", () => {
    for (const item of expected) {
      const course = getCourseBySlug(item.slug);
      const detail = courseDetails[item.slug];
      expect(course?.officialUrl).toBe(item.landing);
      expect(course?.orderBumpUrl ?? course?.checkoutUrl ?? course?.officialUrl).toBe(item.final);
      expect(detail).toBeDefined();
      expect(courseEnglish[item.slug]).toBeDefined();
      expect(courseDetailEnglish[item.slug]).toBeDefined();

      if (item.image?.startsWith("/")) {
        expect(course?.image).toBe(item.image);
        expect(detail.image).toBe(item.image);
        const localAssetPaths = [
          resolve(process.cwd(), "public", item.image.slice(1)),
          resolve(process.cwd(), "client/public", item.image.slice(1)),
        ];
        expect(localAssetPaths.some(existsSync)).toBe(true);
      } else if (item.image) {
        expect(course?.image).toBe(item.image);
        expect(detail.image).toBe(item.image);
      } else {
        expect(course?.image).toBeUndefined();
        expect(detail.image).toBeUndefined();
      }
    }
  });

  it("uses each replacement cover on both the course page and catalogue card", () => {
    for (const [slug, image] of replacedCovers) {
      const course = getCourseBySlug(slug);
      expect(course?.image).toBe(image);
      expect(courseDetails[slug]?.image).toBe(image);
      expect(existsSync(resolve(process.cwd(), "public", image.slice(1))) ||
        existsSync(resolve(process.cwd(), "client/public", image.slice(1)))).toBe(true);
    }
  });
});
