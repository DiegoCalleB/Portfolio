/**
 * Única fuente de verdad del portfolio. La web y Eco leen de aquí, así nunca se contradicen.
 * Regla: solo datos verificados del CV. Nada de teléfono ni datos familiares (la web es pública).
 */
export type Lang = 'es' | 'en';
type T = Record<Lang, string>;

export const contacto = {
  nombre: 'Diego de la Calle Berzal',
  email: 'diego.delacalleb@gmail.com',
  linkedin: 'https://www.linkedin.com/in/diego-de-la-calle-berzal/',
  ciudad: { es: 'Madrid, España', en: 'Madrid, Spain' } as T,
  cv: { es: '/cv/CV_Diego_de_la_Calle_Berzal_ES.pdf', en: '/cv/CV_Diego_de_la_Calle_Berzal_English.pdf' } as T,
};

export const hero = {
  cargo: { es: 'Head of Data & AI · Agentes de IA y full stack', en: 'Head of Data & AI · AI agents & full stack' } as T,
  titular: {
    es: '18 años automatizando negocio real. Ahora, con agentes de IA.',
    en: '18 years automating real business. Now, with AI agents.',
  } as T,
  bajada: {
    es: 'Dirijo Data & AI en promoCAR (Kantar Insights), donde sigo programando, y fuera de la oficina construyo productos con IA de principio a fin.',
    en: 'I lead Data & AI at promoCAR (Kantar Insights), where I still code, and outside the office I build AI products end to end.',
  } as T,
  destacado: { es: 'con agentes de IA.', en: 'with AI agents.' } as T,
};

export const contadores: { valor: number; mas?: boolean; etiqueta: T }[] = [
  { valor: 17, etiqueta: { es: 'años en promoCAR', en: 'years at promoCAR' } },
  { valor: 20, mas: true, etiqueta: { es: 'mercados de mystery shopping', en: 'mystery-shopping markets' } },
  { valor: 6, etiqueta: { es: 'apps migradas de Access a Python', en: 'apps migrated from Access to Python' } },
  { valor: 2, etiqueta: { es: 'productos con IA en producción', en: 'AI products in production' } },
];

/** Cinta de tecnologías: solo las que aparecen en el CV. */
export const ticker = ['Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'FastAPI', 'pandas', 'SQL Server', 'PostgreSQL', 'Supabase', 'pgvector', 'Gemini', 'Claude', 'OpenAI', 'Replicate', 'ElevenLabs', 'Azure AI', 'Power BI', 'Claude Code', 'Vercel', 'Railway', 'Playwright', 'Vitest', 'GitHub Actions', 'Stripe'];

/** promoCAR: el alcance de la responsabilidad técnica. Sin cifras ni nombres de clientes. */
export const responsabilidad = {
  titulo: { es: 'Responsable técnico de todo el desarrollo', en: 'Technical owner of all development' } as T,
  intro: {
    es: 'Analista programador de la empresa: del análisis al despliegue, en back y en front, con todas las bases de datos SQL Server.',
    en: "The company's analyst programmer: from analysis to deployment, back end and front end, with all the SQL Server databases.",
  } as T,
  modulos: ['Monitor', 'Analizar', 'Shopper', 'Leaser'],
  puntos: [
    { es: 'Todas las aplicaciones y webs, internas y de cliente', en: 'All applications and websites, internal and client-facing' },
    { es: 'Informes y cuadros de mando para clientes', en: 'Client reports and dashboards' },
    { es: 'Todas las bases de datos SQL Server del negocio', en: "All of the business's SQL Server databases" },
    { es: 'Decisiones técnicas importantes', en: 'Important technical decisions' },
    { es: 'Solución a los problemas que surgen en el día a día', en: 'Solutions to the problems that come up day to day' },
    { es: 'Coordinación de las empresas externas: control, decisiones y soluciones', en: 'Coordination of external firms: control, decisions and solutions' },
    { es: 'Incidencias de todo tipo, internas y de cliente', en: 'Incidents of every kind, internal and client-facing' },
  ] as T[],
};

/** promoCAR: 17 años de experiencia contados como casos (sin nombres de clientes, por confidencialidad). */
export const casosPromocar: { titulo: T; problema: T; solucion: T; resultado: T; stack: string[] }[] = [
  {
    titulo: { es: 'De Access a Python con IA', en: 'From Access to Python with AI' },
    problema: { es: 'Aplicaciones críticas en Access y VBA: lentas de ejecutar y arriesgadas de cambiar.', en: 'Critical apps in Access and VBA: slow to run and risky to change.' },
    solucion: { es: 'Migración de 6 aplicaciones a Python (pandas, FastAPI, openpyxl) con Claude Code y tests unitarios.', en: 'Migrated 6 applications to Python (pandas, FastAPI, openpyxl) with Claude Code and unit tests.' },
    resultado: { es: 'Procesos de varias horas que ahora tardan minutos, y cambios más rápidos y seguros.', en: 'Processes that took hours now take minutes, and changes are faster and safer.' },
    stack: ['Python', 'pandas', 'FastAPI', 'Claude Code'],
  },
  {
    titulo: { es: 'Inteligencia de mercado en más de 20 mercados', en: 'Market intelligence across 20+ markets' },
    problema: { es: 'Las marcas necesitan saber qué ofrece la competencia en cada concesionario: promociones, descuentos y financiación.', en: 'Brands need to know what competitors offer at each dealership: promotions, discounts and financing.' },
    solucion: { es: 'Cálculos de beneficio promocional, igualación de cuotas y alertas sobre datos de mystery shopping, con SQL Server, web scraping y procesos ETL.', en: 'Promotional-benefit, payment-equalisation and alert calculations on mystery-shopping data, with SQL Server, web scraping and ETL.' },
    resultado: { es: 'Cuadros de mando en Power BI y aplicaciones web para los principales grupos de automoción.', en: 'Power BI dashboards and web apps for leading automotive groups.' },
    stack: ['SQL Server', 'ASP.NET', 'Power BI', 'ETL', 'Web scraping'],
  },
  {
    titulo: { es: 'IA aplicada al negocio', en: 'AI applied to the business' },
    problema: { es: 'Mucha información llega en documentos y textos que alguien tenía que revisar a mano.', en: 'Lots of information arrives as documents and text someone had to review by hand.' },
    solucion: { es: 'Estrategia de IA de la empresa, OCR e IA documental (Azure AI) para las ofertas de concesionarios y APIs de LLM (Claude y OpenAI) para enriquecer y validar datos.', en: "The company's AI strategy, OCR and document AI (Azure AI) for dealer offers, and LLM APIs (Claude and OpenAI) to enrich and validate data." },
    resultado: { es: 'IA solo donde aporta valor, con supervisión humana y aplicaciones web internas y para clientes.', en: 'AI only where it adds value, with human oversight, plus internal and client-facing web apps.' },
    stack: ['Azure AI', 'Claude', 'OpenAI', 'Antigravity'],
  },
];

export type Proyecto = {
  id: string; nombre: string; url?: string; etiqueta: T; periodo: string;
  problema: T; solucion: T; resultado: T; stack: string[]; img?: string; imgMovil?: string;
};

export const proyectos: Proyecto[] = [
  {
    id: 'bandmanager', nombre: 'BandManager.io', url: 'https://bandmanager.io', periodo: '2026',
    etiqueta: { es: 'Proyecto final del Máster de Desarrollo con IA', en: "Final project, Master's in AI Development" },
    problema: {
      es: 'Las bandas pierden horas buscando salas y festivales y escribiendo correos que nadie contesta.',
      en: 'Bands lose hours hunting for venues and festivals and writing emails nobody answers.',
    },
    solucion: {
      es: 'Agentes de IA que descubren salas, redactan el correo y leen las respuestas. El artista aprueba antes de enviar. Un juez LLM puntúa cada borrador (aprueba con 85/100) y detecta datos inventados; un sistema RAG con pgvector reutiliza los correos que mejor han funcionado.',
      en: 'AI agents that discover venues, draft the email and read the replies. The artist approves before anything is sent. An LLM judge scores every draft (pass at 85/100) and flags fabricated data; a RAG system with pgvector reuses the best-performing emails.',
    },
    resultado: {
      es: 'En uso con los primeros artistas. Seguridad desde el diseño (OWASP Top 10 y OWASP para LLM): aislamiento por banda con RLS, defensa contra prompt injection, protección SSRF y escaneo de secretos en CI.',
      en: 'In use with its first artists. Security by design (OWASP Top 10 and OWASP for LLMs): per-band isolation with RLS, prompt-injection defense, SSRF protection and secret scanning in CI.',
    },
    stack: ['TypeScript', 'React 19', 'Express', 'Supabase', 'pgvector', 'Gemini', 'Replicate', 'fal.ai', 'Stripe', 'Railway', 'GitHub Actions'],
    img: '/img/bandmanager.webp', imgMovil: '/img/bandmanager-movil.webp',
  },
  {
    id: 'lineamagica', nombre: 'Línea Mágica', url: 'https://www.lineamagica.es', periodo: '2026',
    etiqueta: { es: 'Producto publicado · España y Latinoamérica', en: 'Live product · Spain and Latin America' },
    problema: {
      es: 'La magia de la Navidad dura poco y las cartas no contestan.',
      en: "Christmas magic doesn't last and letters never write back.",
    },
    solucion: {
      es: 'Una web en la que madres y padres contestan en directo desde el móvil como Papá Noel, los Reyes Magos, el Ratoncito Pérez o un elfo travieso, en un chat privado con su peque.',
      en: 'A web app where parents reply live from their phone as Santa Claus, the Three Wise Men, the Tooth Mouse or a mischievous elf, in a private chat with their child.',
    },
    resultado: {
      es: 'Pagos con Stripe (prueba de 3 días y pase de temporada) y privacidad desde el diseño: sin registro, solo el nombre de pila y borrado automático a los 45 días.',
      en: 'Stripe payments (3-day trial and a seasonal pass) and privacy by design: no sign-up, first name only, auto-deletion after 45 days.',
    },
    stack: ['Next.js', 'Stripe', 'Railway'],
    img: '/img/lineamagica.webp', imgMovil: '/img/lineamagica-movil.webp',
  },
];

/** Laboratorio: añade `url` cuando Diego pase los enlaces. */
export const laboratorio: { nombre: T; desc: T; url?: string; nota?: T }[] = [
  { nombre: { es: 'Gestión de restaurantes con IA', en: 'AI restaurant management' }, desc: { es: 'Albaranes y escandallos.', en: 'Delivery notes and recipe costing.' } },
  { nombre: { es: 'Espejo virtual', en: 'Virtual mirror' }, desc: { es: 'Para barberías.', en: 'For barbershops.' } },
  { nombre: { es: 'Tareas del hogar', en: 'Household tasks' }, desc: { es: 'Para organizar la casa en familia.', en: 'To run the home as a family.' } },
  { nombre: { es: 'Scroll Challenge', en: 'Scroll Challenge' }, desc: { es: 'Juego para móvil.', en: 'Mobile game.' }, nota: { es: 'En Google Play', en: 'On Google Play' } },
  { nombre: { es: 'Six Seven y La Cueva', en: 'Six Seven and La Cueva' }, desc: { es: 'Juegos web.', en: 'Web games.' } },
];

/** `anos` alimenta la Onda (altura de cada barra = años reales en la etapa). */
export type Etapa = { periodo: T; anos: number; cargo: T; empresa: string; puntos: T[] };

export const trayectoria: Etapa[] = [
  {
    periodo: { es: 'Ene 2026 – actualidad', en: 'Jan 2026 – present' }, anos: 1, empresa: 'promoCAR (Kantar Insights)',
    cargo: { es: 'Head of Data & AI · Analista programador full stack', en: 'Head of Data & AI · Full-stack analyst programmer' },
    puntos: [
      { es: 'Defino e implanto la estrategia de IA de la empresa, aplicándola solo donde aporta valor.', en: "I define and roll out the company's AI strategy, applying it only where it adds value." },
      { es: 'Migración de 6 aplicaciones de Access y VBA a Python (pandas, FastAPI, openpyxl) con Claude Code: procesos de varias horas que ahora tardan minutos y cambios más seguros gracias a los tests unitarios.', en: 'Migrated 6 Access and VBA applications to Python (pandas, FastAPI, openpyxl) with Claude Code: processes that took hours now take minutes, and changes are safer thanks to unit tests.' },
      { es: 'APIs de LLM (Claude y OpenAI) para generar contenido, enriquecer y validar datos. OCR e IA documental (Azure AI) para extraer datos de ofertas de concesionarios.', en: 'LLM APIs (Claude and OpenAI) to generate content, enrich and validate data. OCR and document AI (Azure AI) to extract data from dealer offers.' },
    ],
  },
  {
    periodo: { es: 'Ene 2013 – Dic 2025', en: 'Jan 2013 – Dec 2025' }, anos: 13, empresa: 'promoCAR (Kantar Insights)',
    cargo: { es: 'Innovation & Development Consultant · Senior Analyst & Developer', en: 'Innovation & Development Consultant · Senior Analyst & Developer' },
    puntos: [
      { es: 'Responsable del desarrollo full stack (back y front) de todas las aplicaciones y webs de la empresa, internas y de cliente, incluidos los módulos Monitor, Analizar, Shopper y Leaser.', en: "Owned the full-stack development (back end and front end) of all the company's applications and websites, internal and client-facing, including the Monitor, Analizar, Shopper and Leaser modules." },
      { es: 'Diseño y administración de todas las bases de datos SQL Server del negocio, con integración de datos por web scraping y procesos ETL.', en: "Designed and managed all of the business's SQL Server databases, with web-scraping data integration and ETL processes." },
      { es: 'Cálculos de beneficio promocional y financiación para analizar datos de mystery shopping en más de 20 mercados, para los principales grupos de automoción.', en: 'Promotional-benefit and financing calculations to analyse mystery-shopping data in 20+ markets, for leading automotive groups.' },
      { es: 'Informes y cuadros de mando en Power BI para clientes.', en: 'Client reports and Power BI dashboards.' },
      { es: 'Decisiones técnicas clave y resolución de todo tipo de incidencias, internas y de cliente.', en: 'Key technical decisions and resolution of all kinds of internal and client incidents.' },
      { es: 'Coordinación técnica de las empresas externas contratadas para ciertos desarrollos: control del proyecto, decisiones y soluciones a los problemas.', en: 'Technical coordination of the external firms hired for certain developments: project control, decisions and solutions to problems.' },
    ],
  },
  {
    periodo: { es: 'Ene 2009 – Ene 2013', en: 'Jan 2009 – Jan 2013' }, anos: 4, empresa: 'promoCAR (Kantar Insights)',
    cargo: { es: 'Programador VBA', en: 'VBA Developer' },
    puntos: [{ es: 'Aplicaciones y automatizaciones en VBA para la operativa e informes para clientes.', en: 'VBA applications and automations for operations and client reports.' }],
  },
  {
    periodo: { es: 'Ene 2007 – Dic 2008', en: 'Jan 2007 – Dec 2008' }, anos: 2, empresa: 'Ministerio de Educación',
    cargo: { es: 'Programador', en: 'Developer' },
    puntos: [{ es: 'Informes y mantenimiento de bases de datos y sitios web con VBA y SQL.', en: 'Reports and maintenance of databases and websites with VBA and SQL.' }],
  },
];

export const formacion: { titulo: T; centro: string; cuando: T }[] = [
  { titulo: { es: 'Máster de Desarrollo con IA', en: "Master's in AI Development" }, centro: 'The Big School', cuando: { es: 'Certificado, noviembre de 2026', en: 'Certificate, November 2026' } },
  { titulo: { es: 'Máster de Marketing Digital con IA', en: "Master's in Digital Marketing with AI" }, centro: 'The Big School', cuando: { es: 'En curso', en: 'In progress' } },
  { titulo: { es: 'Técnico Superior en Desarrollo de Aplicaciones Informáticas', en: 'Higher Technical Diploma in Software Development' }, centro: 'IES Barajas, Madrid', cuando: { es: '2005 – 2007', en: '2005 – 2007' } },
];

export const competencias: { grupo: T; items: string[] }[] = [
  { grupo: { es: 'IA', en: 'AI' }, items: ['Agentes de IA', 'Gemini · Claude · OpenAI', 'RAG y pgvector', 'Replicate · fal.ai · ElevenLabs', 'OCR (Azure AI)', 'Ollama'] },
  { grupo: { es: 'Desarrollo', en: 'Development' }, items: ['Python (pandas, FastAPI)', 'TypeScript', 'React · Next.js', 'Node.js y Express', 'SQL Server', 'PostgreSQL y Supabase', 'ASP.NET y VB.NET'] },
  { grupo: { es: 'Datos', en: 'Data' }, items: ['Power BI', 'ETL', 'Web scraping', 'Data matching'] },
  { grupo: { es: 'Método', en: 'Method' }, items: ['Claude Code · OpenCode', 'Tests (Vitest, Playwright)', 'CI/CD', 'Seguridad desde el diseño (OWASP)'] },
];

export const sobreMi = {
  idiomas: { es: 'Español nativo · Inglés B2 (profesional)', en: 'Spanish (native) · English B2 (professional)' } as T,
  aficiones: { es: 'Música (toco el bajo y el piano), esquí y montaña.', en: 'Music (I play bass and piano), skiing and the mountains.' } as T,
};

/** Ficha que recibe Eco. Se genera de los mismos datos que pinta la web. */
export function fichaParaEco(): string {
  const l: Lang = 'es';
  const lineas = [
    `Nombre: ${contacto.nombre}. Ciudad: ${contacto.ciudad[l]}. Cargo: ${hero.cargo[l]}.`,
    `Resumen: ${hero.titular[l]} ${hero.bajada[l]}`,
    `Contacto público: email ${contacto.email}, LinkedIn ${contacto.linkedin}. El CV se descarga desde esta web.`,
    `Responsabilidad en promoCAR: ${responsabilidad.titulo[l]}. ${responsabilidad.intro[l]} Módulos: ${responsabilidad.modulos.join(', ')}. ${responsabilidad.puntos.map((p) => p[l]).join('; ')}.`,
    'Casos destacados en promoCAR:',
    ...casosPromocar.map((c) => `- ${c.titulo[l]}: ${c.problema[l]} ${c.solucion[l]} ${c.resultado[l]}`),
    'Trayectoria:',
    ...trayectoria.map((e) => `- ${e.periodo[l]}: ${e.cargo[l]} en ${e.empresa}. ${e.puntos.map((p) => p[l]).join(' ')}`),
    'Proyectos propios:',
    ...proyectos.map((p) => `- ${p.nombre} (${p.url}, ${p.etiqueta[l]}): ${p.problema[l]} ${p.solucion[l]} ${p.resultado[l]} Stack: ${p.stack.join(', ')}.`),
    `- Laboratorio de apps con IA: ${laboratorio.map((a) => `${a.nombre[l]} (${a.desc[l]}${a.nota ? ' ' + a.nota[l] : ''})`).join('; ')}.`,
    'Formación:',
    ...formacion.map((f) => `- ${f.titulo[l]}, ${f.centro} (${f.cuando[l]}).`),
    `Competencias: ${competencias.map((c) => `${c.grupo[l]}: ${c.items.join(', ')}`).join('. ')}.`,
    `Idiomas: ${sobreMi.idiomas[l]}. Aficiones: ${sobreMi.aficiones[l]}`,
  ];
  return lineas.join('\n');
}
