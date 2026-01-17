import fs from "fs";
import path from "path";

function ensureEmptyDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

const root = process.cwd();
const outDir = path.join(root, "out");
const docsDir = path.join(root, "docs");

if (!fs.existsSync(outDir)) {
  console.error("No se encontro la carpeta 'out'. Ejecuta 'next build' primero.");
  process.exit(1);
}

ensureEmptyDir(docsDir);
fs.cpSync(outDir, docsDir, { recursive: true });
fs.writeFileSync(path.join(docsDir, ".nojekyll"), "");

console.log("Export completado en /docs para GitHub Pages.");
