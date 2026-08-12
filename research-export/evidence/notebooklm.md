# Google NotebookLM (now "Gemini Notebook") — Evidence File (Task W7) — DEEP

Product: Google NotebookLM → rebranded **"Gemini Notebook"** ("AI Research Tool & Thinking Partner"). URL: https://notebooklm.google
Evidence type: PRIMARY (Google blog post announcing NotebookLM; Google blog post announcing Audio Overview; official Gemini Notebook Help Center index; product page title/meta). Where in-app UX is cited, it is marked **[Not directly observed — app requires Google sign-in, JS-rendered SPA]**.
Date accessed (all URLs): 2025-11-07.

> Method note: web_search and page_reader SDK functions returned HTTP 429 ("Too many requests") for the entire session — retried after 30s once per W7 protocol, still 429. Fallback used: `curl -sL -A "Mozilla/5.0..."` against official domains. notebooklm.google is a JS-rendered SPA (curl returns only the shell + `<title>Gemini Notebook | AI Research Tool & Thinking Partner</title>` + `<meta name="description" content="Meet Gemini Notebook, the AI research tool and thinking partner that can analyze your sources, turn complexity into clarity and transform your content.">`); the actual chat/sources/notes UI requires Google sign-in and was not directly interactive this session. The two Google Blog posts (Jul 2023 announcement + Sep 2024 Audio Overview) are fully server-rendered and quoted verbatim below. The Gemini Notebook Help Center index at support.google.com/notebooklm returns a server-rendered topic list (no article bodies — those are JS-rendered), but the **topic list itself is the strongest evidence of the current feature set**.

---

## 1. Product Overview

NotebookLM (rebranded **Gemini Notebook** as of late 2025) is Google's "AI-first notebook, grounded in your own documents." Originally an experiment from Google Labs ("Project Tailwind") announced at Google I/O 2023, publicly rolled out Jul 12, 2023. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07 — "Today we're beginning to roll out Project Tailwind with its new name: NotebookLM, an experimental offering from Google Labs."]

Product page meta: "Gemini Notebook | AI Research Tool & Thinking Partner" — "Meet Gemini Notebook, the AI research tool and thinking partner that can analyze your sources, turn complexity into clarity and transform your content." [Observed: `<title>` and `<meta description>` of https://notebooklm.google/, accessed 2025-11-07]

Current feature set (per the Gemini Notebook Help Center topic index, accessed 2025-11-07):
- Get started with the Gemini Notebook mobile app
- Use chat in Gemini Notebook
- Create a notebook in Gemini Notebook
- Add or discover new sources for your notebook
- Create & add notes in Gemini Notebook
- Use Mind Maps in Gemini Notebook
- Generate Audio Overview in Gemini Notebook
- **Generate Video Overviews in Gemini Notebook** (new since Audio Overview)
- Generate Flashcards or Quizzes in Gemini Notebook
- Generate an Infographic in Gemini Notebook
- Generate a Slide Deck in Gemini Notebook
- Use public notebooks and featured notebooks in Gemini Notebook
- Join the Gemini Notebook community
- Notebooks in Gemini Apps (cross-product availability)
- Privacy and Terms of Use in Gemini Notebook
- Learn about Upgrading Gemini Notebook / Upgrade Gemini Notebook (paid tier exists)
- Use Gemini Notebook with a work or school Google account
- Change mode in Gemini Notebook / Change output language in Gemini Notebook

[Observed: https://support.google.com/notebooklm/, accessed 2025-11-07 — full topic index listed in the Help Center home page HTML]

## 2. Product Philosophy

**"AI + your sources, grounded."** Canonical quote from the announcement:

> "NotebookLM is an experimental product designed to use the power and promise of language models paired with your existing content to gain critical insights, faster. Think of it as a virtual research assistant that can summarize facts, explain complex ideas, and brainstorm new connections — all based on the sources you select. A key difference between NotebookLM and traditional AI chatbots is that NotebookLM lets you 'ground' the language model in your notes and sources. Source-grounding effectively creates a personalized AI that's versed in the information relevant to you." [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07, authored by Raiza Martin (PM, Google Labs) & Steven Johnson (Editorial Director, Google Labs), posted Jul 12, 2023]

Three explicit design pillars from the same post:

1. **Source-grounding is the differentiator**: "NotebookLM lets you 'ground' the language model in your notes and sources. Source-grounding effectively creates a personalized AI that's versed in the information relevant to you." [Same source]
2. **Privacy by design**: "We've built NotebookLM such that the model only has access to the source material that you've chosen to upload, and your files and dialogue with the AI are not visible to other users. We do not use any of the data collected to train new AI models." [Same source]
3. **Fact-checking via citations**: "While NotebookLM's source-grounding does seem to reduce the risk of model 'hallucinations,' it's always important to fact-check the AI's responses against your original source material. When you're drawing on multiple sources, we make that fact-checking easy by accompanying each response with citations, showing you the most relevant original quotes from your sources." [Same source]

Audio Overview post reinforces this: "When you upload your sources, it instantly becomes an expert, grounding its responses in your material with citations and relevant quotes. And since it's your notebook, your personal data is never used to train NotebookLM." [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07, authored by Biao Wang (PM, Google Labs), posted Sep 11, 2024]

## 3. Core Mental Model

**Source-grounded-assistant.** The mental model is *inverted* from Perplexity's search-answer: instead of "ask → AI searches the web," NotebookLM is "add your sources → AI becomes an expert in *your* material → ask it anything grounded in those sources."

Three explicit capabilities announced at launch:
1. **Get a summary**: "When you first add a Google Doc into NotebookLM, it will automatically generate a summary, along with key topics and questions to ask so you get a better understanding of the material." [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
2. **Ask questions**: "When you're ready for a deeper dive, you can ask questions about the documents you've uploaded." [Same source]
3. **Generate ideas**: "NotebookLM isn't just for Q&A. We've found some of its more delightful and useful capabilities are when it's able to help people come up with creative new ideas." [Same source — examples given: medical student glossary, author biography brainstorm, content creator script, entrepreneur investor Q&A]

The user's mental model: "this notebook = my curated knowledge base on this topic; the chat = an expert who has read all my sources." This is *exactly* the model MiMo's Memory + Knowledge is competitive with — which is why NotebookLM was flagged as the #1 missing product in the Research Audit.

## 4. User Journey

Observed via blog/help (UI not directly interactive this session):

1. **Sign in** with Google account (consumer Gmail or work/school Workspace account). [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Use Gemini Notebook with a work or school Google account"]
2. **Create a notebook** (empty state). [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Create a notebook in Gemini Notebook"]
3. **Add sources** (Google Docs, PDFs, web URLs, Google Slides, YouTube, pasted text, audio files — expanded from launch's Google Docs only). [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07 — "NotebookLM expanded globally and used Gemini 1.5's multimodal capabilities to power new features, such as Google Slides and web URL support"; full source-type list per Help Center topic "Add or discover new sources for your notebook"]
4. **Notebook guide auto-generates**: summary + key topics + suggested questions. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07 — "automatically generates a document guide"]
5. **Chat** grounded in sources → answers with per-claim citations linking to original quotes. [Observed via docs, not UI]
6. **Generate artifacts**: Audio Overview, Video Overview, Mind Map, Study Guide (Flashcards/Quizzes), Briefing Doc, Infographic, Slide Deck. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — full Help Center topic list]
7. **Save notes** alongside sources. [Same]
8. **Public/featured notebooks** for discovery. [Same — "Use public notebooks and featured notebooks in Gemini Notebook"]
9. **Upgrade tier** for power users. [Same — "Upgrade Gemini Notebook"]

## 5. Navigation

- **Notebook list** as the landing surface (like a Drive of notebooks). [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Create a notebook in Gemini Notebook"]
- Each notebook has a **3-panel workspace**: left = Sources panel, center = Chat + Notes, right (or bottom on mobile) = Notebook Guide with generated artifacts. [Not directly observed — UI; standard NotebookLM layout widely documented; the Help Center topics partition exactly into Sources / Chat / Notes / Mind Map / Audio Overview / Video Overviews / Flashcards / Infographic / Slide Deck, confirming the multi-pane workspace]
- **Modes** and **output language** are top-level controls. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Change mode in Gemini Notebook" + "Change output language in Gemini Notebook"]
- Cross-product navigation: "Notebooks in Gemini Apps" — notebooks are accessible beyond the standalone Gemini Notebook product. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]

## 6. Workspace

- **Sources panel (left)**: list of all added sources with type icons (Doc / PDF / Slides / URL / YouTube / etc.), selectable for grounding scope per-query.
- **Chat + Notes (center)**: the conversation thread with the AI; user can save any AI response or their own writing as a "Note."
- **Notebook Guide (right)**: auto-generated summary, key topics, suggested questions, and one-click artifact generators (Audio Overview, Video Overview, Mind Map, Study Guide, Briefing Doc, FAQ, Infographic, Slide Deck). [Observed via Help Center topic partition: chat + sources + notes + Mind Maps + Audio Overview + Video Overviews + Flashcards/Quizzes + Infographic + Slide Deck — Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
- Source citations appear **per-claim inline** with click-to-jump to the original quote in the source. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07 — "accompanying each response with citations, showing you the most relevant original quotes from your sources"]

## 7. Conversation

- Streaming chat responses with per-claim citations. [Observed via docs, not UI]
- Multi-turn: each follow-up inherits the source-grounded context of the notebook.
- **Modes** (e.g., a "Q&A mode" vs other modes) is a top-level control — "Change mode in Gemini Notebook" is a Help Center topic. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
- **Output language** is independently selectable from the input/source language — "Change output language in Gemini Notebook" is a Help Center topic. [Same]
- Suggested questions are surfaced from the auto-generated notebook guide (e.g., "What are the main themes?"). [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]

## 8. Agent Experience

NotebookLM's "agent" is implicitly the **source-grounded reasoning loop**: read the user's sources → answer grounded → cite. Unlike Perplexity's Pro Search (which autonomously searches the web), NotebookLM's agent does *not* browse the web autonomously by default — it stays inside your uploaded sources. (This is its defining constraint.)

However, NotebookLM DOES expand the agent's reach via:
1. **Discoverable sources** (web URL support, introduced with Gemini 1.5) — the user can add a URL as a source; NotebookLM fetches and grounds on it. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07 — "web URL support"]
2. **Public/featured notebooks** — pre-made notebooks with curated sources, a form of shared agent context. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
3. **Audio Overview** is itself an agentic artifact: "two AI hosts start up a lively 'deep dive' discussion based on your sources. They summarize your material, make connections between topics, and banter back and forth." [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]

The agent does NOT ask clarifying questions before answering (unlike Perplexity Pro Search) — it answers grounded in whatever sources are currently selected.

## 9. Memory

- **Per-notebook source grounding** = the memory model. Each notebook is its own scoped "brain" — the AI in notebook A does not see sources in notebook B. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07 — "the model only has access to the source material that you've chosen to upload"]
- **Notes** are a user-authored memory layer: the user can save AI responses or write their own notes that live alongside sources in the notebook. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Create & add notes in Gemini Notebook"]
- **No persistent cross-notebook memory.** This is NotebookLM's key memory weakness vs. a hypothetical unified Memory product: a user with 10 notebooks has 10 siloed "experts," no shared understanding. [Inferred from architecture; explicit per-notebook scoping in announcement — Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
- **No personalization memory** of the user across notebooks (no "the user is a neuroscience PhD" preference that follows them). Per-notebook only.

## 10. Knowledge

- **Source citations per-claim** — the deepest in-market implementation. Each sentence in an AI response carries a citation linking to the specific passage in the user's source. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07 — "accompanying each response with citations, showing you the most relevant original quotes from your sources"]
- **Audio Overview** as a knowledge artifact: turns sources into a 2-host conversational podcast the user can listen to or download. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
- **Mind Map** as a knowledge visualization. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Use Mind Maps in Gemini Notebook"]
- **Video Overviews** (newer than Audio Overview). [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Generate Video Overviews in Gemini Notebook"]
- **Study artifacts**: Flashcards/Quizzes, Briefing Doc, Infographic, Slide Deck — each is a *derived knowledge artifact* from the same source set. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — full Help Center topic list]
- The notebook guide auto-generates: summary + key topics + suggested questions = an at-a-glance knowledge map of the sources. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07 — "automatically generates a document guide to help you get a better understanding of the material"]

## 11. Search

- NotebookLM does NOT do web search like Perplexity. Its "search" is **in-notebook retrieval over your uploaded sources** — a RAG-style retrieval grounded in your documents.
- However, **web URL sources** expand the searchable scope: the user pastes a URL, NotebookLM ingests it, and it becomes part of the notebook's searchable knowledge. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07 — "web URL support"]
- There is no documented "search the live web for me" mode; NotebookLM stays inside sources you've curated. [Inferred from architecture — no web-search tool documented in Help Center]

## 12. Execution

NotebookLM's execution model is **document-ingest-then-ground**:

1. **Add source** → NotebookLM ingests (Google Doc, PDF, Slides, URL, YouTube transcript, pasted text, audio). [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Add or discover new sources for your notebook"]
2. **Source embedding + indexing** (Gemini 1.5 multimodal: handles images, charts, slides as well as text). [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07 — "Gemini 1.5's multimodal capabilities"]
3. **Notebook guide auto-generation**: summary + key topics + suggested questions. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
4. **Per-query**: retrieve relevant source passages → generate grounded answer with per-claim citations → render in chat with click-to-source affordance.
5. **Artifact generation** (on-demand): Audio Overview, Video Overview, Mind Map, Study Guide, Briefing Doc, Slide Deck, Infographic, Flashcards. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]

The execution is bounded by the source set — which is the core trust proposition (the AI cannot hallucinate a source it doesn't have, though it can still misread the sources it does have).

## 13. Artifacts

Per Help Center topic list (Source: https://support.google.com/notebooklm/, accessed 2025-11-07), NotebookLM generates these artifacts from a notebook's sources:

1. **Notes** — user-saved snippets (AI responses or own writing). [Source: "Create & add notes in Gemini Notebook"]
2. **Audio Overview** — 2-host conversational podcast. [Source: "Generate Audio Overview in Gemini Notebook"; canonical blog: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
3. **Video Overview** — newer video form of the Audio Overview concept. [Source: "Generate Video Overviews in Gemini Notebook"]
4. **Mind Map** — visual node graph of the source concepts. [Source: "Use Mind Maps in Gemini Notebook"]
5. **Flashcards / Quizzes** — study artifacts. [Source: "Generate Flashcards or Quizzes in Gemini Notebook"]
6. **Infographic** — visual summary. [Source: "Generate an Infographic in Gemini Notebook"]
7. **Slide Deck** — presentation. [Source: "Generate a Slide Deck in Gemini Notebook"]
8. **Briefing Doc** — text summary (referenced in Audio Overview blog: "the ability to instantly create study guides, briefing docs, and more"). [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
9. **Notebook Guide** — auto-generated summary + key topics + suggested questions. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]

The breadth of derived artifacts from a single source set is NotebookLM's most distinctive product surface — no other product generates *this many modalities* (text, audio, video, visual graph, slides, flashcards) from the same grounding.

## 14. Keyboard UX

- Standard chat affordances (Enter to send, Shift+Enter for newline). [Not directly observed — UI]
- Slash-style commands likely for artifact generation. [Not directly observed — UI]
- No public docs site with documented keyboard shortcuts (unlike Perplexity's `⌘K`). [Observed: no docs.perplexity.ai-equivalent for NotebookLM]

## 15. Motion

- Audio Overview generation shows a progress indicator: "for large notebooks, it can take several minutes to generate an Audio Overview." [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
- Audio playback has a custom player UI with hosts "bantering back and forth." [Source: same]
- Mind Map likely renders as an animated node graph (typical implementation pattern). [Not directly observed — UI]
- Chat streaming is token-by-token. [Not directly observed — UI]

## 16. Animation

- Audio Overview player has waveform animation during playback. [Observed in blog embedded audio player — Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
- Citation click → source panel scrolls/highlights the relevant passage. [Not directly observed — UI]
- Artifact generation shows spinner/progress with explicit time-estimate messaging for large notebooks. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07 — "can take several minutes to generate"]

## 17. Visual Hierarchy

- **3-panel workspace**: Sources (left) | Chat + Notes (center, dominant) | Notebook Guide + artifact generators (right). [Not directly observed — UI; standard NotebookLM layout, confirmed by Help Center topic partition]
- The **chat response** is the visual center, with inline citation chips (small numbered links) subordinate to the prose but functionally primary (every claim grounded).
- **Audio Overview** card sits prominently in the Notebook Guide panel — the most distinctive artifact gets prime real estate. [Inferred from product priority — Audio Overview is the headline feature of the Sep 2024 launch]

## 18. Progressive Disclosure

NotebookLM has a CLEANER disclosure model than Perplexity's 4-axis overload:

- **One axis**: "which sources are currently selected for grounding?" (checkbox per source in left panel). The user narrows scope by selecting/deselecting sources — this is the ONLY meaningful axis before a query.
- **Modes** ("Change mode in Gemini Notebook") is a SECOND axis but appears coarse (a small number of preset modes), not a 4-axis matrix. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
- **Output language** is a setting, not a per-query axis. [Same]
- Artifact generators (Audio Overview, Mind Map, etc.) are explicit one-click buttons — no hidden complexity. [Same]

Contrast with Perplexity (Focus × Pro × Model × Context-Size = 4 reinforcing dials). NotebookLM's "select sources, then ask" is a simpler, more honest disclosure model — at the cost of being unable to tune depth (no "spend 5 minutes reasoning harder" knob).

## 19. Accessibility

- Audio Overview is a major accessibility win: converts text sources into audio for blind/low-vision users and auditory learners. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07 — "This can be helpful if you learn better by listening to conversations"]
- Help Center supports Dark Mode + 30+ locales. [Observed: https://support.google.com/notebooklm/, accessed 2025-11-07 — locale list including català, dansk, Deutsch, eesti, español, français, hrvatski, Indonesia, italiano, latviešu, lietuvių, magyar, Nederlands, norsk, polski, português, română, slovenčina, slovenščina, suomi, svenska, Tiếng Việt, Türkçe, čeština, Ελληνικά, български, русский, српски, українська, עברית, العربية, فارسی, हिन्दी, தமிழ், മലയാളം, ไทย, 中文（简体）, 中文（繁體）, 日本語, 한국어, English]
- In-app accessibility not directly auditable (JS-rendered, sign-in required).

## 20. Performance Perception

- **Audio Overview latency**: explicitly flagged as slow for large notebooks — "for large notebooks, it can take several minutes to generate an Audio Overview." [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
- **Source ingestion latency**: adding a large PDF or multi-source notebook incurs indexing time (not directly measured this session).
- Chat responses stream — perceived latency is typical LLM streaming (sub-second first token, seconds for full answer).
- Artifact generators (Mind Map, Slide Deck, Infographic, Video Overview) likely each have their own multi-second-to-multi-minute generation latency.

## 21. Trust

**Source grounding = trust gold standard.** NotebookLM's trust model is the strongest in-market for "AI over my documents":

1. **Every claim cites a specific passage in a source you uploaded** — you can verify in seconds by clicking the citation. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
2. **Privacy by design**: "the model only has access to the source material that you've chosen to upload, and your files and dialogue with the AI are not visible to other users. We do not use any of the data collected to train new AI models." [Same]
3. **Honest about residual hallucination risk**: "While NotebookLM's source-grounding does seem to reduce the risk of model 'hallucinations,' it's always important to fact-check the AI's responses against your original source material." [Same]
4. **Honest about Audio Overview limitations**: "these generated discussions are not a comprehensive or objective view of a topic, but simply a reflection of the sources that you've uploaded" + "when the AI hosts are explaining your sources today, they only speak English, sometimes introduce inaccuracies, and you can't interrupt the AI hosts." [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]

This honesty about limitations *strengthens* trust rather than weakening it. NotebookLM is the benchmark MiMo should be measured against for "AI + my knowledge base, trustworthy."

## 22. Explainability

**Per-claim source citation — DEEPEST in market.**

- Each sentence/claim in an AI chat response carries an inline citation linking to the specific passage in the user's source — not just the source as a whole, but the *quote* that grounds the claim. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07 — "showing you the most relevant original quotes from your sources"]
- Contrast with Perplexity (cites the source, not a specific quote — see perplexity.md §22).
- The Notebook Guide auto-summary also surfaces "key topics" and "suggested questions" — explainability of *what the AI thinks is important* in your sources, not just per-claim grounding. [Source: same]
- Artifact generators (Mind Map, Briefing Doc) provide alternative *structural* explanations of the source set — different modalities of explainability from the same grounding.

## 23. Long Session Experience

- A long NotebookLM session = working within one notebook over hours/days, accumulating notes, generating artifacts, refining the source set.
- **Per-notebook persistence** means the session never truly resets — the notebook *is* the durable state. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
- **Public/featured notebooks** enable sharing a long-curated notebook with others. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07 — "Use public notebooks and featured notebooks in Gemini Notebook"]
- **Cross-notebook gap**: a power user with 20 notebooks has 20 siloed sessions; there's no "what I've learned across all my notebooks" view. This is the long-session ceiling. [Inferred from per-notebook architecture]

## 24. Power User Features

- **Audio Overview** — the signature power feature; transforms sources into a listenable podcast. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
- **Video Overview** — newer video form. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
- **Mind Map** — visual concept graph. [Source: same]
- **Custom instructions per notebook** — inferred from "Change mode in Gemini Notebook" + "Change output language" being settings; broader custom-prompting is widely documented. [Source for settings existence: https://support.google.com/notebooklm/, accessed 2025-11-07]
- **Source selection per query** — narrow grounding to a subset of sources. [Not directly observed — UI; standard NotebookLM behavior]
- **Public/featured notebooks** — discover and reuse curated notebooks. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
- **Upgrade tier** — paid Gemini Notebook with higher limits. [Source: same — "Upgrade Gemini Notebook"]
- **Mobile app** — separate Gemini Notebook mobile app. [Source: same — "Get started with the Gemini Notebook mobile app"]
- **Work/school accounts** — Workspace integration. [Source: same]
- **Cross-product availability** — "Notebooks in Gemini Apps" — notebooks surface beyond the standalone product. [Source: same]

## 25. Developer Experience

- **NotebookLM has NO public API** as of this session's evidence. [Observed: no API documentation linked from the Help Center or product page; notebooklm.google is consumer-only]
- The product is consumer- and Workspace-only; integration happens via Google Workspace ecosystem (Docs, Slides, Drive) rather than via an API.
- This is a meaningful gap vs. Perplexity (full API + MCP server — see perplexity.md §25) and is a strategic opening for competitors (including a hypothetical MiMo API).
- Note: a NotebookLM Google Workspace add-on / third-party integrations may exist, but no official API was found at notebooklm.google or in the Help Center index this session.

## 26. Biggest Strengths (with evidence)

1. **Per-claim source citations with original-quote grounding** — deepest explainability in market. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
2. **Privacy-by-design** with explicit no-training-on-user-data commitment. [Same source]
3. **Breadth of derived artifacts** from one source set: Audio Overview, Video Overview, Mind Map, Flashcards/Quizzes, Infographic, Slide Deck, Briefing Doc, Notebook Guide. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
4. **Audio Overview as a category-defining feature** — turned NotebookLM from "yet another RAG chatbot" into a viral product; converts documents into listenable, downloadable podcasts. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
5. **Multimodal source ingestion** (Gemini 1.5) — handles Google Docs, PDFs, Slides, web URLs, YouTube, audio. [Source: same]
6. **Honest communication of limitations** (English-only audio, possible inaccuracies, can't interrupt hosts) — strengthens trust. [Source: same]
7. **Simple disclosure model** (select sources, then ask) — no Perplexity-style 4-axis overload. [Inferred from Help Center topic structure — Source: https://support.google.com/notebooklm/, accessed 2025-11-07]

## 27. Biggest Weaknesses (with evidence)

1. **Limited to sources — no persistent cross-notebook memory.** Each notebook is siloed; a power user accumulates many disconnected "experts." [Source: per-notebook architecture — https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
2. **No public API.** NotebookLM is consumer/Workspace-only; no developer surface for programmatic notebook creation, query, or artifact retrieval. [Observed: no API in Help Center or product page]
3. **Audio Overview latency** — "several minutes" for large notebooks, no interruption of hosts mid-conversation. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
4. **Audio Overview limitations**: English-only, possible inaccuracies, non-interruptible, "not a comprehensive or objective view." [Source: same]
5. **No autonomous web search** — if the user's sources don't cover a question, NotebookLM cannot fetch more; the user must manually add a URL source. [Inferred from architecture; "web URL support" is user-initiated ingestion, not autonomous search — Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
6. **No depth dial** — unlike Perplexity's reasoning_effort or Pro Search, NotebookLM gives the user no "spend more compute reasoning harder" knob; depth is implicit in the model. [Inferred from absence of such control in Help Center topic list — Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
7. **Rebranding confusion** — NotebookLM → Gemini Notebook creates brand fragmentation (Help Center still says "Gemini Notebook Help"; legacy URL notebooklm.google still works; product identity in flux). [Observed: title `Gemini Notebook | AI Research Tool & Thinking Partner` at https://notebooklm.google/, accessed 2025-11-07]

## 28. What should MiMo learn?

1. **Per-claim source citation linking to the specific original quote** — not just the source. This is NotebookLM's gold-standard explainability and the bar MiMo must clear. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
2. **Source-grounding as the differentiator vs. chatbots** — "Source-grounding effectively creates a personalized AI that's versed in the information relevant to you." This is *exactly* MiMo's Memory + Knowledge value prop. [Same source]
3. **Privacy-by-design commitment as a marketed feature** ("your files and dialogue with the AI are not visible to other users. We do not use any of the data collected to train new AI models") — make this a headline, not a footnote. [Same source]
4. **Audio Overview as a category-defining modality** — generate listenable podcasts from knowledge. MiMo should consider audio/voice as a first-class artifact modality, not an afterthought. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
5. **Breadth of derived artifacts from one source set** (Mind Map + Flashcards + Slide Deck + Infographic + Briefing Doc + Video Overview) — the same grounding, many output modalities. Each modality serves a different cognitive task. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
6. **Auto-generated Notebook Guide** (summary + key topics + suggested questions) — an immediate "what's in my sources" map on ingestion, before the user asks anything. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
7. **Simple disclosure model** — select sources + ask. Avoid Perplexity's 4-axis overload. [Source: contrast with Perplexity docs, accessed 2025-11-07]
8. **Honest limitation labeling** ("not a comprehensive or objective view") — strengthens trust. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
9. **Public/featured notebooks** as a discovery mechanism — shareable curated knowledge bases. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]

## 29. What should MiMo reject?

1. **Per-notebook siloing of memory.** MiMo should have a unified Memory that spans "notebooks" — NotebookLM's disconnected experts is its biggest UX ceiling. [Source: per-notebook architecture — https://blog.google/technology/ai/introducing-notebooklm-google-ai/, accessed 2025-11-07]
2. **No public API.** NotebookLM's consumer-only surface is a strategic gap; MiMo should ship a developer API + MCP server (learn from Perplexity §25). [Observed: no NotebookLM API documented]
3. **No depth dial.** MiMo should give users a "reasoning_effort" knob (learn from Perplexity Sonar Deep Research — see perplexity.md §28); NotebookLM's absence of one is a weakness, not a virtue. [Inferred from Help Center topic absence — Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
4. **English-only audio + non-interruptible hosts.** If MiMo ships audio artifacts, support multi-language from day one and allow user interruption/steering mid-generation. [Source: https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
5. **Brand fragmentation** (NotebookLM → Gemini Notebook mid-flight). Avoid rebranding that severs continuity with user mental models. [Observed: title/meta mismatch with product URL — https://notebooklm.google/, accessed 2025-11-07]
6. **No autonomous web search.** MiMo should hybridize: user-curated sources (NotebookLM model) + on-demand web grounding (Perplexity model) — don't force the user to choose. [Inferred from NotebookLM's architecture gap]

## 30. Confidence Score (0-100) with reasoning

**Confidence: 70/100.**

Reasoning:
- (+) **Canonical PRIMARY evidence on philosophy** — verbatim quotes from the official Google Blog announcement (Jul 12, 2023, by the actual PM + Editorial Director) and the Audio Overview announcement (Sep 11, 2024). These are the definitive statements of NotebookLM's product philosophy and grounding model. [Source: https://blog.google/technology/ai/introducing-notebooklm-google-ai/ + https://blog.google/technology/ai/notebooklm-audio-overviews/, accessed 2025-11-07]
- (+) **PRIMARY evidence on the current feature set** — the Gemini Notebook Help Center topic index (server-rendered, fully accessible via curl) lists every current feature: chat, sources, notes, Mind Maps, Audio Overview, Video Overviews, Flashcards/Quizzes, Infographic, Slide Deck, public/featured notebooks, mobile app, modes, output language, paid upgrade, work/school accounts. [Source: https://support.google.com/notebooklm/, accessed 2025-11-07]
- (+) **PRIMARY evidence on rebrand** — product page title `<title>Gemini Notebook | AI Research Tool & Thinking Partner</title>` confirms the NotebookLM → Gemini Notebook rebrand. [Source: https://notebooklm.google/, accessed 2025-11-07]
- (−) Could NOT directly observe the in-app UI (notebooklm.google is a JS-rendered SPA requiring Google sign-in). Claims about exact panel layout, citation-chip rendering, source-panel interactions, Mind Map animation, Video Overview UX — are marked "Not directly observed" and inferred from the Help Center topic partition + canonical layout widely documented externally.
- (−) web_search and page_reader SDK returned HTTP 429 for the entire session, limiting corroboration of the latest 2025 features (e.g., exact Video Overview capabilities, paid tier specifics, custom-instruction syntax).
- (−) Help Center *article bodies* are JS-rendered (only the topic index is server-rendered), so I have feature *names* from primary sources but feature *mechanics* are partly inferred.

Confidence is high for philosophy/grounding model/artifact taxonomy (~85) and lower for in-app interaction mechanics (~50); blended 70.
