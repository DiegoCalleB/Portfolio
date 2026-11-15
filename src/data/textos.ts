import type { Lang } from './perfil';

export const textos = {
  es: {
    nav: { proyectos: 'Proyectos', trayectoria: 'Trayectoria', formacion: 'Formación', contacto: 'Contacto' },
    tema: { light: 'Claro', dark: 'Oscuro', system: 'Sistema' },
    sonido: { si: '♪ Sí', no: '♪ No', titulo: 'Sonido al descargar el CV' },
    cv: 'Descargar CV',
    escribeme: 'Escríbeme',
    eco: {
      saludo: '¡Hola! Soy Eco, el murciélago de BandManager. Pregúntame lo que quieras sobre Diego: proyectos, experiencia, formación…',
      placeholder: 'Pregúntale a Eco sobre Diego',
      enviar: 'Enviar',
      sugerencias: ['¿Qué hace BandManager?', '¿Qué ha hecho en promoCAR?', '¿Cómo usa la IA con seguridad?'],
      pensando: 'Eco está afinando la respuesta…',
      tocar: 'Tocar a Eco',
      error: 'Eco se ha quedado sin cobertura. Mientras tanto, puedes escribir a Diego por LinkedIn.',
      limite: 'Muchas preguntas seguidas. Eco descansa un rato; Diego responde encantado por LinkedIn.',
      aviso: 'Eco responde con los datos de esta web. Puede equivocarse: lo que cuenta es lo que diga Diego.',
    },
    proyectos: { titulo: 'Proyectos propios', sub: 'Construidos de principio a fin, en producción.', problema: 'El problema', solucion: 'Qué construí', resultado: 'Resultado', visitar: 'Visitar', lab: 'Laboratorio de apps con IA', labSub: 'Ideas que pasaron de una tarde a estar publicadas.' },
    trayectoria: { titulo: 'Trayectoria', sub: 'La altura de cada barra son los años en cada etapa.', anos: (n: number) => (n === 1 ? '1 año' : `${n} años`) },
    formacion: { titulo: 'Formación y competencias', idiomas: 'Idiomas', aficiones: 'Fuera del teclado' },
    contacto: { titulo: '¿Hablamos?', sub: 'Si te encaja lo que has visto, escríbeme. Contesto en persona, sin agentes de por medio.', email: 'Email', linkedin: 'LinkedIn' },
    pie: 'Hecho a mano con React, Tailwind y Claude Code. Diseño Espectro, el de BandManager.',
  },
  en: {
    nav: { proyectos: 'Projects', trayectoria: 'Career', formacion: 'Education', contacto: 'Contact' },
    tema: { light: 'Light', dark: 'Dark', system: 'System' },
    sonido: { si: '♪ On', no: '♪ Off', titulo: 'Sound when downloading the CV' },
    cv: 'Download CV',
    escribeme: 'Get in touch',
    eco: {
      saludo: "Hi! I'm Eco, BandManager's bat. Ask me anything about Diego: projects, experience, education…",
      placeholder: 'Ask Eco about Diego',
      enviar: 'Send',
      sugerencias: ['What does BandManager do?', 'What has he built at promoCAR?', 'How does he use AI safely?'],
      pensando: 'Eco is tuning the answer…',
      tocar: 'Poke Eco',
      error: 'Eco lost signal. Meanwhile, you can reach Diego on LinkedIn.',
      limite: 'Lots of questions in a row. Eco is taking a break; Diego is happy to answer on LinkedIn.',
      aviso: 'Eco answers from the data on this site. It can be wrong: what counts is what Diego says.',
    },
    proyectos: { titulo: 'Personal projects', sub: 'Built end to end, running in production.', problema: 'The problem', solucion: 'What I built', resultado: 'Outcome', visitar: 'Visit', lab: 'AI apps lab', labSub: 'Ideas that went from an afternoon to published.' },
    trayectoria: { titulo: 'Career', sub: 'Each bar is as tall as the years spent in that role.', anos: (n: number) => (n === 1 ? '1 year' : `${n} years`) },
    formacion: { titulo: 'Education and skills', idiomas: 'Languages', aficiones: 'Away from the keyboard' },
    contacto: { titulo: "Let's talk", sub: 'If what you saw fits, drop me a line. I reply myself, no agents in between.', email: 'Email', linkedin: 'LinkedIn' },
    pie: 'Handmade with React, Tailwind and Claude Code. Espectro design, borrowed from BandManager.',
  },
} satisfies Record<Lang, unknown>;

export type Textos = (typeof textos)['es'];
