
---

## 9. Refinement Audit (Round 2 — stricter spec)

After the first redesign, a stricter spec was issued. Audit findings against it:

### Violations found in the v1 MiMo OS

| # | Violation | Spec rule broken | Fix |
|---|---|---|---|
| 1 | `StatsPanel` (4 KPI cards) shown in the default right sidebar | "Never build 20 KPI cards / analytics-first layouts" | Remove from default sidebar; keep only inside the opt-in Dashboard tab |
| 2 | Runtime status pills (confidence %, runtime state) always visible in top bar | "Do not expose internal runtime information unless developer mode is enabled" | Hide pills when `!devMode` |
| 3 | Left rail = 8 nav + 3 bottom (theme/settings/dev) = 11 buttons | "Maximum 8 icons" | Consolidate to 6 nav + 1 account popover (theme+dev+settings) + dev(conditional) = 8 max |
| 4 | `AgentDock` = vertical list of static agent cards | "Do NOT display them as static cards. Display them as a LIVING WORKFLOW" | Rebuild as horizontal pipeline stepper: Context→Reason→Plan→Execute→Validate→Reflect→Done |
| 5 | Execution invisible — user sees only empty streaming bubble while Core pipeline runs server-side | "The user must FEEL the AI thinking… Everything happens here [in center]" | Inject `ExecutionTrace` INLINE in the streaming message showing animated pipeline stages |
| 6 | `PersonalContext` stacks 6 panels (Identity + Stats + Goals + Recs + Memory + Knowledge) | "calm, focused, minimal, not crowded, not overwhelming" | Reduce to 2-3 essential panels per mode |
| 7 | `PersonalDashboard` = classic dashboard (stats row + 6 widgets) | "Never make the dashboard the homepage / analytics-first" | Refocus on "today" — one priority, today's tasks, one recommendation |
| 8 | Only 4 workspace modes (chat/research/code/run) | Spec lists 9 modes (chat/research/coding/planning/writing/automation/image/data/developer) | Add writing/automation/image/data modes that each swap the sidebar |
| 9 | No current-project indicator in top bar | "Top bar contains: current project" | Add project chip |
| 10 | No Alt+1..9 / Ctrl+P / Ctrl+Shift+L shortcuts | "Everything should support shortcuts" | Add them |

### What already works (KEEP)
- Conversation is the center ✓
- Tab-based workspace (conversation pinned) ✓
- Adaptive right sidebar (mode-driven) ✓
- Universal Search + Command Palette ✓
- Developer Mode hidden by default ✓
- Real Core data via /api/mimo/workspace ✓
- Glass + depth + premium tokens ✓

### Round 2 scope
Rebuild: AgentDock (living workflow), add ExecutionTrace (inline), calm sidebar, trim rail, hide runtime when !dev, add modes + shortcuts. Do NOT rebuild working components.
