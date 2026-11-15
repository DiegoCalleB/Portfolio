import { competencias, contacto, formacion, hero, laboratorio, proyectos, sobreMi, trayectoria, type Lang } from './data/perfil';
import { textos, type Textos } from './data/textos';
import { EcoChat } from './components/EcoChat';
import { useIdioma, useTema, type PrefTema } from './lib/ajustes';
import { celebrar, useSonido } from './lib/sonido';
import { Publico } from './components/Publico';

const Contenedor = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>
);

const BotonCV = ({ lang, t, suave }: { lang: Lang; t: Textos; suave?: boolean }) => (
  <a href={contacto.cv[lang]} download onClick={celebrar} className={`inline-flex items-center rounded-pill px-5 py-2.5 text-[15px] font-semibold transition-colors ${suave ? 'bg-sunken text-ink hover:bg-acc-soft hover:text-acc-ink' : 'bg-acc-ink text-surface'}`}>
    {t.cv}
  </a>
);

function Cabecera({ t, lang, setLang, tema, setTema }: { t: Textos; lang: Lang; setLang: (l: Lang) => void; tema: PrefTema; setTema: (p: PrefTema) => void }) {
  const [sonido, setSonido] = useSonido();
  const siguiente: Record<PrefTema, PrefTema> = { system: 'light', light: 'dark', dark: 'system' };
  return (
    <header className="sticky top-0 z-10 bg-bg py-3">
      <Contenedor className="flex items-center gap-3">
        <a href="#inicio" className="mr-auto text-[15px] font-semibold tracking-tight">Diego de la Calle</a>
        <nav className="hidden gap-1 md:flex">
          {(['proyectos', 'trayectoria', 'formacion', 'contacto'] as const).map((k) => (
            <a key={k} href={`#${k}`} className="rounded-pill px-3 py-1.5 text-sm text-ink-2 hover:bg-sunken hover:text-ink">{t.nav[k]}</a>
          ))}
        </nav>
        <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="rounded-pill bg-sunken px-3 py-1.5 text-sm font-medium" aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}>
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <button onClick={() => setSonido(!sonido)} aria-pressed={sonido} className="rounded-pill bg-sunken px-3 py-1.5 text-sm text-ink-2" title={t.sonido.titulo}>
          {sonido ? t.sonido.si : t.sonido.no}
        </button>
        <button onClick={() => setTema(siguiente[tema])} className="rounded-pill bg-sunken px-3 py-1.5 text-sm text-ink-2" title={t.tema[tema]}>
          {t.tema[tema]}
        </button>
      </Contenedor>
    </header>
  );
}

function Seccion({ id, modulo, titulo, sub, children }: { id: string; modulo?: string; titulo: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} data-modulo={modulo} className="scroll-mt-16 py-14 sm:py-20">
      <Contenedor>
        <div className="mb-8 flex items-center gap-3">
          <span className="h-6 w-1.5 rounded-pill bg-acc" aria-hidden />
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{titulo}</h2>
        </div>
        {sub && <p className="-mt-5 mb-8 max-w-2xl text-ink-2">{sub}</p>}
        {children}
      </Contenedor>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useIdioma();
  const [tema, setTema] = useTema();
  const t = textos[lang];

  return (
    <>
      <Cabecera t={t} lang={lang} setLang={setLang} tema={tema} setTema={setTema} />
      <main>
        {/* Inicio: posicionamiento + Eco (demo en vivo) */}
        <section id="inicio" className="pb-10 pt-8 sm:pt-16">
          <Contenedor className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <p className="text-sm font-medium text-acc-ink">{hero.cargo[lang]}</p>
              <h1 className="mt-3 text-[2rem] font-semibold [overflow-wrap:anywhere] min-[400px]:text-4xl leading-[1.08] tracking-tight sm:text-5xl">{hero.titular[lang]}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{hero.bajada[lang]}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <BotonCV lang={lang} t={t} />
                <a href="#contacto" className="rounded-pill bg-sunken px-5 py-2.5 text-[15px] font-semibold hover:bg-acc-soft hover:text-acc-ink">{t.escribeme}</a>
              </div>
              <ul className="mt-9 flex flex-wrap gap-2 text-sm">
                {hero.pruebas[lang].map((p) => <li key={p} className="rounded-pill bg-surface px-3.5 py-1.5 text-ink-2">{p}</li>)}
              </ul>
            </div>
            <EcoChat t={t.eco} lang={lang} />
          </Contenedor>
        </section>

        <Seccion id="proyectos" modulo="proyectos" titulo={t.proyectos.titulo} sub={t.proyectos.sub}>
          <div className="flex flex-col gap-6">
            {proyectos.map((p, i) => (
              <article key={p.id} className={`grid gap-6 rounded-l bg-surface p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 ${i % 2 ? 'lg:[&>figure]:order-first' : ''}`}>
                <div>
                  <p className="text-sm text-ink-3 tnum">{p.periodo} · {p.etiqueta[lang]}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">{p.nombre}</h3>
                  <dl className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed">
                    {([['problema', p.problema], ['solucion', p.solucion], ['resultado', p.resultado]] as const).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-sm font-semibold text-acc-ink">{t.proyectos[k]}</dt>
                        <dd className="mt-0.5 text-ink-2">{v[lang]}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                    {p.stack.map((s) => <li key={s} className="rounded-pill bg-sunken px-2.5 py-1 text-xs text-ink-2">{s}</li>)}
                  </ul>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener" className="mt-6 inline-flex rounded-pill bg-acc-soft px-4 py-2 text-sm font-semibold text-acc-ink hover:bg-sunken">
                      {t.proyectos.visitar} {p.url.replace(/^https:\/\/(www\.)?/, '')} ↗
                    </a>
                  )}
                </div>
                {p.img && (
                  <figure className="aspect-[16/10] self-start overflow-hidden rounded-m bg-sunken max-sm:aspect-[9/12]">
                    <picture>
                      {p.imgMovil && <source media="(max-width: 640px)" srcSet={p.imgMovil} />}
                      <img src={p.img} alt={`${p.nombre}`} loading="lazy" className="h-full w-full object-cover object-left-top" />
                    </picture>
                  </figure>
                )}
              </article>
            ))}

            <div className="rounded-l bg-surface p-5 sm:p-7">
              <h3 className="text-xl font-semibold tracking-tight">{t.proyectos.lab}</h3>
              <p className="mt-1 text-ink-2">{t.proyectos.labSub}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {laboratorio.map((a) => {
                  const contenido = (<><span className="font-semibold">{a.nombre[lang]}</span><span className="text-ink-2"> · {a.desc[lang]}</span>{a.nota && <span className="ml-1 rounded-pill bg-acc-soft px-2 py-0.5 text-xs text-acc-ink">{a.nota[lang]}</span>}</>);
                  return (
                    <li key={a.nombre.es} className="rounded-m bg-sunken px-4 py-3 text-sm">
                      {a.url ? <a href={a.url} target="_blank" rel="noopener" className="hover:text-acc-ink">{contenido} ↗</a> : contenido}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Seccion>

        <Seccion id="trayectoria" modulo="trayectoria" titulo={t.trayectoria.titulo} sub={t.trayectoria.sub}>
          <ol className="flex flex-col gap-4">
            {trayectoria.map((e, i) => (
              <li key={i} className="grid gap-4 rounded-l bg-surface p-5 sm:grid-cols-[88px_1fr] sm:p-7">
                <div className="flex items-end gap-3 sm:flex-col sm:items-start">
                  <span className="w-3 rounded-pill bg-acc" style={{ height: 12 + e.anos * 6, opacity: i === 0 ? 1 : 0.55 }} aria-hidden />
                  <span className="text-sm text-ink-2 tnum">{t.trayectoria.anos(e.anos)}</span>
                </div>
                <div>
                  <p className="text-sm text-ink-3 tnum">{e.periodo[lang]} · {e.empresa}</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">{e.cargo[lang]}</h3>
                  <ul className="mt-3 flex flex-col gap-2 text-[15px] leading-relaxed text-ink-2">
                    {e.puntos.map((p, j) => <li key={j}>{p[lang]}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Seccion>

        <Seccion id="formacion" modulo="formacion" titulo={t.formacion.titulo}>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <ul className="flex flex-col gap-3">
              {formacion.map((f) => (
                <li key={f.titulo.es} className="rounded-m bg-surface px-5 py-4">
                  <p className="font-semibold">{f.titulo[lang]}</p>
                  <p className="text-sm text-ink-2">{f.centro} · {f.cuando[lang]}</p>
                </li>
              ))}
              <li className="rounded-m bg-surface px-5 py-4 text-sm">
                <p><span className="font-semibold">{t.formacion.idiomas}:</span> <span className="text-ink-2">{sobreMi.idiomas[lang]}</span></p>
                <p className="mt-1"><span className="font-semibold">{t.formacion.aficiones}:</span> <span className="text-ink-2">{sobreMi.aficiones[lang]}</span></p>
              </li>
            </ul>
            <div className="flex flex-col gap-4 rounded-l bg-surface p-5 sm:p-7">
              {competencias.map((c) => (
                <div key={c.grupo.es}>
                  <p className="text-sm font-semibold text-acc-ink">{c.grupo[lang]}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {c.items.map((s) => <li key={s} className="rounded-pill bg-sunken px-3 py-1 text-sm text-ink-2">{s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Seccion>

        <Seccion id="contacto" titulo={t.contacto.titulo} sub={t.contacto.sub}>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${contacto.email}`} onClick={celebrar} className="rounded-pill bg-acc-ink px-5 py-2.5 text-[15px] font-semibold text-surface">{t.contacto.email}</a>
            <a href={contacto.linkedin} target="_blank" rel="noopener" className="rounded-pill bg-sunken px-5 py-2.5 text-[15px] font-semibold hover:bg-acc-soft hover:text-acc-ink">{t.contacto.linkedin} ↗</a>
            <BotonCV lang={lang} t={t} suave />
          </div>
        </Seccion>
      </main>
      <Publico />
      <footer className="pb-10">
        <Contenedor><p className="text-sm text-ink-3">{t.pie}</p></Contenedor>
      </footer>
    </>
  );
}
