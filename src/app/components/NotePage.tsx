import { promises as fs } from "fs";
import path from "path";
import { renderMarkdown } from "../../lib/markdown";
import LanguageToggle from "./LanguageToggle";

type NotePageProps = {
  lang: "es" | "en";
};

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

export default async function NotePage({ lang }: NotePageProps) {
  const contentFile = lang === "en" ? "mechanistic-watchdog-en.md" : "mechanistic-watchdog-es.md";
  const filePath = path.join(process.cwd(), "src", "content", contentFile);
  const markdown = await fs.readFile(filePath, "utf-8");
  const html = await renderMarkdown(markdown);
  const wordCount = countWords(markdown);
  const readingMinutes = Math.max(6, Math.round(wordCount / 180));
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const figureSuffix = lang === "en" ? "-en" : "";
  const figureQuery = lang === "en" ? "?lang=en" : "";
  const t = lang === "en"
    ? {
        caption: "Internal research notes archive",
        metaFrame: "Framework: SL5 / Mechanistic observation",
        metaAccess: "Access: internal, English reading",
        fileTitle: "Record",
        fileUpdated: "Updated: March 2025",
        fileRead: `Read: ${readingMinutes} min`,
        fileLength: `Length: ${wordCount} words`,
        fileLang: "Language: English",
        archiveTitle: "Archive",
        archiveSeries: "Series: SL5 Notes",
        archiveState: "Status: internal review",
        authorsTitle: "Authors",
        authorsLines: [
          "Ricardo Martinez",
          "Fernando Valdovinos",
          "Luis Cosio",
          "Godric Aceves",
        ],
        summaryTitle: "Technical summary",
        summaryLines: [
          "Observed risk: proxy drift",
          "Intervention: SL5 upstream gate",
          "Reading: internal signals with limits",
        ],
        mapTitle: "Reading map",
        mapSignals: "Signals panel",
        mapMain: "Main text",
        mapNext: "Next steps",
        mapBiblio: "Bibliography",
        eyebrow: "Research note",
        title: "Mechanistic Watchdog: Real‑Time Cognitive Interdiction for Emergent Misalignment (SL5)",
        subhead: "Internal document in English for technical review.",
        panelTitle: "Signals panel",
        panelIntro:
          "The qualitative reading is anchored by a constrained quantitative layer to contextualize thresholds, dispersion, and adversarial pressure. These charts condense observable patterns and their variation without claiming causality; they guide hypothesis review before gate adjustments.",
        statLatency: "Gate latency (p95)",
        statLatencyNote: "Operational window for pre‑output blocking.",
        statResidual: "Residual coverage (proxy)",
        statResidualNote: "Higher on factuals, lower on covert routes.",
        statPressure: "Stress pressure (relative)",
        statPressureNote: "Relative increase under adversarial suites.",
        chart1Title: "SL5 domain distribution",
        chart1Body:
          "Control balance suggests physical and personnel domains carry operational load, while network and hardware provide cross‑domain containment.",
        chart2Title: "Observation loop",
        chart2Body:
          "Active gating integrates with human escalation to sustain graduated response before visible misalignment events.",
        chart3Title: "Threshold and intervention",
        chart3Body:
          "Conservative thresholds reduce persistent‑trajectory risk while accepting operational false positives.",
        chart4Title: "Residual gaps",
        chart4Body:
          "Factual signals dominate detection, while multi‑hop reasoning reduces filter sensitivity.",
        chart5Title: "Conceptual vectors",
        chart5Body:
          "Aggregated gating weights heterogeneous dimensions to prevent a single signal from dominating interdiction.",
        chart6Title: "Adversarial pressure",
        chart6Body:
          "Exposure to stronger suites shifts required thresholds and reveals sensitivity to sustained jailbreak pressure.",
        chart7Title: "Truthfulness",
        chart7Body:
          "Separation between control and factual‑lie shows variability that can inform tolerance under ambiguity.",
        chart8Title: "Bio‑defense",
        chart8Body:
          "Distance between safe corpus and misuse supports category‑specific thresholds.",
        notesTitle: "Researcher notes",
        notesBody:
          "These notes accompany the reading as a record of operating assumptions and limits observed in internal review. The priority is to preserve traceability of threshold decisions, omitted signals, and evaluation dependencies that can bias security interpretation.",
        notesSignature: "Ricardo Martinez · Fernando Valdovinos · Luis Cosio · Godric Aceves",
        footerLine1:
          "Editorial record reserved for internal circulation. The published version may vary with framework or terminology changes.",
        footerLine2:
          "References and technical notes are available in the main file. Authors: Ricardo Martinez, Fernando Valdovinos, Luis Cosio, Godric Aceves. Base project: https://github.com/luiscosio/MechWatch.git.",
      }
    : {
        caption: "Archivo interno de notas de investigación",
        metaFrame: "Marco: SL5 / Observación mecanicista",
        metaAccess: "Acceso: interno, lectura en español",
        fileTitle: "Ficha",
        fileUpdated: "Actualización: Marzo 2025",
        fileRead: `Lectura: ${readingMinutes} min`,
        fileLength: `Extensión: ${wordCount} palabras`,
        fileLang: "Idioma: Español (neutral)",
        archiveTitle: "Archivo",
        archiveSeries: "Serie: Notas SL5",
        archiveState: "Estado: revisión interna",
        authorsTitle: "Autores",
        authorsLines: [
          "Ricardo Martinez",
          "Fernando Valdovinos",
          "Luis Cosio",
          "Godric Aceves",
        ],
        summaryTitle: "Resumen técnico",
        summaryLines: [
          "Riesgo observado: deriva por proxies",
          "Intervención: compuerta upstream SL5",
          "Lectura: señales internas con límites",
        ],
        mapTitle: "Mapa de lectura",
        mapSignals: "Panel de señales",
        mapMain: "Texto principal",
        mapNext: "Siguientes pasos",
        mapBiblio: "Bibliografía",
        eyebrow: "Nota de investigación",
        title: "Mechanistic Watchdog: Interdicción Cognitiva en Tiempo Real para Desalineación Emergente (SL5)",
        subhead: "Documento interno en español para revisión técnica.",
        panelTitle: "Panel de señales",
        panelIntro:
          "La lectura cualitativa se apoya en una capa cuantitativa acotada para contextualizar umbrales, dispersión y presión adversarial. Estas gráficas condensan patrones observables y su variación, sin pretender causalidad; funcionan como guía para revisar hipótesis antes de ajustar compuertas.",
        statLatency: "Latencia de compuerta (p95)",
        statLatencyNote: "Ventana operativa para bloqueo antes de salida.",
        statResidual: "Cobertura residual (proxy)",
        statResidualNote: "Mayor en fácticos, menor en rutas encubiertas.",
        statPressure: "Presión de estrés (relativa)",
        statPressureNote: "Incremento relativo bajo suites adversariales.",
        chart1Title: "Distribución de dominios SL5",
        chart1Body:
          "El balance de controles sugiere que los dominios físicos y de personal concentran exigencias operativas, mientras que red y hardware articulan contención transversal.",
        chart2Title: "Loop de observación",
        chart2Body:
          "La compuerta activa se integra con escalamiento humano para sostener respuesta graduada antes de un evento visible de desalineación.",
        chart3Title: "Umbral e intervención",
        chart3Body:
          "El umbral conservador busca reducir el riesgo de trayectorias persistentes, aceptando la posibilidad de falsos positivos operativos.",
        chart4Title: "Brechas del residual",
        chart4Body:
          "Las señales factuales dominan la detección, mientras que el razonamiento multi‑salto reduce la sensibilidad del filtro.",
        chart5Title: "Vectores conceptuales",
        chart5Body:
          "La compuerta agregada pondera dimensiones heterogéneas para evitar que una sola señal domine la decisión de interdicción.",
        chart6Title: "Presión adversarial",
        chart6Body:
          "La exposición a suites más agresivas desplaza los umbrales requeridos y revela sensibilidad a jailbreak sostenido.",
        chart7Title: "Veracidad",
        chart7Body:
          "La separación entre control y factual‑lie muestra variabilidad que puede informar ajustes de tolerancia en situaciones ambiguas.",
        chart8Title: "Bio‑defensa",
        chart8Body:
          "La distancia entre corpus seguro y misuse refuerza la necesidad de umbrales diferenciados por categoría de riesgo.",
        notesTitle: "Notas del investigador",
        notesBody:
          "Estas notas acompañan la lectura como registro de supuestos operativos y límites observados en revisión interna. La prioridad es mantener trazabilidad de decisiones de umbral, señales omitidas y dependencias de evaluación que pueden sesgar la interpretación de seguridad.",
        notesSignature: "Ricardo Martinez · Fernando Valdovinos · Luis Cosio · Godric Aceves",
        footerLine1:
          "Registro editorial reservado para circulación interna. La versión publicada puede variar según cambios de marco o terminología.",
        footerLine2:
          "Referencias y notas técnicas disponibles en el archivo principal. Autores: Ricardo Martinez, Fernando Valdovinos, Luis Cosio, Godric Aceves. Proyecto base: https://github.com/luiscosio/MechWatch.git.",
      };

  return (
    <main className="layout">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">MW</div>
          <div>
            <p className="brand-label">Mechanistic Watchdog</p>
            <p className="brand-caption">{t.caption}</p>
          </div>
        </div>
        <div className="site-actions">
          <div className="site-meta">
            <p>{t.metaFrame}</p>
            <p>{t.metaAccess}</p>
          </div>
          <LanguageToggle lang={lang} basePath={basePath} />
        </div>
      </header>

      <div className="content-grid">
        <aside className="side-rail">
          <div className="rail-block">
            <p className="rail-title">{t.fileTitle}</p>
            <p className="rail-line">{t.fileUpdated}</p>
            <p className="rail-line">{t.fileRead}</p>
            <p className="rail-line">{t.fileLength}</p>
            <p className="rail-line">{t.fileLang}</p>
          </div>
          <div className="rail-block">
            <p className="rail-title">{t.archiveTitle}</p>
            <p className="rail-line">{t.archiveSeries}</p>
            <p className="rail-line">{t.archiveState}</p>
          </div>
          <div className="rail-block">
            <p className="rail-title">{t.authorsTitle}</p>
            {t.authorsLines.map((line) => (
              <p key={line} className="rail-line">{line}</p>
            ))}
          </div>
          <div className="rail-block">
            <p className="rail-title">{t.summaryTitle}</p>
            {t.summaryLines.map((line) => (
              <p key={line} className="rail-line">{line}</p>
            ))}
          </div>
          <div className="rail-block">
            <p className="rail-title">{t.mapTitle}</p>
            <p className="rail-line">
              <a className="rail-link" href="#panel-senales">{t.mapSignals}</a>
            </p>
            <p className="rail-line">
              <a className="rail-link" href="#texto-principal">{t.mapMain}</a>
            </p>
            <p className="rail-line">
              <a className="rail-link" href="#siguientes-pasos">{t.mapNext}</a>
            </p>
            <p className="rail-line">
              <a className="rail-link" href="#bibliografia">{t.mapBiblio}</a>
            </p>
          </div>
        </aside>

        <section className="article">
          <header className="article-header">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="subhead">{t.subhead}</p>
          </header>
          <section className="data-section" id="panel-senales">
            <div className="data-intro">
              <h2>{t.panelTitle}</h2>
              <p>{t.panelIntro}</p>
            </div>
            <div className="stat-grid">
              <div className="stat-card">
                <p className="stat-label">{t.statLatency}</p>
                <p className="stat-value">12–18 ms</p>
                <p className="stat-note">{t.statLatencyNote}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">{t.statResidual}</p>
                <p className="stat-value">~0.62</p>
                <p className="stat-note">{t.statResidualNote}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">{t.statPressure}</p>
                <p className="stat-value">2.6×</p>
                <p className="stat-note">{t.statPressureNote}</p>
              </div>
            </div>
            <div className="chart-grid">
              <div className="chart-card">
                <img src={`${basePath}/figures/sl5-domains${figureSuffix}.svg${figureQuery}`} alt={t.chart1Title} />
                <h3>{t.chart1Title}</h3>
                <p>{t.chart1Body}</p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/monitoring-loop${figureSuffix}.svg${figureQuery}`} alt={t.chart2Title} />
                <h3>{t.chart2Title}</h3>
                <p>{t.chart2Body}</p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/gating-threshold${figureSuffix}.svg${figureQuery}`} alt={t.chart3Title} />
                <h3>{t.chart3Title}</h3>
                <p>{t.chart3Body}</p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/residual-coverage${figureSuffix}.svg${figureQuery}`} alt={t.chart4Title} />
                <h3>{t.chart4Title}</h3>
                <p>{t.chart4Body}</p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/vector-gating${figureSuffix}.svg${figureQuery}`} alt={t.chart5Title} />
                <h3>{t.chart5Title}</h3>
                <p>{t.chart5Body}</p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/eval-suite-pressure${figureSuffix}.svg${figureQuery}`} alt={t.chart6Title} />
                <h3>{t.chart6Title}</h3>
                <p>{t.chart6Body}</p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/boxplot-truthfulness${figureSuffix}.svg${figureQuery}`} alt={t.chart7Title} />
                <h3>{t.chart7Title}</h3>
                <p>{t.chart7Body}</p>
              </div>
              <div className="chart-card">
                <img src={`${basePath}/figures/boxplot-bio${figureSuffix}.svg${figureQuery}`} alt={t.chart8Title} />
                <h3>{t.chart8Title}</h3>
                <p>{t.chart8Body}</p>
              </div>
            </div>
          </section>
          <article
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <section className="research-notes">
            <h2>{t.notesTitle}</h2>
            <p>{t.notesBody}</p>
            <p className="note-signature">{t.notesSignature}</p>
          </section>
          <footer className="article-footer">
            <p>{t.footerLine1}</p>
            <p>{t.footerLine2}</p>
          </footer>
        </section>
      </div>
    </main>
  );
}
