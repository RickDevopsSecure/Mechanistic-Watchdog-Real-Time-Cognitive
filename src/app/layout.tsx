import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mechanistic Watchdog: Interdicción Cognitiva en SL5",
  description:
    "Nota de investigación en español sobre desalineación emergente y observación mecanicista bajo un marco SL5.",
  openGraph: {
    title: "Mechanistic Watchdog: Interdicción Cognitiva en Tiempo Real para Desalineación Emergente (SL5)",
    description:
      "Nota de investigación en español sobre observación continua de señales cognitivas internas y límites del alineamiento por salidas.",
    type: "article"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="page">
          {children}
        </div>
      </body>
    </html>
  );
}
