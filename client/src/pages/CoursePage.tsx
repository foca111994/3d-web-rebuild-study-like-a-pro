import { ArrowLeft, ArrowUpRight, ExternalLink, Play } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import InstagramLink from "@/components/InstagramLink";
import { courseDetails } from "@/data/courseDetails";
import { getCourseBySlug } from "@/lib/courses";
import NotFound from "@/pages/NotFound";
import { courseDetailEnglish, courseEnglish } from "@/data/english";
import { useLanguage } from "@/contexts/LanguageContext";

function CourseVideo({ src, title, preview, playLabel, fallbackLabel }: {
  src?: string;
  title: string;
  preview?: { embedUrl: string; openUrl: string; poster: string };
  playLabel: string;
  fallbackLabel: string;
}) {
  const [started, setStarted] = useState(false);
  const embedUrl = preview?.embedUrl ?? src;
  if (!embedUrl) return null;

  return (
    <div className="course-video-item">
      <div className="course-video-frame">
        {preview && !started ? (
          <button className="course-video-poster" type="button" onClick={() => setStarted(true)} aria-label={playLabel}>
            <img src={preview.poster} alt="" />
            <span><Play size={22} fill="currentColor" aria-hidden="true" /></span>
          </button>
        ) : (
          <iframe src={embedUrl} title={title} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        )}
      </div>
      {preview && <a className="course-video-fallback" href={preview.openUrl} target="_blank" rel="noreferrer">{fallbackLabel} <ExternalLink size={13} /></a>}
    </div>
  );
}

export default function CoursePage() {
  const { language } = useLanguage();
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const course = params?.slug ? getCourseBySlug(params.slug) : undefined;
  const detail = course ? courseDetails[course.slug] : undefined;
  if (!course || !detail) return <NotFound />;
  const localizedCourse = language === "en" ? courseEnglish[course.slug] : course;
  const localizedDetail = language === "en" ? courseDetailEnglish[course.slug] : detail;
  const isWarMode = course.level === "war-mode";
  const conversionUrl = course.checkoutUrl ?? course.officialUrl;
  const finalConversionUrl = course.orderBumpUrl ?? conversionUrl;
  const modeName = language === "en" ? (isWarMode ? "Mode 2" : "Mode 1") : (isWarMode ? "Modo 2" : "Modo 1");
  const modeLabel = isWarMode ? "Ninja / Ninja Mode" : "Start Smart / Empezá Pro";
  const videoCount = (detail.videos?.length ?? 0) + (detail.previewVideos?.length ?? 0);

  return (
    <main className={`course-page course-page--${isWarMode ? "ninja" : "start"}`}>
      <header className="course-page-nav">
        <Link href={isWarMode ? "/ninja-mode" : "/start-smart"} className="course-back"><ArrowLeft size={15} /> {language === "en" ? "Back to mode" : "Volver al modo"}</Link>
        <Link href="/courses" className="course-catalog-link">{language === "en" ? "All courses" : "Todos los cursos"} <ExternalLink size={13} /></Link>
      </header>
      <section className="course-hero">
        {detail.image && <img className="course-hero-image" src={detail.image} alt={language === "en" ? `Cover of ${localizedCourse.title}` : `Portada de ${localizedCourse.title}`} />}
        {detail.image && <div className="course-hero-shade" />}
        <div className="course-hero-copy"><p className="mono-label">{modeName} / {modeLabel}</p><p className="course-detail-category">{localizedCourse.category}</p><h1>{localizedCourse.title}</h1><p>{localizedDetail.eyebrow}</p><a href={course.officialUrl} target="_blank" rel="noreferrer" className="detail-cta">{language === "en" ? "More about this skill" : "Más de este skill"} <ArrowUpRight size={17} /></a></div>
        <span className="course-hero-number">{course.number}</span>
      </section>
      <section className="course-story"><div><p className="mono-label">/ {language === "en" ? "The idea" : "La propuesta"}</p><h2>{language === "en" ? <>A clear<br /><em>route.</em></> : <>Una ruta<br /><em>concreta.</em></>}</h2></div><div><p className="course-story-lede">{localizedCourse.longDescription}</p><p>{localizedCourse.description}</p></div></section>
      <section className="course-audience"><div className="course-section-heading"><span>01</span><p>{language === "en" ? "This course is for you if…" : "Este curso es para vos si…"}</p></div><div className="course-points">{localizedDetail.audience.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div></section>
      {videoCount > 0 && <section className="course-videos"><div className="course-section-heading"><span>02</span><p>{language === "en" ? "Discover the course" : "Conocé el curso"}</p></div><div className={`course-video-grid${videoCount === 1 ? " is-single" : ""}`}>{detail.previewVideos?.map((preview, index) => <CourseVideo key={preview.embedUrl} preview={preview} title={`${localizedCourse.title}: video ${index + 1}`} playLabel={language === "en" ? "Play course preview" : "Reproducir vista previa del curso"} fallbackLabel={language === "en" ? "If the video does not load, open it in Google Drive" : "Si el video no carga, abrirlo en Google Drive"} />)}{detail.videos?.map((video, index) => <CourseVideo key={video} src={video} title={`${localizedCourse.title}: video ${index + 1}`} playLabel={language === "en" ? "Play course video" : "Reproducir video del curso"} fallbackLabel={language === "en" ? "Open video" : "Abrir video"} />)}</div></section>}
      <section className="course-includes"><div className="course-section-heading"><span>{videoCount > 0 ? "03" : "02"}</span><p>{language === "en" ? "What is included" : "Qué incluye"}</p></div><div className="course-includes-list">{localizedDetail.includes.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div><a className="course-inline-cta course-inline-cta--light" href={conversionUrl} target="_blank" rel="noreferrer">{language === "en" ? "View skill" : "Ver skill"} <ArrowUpRight size={17} /></a></section>
      {detail.studyResource && <section className="course-reading"><div className="course-reading-copy"><p className="mono-label">{language === "en" ? "EXTRA / READING" : "EXTRA / LECTURA"}</p><h2>{language === "en" ? <>More context<br /><em>for the craft.</em></> : <>Más contexto<br /><em>para crear.</em></>}</h2><p>{language === "en" ? "A visual companion to explore the techniques behind a resin river table and understand the process before planning your own project." : detail.studyResource.description}</p><a href={detail.studyResource.src} target="_blank" rel="noreferrer">{language === "en" ? "Open the guide" : "Abrir el libro"} <ExternalLink size={15} /></a></div><iframe src={detail.studyResource.src} title={language === "en" ? "Resin tables guide" : detail.studyResource.title} loading="lazy" /></section>}
      {detail.pdf && <section className="course-program"><div><p className="mono-label">03 / {language === "en" ? "Program" : "Programa"}</p><h2>{language === "en" ? <>Explore the<br /><em>syllabus.</em></> : <>Explorá el<br /><em>temario.</em></>}</h2><p>{language === "en" ? "Review the published document to understand the route before deciding." : "Revisá el documento publicado para conocer el recorrido antes de decidir."}</p></div><iframe src={detail.pdf} title={language === "en" ? `Program for ${localizedCourse.title}` : `Programa de ${localizedCourse.title}`} loading="lazy" allow="autoplay" /></section>}
      <section className="course-final-cta"><span>{language === "en" ? "Final / Next step" : "Final / Próximo paso"}</span><h2>{language === "en" ? <>Is this the skill<br />you want to learn?</> : <>¿Es la skill<br />que querés aprender?</>}</h2><a href={finalConversionUrl} target="_blank" rel="noreferrer">{language === "en" ? "Check availability" : "Ver disponibilidad"} <ArrowUpRight size={20} /></a></section>
      <footer className="course-detail-footer"><Link href="/" className="footer-logo-link" aria-label={language === "en" ? "Back to home" : "Volver al inicio"}><img src="/brand/study-like-a-pro-sky.png" alt="Study Like a Pro" /></Link><InstagramLink compact /><span>© 2026 Study Like a Pro / {language === "en" ? "No noise" : "Sin humo"}</span></footer>
    </main>
  );
}
