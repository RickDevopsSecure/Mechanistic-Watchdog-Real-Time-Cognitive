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
          <p>Marco: SL5 / Observación mecanicista</p>
          <p>Acceso: interno, lectura en español</p>
        </div>
      </header>

      <div className="content-grid">
        <aside className="side-rail">
          <div className="rail-block">
            <p className="rail-title">Ficha</p>
            <p className="rail-line">Actualización: Marzo 2025</p>
            <p className="rail-line">Lectura: {readingMinutes} min</p>
            <p className="rail-line">Extensión: {wordCount} palabras</p>
            <p className="rail-line">Idioma: Español (neutral)</p>
          </div>
          <div className="rail-block">
            <p className="rail-title">Archivo</p>
            <p className="rail-line">Serie: Notas SL5</p>
            <p className="rail-line">Estado: revisión interna</p>
          </div>
        </aside>

        <section className="article">
          <header className="article-header">
            <p className="eyebrow">Nota de investigación</p>
            <h1>Mechanistic Watchdog: Interdicción Cognitiva en Tiempo Real para Desalineación Emergente (SL5)</h1>
            <p className="subhead">Documento interno en español para revisión técnica.</p>
          </header>
          <article
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <section className="research-notes">
            <h2>Notas del investigador</h2>
            <p>
              Estas notas acompañan la lectura como registro de supuestos operativos y límites observados en revisión
              interna. La prioridad es mantener trazabilidad de decisiones de umbral, señales omitidas y dependencias
              de evaluación que pueden sesgar la interpretación de seguridad.
            </p>
            <p className="note-signature">Ricardo Martinez</p>
          </section>
          <section className="data-section">
            <div className="data-intro">
              <h2>Panel de señales</h2>
              <p>
                La lectura cualitativa se apoya en una capa cuantitativa acotada para contextualizar umbrales,
                dispersión y presión adversarial. Estas gráficas condensan patrones observables y su variación,
                sin pretender causalidad; funcionan como guía para revisar hipótesis antes de ajustar compuertas.
              </p>
            </div>
            <div className="stat-grid">
              <div className="stat-card">
                <p className="stat-label">Latencia de compuerta (p95)</p>
                <p className="stat-value">12–18 ms</p>
                <p className="stat-note">Ventana operativa para bloqueo antes de salida.</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Cobertura residual (proxy)</p>
                <p className="stat-value">~0.62</p>
                <p className="stat-note">Mayor en fácticos, menor en rutas encubiertas.</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Presión de estrés (relativa)</p>
                <p className="stat-value">2.6×</p>
                <p className="stat-note">Incremento relativo bajo suites adversariales.</p>
              </div>
            </div>
            <div className="chart-grid">
              <div className="chart-card">
                <img src={`${basePath}/figures/sl5-domains.svg`} alt="Mapa de dominios de seguridad en SL5" />
                <h3>Distribución de dominios SL5</h3>
                <p>
                  El balance de controles sugiere que los dominios físicos y de personal concentran exigencias
                  operativas, mientras que red y hardware articulan contención transversal.
                </p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/monitoring-loop.svg`} alt="Ciclo de observación y contención" />
                <h3>Loop de observación</h3>
                <p>
                  La compuerta activa se integra con escalamiento humano para sostener respuesta graduada antes de un
                  evento visible de desalineación.
                </p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/gating-threshold.svg`} alt="Umbral de riesgo y respuesta" />
                <h3>Umbral e intervención</h3>
                <p>
                  El umbral conservador busca reducir el riesgo de trayectorias persistentes, aceptando la posibilidad
                  de falsos positivos operativos.
                </p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/residual-coverage.svg`} alt="Cobertura del monitoreo residual" />
                <h3>Brechas del residual</h3>
                <p>
                  Las señales factuales dominan la detección, mientras que el razonamiento multi‑salto reduce la
                  sensibilidad del filtro.
                </p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/vector-gating.svg`} alt="Compuerta por vectores conceptuales" />
                <h3>Vectores conceptuales</h3>
                <p>
                  La compuerta agregada pondera dimensiones heterogéneas para evitar que una sola señal domine la
                  decisión de interdicción.
                </p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/eval-suite-pressure.svg`} alt="Presión de evaluación y umbrales" />
                <h3>Presión adversarial</h3>
                <p>
                  La exposición a suites más agresivas desplaza los umbrales requeridos y revela sensibilidad a
                  jailbreak sostenido.
                </p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/boxplot-truthfulness.svg`} alt="Boxplots de veracidad" />
                <h3>Veracidad</h3>
                <p>
                  La separación entre control y factual‑lie muestra variabilidad que puede informar ajustes de
                  tolerancia en situaciones ambiguas.
                </p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/boxplot-bio.svg`} alt="Boxplots de bio-defensa" />
                <h3>Bio‑defensa</h3>
                <p>
                  La distancia entre corpus seguro y misuse refuerza la necesidad de umbrales diferenciados por
                  categoría de riesgo.
                </p>
              </div>
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
