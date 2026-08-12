# KNOWLEDGE_INDEX

> Searchable map to the entire engineering knowledge base. For every researched technology: canonical name, category, status, knowledge file, project role, decision.
> 66 knowledge files across 19 categories. Detailed research lives in `knowledge/<category>/<file>.md`.

## Status legend
**C**=CORE · **R**=REQUIRED · **I**=IMPORTANT · **O**=OPTIONAL · **E**=EXPERIMENTAL/FUTURE

---

## Models
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| GLM-5.2 | Models | C | `knowledge/models/glm_5_2.md` | Primary brain via Z.ai API (not ZCode) | ADOPT |
| Model Gateway | Models | C | `knowledge/models/model_gateway.md` | Provider abstraction (swap providers w/o rewrite) | ADOPT |
| Model Routing | Models | R | `knowledge/models/model_routing.md` | Per-task model selection + fallback | ADOPT |
| Embeddings | Models | C | `knowledge/models/embeddings.md` | Semantic search substrate | ADOPT |

## Context
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Context Engineering | Context | C | `knowledge/context/context_engineering.md` | Layer 2 umbrella | ADOPT |
| Context Assembly | Context | C | `knowledge/context/context_assembly.md` | Prompt builder engine | ADOPT |
| Context Compression | Context | C | `knowledge/context/context_compression.md` | Long-horizon + resumability | ADOPT |
| Long-Context Management | Context | C | `knowledge/context/long_context_management.md` | Operational discipline (1M ≠ free pass) | ADOPT |

## Reasoning
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Chain-of-Thought | Reasoning | C | `knowledge/reasoning/chain_of_thought.md` | Foundational reasoning primitive | ADOPT |
| ReAct | Reasoning | C | `knowledge/reasoning/react.md` | Canonical agent loop | ADOPT |
| Plan-and-Solve | Reasoning | C | `knowledge/reasoning/plan_and_solve.md` | Planning Layer mechanism | ADOPT |
| Structured Reasoning | Reasoning | C | `knowledge/reasoning/structured_reasoning.md` | Zod-validated inter-layer contract | ADOPT |
| Reflection (Reflexion) | Reasoning | R | `knowledge/reasoning/reflection.md` | Recovery→Learning bridge | ADOPT |
| Self-Consistency | Reasoning | I | `knowledge/reasoning/self_consistency.md` | Inference-time scaling + confidence | ADOPT |

## Memory
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Memory Architectures | Memory | C | `knowledge/memory/memory_architectures.md` | Typed-memory overview (Layer 3) | ADOPT |
| Episodic Memory | Memory | C | `knowledge/memory/episodic_memory.md` | Event memories | ADOPT |
| Semantic Memory | Memory | C | `knowledge/memory/semantic_memory.md` | Facts/knowledge | ADOPT |
| Procedural Memory | Memory | C | `knowledge/memory/procedural_memory.md` | Skills/rules | ADOPT |
| Preference Memory | Memory | C | `knowledge/memory/preference_memory.md` | User preferences | ADOPT |
| Memory Consolidation | Memory | C | `knowledge/memory/memory_consolidation.md` | STM→LTM | ADOPT |
| Memory Retrieval | Memory | C | `knowledge/memory/memory_retrieval.md` | Hybrid retrieval over memories | ADOPT |
| Memory Compression | Memory | R | `knowledge/memory/memory_compression.md` | Reduce old memory size | ADOPT |

## Retrieval / Knowledge
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| RAG | Retrieval | C | `knowledge/retrieval/rag.md` | Retrieval-augmented generation | ADOPT |
| Hybrid Search | Retrieval | C | `knowledge/retrieval/hybrid_search.md` | BM25 + vector + fusion | ADOPT |
| Reranking | Retrieval | C | `knowledge/retrieval/reranking.md` | Cross-encoder rerank | ADOPT |
| Vector Search | Retrieval | C | `knowledge/retrieval/vector_search.md` | Semantic similarity | ADOPT |
| GraphRAG | Retrieval | R | `knowledge/retrieval/graphrag.md` | Global/multi-hop queries | ADOPT |
| Knowledge Graph | Retrieval | R | `knowledge/retrieval/knowledge_graph.md` | Entities + relations | ADOPT |

## Agents
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Agent Architectures | Agents | C | `knowledge/agents/agent_architectures.md` | Pattern overview | ADOPT |
| Single vs Multi-Agent | Agents | C | `knowledge/agents/single_vs_multi_agent.md` | Critical decision (favor single w/ full context) | ADOPT (hybrid) |
| ReAct Agent Loop | Agents | C | `knowledge/agents/react_agent_loop.md` | Core loop on Vercel AI SDK | ADOPT |
| Supervisor Pattern | Agents | R | `knowledge/agents/supervisor_pattern.md` | Plan/dispatch/review | ADOPT |
| Agent Lifecycle | Agents | C | `knowledge/agents/agent_lifecycle.md` | State machine + watchdog | ADOPT |
| Agent Handoff | Agents | R | `knowledge/agents/agent_handoff.md` | Typed handoff + scoped tools | ADOPT |

## Tools
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Tool Runtime | Tools | C | `knowledge/tools/tool_runtime.md` | Single chokepoint pipeline (mini-service :4030) | ADOPT |
| Function Calling | Tools | C | `knowledge/tools/function_calling.md` | Model tool invocation | ADOPT |
| Sandboxing | Tools | C | `knowledge/tools/sandboxing.md` | Tiered isolation | ADOPT |
| Approval Workflow | Tools | C | `knowledge/tools/approval_workflow.md` | Risk-gated approvals | ADOPT |
| Tool Policy Engine | Tools | C | `knowledge/tools/tool_policy_engine.md` | Non-bypassable rules | ADOPT |

## Execution
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Checkpointing | Execution | C | `knowledge/execution/checkpointing.md` | Atomic Prisma+SQLite checkpoints | ADOPT |
| Recovery | Execution | C | `knowledge/execution/recovery.md` | Bounded retry + Reflexion + escalation | ADOPT |
| Long-Horizon Execution | Execution | C | `knowledge/execution/long_horizon_execution.md` | Task engine mini-service (:4010) | ADOPT |

## Protocols
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| MCP | Protocols | R | `knowledge/protocols/mcp.md` | Bidirectional tool rail | ADOPT |
| A2A | Protocols | O | `knowledge/protocols/a2a.md` | Inter-vendor agents | DEFER |

## Browser
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Browser Automation | Browser | R | `knowledge/browser/browser_automation.md` | Playwright headless | ADOPT |
| Browser Agent | Browser | R | `knowledge/browser/browser_agent.md` | ReAct loop on Playwright | ADOPT |

## Coding
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Coding Agent | Coding | R | `knowledge/coding/coding_agent.md` | SWE-agent-style loop | ADOPT |

## Multimodal
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Vision (VLM) | Multimodal | R | `knowledge/multimodal/vision.md` | Image reasoning (z-ai-web-dev-sdk, backend) | ADOPT |
| ASR + TTS | Multimodal | R | `knowledge/multimodal/asr_tts.md` | Speech (z-ai-web-dev-sdk, backend) | ADOPT |
| Image Generation | Multimodal | O | `knowledge/multimodal/image_generation.md` | Gen images (v1.x) | ADOPT (v1.x) |

## Autonomy
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Autonomous Agents | Autonomy | R | `knowledge/autonomy/autonomous_agents.md` | 7-stage gated pipeline | ADOPT |
| Proactive Intelligence | Autonomy | R | `knowledge/autonomy/proactive_intelligence.md` | Triggers + smart suggestions | ADOPT |

## Learning
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Learning Engine | Learning | R | `knowledge/learning/learning_engine.md` | Experience→lesson→memory/skill | ADOPT |
| Controlled Self-Improvement | Learning | I | `knowledge/learning/controlled_self_improvement.md` | Gated behavior changes | ADOPT (gated) |

## Verification
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Verification | Verification | C | `knowledge/verification/verification.md` | 4 modes + critic agent | ADOPT |

## Security
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Agent Security | Security | C | `knowledge/security/agent_security.md` | Defense-in-depth umbrella | ADOPT |
| Prompt-Injection Defense | Security | R | `knowledge/security/prompt_injection_defense.md` | Reduction+containment+detection | ADOPT |
| Permissions (RBAC+ABAC) | Security | C | `knowledge/security/permissions_rbac_abac.md` | Non-bypassable Policy Engine | ADOPT |
| Secrets Management | Security | C | `knowledge/security/secrets_management.md` | env+age v1 → Vault v2 | ADOPT |

## Observability
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Observability | Observability | C | `knowledge/observability/observability.md` | OTel + pino + cost tracking | ADOPT |
| Audit Trails | Observability | C | `knowledge/observability/audit_trails.md` | Append-only + hash-chained + signed | ADOPT |

## Evaluation
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Evaluation Lab | Evaluation | R | `knowledge/evaluation/evaluation_lab.md` | Benchmark + regression + adversarial | ADOPT |

## Infrastructure
| Technology | Cat | Status | Knowledge File | Project Role | Decision |
|---|---|---|---|---|---|
| Vector Database | Infra | C | `knowledge/infrastructure/vector_database.md` | sqlite-vec embedded | ADOPT |
| Knowledge Graph Store | Infra | R | `knowledge/infrastructure/knowledge_graph_store.md` | SQLite-relational KG | ADOPT |
| Event Bus | Infra | C | `knowledge/infrastructure/event_bus.md` | EventEmitter + SQLite outbox | ADOPT |
| Task Queue | Infra | R | `knowledge/infrastructure/task_queue.md` | SQLite-backed queue + workers | ADOPT |

---

## Counts
- **CORE (C):** 40 knowledge files — v1 spine
- **REQUIRED (R):** 18 — strong v1
- **IMPORTANT (I):** 3 — v1.x polish
- **OPTIONAL (O):** 4 — situational
- **EXPERIMENTAL/FUTURE (E):** 1 (A2A deferred)

Total: **66 knowledge files**, **63 ADOPT**, **1 ADOPT(v1.x)**, **1 ADOPT(gated)**, **1 DEFER**.

## Cross-References (high-traffic links)
- GLM-5.2 ← Model Gateway ← Model Routing ← Reasoning/Planning/Verifier
- Context Assembly ← Memory Retrieval + Knowledge Retrieval (Hybrid Search + Reranking)
- ReAct Agent Loop ← Tool Runtime ← Sandboxing + Approval + Policy Engine
- Long-Horizon Execution ← Checkpointing + Recovery ← (resumability)
- Verification ← Critic Agent ← Learning Engine ← Controlled Self-Improvement (gated)
- Observability + Audit Trails ← wrap everything
