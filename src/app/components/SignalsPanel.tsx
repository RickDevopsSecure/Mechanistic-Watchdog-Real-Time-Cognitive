"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Lang = "es" | "en";

type ChartShellProps = {
  ariaLabel: string;
  draw: (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => void;
  height?: number;
};

function ChartShell({ ariaLabel, draw, height = 560 }: ChartShellProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    draw(svg);
  }, [draw]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 960 ${height}`}
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}

const COLORS = {
  bg: "#FBF9F4",
  rule: "#E4DDD3",
  ink: "#1D1A16",
  muted: "#6B6258",
  accent: "#2D4B3A",
  warn: "#9B3D3D",
  card: "#FFFFFF",
};

function drawFrame(
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  height: number,
  kicker: string,
  title: string,
  subtitle?: string,
) {
  svg.append("rect").attr("width", 960).attr("height", height).attr("rx", 28).attr("fill", COLORS.bg);
  svg.append("rect").attr("x", 48).attr("y", 64).attr("width", 864).attr("height", 1).attr("fill", COLORS.rule);
  svg
    .append("text")
    .attr("x", 48)
    .attr("y", 44)
    .attr("fill", COLORS.muted)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 14)
    .attr("letter-spacing", 2)
    .text(kicker);
  svg
    .append("text")
    .attr("x", 48)
    .attr("y", 96)
    .attr("fill", COLORS.ink)
    .attr("font-family", "Fraunces, Times New Roman, serif")
    .attr("font-size", 28)
    .text(title);
  if (subtitle) {
    svg
      .append("text")
      .attr("x", 48)
      .attr("y", 126)
      .attr("fill", COLORS.muted)
      .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
      .attr("font-size", 12)
      .text(subtitle);
  }
}

function drawBars(
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  labels: string[],
  values: number[],
  options: {
    kicker: string;
    title: string;
    subtitle?: string;
    note: string;
    accentLast?: boolean;
  },
) {
  drawFrame(svg, 560, options.kicker, options.title, options.subtitle);
  const left = 260;
  const right = 80;
  const top = 150;
  const barHeight = 18;
  const gap = 60;
  const maxWidth = 960 - left - right;

  labels.forEach((label, i) => {
    svg
      .append("text")
      .attr("x", 80)
      .attr("y", top + i * gap + 16)
      .attr("fill", COLORS.ink)
      .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
      .attr("font-size", 14)
      .text(label);

    svg
      .append("rect")
      .attr("x", left)
      .attr("y", top + i * gap)
      .attr("width", maxWidth)
      .attr("height", barHeight)
      .attr("rx", 9)
      .attr("fill", COLORS.rule);

    const fill = options.accentLast && i === labels.length - 1 ? COLORS.warn : COLORS.accent;
    svg
      .append("rect")
      .attr("x", left)
      .attr("y", top + i * gap)
      .attr("width", Math.max(40, maxWidth * values[i]))
      .attr("height", barHeight)
      .attr("rx", 9)
      .attr("fill", fill);
  });

  svg
    .append("text")
    .attr("x", 48)
    .attr("y", 480)
    .attr("fill", COLORS.muted)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 12)
    .text(options.note);
}

function drawLineChart(
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  points: number[],
  labels: string[],
  options: { kicker: string; title: string; note: string },
) {
  drawFrame(svg, 560, options.kicker, options.title);
  svg.append("line").attr("x1", 120).attr("y1", 440).attr("x2", 840).attr("y2", 440).attr("stroke", "#D9D0C5").attr("stroke-width", 2);
  svg.append("line").attr("x1", 120).attr("y1", 160).attr("x2", 120).attr("y2", 440).attr("stroke", "#D9D0C5").attr("stroke-width", 2);

  const x = d3.scalePoint<number>().domain(d3.range(points.length)).range([150, 710]);
  const y = d3.scaleLinear().domain([0, 1]).range([400, 220]);

  const line = d3.line<number>()
    .x((d, i) => x(i) ?? 0)
    .y((d) => y(d));

  svg.append("path").attr("d", line(points) ?? "").attr("stroke", COLORS.accent).attr("stroke-width", 3).attr("fill", "none");

  points.forEach((value, i) => {
    svg.append("circle").attr("cx", x(i) ?? 0).attr("cy", y(value)).attr("r", 6).attr("fill", COLORS.accent);
    svg
      .append("text")
      .attr("x", (x(i) ?? 0) - 20)
      .attr("y", 462)
      .attr("fill", COLORS.muted)
      .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
      .attr("font-size", 12)
      .text(labels[i]);
  });

  svg
    .append("text")
    .attr("x", 48)
    .attr("y", 500)
    .attr("fill", COLORS.muted)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 12)
    .text(options.note);
}

function drawThresholdChart(
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  options: { kicker: string; title: string; note: string; thresholdLabel: string; yLabel: string; xLabel: string },
) {
  drawFrame(svg, 560, options.kicker, options.title);

  svg.append("line").attr("x1", 120).attr("y1", 440).attr("x2", 840).attr("y2", 440).attr("stroke", "#D9D0C5").attr("stroke-width", 2);
  svg.append("line").attr("x1", 120).attr("y1", 160).attr("x2", 120).attr("y2", 440).attr("stroke", "#D9D0C5").attr("stroke-width", 2);

  const curve = [0.1, 0.28, 0.45, 0.58, 0.68, 0.78, 0.84];
  const x = d3.scalePoint<number>().domain(d3.range(curve.length)).range([120, 840]);
  const y = d3.scaleLinear().domain([0, 1]).range([420, 190]);

  const line = d3.line<number>()
    .x((d, i) => x(i) ?? 0)
    .y((d) => y(d));

  svg.append("path").attr("d", line(curve) ?? "").attr("stroke", COLORS.accent).attr("stroke-width", 3).attr("fill", "none");

  svg.append("line")
    .attr("x1", 120)
    .attr("x2", 840)
    .attr("y1", y(0.62))
    .attr("y2", y(0.62))
    .attr("stroke", COLORS.warn)
    .attr("stroke-width", 3)
    .attr("stroke-dasharray", "8 8");

  svg.append("text")
    .attr("x", 150)
    .attr("y", y(0.62) - 10)
    .attr("fill", COLORS.warn)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 12)
    .text(options.thresholdLabel);

  svg.append("text")
    .attr("x", 120)
    .attr("y", 470)
    .attr("fill", COLORS.muted)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 12)
    .text(options.xLabel);

  svg.append("text")
    .attr("x", 54)
    .attr("y", 190)
    .attr("fill", COLORS.muted)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 12)
    .attr("transform", "rotate(-90 54 190)")
    .text(options.yLabel);

  svg
    .append("text")
    .attr("x", 48)
    .attr("y", 500)
    .attr("fill", COLORS.muted)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 12)
    .text(options.note);
}

function drawLoop(
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  labels: { internal: string; detect: string; gate: string; review: string },
  options: { kicker: string; title: string; note: string },
) {
  drawFrame(svg, 560, options.kicker, options.title);

  const boxes = [
    { x: 96, y: 160, label: labels.internal },
    { x: 380, y: 160, label: labels.detect },
    { x: 664, y: 160, label: labels.gate },
    { x: 380, y: 300, label: labels.review },
  ];

  boxes.forEach((box) => {
    svg.append("rect")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", 200)
      .attr("height", 68)
      .attr("rx", 14)
      .attr("fill", "#F2EEE7")
      .attr("stroke", "#D9D0C5");
    svg
      .append("text")
      .attr("x", box.x + 22)
      .attr("y", box.y + 36)
      .attr("fill", COLORS.ink)
      .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
      .attr("font-size", 13)
      .text(box.label);
  });

  const lines = [
    { x1: 296, y1: 194, x2: 380, y2: 194 },
    { x1: 580, y1: 194, x2: 664, y2: 194 },
    { x1: 764, y1: 228, x2: 764, y2: 300 },
    { x1: 480, y1: 368, x2: 480, y2: 420 },
    { x1: 250, y1: 420, x2: 196, y2: 420 },
  ];

  lines.forEach((line) => {
    svg
      .append("line")
      .attr("x1", line.x1)
      .attr("y1", line.y1)
      .attr("x2", line.x2)
      .attr("y2", line.y2)
      .attr("stroke", COLORS.accent)
      .attr("stroke-width", 2);
  });

  svg
    .append("path")
    .attr("d", "M480 420 C480 460 360 460 250 420")
    .attr("stroke", COLORS.accent)
    .attr("stroke-width", 2)
    .attr("fill", "none");

  svg
    .append("text")
    .attr("x", 48)
    .attr("y", 500)
    .attr("fill", COLORS.muted)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 12)
    .text(options.note);
}

function drawBoxplot(
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  kicker: string,
  title: string,
  subtitle: string,
  labels: string[],
  stats: Array<{ min: number; q1: number; median: number; q3: number; max: number }>,
  note: string,
) {
  const height = 620;
  drawFrame(svg, height, kicker, title, subtitle);

  svg.append("rect").attr("x", 200).attr("y", 180).attr("width", 700).attr("height", 340).attr("rx", 16).attr("fill", COLORS.card).attr("stroke", COLORS.rule);

  const rows = labels.map((label, i) => ({ label, y: 236 + i * 113 }));
  rows.forEach((row) => {
    svg
      .append("text")
      .attr("x", 180)
      .attr("y", row.y + 6)
      .attr("text-anchor", "end")
      .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
      .attr("font-size", 12)
      .attr("fill", COLORS.ink)
      .text(row.label);
  });

  const scale = d3.scaleLinear().domain([0, 1]).range([200, 900]);

  stats.forEach((stat, i) => {
    const y = rows[i].y;
    svg.append("line")
      .attr("x1", scale(stat.min))
      .attr("x2", scale(stat.max))
      .attr("y1", y)
      .attr("y2", y)
      .attr("stroke", COLORS.accent)
      .attr("stroke-width", 2);

    svg.append("rect")
      .attr("x", scale(stat.q1))
      .attr("y", y - 14)
      .attr("width", Math.max(12, scale(stat.q3) - scale(stat.q1)))
      .attr("height", 28)
      .attr("rx", 6)
      .attr("fill", COLORS.accent)
      .attr("opacity", 0.2);

    svg.append("line")
      .attr("x1", scale(stat.median))
      .attr("x2", scale(stat.median))
      .attr("y1", y - 16)
      .attr("y2", y + 16)
      .attr("stroke", COLORS.accent)
      .attr("stroke-width", 2);
  });

  svg
    .append("text")
    .attr("x", 48)
    .attr("y", 560)
    .attr("fill", COLORS.muted)
    .attr("font-family", "IBM Plex Sans, Arial, sans-serif")
    .attr("font-size", 12)
    .text(note);
}

export default function SignalsPanel({ lang }: { lang: Lang }) {
  const copy = lang === "en"
    ? {
        sl5: {
          kicker: "SL5 SURFACES",
          title: "Security domain map",
          note: "Relative intensity of expected controls under SL5 by security domain.",
          labels: ["Supply chain", "Network", "Machines", "Physical", "Personnel and agents"],
        },
        loop: {
          kicker: "CONTINUOUS MONITORING",
          title: "Observation and containment loop",
          note: "Continuous observation integrates internal signals, scoring, and containment with human escalation.",
          labels: { internal: "Internal signals", detect: "Detection and scoring", gate: "Active gate", review: "Human review" },
        },
        threshold: {
          kicker: "INTERDICTION",
          title: "Risk threshold and response",
          note: "The active gate triggers when the internal signal exceeds a conservative threshold.",
          thresholdLabel: "Interdiction threshold",
          yLabel: "Risk signal",
          xLabel: "Operational time",
        },
        residual: {
          kicker: "LIMITATIONS",
          title: "Residual monitoring coverage",
          note: "Mid-layer monitoring focuses on factual statements; multi-hop or covert routes may evade it.",
          labels: ["Factual statements", "Multi-hop reasoning", "Covert instructions"],
        },
        vectors: {
          kicker: "COMPOSITE",
          title: "Conceptual vector gate",
          note: "The gating decision is computed with differentiated weights by conceptual category.",
          labels: ["Truthfulness", "Cyber misuse", "Bio-defense", "Aggregated weight"],
        },
        pressure: {
          kicker: "EVALUATION",
          title: "Evaluation pressure and thresholds",
          note: "Evaluation pressure increases the sensitivity required by detection thresholds.",
          labels: ["Baseline", "WMDP chem", "Jailbreaks", "Expanded suite"],
        },
        truth: {
          kicker: "RESULTS",
          title: "Truthfulness separation",
          subtitle: "Max-score distributions by category",
          note: "Interquartile range and median per category with full score range.",
          labels: ["TruthfulQA (Control)", "TruthfulQA (Misconceptions)", "TruthfulQA (Factual Lies)"],
        },
        bio: {
          kicker: "RESULTS",
          title: "Bio-defense profile",
          subtitle: "Separation of safe corpus and misuse",
          note: "Interquartile range and median per category with full score range.",
          labels: ["Bio Retain (Safe Corpus)", "WMDP BIO (Misuse)"],
        },
      }
    : {
        sl5: {
          kicker: "SUPERFICIES SL5",
          title: "Mapa de dominios de seguridad",
          note: "Intensidad relativa de controles esperados bajo SL5 por dominio de seguridad.",
          labels: ["Cadena de suministro", "Red", "Máquinas", "Físico", "Personal y agentes"],
        },
        loop: {
          kicker: "MONITOREO CONTINUO",
          title: "Ciclo de observación y contención",
          note: "La observación continua integra señales internas, scoring y contención con escalamiento humano.",
          labels: { internal: "Señales internas", detect: "Detección y score", gate: "Compuerta activa", review: "Revisión humana" },
        },
        threshold: {
          kicker: "INTERDICCIÓN",
          title: "Umbral de riesgo y respuesta",
          note: "La compuerta activa se dispara cuando la señal interna supera un umbral conservador.",
          thresholdLabel: "Umbral de interdicción",
          yLabel: "Señal de riesgo",
          xLabel: "Tiempo operativo",
        },
        residual: {
          kicker: "LIMITACIONES",
          title: "Cobertura del monitoreo residual",
          note: "El monitoreo de capas medias se centra en afirmaciones fácticas; rutas multi-salto o encubiertas podrían evadirlo.",
          labels: ["Enunciados fácticos", "Razonamiento multi-salto", "Instrucciones encubiertas"],
        },
        vectors: {
          kicker: "COMPUESTO",
          title: "Compuerta por vectores conceptuales",
          note: "La decisión de compuerta se calcula con pesos diferenciados por categoría conceptual.",
          labels: ["Veracidad", "Ciber-uso indebido", "Bio-defensa", "Peso agregado"],
        },
        pressure: {
          kicker: "EVALUACIÓN",
          title: "Presión de evaluación y umbrales",
          note: "La presión de evaluación incrementa la sensibilidad requerida de los umbrales de detección.",
          labels: ["Base", "WMDP chem", "Jailbreaks", "Suite ampliada"],
        },
        truth: {
          kicker: "RESULTADOS",
          title: "Separación de veracidad",
          subtitle: "Distribuciones de puntaje máximo por categoría",
          note: "Caja intercuartílica y mediana por categoría con rango total de puntuaciones.",
          labels: ["TruthfulQA (Control)", "TruthfulQA (Misconceptions)", "TruthfulQA (Factual Lies)"],
        },
        bio: {
          kicker: "RESULTADOS",
          title: "Perfil bio-defensa",
          subtitle: "Separación de corpus seguro y misuse",
          note: "Caja intercuartílica y mediana por categoría con rango total de puntuaciones.",
          labels: ["Bio Retain (Safe Corpus)", "WMDP BIO (Misuse)"],
        },
      };

  const sl5Values = [0.68, 0.6, 0.74, 0.52, 0.86];
  const residualValues = [0.8, 0.5, 0.3];
  const vectorValues = [0.68, 0.52, 0.6, 0.78];
  const pressurePoints = [0.25, 0.45, 0.65, 0.78];

  const truthStats = [
    { min: 0.05, q1: 0.28, median: 0.34, q3: 0.45, max: 0.7 },
    { min: 0.35, q1: 0.52, median: 0.58, q3: 0.68, max: 0.88 },
    { min: 0.1, q1: 0.45, median: 0.55, q3: 0.7, max: 0.95 },
  ];

  const bioStats = [
    { min: 0.2, q1: 0.45, median: 0.52, q3: 0.62, max: 0.78 },
    { min: 0.55, q1: 0.78, median: 0.82, q3: 0.88, max: 0.95 },
  ];

  return (
    <div className="chart-grid">
      <div className="chart-card">
        <ChartShell
          ariaLabel={copy.sl5.title}
          draw={(svg) => drawBars(svg, copy.sl5.labels, sl5Values, {
            kicker: copy.sl5.kicker,
            title: copy.sl5.title,
            note: copy.sl5.note,
          })}
        />
        <h3>{copy.sl5.title}</h3>
        <p>{copy.sl5.note}</p>
      </div>
      <div className="chart-card">
        <ChartShell
          ariaLabel={copy.loop.title}
          draw={(svg) => drawLoop(svg, copy.loop.labels, {
            kicker: copy.loop.kicker,
            title: copy.loop.title,
            note: copy.loop.note,
          })}
        />
        <h3>{copy.loop.title}</h3>
        <p>{copy.loop.note}</p>
      </div>
      <div className="chart-card">
        <ChartShell
          ariaLabel={copy.threshold.title}
          draw={(svg) => drawThresholdChart(svg, copy.threshold)}
        />
        <h3>{copy.threshold.title}</h3>
        <p>{copy.threshold.note}</p>
      </div>
      <div className="chart-card">
        <ChartShell
          ariaLabel={copy.residual.title}
          draw={(svg) => drawBars(svg, copy.residual.labels, residualValues, {
            kicker: copy.residual.kicker,
            title: copy.residual.title,
            note: copy.residual.note,
          })}
        />
        <h3>{copy.residual.title}</h3>
        <p>{copy.residual.note}</p>
      </div>
      <div className="chart-card">
        <ChartShell
          ariaLabel={copy.vectors.title}
          draw={(svg) => drawBars(svg, copy.vectors.labels, vectorValues, {
            kicker: copy.vectors.kicker,
            title: copy.vectors.title,
            note: copy.vectors.note,
            accentLast: true,
          })}
        />
        <h3>{copy.vectors.title}</h3>
        <p>{copy.vectors.note}</p>
      </div>
      <div className="chart-card">
        <ChartShell
          ariaLabel={copy.pressure.title}
          draw={(svg) => drawLineChart(svg, pressurePoints, copy.pressure.labels, {
            kicker: copy.pressure.kicker,
            title: copy.pressure.title,
            note: copy.pressure.note,
          })}
        />
        <h3>{copy.pressure.title}</h3>
        <p>{copy.pressure.note}</p>
      </div>
      <div className="chart-card">
        <ChartShell
          ariaLabel={copy.truth.title}
          height={620}
          draw={(svg) => drawBoxplot(svg, copy.truth.kicker, copy.truth.title, copy.truth.subtitle, copy.truth.labels, truthStats, copy.truth.note)}
        />
        <h3>{copy.truth.title}</h3>
        <p>{copy.truth.note}</p>
      </div>
      <div className="chart-card">
        <ChartShell
          ariaLabel={copy.bio.title}
          height={620}
          draw={(svg) => drawBoxplot(svg, copy.bio.kicker, copy.bio.title, copy.bio.subtitle, copy.bio.labels, bioStats, copy.bio.note)}
        />
        <h3>{copy.bio.title}</h3>
        <p>{copy.bio.note}</p>
      </div>
    </div>
  );
}
