# Vision / Image Reasoning (VLM)

**Category:** Multimodal
**Status:** REQUIRED
**Maturity:** Mature (frontier VLMs production-grade 2024-2025)

## Definition
**Vision / Image Reasoning** is the capability of a multimodal LLM (Vision-Language Model, VLM) to interpret, analyze, and reason about images: describe content, answer questions, extract structured data (OCR, tables, forms), detect objects and relationships, compare images, and ground text answers to image regions. A VLM accepts text + image(s) as input and produces text (and sometimes bounding boxes / segmentation masks) as output.

In MiMo AI, VLM is provided through **z-ai-web-dev-sdk** (the SDK exposes a vision capability that accepts image URLs or base64 and returns text descriptions/analyses). The SDK is **backend-only**.

## Problem Solved
Text-only LLMs are blind. Many tasks require visual understanding:
- Reading a screenshot of an error message.
- Interpreting a chart in a report.
- Recognizing a UI element in a browser automation flow.
- Extracting text from a scanned PDF or photo (OCR-like).
- Describing an image a user uploaded.
- Identifying which DOM element to click from a screenshot (browser agent).

VLM closes this gap by letting the model "see" — extending the agent's perception beyond text.

## Why It Matters
MiMo AI's runtime must reason about:
- **Browser screenshots** (Browser Agent VLM fallback).
- **User-uploaded images** (chat with images).
- **Screenshots of MiMo's own UI** (debugging).
- **PDFs and documents** (Knowledge Layer ingestion of scanned docs).
- **Charts / diagrams** in research.

A VLM is the perception module that makes these visible to the reasoning layer. Without it, MiMo is text-only and blind to half of real-world input.

## How It Works
- **Input**: text prompt + image(s). Image is encoded by a vision encoder (typically a CLIP-style or SigLIP vision transformer) into a sequence of embeddings; these are projected into the LLM's embedding space and concatenated with text token embeddings.
- **Output**: text tokens (and optionally structured outputs like bounding boxes via special tokens).
- **Capabilities**:
  - Image captioning (describe).
  - VQA (visual question answering).
  - OCR / text extraction.
  - Object detection / grounding ("where is X?").
  - Chart/table understanding.
  - Multi-image reasoning (compare two images, image sequences for video).
  - Document understanding (DocVQA).
- **Common patterns**:
  - Set-of-Mark prompting: overlay numbered marks on image regions, ask model to reference numbers — improves grounding.
  - Chain-of-thought over images ("first describe, then answer").
  - Cropping / tiling high-res images for fine detail.

## Architecture
```
  Image (PNG/JPEG bytes or URL)
        │
        ▼
  Vision Encoder (in VLM)
        │  image embeddings
        ▼
  ┌──────────────────────────────┐
  │  VLM (z-ai-web-dev-sdk)      │
  │  text + image embeddings →   │
  │  text response               │
  └──────────────┬───────────────┘
                 │
                 ▼
        MiMo Reasoning Layer
        (treats VLM output as
         untrusted observation)
```

## Interfaces
- **z-ai-web-dev-sdk vision API** (backend): accepts `image` (URL or base64) + `prompt` (text) → returns text.
- Supports multiple images per call (model-dependent).
- Returns structured text; can be parsed as JSON if the prompt requests structured output.
- Pricing per image (depends on resolution tier); latency 1-10s per call.

## Dependencies
- **z-ai-web-dev-sdk** (already in MiMo stack; backend-only).
- Node runtime (no browser execution).
- Image-handling libs: `sharp` for resize/crop/format conversion before upload; `@fastify/multipart` or Next.js route handlers for upload ingress.
- Optional: local VLM fallback (Ollama + LLaVA / Qwen-VL) for offline / cost-critical paths.

## Strengths
- Frontier VLMs (GPT-4o, Claude 3.5 Sonnet vision, Gemini 1.5/2.0, GLM-4V/5V) reach human-level on many VQA benchmarks.
- Strong OCR (replaces dedicated OCR for most cases).
- General-purpose: one model handles captioning, VQA, OCR, chart, document — no per-task model.
- Composable: VLM output feeds back into the agent's reasoning loop.
- Through z-ai-web-dev-sdk, integrated into MiMo's existing backend stack.

## Weaknesses
- **Hallucination**: VLMs invent objects/text not in the image; worse than text LLMs in some cases.
- **Resolution limits**: fine text in screenshots may be unreadable; need cropping/tiling.
- **Cost**: per-image pricing; many screenshots per task add up.
- **Latency**: 1-10s per call; bottleneck in browser agent loops.
- **Grounding weakness**: "where" questions are less reliable than "what" questions; Set-of-Mark helps.
- **Multi-image limits**: token budget for many images is tight.
- **Privacy**: images may contain PII / secrets; sending to external API has compliance implications.
- **Non-determinism**: same image + prompt may yield different answers across calls.

## Failure Modes
- **Hallucinated text in OCR** (reads a word that isn't there). Mitigation: confidence reporting; cross-check with multiple crops.
- **Missed small text** in screenshots. Mitigation: crop to region of interest; upscale.
- **Wrong color/region grounding**. Mitigation: Set-of-Mark prompting.
- **Image too large** → API rejects or downsamples badly. Mitigation: pre-resize with `sharp`.
- **Unsupported format** → convert to JPEG/PNG first.
- **PII leak** to external API. Mitigation: redact/mask sensitive regions before sending (where feasible); user consent for image upload.
- **Inconsistent results across calls** (temperature drift). Mitigation: temperature 0 for extraction tasks.

## Security Implications
- **Prompt injection via image** (image contains text "ignore previous instructions"). Mitigation: treat VLM output as untrusted; same prompt-injection defense as text inputs.
- **PII / secrets in images** (screenshots of email, terminal with secrets). Mitigation: redaction pipeline before VLM call; user consent; do not log raw images.
- **Image source provenance**: untrusted image (from web, from user upload) must not be treated as trusted.
- **Cost abuse**: an attacker who can trigger VLM calls can run up cost. Mitigation: rate limit + per-user budget.
- **Storage**: images persisted for replay/audit must be encrypted at rest; access-controlled; TTL'd.
- **Backend-only mandate**: VLM SDK must never be reachable from the browser — exposes API key. Route through MiMo's Model Gateway.

## Performance Implications
- Latency: 1-10s per call (vision encoder + LLM).
- Cost: per-image pricing; resolution-tiered.
- Pre-processing (resize/crop) reduces tokens and latency.
- Cache: identical image + prompt should be cached (hash-based) to avoid redundant calls.
- Parallel calls: independent VLM queries can be batched.

## Operational Implications
- Need an **ImageStore** (object storage with TTL) for screenshots and user uploads.
- Need an **audit log**: image hash, prompt, response, latency, cost, caller.
- Need a **redaction pipeline**: scan images for known patterns (API keys, emails) before VLM.
- Need **metrics**: calls per task, avg latency, avg cost, error rate, hallucination rate (sampled).
- Need **fallback strategy**: if VLM API down, retry with backoff; if persistent, degrade gracefully (text-only).

## Alternatives
- **Dedicated OCR** (Tesseract, Google Vision OCR, AWS Textract): more accurate for pure text extraction; less flexible.
- **Local VLM** (Ollama + LLaVA / Qwen-VL / MiniCPM-V): free, offline, slower; lower quality than frontier.
- **Document AI** (Google Document AI, AWS Textract): specialized for forms/PDFs; expensive; accurate.
- **Image captioning models** (BLIP-2): captioning only; not general VQA.

## Maturity & Production Readiness
- Frontier VLMs are production-grade for captioning, VQA, OCR, chart understanding.
- Grounding and fine-grained spatial reasoning still imperfect.
- z-ai-web-dev-sdk VLM is suitable for production use behind MiMo's Model Gateway.

## Relevant Research / Papers
- "BLIP-2: Bootstrapping Language-Image Pre-training" (Li et al., 2023).
- "LLaVA: Visual Instruction Tuning" (Liu et al., 2023).
- "Set-of-Mark Prompting Unleashes Extraordinary Visual Grounding in GPT-4V" (Yang et al., 2023).
- "DocVQA: A Dataset for VQA on Document Images" (Mathew et al., 2021).
- "ChartQA: Benchmark for Question Answering about Charts" (Masry et al., 2022).
- "MMMU: Massive Multi-discipline Multimodal Understanding" (Yue et al., 2024).

## Official Documentation
- z-ai-web-dev-sdk vision skill (canonical for MiMo).
- Z.ai GLM-4V / GLM-5V documentation (where applicable).
- OpenAI Vision / Anthropic Vision / Google Gemini Vision docs (for cross-vendor reference).

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: z-ai-web-dev-sdk VLM calls happen on the Node backend; the browser UI only sends image references/URLs.
- Image upload: Next.js route handler receives multipart → stores in object storage → returns URL → backend calls VLM with URL or base64.
- Use `sharp` to pre-process: resize to model-optimal dimensions (e.g. max 1568px), convert to JPEG/PNG, optionally crop to region of interest.
- For browser agent screenshots: pass base64 directly to VLM (avoid storage round-trip).
- Persist `VisionCall` (image_hash, prompt, response, latency, cost) in Prisma for audit + caching.
- Cache by `(image_hash, prompt_hash)` → response.
- Redaction pipeline: scan for common secret patterns before VLM call (best-effort).
- Route VLM calls through the Model Gateway so provider can be swapped (Z.ai / OpenAI / Anthropic / Gemini / local Ollama).
- Stream responses to UI via socket.io for live feedback.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Multimodal capability block** feeding the **Reasoning Layer (Layer 5)** and **Context Layer (Layer 2)**.
- Critical input to **Browser Agent (Layer 8)** for screenshot-based reasoning fallback.
- Feeds **Knowledge Layer (Layer 4)** for OCR / document ingestion.
- Wraps the **Model Layer (Layer 1)** — VLM is one of the model gateway's capabilities.
- Audited by **Observability Layer (Layer 15)**; secured by **Security Layer (Layer 15)** (prompt-injection defense, redaction).

## Recommended Usage
- ADOPT z-ai-web-dev-sdk VLM as the primary vision capability, behind the Model Gateway.
- Pre-process images (resize/crop) before VLM call.
- Cache aggressively.
- Use Set-of-Mark prompting for grounding tasks.
- Treat VLM output as untrusted (prompt-injection defense).
- Redact PII/secrets before sending images.
- Local VLM (Ollama + LLaVA / Qwen-VL) as offline / cost-saving fallback for non-critical paths.

## Decision
**ADOPT** — REQUIRED. z-ai-web-dev-sdk VLM (backend-only) behind Model Gateway, with redaction, caching, prompt-injection defense, local fallback option.

## Sources
- z-ai-web-dev-sdk vision skill (canonical).
- LLaVA / BLIP-2 / Set-of-Mark papers (arXiv).
- DocVQA / ChartQA / MMMU benchmarks.
- OWASP Top 10 for LLM Applications 2025 (inferred applicability to image-borne injection).
