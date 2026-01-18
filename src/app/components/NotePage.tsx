import { promises as fs } from "fs";
import path from "path";
import { renderMarkdown } from "../../lib/markdown";
import LanguageToggle from "./LanguageToggle";
import SignalsPanel from "./SignalsPanel";

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
  const [beforeFigures, afterFigures] = markdown.split("<!-- FIGURES -->");
  const htmlTop = await renderMarkdown(beforeFigures ?? "");
  const htmlBottom = await renderMarkdown(afterFigures ?? "");
  const wordCount = countWords(markdown);
  const readingMinutes = Math.max(6, Math.round(wordCount / 180));
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const t = lang === "en"
    ? {
        caption: "Research note",
        metaLineOne: "Series: SL5 Notes",
        metaLineTwo: "Update: March 2025",
        eyebrow: "Research note",
        title: "Mechanistic Watchdog: Real‑Time Cognitive Interdiction for Emergent Misalignment (SL5)",
        subhead: "Research note in English.",
        authorsInline: "Ricardo Martinez · Fernando Valdovinos · Luis Cosio · Godric Aceves",
        panelTitle: "Signals panel",
        panelIntro:
          "The qualitative reading is anchored by a constrained quantitative layer to contextualize thresholds, dispersion, and adversarial pressure. These charts condense observable patterns and their variation without claiming causality; they guide hypothesis review before gate adjustments.",
        statLatency: "Gate latency (p95)",
        statLatencyNote: "Operational window for pre‑output blocking.",
        statResidual: "Residual coverage (proxy)",
        statResidualNote: "Higher on factuals, lower on covert routes.",
        statPressure: "Stress pressure (relative)",
        statPressureNote: "Relative increase under adversarial suites.",
        notesTitle: "Researcher notes",
        notesBody:
          "These notes accompany the reading as a record of operating assumptions and limits observed in internal review. The priority is to preserve traceability of threshold decisions, omitted signals, and evaluation dependencies that can bias security interpretation.",
        notesSignature: "Ricardo Martinez · Fernando Valdovinos · Luis Cosio · Godric Aceves",
        footerLine1:
          "Editorial record reserved for internal circulation. The published version may vary with framework or terminology changes.",
        footerLine2:
          "References and technical notes are available in the main file. Authors: Ricardo Martinez, Fernando Valdovinos, Luis Cosio, Godric Aceves. Base project: https://github.com/luiscosio/MechWatch.git.",
        metaRead: `Read: ${readingMinutes} min · ${wordCount} words`,
      }
    : {
        caption: "Nota de investigación",
        metaLineOne: "Serie: Notas SL5",
        metaLineTwo: "Actualización: Marzo 2025",
        eyebrow: "Nota de investigación",
        title: "Mechanistic Watchdog: Interdicción Cognitiva en Tiempo Real para Desalineación Emergente (SL5)",
        subhead: "Nota de investigación en español.",
        authorsInline: "Ricardo Martinez · Fernando Valdovinos · Luis Cosio · Godric Aceves",
        panelTitle: "Panel de señales",
        panelIntro:
          "La lectura cualitativa se apoya en una capa cuantitativa acotada para contextualizar umbrales, dispersión y presión adversarial. Estas gráficas condensan patrones observables y su variación, sin pretender causalidad; funcionan como guía para revisar hipótesis antes de ajustar compuertas.",
        statLatency: "Latencia de compuerta (p95)",
        statLatencyNote: "Ventana operativa para bloqueo antes de salida.",
        statResidual: "Cobertura residual (proxy)",
        statResidualNote: "Mayor en fácticos, menor en rutas encubiertas.",
        statPressure: "Presión de estrés (relativa)",
        statPressureNote: "Incremento relativo bajo suites adversariales.",
        notesTitle: "Notas del investigador",
        notesBody:
          "Estas notas acompañan la lectura como registro de supuestos operativos y límites observados en revisión interna. La prioridad es mantener trazabilidad de decisiones de umbral, señales omitidas y dependencias de evaluación que pueden sesgar la interpretación de seguridad.",
        notesSignature: "Ricardo Martinez · Fernando Valdovinos · Luis Cosio · Godric Aceves",
        footerLine1:
          "Registro editorial reservado para circulación interna. La versión publicada puede variar según cambios de marco o terminología.",
        footerLine2:
          "Referencias y notas técnicas disponibles en el archivo principal. Autores: Ricardo Martinez, Fernando Valdovinos, Luis Cosio, Godric Aceves. Proyecto base: https://github.com/luiscosio/MechWatch.git.",
        metaRead: `Lectura: ${readingMinutes} min · ${wordCount} palabras`,
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
            <p>{t.metaLineOne}</p>
            <p>{t.metaLineTwo}</p>
            <p>{t.metaRead}</p>
          </div>
          <LanguageToggle lang={lang} basePath={basePath} />
        </div>
      </header>

      <section className="article">
        <header className="article-header">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="authors-inline">{t.authorsInline}</p>
          <p className="subhead">{t.subhead}</p>
        </header>
        <article className="markdown" dangerouslySetInnerHTML={{ __html: htmlTop }} />
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
          <SignalsPanel lang={lang} />
        </section>
        <article className="markdown" dangerouslySetInnerHTML={{ __html: htmlBottom }} />
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
    </main>
  );
}
