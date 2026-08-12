# Sandboxing (Tool Isolation)

**Category:** Tools
**Status:** CORE
**Maturity:** Production-ready (process / container); Emerging (WASM for AI tools)

## Definition
**Sandboxing** is the execution of untrusted or high-risk tool code in an **isolated environment** that constrains what the code can access (filesystem, network, process, memory, CPU, time). The sandbox is the **containment vessel** that ensures even a malicious or buggy tool cannot escape to compromise the host system.

For MiMo AI, sandboxing applies primarily to: code execution (Python/JS/shell tools), browser automation (page scripts, downloads), file operations (writing outside the workspace), and any tool that ingests untrusted external data (web fetch, document parsing).

## Problem Solved
An autonomous agent that can execute arbitrary code is also an autonomous agent that can:
- `rm -rf /` the host.
- Exfiltrate secrets via network.
- Spawn cryptominers.
- Pivot to other services on the host network.
- Read the user's private files.

Without sandboxing, every code-exec tool call is a **full-trust operation** — unacceptable for an autonomous system. Sandboxing converts "execute this code" from "give it the keys to the machine" to "give it the keys to a confined cell."

## Why It Matters
Sandboxing is the **primary defense** that makes autonomous operation safe enough to deploy. For MiMo AI:
- It is the **enabler** for the coding agent (running generated code), the data-analysis agent (running Python on user data), and the browser agent (executing page scripts in isolation).
- It is the **architectural commitment** that the kill switch (Layer 15) can actually contain a runaway agent — kill the sandbox, the threat is gone.
- It is the **boundary** that lets us give an agent high-risk tools (shell, code-exec) without giving it the keys to the host.

## How It Works

### Isolation dimensions
A sandbox constrains along multiple dimensions:
1. **Filesystem isolation** — sandbox sees its own root FS; cannot access `/etc`, `/home`, host project files outside its workspace.
2. **Network isolation** — sandbox has no network, or a restricted egress allowlist, or a proxy that logs all traffic.
3. **Process isolation** — sandbox cannot see or signal host processes.
4. **Resource quotas** — CPU seconds, RAM, disk, file descriptors capped.
5. **Time limits** — wall-clock timeout kills the sandbox.
6. **Capability stripping** — syscalls restricted (seccomp, pledge); no `ptrace`, no `mount`, no privileged socket ops.
7. **Identity isolation** — sandbox runs as unprivileged user; no sudo; no host UID overlap.

### Isolation technologies (menu)
| Technology | Isolation strength | Startup latency | Overhead | Use case |
|---|---|---|---|---|
| `node:vm` | Low (same process) | <1ms | Minimal | Pure JS expression eval, no FS/network |
| `child_process` + seccomp/firejail | Medium | ~10ms | Low | Shell commands, scripts, with FS scoping |
| **Docker container** | High | ~100–500ms (cold), ~10ms (warm pool) | Medium | Code execution, multi-file projects |
| **Firecracker MicroVM** | Very high | ~125ms | Low | Strong isolation, multi-tenant |
| **gVisor (runsc)** | High | ~200ms | Medium-high | Kernel-level isolation for containers |
| **WebAssembly (WASM)** | Medium-high | <10ms | Very low | Sandboxed code execution in-process; emerging |
| **E2B / Modal (hosted)** | High | ~50ms (warm) | Network RTT | Hosted sandbox-as-a-service |

### Per-tool sandbox selection
```typescript
function selectSandbox(tool: ToolSpec): SandboxType {
  if (tool.category === 'read' && !tool.network) return 'none';
  if (tool.riskLevel === 'low') return 'none';
  if (tool.name === 'eval_js') return 'node:vm';
  if (tool.name === 'shell_exec') return 'firejail';
  if (tool.name === 'python_exec') return 'container';
  if (tool.riskLevel === 'critical') return 'container';
  return 'process';
}
```

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                   Tool Runtime (Layer 9)                     │
│                                                             │
│  ┌─────────────┐   ┌──────────────┐   ┌─────────────────┐  │
│  │ Policy      │──▶│ Approval     │──▶│ Sandbox Manager │  │
│  │ Engine      │   │ Gateway      │   │                 │  │
│  └─────────────┘   └──────────────┘   └────────┬────────┘  │
│                                                │            │
│                              ┌─────────────────┼────────┐  │
│                              │                 │        │  │
│                       ┌──────▼─────┐  ┌────────▼─────┐ ┌──▼──────────┐
│                       │  node:vm   │  │  child_proc  │ │ Docker      │
│                       │ (in-proc)  │  │ +firejail    │ │ container   │
│                       │            │  │              │ │ (pooled)    │
│                       └────────────┘  └──────────────┘ └─────────────┘
│                              │                 │              │
│                              └─────────────────┴──────────────┘
│                                                │
│                                       ┌────────▼────────┐
│                                       │ Result Capture  │
│                                       │ (stdout/stderr/ │
│                                       │  exit/artifacts)│
│                                       └─────────────────┘
└─────────────────────────────────────────────────────────────┘
```

### Sandbox lifecycle
1. **Provision** (cold: full startup; warm: pull from pool).
2. **Configure** (mount workspace, set env vars, apply quotas, install egress allowlist).
3. **Execute** (run the tool handler inside the sandbox).
4. **Capture** (collect stdout, stderr, exit code, artifacts; stream to Tool Runtime).
5. **Tear down** (kill process/container; clean FS; release quotas).
6. **Audit** (log everything; scan artifacts for known-bad patterns).

## Interfaces
- `SandboxManager.provision(spec: SandboxSpec): Promise<SandboxHandle>`
- `SandboxManager.execute(handle: SandboxHandle, command: string, opts): Promise<ExecResult>`
- `SandboxManager.teardown(handle: SandboxHandle): Promise<void>`
- `SandboxSpec { type: 'vm'|'process'|'container'|'microvm'; workspaceMount: string; networkPolicy: 'none'|'allowlist'|'proxy'; quotas: ResourceQuotas; timeoutMs: number }`
- `ExecResult { stdout: string; stderr: string; exitCode: number; artifacts: Artifact[]; durationMs: number; killed: boolean }`

## Dependencies
- Tool Runtime (sandbox is invoked from the executor stage).
- Resource Manager (CPU/RAM/disk quotas).
- Network Policy (egress allowlist, proxy).
- Audit log (Prisma — every sandbox exec recorded).
- Container runtime (Docker daemon, if used).
- Pool manager (warm container pool to amortize startup).

## Strengths
- **Containment** — even malicious code cannot escape to the host.
- **Resource fairness** — quotas prevent runaway CPU/RAM/disk.
- **Reproducibility** — same sandbox config → same execution environment.
- **Auditability** — every exec logged; artifacts retained.
- **Killability** — `teardown` is immediate and total.

## Weaknesses
- **Latency** — container cold start ~500ms; VM seconds. Mitigation: warm pool.
- **Overhead** — CPU/RAM overhead for virtualization (containers ~1–5%, VMs ~5–15%).
- **Complexity** — sandbox lifecycle, pool, networking, FS mounting all need code.
- **Egress risk** — sandbox with network can still phone home. Mitigation: proxy with allowlist + logging.
- **Escape vulnerabilities** — container escapes (rare but real; e.g., CVEs in runc). Mitigation: gVisor or MicroVM for high-risk.

## Failure Modes
- **Cold start latency spike** — first call to a containerized tool takes 500ms+; user perceives lag. Mitigation: warm pool of pre-started containers.
- **Resource exhaustion** — too many concurrent sandboxes exhaust host RAM. Mitigation: concurrency cap + queue.
- **Network leak** — misconfigured egress allowlist lets sandbox reach internal services. Mitization: default-deny; explicit allowlist; audit all connections.
- **FS leak** — sandbox writes outside its workspace (misconfigured mount). Mitigation: read-only host mounts; tmpfs for writes.
- **Zombie sandbox** — teardown failed; container still running. Mitigation: GC sweep every minute; kill-orphaned by label.
- **Escape via kernel exploit** — container escapes via CVE. Mitigation: gVisor / Firecracker for critical tools; patch cadence.
- **Artifact exfiltration** — sandbox writes secrets to a file the agent later reads out. Mitigation: outbound artifact scan; secrets-detection on capture.

## Security Implications
- **Default deny** — sandbox has no network, no FS access, no privileges by default. Every capability is explicitly granted.
- **Egress allowlist** — if network is needed, only allowlist specific domains (e.g., `pypi.org`, `npmjs.org`); proxy logs all traffic.
- **Secrets isolation** — host secrets (API keys, DB credentials) never mounted into sandbox; sandbox gets task-scoped credentials only.
- **Artifact scanning** — outbound files scanned for secrets/PII before release to agent context.
- **Audit** — every sandbox exec recorded with command, args, stdout/stderr, artifacts, duration, exit code.
- **Kill switch** — `teardown` is immediate; no graceful shutdown for runaway sandboxes.

## Performance Implications
- `node:vm`: ~1ms overhead; suitable for high-frequency pure-JS eval.
- `child_process` + firejail: ~10ms; suitable for shell commands.
- Docker container: ~100–500ms cold, ~10ms warm; suitable for code execution with multi-file projects.
- Firecracker MicroVM: ~125ms cold; suitable for strong isolation needs.
- Pool: pre-warm N containers; allocate from pool; return on teardown.

## Operational Implications
- Container runtime (Docker) must be installed + healthy on the host.
- Pool sizing: monitor utilization; scale pool with concurrent tool demand.
- Image management: base images versioned; security patches applied; rebuild cadence.
- Disk cleanup: sandbox FSes are ephemeral but consume disk until GC; sweep policy.
- Network policy updates: egress allowlist is code (git-tracked); changes go through review.

## Alternatives
- **No sandboxing** — rejected; unsafe for autonomous code execution.
- **Hosted sandbox-as-a-service (E2B, Modal)** — viable for v1.x; removes operational burden but adds network RTT + cost + vendor lock-in. For v1, self-hosted Docker containers give us control + lower cost.
- **WebAssembly (WASM)** — emerging; very fast, in-process, strong isolation for suitable languages. Worth investigating for v1.x as a `node:vm` upgrade path.

## Maturity & Production Readiness
- `node:vm`: production-ready but **weak isolation** (same process; can escape via prototypes). Use only for trusted JS.
- `child_process` + firejail/seccomp: production-ready; commonly used.
- Docker containers: production-ready, industry standard for code-exec sandboxes.
- Firecracker MicroVM: production-ready (used by AWS Lambda, Fly.io); heavier ops.
- gVisor: production-ready; strong isolation; some syscall compatibility limits.
- WASM sandboxing: emerging; viable for specific languages (Rust, C/C++, AssemblyScript).

## Relevant Research / Papers
- Google — *gVisor* technical paper (2018).
- AWS — *Firecracker* (firecracker-microvm/firecracker).
- Mozilla — *WebAssembly* security model (webassembly.org/docs/security).
- OpenAI — *Code Interpreter* sandbox architecture (blog, 2023).
- E2B — *Sandboxed Cloud Environments for AI Agents* (e2b.dev/blog).

## Official Documentation
- Node.js — `node:vm` (nodejs.org/api/vm.html) — note security caveats.
- firejail — firejail.wordpress.com.
- Docker — docs.docker.com/engine/security/.
- gVisor — gvisor.dev.
- Firecracker — github.com/firecracker-microvm/firecracker.
- E2B — e2b.dev/docs.
- Modal — modal.com/docs.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Dedicated `tool-runtime-service` mini-service** (bun process, own port, Caddy `?XTransformPort=4030`) hosts the Sandbox Manager. This is the **architecturally correct placement** for v1: tool execution (especially sandboxed code/shell) is isolated from the Next.js UI server; a runaway sandbox cannot crash the UI; the main process never holds container handles.
- **Sandbox tier for v1**:
  - `node:vm` for pure-JS expression eval (low risk, no FS/network).
  - `child_process` + `firejail` (or `bubblewrap` on Linux) for shell commands; workspace mounted read-write, host FS invisible, network denied by default.
  - **Docker containers** (pooled, warm) for code-exec tools (Python, multi-file JS/TS); base image `mimo/sandbox-python:slim` with common packages; egress via a logging proxy with allowlist (default-deny).
  - **Defer** Firecracker/gVisor to v1.x unless high-risk multi-tenant scenarios emerge (single-user personal AI doesn't need VM-level isolation yet).
- **Pool**: pre-warm 3–5 containers per language image; allocate on provision; return on teardown; sweep orphans every minute.
- **Workspace**: per-task workspace directory under `tool-results/<taskId>/`; mounted into sandbox as `/workspace`; cleaned up after task retention period.
- **Egress proxy**: tiny HTTP/SOCKS proxy (Node.js or Caddy itself) with allowlist `[pypi.org, npmjs.org, github.com, ...]`; all sandbox traffic routed through it; logged to Prisma `SandboxNetworkAudit`.
- **Quotas**: per-exec `{ cpuMs: 30000, memoryMB: 512, diskMB: 100, fd: 256, processes: 64 }`; enforced by Docker `--cpus`, `--memory`, `--pids-limit`, `--ulimit`.
- **Timeout**: wall-clock `timeoutMs` per exec; on expiry, `docker kill` + mark `killed: true`.
- **Artifact capture**: stdout/stderr streamed to Prisma `ToolCallAudit` (truncated at 1MB); artifacts (files written to `/workspace`) listed + path-stamped; secrets-detection scan before release.
- **socket.io**: emit `sandbox:provisioned`, `sandbox:executing`, `sandbox:stdout` (stream), `sandbox:completed`, `sandbox:killed`. UI shows live sandbox output in the observability panel.
- **Kill switch**: `/api/sandbox/kill-all` endpoint + socket.io broadcast; `docker kill $(docker ps -q --filter label=mimo-sandbox)`; immediate.
- **Caddy**: `?XTransformPort=4030` routes tool-runtime traffic; only the main Next.js process and the agents-service can reach it (internal network).

## Relevance To Our Project (MiMo AI layered runtime)
Sandboxing is the **core of Layer 15 (Security) as it applies to Layer 9 (Tool)**. It is what makes the coding agent, data-analysis agent, and any code-exec tool safe to deploy. It is the **enabler of autonomous operation** — without it, we cannot give the agent shell or code-exec tools, and the system is reduced to read-only research.

The `tool-runtime-service` mini-service is the **architectural commitment** to this isolation: tool execution lives in its own process on its own port, behind Caddy, with its own resource budgets. A compromise of the tool runtime does not cascade to the UI server or the model gateway.

## Recommended Usage
- Every code-exec / shell / browser-automation tool call goes through a sandbox.
- Match sandbox tier to tool risk: `node:vm` for low-risk pure JS; `child_process+firejail` for shell; Docker container for code-exec; MicroVM/gVisor for high-risk multi-tenant.
- Default-deny network; allowlist per tool; proxy all traffic.
- Pre-warm a container pool to amortize cold-start.
- Per-exec quotas (CPU/RAM/disk/fd/processes/time).
- Kill switch always available; sweep orphans.
- Audit every exec; scan artifacts for secrets before release.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** dedicated `tool-runtime-service` mini-service (port 4030, Caddy `?XTransformPort=4030`) with a tiered sandbox: `node:vm` + `child_process`+firejail + Docker containers (pooled). **ADOPT** default-deny network + egress proxy. **DEFER** Firecracker/gVisor to v1.x (single-user doesn't need VM isolation yet). **DEFER** hosted sandbox (E2B/Modal) to v1.x evaluation. **REJECT** unsandboxed code execution.

## Sources
- Node.js `node:vm` docs (nodejs.org/api/vm.html)
- firejail (firejail.wordpress.com)
- Docker security (docs.docker.com/engine/security)
- gVisor (gvisor.dev)
- Firecracker (github.com/firecracker-microvm/firecracker)
- E2B (e2b.dev/docs)
- OpenAI Code Interpreter sandbox blog (openai.com/blog)
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 9 Tool, Layer 15 Security), §5 (Tool components: sandboxing)
- MiMo AI `CAPABILITY_MAP.md` §7 (tool sandboxing = C), §16 (sandboxing = C, filesystem/network isolation = R)
