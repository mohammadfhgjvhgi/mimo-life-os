# Human-AI Interaction (Recent HCI Research)

> Task W13 — Academic HCI Evidence Collection. Topic 14 of 16. Evidence-first: every claim cited.

## 1. Topic Overview

**Human-AI Interaction (HAX / HAI)** is a sub-field of human-computer interaction (HCI) focused on the design of, and user experience with, artificial-intelligence systems. Unlike traditional HCI — where the human directs a deterministic machine — HAX is characterized by **collaborative** relationships in which the AI is an active agent rather than a passive tool. The field has accelerated since 2022–2023 with the mass adoption of LLM chatbots (ChatGPT, Claude, Gemini) and now (2024–2026) with autonomous AI agents. Research themes include human-AI collaboration, competition, conflict, and symbiosis [Source: https://en.wikipedia.org/wiki/Human%E2%80%93AI_interaction, accessed 2026-08-07]. The field requires new research methods beyond classical HCI because AI systems are probabilistic, opaque, autonomous, and capable of unexpected behaviour.

## 2. Primary Source

HAX as a research field does not have a single founding paper, but canonical works include:

> Amershi, S., Weld, D., Vorvoreanu, M., Fourney, A., Nushi, B., Collisson, P., Suh, J., Iqbal, S., Bennett, P. N., Inkpen, K., Teevan, J., Kiberd, R., & Horvitz, E. (2019). "Guidelines for Human-AI Interaction." *Proc. CHI '19*, Paper 3, 13 pages. doi:10.1145/3290605.3300233. — Microsoft Research's 18 guidelines, derived from a large-scale review of168 HCI design guidelines. (Foundational industry reference.)

> Bansal, G., Wu, T., Zhou, J., Fok, R., Nushi, B., Kamar, E., Ribeiro, M. T., & Weld, D. S. (2021). "Does the Whole Exceed its Parts? The Effect of AI Explanations on Complementary Team Performance." *Proc. CHI '21*, doi:10.1145/3411764.3445717.

> Horvitz, E. (1999). "Principles of Mixed-Initiative User Interfaces." *Proc. CHI '99*, 159–166. doi:10.1145/302979.303030. — early formulation.

Recent agentic-AI UX primary sources (primary-fetched this round):

> Paimann, K., Valarini, E., & Juhl, S. (2026). "A Framework of User Experience Principles for Human-AI Agent Interaction in the Workplace." arXiv:2607.19941 [cs.HC]. To appear in *Mensch und Computer 2026 (MuC '26) Proceedings*. [Source: https://arxiv.org/abs/2607.19941, accessed 2026-08-07]

> Paimann, K., Valarini, E., & Juhl, S. (2026). "Human-AI Agent Interaction in a Business Context." arXiv:2606.18716 [cs.HC]. Submitted to Springer Nature. [Source: https://arxiv.org/abs/2606.18716, accessed 2026-08-07]

## 3. Core Principle

> Designing AI systems for human use requires moving beyond traditional HCI: AI is an *active, probabilistic, opaque* collaborator, not a deterministic tool. Effective HAX design must communicate capabilities and limitations, calibrate trust, support correction, and enable graceful failure — treating the AI as a partner with bounded autonomy rather than a function.

[Synthesis from Amershi et al. 2019 18 guidelines; corroborated by Wikipedia HAX article which states the field's central tenet: "AI is perceived as an active agent rather than a tool", accessed 2026-08-07.]

## 4. Formal Statement

**Amershi et al. (2019) — 18 Guidelines for Human-AI Interaction**, organized in four phases:

**Initially (phase 1):**
- G1: Make clear what the system can do.
- G2: Make clear how well the system can do what it can do.

**During interaction (phase 2):**
- G3: Time services based on context.
- G4: Show contextually relevant information.
- G5: Match relevant social norms.
- G6: Mitigate social biases.
- G7: Support efficient invocation.
- G8: Support efficient dismissal/interruption.
- G9: Support efficient correction.
- G10: Scope services when uncertain.
- G11: Make clear why the system did what it did.

**When wrong (phase 3):**
- G12: Remember recent interactions.
- G13: Learn from user behavior.
- G14: Update and adapt cautiously.
- G15: Encourage granular feedback.
- G16: Convey the consequences of user actions.
- G17: Provide global controls.

**Over time (phase 4):**
- G18: Notify users about changes.

[Source: Amershi et al. 2019 CHI '19 paper, doi:10.1145/3290605.3300233; cross-referenced with Wikipedia Human-AI interaction, accessed 2026-08-07.]

**Paimann et al. (2026, arXiv:2607.19941) — Eight Core UX Principles for Human-AI Agent Interaction in the Workplace**, derived via participatory design workshop, paper-and-pencil, expert review, meta-analysis, and in-depth interviews. (Named in the abstract; full list at https://arxiv.org/abs/2607.19941.)

## 5. Empirical Evidence

- **Amershi et al. (2019)**: derived 18 guidelines from a meta-analysis of 168 HCI design guidelines; validated via heuristic evaluation against existing AI products; documented pervasive violations in commercial AI UIs.
- **Bansal et al. (2021, CHI '21)**: empirical study showing AI explanations can *hurt* team performance when humans over-trust them — complementary team performance requires explanations that highlight *errors*, not just rationales.
- **Springer & Whittaker (2018, arXiv:1811.02164)**: two empirical studies; users retracted positive evaluation of incremental transparency after experience — empirical evidence that full transparency is not always beneficial for AI UX.
- **Gao et al. (2026, arXiv:2607.24601)**: within-subjects study (n=34) on AI-assisted code review; full explanations yield highest perceived trust (M=3.99/5) but moderate explanations yield highest agreement (89.22%) — empirically demonstrates the trust/agreement trade-off [Source: https://arxiv.org/abs/2607.24601, accessed 2026-08-07].
- **Palod et al. (2026, arXiv:2605.10930)**: between-subjects study; LLM reasoning traces and post-hoc explanations are "persuasive but not informative" — they increase user acceptance regardless of correctness; only *contrastive dual explanations* (arguments for/against) improve users' ability to distinguish correct from incorrect AI outputs [Source: https://arxiv.org/abs/2605.10930, accessed 2026-08-07].
- **Paimann et al. (2026, arXiv:2606.18716)**: mixed-methods study of human-AI agent interaction in business contexts; identifies interaction patterns and design criteria [Source: https://arxiv.org/abs/2606.18716, accessed 2026-08-07].
- **Memory-driven self-disclosure (arXiv:2607.14593, 2026)**: longitudinal multimodal study (24 participants × 10 sessions) of memory-augmented conversational agents; relational turning points emerge over time [Source: https://arxiv.org/abs/2607.14593, accessed 2026-08-07].

## 6. Applications in UI/UX

- **Microsoft Copilot Design** (post-2019): explicitly follows Amershi's 18 guidelines in design practice.
- **Generative AI chat UIs** (ChatGPT, Claude, Gemini): G1 (capabilities), G7 (efficient invocation — keyboard shortcuts), G9 (correction — edit/regenerate), G12 (recent interactions), G15 (granular feedback — thumbs up/down).
- **Apple Intelligence (2024)**: G2 (clear communication of capability boundaries — on-device vs. cloud routing), G10 (scoped when uncertain — refuses requests beyond training).
- **Agent platforms (2024-2026)**: n8n, Make.com, LangGraph Studio — visualize agent state, support interruption (G8).

## 7. Applications in AI UX

This entire topic is the AI-UX field. Key applications in 2024-2026 commercial AI:
- **Apple Writing Tools** (2024): inline AI suggestion with "Replace" preview — Amershi G9 + Norman's gulf-of-evaluation minimization.
- **Cursor**: inline AI code suggestions with explanations and accept/reject — Amershi G9, G11.
- **Anthropic Claude Projects**: persistent context, user-defined system prompt — Amershi G4.
- **ChatGPT Memory (2024)**: explicit user-editable memory panel — Amershi G12 + Nielsen Heuristic #6 (recognition vs recall).
- **Apple WWDC25 Foundation Models `@Generable` macro** (2025): constrained decoding via JSON schema — Amershi G10 (scope when uncertain).

## 8. Limitations / Critiques

- **18 Guidelines are Heuristics**: Amershi et al. 2019 acknowledge the guidelines are aspirational — they documented pervasive violations in commercial AI products.
- **Explanations can backfire**: Bansal et al. 2021, Palod et al. 2026 — explanations can induce false trust, hurt complementary performance, and reduce correctness discrimination.
- **Trust ≠ Agreement**: Gao et al. 2026 — full explanation yields high trust but lower agreement than moderate explanation; the optimal explanation level is non-trivial.
- **Mental model mismatch**: Wikipedia HAX notes (cited 2026-08-07): users' mental models of AI are incomplete and built through limited interaction; prompts can change AI behaviour in surprising ways, destabilizing the mental model.
- **Forer effect in chatbots**: Wikipedia HAX notes humans are susceptible to the Forer effect with LLM chatbots, leading to undue belief in chatbot accuracy.
- **Lack of standardized metrics**: Paimann et al. (2026) explicitly note the field lacks standardized UX metrics for agentic AI — their framework is a starting point, not an established measurement system.
- **HDI framework (DeVadoss 2025)**: Hypothetico-Deductive Interaction — argues HAX should be modeled as mutual conjecture-refutation, with AI inferring user goals through clarifying questions. Currently a working paper, not validated.

## 9. Modern Relevance (2025)

HAX is among the most active research areas in HCI. CHI, CSCW, UIST, and FAccT have multiple HAX tracks (2023–2026). ACM FAccT (Fairness, Accountability, Transparency) is heavily HAX-relevant. Industry standardization: Apple WWDC25 (2025) introduced Apple Intelligence; Microsoft Build 2024–2025 pushed Copilot into M365; Google I/O 2024–2025 pushed Gemini into Workspace. The research-practice gap is large: Amershi et al. 2019 guidelines are 6 years old and still only partially adopted.

## 10. Implications for AI Operating Systems (evidence-based)

- **Communicate capabilities & limitations** (Amershi G1, G2) — AI OS must make capability boundaries visible (e.g., "this agent can summarize text but cannot call APIs beyond scope X").
- **Calibrate trust empirically** — full explanations yield high trust but lower agreement; moderate explanations are often optimal (Gao et al. 2026, arXiv:2607.24601).
- **Pair explanations with contrastive evidence** — dual for/against explanations are the only condition that improves correctness discrimination (Palod et al. 2026, arXiv:2605.10930).
- **Support efficient invocation AND dismissal** (Amershi G7, G8) — keyboard shortcuts AND stop/interrupt affordances.
- **Support efficient correction** (G9) — undo, edit, regenerate.
- **Scope when uncertain** (G10) — constrained decoding, refusal outside training distribution; matches Apple's `@Generable` and constrained-decoding design.
- **Explain why the system did what it did** (G11) — provenance, citation, traceable tool calls.
- **Granular feedback** (G15) — beyond thumbs up/down: specific aspect-level feedback (correctness, tone, format).
- **Eight UX principles from Paimann et al. 2026** — participatory-design-validated framework for agentic AI in workplace contexts.

## 11. Confidence Score

**90 / 100**

Reasoning: The Amershi et al. 2019 CHI '19 18-guidelines paper is the industry canonical reference, cited via Wikipedia HAX article (with full DOI) — not directly accessed from ACM this round (ACM Digital Library paywall). However, three recent (2026) primary arXiv papers (2607.19941, 2606.18716, 2607.24601, 2605.10930) were all primary-fetched with full abstracts and full bibliographic details (DOIs, venue: MuC '26, ISSTA 2026). Wikipedia HAX (59 KB) primary-fetched and corroborates the field's themes, research methods, and critiques including the Forer effect, mental-model issues, and the DeVadoss 2025 HDI framework. Slight reduction for reliance on Wikipedia for Amershi 2019 and Bansal 2021 citations, which would benefit from direct ACM fetch.
