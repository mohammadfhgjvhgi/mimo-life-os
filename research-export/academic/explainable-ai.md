# Explainable AI (XAI)

> Task W13 — Academic HCI Evidence Collection. Topic 15 of 16. Evidence-first: every claim cited.

## 1. Topic Overview

**Explainable AI (XAI)** is a field of research that explores methods to provide humans with the ability of intellectual oversight over AI algorithms, with a focus on the *reasoning* behind the AI's decisions or predictions. XAI overlaps with **interpretable AI** and **explainable machine learning (XML)**. The field counters the "black box" tendency of modern machine learning (especially deep neural networks and large language models), in which even the AI's designers cannot fully explain why a specific output was produced. XAI is motivated by safety, accountability, regulatory compliance (GDPR Article 22 "right to explanation"), and user trust. Three foundational principles: **transparency, interpretability, explainability** [Source: https://en.wikipedia.org/wiki/Explainable_artificial_intelligence, accessed 2026-08-07].

## 2. Primary Source

> Doshi-Velez, F., & Kim, B. (2017). "Towards A Rigorous Science of Interpretable Machine Learning." arXiv:1702.08608. — formalized the scientific framework for interpretable ML.

> Guidotti, R., Monreale, A., Ruggieri, S., Turini, F., Giannotti, F., & Pedreschi, D. (2018). "A Survey Of Methods For Explaining Black Box Models." *ACM Computing Surveys*, 51(5): 93. doi:10.1145/3236009. — the canonical survey.

> Rudin, C. (2019). "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead." *Nature Machine Intelligence*, 1: 206–215. doi:10.1038/s42256-019-0048-x. — argued for inherently interpretable models over post-hoc explanation.

> Carvalho, D. V., Pereira, E. M., & Cardoso, J. S. (2019). "Machine Learning Interpretability: A Survey on Methods and Metrics." *Electronics*, 8(8): 832. doi:10.3390/electronics8080832.

**US Government Origin**: The term "Explainable AI" (XAI) was popularized by the **DARPA XAI program** (2016), a $75M multi-year research program. (DARPA Broad Agency Announcement DARPA-BAA-16-53, August 10, 2016.)

Recent AI-UX primary sources (primary-fetched this round):

> Gao, Z., Muñoz Barón, M., Habiba, U., Graziotin, D., & Wagner, S. (2026). "Evaluating the Impact of Explainable AI on Trust in AI-Assisted Code Review." arXiv:2607.24601 [cs.SE/HC]. To appear in *Proceedings of the ACM on Software Engineering (PACMSE)*, Vol. 3, ISSTA 2026. [Source: https://arxiv.org/abs/2607.24601, accessed 2026-08-07]

> Palod, V., Biswas, U., & Kambhampati, S. (2026). "Evaluating the False Trust Engendered by LLM Explanations." arXiv:2605.10930 [cs.HC]. [Source: https://arxiv.org/abs/2605.10930, accessed 2026-08-07]

## 3. Core Principle

> AI systems should expose their reasoning in human-understandable terms so users can verify outputs, debug failures, comply with regulations, and trust (or distrust) appropriately. The three principles are: (1) **transparency** (model structure and training process inspectable), (2) **interpretability** (model behavior comprehensible to humans), (3) **explainability** (the contribution of features to specific decisions can be described).

## 4. Formal Statement

XAI distinguishes three concepts:

- **Transparency**: a model is "transparent if the processes that extract model parameters from training data and generate labels from testing data can be described and motivated by the approach designer." Includes: simulatability (reproducibility of predictions), decomposability (intuitive explanations for parameters), algorithmic transparency (explaining how algorithms work).
- **Interpretability**: the possibility of comprehending the ML model and presenting the underlying basis for decision-making in a way that is understandable to humans.
- **Explainability**: "the collection of features of the interpretable domain that have contributed, for a given example, to producing a decision (e.g., classification or regression)".

[Source: https://en.wikipedia.org/wiki/Explainable_artificial_intelligence, accessed 2026-08-07 — verbatim definitions.]

XAI methods classify into:
- **Inherently interpretable models**: linear regression, decision trees, generalized additive models (GAMs), Concept Bottleneck Models.
- **Post-hoc explanation methods** (model-agnostic): LIME (Ribeiro et al. 2016), SHAP (Lundberg & Lee 2017), counterfactual explanations, saliency maps, attention visualization.
- **Post-hoc model-specific methods**: gradient-based saliency (Simonyan et al. 2013), Grad-CAM (Selvaraju et al. 2017).

**Contrastive explanations** (Miller 2019, *ACM XRDS*): explanation in human psychology is *contrastive* — humans ask "why P rather than Q?" — argues XAI should compare alternatives.

**Counterfactual explanations** (Wachter, Mittelstadt & Russell 2017): "Had X been different, the output would have been Y" — minimal change to input that flips output.

## 5. Empirical Evidence

- **LIME (Ribeiro et al. 2016, KDD '16)**: local interpretable model-agnostic explanations; widely adopted.
- **SHAP (Lundberg & Lee 2017, NeurIPS '17)**: Shapley-value-based feature attribution; currently the most-used post-hoc method.
- **Rudin (2019, *Nature Machine Intelligence*)**: argued that post-hoc explanations are unreliable for high-stakes decisions; inherently interpretable models should be used instead — influential critique.
- **Adebayo et al. (2018, ICML '18)** "Sanity Checks for Saliency Maps" — showed many saliency methods are insensitive to model and data, raising reliability concerns.
- **Gao et al. 2026 (arXiv:2607.24601)** — n=34 within-subjects study on AI code review: full explanations yield highest trust (M=3.99/5) but moderate explanations yield highest agreement (89.22%). Empirically demonstrates the trust/agreement trade-off [Source: https://arxiv.org/abs/2607.24601, accessed 2026-08-07].
- **Palod et al. 2026 (arXiv:2605.10930)** — between-subjects study showing LLM reasoning traces and post-hoc explanations are "persuasive but not informative"; only *contrastive dual explanations* improve correctness discrimination [Source: https://arxiv.org/abs/2605.10930, accessed 2026-08-07].
- **arXiv:2607.14152 (2026)** "Trust Junk Leads to Unjustified Support for Highly Discriminatory Predictive Models" — empirical study showing accurate-but-irrelevant data in model explanations produces over-trust [Source: https://arxiv.org/abs/2607.14152, accessed 2026-08-07].
- **SketchXplain (arXiv:2606.17646, 2026)** — sketches as intuitive visual explanations of image classifiers; addresses interpretability gap of saliency maps [Source: https://arxiv.org/abs/2606.17646, accessed 2026-08-07].
- **arXiv:2607.25423 (2026)** "From Dyad to Triad: Eliciting XAI Requirements in Stroke Rehabilitation" — methods for eliciting XAI preferences from patients [Source: https://arxiv.org/abs/2607.25423, accessed 2026-08-07].
- **Bansal et al. 2021, CHI '21** — see `human-ai-interaction.md`: AI explanations can hurt complementary team performance.

## 6. Applications in UI/UX

- **Saliency maps in image classification**: Grad-CAM heatmaps overlaying medical imaging models (Stanford CheXNet), financial document classification.
- **Counterfactual explanations in loan/credit decisions**: "If your income were $5,000 higher, your loan would be approved" — used by Zest AI, FICO.
- **Feature-attribution panels in pricing/risk tools**: SHAP-based decision panels in actuarial software.
- **GDPR Article 22 compliance**: EU General Data Protection Regulation gives users "the right to obtain human intervention, to express their point of view and to contest the [automated] decision" (Art. 22(3)).
- **Lime/SHAP in dashboards**: IBM AI Explainability 360, Google Cloud AI Explanations.
- **Model cards** (Mitchell et al. 2019, *FAT* '19): documentation accompanying ML models disclosing intended use, performance metrics, ethical considerations.

## 7. Applications in AI UX (recent)

- **Apple WWDC25 (2025) Foundation Models `@Generable` macro**: constrained decoding via JSON schema provides a form of structural explainability — outputs are guaranteed to match a schema the user specifies [cross-ref W6a Apple Intelligence evidence].
- **ChatGPT "Why this response?" explainer** (2024): provides post-hoc explanation of AI reasoning for specific outputs.
- **Microsoft Copilot citation pattern**: inline citations to source documents in M365 Copilot — form of provenance explainability.
- **Cursor inline code review**: shows AI reasoning for suggested code edits — but Palod et al. 2026 warns reasoning traces can induce false trust.
- **Anthropic Claude "Thinking"** (2024-2025): exposes extended chain-of-thought — empirically risky per Palod et al.
- **Apple Intelligence on-device UI**: visualizes that the request is processed locally vs. routed to Private Cloud Compute — a form of *process transparency* rather than *reasoning explainability*.
- **arXiv:2607.19941 (2026, MuC '26)**: Paimann et al. list "explainability of agent intent" as a core UX principle for agentic AI in the workplace [Source: https://arxiv.org/abs/2607.19941, accessed 2026-08-07].
- **arXiv:2607.24601 (2026)**: directly measures the trust/agreement trade-off in code-review XAI; recommends *moderate* explanation levels for highest agreement [Source: https://arxiv.org/abs/2607.24601, accessed 2026-08-07].

## 8. Limitations / Critiques

- **Rudin (2019)**: post-hoc explanations are unreliable for high-stakes decisions; inherently interpretable models should be preferred.
- **Adebayo et al. 2018**: many saliency methods are insensitive to model and data — they may not actually explain.
- **Palod et al. 2026 (arXiv:2605.10930)**: LLM reasoning traces and post-hoc explanations are "persuasive but not informative" — they increase user acceptance regardless of correctness; only contrastive dual explanations improve correctness discrimination.
- **arXiv:2607.14152 (2026)** "Trust Junk": accurate-but-irrelevant data in explanations produces over-trust of poor models.
- **Slippery slope**: XAI can be weaponized as "explanation theatre" — appearing transparent while concealing model limits.
- **Cost**: generating explanations adds latency and compute cost; LLM reasoning traces significantly increase token usage.
- **Faithfulness vs. Plausibility** (Jacovi & Goldberg 2020): explanations may sound plausible without faithfully representing the model's computation — a fundamental tension.
- **Explanations don't fix hallucinations**: even with full reasoning trace, an LLM may still produce wrong outputs that look correct; explanations can amplify false trust (Palod et al. 2026).
- **AI UX gap**: most XAI research is technical (new methods); the HCI-side research on how users actually perceive explanations is smaller and produces sobering findings (Bansal 2021; Gao 2026; Palod 2026).

## 9. Modern Relevance (2025)

XAI is central to AI regulation: EU AI Act (2024) requires transparency for high-risk AI; GDPR Article 22 (2018) provides right to explanation for automated decisions; US Executive Order 14110 (2023, revoked 2025) addressed AI transparency; NIST AI RMF (2023) includes "explainability" as a key characteristic. Industry adoption: Microsoft, Google, IBM all offer XAI tooling. Academic CHI/UIST/FAccT tracks grow year-over-year. The 2024–2026 wave of LLM-specific XAI research (chain-of-thought exposure, contrastive explanations, faithfulness evaluation) is the current frontier.

## 10. Implications for AI Operating Systems (evidence-based)

- **Use inherently interpretable models where stakes are high** (Rudin 2019); reserve post-hoc explanation for lower-stakes contexts.
- **Prefer contrastive dual explanations** for LLM-driven decisions: arguments for *and* against the AI's answer (Palod et al. 2026, arXiv:2605.10930).
- **Use moderate explanation levels by default**: full explanations increase trust but decrease agreement — provide drill-down for users who want more (Gao et al. 2026, arXiv:2607.24601).
- **Avoid "trust junk"**: do not pad explanations with accurate-but-irrelevant data (arXiv:2607.14152).
- **Pair XAI with progressive disclosure**: simple explanations on the surface; drill-down to full provenance on demand (Springer & Whittaker 2018, arXiv:1811.02164; cross-ref `progressive-disclosure.md`).
- **Always-available drill-down** to raw input/output traces — no "opacity theatre" (arXiv:2605.10930).
- **Structural explainability via constrained decoding**: Apple WWDC25 `@Generable` macro pattern — outputs match a user-specified schema, providing structural guarantees without reasoning-trace cost.
- **Provenance citations** for factual claims (Perplexity / Bing Chat pattern).
- **Communicate process transparency** (where computed, what model used, what context) — a form of XAI distinct from reasoning explainability; Apple's PCC routing UI is an example.

## 11. Confidence Score

**92 / 100**

Reasoning: Wikipedia Explainable AI (65.6 KB) primary-fetched with full Doshi-Velez & Kim 2017, Guidotti et al. 2018 ACM Computing Surveys, Rudin 2019 *Nature Machine Intelligence*, Carvalho et al. 2019 *Electronics*, and DARPA XAI program (BAA-16-53) citations. Recent (2026) AI-UX evidence is exceptionally strong: arXiv:2607.24601 (primary-fetched with full abstract, n=34 study, full venue: PACMSE ISSTA 2026), arXiv:2605.10930 (primary-fetched, between-subjects study), arXiv:2607.14152, arXiv:2606.17646, arXiv:2607.25423 all primary-fetched via arXiv API. Original Doshi-Velez 2017 paper, Rudin 2019 Nature MI paper, and DARPA BAA-16-53 not directly fetched — would benefit from direct arXiv/Nature/DARPA fetch. Strong evidence chain with both foundational and 2024-2026 frontier research.
