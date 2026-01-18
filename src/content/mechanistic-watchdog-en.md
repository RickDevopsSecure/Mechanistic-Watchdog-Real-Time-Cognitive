<div id="texto-principal"></div>

## Abstract—

Mechanistic Watchdog is a real-time safety layer that monitors a language model’s internal activations and can interrupt generation before harmful content appears. The approach relies on interpretable internal signals and an SL5-aligned active gate to reduce operational risk in high‑stakes deployments. We present the operational framing, calibration decisions, and early results that motivate its use as a preventive control rather than a replacement for policy or human review.

## Index Terms—

cognitive interdiction; internal monitoring; SL5; residual activations; active gating.

## TL;DR—

We propose a cognitive kill switch that detects internal risk signals and halts generation with low latency. The goal is to intercept high‑risk behavior before it reaches text. Early separations are shown across categories with explicit trade‑offs, especially false triggers and sensitivity under adversarial pressure.

## I. Motivation and scope

Modern models are deployed in settings where incorrect outputs can affect money, infrastructure, or clinical decisions. Output‑level alignment behaves like a late filter and can fail under covert strategies, fragmented output, or sustained adversarial pressure. A mechanism that observes internal signals during inference reduces this exposure window, consistent with SL5 guidance on continuous monitoring and active gating [11]. The objective is not to solve alignment, but to reduce operational risk from emergent misalignment and misuse.

## II. Mechanism definition

Mechanistic Watchdog is a lightweight circuit that reads activations in real time and computes scores on risk‑linked concept directions. The gate runs in the same forward pass, avoiding the latency and cost of a second model or post‑hoc filter. The goal is to interrupt before the next token is emitted when a conservative threshold is exceeded. The design prioritizes early intervention over exhaustive explanation and is framed as a complementary control [7], [8].

## III. Internal signals and measurement

We use mid‑layer residuals because they capture higher‑level intent and are accessible during inference. Directions are obtained via linear probing and mean separation across positive and negative sets [9]. Operational scoring is the projection of activations onto each direction, which makes it possible to attribute which concept triggered the gate and how strongly. This traceability matters for auditability and policy tuning [12].

## IV. Calibration and thresholds

Thresholds are calibrated as a safety‑margin decision. Lower thresholds reduce escape risk but raise false positives; higher thresholds reduce accidental interrupts but can permit dangerous behavior. This phase favors caution and documents expected operational cost. Calibration relies on TruthfulQA and Facts‑true‑false for truthfulness and WMDP for misuse, with per‑domain evaluation [10], [14], [15].

## V. Evaluation setup

Evaluation is organized by risk domains and adversarial pressure. We report true‑positive and false‑positive rates along with p95 latency, since a control that adds meaningful delay becomes operationally infeasible. Domain coverage is treated as evidence of generality rather than completeness. Figures 1–6 describe the SL5 domain map, the containment loop, the interdiction threshold, and the staged stress used in testing.

## VI. Results and visuals

Early results show consistent separations across categories and bounded overhead with domain variation. Figure 7 summarizes operational metrics by domain; Figure 8 contrasts single‑vector versus multi‑vector gating; Figure 9 shows TPR degradation under increasing jailbreak pressure. Figures 10 and 11 show max‑score distributions for truthfulness and bio‑defense, useful for observing dispersion and overlap. The visuals are illustrative and do not substitute for full statistical analysis.

<!-- FIGURES -->

## VII. Ablations

The ablation focuses on single‑vector versus multi‑vector gating while keeping latency within similar bounds. Evidence suggests the multi‑vector scheme improves separation when individual signals are weak or ambiguous. The gain depends on coherence across directions, so careful selection and stable validation across sets are required.

## VIII. Adversarial robustness

Robustness is evaluated under jailbreak pressure and adaptive prompts to estimate detection decay when adversaries are aware of the mechanism. The observed trend suggests gradual degradation rather than abrupt collapse, but targeted evasion remains plausible if adversaries optimize against the chosen directions. This frames thresholds as risk parameters, not deterministic guarantees.

## IX. Risks and accidental triggers

A safety control can fail by omission or by excess. In high‑stakes settings, a false positive can block benign tasks and impose real costs. For this reason, interruption rates are tracked and multi‑vector gates are considered to reduce spurious activation. The mechanism is framed as risk reduction, not as an absolute guarantee.

## X. Placement in the ecosystem

Mechanistic Watchdog is not an alignment method or a traditional content filter. It is an operational control that can coexist with red teaming, audit workflows, and interpretability tools [7]. Its value lies in acting upstream of text and producing auditable signals during inference. SL5 compatibility rests on active containment with early intervention [11].

## XI. Limitations

The current approach depends on a small set of concept directions and has not been validated against advanced adversarial adaptation. Stress testing must expand to stronger suites and adaptive opponents, including cyber and chemistry domains. Stability of directions under model and context changes also needs to be characterized.

<div id="siguientes-pasos"></div>

## XII. Next steps

We propose expanding concept vectors, adjusting category weights, and validating response under adversarial pressure. We also plan to instrument metrics for operational cost and evasion resilience. Built by Ricardo Martinez, Fernando Valdovinos, Luis Cosio, and Godric Aceves. Defensive Acceleration Hackathon 2025.

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
