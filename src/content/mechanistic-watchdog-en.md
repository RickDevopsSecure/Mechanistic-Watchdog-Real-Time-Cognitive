<div id="texto-principal"></div>

## Abstract

Mechanistic Watchdog is a real‑time safety layer that monitors a language model’s internal activations and can interrupt generation before harmful content appears. The approach relies on interpretable internal signals and an active gate aligned with SL5 guidance to reduce risk in high‑stakes deployments. We present an operational formulation, calibration choices, and early results that motivate its use as a preventive control rather than a replacement for policy or human oversight.

## TL;DR

We propose a cognitive kill switch that detects internal risk signals and stops generation with low latency. The goal is to intercept high‑risk behavior before it appears in text. We show early separation across categories and discuss tradeoffs such as accidental triggers and sensitivity under adversarial pressure.

## 1. Motivation and stakes

Modern LLMs are deployed in settings where output errors can affect money, infrastructure, or clinical decisions. Output‑level alignment is a late filter and can fail under covert strategies, fragmentation, or sustained adversarial pressure. A mechanism that observes internal signals during inference can reduce the exposure window, consistent with SL5 guidance on continuous monitoring and active gating [11]. The goal is not to solve alignment, but to reduce operational risk under emergent misalignment and misuse.

## 2. Mechanism definition

Mechanistic Watchdog is defined as a lightweight circuit that reads activations in real time and computes scores over risk‑relevant conceptual directions. The gate acts within the same forward pass, avoiding the latency and cost of a second model or post‑hoc filter. The intent is to interrupt before the next token is emitted once a conservative threshold is crossed. The design prioritizes early intervention over exhaustive explanation and is framed as a complementary control [7], [8].

## 3. Internal signals and measurement

We focus on mid‑layer residual streams because they capture high‑level intent and are accessible at inference time. Directions are obtained via linear probing and mean‑difference separation on positive and negative sets [9]. The operational score is a projection onto each direction, enabling attribution of which concept fired and how strongly. This legibility is important for audit and policy tuning [12].

## 4. Calibration and thresholds

Thresholds are calibrated as safety‑margin decisions. Lower thresholds reduce escape risk but increase false positives; higher thresholds reduce interruptions but can miss harmful behavior. This phase favors caution and documents expected operational cost. Calibration uses datasets such as TruthfulQA and Facts‑true‑false for truthfulness and WMDP for misuse, with domain‑specific evaluation [10], [14], [15].

## 5. Results and visuals

Early results show consistent separation between classes across two domains and bounded latency overhead. Figures 1–8 summarize domain control distribution, the observation loop, the interdiction threshold, and sensitivity under adversarial pressure. Figures 7–8 provide boxplots of category separation with an operational reading of the threshold. These figures are illustrative and do not replace full statistical analysis.

<!-- FIGURES -->

## 6. Risks and accidental triggers

A safety control can fail by omission or by excess. In high‑stakes settings, a false positive can block benign tasks and cause real costs. We therefore track interruption rates and consider multi‑vector gating to reduce spurious activations. The mechanism is framed as risk reduction, not as a perfect guardian.

## 7. Position in the safety ecosystem

Mechanistic Watchdog is not an alignment method, a content filter, or a full audit. It is an operational control that can run in deployment alongside red teaming, auditing, and interpretability tools [7]. Its value is acting upstream of text and emitting auditable signals during inference. The SL5 tie‑in is the expectation of active containment with early intervention [11].

## 8. Limitations and future work

The current approach depends on a small set of conceptual directions and is not validated against advanced adaptive adversaries. Stress tests should expand to stronger jailbreak suites and adaptive opponents, and to domains such as cyber and chemistry. Direction stability across models and contexts also remains open. The goal is to improve sensitivity without disproportionate false positives.

<div id="siguientes-pasos"></div>

## 9. Next steps

We propose expanding conceptual vectors, adjusting category weights, and validating performance under adversarial pressure. We also plan to instrument operational‑cost metrics and resilience to evasion. Created by Ricardo Martinez, Fernando Valdovinos, Luis Cosio, and Godric Aceves. Defensive Acceleration Hackathon 2025.

<div id="bibliografia"></div>

## References

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

[15] Latency measured on NVIDIA RTX 4090. Values may vary by hardware.
