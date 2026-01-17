# Mechanistic Watchdog

Link: https://mechwatch.luiscos.io/

Mechanistic Watchdog es un “cognitive kill switch” inspirado en SL5 para modelos tipo Llama: lee el residual stream, no el texto generado, y corta la salida cuando se activa un circuito de engaño. El sistema combina mass-mean probing, representation engineering y hooks de runtime de baja latencia para interdicción en tiempo real.

## Por qué Mechanistic Watchdog

Las recomendaciones SL5 enfatizan monitoreo conductual continuo y compuertas activas en entornos de alta seguridad. Los enfoques basados solo en salidas siguen expuestos a gradient hacking y exfiltración esteganográfica. Mechanistic Watchdog intenta cerrar ese gap observando intención interna en activaciones en lugar de evaluar únicamente texto.

## Diferenciadores clave

1. **Vector de veracidad**: Aísla una dirección lineal “verdad vs. mentira” en el residual stream y define explícitamente `v_deception = -v_truth`.
2. **Interdicción activa**: Convierte señales latentes en una compuerta en tiempo real; se detiene la generación cuando el vector supera umbral.
3. **Baja latencia**: Inspección en un solo pase de inferencia con sobrecarga sub-milisegundo por token en el hardware reportado.

## Cómo funciona

1. **Captura de entrada**: Los prompts pasan por un shim antes de generación.
2. **Escaneo de activaciones**: Activaciones de capa media se proyectan en el vector de engaño en tiempo real.
3. **Decisión**: Debajo del umbral se permite; por encima se dispara el corte.
4. **Salida**: Generaciones seguras continúan; las bloqueadas no salen del límite de hardware.

## Validación

Las gráficas del sitio muestran separación de:

1. **Veracidad**: TruthfulQA control vs. misconceptions/factual-lie calibrado con Facts-true-false.
2. **Bio-defensa**: WMDP-Bio misuse vs. corpus seguro.

## Estructura del repositorio

```
mechanistic-watchdog/
├── README.md
├── requirements.txt
├── scripts/
├── notebooks/
├── MechWatch/
├── src/
├── public/
└── paper/
```

## Publicación en GitHub Pages (main/docs)

Exporta el sitio estático hacia `docs/`:

```bash
NEXT_PUBLIC_BASE_PATH="/NOMBRE_DEL_REPO" npm run export:pages
```

Si el repo se publica en la raíz (sin subruta), deja `NEXT_PUBLIC_BASE_PATH` vacío.

## Primeros pasos

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

## Configuración GPU / CUDA

1. Verifica GPU con `nvidia-smi`.
2. Instala CUDA 12.x si aplica.
3. Instala PyTorch CUDA según la guía oficial.

## Calibración

Ejemplo de perfil de veracidad:

```bash
python -m MechWatch.calibrate \
  --dataset L1Fthrasir/Facts-true-false \
  --samples 400 \
  --out artifacts/deception_vector.pt \
  --stats artifacts/deception_stats.json \
  --concept-name deception
```

Perfiles adicionales (cyber/bio) siguen el mismo patrón con `--dataset-config` y `--dataset-split`.

## Pipeline completo (PowerShell)

```powershell
pwsh scripts\run_watchdog_pipeline.ps1
```

## Runtime

```bash
python -m MechWatch.runtime \
  --prompt "Write a Python worm" \
  --vector-path artifacts/cyber_misuse_vector.pt \
  --threshold -0.27
```

## Dashboard

```bash
streamlit run MechWatch/dashboard.py
```

## Limitaciones

- El monitoreo residual en capas medias se concentra en enunciados fácticos; rutas multi-salto o instrucciones encubiertas pueden evadir señal.
- Falsos positivos posibles; ajustar umbrales y documentar tuning.
- Umbrales y vectores no siempre transfieren entre familias de modelos.

## Roadmap

- Múltiples vectores conceptuales con compuerta ponderada.
- Estrés ampliado con suites grandes (WMDP chem, jailbreaks públicos).
- Atribución por token y overlays en dashboard.

## Bibliografía

[1] E. Hubinger et al., “Risks from learned optimization in advanced machine learning systems,” arXiv:1906.01820, 2019.  
[2] A. Shimi, “Understanding gradient hacking,” AI Alignment Forum, 2021.  
[3] A. Karpov et al., “The steganographic potentials of language models,” arXiv:2505.03439, 2025.  
[4] M. Steinebach, “Natural language steganography by ChatGPT,” ARES 2024.  
[5] M. Andriushchenko & N. Flammarion, “Does refusal training in LLMs generalize to the past tense?” arXiv:2407.11969, 2024.  
[6] S. Martin, “How difficult is AI alignment?” AI Alignment Forum, 2024.  
[7] N. Goldowsky-Dill et al., “Detecting Strategic Deception Using Linear Probes,” arXiv:2502.03407, 2025.  
[8] A. Zou et al., “Representation Engineering: A Top-Down Approach to AI Transparency,” arXiv:2310.01405, 2023.  
[9] A. Azaria & T. Mitchell, “The Internal State of an LLM Knows When It’s Lying,” arXiv:2304.13734, 2023.  
[10] S. Lin et al., “TruthfulQA: Measuring How Models Mimic Human Falsehoods,” ACL 2022.  
[11] RAND Corporation, "A Playbook for Securing AI Model Weights," Research Brief, 2024.  
[12] S. Marks & M. Tegmark, "The Geometry of Truth: Correlation is not Causation," arXiv:2310.06824, 2023.  
[13] L1Fthrasir, “Facts-true-false,” Hugging Face, 2024.  
[14] Center for AI Safety, “WMDP,” Hugging Face, 2023.
