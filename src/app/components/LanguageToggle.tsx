type LanguageToggleProps = {
  lang: "es" | "en";
  basePath: string;
};

export default function LanguageToggle({ lang, basePath }: LanguageToggleProps) {
  const nextLang = lang === "es" ? "en" : "es";
  const label = lang === "es" ? "English" : "Español";
  const targetPath = nextLang === "en" ? `${basePath}/en/` : `${basePath}/`;

  return (
    <a className="lang-toggle" href={targetPath}>
      {label}
    </a>
  );
}
