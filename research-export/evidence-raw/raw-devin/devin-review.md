> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Devin Review

> A new way to quickly review and understand complex PRs.

As coding agents become more prevalent, the bottleneck shifts from writing code to reviewing it.
Devin Review is a full-service code review platform within the Devin webapp that turns large, complex PRs into intuitively organized diffs and precise explanations. It supports GitHub (including GitHub Enterprise Server and Enterprise Cloud) and GitLab (including Self-Managed GitLab).

<Tip>
  Devin Review is available for PRs on GitHub repositories
  (including GitHub Enterprise Server and Enterprise Cloud)
  and merge requests on GitLab repositories (including Self-Managed GitLab).
  Public PRs don't require a Devin account. Private PRs
  can be viewed with a Devin account or via the [CLI](#cli).
</Tip>

## Features

<CardGroup cols={2}>
  <Card title="Smart diff organization" icon="layer-group">
    Groups changes logically, putting related edits together instead of
    alphabetical order.
  </Card>

  <Card title="Copy and move detection" icon="arrows-up-down">
    Detects when code has been copied or moved and displays changes cleanly,
    instead of full deletes and inserts.
  </Card>

  <Card title="Bug catcher" icon="bug">
    Checks for bugs and labels them by confidence level. Severe bugs require
    immediate attention.
  </Card>

  <Card title="Security scanning" icon="shield-check">
    Detects security vulnerabilities and suggests hardening improvements,
    with CWE classification and severity levels.
  </Card>

  <Card title="GitHub compatibility" icon="github">
    Leave comments, approve PRs, request changes—all within Devin Review, synced
    to GitHub.
  </Card>

  <Card title="Codebase-aware chat" icon="comments">
    Ask questions about the PR and get answers with relevant context from the
    rest of the codebase. You can also ask Devin directly from any comment,
    bug, or flag in the diff view.
  </Card>

  <Card title="PR workflow actions" icon="code-merge">
    Merge, close, convert to draft, mark ready for review, and toggle auto-merge
    directly from Devin Review without leaving the page.
  </Card>

  <Card title="Code changes from chat" icon="pen-to-square">
    Ask the chat agent to make code edits. Review the suggested changes, then
    apply them as a commit to the PR branch without leaving Devin Review.
  </Card>
</CardGroup>

## Getting Started

* **Devin webapp** — Head to [app.devin.ai/review](https://app.devin.ai/review) to see your open PRs organized by category (assigned to you, authored by you, review requested). When Devin makes PRs, you'll see an orange "Review" button in the chat.
* **PR comment** — Comment `/devin review` on any GitHub PR in a repository your organization has connected, and Devin reviews it on the spot. See [Triggering a Review from a PR Comment](#triggering-a-review-from-a-pr-comment).
* **URL shortcut** — For any GitHub.com PR link, replace `github.com` with `devinreview.com` in the URL. For private PRs, sign in to Devin first or use the CLI.
* **GitHub Enterprise** — Paste the full PR URL into the Devin Review page at [app.devin.ai/review](https://app.devin.ai/review). All GitHub offerings (GitHub.com, Enterprise Server, Enterprise Cloud) have the same capabilities.
* **CLI** — Run `npx devin-review {pr-url}` from within a local clone. See [CLI](#cli) below for details.

## Supported Git Providers

| Capability                    | GitHub | GitLab  | Bitbucket | Azure DevOps |
| ----------------------------- | ------ | ------- | --------- | ------------ |
| View diffs and analysis       | Yes    | Yes     | No        | No           |
| Bug catcher                   | Yes    | Yes     | No        | No           |
| Codebase-aware chat           | Yes    | Yes     | No        | No           |
| Code changes from chat        | Yes    | Yes     | No        | No           |
| Comments and reviews          | Yes    | Yes     | No        | No           |
| Merge / close / draft actions | Yes    | Partial | No        | No           |
| Auto-merge                    | Yes    | Partial | No        | No           |
| Auto-review                   | Yes    | Yes     | No        | No           |

**GitHub** includes GitHub.com, GitHub Enterprise Server, and GitHub Enterprise Cloud — all have the same capabilities. Write features (comments, reviews, merge actions, code changes from chat) require a [GitHub App](/integrations/gh) connection installed on your GitHub organization. PAT-based connections are read-only and cannot post comments, submit reviews, or perform merge actions. To set up the GitHub App, see the [GitHub integration guide](/integrations/gh).

**GitLab** includes GitLab.com and Self-Managed GitLab. Write features for Self-Managed GitLab (comments, reviews, merge actions, code changes from chat) require a GitLab App connection. To set up the GitLab App, see the [GitLab Self-Managed integration guide](/enterprise/integrations/gitlab-self-managed).

## Permissions

Devin Review access is controlled by account-level permissions configured in the role editor under **Devin Review permissions**. By default, all members and admins receive full auto-review access, and admins additionally receive **Manage Devin Review**.

Enterprise admins can use [Custom Roles](/enterprise/security-access/custom-roles#account-level-roles-enterprise-roles) to restrict access to a lower usage tier (manual-only or on-PR-creation only), remove access entirely, or grant admin capabilities. Self-enrollment for auto-review does not require **Manage Devin Review** — any user with a usage tier and a connected GitHub account can enroll themselves.

See [Account-level roles](/enterprise/security-access/custom-roles#account-level-roles-enterprise-roles) for the full list of Devin Review permission tiers and what each one grants.

<Note>
  **Enterprise accounts:** Only users in the primary organization with **Manage Devin Review** can manage review settings. Users in non-primary organizations can self-enroll but cannot change admin settings.
</Note>

## Governance

Enterprise admins can control who uses Devin Review, what level of automation they have, and how much it costs — all from the Devin webapp.

<Note>
  The features in this section require a **Devin Enterprise** account. For
  details on enterprise plans, [contact sales](https://cognition.com/contact).
</Note>

### Cost control

Devin Review consumes [ACUs](/admin/billing/usage) (Agent Compute Units) from your enterprise's ACU pool, the same pool used by Devin sessions and other Devin products. Enterprise admins have several tools to monitor and control review costs.

#### Consumption dashboard

The enterprise consumption dashboard at [Settings > Consumption](https://app.devin.ai/settings/consumption) breaks down ACU usage by product, including a dedicated **Review** line in the daily consumption chart. Organization admins can view their org's review consumption from [Settings > Consumption Analytics](https://app.devin.ai/settings/analytics?tab=consumption).

The dashboard includes:

* **Per-user breakdown** — See how many review ACUs each user consumed in the current and previous billing cycle.
* **Per-repository breakdown** — See review ACU consumption, review count, and the number of bugs caught by repository for the current and previous billing cycle, helping identify which repos drive the most review cost and where reviews catch the most issues.

<Note>
  **Devin Review ACUs do not count against per-organization ACU limits.** Per-org ACU limits configured in [Settings > Organizations](https://app.devin.ai/settings/organizations) apply to Devin sessions only — Review consumption is tracked at the enterprise level and is not capped by org limits. Reviews continue to run even after an organization reaches its session ACU limit.
</Note>

#### Review size indicator

Each PR in Devin Review displays a consumption pill showing the review's t-shirt size based on total ACU usage across all review jobs on that PR:

| Size   | ACU range       |
| ------ | --------------- |
| **XS** | ≤ 2.25 ACUs     |
| **S**  | 2.25 – 4.5 ACUs |
| **M**  | 4.5 – 9 ACUs    |
| **L**  | 9 – 18 ACUs     |
| **XL** | > 18 ACUs       |

Hover over the size pill to see the exact ACU total, the number of review jobs run, and the cost of the currently viewed review. This helps reviewers understand the cost impact of re-running reviews or enabling auto-review on high-churn PRs.

#### Per-PR auto-review spend limit

Admins can cap how much Devin Review spends on automatic reviews of a single PR from [Settings > Review](https://app.devin.ai/settings/review) under the **Auto-review limits** section. The limit is measured in ACUs on Enterprise plans, or in dollars of on-demand spend for Individual and Teams plans. Leave the field empty for no limit (the default).

Once a PR's total review spend across all of its review jobs reaches the limit, auto-review is turned off for that PR and future auto-reviews are skipped. Reaching the limit is a soft block:

* **Manual reviews still work** — the limit only pauses automatic reviews. You can always trigger a review yourself from the PR review page.
* **Re-enable per PR** — Turning auto-review back on for the PR from the actions menu (three dots in the header) resumes auto-reviews and exempts that PR from the limit.

When a limit is configured, the consumption pill's hover card shows the limit alongside the PR's usage and indicates when the limit has been reached. If [PR description updates](#admin-configuration) are enabled, the Devin Review status row in the PR description also notes when auto-review was paused by the spend limit, with a link to re-enable it.

## PR Workflow Actions

Devin Review lets you take action on PRs directly from the review page, without switching to GitHub.

* **Merge** — Merge the PR using the repository's configured merge strategy (merge commit, squash, or rebase). The merge button reflects the PR's current mergeability status and required checks.
* **Close** — Close the PR without merging. Available from the dropdown menu next to the merge button.
* **Convert to draft** — Convert an open PR to draft status. Available from the dropdown menu when the PR is open and not already a draft.
* **Mark ready for review** — Mark a draft PR as ready for review. A "Ready for review" button appears in the merge bar for draft PRs.
* **Auto-merge** — Enable or disable GitHub auto-merge from the merge button dropdown. When enabled, the PR will merge automatically once all required checks pass. The merge bar shows the current auto-merge status, including who enabled it.

All workflow actions require a [GitHub App](/integrations/gh) connection and are disabled when viewing in read-only mode (e.g., public repos without a connected account, or PAT-based connections).

## Stacked PRs

Devin Review treats [stacked PRs](/work-with-devin/stacked-prs) as first-class. When a PR belongs to a stack, the review page shows the whole series and handles merging correctly:

* **Stack panel** — The PR header shows the stack with every member ordered bottom-to-top, down to the base branch it merges into. Each member links to its own review page, so you can read the stack layer by layer.
* **Per-layer readiness** — Each member shows a status dot reflecting its true mergeability: green when it can actually merge (accounting for CI, required reviews, and branch protection), red for failing checks or conflicts, and orange for anything else blocking the merge — including when a layer is individually ready but blocked by an unmergeable PR below it. An aggregate indicator summarizes the whole stack.
* **Focused diffs** — Each PR in a stack is diffed against the layer below it, so every review — including [auto-review](#auto-review) and the [bug catcher](#bug-catcher) — sees only that layer's change.
* **Stack merge** — Stacked PRs merge through GitHub's atomic stack merge: merging a PR also merges every open PR below it in the stack, bottom-up, in a single operation. The merge button shows exactly how many PRs the action will land, and GitHub retargets the remaining PRs onto the base branch afterwards.

Stacked PRs are available for GitHub.com repositories only. See the [Stacked PRs guide](/work-with-devin/stacked-prs) for how Devin creates and maintains stacks.

## Auto-Review

Devin can automatically review PRs without you having to manually trigger it. Configure auto-review in [Settings > Review](https://app.devin.ai/settings/review). On any PR review page, the actions menu (three dots in the header) lets you toggle auto-review for that specific PR and links to the review settings pages.

### When Does Auto-Review Run?

Auto-review triggers when:

* A PR is opened (non-draft)
* New commits are pushed to a PR
* A draft PR is marked as ready for review

Draft PRs are skipped until marked ready.

### Trigger Modes

Repositories and individual users can each be configured with a trigger mode that controls when auto-review runs:

* **Auto review** (default) — Reviews trigger on all events: PR opened, new commits pushed, and draft marked ready.
* **On PR creation** — Reviews only trigger when a PR is first opened or a draft PR is marked as ready for review. Subsequent pushes to the PR do not trigger a new review.
* **Manual** — No reviews run automatically. You trigger a review yourself from the PR review page whenever you want one. This is the base tier for personal enrollment.

Repository trigger modes are limited to **Auto review** and **On PR creation**. Personal enrollment additionally supports **Manual** for users who only want to trigger reviews on demand.

When a PR matches both an enrolled repository and an enrolled user, the most permissive trigger mode applies.

Admins can set the trigger mode per repository from [Settings > Review](https://app.devin.ai/settings/review), and each user can set their personal trigger mode from [Settings > Preferences](https://app.devin.ai/settings/preferences).

### Self-Enrollment (All Users)

Any user with a connected GitHub account can enroll themselves for auto-reviews—no admin permissions needed.

1. Go to [Settings > Preferences](https://app.devin.ai/settings/preferences)
2. Under **Devin Review**, set your **Review trigger** to **On PR creation** or **Auto-review** (leave it on **Manual** if you only want to trigger reviews yourself)

Once enrolled with **Auto-review**, Devin will automatically review any PR you author, on any repository. With **On PR creation**, Devin reviews only when the PR is first opened or marked ready for review.

You can also turn auto-review on or off for a specific PR from the actions menu (three dots in the header) on its review page, which also links to your personal review settings.

### Review Comment Language

You can choose the language Devin Review uses for its comments and analysis from [Settings > Preferences](https://app.devin.ai/settings/preferences) under the **Devin Review** section.

* **Use your display language** (default) — Review comments follow your display language setting.
* **Specific language** — Choose from English, Spanish, Portuguese, Japanese, Chinese, Korean, French, German, Russian, Arabic, Hebrew, or Indonesian.

Language instructions in your [REVIEW.md](#reviewmd) take precedence over this setting. If your `REVIEW.md` specifies a language for review comments, Devin will use that language regardless of your personal preference.

### Admin Configuration

Admins have additional options in [Settings > Review](https://app.devin.ai/settings/review):

* **Repositories** — Add repositories to auto-review ALL PRs on that repo. Use the **Add repo** button to search and select from connected repositories, and set each repository's trigger mode from the list.
* **Users** — View all enrolled users across the organization along with each user's trigger mode. Users enroll themselves through [self-enrollment](#self-enrollment-all-users); admins cannot enroll other users directly.
* **Add "Devin Review" link in PR description** — When enabled (default), Devin adds a link to the review in the PR description.

### Posting to GitHub

Admins can configure what Devin Review posts back to GitHub from [Settings > Review](https://app.devin.ai/settings/review) under the **Post as PR comments** section:

* **Post GitHub CI checks** — When enabled (default), Devin creates a commit status check on the PR for each review. This lets you see review results directly in your PR's checks list.
* **Bugs** — Post bugs (likely errors or incorrect behavior) as PR comments.
* **Security** — Post security vulnerabilities and hardening suggestions as PR comments. Only visible when [security scanning](#security) is enabled.
* **Flags (investigate)** — Post investigate flags (potential issues worth a closer look) as PR comments.
* **Flags (note)** — Post informational flags (observations that may not require action) as PR comments.

By default, bugs and "investigate" flags are posted as PR comments. Admins can toggle each finding type independently.

<Note>
  **Enterprise accounts:** Settings apply across all organizations in the
  enterprise. Only users in the primary organization with enterprise admin
  permissions can manage settings. Users in non-primary orgs can only
  self-enroll.
</Note>

<Note>
  Auto-review is not available for public repos that aren't connected to your
  organization.
</Note>

## Bug Catcher

The Bug Catcher automatically analyzes your PR for potential issues and displays findings in the Analysis sidebar. Findings are organized into **Bugs**, **Flags**, and **[Security](#security)**.

### Bugs

Bugs are actionable errors that should be fixed in the code. These represent issues the Bug Catcher has high confidence are actual problems.

Bugs are displayed with two severity levels:

* <Icon icon="bug" iconType="solid" color="red" /> **Severe** — High-confidence
  issues that require immediate attention
* <Icon icon="triangle-exclamation" iconType="solid" color="orange" />
  **Non-severe** — Lower severity issues that should still be reviewed

When you see a bug, you should investigate and fix it in your code.

### Flags

Flags are informational code annotations that may or may not require action. They come in two classes:

* <Icon icon="flag" iconType="solid" color="orange" /> **Investigate** — Flags that warrant further investigation. You should review the flagged code yourself and verify whether there is an actual bug or issue.

* <Icon icon="flag" iconType="solid" color="gray" /> **Informational** — The Bug
  Catcher has either concluded correctness or is explaining how something works.
  These help you understand the code changes without requiring action.

### Security

Devin Review scans for security vulnerabilities and displays them in a dedicated **Security** section of the Analysis sidebar, alongside Bugs and Flags. Security scanning is enabled by default and can be toggled from [Settings > Review](https://app.devin.ai/settings/review) under the **Security scan** section.

The scanner checks for the following vulnerability categories:

* Injection (SQL, XSS, command, template)
* Auth flaws (missing/broken access control, privilege escalation, auth bypass)
* Secrets exposure (hardcoded keys, tokens in logs, credentials in source)
* SSRF and path traversal
* Insecure deserialization, prototype pollution
* Missing input validation on untrusted data
* Weak cryptography (algorithms, key management)
* Transport/cookie security (missing HTTPS enforcement, permissive CORS, insecure cookie flags)
* Insecure defaults or misconfigurations introduced by the PR

Findings are displayed with two severity levels:

* <Icon icon="shield" iconType="solid" color="red" /> **Critical** — High-confidence
  vulnerabilities that should be fixed before merging
* <Icon icon="shield" iconType="solid" color="orange" /> **Warning** — Potential
  security weaknesses worth investigating

Each finding includes a description of the issue, a recommendation for how to fix it, and where applicable a [CWE](https://cwe.mitre.org/) identifier classifying the vulnerability type.

The security scan also respects any security-related instructions in your [instruction files](#agentsmd-instruction-files) — for example, you can add security policies, sensitive areas, or threat models to your `REVIEW.md` to guide what the scanner looks for.

### Resolving Findings

You can mark bugs, flags, and security findings as resolved once you've addressed them or determined they don't require action. Resolved items are dimmed in the sidebar and sorted to the bottom of each section.

## Review Actions

### Triggering a Review from a PR Comment

You don't need to enable [auto-review](#auto-review) on a repository to get a review. Comment `/devin review` on any GitHub pull request and Devin reviews that PR, then replies on the PR with a link to the review.

This works on any repository covered by your organization's [GitHub App](/integrations/gh) installation — including repos that aren't enrolled in auto-review — and is the quickest way to try Devin Review on a one-off PR.

Requirements and behavior:

* **Comment exactly `/devin review`** at the start of the comment. The command is case-insensitive, and works in both PR conversation comments and inline review comments.
* **Write access required** — the commenter needs `write` or `admin` permission on the repository, and their GitHub account must be [linked to their Devin account](https://app.devin.ai/settings). Outside contributors can't trigger reviews.
* **Open PRs only** — comments on closed or merged PRs are ignored.
* **GitHub only** — including GitHub Enterprise Server and Enterprise Cloud. GitLab supports auto-review but not the comment trigger.

Other `/devin` comments (for example `/devin fix the failing test`) start a regular Devin session on the PR instead of a review.

### Starting a Review

When creating a new inline comment or replying to an existing thread, you can check the **Start a review** checkbox to batch your comments into a pending review instead of posting them individually. This mirrors the GitHub review workflow, letting you collect all your feedback before submitting. Once a review is in progress, subsequent comments are automatically added to it and the checkbox is hidden.

### Resolving Comments

You can resolve review threads to indicate they've been addressed. When all threads in a bot-authored review are resolved, Devin automatically minimizes that review on GitHub to keep the PR conversation clean. If a thread is later unresolved, the review is automatically unminimized.

In the diff view, you can expand or collapse individual comment threads using the caret toggle to focus on outstanding feedback.

### Code Owner Indicators

When a code owner has been requested as a reviewer, Devin Review displays a shield icon next to their name in the reviewer sidebar with a "Requested as code owner" tooltip. This makes it easy to identify which pending reviewers have code ownership over the changed files.

## Auto-Fix

Devin Review can automatically suggest and apply fixes for bugs it detects in your PRs. When Auto-Fix is enabled, Devin will propose code changes directly alongside its bug findings.

### How to Enable It

There are two ways to enable Auto-Fix:

1. **From the review sidebar** — On any Devin-authored PR, the Analysis sidebar shows an **Auto-fix** section with an **Enable auto-fix** button. Clicking it enables Auto-Fix for all Devin PRs in your organization. This requires organization admin permissions.
2. **From global Customization settings** — Go to [Settings > Customization](https://app.devin.ai/customization) > **Pull requests** > **Responding to bots**, then either:
   * Set the mode to **Selected only** and add `devin-ai-integration[bot]` to the allowlist, or
   * Set the mode to **All bots**.

When Devin Review finds bugs and Auto-Fix is enabled, it will generate suggested fixes that you can review and apply directly from the diff view.

### Permissions & Constraints

* Only organization admins can change this setting.
* If the bot mode is set to **All bots**, Auto-Fix shows as enabled and cannot be changed from the review sidebar. Use Customization settings to modify the bot mode.
* Devin Review's **No Issues Found** summary comments are always ignored. Only comments with actual findings trigger Auto-Fix.

<Note>
  If Devin Review feedback is currently ignored in your repository, you'll see a prompt in the session timeline to enable it.
</Note>

## CLI

The Devin Review CLI lets you run code reviews directly from your terminal. This is especially useful for private repositories or when you want a streamlined local workflow.

### Installation & Usage

Run the CLI from within a local clone of the repository, no authentication required:

```bash theme={null}
cd path/to/repo
npx devin-review https://github.com/owner/repo/pull/123
```

You must run this command from within the repository being reviewed.

How it works:

1. **Git-based diff extraction** — The CLI uses your local git access to fetch the PR branch and compute the diff. This means you need read access to the repository on your machine.
2. **Isolated worktree checkout** — The CLI creates a [git worktree](https://git-scm.com/docs/git-worktree) in a cached directory to check out the PR branch. This keeps your working directory untouched -- no stashing, no branch switching. The worktree is automatically cleaned up after the review completes.
3. **Diff sent to Devin servers** — The computed diff and file contents are sent to Devin's servers for analysis.

### Privacy & Access Control

The CLI uses a **localhost server** to authenticate your review session:

* **Local-only access by default** — When you run `devin-review`, it starts a localhost server on your machine that serves a secure token. Only processes on your local machine can access this token, meaning **only you can view the review page** while logged out.
* **Transfer to your Devin account** — If you log in to a Devin account that has access to the GitHub organization, the review session is transferred to your account. This lets you access the review from other devices and share it with teammates.

When you run the CLI, `devin-review` can execute commands locally on your machine to gather additional context for finding bugs. This enables deeper analysis than diff-only review.

The Bug Catcher can execute a limited set of **read-only** operations scoped to the worktree directory:

* **File reading** — Read file contents within the repository
* **Search** — Grep for patterns and glob for file names
* **Bash commands** — Only read-only commands like `ls`, `cat`, `pwd`, `file`, `head`, `tail`, `wc`, `find`, `tree`, `stat`, and `du`

## Commit & Comment Attribution

* Bug findings, flags, and automated annotations always appear as the **Devin bot**.
* When a user writes a comment or review through Devin Review, it appears under the **user's** GitHub identity.
* When a user asks the chat agent to make a code change, the resulting commit is made as the **Devin bot**.
* **GitHub Suggested Changes** follow standard GitHub behavior: any reviewer (including Devin) can leave a suggested edit in a review comment. When a user clicks "Apply suggestion," the commit is authored by that user, in the same way as GitHub.
* Devin will **never** create commits or comments on behalf of a user without the user explicitly initiating the action.

## AGENTS.md / Instruction Files

Devin Review respects instruction files in your repository. If any of these files exist, they'll be used as context when analyzing your PR:

* `**/REVIEW.md`
* `**/AGENTS.md`
* `**/CLAUDE.md` (case-insensitive)
* `**/CONTRIBUTING.md` (case-insensitive)
* `.cursorrules`
* `.windsurfrules`
* `.cursor/rules`
* `*.rules`
* `*.mdc`
* `.coderabbit.yaml` / `.coderabbit.yml`
* `greptile.json`

Files inside agent-like subdirectories (`.agents/`, `.devin/`, `.cursor/`, `.github/`) are treated as belonging to the parent directory for scoping purposes. For example, `src/.agents/REVIEW.md` applies to files under `src/`.

These files can contain coding standards, project conventions, or other guidelines that help provide more relevant feedback.

### Custom Review Rules

You can configure additional files to be ingested as review context from [Settings > Review](https://app.devin.ai/settings/review) under the **Review Rules** section. This lets you add custom file glob patterns beyond the defaults listed above.

To add a custom rule:

1. Go to [Settings > Review](https://app.devin.ai/settings/review)
2. Under **Review Rules**, type a file glob pattern (e.g. `docs/**/*.md`)
3. Click **Add**

Custom rules appear in the list alongside the default `**/REVIEW.md` rule. You can remove any custom rule by clicking the trash icon next to it.

This is useful when your project has review-relevant documentation in non-standard locations, such as architecture decision records, style guides, or team-specific conventions stored in custom paths.

### REVIEW\.md

`REVIEW.md` is a dedicated instruction file for Devin Review. Place it anywhere in your repository to customize how Devin reviews PRs in your project. Devin automatically picks up `REVIEW.md` files at any directory level (`**/REVIEW.md`), so you can scope review guidelines to specific subdirectories if needed.

Use `REVIEW.md` to define review-specific guidelines such as:

* Areas of the codebase that need extra scrutiny
* Common pitfalls or anti-patterns to watch for
* Project-specific conventions that reviewers should enforce
* Files or directories that can be safely ignored during review
* Security or performance considerations unique to your project

**Example `REVIEW.md`:**

```markdown theme={null}
# Review Guidelines

## Critical Areas
- All changes to `src/auth/` must be reviewed for security implications.
- Database migration files should be checked for backward compatibility.

## Conventions
- API endpoints must include input validation and proper error handling.
- All public functions require TypeScript return types — do not use `any`.
- React components should use functional components with hooks, not class components.

## Ignore
- Auto-generated files in `src/generated/` do not need review.
- Lock files (package-lock.json, yarn.lock) can be skipped unless dependencies changed.

## Performance
- Flag any database queries inside loops.
- Watch for N+1 query patterns in API resolvers.
```
