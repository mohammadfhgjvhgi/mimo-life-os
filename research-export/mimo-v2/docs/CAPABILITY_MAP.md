# CAPABILITY_MAP

> Every capability the final MiMo AI is expected to have, grouped by domain. Each capability is mapped to the layer that owns it and a target classification (C=CORE, R=REQUIRED, I=IMPORTANT, O=OPTIONAL, E=EXPERIMENTAL/FUTURE). Full technology detail lives in `knowledge/`.

Legend: **C** Core (must have for v1) · **R** Required (v1, strong) · **I** Important (v1.x) · **O** Optional · **E** Experimental/Future.

---

## 1. Intelligence (Reasoning)
| Capability | Owner Layer | Target |
|---|---|---|
| Language understanding | Model+Reasoning | C |
| Chain-of-Thought reasoning | Reasoning | C |
| ReAct (reason+act) loop | Reasoning+Execution | C |
| Plan-and-Solve | Planning | C |
| Structured reasoning (JSON/XML) | Reasoning | C |
| Sequential reasoning | Reasoning | C |
| Decision making | Executive | C |
| Confidence scoring | Reasoning | C |
| Reflection / self-critique | Recovery | R |
| Tree-of-Thought / multi-path | Reasoning | I |
| Self-consistency (multi-sample vote) | Reasoning | I |
| Adaptive reasoning (mode by difficulty) | Reasoning | I |
| Inference-time compute scaling | Reasoning | I |
| Deep reasoning (long chains) | Reasoning | I |
| Causal reasoning | Reasoning | I |
| Temporal reasoning | Reasoning | I |
| Constraint reasoning/solving | Reasoning | I |
| Uncertainty estimation | Reasoning | I |
| Contradiction detection | Reasoning+Knowledge | I |
| Counterfactual reasoning | Reasoning | O |
| Hypothesis generation/testing | Reasoning | O |
| World model / state estimation | Reasoning | E |
| Meta-reasoning | Reasoning | E |

## 2. Context
| Capability | Owner Layer | Target |
|---|---|---|
| Conversation context | Context | C |
| Task context | Context | C |
| Workspace context | Context | C |
| Context assembly (what enters prompt) | Context | C |
| Context compression/summarization | Context | C |
| User context (preferences) | Context+Memory | C |
| Tool/agent/execution state in context | Context | C |
| Goal context | Context | C |
| Temporal context | Context | R |
| Environment context | Context | I |
| On-demand retrieval (vs dump-all) | Context+Knowledge | C |

## 3. Memory
| Capability | Owner Layer | Target |
|---|---|---|
| Working memory (current turn) | Memory | C |
| Short-term memory (24h) | Memory | C |
| Long-term memory | Memory | C |
| Episodic memory (events) | Memory | C |
| Semantic memory (facts) | Memory | C |
| Procedural memory (skills/rules) | Memory | C |
| Preference memory | Memory | C |
| Memory retrieval (hybrid) | Memory | C |
| Memory consolidation (STM→LTM) | Memory | C |
| Relationship memory | Memory | R |
| Failure memory | Memory | R |
| Skill memory | Memory | R |
| Memory ranking | Memory | C |
| Memory compression | Memory | R |
| Memory conflict resolution | Memory | R |
| Memory provenance | Memory | R |
| Temporal memory | Memory | I |
| Behavioral memory | Memory | I |
| Autobiographical memory | Memory | I |
| Memory decay/forgetting | Memory | I |
| Memory reinforcement | Memory | I |
| Memory confidence | Memory | O |
| Memory versioning | Memory | O |
| Organizational context memory | Memory | O |
| Implicit / emotional memory | Memory | E |

## 4. Knowledge
| Capability | Owner Layer | Target |
|---|---|---|
| Document ingestion | Knowledge | C |
| Web knowledge ingestion | Knowledge | C |
| Chunking | Knowledge | C |
| Embedding generation | Knowledge | C |
| Indexing | Knowledge | C |
| Vector search | Knowledge | C |
| BM25 keyword search | Knowledge | C |
| Hybrid search | Knowledge | C |
| Reranking | Knowledge | C |
| RAG | Knowledge+Context | C |
| Evidence/source tracking | Knowledge | C |
| Knowledge Graph | Knowledge | R |
| GraphRAG | Knowledge | R |
| Personal KG | Knowledge | R |
| Entity resolution / linking | Knowledge | R |
| NER | Knowledge | R |
| Relationship/triple extraction | Knowledge | R |
| Knowledge synthesis | Knowledge | R |
| Knowledge validation | Knowledge | R |
| Ontology / semantic networks | Knowledge | I |
| Contextual retrieval | Knowledge | I |
| Temporal KG | Knowledge | I |
| Knowledge versioning | Knowledge | O |
| KG from file names (PKG) | Knowledge | O |
| Contradiction detection across sources | Knowledge | I |

## 5. Agents
| Capability | Owner Layer | Target |
|---|---|---|
| Single-agent execution (full context) | Agent | C |
| ReAct agent loop | Agent | C |
| Agent lifecycle | Agent | C |
| Agent state | Agent | C |
| Agent memory | Agent | C |
| Agent planning | Agent | C |
| Supervisor agent | Agent | C |
| Specialist agents (research/coding/browser/...) | Agent | R |
| Agent permissions | Agent+Security | C |
| Agent budget/timeout | Agent | C |
| Agent output contract | Agent | C |
| Agent handoff/delegation | Agent | R |
| Dynamic agent routing | Agent | R |
| Hierarchical agents | Agent | I |
| Planner-executor split | Agent | R |
| Critic agent | Agent | R |
| Verifier agent | Agent | R |
| Agent collaboration | Agent | I |
| Role-based agents / agent team | Agent | I |
| Dynamic agent creation | Agent | O |
| Autonomous / long-running agent | Agent+Execution | R |
| Agent voting/debate/negotiation/swarm | Agent | E |

## 6. Long-Horizon Execution
| Capability | Owner Layer | Target |
|---|---|---|
| Long-running tasks | Execution | C |
| Checkpoints | Execution | C |
| Resumability (resume after crash) | Execution | C |
| State persistence | Execution | C |
| Task queue/scheduling | Execution | C |
| Background execution | Execution | C |
| Retries | Execution | C |
| Failure handling/recovery | Execution+Recovery | C |
| Cancellation | Execution | C |
| Timeouts | Execution | C |
| Partial completion | Execution | R |
| Dead-letter handling | Execution | R |
| Rollback | Execution | R |
| Human escalation | Execution | C |
| Event-driven execution | Execution | R |
| Progress tracking / task journal | Execution | C |
| Context reconstruction (after resume) | Execution+Context | C |
| Persistent goals | Autonomy | I |

## 7. Tools
| Capability | Owner Layer | Target |
|---|---|---|
| Function/tool calling | Tool | C |
| Tool registry | Tool | C |
| Tool selection/routing | Tool | C |
| Tool permission check | Tool+Security | C |
| Tool sandboxing | Tool+Security | C |
| Tool retries | Tool | C |
| Tool tracing | Tool+Observability | C |
| Approval workflow | Tool+Security | C |
| Tool policy engine | Tool+Security | C |
| Tool chaining | Tool | R |
| Tool verification | Tool+Verification | R |
| Dry-run/simulation | Tool | R |
| Tool rollback | Tool | R |
| Tool composition | Tool | O |
| Dynamic tool creation/discovery | Tool | O |
| Tool transactions | Tool | O |
| Tool reliability metrics | Tool+Observability | I |
| Capability→Domain→Skill→Tool taxonomy | Tool | I |
| Runtime gateway (safe execution env) | Tool+Execution | C |

## 8. Protocols
| Capability | Owner Layer | Target |
|---|---|---|
| MCP client | Tool | R |
| MCP server (expose tools) | Tool | O |
| MCP resources/tools/prompts | Tool | R |
| MCP routing | Tool | I |
| MCP security/authorization | Tool+Security | R |
| A2A protocol (agent-to-agent) | Agent | O |
| Agent card / discovery | Agent | O |
| Capability negotiation | Agent | O |
| Agent payments protocol (AP2) | Agent | E |
| Microsoft agent governance | Security | O |

## 9. Browser Intelligence
| Capability | Owner Layer | Target |
|---|---|---|
| Browser automation (Playwright) | Tool | R |
| Browser agent | Agent+Tool | R |
| DOM understanding | Tool | R |
| Page understanding | Tool | R |
| Web navigation | Tool | R |
| Form fill | Tool | R |
| Screenshot reasoning | Tool+Multimodal | I |
| Accessibility tree | Tool | I |
| Visual browser interaction | Tool | I |
| Session/cookie management | Tool | I |
| Web task planning | Agent | I |
| Browser verification | Tool+Verification | I |
| Browser memory | Tool+Memory | O |

## 10. Computer Use
| Capability | Owner Layer | Target |
|---|---|---|
| Terminal agent | Tool+Agent | R |
| Filesystem agent | Tool+Agent | R |
| OS interaction | Tool | O |
| Desktop automation | Tool | O |
| GUI agent | Tool | E |
| Application control | Tool | O |
| Accessibility APIs | Tool | O |
| Vision-based control | Tool+Multimodal | E |
| Computer-use agent (full) | Agent | E |

## 11. Coding Intelligence
| Capability | Owner Layer | Target |
|---|---|---|
| Repository understanding | Coding Agent | R |
| Code generation/editing | Coding Agent | R |
| Refactoring | Coding Agent | I |
| Debugging | Coding Agent | R |
| Test generation/execution | Coding Agent | R |
| Static analysis | Coding Agent | I |
| Dependency management | Coding Agent | I |
| Build systems | Coding Agent | I |
| Runtime verification | Coding Agent+Verification | R |
| Git workflows | Coding Agent | R |
| Regression testing | Coding Agent+Evaluation | R |

## 12. Multimodal
| Capability | Owner Layer | Target |
|---|---|---|
| Vision / image reasoning | Multimodal | R |
| OCR / document understanding | Multimodal | R |
| Speech-to-text (ASR) | Multimodal | R |
| Text-to-speech (TTS) | Multimodal | R |
| Image generation | Multimodal | O |
| Video understanding | Multimodal | O |
| Audio understanding | Multimodal | O |
| Screen understanding | Multimodal | I |
| GUI interaction | Multimodal+Tool | O |

## 13. Autonomy
| Capability | Owner Layer | Target |
|---|---|---|
| Scheduled tasks | Autonomy | R |
| Event triggers | Autonomy | R |
| Background tasks | Autonomy | C |
| Proactive tasks | Autonomy | I |
| Persistent goals | Autonomy | I |
| Autonomous planning+execution+recovery | Autonomy+Execution | R |
| Should-act? gating | Autonomy+Security | C |
| Notify user | Autonomy | C |
| Environmental monitoring | Autonomy | O |

## 14. Learning
| Capability | Owner Layer | Target |
|---|---|---|
| Feedback learning | Learning | R |
| Experience extraction | Learning | R |
| Lesson → memory/skill/strategy | Learning | R |
| Self-reflection | Learning+Recovery | R |
| Self-evaluation | Learning+Evaluation | R |
| Controlled self-improvement (prompts/routing/tool-selection) | Learning | I |
| Strategy improvement | Learning | I |
| Memory-based learning | Learning | I |
| Continual learning | Learning | E |
| Meta-learning | Learning | E |
| Skill acquisition | Learning | I |

## 15. Verification
| Capability | Owner Layer | Target |
|---|---|---|
| Result verification | Verification | C |
| Test-based verification | Verification | C |
| Evidence/source verification | Verification | C |
| Consistency checking | Verification | R |
| Critic agent | Verification+Agent | R |
| Confidence estimation | Verification | R |
| Quality gates | Verification | R |
| Regression testing | Verification+Evaluation | R |

## 16. Security
| Capability | Owner Layer | Target |
|---|---|---|
| Authentication | Security | C |
| Authorization (RBAC+ABAC) | Security | C |
| Tool/agent permissions | Security | C |
| Secrets management | Security | C |
| Sandboxing | Security+Tool | C |
| Filesystem/network isolation | Security | R |
| Prompt-injection defense | Security | R |
| Malicious-tool-output defense | Security | R |
| Data-exfiltration defense | Security | R |
| Audit logs | Security+Observability | C |
| Approval gates | Security | C |
| Rate limiting | Security | R |
| Kill switch | Security | C |
| Safe failure | Security | C |
| Encryption | Security | R |

## 17. Observability
| Capability | Owner Layer | Target |
|---|---|---|
| Structured logs | Observability | C |
| Metrics | Observability | C |
| Distributed traces (agent/task/model/tool/memory) | Observability | C |
| Cost tracking | Observability | C |
| Latency tracking | Observability | C |
| Error tracking | Observability | C |
| Audit trails | Observability+Security | C |
| Live dashboard | Observability+UI | R |

## 18. Evaluation
| Capability | Owner Layer | Target |
|---|---|---|
| Benchmark suites (simple→long-horizon) | Evaluation | R |
| Regression testing | Evaluation | R |
| Adversarial evaluation | Evaluation | I |
| Model/reasoning/agent/memory/tool-use evaluation | Evaluation | R |
| Long-horizon/autonomy/security evaluation | Evaluation | I |

## 19. Infrastructure
| Capability | Owner Layer | Target |
|---|---|---|
| Relational DB (Prisma+SQLite) | Infra | C |
| Vector store | Infra | C |
| Graph store (KG) | Infra | R |
| File/object storage | Infra | C |
| In-memory cache | Infra | C |
| Queue + workers | Infra | R |
| Event bus | Infra | C |
| Model gateway | Infra+Model | C |
| WebSocket (socket.io) | Infra | R |
| Caddy single-port gateway | Infra | C |
| Backup/recovery | Infra | R |
| Local/cloud hybrid execution | Infra | O |

## 20. UI/UX
| Capability | Owner Layer | Target |
|---|---|---|
| Conversation surface (streaming) | UI | C |
| Workspace panel | UI | C |
| Observability dashboard | UI | R |
| Approval center | UI | R |
| Memory/Knowledge browser | UI | R |
| Autonomy settings | UI | R |
| Settings (model/keys/security) | UI | C |
| Dark mode + responsive + a11y | UI | C |

## 21. Personalization / Life-OS (per inventory categories 16, 29)
| Capability | Owner Layer | Target |
|---|---|---|
| User modeling / preference learning | Memory+Personalization | R |
| Personal world model | Reasoning | E |
| Life-OS integration (calendar/tasks/notes/contacts) | Autonomy+Tools | O |
| Personal KG (user's entities/relations) | Knowledge | R |

## 22. Experimental / Frontier (NOT core — research only)
World models, digital twins, neural memory, continual learning architectures, meta-learning, evolutionary agents, advanced self-improvement, embodied AI. Classified **E** — investigated, documented, **not** placed in core architecture until maturity justifies.

---

## Summary Counts (target)
- **Core (C):** ~85 capabilities — the v1 spine.
- **Required (R):** ~70 — strong v1.x.
- **Important (I):** ~45 — v1.x polish.
- **Optional (O):** ~30 — situational.
- **Experimental/Future (E):** ~20 — research only.

The architecture must deliver all **C** and most **R** capabilities for v1, with clean seams to add **I/O** later and sandbox **E** without touching production.
