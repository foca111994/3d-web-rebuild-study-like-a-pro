import { COURSES } from "@/lib/courses";

export type CatalogCourse = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
};

const base = "https://studylikeapro.art";

// Compatibility view for the master catalogue page. Course content lives in one place.
export const courses: CatalogCourse[] = COURSES.map((course) => ({
  id: course.slug,
  slug: course.slug,
  title: course.catalog.title,
  category: course.catalog.category,
  description: course.catalog.description,
  image: course.image,
  url: `${base}/${course.slug}`,
}));
