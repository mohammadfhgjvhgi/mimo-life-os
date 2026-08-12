# TECHNOLOGY_CLASSIFICATION

> Classification of the ~1,500-technique inventory (34 categories) into engineering tiers.
> The inventory is **raw source material, NOT an implementation checklist**. We extract maximum engineering value while avoiding unnecessary complexity.
> Selective documentation: detailed knowledge files exist only for CORE/REQUIRED/selected IMPORTANT items (see `KNOWLEDGE_INDEX.md`).

## Classification Tiers
- **CORE** — v1 spine. Must have for a working autonomous system.
- **REQUIRED** — v1, strong. Needed for a credible v1.
- **IMPORTANT** — v1.x polish. Add after spine stabilizes.
- **OPTIONAL** — situational. Add only if a real need arises.
- **EXPERIMENTAL / FUTURE** — research only. Documented, sandboxed, not in production core.
- **REPLACED / DUPLICATE / REJECTED** — superseded or not needed (with reason).

---

## Classification by Inventory Category

### 1. Cognitive Architecture — Planning & Thinking (items 1-26)
- **CORE:** Chain-of-Thought, ReAct, Plan-and-Solve, Structured Reasoning, Sequential Reasoning, Decision Making, Confidence Scoring → `knowledge/reasoning/`
- **REQUIRED:** Tree-of-Thought, Self-Consistency, Reflection (Reflexion), Adaptive Reasoning, Inference-Time Compute, Deep Reasoning, Causal Reasoning, Temporal Reasoning, Constraint Reasoning, Uncertainty Estimation, Contradiction Detection
- **IMPORTANT:** LATS (tree search), State Estimation
- **OPTIONAL:** Counterfactual, Hypothesis Generation/Testing, Constraint Solving (use model, not solver), World Model
- **EXPERIMENTAL/FUTURE:** Meta-Reasoning
- **Knowledge files:** `reasoning/chain_of_thought.md`, `react.md`, `plan_and_solve.md`, `structured_reasoning.md`, `reflection.md`, `self_consistency.md`

### 2. Memory Types (items 27-51)
- **CORE:** Working, Short-term, Long-term, Episodic, Semantic, Procedural, Preference, Memory Consolidation, Memory Retrieval → `knowledge/memory/`
- **REQUIRED:** Relationship, Failure, Skill, Temporal, Behavioral, Memory Compression, Conflict Resolution, Provenance
- **IMPORTANT:** Autobiographical, Memory Reinforcement, Memory Decay
- **OPTIONAL:** Organizational Context, Memory Confidence, Memory Versioning
- **EXPERIMENTAL/FUTURE:** Implicit Memory, Emotional Memory
- **Knowledge files:** `memory/memory_architectures.md`, `episodic_memory.md`, `semantic_memory.md`, `procedural_memory.md`, `preference_memory.md`, `memory_consolidation.md`, `memory_retrieval.md`, `memory_compression.md`

### 3. Memory Storage & Retrieval Techniques (items 52-60)
- **CORE:** Vector Database, Embeddings, Vector Search, BM25 Keyword Search, Hybrid Search, Reranking, File-Based Memory → `knowledge/retrieval/`, `knowledge/infrastructure/`
- **IMPORTANT:** Contextual Retrieval, Local Embeddings
- **Knowledge files:** `retrieval/vector_search.md`, `hybrid_search.md`, `reranking.md`, `infrastructure/vector_database.md`, `models/embeddings.md`

### 4. Knowledge Graph (items 61-77)
- **REQUIRED:** Knowledge Graph, GraphRAG, Personal KG, NER, Relationship Extraction, Knowledge Extraction, Knowledge Synthesis, Knowledge Validation, Ontology, Semantic Networks, Triple Extraction, Entity Resolution
- **IMPORTANT:** Temporal KG, Entity Linking
- **OPTIONAL:** KG from File Names, Knowledge Versioning
- **EXPERIMENTAL/FUTURE:** Personal World Model
- **Knowledge files:** `retrieval/knowledge_graph.md`, `retrieval/graphrag.md`, `infrastructure/knowledge_graph_store.md`

### 5. Agent Structure (items 78-103)
- **CORE:** Single Agent, ReAct Agent, Agent Loop, Agent Lifecycle → `knowledge/agents/`
- **REQUIRED:** Multi-Agent (selective), Supervisor, Planner-Executor, Critic, Verifier, Specialist Agents, Dynamic Routing, Handoff, Delegation, Collaboration, Role-Based/Team, Checkpointing
- **IMPORTANT:** Hierarchical, Dynamic Creation, Autonomous, Long-Running
- **EXPERIMENTAL/FUTURE (rejected for v1):** Negotiation, Voting, Debate, Swarm
- **Knowledge files:** `agents/agent_architectures.md`, `single_vs_multi_agent.md`, `react_agent_loop.md`, `supervisor_pattern.md`, `agent_lifecycle.md`, `agent_handoff.md`, `execution/checkpointing.md`, `execution/long_horizon_execution.md`

### 6. Agent Frameworks (items 104-120)
- **ADOPT (as patterns, not necessarily the libs):** LangGraph (graph orchestration pattern), Vercel AI SDK (TypeScript-native, Next.js fit), Mastra (TS)
- **REFERENCE ONLY (patterns, not deps):** OpenAI Agents SDK, Claude Agent SDK, Google ADK, Pydantic AI, CrewAI, Strands, Microsoft Agent Framework, AutoGen, Haystack, Dify, Smolagents, Agno, Semantic Kernel
- **Decision:** Build MiMo's own minimal runtime in TypeScript (Vercel AI SDK as the tool-calling/streaming primitive). Do NOT import Python frameworks. See ADR-002.
- **Knowledge files:** referenced in `agents/agent_architectures.md`, `tools/function_calling.md`

### 7. Tools — Capabilities (items 121-140)
- **CORE:** Function Calling, Tool Calling, Tool Permissions, Tool Sandboxing, Tool Retries, Approval Workflow, Tool Policy Engine, Runtime Gateway → `knowledge/tools/`
- **REQUIRED:** Tool Routing, Tool Chaining, Tool Verification, Tool Tracing, Capability→Domain→Skill→Tool taxonomy
- **IMPORTANT:** Tool Reliability, Tool Rollback, Tool Simulation/Dry-Run
- **OPTIONAL:** Dynamic Tools, Tool Discovery, Tool Composition, Tool Transactions
- **Knowledge files:** `tools/tool_runtime.md`, `function_calling.md`, `sandboxing.md`, `approval_workflow.md`, `tool_policy_engine.md`

### 8. Protocols — MCP + A2A + AP2 (items 141-159)
- **REQUIRED:** MCP (client + server), MCP Resources/Tools/Prompts, MCP Security/Authorization, MCP Routing → `knowledge/protocols/mcp.md`
- **OPTIONAL:** A2A Protocol, Agent Card, Agent Discovery, Capability Negotiation, MCP Gateway, MCP Tasks
- **EXPERIMENTAL/FUTURE (rejected for v1):** AP2 (Agent Payments), Intent/Cart Mandate, Microsoft Agent Governance
- **Knowledge files:** `protocols/mcp.md`, `protocols/a2a.md`

### 9. Browser Intelligence (items 160-176)
- **REQUIRED:** Browser Automation (Playwright), Browser Agents, DOM Understanding, Page Understanding, Web Navigation, Form Fill → `knowledge/browser/`
- **IMPORTANT:** Screenshot Reasoning, Accessibility Tree, Visual Browser Interaction, Session Management, Web Task Planning, Browser Verification
- **OPTIONAL:** Browser Memory
- **Knowledge files:** `browser/browser_automation.md`, `browser/browser_agent.md`

### 10. Computer Use (items 177-186)
- **REQUIRED:** Terminal Agent, Filesystem Agent → (covered in `tools/`, `coding/`)
- **OPTIONAL:** OS Interaction, Desktop Automation, Application Control, Accessibility APIs
- **EXPERIMENTAL/FUTURE (rejected for v1):** Computer-Use Agents, GUI Agents, Vision-Based Control, Structured UI Control
- **Rationale:** Full computer-use is high-risk, high-complexity; defer until v2.

### 11. Coding Intelligence (items 187-...)
- **REQUIRED:** Repository Understanding, Code Generation/Editing, Debugging, Test Generation/Execution, Runtime Verification, Git Workflows, Regression Testing → `knowledge/coding/coding_agent.md`
- **IMPORTANT:** Refactoring, Static Analysis, Dependency Management, Build Systems
- **Knowledge files:** `coding/coding_agent.md`

### 12. Sandbox — Safe Execution (items ...)
- **CORE:** Sandboxing → `knowledge/tools/sandboxing.md`
- **REQUIRED:** Isolation, Network Policy
- **Knowledge files:** `tools/sandboxing.md`

### 13. Smart Search (items ...)
- **CORE:** Web Search, Web Reading → via z-ai-web-dev-sdk skills
- **REQUIRED:** Source Quality, Evidence Tracking
- **IMPORTANT:** Multi-query, Iterative search, Search reranking
- **Knowledge files:** referenced in `retrieval/hybrid_search.md`, `retrieval/reranking.md`

### 14. Multimodal (items ...)
- **REQUIRED:** Vision/Image Reasoning, OCR/Document Understanding, ASR, TTS → `knowledge/multimodal/`
- **OPTIONAL:** Image Generation, Video Understanding, Audio Understanding, Screen Understanding, GUI Interaction
- **Knowledge files:** `multimodal/vision.md`, `asr_tts.md`, `image_generation.md`

### 15. Proactive Intelligence (items ...)
- **REQUIRED:** Proactive Tasks, Scheduled Tasks, Event Triggers, Background Tasks, Smart Reminders → `knowledge/autonomy/`
- **IMPORTANT:** Persistent Goals, Context-Aware Suggestions, Recurring Error Detection
- **OPTIONAL:** Environmental Monitoring, Predictive
- **Knowledge files:** `autonomy/proactive_intelligence.md`, `autonomy/autonomous_agents.md`

### 16. Personalization — User Modeling (items ...)
- **REQUIRED:** Preference Learning, User Modeling, Personal KG → covered in `memory/`, `retrieval/`
- **IMPORTANT:** Behavior Patterns, Adaptive Tone
- **EXPERIMENTAL/FUTURE:** Personal World Model

### 17. Self-Improvement (items ...)
- **IMPORTANT (gated):** Strategy Improvement, Prompt Optimization, Tool-Selection Learning, Routing Learning, Agent Behavior Learning → `knowledge/learning/`
- **EXPERIMENTAL/FUTURE (rejected for v1):** Evolutionary Agents, Advanced Self-Improvement, Neural Memory
- **Knowledge files:** `learning/learning_engine.md`, `learning/controlled_self_improvement.md`

### 18. Long-Horizon Autonomy (items ...)
- **CORE:** Long-Running Tasks, Checkpoints, Resumability, State Persistence, Progress Tracking → `knowledge/execution/`
- **REQUIRED:** Retries, Recovery, Background Execution, Event-Driven Execution, Cancellation, Timeouts, Human Escalation, Context Reconstruction
- **IMPORTANT:** Partial Completion, Dead-Letter, Rollback, Persistent Goals
- **Knowledge files:** `execution/checkpointing.md`, `recovery.md`, `long_horizon_execution.md`

### 19. Events & Triggers (items ...)
- **CORE:** Event Bus → `knowledge/infrastructure/event_bus.md`
- **REQUIRED:** Trigger System, Schedulers
- **Knowledge files:** `infrastructure/event_bus.md`, `infrastructure/task_queue.md`

### 20. Observability (items ...)
- **CORE:** Logs, Metrics, Traces (agent/task/model/tool/memory), Cost Tracking, Audit Trails → `knowledge/observability/`
- **REQUIRED:** Latency Tracking, Error Tracking, Live Dashboard
- **Knowledge files:** `observability/observability.md`, `audit_trails.md`

### 21. Security (items ...)
- **CORE:** Authentication, Authorization (RBAC+ABAC), Tool/Agent Permissions, Secrets, Sandboxing, Audit, Approval Gates, Kill Switch, Safe Failure → `knowledge/security/`
- **REQUIRED:** Filesystem/Network Isolation, Prompt-Injection Defense, Data-Exfiltration Defense, Rate Limiting, Encryption
- **Knowledge files:** `security/agent_security.md`, `prompt_injection_defense.md`, `permissions_rbac_abac.md`, `secrets_management.md`

### 23. Model Routing (items ...)
- **CORE:** Model Gateway → `knowledge/models/model_gateway.md`
- **REQUIRED:** Model Routing, Fallback Strategy
- **IMPORTANT:** Ensemble (for verifier on critical tasks)
- **Knowledge files:** `models/model_gateway.md`, `models/model_routing.md`

### 24. Context Engineering (items ...)
- **CORE:** Context Assembly, Context Compression, Context Management → `knowledge/context/`
- **REQUIRED:** Context Prioritization, Context Reconstruction
- **Knowledge files:** `context/context_engineering.md`, `context_assembly.md`, `context_compression.md`, `long_context_management.md`

### 25. Storage — Databases (items ...)
- **CORE:** Relational (Prisma+SQLite), Vector Store, File Storage, Cache → `knowledge/infrastructure/`
- **REQUIRED:** Graph Store (SQLite-relational)
- **DEFERRED:** Queue (SQLite-backed v1; Redis/BullMQ later), Workers
- **REJECTED for v1:** Dedicated vector/graph servers (overkill at personal scale)
- **Knowledge files:** `infrastructure/vector_database.md`, `knowledge_graph_store.md`, `task_queue.md`, `event_bus.md`

### 26. UI/UX (items ...)
- **CORE:** Conversation surface, Workspace panel, Settings → covered in `FINAL_PRODUCT_MODEL.md`
- **REQUIRED:** Observability dashboard, Approval center, Memory/Knowledge browser, Autonomy settings
- Stack: Next.js 16 App Router, Tailwind 4, shadcn/ui, framer-motion, socket.io real-time, dark mode, responsive, a11y.

### 27. LLMs (items ...)
- **CORE:** GLM-5.2 (primary) → `knowledge/models/glm_5_2.md`
- **REQUIRED:** Fallback model (≥1 alternate provider via Gateway)
- **OPTIONAL:** Local models (offline)
- **Knowledge files:** `models/glm_5_2.md`, `models/embeddings.md`

### 28. Organizational Intelligence
- **OPTIONAL:** Multi-user/org later. v1 is personal/single-user.

### 29. Life-OS Integration
- **OPTIONAL:** Calendar/Tasks/Notes/Contacts integration. Defer to v1.x unless a specific need.

### 31. External Integration
- **OPTIONAL:** Third-party service connectors. Add via Tool Registry + MCP as needed.

### 32. Architecture Patterns (items ...)
- **ADOPT:** Layered runtime, mini-services (socket.io), gateway (Caddy), event-driven, plugin interface, checkpoint/resume.
- **REJECTED for v1:** Microservices sprawl, serverless cold-start for long tasks, distributed-everything.

### 33. Promising Techniques 2026-2028
- **EXPERIMENTAL/FUTURE:** Tracked in `knowledge/` as RESEARCH; not in production core.

### 34. Unknown Unknowns & 35. Bold/Frontier Ideas
- **EXPERIMENTAL/FUTURE:** World models, digital twins, neural memory, continual learning, meta-learning, evolutionary agents, embodied AI. Documented, sandboxed, NOT core.

---

## Complexity Control (key rejections)
- **REJECTED:** Dedicated vector DB servers (Pinecone/Weaviate) at v1 → use sqlite-vec. (revisit >1M vectors)
- **REJECTED:** Dedicated graph DB (Neo4j) at v1 → SQLite-relational KG. (revisit on multi-hop latency)
- **REJECTED:** Python agent frameworks (LangChain/CrewAI/AutoGen) → build minimal TS runtime on Vercel AI SDK.
- **REJECTED:** Redis/BullMQ at v1 → SQLite-backed queue. (interface designed for swap)
- **REJECTED:** Full computer-use/GUI agents at v1 → defer to v2 (high risk).
- **REJECTED:** Agent payments (AP2), voting/debate/swarm at v1 → not needed.
- **REJECTED:** Unrestricted self-modification → controlled self-improvement only.

## Selection Principle
For every technology: *"Does this materially improve the final system?"* If NO → optional/experimental/rejected. The architecture must remain **understandable**.
