# Image Generation

**Category:** Multimodal
**Status:** OPTIONAL
**Maturity:** Mature (frontier diffusion models production-grade 2024-2025)

## Definition
**Image Generation** is the capability of a generative model to synthesize an image from a text prompt (text-to-image), from another image (image-to-image), or by editing part of an image (inpainting). Frontier models (DALL-E 3, Stable Diffusion 3, Flux, Midjourney, Imagen) produce photorealistic or stylized images in seconds. MiMo uses **z-ai-web-dev-sdk image-generation** (backend-only), supporting multiple image sizes and returning base64-encoded results.

## Problem Solved
Many user tasks require creating visual content rather than analyzing it:
- Generate an illustration for a blog post / slide / report.
- Create a logo or icon draft.
- Visualize a concept the user is describing.
- Produce variations of an existing image.
- Mock up a UI design before coding.

Without image generation, MiMo can only consume images; with it, MiMo can also produce them, completing the multimodal I/O loop.

## Why It Matters
For MiMo AI, image generation is **OPTIONAL** (not core to the autonomous-runtime value prop) but valuable for:
- Content creation tasks (writer agent generating illustrations).
- UI prototyping (coding agent generating design mockups).
- Personal productivity (user asks MiMo to "make me a wallpaper").
- Slides / docs generation.

It also enables a future **creative agent** specialty. The z-ai-web-dev-sdk provides it in-stack, so adoption cost is low.

## How It Works
- **Input**: text prompt (with optional negative prompt, style guidance, aspect ratio, seed, reference image for img2img/inpainting).
- **Model**: typically a diffusion model (latent diffusion, FLUX, SD3) or autoregressive image model.
- **Output**: image bytes (PNG/JPEG, base64) at requested resolution.
- **Process**: text → text encoder (CLIP/T5) → conditioning → diffusion denoising in latent space → VAE decode → pixel image.
- **Variations**: img2img (init image + prompt), inpainting (mask + prompt), outpainting, ControlNet (pose/depth/edge conditioning).

## Architecture
```
  User prompt (text)
        │
        ▼
  ┌──────────────────────────────┐
  │ z-ai-web-dev-sdk image-gen   │ (backend)
  │ text → diffusion → image     │
  └──────────────┬───────────────┘
                 │ base64 image
                 ▼
        Object Storage (TTL)
                 │
                 ▼
        UI (Next.js <img>) or
        Document / Slide / Attachment
```

## Interfaces
- **z-ai-web-dev-sdk image-generation** (backend): `prompt` + `size` + optional params → `image` (base64).
- CLI tool available in the SDK for quick generation.
- Output: typically returns one or more images per call.

## Dependencies
- **z-ai-web-dev-sdk** (backend-only, already in MiMo stack).
- Object storage for generated images (with TTL).
- `sharp` for post-processing (resize, format conversion, thumbnail).
- Optional: local Stable Diffusion (via ComfyUI / AUTOMATIC1111 / Diffusers) for offline / no-cost / uncensored use.

## Strengths
- Frontier models produce striking, useful images in seconds.
- In-stack via z-ai-web-dev-sdk — no separate vendor integration.
- Composable with MiMo's reasoning (LLM can write effective prompts).
- Useful for content tasks (illustrations, mockups, slides).
- Local alternatives (SD/Flux) exist for offline / cost-saving / privacy paths.

## Weaknesses
- **Cost**: per-image pricing; many images per task add up.
- **Latency**: 2-15s per image; bottleneck in batch generation.
- **Quality variance**: same prompt yields different results; need retries / selection.
- **Prompt sensitivity**: requires skill to write effective prompts (LLM can help).
- **Hallucinated text in images**: models struggle to render legible text.
- **Bias and content policy**: models reflect training biases; built-in safety filters may refuse benign prompts.
- **Copyright / IP risk**: outputs may resemble training data; legal status of AI-generated images still evolving.
- **Misuse risk**: deepfakes, non-consensual imagery, disinformation — must be gated.
- **No fine-grained control** without ControlNet / inpainting extensions.

## Failure Modes
- **Refusal** (safety filter false positive). Mitigation: prompt rewording; fallback model.
- **Poor quality** (model misinterprets prompt). Mitigation: retry with revised prompt; LLM-assisted prompt rewriting.
- **Garbled text** in image. Mitigation: post-process with image editor / OCR-verify / regenerate.
- **Wrong aspect ratio / size**. Mitigation: explicit size param; post-process with `sharp`.
- **NSFW / policy-violating output**. Mitigation: post-generation safety classifier; user-content-policy enforcement.
- **Cost runaway** (user generates 1000 images). Mitigation: per-user budget + rate limit.
- **API down**. Mitigation: retry with backoff; degrade gracefully (text-only response).

## Security Implications
- **Backend-only SDK**: never expose to browser — API key leak.
- **Misuse prevention**: content-policy enforcement (no CSAM, no non-consensual explicit, no realistic depictions of real people without consent, no disinformation for harm).
- **Post-generation safety classifier**: scan output before delivering to user.
- **Provenance**: mark generated images as AI-generated (metadata + visible watermark where appropriate) — emerging regulation (EU AI Act) requires this.
- **Copyright**: respect IP; do not generate in the style of named living artists on request; provide attribution / license info.
- **Audit**: log every generation (prompt, params, output hash, caller, cost).
- **Rate limit + budget**: per-user caps.
- **Storage**: generated images TTL'd; user can delete.

## Performance Implications
- Latency: 2-15s per image; batch generation parallelizable.
- Cost: per-image; budget per user / per task.
- Storage: images are 100KB-5MB each; TTL essential.
- Post-processing (resize/thumbnail) cheap with `sharp`.

## Operational Implications
- Need an **ImageStore** (object storage with TTL) for generated images.
- Need an **audit log** in Prisma: prompt, params, output_hash, caller, cost, timestamp.
- Need a **content-policy service**: pre-prompt filter + post-image classifier.
- Need **metrics**: generations per user, avg latency, avg cost, refusal rate, policy-violation rate.
- Need **fallback**: local SD/Flux if API down or for offline.
- Need **provenance metadata**: embed "AI-generated" + model + timestamp in EXIF / metadata.

## Alternatives
- **OpenAI DALL-E 3**: integrated with ChatGPT; high quality; paid.
- **Stable Diffusion 3 / FLUX** (open weights): self-host; free; uncensored; GPU required.
- **Midjourney**: best aesthetic quality; Discord/API access; paid.
- **Google Imagen 3**: via Vertex AI; paid.
- **Adobe Firefly**: commercial-safe (trained on licensed data); paid.
- **Local ComfyUI / AUTOMATIC1111**: maximum control; self-host.

## Maturity & Production Readiness
- Production-grade for general use.
- Copyright / IP / provenance regulation still evolving — track EU AI Act, US guidance.
- Local open-weights models viable for cost / privacy / control.

## Relevant Research / Papers
- "Hierarchical Text-Conditional Image Generation with CLIP Latents" (DALL-E 2, Ramesh et al., 2022).
- "High-Resolution Image Synthesis with Latent Diffusion Models" (Stable Diffusion, Rombach et al., 2022).
- "Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding" (Imagen, Saharia et al., 2022).
- "Scaling Rectified Flow Transformers for High-Resolution Image Synthesis" (SD3, Esser et al., 2024).
- "FLUX" (Black Forest Labs, 2024).

## Official Documentation
- z-ai-web-dev-sdk image-generation skill (canonical for MiMo).
- Stable Diffusion / FLUX model cards on Hugging Face.
- OpenAI DALL-E, Google Imagen, Adobe Firefly docs (vendor reference).

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: z-ai-web-dev-sdk image-generation calls on Node backend; browser receives only image URLs / base64.
- Next.js route handler / socket.io event receives prompt + params → backend calls SDK → stores result in object storage → returns URL to client.
- Use `sharp` for post-processing (resize, thumbnail, format).
- Persist `ImageGeneration` (prompt, params, output_url, caller, cost, timestamp) in Prisma.
- Content-policy: pre-filter prompt (regex + LLM classifier) + post-classify image (safety model or API).
- Provenance: embed AI-generated metadata in EXIF; visible watermark optional.
- Per-user budget + rate limit.
- Local fallback: ComfyUI / AUTOMATIC1111 / Diffusers via API for offline / cost-critical / no-censorship paths (with policy controls).
- Stream progress (diffusion steps) via socket.io if supported.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Multimodal capability block** on the output side.
- Consumed by **Agent Layer (Layer 8)** specialists: Writer (illustrations), Coding (mockups), Slides.
- Audited by **Observability Layer (Layer 15)**; secured by **Security Layer (Layer 15)** (content policy, provenance, rate limits).
- Optional — not blocking v1.

## Recommended Usage
- ADOPT z-ai-web-dev-sdk image-generation as primary (backend-only).
- Content policy + post-classification + provenance mandatory.
- Per-user budget + rate limit.
- Local SD/Flux fallback for offline / cost / control.
- Mark all generated images as AI-generated (metadata + optional watermark).
- Use sparingly in v1; expand when content-creation agents are built.

## Decision
**ADOPT (OPTIONAL)** — defer to v1.x. Backend-only via z-ai-web-dev-sdk, with content policy, provenance, rate limits, local fallback. Not blocking v1.

## Sources
- z-ai-web-dev-sdk image-generation skill (canonical).
- Stable Diffusion / DALL-E / Imagen / FLUX papers (arXiv).
- EU AI Act provenance requirements (regulatory reference).
- OWASP / safety classifier guidance (inferred applicability).
