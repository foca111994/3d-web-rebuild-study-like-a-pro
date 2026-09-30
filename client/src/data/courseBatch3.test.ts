import { existsSync, statSync } from "node:fs";
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
    image: "/courses/digital-profit-lab-v20260927.webp",
  },
];

const catalogCovers = [
  ["piezas-decorativas-en-cemento", "/courses/piezas-cemento-v20260927.webp"],
  ["full-reposteria-desde-cero", "/courses/full-reposteria-v20260930.webp"],
  ["velas-artesanales-para-emprender", "/courses/velas-artesanales-v20260927.webp"],
  ["curso-profesional-de-wrapping-vehicular", "/courses/wrapping-vehicular-v20260927.webp"],
  ["administracion-de-taller", "/courses/administracion-taller-v20260930.webp"],
  ["sistemas-de-seguridad-total", "/courses/seguridad-automotriz-v20260930.webp"],
  ["accesorios-en-resina", "/courses/accesorios-resina-v20260927.webp"],
  ["depilacion-profesional-con-cera", "/courses/depilacion-cera-v20260930.webp"],
] as const;

const detailCovers = [
  ["administracion-de-taller", "/courses/administracion-taller-v20260930.webp"],
  ["sistemas-de-seguridad-total", "/courses/seguridad-automotriz-v20260930.webp"],
  ["accesorios-en-resina", "/courses/accesorios-resina-interior-v20260930.webp"],
  ["depilacion-profesional-con-cera", "/courses/depilacion-cera-v20260930.webp"],
  ["full-reposteria-desde-cero", "/courses/full-reposteria-v20260930.webp"],
  ["velas-artesanales-para-emprender", "/courses/velas-artesanales-interior-v20260930.webp"],
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

  it("places Digital Profit Lab first in its mode section", () => {
    expect(MODE_TWO[0]?.slug).toBe("digital-profit-lab-academy");
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

  it("keeps selected catalogue covers assigned to the correct course", () => {
    for (const [slug, image] of catalogCovers) {
      const course = getCourseBySlug(slug);
      expect(course?.image).toBe(image);
      expect(existsSync(resolve(process.cwd(), "public", image.slice(1))) ||
        existsSync(resolve(process.cwd(), "client/public", image.slice(1)))).toBe(true);
    }
  });

  it("keeps selected in-course covers assigned to the correct course", () => {
    for (const [slug, image] of detailCovers) {
      expect(courseDetails[slug]?.image).toBe(image);
      expect(existsSync(resolve(process.cwd(), "public", image.slice(1))) ||
        existsSync(resolve(process.cwd(), "client/public", image.slice(1)))).toBe(true);
    }
  });

  it("keeps the workshop preview poster and fallback link attached to its own video", () => {
    const previews = courseDetails["administracion-de-taller"]?.previewVideos;
    expect(previews).toHaveLength(1);
    expect(previews?.[0]).toMatchObject({
      embedUrl: "https://drive.google.com/file/d/1w4-CBQPWeD77E_OTNgmIHURIOFKy4gZW/preview",
      openUrl: "https://drive.google.com/file/d/1w4-CBQPWeD77E_OTNgmIHURIOFKy4gZW/view",
      poster: "/courses/administracion-taller-v20260930.webp",
    });
  });

  it("keeps the resin tips video and reading guide together on the epoxy resin course", () => {
    const detail = courseDetails["resina-epoxica"];
    expect(detail?.previewVideos?.[0]).toMatchObject({
      embedUrl: "https://drive.google.com/file/d/1SV7j0x3hrw7zTOVdNF3ULVdzAPEXs-k4/preview",
      openUrl: "https://drive.google.com/file/d/1SV7j0x3hrw7zTOVdNF3ULVdzAPEXs-k4/view",
      poster: "/courses/resina-epoxica.webp",
    });
    expect(detail?.studyResource?.src).toBe("/pdfs/guia-mesas-resina.pdf");
    const pdfPath = resolve(process.cwd(), "client/public/pdfs/guia-mesas-resina.pdf");
    expect(existsSync(pdfPath)).toBe(true);
    expect(statSync(pdfPath).size).toBeLessThan(25 * 1024 * 1024);
  });
});
