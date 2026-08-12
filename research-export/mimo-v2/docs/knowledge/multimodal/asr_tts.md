# Speech-to-Text (ASR) + Text-to-Speech (TTS)

**Category:** Multimodal
**Status:** REQUIRED
**Maturity:** Mature (ASR: production-grade; TTS: production-grade neural voices)

## Definition
- **ASR (Automatic Speech Recognition / Speech-to-Text / STT)**: converts audio (live mic or recorded file) into text. MiMo uses **z-ai-web-dev-sdk ASR** (backend-only), which accepts base64-encoded audio and returns transcriptions.
- **TTS (Text-to-Speech)**: converts text into spoken audio. MiMo uses **z-ai-web-dev-sdk TTS** (backend-only), supporting multiple voices, adjustable speed, and multiple audio formats.

Together they enable voice conversation with MiMo: user speaks → ASR → text → MiMo reasoning → text response → TTS → audio back to user.

## Problem Solved
Text-only interaction excludes hands-busy / eyes-busy scenarios (driving, cooking, walking), users with motor or visual impairments, and natural conversational pacing. ASR+TTS bridge text↔audio, enabling:
- Voice chat (full duplex or push-to-talk).
- Transcription of voice notes / meetings / lectures.
- Audio output for long responses (listen instead of read).
- Accessibility.
- Multimodal logging (audio + transcript of conversations).

## Why It Matters
MiMo is a personal AI — voice is the most natural modality for personal interaction. ASR+TTS, combined with the LLM and the agent runtime, let MiMo function as a voice assistant that can also act (browse, code, schedule) on spoken requests. The z-ai-web-dev-sdk provides both capabilities in-stack, so no separate vendor integration is required.

## How It Works
### ASR
- Audio captured client-side (browser `MediaRecorder` or WebSocket mic stream) → encoded as base64 (PCM/WAV/MP3).
- Sent to backend endpoint → z-ai-web-dev-sdk ASR → returns text transcript (with optional word timestamps, language detection).
- Transcript fed into MiMo's normal text-based reasoning pipeline.

### TTS
- MiMo produces text response.
- Backend calls z-ai-web-dev-sdk TTS with text + voice + speed + format → returns audio buffer (MP3/WAV/PCM).
- Audio streamed to client via socket.io or HTTP response → played with `<audio>` element or Web Audio API.

### Real-time voice (advanced)
- Full-duplex voice (like a phone call): low-latency ASR + streaming LLM + streaming TTS.
- Requires streaming ASR (partial transcriptions), streaming LLM tokens, streaming TTS (start speaking before full response generated).
- Latency budget: <500ms end-to-end for natural feel; hard to achieve without specialized streaming protocols (WebRTC).

## Architecture
```
Browser (mic) ──audio──▶ Backend API ──▶ z-ai-web-dev-sdk ASR
                                            │ transcript
                                            ▼
                                       MiMo Reasoning
                                            │ response text
                                            ▼
                            Backend API ──▶ z-ai-web-dev-sdk TTS
                                            │ audio
Browser (speaker) ◀──audio─── socket.io ────┘
```

## Interfaces
- **z-ai-web-dev-sdk ASR** (backend): `audio` (base64) → `text`.
- **z-ai-web-dev-sdk TTS** (backend): `text` + `voice` + `speed` + `format` → `audio` (base64 or buffer).
- Client-side: `MediaRecorder` for capture; `Audio` element or Web Audio API for playback.
- Real-time: socket.io events `voice:audio_chunk` (client→server), `voice:transcript`, `voice:response_audio` (server→client).

## Dependencies
- **z-ai-web-dev-sdk** (backend-only, already in MiMo stack).
- Browser APIs: `MediaRecorder`, `AudioContext`, `WebSocket` (or socket.io client).
- `socket.io` for streaming chunks.
- Optional: WebRTC for low-latency full-duplex (more complex).
- Audio format libs: `ffmpeg`/`sharp`-equivalent for audio (e.g. `ffmpeg-static`) for format conversion.

## Strengths
- **z-ai-web-dev-sdk** provides both ASR + TTS in one SDK — no separate vendors.
- Frontier ASR (Whisper-class) handles accents, noise, multi-lingual.
- Neural TTS voices are natural-sounding.
- Composable with MiMo's reasoning/agent layers — voice becomes just another I/O modality.
- Backend-only SDK keeps API keys safe.

## Weaknesses
- **Latency**: ASR + LLM + TTS pipeline is 2-10s end-to-end without streaming; feels laggy for conversation.
- **Cost**: per-minute pricing for ASR and TTS; long conversations add up.
- **Streaming complexity**: full-duplex voice is architecturally non-trivial.
- **Background noise / multiple speakers** degrade ASR quality.
- **Hallucination**: Whisper-class ASR can hallucinate transcripts in silence or noise.
- **TTS emotion/prosody control** is limited in standard TTS; expressive voice needs specialized models.
- **Multilingual**: ASR/TTS quality varies by language; English best.
- **Audio storage**: voice logs are large; compliance / privacy implications.

## Failure Modes
- **ASR mis-transcription** (homophones, names, jargon). Mitigation: custom vocabulary; user correction; context-aware re-ranking.
- **ASR hallucination in silence**. Mitigation: voice activity detection (VAD) — don't send silence.
- **TTS mispronunciation** (proper nouns, code). Mitigation: phoneme hints; SSML if supported.
- **Audio format mismatch** (browser produces Opus, API expects PCM). Mitigation: server-side `ffmpeg` conversion.
- **Network latency spikes** break conversation flow. Mitigation: streaming + client-side jitter buffer.
- **Cost runaway** (long idle audio stream). Mitigation: VAD + max-duration cap.
- **PII in audio** (user speaks secrets) → transcript + audio logs contain PII. Mitigation: encryption at rest; short TTL; user controls.

## Security Implications
- **Backend-only SDK**: never expose z-ai-web-dev-sdk to the browser — API key leak.
- **Audio provenance**: treat user audio as untrusted input; transcript is text that could contain prompt injection ("ignore previous instructions"). Apply same defense as any user input.
- **Voice spoofing**: an attacker with a recording of the user could issue voice commands. Mitigation: speaker verification for sensitive actions; approval gates for destructive operations.
- **PII / audio storage**: audio and transcripts may contain sensitive data; encrypt at rest; access-controlled; TTL; user can delete.
- **Eavesdropping on always-on mic**: clear visual indicator when mic is active; user opt-in; never listen without explicit activation.
- **Rate limit + budget**: per-user ASR/TTS minute caps.
- **Audit**: log every ASR/TTS call (duration, caller, cost); not necessarily raw audio (privacy trade-off).

## Performance Implications
- ASR latency: 0.5-3s for short clips; streaming ASR reduces perceived latency.
- TTS latency: 0.5-2s for first audio chunk in streaming mode.
- End-to-end conversational latency: 2-10s non-streaming; <1s with full streaming (hard).
- Memory: audio buffers; client-side ring buffer for streaming.
- Network: audio streams are 16-64 kbps (compressed) — manageable.

## Operational Implications
- Need an **AudioStore** (object storage with TTL) for voice messages / logs.
- Need a **transcript log** in Prisma (caller, duration, transcript, cost).
- Need **VAD** (voice activity detection) on client or server to avoid sending silence.
- Need **streaming infrastructure** (socket.io rooms per session) for real-time voice.
- Need **metrics**: ASR WER (word error rate, sampled), TTS quality (subjective), latency percentiles, cost per minute.
- Need **fallback**: if ASR/TTS API down, revert to text mode.
- Need **language detection**: auto-route to best ASR model per language.

## Alternatives
- **Whisper (OpenAI) local** via `whisper.cpp` or `faster-whisper`: free, offline, accurate; CPU/GPU hungry.
- **Piper TTS**: free, local, lightweight; decent quality.
- **Deepgram**: streaming ASR, very low latency; paid.
- **ElevenLabs**: best-in-class TTS voices; expensive.
- **Google Speech-to-Text / Amazon Polly / Azure Speech**: vendor cloud options.
- **Browser-native Web Speech API**: free, runs in browser, but quality varies and exposes nothing to backend.
- **Local hybrid**: STT local (Whisper) for privacy + TTS cloud for quality.

## Maturity & Production Readiness
- ASR: production-grade (Whisper-class and vendor APIs).
- TTS: production-grade (neural voices).
- Real-time full-duplex voice: still maturing; expect 1-3s latency without specialized infrastructure.

## Relevant Research / Papers
- "Whisper: Robust Speech Recognition via Large-Scale Weak Supervision" (Radford et al., 2022).
- "VITS: Conditional Variational Autoencoder with Adversarial Learning for End-to-End Text-to-Speech" (Kim et al., 2021).
- "NaturalSpeech 3" (Ju et al., 2024).
- "Voicebox: Multilingual Text-To-Speech" (Meta, 2023).

## Official Documentation
- z-ai-web-dev-sdk ASR + TTS skill (canonical for MiMo).
- Whisper: https://github.com/openai/whisper
- Piper: https://github.com/rhasspy/piper
- Web Speech API: MDN.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: all ASR/TTS via z-ai-web-dev-sdk on Node backend.
- Client (Next.js): capture mic via `MediaRecorder`; send base64 chunks via socket.io or fetch; play TTS via `<audio>` element or `AudioContext`.
- Persist `VoiceCall` (caller, duration, transcript, cost) in Prisma; audio artifacts in object storage with TTL.
- Real-time: socket.io room per session; stream ASR partials, LLM tokens, TTS chunks.
- VAD: client-side Web Audio API to detect speech; only send when speech present.
- Caddy terminates TLS for socket.io (WSS); no special config beyond what socket.io needs.
- Fallback to text if ASR/TTS fails.
- Per-user minute budget; rate limit.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Multimodal capability block** feeding the **Context Layer (Layer 2)** (transcript enters context like text input) and output side (response can be spoken).
- Independent of agent/tool layers — pure I/O modality.
- Audited by **Observability Layer (Layer 15)**; secured by **Security Layer (Layer 15)** (audio-as-prompt-injection, PII, rate limits).
- Enables future **Autonomy Layer (Layer 14)** voice triggers ("Hey MiMo").

## Recommended Usage
- ADOPT z-ai-web-dev-sdk ASR + TTS as primary voice I/O, backend-only.
- Use streaming for conversational latency.
- VAD to avoid sending silence.
- Per-user minute budget; rate limit.
- Encrypt + TTL audio logs; user can delete.
- Fallback: local Whisper (via Ollama or whisper.cpp) for offline/privacy-sensitive paths; local Piper TTS for offline.
- Approval gates for any voice-triggered destructive action.

## Decision
**ADOPT** — REQUIRED. z-ai-web-dev-sdk ASR + TTS, backend-only, with streaming, VAD, rate limits, audio log encryption. Local fallback (Whisper / Piper) for offline / privacy paths.

## Sources
- z-ai-web-dev-sdk ASR + TTS skills (canonical).
- Whisper paper (Radford et al., 2022).
- VITS / NaturalSpeech / Voicebox papers.
- Web Speech API (MDN).
- OWASP Top 10 for LLM Applications 2025 (inferred applicability to audio-borne injection).
