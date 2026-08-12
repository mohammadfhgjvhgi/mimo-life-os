# Trust in AI Systems

> Task W13 — Academic HCI Evidence Collection. Topic 16 of 16. Evidence-first: every claim cited.

## 1. Topic Overview

**Trust in AI** is the confidence a user places in an AI system's competence, reliability, and alignment with their goals. As AI moves from passive tools to active collaborators (LLMs, agents), trust has become a central research theme in HCI. The field studies how trust is **formed, calibrated, maintained, repaired, and sometimes misplaced**. Two failure modes dominate the literature: **automation misuse** (over-trust) and **automation disuse** (under-trust). For modern generative AI, a specific failure mode has emerged: **false trust induced by persuasive but uninformative explanations**. Trust in AI is multi-dimensional (cognitive, affective, behavioral) and depends on user characteristics, system properties, context, and task [Source: https://en.wikipedia.org/wiki/Automation_bias, accessed 2026-08-07; cross-ref `human-ai-interaction.md`, `explainable-ai.md`].

## 2. Primary Source

> Parasuraman, R., & Riley, V. (1997). "Humans and Automation: Use, Misuse, Disuse, Abuse." *Human Factors*, 39(2): 230–253. doi:10.1518/001872097778543886. — the foundational taxonomy of automation misuse/disuse.

> Muir, B. M. (1987). "Trust Between Humans and Machines, and the Design of Decision Aids." *International Journal of Man-Machine Studies*, 27(5-6): 527–539. — early trust theory in automation.

> Lee, J. D., & See, K. A. (2004). "Trust in Automation: Designing for Appropriate Reliance." *Human Factors*, 46(1): 50–80. doi:10.1518/hfes.46.1.50_30392. — the most-cited trust-in-automation paper; defines trust as "the attitude that an agent will help achieve an individual's goals in a situation characterized by uncertainty and vulnerability."

> Bansal, G., Wu, T., Zhou, J., Fok, R., Nushi, B., Kamar, E., Ribeiro, M. T., & Weld, D. S. (2021). "Does the Whole Exceed its Parts? The Effect of AI Explanations on Complementary Team Performance." *Proc. CHI '21*. doi:10.1145/3411764.3445717. — empirically showed explanations can hurt complementary performance.

**Recent AI-UX primary sources (primary-fetched this round):**

> Gao, Z., Muñoz Barón, M., Habiba, U., Graziotin, D., & Wagner, S. (2026). "Evaluating the Impact of Explainable AI on Trust in AI-Assisted Code Review." arXiv:2607.24601 [cs.SE/HC]. PACMSE Vol. 3 ISSTA 2026. [Source: https://arxiv.org/abs/2607.24601, accessed 2026-08-07]

> Palod, V., Biswas, U., & Kambhampati, S. (2026). "Evaluating the False Trust Engendered by LLM Explanations." arXiv:2605.10930 [cs.HC]. [Source: https://arxiv.org/abs/2605.10930, accessed 2026-08-07]

> Sun, X., Pan, T., Wang, Y., Wei, S., Bosch, J. A., Echizen, I., El Ali, A., & Sugawara, S. (2026). "When LLM Rationales Become User-Facing: Effects on Trust Perception, Decision-Making, and Gaze Behaviors." arXiv:2606.25489 [cs.HC]. [Source: https://arxiv.org/abs/2606.25489, accessed 2026-08-07]

> Paimann, K., Valarini, E., & Juhl, S. (2026). "A Framework of User Experience Principles for Human-AI Agent Interaction in the Workplace." arXiv:2607.19941 [cs.HC]. MuC '26. [Source: https://arxiv.org/abs/2607.19941, accessed 2026-08-07]

## 3. Core Principle

> Trust in AI must be **calibrated** — neither over-trust (automation misuse) nor under-trust (automation disuse). Effective design uses transparency, explanations, feedback, and behavioral cues to help users form accurate mental models of system capabilities and limits. For LLMs, **rationale presentation and explanation type significantly affect trust** — but in non-obvious ways (full explanations raise trust but lower agreement; contrastive explanations improve correctness discrimination).

## 4. Formal Statement

**Lee & See (2004) trust framework**: Trust is an attitude with three bases:
1. **Performance**: does it do what it's supposed to do?
2. **Process**: how does it work?
3. **Purpose**: why was it built?

Trust leads to **reliance** behavior; appropriate reliance requires trust to match actual system reliability (trust calibration).

**Parasuraman & Riley (1997) Automation Taxonomy**:

| Failure mode | Definition |
|---|---|
| Misuse | Over-trust → user follows automated directives inappropriately |
| Disuse | Under-trust → user ignores correct automated advice |
| Abuse | Automation applied outside its intended domain |

**Errors of commission** vs **errors of omission** (Wikipedia Automation Bias):
- **Commission**: user follows automated directive that is wrong.
- **Omission**: user misses a problem the automated system failed to detect.

[Source: https://en.wikipedia.org/wiki/Automation_bias, accessed 2026-08-07 — Parasuraman & Riley taxonomy and commission/omission error types verbatim.]

**Gao et al. (2026) empirical trust/agreement trade-off** (n=34 within-subjects):
- Condition A (full explanation): trust M=3.99/5 (highest); agreement lower.
- Condition B (moderate explanation): agreement 89.22% (highest).
- Condition C (no explanation): lowest trust and agreement.
- Conclusion: more explanation prompts developers to question AI recommendations more frequently [Source: https://arxiv.org/abs/2607.24601, accessed 2026-08-07].

**Palod et al. (2026) "False Trust" finding** (between-subjects):
- Reasoning traces and post-hoc explanations are "persuasive but not informative" — they increase user acceptance regardless of correctness.
- Only **contrastive dual explanations** (arguments for AND against the AI's answer) genuinely improve users' ability to distinguish correct from incorrect AI outputs [Source: https://arxiv.org/abs/2605.10930, accessed 2026-08-07].

**Sun et al. (2026, arXiv:2606.25489)** two studies (n=68 + n=54 eye-tracking): incorrect rationales lowered trust relative to showing no rationale at all; rationale correctness and certainty framing affected trust, decision-making, and pupil dilation. Recommendations: rationales should be **selective, linked to evidence, calibrated in certainty expression, and easier to verify** [Source: https://arxiv.org/abs/2606.25489, accessed 2026-08-07].

## 5. Empirical Evidence

- **Parasuraman & Riley 1997**: foundational field studies of automation in aviation, process control, medicine — established misuse/disuse taxonomy.
- **Lee & See 2004**: review of 100+ studies; trust is multi-dimensional and context-dependent; design for "appropriate reliance."
- **Muir 1987, Muir & Moray 1996**: trust calibration dynamics — users update trust based on observed system behavior; trust is lost faster than gained.
- **Bansal et al. 2021, CHI '21**: explanations can hurt complementary team performance when users over-trust them; highlights the "over-reliance" risk.
- **Springer & Whittaker 2018, arXiv:1811.02164**: two empirical studies; incremental transparency undermined heuristics users formed — empirically challenges the "more transparency is better" assumption.
- **Gao et al. 2026, arXiv:2607.24601**: trust/agreement trade-off directly measured (see above).
- **Palod et al. 2026, arXiv:2605.10930**: false trust effect measured (see above).
- **Sun et al. 2026, arXiv:2606.25489**: rationale correctness vs. trust, with eye-tracking behavioral evidence (pupil dilation under incorrect rationales).
- **arXiv:2607.14152 (2026)** "Trust Junk Leads to Unjustified Support for Highly Discriminatory Predictive Models" — accurate-but-irrelevant data in explanations induces over-trust of discriminatory models [Source: https://arxiv.org/abs/2607.14152, accessed 2026-08-07].
- **arXiv:2606.01228 (2026)** "Institutional Trust and the Domestic AI Advantage: Evidence from DeepSeek and ChatGPT Users in China" — macro-structural forces shape cross-national AI trust patterns [Source: https://arxiv.org/abs/2606.01228, accessed 2026-08-07].
- **arXiv:2606.25809 (2026)** "Designing Trustworthy LLM-based Wellbeing Recommendation through Controllable Interaction" — controllable interaction design shapes trust in wellbeing AI.

## 6. Applications in UI/UX

- **Calibrated transparency** (Lee & See 2004): show system confidence, accuracy metrics, and limitations — not just outputs.
- **Trust repair after failure**: visible error acknowledgement, apology, and improvement narrative (Apple Siri's "I'm still learning" responses; ChatGPT error messages).
- **Asymmetric trust loss**: design accounts for users losing trust faster than gaining it (Muir 1987) — failures need careful UX.
- **Granular feedback** (Amershi 2019 G15): collect trust-related signals (thumbs up/down, "was this helpful?", "did you verify this?").
- **Progressive disclosure of confidence**: surface a confidence estimate; allow drill-down to underlying evidence.
- **Verification affordances**: users must be able to verify outputs (links, source citations, sanity-check tools).

## 7. Applications in AI UX

- **Perplexity / Bing Chat / Google AI Overviews**: inline citations enable verification → trust calibration.
- **Apple Intelligence routing UI**: "On-Device" / "Private Cloud Compute" badges → process transparency → trust via Lee & See's "process" basis.
- **Anthropic Claude "Thinking"**: exposes chain-of-thought — but Palod et al. 2026 warns this can induce false trust.
- **Cursor "Reject" affordance**: makes over-trust recoverable — user can decline AI suggestions.
- **Microsoft Copilot citation pattern**: source-document grounding in M365 Copilot (cross-ref W6a Microsoft Copilot evidence file).
- **ChatGPT "Why this response?"** (2024): on-demand rationale for specific outputs.
- **arXiv:2607.19941 (2026, MuC '26)**: trust is one of eight core UX principles for human-AI agent interaction [Source: https://arxiv.org/abs/2607.19941, accessed 2026-08-07].
- **arXiv:2606.01228 (2026)**: macro-institutional trust varies cross-nationally — Chinese users exhibit higher institutional trust for domestic AI (DeepSeek) than foreign (ChatGPT); trust is not purely a technical phenomenon.

## 8. Limitations / Critiques

- **Trust is hard to measure**: self-report scales (Jian et al. 2000) vs. behavioral reliance — they don't always correlate. Pupil dilation (Sun et al. 2026) and gaze behavior provide physiological signals but are not yet standard.
- **Calibration is hard to achieve**: users don't reliably update trust based on observed performance (Muir & Moray 1996); biases persist.
- **Cultural / institutional variability**: arXiv:2606.01228 (2026) shows national-level institutional trust shapes AI trust — universal design guidance is limited.
- **Explanations are double-edged**: as documented across Palod 2026, Gao 2026, Sun 2026, Bansal 2021, Springer & Whittaker 2018 — explanations can *induce* over-trust and reduce correctness discrimination.
- **"Trust theatre"**: XAI features that look transparent without actually enabling verification — risk of compliance-driven shallow transparency.
- **Domain specificity**: trust dynamics in healthcare differ from aviation differ from creative writing; few universal rules.
- **AI specificity**: LLM probabilistic outputs and hallucination break classical trust-in-automation frameworks (which assume systems are either correct or incorrect, not stochastic).
- **Power asymmetry**: users may have no choice but to trust institutional AI (e.g., hiring, lending) — the framework of "appropriate reliance" assumes user agency that may not exist.

## 9. Modern Relevance (2025)

Trust in AI is the central concern of AI regulation (EU AI Act 2024, US NIST AI RMF 2023), industry standards (ISO/IEC 42001:2023 AI Management Systems), and consumer-AI product design. The 2023–2026 wave of empirical HCI research on LLM-specific trust has revealed that classical trust-in-automation frameworks are insufficient; the probabilistic, persuasive, opaque nature of LLMs creates new failure modes (false trust, trust theatre, automation misuse via over-persuasion). Trust calibration research is now a primary track at CHI, FAccT, and CSCW.

## 10. Implications for AI Operating Systems (evidence-based)

- **Default to moderate explanation levels** — full explanations raise perceived trust but lower agreement (Gao et al. 2026, arXiv:2607.24601).
- **Prefer contrastive dual explanations** for high-stakes AI decisions — arguments for AND against (Palod et al. 2026, arXiv:2605.10930).
- **Use selective, evidence-linked rationales** with calibrated certainty framing — Sun et al. 2026, arXiv:2606.25489.
- **Avoid "trust junk"** — do not pad explanations with accurate-but-irrelevant data (arXiv:2607.14152).
- **Provide verification affordances** — citations, source links, sanity-check tools, "show me how you got this" drill-down.
- **Surface confidence estimates** — let users see when the AI is uncertain; uncertain AI should communicate uncertainty (Sun et al. 2026 found certainty framing matters).
- **Build asymmetric trust-loss recovery** — Muir 1987; failures need careful UX, visible error acknowledgement, and concrete correction paths.
- **Process transparency** (where computed, what model, what context) distinct from reasoning transparency — Apple Intelligence routing UI as the model; cross-ref `human-ai-interaction.md` and `apple-intelligence.md`.
- **Cultural / institutional awareness** — trust varies cross-nationally (arXiv:2606.01228); AI OS for global use must adapt.
- **Collect granular feedback** on AI outputs (Amershi G15) — aspect-level correctness, trust, helpfulness — feed into trust calibration models.
- **Resist "trust theatre"** — every transparency feature must enable actual verification, not just appear transparent.

## 11. Confidence Score

**95 / 100**

Reasoning: Wikipedia Automation Bias (31.5 KB) primary-fetched with full Parasuraman & Riley 1997 taxonomy, commission/omission error definitions, and misuse/disuse/abuse framework. Multiple recent (2026) AI-trust primary arXiv papers were primary-fetched with full abstracts and venues:
- arXiv:2607.24601 (Gao et al., n=34 within-subjects, PACMSE ISSTA 2026) — trust/agreement trade-off
- arXiv:2605.10930 (Palod et al., between-subjects) — false trust engendered by explanations
- arXiv:2606.25489 (Sun et al., n=68 + n=54 eye-tracking) — rationale effects on trust
- arXiv:2607.14152 — "trust junk" effect
- arXiv:2606.01228 — institutional trust, cross-national
- arXiv:2606.25809 — wellbeing recommendation controllable interaction
- arXiv:2607.19941 (Paimann et al., MuC '26) — trust as one of 8 AI agent UX principles
Original Lee & See 2004 (*Human Factors*) and Parasuraman & Riley 1997 papers cited via Wikipedia — not directly accessed (Sage/HFES paywall). Strong evidence chain with foundational trust-in-automation literature plus cutting-edge 2026 AI-trust research. Highest-confidence topic in the W13 batch due to density of recent primary-fetched empirical papers directly addressing the topic.
