> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Security Swarm

> Find, triage, and remediate security vulnerabilities across your repositories

Security Swarm is Devin's security scanning and remediation product. It builds a threat model tailored to your code, investigates and validates potential vulnerabilities, and helps you fix findings through pull requests. It can identify vulnerabilities like remote code execution (RCE), SQL injection, path traversal, server-side request forgery (SSRF), authorization bypasses, memory-safety bugs, denial-of-service vulnerabilities, and more. It can even identify chained exploits spanning multiple files.

Security Swarm is a custom orchestration of Devins we are calling [Agentic MapReduce](https://devin.ai/blog/agentic-map-reduce). It divides your repo among parallel Devins, providing broad coverage and deep investigation while bounding cost, making it cost-effective to scan large codebases. We also [benchmarked Security Swarm](https://devin.ai/blog/security-swarm-eval) against a ground-truth set of published vulnerabilities from the GitHub Advisory Database.

<Accordion title="Prerequisites">
  To run a scan:

  * Your organization must have access to the repository you want to scan.
  * You need to be authorized to use Devin sessions.
  * You need the **Use code scans** permission.
  * To configure an Auto Scan schedule, you also need **Manage code scans** and permission to manage automations.

  If you do not see **Security** in the sidebar or cannot start a scan, ask an administrator to review your role. See [Access and permissions](#access-and-permissions) for details.
</Accordion>

## Run your first scan

1. Open **Security** in the left sidebar and click **Start scan**.
2. Under **Single repo**, choose a repository to scan.
3. Make sure **Interactive mode** is enabled.
4. Click **Run Scan**.
5. When the proposed [threat model](#interactive-mode) is ready, review it and either click **Looks good, start scanning** or provide feedback.
6. As findings appear, review the evidence and [act on the findings](#act-on-a-finding) that need attention.

<video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/cognitionai/U_A1KOkv4qhKbspx/images/work-with-devin/security-swarm/sec-first-scan.mp4?fit=max&auto=format&n=U_A1KOkv4qhKbspx&q=85&s=aa95cbde2c0e4f2a2cedbc451d3ebbe4" data-path="images/work-with-devin/security-swarm/sec-first-scan.mp4" />

<Tip>For repeatable scans, create a profile that captures your scope, threat model, severity criteria, validation steps, and remediation constraints.</Tip>

## Review and act on findings

Open a scan to see its findings. The page displays a list of findings on the left, grouped by severity, and the selected finding's details on the right.

The status tabs show a live count:

* **Open** — needs attention.
* **Reviewed** — has been reviewed and no longer requires action.
* **Dismissed** — was determined as a false positive or duplicate.

While a scan is running, the page updates automatically as findings arrive.

<Warning>**Reviewed** is a workflow status, not confirmation that a fix was merged. A finding can be marked Reviewed manually or when a later scan determines that it is no longer present.</Warning>

### What's in a finding

A finding includes:

* **Severity, status, exploitability, confidence, and category**.
* The affected **file path and code snippets**.
* A **description** of the issue and a **remediation recommendation**.
* A **runtime validation result**, supporting evidence, and validation artifacts.
* Associated **pull requests** and their open, merged, or closed state.
* **Code owners** and notes, when available.

<Tip>Treat a risky code pattern as a lead, not proof of a vulnerability. Check that the finding traces a reachable path from attacker-controlled input, accounts for validation and authorization controls, and explains a concrete security impact.</Tip>

<video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/cognitionai/U_A1KOkv4qhKbspx/images/work-with-devin/security-swarm/finding.mp4?fit=max&auto=format&n=U_A1KOkv4qhKbspx&q=85&s=9d5b6ed3cf8d9e3d79d5e35c98fd4bcb" data-path="images/work-with-devin/security-swarm/finding.mp4" />

### Act on a finding

<Tabs>
  <Tab title="Assign to Devin">
    Starts a Devin session to remediate the issue and open a pull request. The session and resulting pull request are tracked on the finding.

    <video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/cognitionai/U_A1KOkv4qhKbspx/images/work-with-devin/security-swarm/assign.mp4?fit=max&auto=format&n=U_A1KOkv4qhKbspx&q=85&s=3c37a01979322039c16867599f3b8226" data-path="images/work-with-devin/security-swarm/assign.mp4" />
  </Tab>

  <Tab title="Feedback">
    Sends context to a feedback session that refines the scan profile for future scans. For example, explain that a reported data flow is protected by an internal gateway so future scans can account for that control.

    <video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/cognitionai/U_A1KOkv4qhKbspx/images/work-with-devin/security-swarm/feedback.mp4?fit=max&auto=format&n=U_A1KOkv4qhKbspx&q=85&s=86a64989d96e51d70697179e7048ffce" data-path="images/work-with-devin/security-swarm/feedback.mp4" />
  </Tab>

  <Tab title="Adjust">
    Overrides the finding's severity, with optional context for Devin. For example, lower the severity when exploitation requires privileged internal access, and include that constraint as context.

    <video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/cognitionai/U_A1KOkv4qhKbspx/images/work-with-devin/security-swarm/adjust.mp4?fit=max&auto=format&n=U_A1KOkv4qhKbspx&q=85&s=a1251a7b14f850457de066a44260844e" data-path="images/work-with-devin/security-swarm/adjust.mp4" />
  </Tab>

  <Tab title="Status menu">
    Marks the finding as Open, Reviewed, or Dismissed. Keep a finding Open while it needs action, mark it Reviewed after triage, or dismiss it when it is a false positive or duplicate.

    <video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/cognitionai/U_A1KOkv4qhKbspx/images/work-with-devin/security-swarm/status.mp4?fit=max&auto=format&n=U_A1KOkv4qhKbspx&q=85&s=15f941bb61ffbbe793a143f1e7b1c1cb" data-path="images/work-with-devin/security-swarm/status.mp4" />
  </Tab>
</Tabs>

## Scan profiles

A scan profile controls the scan's scope and provides guidance for each stage of the scan. Every scan can use one profile. To evaluate a repository against multiple attacker personas or threat categories, run separate scans with different profiles.

<Tip>A specific threat model is one of the most effective ways to keep coverage consistent across scans. Define the attacker, sensitive assets, trust boundaries, important entry points, and explicit exclusions.</Tip>

Manage profiles from the **Profiles** tab on the Security page.

### Create a profile

You can create a profile in two ways:

* **Generate with Devin** — describe the application, threats, scope, exclusions, and severity standards in natural language. Devin drafts the profile for you.
* **Create manually** — fill in each profile input yourself.

Generating with Devin is a useful starting point, but review every generated field before using the profile. Leaving an optional guidance field blank applies Security Swarm's built-in behavior for that stage.

### Basic information

* **Profile name** — name the application surface or threat category, rather than the team running the scan. Example: `Multi-tenant API authorization`.
* **Description** — summarize the profile's scope and security objective. Example: `Find authentication, authorization, and tenant-isolation vulnerabilities in the public API.`

The examples below combine into a single profile for a multi-tenant API. Adapt the boundaries, commands, and severity standards to your application.

### Threat model

Describe the attacker, sensitive assets, trust boundaries, important entry points, and anything explicitly out of scope. This guidance shapes the rules Devin generates before investigation begins.

```text theme={null}
Assume an unauthenticated internet attacker or an authenticated user in one tenant.
Focus on public HTTP handlers, OAuth callbacks, API tokens, administrative actions,
and accesses to tenant-owned data. Treat internal development scripts and local-only
tools as out of scope. Prioritize authentication bypasses, cross-tenant access, token
leakage, injection, and SSRF.
```

### Investigation guidance

Define how Devin should investigate a potential issue and what evidence it should collect. Ask it to account for existing mitigations and to distinguish reachable vulnerabilities from theoretical concerns.

```text theme={null}
Trace untrusted input from the route through middleware and service layers to the
sensitive operation. Check authentication, authorization, tenant scoping, validation,
and escaping at every boundary. Identify the exact reachable path and cite the relevant
files and lines. Do not report a theoretical issue when an effective mitigation blocks
the path.
```

### Triage guidance

Define how Devin should deduplicate and prioritize findings. Include your severity criteria so results match your organization's standards.

```text theme={null}
Group findings that share the same root cause. Treat unauthenticated remote code
execution and cross-tenant write access as critical. Treat cross-tenant read access and
credential disclosure as high. Treat single-user availability issues as medium unless
they can affect shared infrastructure. Label defense-in-depth recommendations as low.
```

### Runtime validation

Enable runtime validation when Devin can safely build and exercise the application. Explain how to start the application, create test data, authenticate, and demonstrate the expected security boundary.

```text theme={null}
Use the repository's documented development setup. Start the API and create two
non-production tenants with one test user in each. Attempt the suspected request as a
user from the other tenant, then verify both the HTTP response and persisted data.
Do not call production services or modify production data.
```

<Tip>An unsuccessful validation does not always disprove a finding. Review the validation result and artifacts to determine whether an effective mitigation blocked the exploit or the configured environment prevented Devin from completing the test.</Tip>

Runtime validation starts a separate Devin session for each finding. See [Configure runtime validation](#configure-runtime-validation) for environment guidance.

### Report

Enable reports when you need a summary artifact after the scan. Specify the intended audience and the information the report should emphasize.

```text theme={null}
Write an executive summary for security and engineering leads. List confirmed critical
and high findings first, followed by unvalidated findings. Include affected components,
validation status, pull request status, and a prioritized remediation plan.
```

### Remediation guidance

Specify constraints that Devin should follow when you assign a finding for remediation. Include testing expectations, compatibility requirements, and practices to avoid.

```text theme={null}
Prefer the smallest safe change and preserve existing public API behavior. Add a
regression test that fails before the fix and passes afterward. Run the affected package's
lint and test commands. Avoid major dependency upgrades unless the vulnerability cannot
be fixed safely without one.
```

### Advanced inputs

Open **Advanced** to control file scope and investigation batches:

* **Include globs** — restrict the scan to matching files. For example, `apps/api/**` and `packages/auth/**`.
* **Exclude globs** — remove irrelevant files from the selected scope. For example, `**/generated/**`, `**/vendor/**`, and `**/fixtures/**`.
* **Batch size** — control how many files with signals are grouped into each investigation batch. Leave this at its default unless you are deliberately tuning scan behavior. The accepted range is 1–500; the default is 5.

<Warning>Overly broad exclusions can hide vulnerable code or remove context needed to understand a data flow. Exclude only files you are confident are irrelevant to the profile.</Warning>

### Organization and enterprise profiles

New profiles are organization-scoped. Enterprise admins can later change a profile's visibility to **Enterprise**, making it available across the enterprise.

Enterprise profiles can only be edited or archived by enterprise admins. Other users with access to Security can view and use them but cannot modify them.

### Interactive mode

With **Interactive mode** enabled, Devin builds a proposed threat model and pauses before investigation. The scan page displays the proposed rules and lets you:

* **Looks good, start scanning** — accept the threat model and begin investigation.
* **Provide feedback on the threat model** — describe what to add, remove, or emphasize, then review the revised model.

Use interactive mode for the first scan of a repository and whenever its risk surface or profile changes significantly. Once the profile captures the approved guidance, routine scans can run without the pause.

### Configure runtime validation

Runtime validation runs only when the selected profile has runtime validation enabled and contains validation guidance. Give Devin enough information to build, run, seed, and authenticate the application in its sandbox.

If the repository has [declarative configuration](/onboard-devin/environment/blueprints), Devin can reuse its build and installation setup. Otherwise, add the required setup commands to the profile's validation guidance.

<Warning>Do not put production credentials or secret values directly in profile guidance. Use non-production test accounts and credentials already provided through your organization's environment configuration.</Warning>

## Scale scanning

### Scan multiple repositories

Use the **All repos** tab in the New Scan dialog to queue scans across an organization:

1. Optionally enter a **Repository name filter**.
2. Optionally select a scan profile.
3. Keep **Skip already-scanned repos** enabled to exclude repositories already scanned with the selected profile.
4. Click **Preview**.
5. Review the matching repositories, deselect any you do not want to scan, and confirm.

The preview is a dry run. Changing the filter, profile, or skip setting invalidates the preview so you cannot confirm a stale list.

### Auto Scan

Auto Scan periodically scans commits added since the last completed scan. You can configure it:

* While starting a single-repository scan by selecting a daily, weekly, monthly, or custom schedule.
* From an existing scan by adding, editing, disabling, or immediately running its schedule.

Schedule times are shown in your local timezone.

<Note>Auto Scan is only available when [automations](/product-guides/automations) are enabled for your organization. Configuring it requires both **Manage code scans** and permission to manage automations.</Note>

<Note>Auto Scans are incremental: each run only investigates the commits added since the last completed scan. Clicking **Start scan** instead defaults to a full scan of the repository scope.</Note>

### Scan new commits

Click **Scan new commits** on a completed scan to investigate commits added since its last scanned commit. Auto Scan uses the same incremental behavior, making subsequent scans less expensive than repeatedly scanning the full repository scope.

## Manage and monitor scans

Depending on the scan and its profile, the scan header can include:

* **Reports** — download reports generated for the scan.
* **Usage** — view ACUs consumed, session count, scan duration, and pull request statistics.
* **Session** — open the main Devin session that performed the scan.
* **Export as CSV** — export the scan's findings.
* **Archive** or **Unarchive** — hide the scan from or restore it to the default list.
* **Scan new commits** — start an incremental scan.

Scans run as Devin sessions and consume [ACUs](/admin/billing/usage).

### Security dashboard

After the organization completes its first scan, the Security page displays an organization-wide dashboard for the last 7, 30, or 90 days:

* **Pull request statistics** — created, merged, open, and closed pull requests, plus merge rate.
* **Findings over time** — findings grouped by severity across the selected period.

## Access and permissions

Security access is controlled through code scan permissions in the role editor:

| Permission                    | What it unlocks                                                                                                                             | Default roles    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **View code scans**           | View scans, profiles, findings, and associated scan sessions.                                                                               | Admin            |
| **Use code scans**            | Start scans, create organization profiles, submit finding feedback, adjust findings, change finding statuses, and assign findings to Devin. | Admin            |
| **Manage code scans**         | Archive or unarchive scans and configure Auto Scan schedules.                                                                               | Admin            |
| **Manage account code scans** | Promote organization profiles to enterprise scope and edit or archive enterprise profiles.                                                  | Enterprise admin |

Starting scans, submitting feedback, and assigning findings to Devin also require permission to use Devin sessions. Auto Scan additionally requires permission to manage automations.

By default, members do not receive code scan permissions. Owners have every permission, and administrators can grant permissions to members through [custom roles](/enterprise/security-access/custom-roles).

## Compare Security Swarm with another scanner

For a useful comparison, give both scanners the same scope, threat model, severity criteria, and validation expectations. Differences in configuration can otherwise obscure differences in underlying capability.

Use profiles to encode the comparison criteria, interactive mode to confirm the generated threat model, and runtime validation to apply the same standard of evidence to reported findings.

## FAQ

<AccordionGroup>
  <Accordion title="How does Security Swarm reduce false positives?">
    Security Swarm investigates potential vulnerabilities in the context of your repository rather than reporting risky patterns in isolation. Devin traces relevant data flows, checks for validation and authorization controls, and evaluates whether the issue has a concrete security impact.

    Each finding includes a confidence level and supporting evidence. Review that evidence before acting, especially when a finding has not been validated at runtime.
  </Accordion>

  <Accordion title="What evidence should I review in a finding?">
    Check the affected code, entry point, data flow, existing mitigations, stated impact, confidence, and exploitability. When runtime validation is enabled, also review the validation result and its supporting artifacts.

    If the evidence overlooks a control or claims an unsupported impact, use [Feedback](#act-on-a-finding) to provide the missing context for future scans.
  </Accordion>

  <Accordion title="What does runtime validation add?">
    Runtime validation attempts to reproduce a finding by building and exercising the application in an isolated environment. A successful validation provides stronger evidence of exploitability, while an unsuccessful validation can identify assumptions or environment limitations that require further review.

    Runtime validation is optional and requires enough [validation guidance](#configure-runtime-validation) for Devin to build, run, seed, and authenticate the application safely.
  </Accordion>

  <Accordion title="How does Security Swarm find vulnerabilities that span multiple files?">
    Security Swarm analyzes parts of the repository in parallel and combines the results into a repository-wide view. This allows it to identify relationships between components, such as one endpoint exposing an identifier required to exploit another endpoint.

    Any resulting chained finding should still identify the relevant code paths and explain how the individual conditions combine into a concrete impact.
  </Accordion>

  <Accordion title="Why might results vary between scans?">
    Security Swarm uses agentic analysis, so separate scans may not produce identical findings or wording. A focused scope, explicit threat model, clear severity criteria, and specific investigation guidance help keep coverage consistent.

    Capture those requirements in a reusable [scan profile](#scan-profiles), use [interactive mode](#interactive-mode) to review the proposed threat model, and provide feedback when a result misses important context.
  </Accordion>

  <Accordion title="Does a completed scan mean the repository has no other vulnerabilities?">
    No security scanner can guarantee complete coverage. Results depend on the selected scope, profile guidance, available repository context, and whether findings can be validated in the configured environment.

    Run separate scans for distinct attacker models or threat categories, keep profiles current as the application changes, and use Security Swarm alongside your existing security review and testing practices.
  </Accordion>
</AccordionGroup>
