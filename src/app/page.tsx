import { promises as fs } from "fs";
import path from "path";
import { renderMarkdown } from "../lib/markdown";

function countWords(text: string): number {
  const clean = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) return 0;
  return clean.split(" ").length;
}

export default async function HomePage() {
  const filePath = path.join(process.cwd(), "src", "content", "mechanistic-watchdog-es.md");
  const markdown = await fs.readFile(filePath, "utf-8");
  const html = await renderMarkdown(markdown);
  const wordCount = countWords(markdown);
  const readingMinutes = Math.max(6, Math.round(wordCount / 180));
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main className="layout">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">MW</div>
          <div>
            <p className="brand-label">Mechanistic Watchdog</p>
            <p className="brand-caption">Archivo interno de notas de investigación</p>
          </div>
        </div>
        <div className="site-meta">
          <p>Marco: SL5 / Observacion mecanicista</p>
          <p>Acceso: interno, lectura en español</p>
        </div>
      </header>

      <div className="content-grid">
        <aside className="side-rail">
          <div className="rail-block">
            <p className="rail-title">Ficha</p>
            <p className="rail-line">Actualizacion: Marzo 2025</p>
            <p className="rail-line">Lectura: {readingMinutes} min</p>
            <p className="rail-line">Extension: {wordCount} palabras</p>
            <p className="rail-line">Idioma: Español (neutral)</p>
          </div>
          <div className="rail-block">
            <p className="rail-title">Archivo</p>
            <p className="rail-line">Serie: Notas SL5</p>
            <p className="rail-line">Estado: revision interna</p>
          </div>
        </aside>

        <section className="article">
          <header className="article-header">
            <p className="eyebrow">Nota de investigación</p>
            <h1>Mechanistic Watchdog: Interdicción Cognitiva en Tiempo Real para Desalineación Emergente (SL5)</h1>
            <p className="subhead">Nota interna de investigación, versión en español.</p>
          </header>
          <article
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <section className="research-notes">
            <h2>Notas del investigador</h2>
            <p>
              Estas notas acompañan la lectura como registro de supuestos operativos y límites observados durante
              revisiones internas. La prioridad es mantener trazabilidad de decisiones de umbral, señales omitidas y
              dependencias de evaluación que pueden sesgar la interpretación de seguridad.
            </p>
            <p className="note-signature">Ricardo Martinez</p>
          </section>
          <section className="figure-section">
            <h2>Figuras y esquemas</h2>
            <div className="figure-grid">
              <figure className="figure-card">
                <img src={`${basePath}/figures/sl5-domains.svg`} alt="Mapa de dominios de seguridad en SL5" />
                <figcaption>Distribución relativa de controles por dominio bajo el marco SL5.</figcaption>
              </figure>
              <figure className="figure-card">
                <img src={`${basePath}/figures/monitoring-loop.svg`} alt="Ciclo de observación y contención" />
                <figcaption>Observación continua con compuerta activa y escalamiento humano.</figcaption>
              </figure>
              <figure className="figure-card">
                <img src={`${basePath}/figures/gating-threshold.svg`} alt="Umbral de riesgo y respuesta" />
                <figcaption>Respuesta preventiva cuando la señal interna cruza umbrales conservadores.</figcaption>
              </figure>
              <figure className="figure-card">
                <img src={`${basePath}/figures/residual-coverage.svg`} alt="Cobertura del monitoreo residual" />
                <figcaption>El monitoreo residual es más sólido en enunciados fácticos y menos en rutas encubiertas.</figcaption>
              </figure>
              <figure className="figure-card">
                <img src={`${basePath}/figures/vector-gating.svg`} alt="Compuerta por vectores conceptuales" />
                <figcaption>Ponderación de múltiples vectores conceptuales para una compuerta agregada.</figcaption>
              </figure>
              <figure className="figure-card">
                <img src={`${basePath}/figures/eval-suite-pressure.svg`} alt="Presión de evaluación y umbrales" />
                <figcaption>Relación entre suites de estrés y ajuste de umbrales en escenarios de jailbreak.</figcaption>
              </figure>
              <figure className="figure-card">
                <img src={`${basePath}/figures/boxplot-truthfulness.svg`} alt="Boxplots de veracidad" />
                <figcaption>Separación de puntajes máximos entre control, misconceptions y factual-lie.</figcaption>
              </figure>
              <figure className="figure-card">
                <img src={`${basePath}/figures/boxplot-bio.svg`} alt="Boxplots de bio-defensa" />
                <figcaption>Comparación entre corpus seguro y misuse con umbral conservador.</figcaption>
              </figure>
            </div>
          </section>
          <footer className="article-footer">
            <p>
              Registro editorial reservado para circulación interna. La versión publicada puede variar según cambios
              de marco o terminología.
            </p>
            <p>
              Referencias y notas técnicas disponibles en el archivo principal. Investigación creada por Ricardo
              Martinez. Proyecto base: https://github.com/luiscosio/MechWatch.git.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
