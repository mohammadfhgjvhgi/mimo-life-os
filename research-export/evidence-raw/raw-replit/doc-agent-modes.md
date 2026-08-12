> ## Documentation Index
> Fetch the complete documentation index at: https://docs.replit.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Modes

> Learn how to choose between Lite, Economy, and Power for your Agent builds.

Agent modes let you control the balance between speed, cost, and capability when using Agent. Use the top-level mode selector in the Agent settings dropdown to choose a mode: **Lite**, **Economy**, or **Power**. Each mode has a recommended primary model you can change with the [Model selector](/features/agent/model-selector). The modes and settings you see depend on your plan and workspace.

<Tip>
  **Keyboard shortcut:** Press **⌘+Shift+I** (Ctrl+Shift+I on Windows) to cycle through Agent modes without leaving the chat input.
</Tip>

## Lite mode

**Optimized for quick edits.** Lite uses fast, lightweight models for visual tweaks, bug fixes, and other small, scoped changes.

**Best for:** Quick fixes, UI polish, and short iteration loops while you stay at your keyboard.

**Keep in mind:** Lite works best in existing apps when you already know what you want to change. If you're starting from scratch, making large architectural changes, adding a new integration, or changing a database schema, switch to Economy or Power.

**Cost:** Lite uses the same effort-based pricing model as the other build modes, but focused requests often cost less than Economy or Power for the same targeted edit.

## Economy mode

**Optimized for cost.** Economy uses fewer credits per task and is the best default when you want strong results without paying for the most capable models.

<Frame>
  <img src="https://mintcdn.com/replit/XaMYOCzzo0qF7SLE/images/replitai/agent-modes-economy.png?fit=max&auto=format&n=XaMYOCzzo0qF7SLE&q=85&s=bd129c68f32114d8c9296d5ea039549c" alt="Agent modes popover with Economy selected, described as a cost-optimized model balancing speed and quality, with GPT-5.6 Luna Fast as the recommended primary Economy model" width="1192" height="1328" data-path="images/replitai/agent-modes-economy.png" />
</Frame>

**Best for:** Everyday builds, learning, and cost-conscious work across an existing project.

## Power mode

**Optimized for capability.** Power uses more capable models for complex tasks, larger codebases, and harder problems.

<Frame>
  <img src="https://mintcdn.com/replit/XaMYOCzzo0qF7SLE/images/replitai/agent-modes-power.png?fit=max&auto=format&n=XaMYOCzzo0qF7SLE&q=85&s=ae3098e25ed6b9f138254f5de7819752" alt="Agent modes popover with Power selected, described as a higher-performance model for complex work, with Claude Fable 5 as the recommended primary Power model" width="1192" height="1328" data-path="images/replitai/agent-modes-power.png" />
</Frame>

**Best for:** Production-grade projects, complex features, and when you want the best results from Agent.

## Which mode should I use?

Use the following as a guide:

| Goal                                           | Recommended mode                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| Small, scoped edits and quick iterations       | Lite                                                                |
| Maximize number of prompts per credit          | Economy                                                             |
| Balance cost and quality for most projects     | Economy                                                             |
| Best results on complex, production-grade work | Power                                                               |
| Best possible result on the most complex tasks | Power with a higher [Effort](/features/agent/model-selector#effort) |

Use the Agent settings dropdown in the chat input to pick a mode, then set a [primary model and Effort](/features/agent/model-selector) if you want to steer further. No single mode is always best. Pick the mode that fits the task in front of you.

## Settings in shared projects

Your Agent settings are tied to you, not to the project. When you invite a teammate into a project, each of you keeps your own choices for:

* Mode (Lite, Economy, or Power)
* [Primary model and Effort](/features/agent/model-selector)
* [Plan Mode](/features/agent/plan-mode)
* Auto-merge for background tasks
* Auto-approve for plans

A teammate switching to Power on their next task does not flip your settings to Power. The mode and settings you see in the Agent settings dropdown are the ones Agent uses when you send the next message, regardless of how many collaborators are in the project.

## Related

* [Managing your spend](/billing/managing-spend): Set alerts, budgets, and use Plan Mode for cost control.
* [Replit Pro](/billing/plans/replit-pro): Plan features and tiered credits.
