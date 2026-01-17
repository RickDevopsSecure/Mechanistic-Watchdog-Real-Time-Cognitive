import fs from "fs";
import path from "path";

function quantile(sorted, q) {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

function summarize(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return {
    min: sorted[0],
    q1: quantile(sorted, 0.25),
    median: quantile(sorted, 0.5),
    q3: quantile(sorted, 0.75),
    max: sorted[sorted.length - 1]
  };
}

function groupByCategory(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = row.Category;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row["Peak Score"]);
  }
  return [...map.entries()].map(([category, values]) => ({
    category,
    stats: summarize(values)
  }));
}

function renderBoxplotSvg(title, subtitle, groups) {
  const width = 960;
  const height = 560;
  const plotLeft = 140;
  const plotRight = 900;
  const plotTop = 160;
  const plotBottom = 460;
  const rowHeight = (plotBottom - plotTop) / groups.length;
  const allValues = groups.flatMap(g => [g.stats.min, g.stats.max]);
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);
  const scale = (value) => {
    if (globalMax === globalMin) return plotLeft;
    const t = (value - globalMin) / (globalMax - globalMin);
    return plotLeft + t * (plotRight - plotLeft);
  };

  const lines = [];
  for (let i = 0; i < groups.length; i++) {
    const y = plotTop + rowHeight * (i + 0.5);
    const { min, q1, median, q3, max } = groups[i].stats;
    lines.push(`
      <line x1="${scale(min)}" y1="${y}" x2="${scale(max)}" y2="${y}" stroke="#2D4B3A" stroke-width="2" />
      <rect x="${scale(q1)}" y="${y - 14}" width="${Math.max(1, scale(q3) - scale(q1))}" height="28" rx="6" fill="#2D4B3A" opacity="0.2" />
      <line x1="${scale(median)}" y1="${y - 16}" x2="${scale(median)}" y2="${y + 16}" stroke="#2D4B3A" stroke-width="2" />
    `);
  }

  const labels = groups.map((g, i) => {
    const y = plotTop + rowHeight * (i + 0.5) + 5;
    return `<text x="${plotLeft - 20}" y="${y}" text-anchor="end" font-family="IBM Plex Sans, Arial, sans-serif" font-size="13" fill="#1D1A16">${g.category}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="28" fill="#FBF9F4"/>
  <rect x="48" y="64" width="864" height="1" fill="#E4DDD3"/>
  <text x="48" y="44" fill="#6B6258" font-family="IBM Plex Sans, Arial, sans-serif" font-size="14" letter-spacing="2">RESULTADOS</text>
  <text x="48" y="96" fill="#1D1A16" font-family="Fraunces, Times New Roman, serif" font-size="28">${title}</text>
  <text x="48" y="126" fill="#6B6258" font-family="IBM Plex Sans, Arial, sans-serif" font-size="13">${subtitle}</text>
  <rect x="${plotLeft}" y="${plotTop}" width="${plotRight - plotLeft}" height="${plotBottom - plotTop}" rx="16" fill="#FFFFFF" stroke="#E4DDD3"/>
  ${labels.join("\n")}
  ${lines.join("\n")}
  <text x="48" y="500" fill="#6B6258" font-family="IBM Plex Sans, Arial, sans-serif" font-size="12">Caja intercuartílica y mediana por categoría con rango total de puntuaciones.</text>
</svg>`;
}

function loadJson(name) {
  const filePath = path.join("src", "data", name);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeSvg(targetPath, svg) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, svg, "utf-8");
}

const truth = loadJson("watchdog_chart_data_truthfulness.json");
const truthGroups = groupByCategory(truth.data);
const truthSvg = renderBoxplotSvg(
  "Separación de veracidad",
  "Distribuciones de puntaje máximo por categoría",
  truthGroups
);

const bio = loadJson("watchdog_chart_data_bio_defense.json");
const bioGroups = groupByCategory(bio.data);
const bioSvg = renderBoxplotSvg(
  "Perfil bio-defensa",
  "Separación de corpus seguro y misuse",
  bioGroups
);

writeSvg(path.join("public", "figures", "boxplot-truthfulness.svg"), truthSvg);
writeSvg(path.join("public", "figures", "boxplot-bio.svg"), bioSvg);
writeSvg(path.join("paper", "figures", "boxplot-truthfulness.svg"), truthSvg);
writeSvg(path.join("paper", "figures", "boxplot-bio.svg"), bioSvg);
