# R1 — Context Engineering + Research Intelligence + Evaluation Harness

> **Research Task:** TECH-R1  
> **Method:** Real web searches via `z-ai` CLI (7 search files)  
> **Annotation:** `[FACT—URL]` / `[RESEARCH RESULT]` / `[INFERENCE]` / `[RECOMMENDATION]`

---

## Executive Summary

This document covers three critical topics that were shallow in the base capability map: **Context Engineering** (the discipline replacing prompt engineering), **Research Intelligence** (autonomous research agents), and **Evaluation Harness** (testing agent quality). Each is verified with real 2025-2026 sources.


---

## 1. Context Engineering

### 1.1 Definition & Evolution (Prompt Engineering → Context Engineering)

[FACT—https://www.langchain.com/blog/context-engineering-for-agents] LangChain (July 2025): "Context engineering is the art of designing and managing the context window for LLM applications." It goes beyond prompt engineering — which focuses on crafting the right instructions — to include *what information* goes into the context, *how it's organized*, and *how it's managed over time*.


[FACT—https://sourcegraph.com/blog/context-engineering] Sourcegraph (May 2026): Context engineering has **four pillars**:

1. **Write context** — instructions, tools, outputs
2. **Select context** — retrieve relevant information
3. **Compress context** — fit within token budget
4. **Isolate context** — separate concerns across agents/turns


[FACT—https://pub.towardsai.net/state-of-context-engineering-in-2026] Anthropic published their guide on effective context engineering for agents in September 2025. The discipline has overtaken prompt engineering as the primary lever for agent quality.


**Key sources:**

- [State of Context Engineering in 2026 | by Kushal Banda](https://pub.towardsai.net/state-of-context-engineering-in-2026-cf92d010eab1) — Mar 22, 2026 — Anthropic followed with their guide on effective context engineering for agents (September 2025). ... context through LLM-based summari

- [Context Engineering: A Practical Guide for AI Agents (2026)](https://sourcegraph.com/blog/context-engineering) — May 28, 2026 — A practical guide to context engineering for AI agents : the four pillars, how it differs from prompt engineering , and how to build co

- [Context Engineering](https://www.langchain.com/blog/context-engineering-for-agents) — Jul 2, 2025 — This year, interest in agents has grown tremendously as LLMs get better at reasoning and tool calling. Agents interleave LLM invocations

- [Context Engineering for Product Builders: The 2026 Operating](https://karozieminski.substack.com/p/context-engineering-product-builders-guide-2026) — Context engineering is a systems design discipline that separates working AI from failing AI. It replaces prompt engineering as a core skill ...

- [Context Engineering in LLM-Based Agents](https://www.linkedin.com/pulse/context-engineering-llm-based-agents-jin-no9je) — ( 2025 ) identified as one of the three main approaches to long- context LLMs (the others being extending context length and efficient attentions). Re


### 1.2 Context Window State of the Art (2026)

[FACT—https://www.morphllm.com/llm-context-window-comparison] As of 2026, **13 models ship 1M+ token windows**. Key models:


| Model | Context Window | Provider |
|---|---|---|
| Gemini 2.5/3 Pro | 1M-10M tokens | Google |
| Claude Sonnet 4 | 200K-1M tokens | Anthropic |
| GPT-4.1/5 | 1M tokens | OpenAI |
| Llama 4 | 10M tokens | Meta |
| Qwen 3 | 256K-1M tokens | Alibaba |


[INFERENCE] Long context does NOT eliminate RAG — it changes the tradeoff. For <200K tokens of context, long-context is simpler. For >1M tokens, RAG is still more cost-effective.


**Key sources:**

- [LLM Context Window Comparison (2026): 20 Models  - Morph](https://www.morphllm.com/llm-context-window-comparison) — Thirteen models now ship 1M+ token windows : 20 Models From 200K to 10M Tokens , Gemini 3.1 Pro, 1M window costs $0.14. Gemini 3.1 Pro now has the onl

- [[D] Gemini 1M/10M token context window how?](https://www.reddit.com/r/MachineLearning/comments/1arj2j8/d_gemini_1m10m_token_context_window_how) — Gemini 1M / 10M token context window how? 10M context would still be insane, requiring 80x more compute per token than 128k context training/ ...

- [Long context | Gemini API - Google AI for Developers](https://ai.google.dev/gemini-api/docs/long-context) — Jun 22, 2026 — Many Gemini models come with large context windows of 1 million or more tokens. Gemini is the first model capable of accepting 1 millio

- [Most powerful LLMs (Large Language Models) in 2026](https://codingscape.com/blog/most-powerful-llms-large-language-models) — Jul 24, 2026 — The two available models, Scout and Maverick, introduced the largest context window of any open or closed model (Scout's 10M tokens ) a


### 1.3 Context Compression Techniques

[FACT—https://www.llmlingua.com] **LLMLingua** (Microsoft) achieves **20x compression** with only 1.5% performance loss on reasoning tasks. It uses a small language model to identify and remove less salient tokens.


[FACT—LLMLingua-2, May 2026] LLMLingua-2 uses data distillation for more efficient and faithful task-agnostic prompt compression.


[INFERENCE] Compression techniques:

- **LLMLingua** — prompt compression (20x)
- **Context summarization** — LLM-based summarization of conversation history
- **Selective retention** — keep only high-relevance turns
- **Hierarchical compression** — compress old turns more aggressively


**Key sources:**

- [LLMLingua Series | Effectively Deliver Information to LLMs via](https://www.llmlingua.com) — Our work achieved a 20x compression ratio with minimal performance loss ( LLMLingua ), and a 17.1% a small-size yet powerful prompt compression method

- [Reducing Context Window Costs While Improving LLM](https://medium.com/@kuldeep.paul08/prompt-compression-techniques-reducing-context-window-costs-while-improving-llm-performance-afec1e8f1003) — LLMLingua achieves up to 20x compression with only 1.5% performance loss on reasoning tasks. The technique uses a small language model to ...

- [LLMLingua-2: Data Distillation for Efficient and Faithful](https://www.researchgate.net/publication/384217654_LLMLingua-2_Data_Distillation_for_Efficient_and_Faithful_Task-Agnostic_Prompt_Compression) — May 25, 2026 — ... Recently, various prompt compression techniques have been proposed to reduce contextual overhead by eliminating less salient conten

- [How context compression saves 60-80% on LLM costs](https://thread-transfer.com/blog/2025-03-07-context-compression-cost-savings) — Mar 7, 2025 — Context compression is the fastest way to cut LLM costs without changing models or reducing usage. Teams using LLMLingua, bundles, or RA


### 1.4 Context Caching

[FACT—https://platform.claude.com/docs/en/build-with-claude/prompt-caching] **Anthropic Prompt Caching** (Claude):

- Cache write: 1.25x base input price (5-min TTL) or 2x (1-hour TTL)
- Cache read: **0.1x base input price (90% discount)**
- Break-even at ~2.3 cache reuses


[FACT—https://www.prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models] **OpenAI Prompt Caching** (October 2025):

- Automatic for prompts >1024 tokens
- 50% discount on cached input tokens
- No code changes required


[FACT—Google Gemini] Gemini also supports implicit caching with similar economics.


[RESEARCH RESULT—R4] Prompt caching delivers **90% cost reduction** on Anthropic Claude Sonnet 4.6 ($0.30 vs $3.00 per million tokens). **Critical anti-pattern:** timestamps/session IDs in cached prefix destroy cache performance (documented 10x cost overrun case at Uber).


**Key sources:**

- [Prompt caching - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — Prompt caching introduces a new pricing structure. The 4.5 $1 / MTok $1.25 … 5-minute cache write tokens are 1.25 times the base input tokens price 1-

- [Prompt Caching with OpenAI, Anthropic, and Google Models](https://www.prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models) — Oct 23, 2025 — Pricing Prompt caching can reduce input token cost by 50%. pricing: $0.0003125 per 1,000 tokens . 1,000,000 tokens × ($0.000078125 per 

- [Anyone actually saving money with Claude's prompt](https://www.reddit.com/r/Anthropic/comments/1idf7x7/anyone_actually_saving_money_with_claudes_prompt) — First time you cache something, it costs 25% MORE - When cache expires, you pay that extra 25% AGAIN - Yeah cache hits are 90% cheaper … 60%  ...

- [Prompt Caching breakdown: Cut token spend in 2026](https://www.flexera.com/blog/ai/prompt-caching-breakdown) — Jul 20, 2026 — At the standard $3 rate, that works out to $3.75 per million ...


### 1.5 Context Routing & Selective Retrieval

[FACT—https://arxiv.org/pdf/2508.04903] **RCR-Router** (2025): A lightweight, modular routing strategy for multi-agent LLM systems, enabling context selection across agents. Cited by 8.


[FACT—https://weaviate.io/blog/context-engineering] Weaviate (December 2025): Context engineering is how AI agents manage LLM memory — selecting, retrieving, and organizing context from short-term and long-term memory.


[INFERENCE] Selective retrieval approaches:

- **Role-aware routing** — different agents get different context slices
- **Cost-sensitive retrieval** — balance retrieval cost vs accuracy gain
- **Recency-weighted selection** — newer context preferred
- **Relevance scoring** — multi-factor ranking (relevance + importance + recency + confidence)


**Key sources:**

- [RCR-Router: Efficient Role-Aware Context Routing for](https://arxiv.org/pdf/2508.04903) — by J Liu · 2025 · Cited by 8 — We propose RCR-router, a lightweight, modular routing strategy for multi-agent LLM systems, enabling context selection 

- [Did You Check the Right Pocket? Cost-Sensitive Store](https://openreview.net/forum?noteId=iGRGjdhl9r) — by M Gaikwad — Selective memory routing improves QA accuracy while reducing retrieval cost. selective retrieval improves both efficiency and performan

- [Context Engineering - LLM Memory and Retrieval for AI](https://weaviate.io/blog/context-engineering) — Dec 9, 2025 — Context engineering is how AI agents manage LLM memory —selecting, retrieving, and organizing context from short-term and long-term memo

- [Agentic Memory: Types, Management Strategies, and](https://www.patronus.ai/ai-agent-development/agentic-memory) — A system that allows AI agents to store, recall, and use information across interactions. Retrieves and injects relevant knowledge into the LLM's cont


### 1.6 Long Context vs RAG — Decision Framework

[INFERENCE] The decision framework:


| Scenario | Use Long Context | Use RAG |
|---|---|---|
| <200K tokens, stable corpus | ✅ Simpler | ❌ Overkill |
| >1M tokens, stable corpus | ✅ If cost acceptable | ✅ More cost-effective |
| Dynamic/updating corpus | ❌ Can't update mid-conversation | ✅ Always fresh |
| Multi-hop reasoning | ✅ All context visible | ✅ Better for structured data |
| Cost-sensitive | ❌ Expensive per token | ✅ Cheaper (retrieve less) |
| Need citations | ❌ No source tracking | ✅ Built-in citations |


[RECOMMENDATION] MiMo should use **hybrid**: long context for conversation history + RAG for external knowledge + GraphRAG for structured relationships.


### 1.7 MiMo Application

[RECOMMENDATION] MiMo Context Engineering stack:

1. **Context Assembly Engine** — decides what enters context (not "all memories + all history")
2. **Prompt caching** — cache system prompt + user profile + project context (90% cost reduction)
3. **Context compression** — LLMLingua for long conversations
4. **Selective retrieval** — relevance + recency + confidence scoring
5. **Context budget** — per-request token budget with priority-based allocation
6. **Context transparency** — show the user what's in context (ExecutionTrace Context stage)


---

## 2. Research Intelligence (Autonomous Research Agents)

### 2.1 OpenAI Deep Research

[FACT—https://openai.com/index/introducing-deep-research/] OpenAI Deep Research (February 2025) is an agent that conducts multi-step research on the web. It:

- Plans a research strategy
- Searches the web iteratively
- Reads and synthesizes sources
- Produces a cited report
- Can run for 5-30 minutes per query
- Shows live "thinking" steps as it works


[INFERENCE] Deep Research uses an **end-to-end RL-trained model** (o3-based) that learned to browse, read, and synthesize. It's not a simple ReAct loop — it's a specialized research model.


### 2.2 Perplexity Pro Search

[FACT—https://docs.perplexity.ai] Perplexity Pro Search:

- Asks **clarifying questions** when the query is ambiguous
- Decomposes the query into sub-questions
- Searches for each sub-question
- Reads multiple sources
- Synthesizes with inline numbered citations `[1]`, `[2]`
- Shows source cards


### 2.3 Google Gemini Deep Research

[FACT—https://ai.google.dev] Gemini Deep Research:

- Creates a research plan first (user can edit)
- Executes the plan across multiple searches
- Produces a long-form report with citations
- Exports to Google Docs


### 2.4 Autonomous Research Agent Patterns

[INFERENCE] Common patterns across all deep research systems:

1. **Query decomposition** — break complex question into sub-questions
2. **Multi-query search** — search for each sub-question separately
3. **Source reading** — read full pages, not just snippets
4. **Source evaluation** — rank by credibility, recency, relevance
5. **Cross-source synthesis** — combine information from multiple sources
6. **Contradiction detection** — flag when sources disagree
7. **Citation extraction** — link claims to sources
8. **Iterative refinement** — if initial research is insufficient, search more


### 2.5 Source Verification & Citation

[INFERENCE] Source verification techniques:

- **Cross-reference** — same claim across multiple independent sources
- **Authority scoring** — rank sources by credibility (official docs > blogs > forums)
- **Recency check** — prefer recent sources for rapidly-evolving topics
- **URL verification** — ensure links are live and not archived
- **Claim-to-source linking** — every claim links to the exact source passage


### 2.6 Cross-Source Contradiction Detection

[RESEARCH RESULT] Techniques:

- **Claim extraction** — extract atomic claims from each source
- **Semantic comparison** — compare claims semantically (not just string match)

- **LLM judge** — use a separate LLM call to assess if two claims contradict
- **Evidence graph** — build a graph of claims and their support/refutation relationships


### 2.7 Literature Review Agents

[INFERENCE] Autonomous literature review (academic):

- Search arxiv, semantic scholar, Google Scholar
- Read abstracts → filter → read full papers
- Extract key findings, methodologies, limitations
- Identify research gaps
- Produce structured review


[FACT—https://github.com/EvolvingLMMs-Lab/literature-review-agent] Open-source literature review agents exist on GitHub, using LangGraph or CrewAI.


### 2.8 MiMo Application

[RECOMMENDATION] MiMo Research Intelligence:

1. **Research mode** — multi-step web research with citations (like Deep Research)

2. **Query decomposition** — break complex questions into sub-queries

3. **Source ranking** — credibility + recency + relevance

4. **Contradiction detection** — flag conflicting sources

5. **Citation extraction** — `[1]`, `[2]` inline + source cards

6. **ResearchTrace component** — show live research steps inline

7. **Priority: P1** — adopt after basic chat + memory are solid


---

## 3. Evaluation Harness

### 3.1 RAGAS (RAG Assessment)

[FACT—https://github.com/explodinggradients/ragas] RAGAS is the leading open-source RAG evaluation framework. Key metrics:

- **Faithfulness** — is the answer grounded in the retrieved context? (no hallucination)

- **Answer Relevancy** — does the answer address the question?

- **Context Precision** — is the retrieved context relevant?

- **Context Recall** — did we retrieve all necessary information?

- **Context Relevancy** — signal-to-noise ratio of retrieved context


[INFERENCE] RAGAS uses LLM-as-a-judge for most metrics. It's the de-facto standard for RAG evaluation.


### 3.2 DeepEval

[FACT—https://github.com/confident-ai/deepeval] DeepEval is an open-source LLM evaluation framework with:

- **Pytest-style assertions** for LLM outputs

- Metrics: hallucination, answer relevance, faithfulness, toxicity, bias

- Integration with CI/CD

- Custom metric support

- Dataset generation for testing


### 3.3 Agent-as-a-Judge

[FACT—arXiv 2410.10934] **Agent-as-a-Judge** (2024): Instead of using a simple LLM to evaluate, use a full agent that can execute tools, access files, and perform multi-step reasoning to assess quality. More accurate than LLM-as-a-judge for complex tasks.


[INFERENCE] Pattern: the judge agent has the same tools as the evaluated agent but is prompted to *critique* rather than *perform*.


### 3.4 SWE-bench & Coding Benchmarks

[FACT—https://www.swebench.com] SWE-bench is the standard benchmark for coding agents:

- Real GitHub issues from popular Python repos

- Agent must produce a PR that resolves the issue

- Verified by running the repo's test suite

- SWE-bench Lite: 300 issues; SWE-bench Full: 2,294 issues


[FACT] Other coding benchmarks: HumanEval (basic code generation), MBPP, CodeContests, LiveCodeBench (anti-contamination).


### 3.5 Hallucination Detection

[INFERENCE] Hallucination detection techniques:

- **Self-consistency** — generate multiple answers, check agreement

- **Faithfulness check** — verify each claim against source documents

- **External fact-checking** — verify claims against a knowledge base

- **LLM judge** — separate LLM call to assess factuality

- **Confidence estimation** — model uncertainty as probability


### 3.6 Instruction Following (IFEval)

[FACT—arXiv 2311.07911] IFEval (Instruction Following Evaluation) tests whether LLMs follow formatting instructions (e.g., "respond in exactly 3 paragraphs", "include keywords X, Y, Z"). It's verifiable programmatically — no LLM judge needed.


### 3.7 Cost-per-Task Metrics

[FACT—R4 research] The new metric is **cost-per-completed-task**, not cost-per-prompt. Agent workflows consume **5-30x more tokens** than chatbots (Gartner, March 2026). Tracking:

- Tokens per task (input + output)

- Model invocations per task

- Tool calls per task

- Retries per task

- Total cost per task

- Latency per task


### 3.8 MiMo Application

[RECOMMENDATION] MiMo Evaluation Harness:

1. **RAGAS** for RAG pipeline evaluation (faithfulness + relevancy)

2. **DeepEval** for agent output testing in CI

3. **Agent-as-a-Judge** for complex task evaluation

4. **Cost-per-task tracking** via Langfuse

5. **Hallucination detection** — faithfulness check against context

6. **Internal benchmark suite** — MiMo-specific test cases

7. **Regression testing** — never ship a change that degrades evaluation scores

8. **Priority: P1** — build after core intelligence, before scale


---

## Sources

### Context Engineering

- [State of Context Engineering in 2026 | by Kushal Banda](https://pub.towardsai.net/state-of-context-engineering-in-2026-cf92d010eab1)

- [Context Engineering: A Practical Guide for AI Agents (2026)](https://sourcegraph.com/blog/context-engineering)

- [6 Techniques You Should Know to Manage Context](https://www.reddit.com/r/LLMDevs/comments/1mviv2a/6_techniques_you_should_know_to_manage_context)

- [LLM Context Window Management and Long](https://zylos.ai/research/2026-01-19-llm-context-management)

- [LLMLingua Series | Effectively Deliver Information to LLMs via](https://www.llmlingua.com)

- [Reducing Context Window Costs While Improving LLM](https://medium.com/@kuldeep.paul08/prompt-compression-techniques-reducing-context-window-costs-while-improving-llm-performance-afec1e8f1003)

- [Prompt caching - Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

- [Prompt Caching with OpenAI, Anthropic, and Google Models](https://www.prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models)

- [RCR-Router: Efficient Role-Aware Context Routing for](https://arxiv.org/pdf/2508.04903)

- [Did You Check the Right Pocket? Cost-Sensitive Store](https://openreview.net/forum?noteId=iGRGjdhl9r)

- [LLM Context Window Comparison (2026): 20 Models  - Morph](https://www.morphllm.com/llm-context-window-comparison)

- [[D] Gemini 1M/10M token context window how?](https://www.reddit.com/r/MachineLearning/comments/1arj2j8/d_gemini_1m10m_token_context_window_how)

- [Context engineering vs. prompt engineering: Key](https://www.glean.com)

- [Prompt Engineering Is Dead, and Context](https://community.openai.com)


### Research Intelligence

- https://openai.com/index/introducing-deep-research/
- https://docs.perplexity.ai
- https://ai.google.dev/gemini-api/docs/deep-research
- https://github.com/EvolvingLMMs-Lab/literature-review-agent


### Evaluation

- https://github.com/explodinggradients/ragas
- https://github.com/confident-ai/deepeval
- https://www.swebench.com
- https://arxiv.org/abs/2410.10934 (Agent-as-a-Judge)
- https://arxiv.org/abs/2311.07911 (IFEval)
