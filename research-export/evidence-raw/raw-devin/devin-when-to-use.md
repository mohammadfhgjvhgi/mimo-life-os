> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# When to Use Devin

**TLDR:** Devin can handle the majority of engineering tasks, including medium and hard complexity work. The clearer and more specific your instructions, the higher the success rate — especially for complex tasks. For more comprehensive guidance on working effectively with coding agents, see our [Coding Agents 101 guide](https://devin.ai/agents101).

## Best Practices

<Icon icon="magnifying-glass" iconType="solid" />  **Scope tasks with [Ask Devin](/work-with-devin/ask-devin) before implementation:**

* Explore your codebase with Ask Devin's advanced code search, scope the approach, and let Devin auto-generate a high-context prompt, all before a single line of code is written.

<Icon icon="clock" iconType="solid" />  **Run multiple Devins in parallel:**

* Carve out independent tasks and run them simultaneously. [Ask Devin to delegate to managed Devins](/work-with-devin/advanced-capabilities#managed-devins) to launch many sessions at once, or the [Devin API](/api-reference/overview) for programmatic orchestration.
* Return to draft PRs waiting for review.

<Icon icon="message" iconType="solid" />  **Tag Devin on [Slack](/integrations/slack) or [Teams](/integrations/microsoft-teams):**

* Start sessions directly from conversations about bugs, feature requests, or questions. Devin responds in-thread with updates.

<Icon icon="rotate" iconType="solid" />  **Let Devin close the loop:**

* Enable [Devin Review](/work-with-devin/devin-review) with [Auto-Fix](/work-with-devin/devin-review#auto-fix) so Devin automatically responds to code review comments, fixes flagged bugs, and iterates on CI failures — without you needing to be in the loop. The result: PRs that are ready to merge by the time you look at them.

<Icon icon="plug" iconType="solid" />  **Extend Devin's reach with [MCP integrations](/work-with-devin/mcp):**

* Connect Devin to Datadog, Sentry, databases, Figma, Notion, Stripe, and hundreds of other tools via the MCP Marketplace. Devin can investigate production issues, query data, read designs, and more — all within a single session.

<Icon icon="desktop" iconType="solid" />  **Let Devin test its own work:**

* Devin has a full desktop environment with a shell, IDE, and browser. It can spin up your app locally, click through the UI, take screenshots, record screen recordings, and QA its own changes before opening a PR.

<Icon icon="calendar" iconType="solid" />  **Automate recurring tasks with [Scheduled Sessions](/product-guides/scheduled-sessions):**

* Set up daily or weekly sessions to triage Sentry errors, update dependencies, generate reports, or any other repeatable work.

<Icon icon="terminal" iconType="solid" />  **Use [Devin CLI](/cli) for local coding:**

* Work with Devin directly from your terminal without leaving your editor. Perfect for quick fixes, code exploration, and tasks that benefit from your local environment context. Use [`/handoff`](/work-with-devin/devin-cli#handoff-to-cloud-devin) to seamlessly transfer work to a cloud Devin session when needed. Install with `curl -fsSL https://cli.devin.ai/install.sh | bash`.

## Evaluating Tasks for Devin

When deciding if a task suits Devin, ask yourself:

1. **Can I describe clear success criteria?** Tasks with test suites, CI checks, or verifiable outcomes yield the best results.
2. **Is there enough context?** Provide relevant files, patterns, docs, or examples. The more context, the better.
3. **Would breaking this down help?** For very large projects, split the work into focused sessions that build on each other. You can run them in parallel with [managed Devins](/work-with-devin/advanced-capabilities#managed-devins).

As a rule of thumb: if a task would take you three hours or less, Devin can most likely do it. For longer tasks, break them into smaller sessions.

## Pre-Task Checklist

**Task Definition and Scope**

* Good tasks have a clear start and end, plus explicit success criteria (e.g., passing tests, matching an existing pattern, CI green)
* For complex tasks, use [Ask Devin](/work-with-devin/ask-devin) to collaboratively scope the work before starting a session. Ask Devin can help you investigate the codebase and outline your approach.

**Available Context**

* Are there examples or patterns for Devin to follow?
* Can you provide prototypes, partial code, or existing patterns from the codebase or docs?
* Are there links, filenames, or design files for Devin to reference?
* Have you connected relevant [MCP integrations](/work-with-devin/mcp) (databases, monitoring, design tools)?

**Success Validation**

* Tasks with test suites, lint checks, or compilation steps yield better results
* Devin can test its own work by launching your app and verifying behavior in the browser
* Enable [Devin Review](/work-with-devin/devin-review) to catch bugs before you even look at the PR

**Review Effort**

* With [Auto-Fix](/work-with-devin/devin-review#auto-fix) enabled, Devin responds to review comments and CI failures automatically
* Ideally, you just need to see that CI passes and the PR is approved

**Task Size**

* For large tasks, consider breaking them down into sub-tasks or [asking Devin to run them in parallel](/work-with-devin/advanced-capabilities#managed-devins)
* Splitting large requests into smaller, manageable chunks helps Devin stay on track
* Try to keep sessions focused (XS, S, or M as measured by [Session Insights](/product-guides/session-insights))

## Post-Task Review

**Monitor Session Trajectory**

* Leverage [Session Insights](/product-guides/session-insights) to investigate the session timeline and identify actionable feedback for future sessions

<Frame caption="To view session insights, click on the analysis button on the top right">
  <video src="https://mintcdn.com/cognitionai/2-Ub81sa8soZ2KIP/images/essential-guidelines/session-insights.mov?fit=max&auto=format&n=2-Ub81sa8soZ2KIP&q=85&s=de58696f0138e07c506d6db454c4c026" autoPlay loop muted playsInline style={{ width: "100%", height: "auto" }} data-path="images/essential-guidelines/session-insights.mov" />
</Frame>

* If Devin repeatedly encounters session usage limits, the task assigned to it might be too complex
* If Devin is struggling with its dev environment, revisit the [Workspace setup](/onboard-devin/environment)

**Learning from Devin's Mistakes**

* In your future sessions, provide more context or instructions to help Devin get past previous obstacles
* Consider adding or approving [Knowledge](/product-guides/knowledge) so Devin remembers things it learned from previous sessions
* Use the improved prompt suggested by [Session Insights](/product-guides/session-insights) as a starting point for similar future tasks
