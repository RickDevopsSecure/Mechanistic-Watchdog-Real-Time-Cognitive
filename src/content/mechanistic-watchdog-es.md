<div id="texto-principal"></div>

## Resumen—

Mechanistic Watchdog es una capa de seguridad en tiempo real que monitorea activaciones internas de un modelo de lenguaje y puede interrumpir la generación antes de que emerja contenido dañino. El enfoque se apoya en señales internas interpretables y en una compuerta activa alineada con SL5 para reducir riesgo en despliegues de alta criticidad. Se presenta una formulación operativa, decisiones de calibración y resultados iniciales que motivan su uso como control preventivo, no como sustituto de política o revisión humana.

## Términos clave—

interdicción cognitiva; monitoreo interno; SL5; activaciones residuales; compuerta activa.

## TL;DR—

Se propone un interruptor cognitivo que detecta señales internas de riesgo y detiene la generación con baja latencia. El objetivo es interceptar conductas de alto riesgo antes de que aparezcan en texto. Se muestran separaciones tempranas entre categorías y trade‑offs relevantes, en particular falsas activaciones y sensibilidad bajo presión adversarial.

## I. Motivación y alcance

Los modelos actuales se despliegan en entornos donde una salida incorrecta puede impactar dinero, infraestructura o decisiones clínicas. El alineamiento basado en salida opera como filtro tardío y puede fallar ante estrategias encubiertas, fragmentación de información o presión adversarial sostenida. Un mecanismo que observe señales internas durante la inferencia reduce esa ventana de exposición, en línea con recomendaciones SL5 sobre monitoreo continuo y compuertas activas [11]. La motivación principal no es resolver alineación, sino reducir riesgo operativo ante desalineación emergente y uso indebido.

## II. Definición del mecanismo

Mechanistic Watchdog se define como un circuito ligero que lee activaciones en tiempo real y calcula puntajes sobre direcciones conceptuales asociadas a riesgo. La compuerta actúa dentro del mismo pase de inferencia, evitando la latencia y el costo de un segundo modelo o filtro pos‑hoc. El objetivo es interrumpir antes de emitir el siguiente token cuando se supera un umbral conservador. El diseño prioriza una decisión temprana sobre una explicación exhaustiva y se concibe como control complementario [7], [8].

## III. Señales internas y medición

Se utilizan residuals de capas medias porque capturan intención de alto nivel y son accesibles durante inferencia. Las direcciones se obtienen mediante sondeo lineal y separación de medias en conjuntos positivos y negativos [9]. El puntaje operativo se calcula como proyección de la activación sobre cada dirección, lo que permite atribuir qué concepto disparó la compuerta y con qué intensidad. Esta legibilidad es relevante para auditoría y ajuste de políticas [12].

## IV. Calibración y umbrales

El umbral se calibra como decisión de margen de seguridad. Umbrales bajos reducen el riesgo de escape, pero aumentan falsos positivos; umbrales altos disminuyen interrupciones accidentales, pero pueden permitir conductas peligrosas. En esta fase se privilegia precaución y se documenta el costo operativo esperado. La calibración se apoya en TruthfulQA y Facts‑true‑false para veracidad, y WMDP para misuse, con evaluación específica por dominio [10], [14], [15].

## V. Resultados y visuales

Los resultados iniciales muestran separaciones consistentes entre clases en dos dominios y un overhead de latencia acotado. Las Figuras 1–8 resumen la distribución de controles por dominio, el loop de observación, el umbral de interdicción y la sensibilidad a presión adversarial. Las Figuras 7–8 muestran boxplots de separación por categoría con lectura operacional del umbral. Estas visualizaciones son ilustrativas y no sustituyen análisis estadístico completo.

<!-- FIGURES -->

## VI. Riesgos y activaciones accidentales

Un control de seguridad puede fallar por omisión o por exceso. En entornos de alta criticidad, un falso positivo puede bloquear tareas benignas y generar costos reales. Por ello se documenta la tasa de interrupciones y se consideran compuertas multi‑vector para reducir activaciones espurias. El mecanismo se concibe como reducción de riesgo, no como garantía absoluta.

## VII. Ubicación en el ecosistema

Mechanistic Watchdog no es un método de alineación ni un filtro de contenido tradicional. Es un control operacional que puede convivir con red teaming, auditoría y herramientas de interpretabilidad [7]. Su valor reside en actuar aguas arriba del texto y generar señales auditables durante la inferencia. La compatibilidad con SL5 se apoya en contención activa con intervención temprana [11].

## VIII. Limitaciones y trabajo futuro

El enfoque actual depende de un número reducido de direcciones conceptuales y no está validado contra adaptación adversarial avanzada. El estrés debe ampliarse con suites más agresivas y adversarios adaptativos, y con dominios como ciberseguridad y química. También se requiere estudiar estabilidad de direcciones bajo cambios de modelo y contexto. El objetivo es mejorar sensibilidad sin aumentar de forma desproporcionada los falsos positivos.

<div id="siguientes-pasos"></div>

## IX. Siguientes pasos

Se propone expandir vectores conceptuales, ajustar ponderaciones por categoría y validar la respuesta del sistema bajo presión adversarial. También se plantea instrumentar métricas de costo operativo y de resiliencia frente a evasión. Creado por Ricardo Martinez, Fernando Valdovinos, Luis Cosio y Godric Aceves. Defensive Acceleration Hackathon 2025.

<div id="bibliografia"></div>

## Referencias

[1] N. Elhage et al., “Toy Models of Superposition,” Transformer Circuits Thread, 2022. https://transformer-circuits.pub/2022/toy_model/index.html

[2] A. Shimi, “Understanding gradient hacking,” AI Alignment Forum, 2021. https://www.alignmentforum.org/posts/U7Z2sJp7t7j2Z/understanding-gradient-hacking

[3] A. Karpov et al., “The steganographic potentials of language models,” arXiv:2505.03439, 2025. https://arxiv.org/abs/2505.03439

[4] M. Steinebach, “Natural language steganography by ChatGPT,” ARES 2024. https://dl.acm.org/doi/10.1145/3664476.3664514

[5] M. Andriushchenko and N. Flammarion, “Does refusal training in LLMs generalize to the past tense?” arXiv:2407.11969, 2024. https://arxiv.org/abs/2407.11969

[6] S. Martin, “How difficult is AI alignment?” AI Alignment Forum, 2024. https://www.alignmentforum.org/posts/vJFdjigz2CFu8j96b/how-difficult-is-ai-alignment

[7] N. Goldowsky-Dill et al., “Detecting Strategic Deception Using Linear Probes,” arXiv:2502.03407, 2025. https://arxiv.org/abs/2502.03407

[8] A. Zou et al., “Representation Engineering: A Top-Down Approach to AI Transparency,” arXiv:2310.01405, 2023. https://arxiv.org/abs/2310.01405

[9] A. Azaria and T. Mitchell, “The Internal State of an LLM Knows When It’s Lying,” arXiv:2304.13734, 2023. https://arxiv.org/abs/2304.13734

[10] S. Lin et al., “TruthfulQA: Measuring How Models Mimic Human Falsehoods,” ACL 2022. https://aclanthology.org/2022.acl-long.229/

[11] RAND Corporation, “A Playbook for Securing AI Model Weights,” Research Brief, 2024. https://www.rand.org/pubs/research_briefs/RBA2849-1.html

[12] S. Marks and M. Tegmark, “The Geometry of Truth: Correlation is not Causation,” arXiv:2310.06824, 2023. https://arxiv.org/abs/2310.06824

[13] L1Fthrasir, “Facts-true-false,” Hugging Face, 2024. https://huggingface.co/datasets/L1Fthrasir/Facts-true-false

[14] Center for AI Safety, “WMDP,” Hugging Face, 2023. https://huggingface.co/datasets/cais/wmdp

[15] Latencia medida en NVIDIA RTX 4090. Los valores pueden variar por hardware.
