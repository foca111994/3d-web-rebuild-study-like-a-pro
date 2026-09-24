export type LocalizedText = {
  es: string;
  en: string;
};

export type StudyMethodSource = {
  kind: LocalizedText;
  title: string;
  authors: string;
  year?: string;
  note: LocalizedText;
  url: string;
};

export type StudyMethod = {
  id: string;
  order: number;
  title: LocalizedText;
  authors: string;
  initials: string;
  attributionType:
    | "inspired-by"
    | "developed-by"
    | "research-group"
    | "curated-by";
  attribution: LocalizedText;
  evidenceLevel: LocalizedText;
  summary: LocalizedText;
  journalIntro: LocalizedText;
  archiveNote: LocalizedText;
  image?: string;
  secondaryImage?: string;
  imageAlt?: LocalizedText;
  secondaryImageAlt?: LocalizedText;
  imageCredit?: string;
  steps: Array<{
    title: LocalizedText;
    detail: LocalizedText;
  }>;
  sources: StudyMethodSource[];
};

export const studyMethods: StudyMethod[] = [
  {
    id: "feynman",
    order: 1,
    title: { es: "Método Feynman", en: "Feynman Method" },
    authors: "Richard Feynman",
    initials: "RF",
    attributionType: "inspired-by",
    attribution: {
      es: "Inspirado en Richard Feynman",
      en: "Inspired by Richard Feynman",
    },
    evidenceLevel: {
      es: "Principio con respaldo sólido",
      en: "Principle with solid support",
    },
    summary: {
      es: "Aprende explicando una idea con palabras simples hasta descubrir qué partes todavía no comprendes.",
      en: "Learn by explaining an idea in simple words until you uncover what you still do not understand.",
    },
    journalIntro: {
      es: "Convierte cualquier tema en una explicación tan simple que puedas detectar exactamente qué te falta entender.",
      en: "Turn any topic into an explanation simple enough to reveal exactly what you still need to understand.",
    },
    archiveNote: {
      es: "Técnica popular inspirada en la forma de aprender y explicar de Richard Feynman. Él no publicó estos siete pasos como un método formal.",
      en: "A popular technique inspired by Richard Feynman's way of learning and explaining. He did not publish these seven steps as a formal method.",
    },
    image: "/methods/richard-feynman.webp",
    imageAlt: {
      es: "Retrato de Richard Feynman",
      en: "Portrait of Richard Feynman",
    },
    imageCredit: "Los Alamos National Laboratory",
    steps: [
      {
        title: { es: "Elige un concepto", en: "Choose one concept" },
        detail: {
          es: "Define un tema específico que quieras comprender.",
          en: "Define one specific topic you want to understand.",
        },
      },
      {
        title: { es: "Explícalo sin mirar", en: "Explain it without looking" },
        detail: {
          es: "Dilo en voz alta o escríbelo como si se lo enseñaras a otra persona.",
          en: "Say it aloud or write it as if you were teaching someone else.",
        },
      },
      {
        title: { es: "Usa palabras simples", en: "Use simple words" },
        detail: {
          es: "Elimina tecnicismos que oculten una comprensión incompleta.",
          en: "Remove jargon that could hide incomplete understanding.",
        },
      },
      {
        title: { es: "Detecta los vacíos", en: "Find the gaps" },
        detail: {
          es: "Marca cada parte que no puedas explicar con claridad.",
          en: "Mark every part you cannot explain clearly.",
        },
      },
      {
        title: { es: "Vuelve a la fuente", en: "Return to the source" },
        detail: {
          es: "Revisa solamente el material necesario para completar esos vacíos.",
          en: "Review only the material needed to fill those gaps.",
        },
      },
      {
        title: { es: "Crea un ejemplo", en: "Create an example" },
        detail: {
          es: "Conecta la idea con una situación concreta y cotidiana.",
          en: "Connect the idea to a concrete, everyday situation.",
        },
      },
      {
        title: {
          es: "Repite hasta enseñarlo",
          en: "Repeat until you can teach it",
        },
        detail: {
          es: "Explícalo nuevamente, más corto, más claro y sin apoyo.",
          en: "Explain it again, more briefly and clearly, without support.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Fuente original", en: "Original source" },
        title: "The Feynman Lectures on Physics",
        authors: "Feynman, Leighton & Sands · Caltech",
        year: "1963-1965",
        note: {
          es: "Muestra directamente la claridad pedagógica y el estilo explicativo de Feynman.",
          en: "Shows Feynman's pedagogical clarity and explanatory style directly.",
        },
        url: "https://www.feynmanlectures.caltech.edu/",
      },
      {
        kind: { es: "Evidencia académica", en: "Academic evidence" },
        title: "The Relative Benefits of Learning by Teaching",
        authors: "Logan Fiorella & Richard E. Mayer",
        year: "2013",
        note: {
          es: "Estudia los beneficios de aprender enseñando y de prepararse para enseñar.",
          en: "Examines learning by teaching and preparing to teach.",
        },
        url: "https://doi.org/10.1016/j.cedpsych.2013.02.001",
      },
      {
        kind: { es: "Evidencia académica", en: "Academic evidence" },
        title: "Expecting to Teach Enhances Learning",
        authors: "Nestojko, Bui, Kornell & Bjork",
        year: "2014",
        note: {
          es: "Relaciona la expectativa de enseñar con mejor recuerdo y organización.",
          en: "Links expecting to teach with better recall and organization.",
        },
        url: "https://doi.org/10.3758/s13421-014-0416-z",
      },
      {
        kind: { es: "Guía universitaria", en: "University guide" },
        title: "The Feynman Technique",
        authors: "University of York",
        note: {
          es: "Aplicación práctica para estudiar y revisar.",
          en: "A practical application for study and revision.",
        },
        url: "https://subjectguides.york.ac.uk/study-revision/feynman-technique",
      },
    ],
  },
  {
    id: "multimedia-segmented",
    order: 2,
    title: {
      es: "Aprendizaje multimedia segmentado",
      en: "Segmented Multimedia Learning",
    },
    authors: "Richard E. Mayer y colaboradores",
    initials: "RM",
    attributionType: "research-group",
    attribution: {
      es: "Investigado por Richard E. Mayer y colaboradores",
      en: "Researched by Richard E. Mayer and colleagues",
    },
    evidenceLevel: {
      es: "Respaldo sólido para aprendizaje online",
      en: "Solid support for online learning",
    },
    summary: {
      es: "Divide videos y lecciones digitales en partes controlables para comprender antes de continuar.",
      en: "Break videos and digital lessons into manageable parts so you understand before moving on.",
    },
    journalIntro: {
      es: "Transforma una clase online larga en ciclos cortos de atención, pausa, recuperación y avance.",
      en: "Turn a long online lesson into short cycles of attention, pause, retrieval and progress.",
    },
    archiveNote: {
      es: "El principio de segmentación pertenece a la investigación sobre aprendizaje multimedia de Mayer y otros equipos. Funciona mejor cuando el estudiante controla el ritmo.",
      en: "The segmenting principle comes from multimedia-learning research by Mayer and other teams. It works best when learners control the pace.",
    },
    image: "/methods/richard-mayer.webp",
    imageAlt: {
      es: "Retrato de Richard E. Mayer",
      en: "Portrait of Richard E. Mayer",
    },
    imageCredit: "Richard E. Mayer",
    steps: [
      {
        title: { es: "Define el objetivo", en: "Define the goal" },
        detail: {
          es: "Decide qué deberías poder explicar o hacer al terminar.",
          en: "Decide what you should be able to explain or do at the end.",
        },
      },
      {
        title: { es: "Divide la lección", en: "Split the lesson" },
        detail: {
          es: "Trabaja en segmentos de una sola idea o procedimiento.",
          en: "Work in segments containing one idea or procedure.",
        },
      },
      {
        title: { es: "Mira con intención", en: "Watch with intention" },
        detail: {
          es: "Mantén abiertas únicamente las herramientas necesarias.",
          en: "Keep only the tools you need open.",
        },
      },
      {
        title: { es: "Pausa antes de seguir", en: "Pause before continuing" },
        detail: {
          es: "Detén el contenido al terminar cada idea principal.",
          en: "Stop the content after each main idea.",
        },
      },
      {
        title: { es: "Recupera de memoria", en: "Retrieve from memory" },
        detail: {
          es: "Resume el segmento sin volver a reproducirlo.",
          en: "Summarize the segment without replaying it.",
        },
      },
      {
        title: { es: "Comprueba y corrige", en: "Check and correct" },
        detail: {
          es: "Compara tu resumen con el material y completa los vacíos.",
          en: "Compare your summary with the material and fill the gaps.",
        },
      },
      {
        title: { es: "Conecta los segmentos", en: "Connect the segments" },
        detail: {
          es: "Al final, explica cómo se relacionan todas las partes.",
          en: "At the end, explain how all the parts connect.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Marco académico", en: "Academic framework" },
        title: "Principles for Managing Essential Processing",
        authors: "Richard E. Mayer & Logan Fiorella",
        year: "2021",
        note: {
          es: "Describe segmentación, preentrenamiento y modalidad en multimedia.",
          en: "Covers segmenting, pre-training and modality in multimedia.",
        },
        url: "https://www.cambridge.org/core/books/cambridge-handbook-of-multimedia-learning/principles-for-managing-essential-processing-in-multimedia-learning/A9E77D0172F905AC957689D1771E2888",
      },
      {
        kind: { es: "Revisión académica", en: "Academic review" },
        title: "Using Multimedia for E-Learning",
        authors: "Richard E. Mayer",
        year: "2017",
        note: {
          es: "Revisa principios basados en investigación para materiales digitales.",
          en: "Reviews research-based principles for digital learning materials.",
        },
        url: "https://doi.org/10.1111/jcal.12197",
      },
      {
        kind: { es: "Aplicación online", en: "Online application" },
        title: "Creating Online Multimedia Lessons",
        authors: "Educational Technology Research and Development",
        year: "2023",
        note: {
          es: "Aplica segmentación y otros principios a lecciones online.",
          en: "Applies segmenting and related principles to online lessons.",
        },
        url: "https://link.springer.com/article/10.1007/s11423-022-10181-1",
      },
      {
        kind: { es: "Meta-análisis", en: "Meta-analysis" },
        title: "A Meta-Analysis of Mayer's Multimedia Learning Research",
        authors: "Educational Research Review",
        year: "2025",
        note: {
          es: "Examina efectos y límites de distintos principios multimedia.",
          en: "Examines the effects and boundaries of multimedia principles.",
        },
        url: "https://doi.org/10.1016/j.edurev.2025.100730",
      },
    ],
  },
  {
    id: "huberman-study-protocol",
    order: 3,
    title: {
      es: "Protocolo Huberman para estudiar",
      en: "Huberman Study Protocol",
    },
    authors: "Andrew Huberman",
    initials: "AH",
    attributionType: "curated-by",
    attribution: {
      es: "Protocolo curado por Andrew Huberman",
      en: "Protocol curated by Andrew Huberman",
    },
    evidenceLevel: { es: "Síntesis cualificada", en: "Qualified synthesis" },
    summary: {
      es: "Organiza atención, autoevaluación, feedback y descanso alrededor de una sesión de aprendizaje.",
      en: "Organize attention, self-testing, feedback and rest around a learning session.",
    },
    journalIntro: {
      es: "Usa solo los componentes con respaldo directo y trata el protocolo como una síntesis, no como un único experimento validado.",
      en: "Use the components with direct support and treat the protocol as a synthesis, not one independently validated experiment.",
    },
    archiveNote: {
      es: "Huberman comunica y organiza investigaciones de distintos equipos. No inventó la recuperación activa, el espaciado ni el efecto de evaluación.",
      en: "Huberman communicates and organizes research from several teams. He did not invent retrieval practice, spacing or the testing effect.",
    },
    image: "/methods/andrew-huberman.webp",
    imageAlt: {
      es: "Retrato de Andrew Huberman",
      en: "Portrait of Andrew Huberman",
    },
    imageCredit: "Andrew Huberman",
    steps: [
      {
        title: { es: "Fija un resultado", en: "Set one outcome" },
        detail: {
          es: "Define qué conocimiento o habilidad vas a comprobar.",
          en: "Define the knowledge or skill you will test.",
        },
      },
      {
        title: { es: "Limpia el entorno", en: "Clear the environment" },
        detail: {
          es: "Aleja el teléfono y cierra pestañas que no sean esenciales.",
          en: "Move your phone away and close non-essential tabs.",
        },
      },
      {
        title: { es: "Estudia con atención", en: "Study attentively" },
        detail: {
          es: "Haz una primera exposición activa al material.",
          en: "Make the first exposure to the material active.",
        },
      },
      {
        title: { es: "Autoevalúate pronto", en: "Self-test soon" },
        detail: {
          es: "Intenta recordar o aplicar el contenido poco después.",
          en: "Try to recall or apply the content soon afterwards.",
        },
      },
      {
        title: { es: "Acepta el error", en: "Use the error" },
        detail: {
          es: "Trata cada respuesta incorrecta como información para corregir.",
          en: "Treat each incorrect answer as information for correction.",
        },
      },
      {
        title: { es: "Repite con feedback", en: "Repeat with feedback" },
        detail: {
          es: "Haz dos o tres recuperaciones y verifica las respuestas.",
          en: "Complete two or three retrieval attempts and check the answers.",
        },
      },
      {
        title: { es: "Protege la recuperación", en: "Protect recovery" },
        detail: {
          es: "Finaliza, descansa y prioriza suficiente sueño.",
          en: "Finish, rest and prioritize sufficient sleep.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Protocolo oficial", en: "Official protocol" },
        title: "Optimal Protocols for Studying & Learning",
        authors: "Huberman Lab",
        year: "2024",
        note: {
          es: "Presenta herramientas de estudio, autoevaluación y reducción de distracciones.",
          en: "Presents tools for studying, self-testing and limiting distractions.",
        },
        url: "https://www.hubermanlab.com/episode/optimal-protocols-for-studying-learning",
      },
      {
        kind: { es: "Libro", en: "Book" },
        title: "Protocols: An Operating Manual for the Human Body",
        authors: "Andrew D. Huberman",
        year: "2026",
        note: {
          es: "Incluye un área dedicada a enfoque, motivación y aprendizaje.",
          en: "Includes a section on focus, motivation and learning.",
        },
        url: "https://www.simonandschuster.com/books/Protocols/Andrew-D-Huberman/9781668032145",
      },
      {
        kind: { es: "Base académica", en: "Academic basis" },
        title: "Test-Enhanced Learning",
        authors: "Roediger & Karpicke",
        year: "2006",
        note: {
          es: "Evidencia primaria detrás de la autoevaluación como herramienta de aprendizaje.",
          en: "Primary evidence behind self-testing as a learning tool.",
        },
        url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
      },
      {
        kind: { es: "Protocolo complementario", en: "Related protocol" },
        title: "Neuroplasticity Super Protocol",
        authors: "Huberman Lab",
        year: "2021",
        note: {
          es: "Rutina conductual complementaria con límites y atribución transparente.",
          en: "A related behavioral routine presented with transparent limits and attribution.",
        },
        url: "https://www.hubermanlab.com/newsletter/teach-and-learn-better-with-a-neuroplasticity-super-protocol",
      },
    ],
  },
  {
    id: "retrieval-practice",
    order: 4,
    title: { es: "Recuperación activa", en: "Retrieval Practice" },
    authors: "Henry Roediger III y Jeffrey Karpicke",
    initials: "RK",
    attributionType: "research-group",
    attribution: {
      es: "Investigado por Roediger, Karpicke y otros equipos",
      en: "Researched by Roediger, Karpicke and other teams",
    },
    evidenceLevel: { es: "Evidencia alta", en: "High evidence" },
    summary: {
      es: "Fortalece el aprendizaje intentando recordar antes de volver a mirar.",
      en: "Strengthen learning by trying to recall before looking again.",
    },
    journalIntro: {
      es: "Convierte el estudio pasivo en preguntas, respuestas y correcciones realizadas desde la memoria.",
      en: "Turn passive study into questions, answers and corrections produced from memory.",
    },
    archiveNote: {
      es: "También se conoce como practice testing. Las pruebas son de bajo riesgo y se usan para aprender, no solo para calificar.",
      en: "Also known as practice testing. The tests are low stakes and used for learning, not only grading.",
    },
    image: "/methods/roediger-karpicke.webp",
    imageAlt: {
      es: "Henry Roediger III y Jeffrey Karpicke",
      en: "Henry Roediger III and Jeffrey Karpicke",
    },
    imageCredit: "Henry Roediger III y Jeffrey Karpicke",
    steps: [
      {
        title: { es: "Estudia una vez", en: "Study once" },
        detail: {
          es: "Haz una primera lectura o visualización atenta.",
          en: "Complete one attentive reading or viewing.",
        },
      },
      {
        title: { es: "Cierra la fuente", en: "Close the source" },
        detail: {
          es: "Retira apuntes, video y respuestas de tu vista.",
          en: "Remove notes, video and answers from view.",
        },
      },
      {
        title: { es: "Genera preguntas", en: "Generate questions" },
        detail: {
          es: "Pregunta por ideas, relaciones y aplicaciones.",
          en: "Ask about ideas, relationships and applications.",
        },
      },
      {
        title: { es: "Responde de memoria", en: "Answer from memory" },
        detail: {
          es: "Escribe, habla o resuelve sin ayuda.",
          en: "Write, speak or solve without help.",
        },
      },
      {
        title: { es: "Comprueba", en: "Check" },
        detail: {
          es: "Compara cada respuesta con una fuente confiable.",
          en: "Compare each answer with a reliable source.",
        },
      },
      {
        title: { es: "Corrige los vacíos", en: "Correct the gaps" },
        detail: {
          es: "Revisa únicamente lo que faltó o estuvo mal.",
          en: "Review only what was missing or incorrect.",
        },
      },
      {
        title: { es: "Recupera otra vez", en: "Retrieve again" },
        detail: {
          es: "Repite más tarde sin convertirlo en relectura.",
          en: "Repeat later without turning it into rereading.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Estudio fundamental", en: "Foundational study" },
        title: "Test-Enhanced Learning",
        authors: "Roediger & Karpicke",
        year: "2006",
        note: {
          es: "Compara evaluación y reestudio para retención a largo plazo.",
          en: "Compares testing and restudy for long-term retention.",
        },
        url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
      },
      {
        kind: { es: "Estudio experimental", en: "Experimental study" },
        title: "Repeated Retrieval During Learning",
        authors: "Karpicke & Roediger",
        year: "2007",
        note: {
          es: "Muestra la importancia de recuperar repetidamente durante el aprendizaje.",
          en: "Shows the importance of repeated retrieval during learning.",
        },
        url: "https://doi.org/10.1016/j.jml.2006.09.004",
      },
      {
        kind: { es: "Aplicación educativa", en: "Educational application" },
        title: "Retrieval Practice Produces More Learning",
        authors: "Karpicke & Blunt",
        year: "2011",
        note: {
          es: "Compara recuperación activa con mapas conceptuales elaborativos.",
          en: "Compares retrieval practice with elaborative concept mapping.",
        },
        url: "https://doi.org/10.1126/science.1199327",
      },
      {
        kind: { es: "Revisión moderna", en: "Modern review" },
        title: "The Science of Effective Learning",
        authors: "Carpenter, Pan & Butler",
        year: "2022",
        note: {
          es: "Revisa recuperación y espaciado en contextos educativos aplicados.",
          en: "Reviews retrieval and spacing in applied educational settings.",
        },
        url: "https://doi.org/10.1038/s44159-022-00089-1",
      },
    ],
  },
  {
    id: "spaced-practice",
    order: 5,
    title: { es: "Práctica espaciada", en: "Spaced Practice" },
    authors: "Cepeda, Pashler, Vul, Wixted y Rohrer",
    initials: "CP",
    attributionType: "research-group",
    attribution: {
      es: "Respaldado por múltiples grupos de investigación",
      en: "Supported by multiple research groups",
    },
    evidenceLevel: { es: "Evidencia alta", en: "High evidence" },
    summary: {
      es: "Distribuye el estudio durante varios días para recordar durante más tiempo.",
      en: "Distribute study across several days to remember for longer.",
    },
    journalIntro: {
      es: "Reemplaza una sesión maratónica por encuentros breves y planificados con el mismo contenido.",
      en: "Replace one marathon session with short, planned encounters with the same material.",
    },
    archiveNote: {
      es: "El intervalo ideal depende de cuánto tiempo quieras conservar el conocimiento. La regla segura es evitar concentrarlo todo en un día.",
      en: "The ideal interval depends on how long you need the knowledge. The safe rule is to avoid concentrating everything in one day.",
    },
    steps: [
      {
        title: { es: "Define la fecha final", en: "Set the target date" },
        detail: {
          es: "Decide cuándo necesitarás recordar el contenido.",
          en: "Decide when you will need to remember the content.",
        },
      },
      {
        title: { es: "Divide el material", en: "Divide the material" },
        detail: {
          es: "Crea unidades pequeñas que puedan revisarse rápidamente.",
          en: "Create small units that can be reviewed quickly.",
        },
      },
      {
        title: { es: "Haz una primera sesión", en: "Complete session one" },
        detail: {
          es: "Comprende y recupera las ideas principales.",
          en: "Understand and retrieve the main ideas.",
        },
      },
      {
        title: { es: "Programa el regreso", en: "Schedule the return" },
        detail: {
          es: "Coloca la próxima revisión en otro día.",
          en: "Place the next review on another day.",
        },
      },
      {
        title: { es: "Empieza recordando", en: "Begin by recalling" },
        detail: {
          es: "Intenta responder antes de releer.",
          en: "Try to answer before rereading.",
        },
      },
      {
        title: { es: "Ajusta el intervalo", en: "Adjust the interval" },
        detail: {
          es: "Acorta si fallas mucho y alarga si recuerdas bien.",
          en: "Shorten it after many errors and lengthen it after strong recall.",
        },
      },
      {
        title: { es: "Mantén pocas revisiones", en: "Keep reviews lean" },
        detail: {
          es: "Prioriza calidad de recuperación sobre horas acumuladas.",
          en: "Prioritize retrieval quality over accumulated hours.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Síntesis cuantitativa", en: "Quantitative synthesis" },
        title: "Distributed Practice in Verbal Recall Tasks",
        authors: "Cepeda, Pashler, Vul, Wixted & Rohrer",
        year: "2006",
        note: {
          es: "Revisión amplia del efecto del espaciado en memoria verbal.",
          en: "A broad review of spacing effects in verbal memory.",
        },
        url: "https://doi.org/10.1037/0033-2909.132.3.354",
      },
      {
        kind: { es: "Revisión aplicada", en: "Applied review" },
        title: "Spaced Repetition Promotes Efficient Learning",
        authors: "Sean H. K. Kang",
        year: "2016",
        note: {
          es: "Traduce la evidencia del espaciado a decisiones educativas.",
          en: "Translates spacing evidence into educational decisions.",
        },
        url: "https://doi.org/10.1177/2372732215624708",
      },
      {
        kind: { es: "Revisión moderna", en: "Modern review" },
        title: "The Science of Effective Learning",
        authors: "Carpenter, Pan & Butler",
        year: "2022",
        note: {
          es: "Integra evidencia sobre espaciado, recuperación y metacognición.",
          en: "Integrates evidence on spacing, retrieval and metacognition.",
        },
        url: "https://doi.org/10.1038/s44159-022-00089-1",
      },
    ],
  },
  {
    id: "successive-relearning",
    order: 6,
    title: { es: "Reaprendizaje sucesivo", en: "Successive Relearning" },
    authors: "Katherine Rawson y John Dunlosky",
    initials: "RD",
    attributionType: "developed-by",
    attribution: {
      es: "Desarrollado por Rawson, Dunlosky y colaboradores",
      en: "Developed by Rawson, Dunlosky and colleagues",
    },
    evidenceLevel: { es: "Evidencia alta", en: "High evidence" },
    summary: {
      es: "Combina recuperación correcta y sesiones espaciadas para mantener el conocimiento.",
      en: "Combine correct retrieval and spaced sessions to maintain knowledge.",
    },
    journalIntro: {
      es: "No termines una revisión al reconocer la respuesta. Recupérala correctamente y vuelve a hacerlo en días distintos.",
      en: "Do not finish a review when the answer merely feels familiar. Retrieve it correctly and do it again on different days.",
    },
    archiveNote: {
      es: "Este flujo combina dos ingredientes con amplio respaldo: recuperación con feedback y práctica distribuida.",
      en: "This workflow combines two well-supported ingredients: retrieval with feedback and distributed practice.",
    },
    image: "/methods/katherine-rawson.webp",
    secondaryImage: "/methods/john-dunlosky.webp",
    imageAlt: {
      es: "Retrato de Katherine Rawson",
      en: "Portrait of Katherine Rawson",
    },
    secondaryImageAlt: {
      es: "Retrato de John Dunlosky",
      en: "Portrait of John Dunlosky",
    },
    imageCredit: "Katherine Rawson y John Dunlosky",
    steps: [
      {
        title: {
          es: "Crea unidades recuperables",
          en: "Create retrievable units",
        },
        detail: {
          es: "Convierte conceptos en preguntas con respuestas verificables.",
          en: "Turn concepts into questions with checkable answers.",
        },
      },
      {
        title: { es: "Intenta responder", en: "Attempt an answer" },
        detail: {
          es: "Recupera sin mirar la fuente.",
          en: "Retrieve without looking at the source.",
        },
      },
      {
        title: { es: "Comprueba enseguida", en: "Check immediately" },
        detail: {
          es: "Confirma la respuesta y corrige errores.",
          en: "Confirm the answer and correct errors.",
        },
      },
      {
        title: { es: "Alcanza el criterio", en: "Reach the criterion" },
        detail: {
          es: "Continúa hasta producir una respuesta correcta.",
          en: "Continue until you produce a correct answer.",
        },
      },
      {
        title: { es: "Termina la sesión", en: "End the session" },
        detail: {
          es: "Evita repetir mecánicamente después del acierto.",
          en: "Avoid mechanical repetition after success.",
        },
      },
      {
        title: { es: "Regresa otro día", en: "Return another day" },
        detail: {
          es: "Recupera nuevamente después de un intervalo.",
          en: "Retrieve again after an interval.",
        },
      },
      {
        title: {
          es: "Completa varias sesiones",
          en: "Complete several sessions",
        },
        detail: {
          es: "Mantén el ciclo hasta recordar de forma durable.",
          en: "Maintain the cycle until recall becomes durable.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Estudio experimental", en: "Experimental study" },
        title: "Optimizing Schedules of Retrieval Practice",
        authors: "Rawson & Dunlosky",
        year: "2011",
        note: {
          es: "Examina cuánto reaprendizaje produce retención durable y eficiente.",
          en: "Examines how much relearning supports durable, efficient retention.",
        },
        url: "https://pubmed.ncbi.nlm.nih.gov/21707204/",
      },
      {
        kind: { es: "Aplicación en cursos", en: "Course application" },
        title: "The Power of Successive Relearning",
        authors: "Rawson, Dunlosky & Sciartelli",
        year: "2013",
        note: {
          es: "Evalúa rendimiento en exámenes y retención a largo plazo.",
          en: "Evaluates course exams and long-term retention.",
        },
        url: "https://eric.ed.gov/?id=EJ1036741",
      },
      {
        kind: { es: "Revisión contemporánea", en: "Contemporary review" },
        title: "Successive Relearning",
        authors: "Rawson & Dunlosky",
        year: "2022",
        note: {
          es: "Resume la potencia, eficiencia y aplicación real del método.",
          en: "Reviews the method's potency, efficiency and real-world use.",
        },
        url: "https://doi.org/10.1177/09637214221100484",
      },
    ],
  },
  {
    id: "interleaved-practice",
    order: 7,
    title: { es: "Práctica intercalada", en: "Interleaved Practice" },
    authors: "Doug Rohrer y Kelli Taylor",
    initials: "RT",
    attributionType: "research-group",
    attribution: {
      es: "Investigado por Rohrer, Taylor y otros equipos",
      en: "Researched by Rohrer, Taylor and other teams",
    },
    evidenceLevel: {
      es: "Respaldo sólido con límites",
      en: "Solid support with boundaries",
    },
    summary: {
      es: "Mezcla problemas relacionados para aprender a elegir el procedimiento correcto.",
      en: "Mix related problems so you learn to choose the correct procedure.",
    },
    journalIntro: {
      es: "Practica categorías parecidas en orden mezclado para entrenar identificación, comparación y decisión.",
      en: "Practise related categories in mixed order to train identification, comparison and decision.",
    },
    archiveNote: {
      es: "Intercalar no significa mezclar temas aleatorios. Los elementos deben estar relacionados y exigir decisiones que valga la pena distinguir.",
      en: "Interleaving does not mean mixing random subjects. Items should be related and require meaningful discrimination.",
    },
    steps: [
      {
        title: {
          es: "Elige habilidades relacionadas",
          en: "Choose related skills",
        },
        detail: {
          es: "Selecciona dos a cuatro categorías que puedan confundirse.",
          en: "Select two to four categories that could be confused.",
        },
      },
      {
        title: { es: "Aprende cada base", en: "Learn each foundation" },
        detail: {
          es: "Comprende primero el procedimiento de cada categoría.",
          en: "First understand the procedure for each category.",
        },
      },
      {
        title: { es: "Crea una mezcla", en: "Create a mix" },
        detail: {
          es: "Alterna ejercicios sin agruparlos por tipo.",
          en: "Alternate exercises without grouping them by type.",
        },
      },
      {
        title: {
          es: "Identifica antes de resolver",
          en: "Identify before solving",
        },
        detail: {
          es: "Nombra qué clase de problema tienes delante.",
          en: "Name the kind of problem in front of you.",
        },
      },
      {
        title: { es: "Elige el procedimiento", en: "Choose the procedure" },
        detail: {
          es: "Decide qué estrategia corresponde y explica por qué.",
          en: "Decide which strategy applies and explain why.",
        },
      },
      {
        title: { es: "Comprueba la decisión", en: "Check the decision" },
        detail: {
          es: "Revisa tanto el resultado como la estrategia elegida.",
          en: "Review both the result and the chosen strategy.",
        },
      },
      {
        title: {
          es: "Reordena la próxima práctica",
          en: "Reshuffle next time",
        },
        detail: {
          es: "Cambia la secuencia para evitar memorizar el orden.",
          en: "Change the sequence to avoid memorizing the order.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Estudio fundamental", en: "Foundational study" },
        title: "The Shuffling of Mathematics Practice Problems",
        authors: "Doug Rohrer & Kelli Taylor",
        year: "2007",
        note: {
          es: "Compara práctica bloqueada e intercalada en matemáticas.",
          en: "Compares blocked and interleaved mathematics practice.",
        },
        url: "https://digitalcommons.usf.edu/psy_facpub/1767/",
      },
      {
        kind: { es: "Revisión comparativa", en: "Comparative review" },
        title: "Improving Students' Learning",
        authors: "Dunlosky et al.",
        year: "2013",
        note: {
          es: "Clasifica el intercalado como prometedor con utilidad moderada.",
          en: "Rates interleaving as promising with moderate utility.",
        },
        url: "https://doi.org/10.1177/1529100612453266",
      },
      {
        kind: { es: "Aplicación en cursos", en: "Course application" },
        title: "Distributed Concept Reviews Improve Exam Performance",
        authors: "Teaching of Psychology",
        year: "2017",
        note: {
          es: "Examina revisiones distribuidas con contenido intercalado.",
          en: "Examines distributed reviews using interleaved content.",
        },
        url: "https://doi.org/10.1177/0098628316677646",
      },
    ],
  },
  {
    id: "self-explanation",
    order: 8,
    title: { es: "Autoexplicación", en: "Self-Explanation" },
    authors: "Michelene Chi y colaboradores",
    initials: "MC",
    attributionType: "research-group",
    attribution: {
      es: "Investigado por Michelene Chi y colaboradores",
      en: "Researched by Michelene Chi and colleagues",
    },
    evidenceLevel: {
      es: "Respaldo sólido con límites",
      en: "Solid support with boundaries",
    },
    summary: {
      es: "Explica por qué funciona cada paso para construir comprensión, no solo imitación.",
      en: "Explain why each step works to build understanding, not just imitation.",
    },
    journalIntro: {
      es: "Mientras estudias un ejemplo, conecta cada paso con el principio que lo justifica y con lo que ya sabes.",
      en: "While studying an example, connect every step to the principle behind it and to what you already know.",
    },
    archiveNote: {
      es: "La autoexplicación es especialmente útil con ejemplos resueltos, textos explicativos y procedimientos técnicos.",
      en: "Self-explanation is especially useful with worked examples, explanatory text and technical procedures.",
    },
    image: "/methods/michelene-chi.webp",
    imageAlt: {
      es: "Retrato de Michelene Chi",
      en: "Portrait of Michelene Chi",
    },
    imageCredit: "Michelene Chi",
    steps: [
      {
        title: { es: "Elige un ejemplo", en: "Choose an example" },
        detail: {
          es: "Trabaja con una solución o explicación correcta.",
          en: "Work with a correct solution or explanation.",
        },
      },
      {
        title: { es: "Avanza paso a paso", en: "Move step by step" },
        detail: {
          es: "No leas toda la solución de una sola vez.",
          en: "Do not read the whole solution at once.",
        },
      },
      {
        title: { es: "Pregunta por qué", en: "Ask why" },
        detail: {
          es: "Explica la razón de cada decisión.",
          en: "Explain the reason behind each decision.",
        },
      },
      {
        title: { es: "Conecta conocimientos", en: "Connect knowledge" },
        detail: {
          es: "Relaciona el paso con una regla o idea previa.",
          en: "Connect the step with a previous rule or idea.",
        },
      },
      {
        title: { es: "Predice lo siguiente", en: "Predict what comes next" },
        detail: {
          es: "Antes de mirar, anticipa el próximo paso.",
          en: "Before looking, anticipate the next step.",
        },
      },
      {
        title: { es: "Detecta contradicciones", en: "Find contradictions" },
        detail: {
          es: "Marca lo que no encaje con tu explicación.",
          en: "Mark anything that does not fit your explanation.",
        },
      },
      {
        title: { es: "Resuelve uno nuevo", en: "Solve a new one" },
        detail: {
          es: "Transfiere la explicación a un problema parecido.",
          en: "Transfer the explanation to a similar problem.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Estudio fundamental", en: "Foundational study" },
        title: "Self-Explanations",
        authors: "Chi, Bassok, Lewis, Reimann & Glaser",
        year: "1989",
        note: {
          es: "Analiza cómo estudiantes explican y usan ejemplos de física.",
          en: "Examines how students explain and use physics examples.",
        },
        url: "https://doi.org/10.1207/s15516709cog1302_1",
      },
      {
        kind: { es: "Estudio de seguimiento", en: "Follow-up study" },
        title: "Eliciting Self-Explanations Improves Understanding",
        authors: "Chi et al.",
        year: "1994",
        note: {
          es: "Evalúa indicaciones explícitas para generar autoexplicaciones.",
          en: "Evaluates explicit prompts for producing self-explanations.",
        },
        url: "https://www.public.asu.edu/~mtchi/papers/Self-explanations94.pdf",
      },
      {
        kind: { es: "Revisión comparativa", en: "Comparative review" },
        title: "Improving Students' Learning",
        authors: "Dunlosky et al.",
        year: "2013",
        note: {
          es: "Revisa su utilidad en distintas edades y materias.",
          en: "Reviews its utility across ages and subject areas.",
        },
        url: "https://doi.org/10.1177/1529100612453266",
      },
    ],
  },
  {
    id: "worked-examples",
    order: 9,
    title: {
      es: "Ejemplos resueltos y práctica gradual",
      en: "Worked Examples and Faded Practice",
    },
    authors: "John Sweller y Graham Cooper",
    initials: "SC",
    attributionType: "research-group",
    attribution: {
      es: "Investigado por Sweller, Cooper y otros equipos",
      en: "Researched by Sweller, Cooper and other teams",
    },
    evidenceLevel: {
      es: "Respaldo sólido para principiantes",
      en: "Solid support for beginners",
    },
    summary: {
      es: "Estudia una solución completa y retira la ayuda gradualmente hasta resolver solo.",
      en: "Study a complete solution and gradually remove support until you solve independently.",
    },
    journalIntro: {
      es: "Reduce la carga inicial: observa el proceso correcto, completa pasos faltantes y termina con práctica independiente.",
      en: "Reduce the initial load: observe the correct process, complete missing steps and finish with independent practice.",
    },
    archiveNote: {
      es: "La estrategia es más útil para principiantes. A medida que aumenta la experiencia, la ayuda debe retirarse para evitar dependencia.",
      en: "The strategy is most useful for beginners. As expertise grows, support should fade to avoid dependence.",
    },
    image: "/methods/john-sweller.webp",
    imageAlt: {
      es: "Retrato de John Sweller",
      en: "Portrait of John Sweller",
    },
    imageCredit: "John Sweller",
    steps: [
      {
        title: {
          es: "Elige un ejemplo correcto",
          en: "Choose a correct example",
        },
        detail: {
          es: "Usa una solución clara y representativa.",
          en: "Use a clear, representative solution.",
        },
      },
      {
        title: { es: "Define el objetivo", en: "Define the goal" },
        detail: {
          es: "Aclara qué procedimiento aprenderás.",
          en: "Clarify which procedure you will learn.",
        },
      },
      {
        title: { es: "Sigue cada paso", en: "Follow every step" },
        detail: {
          es: "Identifica qué se hizo y en qué orden.",
          en: "Identify what was done and in what order.",
        },
      },
      {
        title: { es: "Explica las decisiones", en: "Explain the decisions" },
        detail: {
          es: "Describe por qué cada paso es necesario.",
          en: "Describe why each step is necessary.",
        },
      },
      {
        title: {
          es: "Completa un ejemplo parcial",
          en: "Complete a partial example",
        },
        detail: {
          es: "Resuelve las partes que fueron retiradas.",
          en: "Solve the parts that were removed.",
        },
      },
      {
        title: { es: "Reduce la ayuda", en: "Fade the support" },
        detail: {
          es: "Usa progresivamente menos pistas.",
          en: "Use progressively fewer prompts.",
        },
      },
      {
        title: {
          es: "Resuelve de forma independiente",
          en: "Solve independently",
        },
        detail: {
          es: "Aplica el procedimiento a un caso nuevo.",
          en: "Apply the procedure to a new case.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Estudio fundamental", en: "Foundational study" },
        title: "The Use of Worked Examples in Learning Algebra",
        authors: "Sweller & Cooper",
        year: "1985",
        note: {
          es: "Compara ejemplos resueltos y resolución convencional de problemas.",
          en: "Compares worked examples with conventional problem solving.",
        },
        url: "https://doi.org/10.1207/s1532690xci0201_3",
      },
      {
        kind: { es: "Revisión académica", en: "Academic review" },
        title: "Learning from Examples",
        authors: "Atkinson, Derry, Renkl & Wortham",
        year: "2000",
        note: {
          es: "Sintetiza principios instruccionales derivados de esta investigación.",
          en: "Synthesizes instructional principles from worked-example research.",
        },
        url: "https://doi.org/10.3102/00346543070002181",
      },
      {
        kind: { es: "Guía aplicada", en: "Applied guidance" },
        title: "Cognitive Load Theory in Professional Education",
        authors: "van Merriënboer & Sweller",
        year: "2010",
        note: {
          es: "Incluye ejemplos, tareas de completar y progresión simple a compleja.",
          en: "Includes examples, completion tasks and simple-to-complex progression.",
        },
        url: "https://pubmed.ncbi.nlm.nih.gov/20078759/",
      },
    ],
  },
  {
    id: "woop-mcii",
    order: 10,
    title: {
      es: "WOOP y plan antidistracción",
      en: "WOOP and Anti-Distraction Plan",
    },
    authors: "Gabriele Oettingen y Peter Gollwitzer",
    initials: "OG",
    attributionType: "developed-by",
    attribution: {
      es: "Desarrollado por Oettingen, Gollwitzer y colaboradores",
      en: "Developed by Oettingen, Gollwitzer and colleagues",
    },
    evidenceLevel: {
      es: "Respaldo sólido para autorregulación",
      en: "Solid support for self-regulation",
    },
    summary: {
      es: "Convierte un objetivo de estudio y su principal distracción en un plan concreto de respuesta.",
      en: "Turn a study goal and its main distraction into a concrete response plan.",
    },
    journalIntro: {
      es: "Combina deseo, resultado, obstáculo y un plan si-entonces para empezar y volver cuando internet te saque del camino.",
      en: "Combine wish, outcome, obstacle and an if-then plan to start and return when the internet pulls you away.",
    },
    archiveNote: {
      es: "WOOP ayuda a ejecutar objetivos; no reemplaza las técnicas que fortalecen memoria o comprensión. Su papel es proteger el comportamiento de estudio.",
      en: "WOOP helps execute goals; it does not replace techniques that strengthen memory or understanding. Its role is protecting study behaviour.",
    },
    image: "/methods/gabriele-oettingen.webp",
    imageAlt: {
      es: "Retrato de Gabriele Oettingen",
      en: "Portrait of Gabriele Oettingen",
    },
    imageCredit: "Gabriele Oettingen",
    steps: [
      {
        title: { es: "Deseo", en: "Wish" },
        detail: {
          es: "Elige un objetivo importante, posible y específico.",
          en: "Choose an important, feasible and specific goal.",
        },
      },
      {
        title: { es: "Resultado", en: "Outcome" },
        detail: {
          es: "Imagina el mejor resultado de completarlo.",
          en: "Imagine the best result of completing it.",
        },
      },
      {
        title: { es: "Obstáculo", en: "Obstacle" },
        detail: {
          es: "Identifica el hábito interno que más te detiene.",
          en: "Identify the internal habit that most often stops you.",
        },
      },
      {
        title: { es: "Nombra la señal", en: "Name the cue" },
        detail: {
          es: "Define cuándo aparece la distracción.",
          en: "Define when the distraction appears.",
        },
      },
      {
        title: { es: "Crea un plan si-entonces", en: "Create an if-then plan" },
        detail: {
          es: "Si ocurre la señal, entonces ejecutaré una acción concreta.",
          en: "If the cue occurs, then I will perform one concrete action.",
        },
      },
      {
        title: { es: "Reduce la fricción", en: "Reduce friction" },
        detail: {
          es: "Prepara bloqueadores, materiales y entorno antes de empezar.",
          en: "Prepare blockers, materials and environment before starting.",
        },
      },
      {
        title: { es: "Ejecuta y revisa", en: "Act and review" },
        detail: {
          es: "Usa el plan durante una sesión y ajústalo con lo observado.",
          en: "Use the plan for one session and adjust it from what happened.",
        },
      },
    ],
    sources: [
      {
        kind: { es: "Estudio académico", en: "Academic study" },
        title: "From Fantasy to Action",
        authors: "Duckworth, Kirby, Gollwitzer & Oettingen",
        year: "2013",
        note: {
          es: "Examina MCII y rendimiento académico.",
          en: "Examines MCII and academic performance.",
        },
        url: "https://doi.org/10.1177/1948550613476307",
      },
      {
        kind: { es: "Gestión del tiempo", en: "Time management" },
        title: "Self-Regulation of Time Management",
        authors: "Oettingen, Kappes, Gollwitzer et al.",
        year: "2015",
        note: {
          es: "Aplica contraste mental y planes de implementación a problemas académicos.",
          en: "Applies mental contrasting and implementation plans to academic problems.",
        },
        url: "https://doi.org/10.1002/ejsp.2090",
      },
      {
        kind: { es: "Estudiantes universitarios", en: "University students" },
        title: "MCII Increases Study Time",
        authors: "Duckworth et al.",
        year: "2020",
        note: {
          es: "Evalúa la estrategia en objetivos académicos universitarios.",
          en: "Evaluates the strategy for university academic goals.",
        },
        url: "https://pubmed.ncbi.nlm.nih.gov/33315247/",
      },
      {
        kind: { es: "Ensayo contemporáneo", en: "Contemporary trial" },
        title: "MCII to Curb Academic Procrastination",
        authors: "Randomized trial",
        year: "2026",
        note: {
          es: "Prueba la intervención frente a procrastinación académica.",
          en: "Tests the intervention against academic procrastination.",
        },
        url: "https://pubmed.ncbi.nlm.nih.gov/41601124/",
      },
    ],
  },
];
