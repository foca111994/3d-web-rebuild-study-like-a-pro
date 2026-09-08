import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import InstagramLink from "@/components/InstagramLink";
import { courses } from "@/data/courses";

const categories = ["Todos", ...Array.from(new Set(courses.map((course) => course.category)))];
const detailSlugs: Record<string, string> = { sublimacion: "el-rentable-negocio-de-la-sublimacion", carpinteria: "carpinteria-y-muebles-de-melamina", macrame: "academia-del-macrame", cocteleria: "curso-cocteleria-de-autor-online", "car-detailing": "car-detailing", mecanica: "mecanica-de-motos-vip", canto: "aprenda-a-cantar-con-adrian-lozano", miradas: "master-en-miradas-todo-sobre-cejas-y-pestanas", jabones: "tu-negocio-de-jabones-artesanales" };

export default function Courses() {
  const [category, setCategory] = useState("Todos");
  const visible = useMemo(() => category === "Todos" ? courses : courses.filter((course) => course.category === category), [category]);

  return (
    <main className="courses-page">
      <header className="resources-header">
        <a href="/" className="resources-brand" aria-label="Volver al inicio"><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /><span>/ Courses</span></a>
        <a href="/pilot-3d" className="resources-back"><ArrowLeft size={16} /> Skills?</a>
      </header>

      <section className="courses-hero">
        <p className="resources-eyebrow">02 / Skills para hacer</p>
        <h1>Cursos<br /><em>Courses.</em></h1>
        <div><p>Aprendé una skill útil con una ruta clara, práctica y directa.</p><span>10 cursos · Una sola biblioteca</span></div>
      </section>

      <nav className="courses-filter" aria-label="Filtrar cursos por categoría">
        {categories.map((item) => <button type="button" className={category === item ? "is-active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}
      </nav>

      <section className="courses-list" aria-label="Todos los cursos">
        {visible.map((course, index) => (
          <article className="course-catalog-card" key={course.id}>
            <div className="course-catalog-number">{String(courses.indexOf(course) + 1).padStart(2, "0")}</div>
            <img src={course.image} alt={`Portada de ${course.title}`} loading={index < 2 ? "eager" : "lazy"} />
            <div className="course-catalog-copy">
              <span>{course.category}</span>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <a href={`/${detailSlugs[course.id]}`}>Ver curso <ArrowUpRight size={17} /></a>
            </div>
          </article>
        ))}
      </section>

      <footer className="courses-footer"><span>Study Like a Pro · Courses</span><InstagramLink /><a href="/pilot-3d">Volver al inventario</a></footer>
    </main>
  );
}
