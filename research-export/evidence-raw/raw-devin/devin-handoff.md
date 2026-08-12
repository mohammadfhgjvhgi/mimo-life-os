> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Hand off to cloud Devins

> Hand off tasks to a cloud Devin session from the Devin CLI, Claude Code, Codex, or any coding agent.

Hand a task off to a cloud [Devin session](/get-started/first-run) and keep working locally. The cloud session gets its own VM with a shell, browser, and full repo access, so it can keep going after you close your laptop.

There are two ways to hand off:

* **From the [Devin CLI](/cli)** — the built-in `/handoff` command, no setup required.
* **From any other coding agent** — Claude Code, Codex, Cursor, and more, using the open-source [Devin Handoff](https://github.com/club-cog/devin-handoff) plugin.

## When to hand off

Hand a task off when it needs more than your local machine, or when you want it to run in the background:

* **VM or server** — running a dev server, hitting endpoints, Docker builds
* **Browser** — screenshots, OAuth flows, end-to-end tests, scraping
* **CI/CD** — pipeline debugging, deployments, infrastructure changes
* **Long-running work** — migrations, batch jobs, large refactors
* **Parallel execution** — offload work to the cloud while you keep coding locally

## From the Devin CLI

The [Devin CLI](/cli) is a local coding agent that runs in your terminal. It has a built-in [`/handoff`](/work-with-devin/devin-cli#handoff-to-cloud-devin) command — nothing to install.

```
/handoff fix the flaky integration tests in CI
```

Devin CLI packages up the conversation context and current git branch, then creates a cloud Devin session that picks up where you left off. Track the session's progress from your terminal or in the [Devin web app](https://app.devin.ai).

<Tip>
  Run `/handoff` without a task description and the cloud session continues from where you left off automatically.
</Tip>

## From other coding agents

[Devin Handoff](https://github.com/club-cog/devin-handoff) is an open-source plugin and skill that brings the same handoff workflow to any coding agent — Claude Code, Codex, Cursor, and more. Install it once, then just say *"hand this off to Devin"* and your agent gathers the current repo, branch, and uncommitted changes, creates a session, and hands you back a URL.

You'll need a Devin API key — generate one on the [API keys page](https://app.devin.ai/settings/api-keys) and export it as `DEVIN_API_KEY`. For install and usage instructions across every agent, follow the [repository README](https://github.com/club-cog/devin-handoff), which stays current as the plugin evolves.

### How context reaches the cloud session

A cloud session starts in a fresh VM, so the skill packages up what your local agent already knows and includes it in the session prompt:

* **Repo and branch** — detected from `git remote` and `git rev-parse`, so Devin clones the right repo and checks out the branch you're on.
* **Uncommitted changes** — the output of `git diff HEAD` (truncated to 100KB) is included, so your work-in-progress carries over. If you have local edits you don't want sent, commit or stash them first.
* **Extra context** — whatever the calling agent has learned so far: files it examined, root-cause hypotheses, partial fixes.

## Related resources

<CardGroup cols={2}>
  <Card title="Devin CLI" icon="terminal" href="/cli">
    The local coding agent with the built-in `/handoff` command
  </Card>

  <Card title="Devin Handoff on GitHub" icon="github" href="https://github.com/club-cog/devin-handoff">
    Source, install guides, and the full script reference
  </Card>

  <Card title="Devin API" icon="code" href="/api-reference/overview">
    The Sessions API that powers the handoff
  </Card>

  <Card title="Devin MCP" icon="plug" href="/work-with-devin/devin-mcp">
    Manage sessions, playbooks, and knowledge from any MCP client
  </Card>
</CardGroup>
