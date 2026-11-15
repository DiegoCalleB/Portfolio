import { useEffect, useRef, useState } from 'react';
import { casosPromocar, competencias, contacto, formacion, hero, laboratorio, proyectos, sobreMi, ticker, trayectoria, type Lang } from './data/perfil';
import { textos, type Textos } from './data/textos';
import { CarreraOnda } from './components/CarreraOnda';
import { Contadores } from './components/Contadores';
import { EcoHeroe } from './components/EcoPose';
import { EcoWidget } from './components/EcoWidget';
import { OndaHeroe } from './components/OndaHeroe';
import { Publico } from './components/Publico';
import { Revelar } from './components/Revelar';
import { useIdioma, useTema, type PrefTema } from './lib/ajustes';
import { useSeccionActiva } from './lib/seccion';
import { celebrar, useSonido } from './lib/sonido';

const SECCIONES = ['inicio', 'promocar', 'proyectos', 'trayectoria', 'formacion', 'contacto'] as const;

const Contenedor = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>
);

const BotonCV = ({ lang, t, suave }: { lang: Lang; t: Textos; suave?: boolean }) => (
  <a href={contacto.cv[lang]} download onClick={celebrar} className={`inline-flex items-center rounded-pill px-5 py-2.5 text-[15px] font-semibold transition-colors ${suave ? 'bg-sunken text-ink hover:bg-acc-soft hover:text-acc-ink' : 'bg-acc-ink text-surface'}`}>
    {t.cv}
  </a>
);

function Cabecera({ t, lang, setLang, tema, setTema, activa }: { t: Textos; lang: Lang; setLang: (l: Lang) => void; tema: PrefTema; setTema: (p: PrefTema) => void; activa: string }) {
  const [sonido, setSonido] = useSonido();
  const barra = useRef<HTMLSpanElement>(null);
  const siguiente: Record<PrefTema, PrefTema> = { system: 'light', light: 'dark', dark: 'system' };

  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (barra.current) barra.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    f();
    addEventListener('scroll', f, { passive: true });
    addEventListener('resize', f);
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f); };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-bg py-3">
      <Contenedor className="flex items-center gap-2 sm:gap-3">
        <a href="#inicio" className="mr-auto text-[15px] font-semibold tracking-tight">Diego de la Calle</a>
        <nav className="hidden gap-1 md:flex">
          {(['promocar', 'proyectos', 'trayectoria', 'formacion', 'contacto'] as const).map((k) => (
            <a key={k} href={`#${k}`} className={`rounded-pill px-3 py-1.5 text-sm transition-colors ${activa === k ? 'bg-acc-soft text-acc-ink' : 'text-ink-2 hover:bg-sunken hover:text-ink'}`}>{t.nav[k]}</a>
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
      <span ref={barra} aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-pill bg-acc" style={{ transform: 'scaleX(0)' }} />
    </header>
  );
}

function Seccion({ id, modulo, titulo, sub, children }: { id: string; modulo?: string; titulo: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} data-modulo={modulo} className="scroll-mt-16 py-14 sm:py-20">
      <Contenedor>
        <Revelar className="mb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 items-end gap-[3px]" aria-hidden>
              {[55, 100, 70, 40].map((h, i) => <span key={i} className="barra-t w-1.5 rounded-pill bg-acc" style={{ height: `${h}%`, transitionDelay: `${i * 70}ms` }} />)}
            </span>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{titulo}</h2>
          </div>
          {sub && <p className="mt-3 max-w-2xl text-ink-2">{sub}</p>}
        </Revelar>
        {children}
      </Contenedor>
    </section>
  );
}

function Cinta() {
  return (
    <div aria-hidden className="mascara-lados mt-8 overflow-hidden">
      <div className="ticker text-sm text-ink-3">
        {[0, 1].map((c) => (
          <ul key={c} className={`flex shrink-0 gap-2 pr-2 ${c ? 'ticker-copia' : ''}`}>
            {ticker.map((x) => <li key={x} className="rounded-pill bg-surface px-3.5 py-1.5">{x}</li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useIdioma();
  const [tema, setTema] = useTema();
  const [chat, setChat] = useState(false);
  const activa = useSeccionActiva(SECCIONES);
  const t = textos[lang];
  const [antes, despues] = hero.titular[lang].split(hero.destacado[lang]);

  return (
    <>
      <Cabecera t={t} lang={lang} setLang={setLang} tema={tema} setTema={setTema} activa={activa} />
      <main>
        <section id="inicio" className="pb-6 pt-4 sm:pt-10">
          <Contenedor className="grid grid-cols-1 items-center gap-2 lg:grid-cols-[1.15fr_.85fr] lg:gap-10">
            <div>
              <p className="entra text-sm font-medium text-acc-ink">{hero.cargo[lang]}</p>
              <h1 className="entra mt-3 text-[2rem] font-semibold leading-[1.06] tracking-tight [animation-delay:80ms] [overflow-wrap:anywhere] min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                {antes}<span className="text-acc">{hero.destacado[lang]}</span>{despues}
              </h1>
              <p className="entra mt-5 max-w-xl text-lg leading-relaxed text-ink-2 [animation-delay:160ms]">{hero.bajada[lang]}</p>
              <div className="entra mt-7 flex flex-wrap gap-3 [animation-delay:240ms]">
                <BotonCV lang={lang} t={t} />
                <button type="button" onClick={() => setChat(true)} className="rounded-pill bg-sunken px-5 py-2.5 text-[15px] font-semibold hover:bg-acc-soft hover:text-acc-ink">{t.preguntar}</button>
                <a href="#contacto" className="rounded-pill px-3 py-2.5 text-[15px] font-semibold text-ink-2 hover:text-acc-ink">{t.escribeme}</a>
              </div>
            </div>
            <div className="entra [animation-delay:200ms]"><EcoHeroe etiqueta={t.eco.tocar} /></div>
          </Contenedor>

          <div className="mt-2">
            <OndaHeroe />
            <p className="mt-1 text-center text-xs text-ink-3">♪ {t.onda}</p>
          </div>
          <Contenedor className="mt-8"><Contadores lang={lang} /></Contenedor>
          <Cinta />
        </section>

        <Seccion id="promocar" modulo="trayectoria" titulo={t.promocar.titulo} sub={t.promocar.sub}>
          <div className="grid gap-4 lg:grid-cols-3">
            {casosPromocar.map((c, i) => (
              <Revelar key={c.titulo.es} retraso={i * 100} className="h-full">
                <article className="flex h-full flex-col rounded-l bg-surface p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{c.titulo[lang]}</h3>
                  <dl className="mt-4 flex flex-1 flex-col gap-3 text-[15px] leading-relaxed">
                    {([['problema', c.problema], ['solucion', c.solucion], ['resultado', c.resultado]] as const).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-sm font-semibold text-acc-ink">{k === 'solucion' ? t.promocar.solucion : t.proyectos[k]}</dt>
                        <dd className="mt-0.5 text-ink-2">{v[lang]}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                    {c.stack.map((x) => <li key={x} className="rounded-pill bg-sunken px-2.5 py-1 text-xs text-ink-2">{x}</li>)}
                  </ul>
                </article>
              </Revelar>
            ))}
          </div>
        </Seccion>

        <Seccion id="proyectos" modulo="proyectos" titulo={t.proyectos.titulo} sub={t.proyectos.sub}>
          <div className="flex flex-col gap-6">
            {proyectos.map((p, i) => (
              <Revelar key={p.id}>
                <article className={`group grid gap-6 rounded-l bg-surface p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 ${i % 2 ? 'lg:[&>figure]:order-first' : ''}`}>
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
                    <figure className="self-start overflow-hidden rounded-m bg-sunken">
                      <div aria-hidden className="flex items-center gap-1.5 px-3 py-2">
                        {[0, 1, 2].map((d) => <span key={d} className="size-2 rounded-full bg-ink-3/40" />)}
                        <span className="ml-3 truncate rounded-pill bg-surface px-3 py-0.5 text-[11px] text-ink-3">{p.url?.replace(/^https:\/\/(www\.)?/, '')}</span>
                      </div>
                      <div className="aspect-[16/10] overflow-hidden max-sm:aspect-[9/12]">
                        <picture>
                          {p.imgMovil && <source media="(max-width: 640px)" srcSet={p.imgMovil} />}
                          <img src={p.img} alt={p.nombre} loading="lazy" className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]" />
                        </picture>
                      </div>
                    </figure>
                  )}
                </article>
              </Revelar>
            ))}

            <Revelar>
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
            </Revelar>
          </div>
        </Seccion>

        <Seccion id="trayectoria" modulo="trayectoria" titulo={t.trayectoria.titulo} sub={t.trayectoria.sub}>
          <Revelar><CarreraOnda lang={lang} pista={t.trayectoria.sub} /></Revelar>
          <ol className="flex flex-col gap-4">
            {trayectoria.map((e, i) => (
              <Revelar key={i}>
                <li className="grid gap-4 rounded-l bg-surface p-5 sm:grid-cols-[88px_1fr] sm:p-7">
                  <div className="flex items-end gap-3 sm:flex-col sm:items-start">
                    <span className="w-3 rounded-pill" style={{ height: 12 + e.anos * 6, background: `var(--mod-${i + 1})` }} aria-hidden />
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
              </Revelar>
            ))}
          </ol>
        </Seccion>

        <Seccion id="formacion" modulo="formacion" titulo={t.formacion.titulo}>
          <Revelar>
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
          </Revelar>
        </Seccion>

        <Seccion id="contacto" titulo={t.contacto.titulo} sub={t.contacto.sub}>
          <Revelar>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${contacto.email}`} onClick={celebrar} className="rounded-pill bg-acc-ink px-5 py-2.5 text-[15px] font-semibold text-surface">{t.contacto.email}</a>
              <a href={contacto.linkedin} target="_blank" rel="noopener" className="rounded-pill bg-sunken px-5 py-2.5 text-[15px] font-semibold hover:bg-acc-soft hover:text-acc-ink">{t.contacto.linkedin} ↗</a>
              <BotonCV lang={lang} t={t} suave />
            </div>
          </Revelar>
        </Seccion>
      </main>
      <Publico />
      <EcoWidget abierto={chat} setAbierto={setChat} seccion={activa} t={t} lang={lang} />
      <footer className="pb-24 sm:pb-28">
        <Contenedor><p className="text-sm text-ink-3">{t.pie}</p></Contenedor>
      </footer>
    </>
  );
}
