"use client";

import { usePathname, useRouter } from "next/navigation";

type LanguageToggleProps = {
  lang: "es" | "en";
  basePath: string;
};

export default function LanguageToggle({ lang, basePath }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const nextLang = lang === "es" ? "en" : "es";
  const label = lang === "es" ? "English" : "Español";
  const targetPath = nextLang === "en" ? `${basePath}/en/` : `${basePath}/`;

  const handleToggle = () => {
    if (pathname === targetPath || pathname === targetPath.replace(/\/$/, "")) return;
    router.push(targetPath);
  };

  return (
    <button className="lang-toggle" type="button" onClick={handleToggle}>
      {label}
    </button>
  );
}
