> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Workspace security center

> Monitor security findings, scan coverage, scheduled scans, secrets, and dependency risks across every project in your workspace.

<head>
  <script type="application/ld+json">
    {`{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Who can access the Security center?", "acceptedAnswer": {"@type": "Answer", "text": "Workspace admins and owners on Business and Enterprise plans can access the Security center at Settings → Workspace → Security center."}}, {"@type": "Question", "name": "Does the Security center run scans automatically?", "acceptedAnswer": {"@type": "Answer", "text": "No. It displays the most recent scan results for each project. You can run a security scan for any project directly from the Security center, or run one from within the project itself. Enterprise workspaces can also schedule security scans to run automatically across selected projects. Scheduled scans consume credits, while on-demand scans remain free."}}, {"@type": "Question", "name": "What’s the difference between errors, warnings, and info?", "acceptedAnswer": {"@type": "Answer", "text": "- Errors are critical security issues that should be resolved before publishing. - Warnings are important concerns that may not be critical but should be reviewed. - Info findings provide additional context to help teams better understand their security posture."}}, {"@type": "Question", "name": "Why do some projects show as never scanned?", "acceptedAnswer": {"@type": "Answer", "text": "Projects appear as never scanned if a security scan has not yet been run for them. Run a security scan in the project to generate results."}}, {"@type": "Question", "name": "Does the Security center show historical data?", "acceptedAnswer": {"@type": "Answer", "text": "No. At the moment, the Security center shows only the latest scan results for each project."}}, {"@type": "Question", "name": "Can I export security data?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Use the Export dropdown in the top-right corner. Export is available on the Workspace insights, Code analysis, Supply chain security, and Secrets overview tabs. All exports are CSV files. Secret values are not included in any export."}}, {"@type": "Question", "name": "Can I see actual secret values in the Secrets overview?", "acceptedAnswer": {"@type": "Answer", "text": "No. The Secrets overview only shows secret names (for example, OpenAI API Key), not the secret values themselves. Secret values are not included in exports."}}, {"@type": "Question", "name": "Can I update a secret from the Security center?", "acceptedAnswer": {"@type": "Answer", "text": "Not directly. You can click through from the Secrets overview to the specific project's secrets page, where you can update or remove individual secrets."}}, {"@type": "Question", "name": "What do security findings mean on a secret row?", "acceptedAnswer": {"@type": "Answer", "text": "Security findings are tied to the project, not the individual secret. They indicate the overall security posture of the project that holds that secret."}}, {"@type": "Question", "name": "Can I run a security scan from the Security center?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You can trigger a security scan for any project directly from the Security center without having to open the project first."}}]}`}
  </script>
</head>

The **Security center** helps teams identify risks, prioritize project review, and track security coverage across every project at scale.

* **Available on:** Business and Enterprise plans
* **Access:** Workspace admins and owners
* **Location:** [Security center](https://lovable.dev/settings/security-center) (**Settings → Security → Security center**)

<Tip>
  The Security center provides a **workspace-wide view of security status across all projects**.

  * To review, fix, or update findings for an individual project, open the [Project security view](/features/security-view).
  * For an overview of Lovable’s security model and scanning approach, see the [Security overview](/features/security).
  * For practical guidance on writing secure code and avoiding common security mistakes, see [Security best practices for Lovable apps](/tips-tricks/security-best-practices).
</Tip>

## What the Security center shows

The Security center is organized into several sections, each focused on a different aspect of workspace security.

Each tab that supports export shows an **Export** dropdown in the top-right corner. The dropdown offers options to export everything or export only the current filtered view. All exports are downloaded as CSV files.

### Workspace insights

Get a portfolio-level view of every project in your workspace, combining security findings, ownership, lifecycle, cost, publish status, and activity signals into a single **review priority** for each project. On Enterprise plans, this also includes sensitive data findings (PII).

Use it to quickly answer questions like which projects are published externally, which have open security findings, which are abandoned, and which have no owner. On Enterprise plans, you can also see which projects contain personal data.

Workspace insights is available on Business and Enterprise plans. PII columns, PII quick filters, and PII scans are Enterprise-only.

See [Workspace insights](/features/workspace-insights) for more information.

### Code analysis

Review security findings from **the built-in security scans (Basic scan and Deep scan)** across all projects in your workspace. Summary cards provide an at-a-glance view of total projects, projects with findings, and scan coverage.

For each project, you see:

* **Publish status**: The project's publish status, whether it is not published, published internally to the workspace, or published externally to the public
* **Auth providers**: Which auth providers are configured on the project (Email, Phone, Google, Apple, SAML SSO)
* **Errors**: Critical security issues that require immediate attention
* **Warnings**: Important security concerns that should be reviewed
* **Info**: Informational findings that provide additional context
* **Scan status**: When projects were **last scanned**, including **live scanning indicators**
* **Last edited**: When projects were last edited
* **CSV export**: Export the projects table as a CSV file. The export includes project name, project ID, publish status, error/warning/info counts, last scan date, and last edited date.
* **Scan trigger**: Start a **Deep security scan** without opening individual projects
* **View**: Open the project's [Security view](/features/security-view)

You can search, filter, and sort projects by security status, publish status, auth providers, scan state, or name to quickly focus on what matters most.

### Supply chain security

Monitor dependency vulnerabilities across your entire workspace. Summary cards highlight vulnerability counts by severity and overall scan coverage.

* **Two views**: Review vulnerabilities **by project** or **by vulnerability**
* **Vulnerabilities by severity**: Categorized as critical, high, or medium
* **Affected projects**: Which projects use vulnerable dependencies
* **Vulnerable packages**: Package names, affected versions, and fixed versions when available
* **CSV export**: The **Export** dropdown offers multiple options depending on the active view:
  * **Export full dependency list**: Downloads a complete list of all packages across all projects (generated server-side)
  * **Export all projects** or **Export all vulnerabilities**: Downloads the full projects or vulnerabilities table
  * **Export current filter**: Downloads only the filtered results when filters are active

You can filter and search vulnerabilities by severity, publish status, CVE, package name, or vulnerability title.

### Secrets overview

View all secrets across every project in your workspace from a single table. The **Secrets overview** gives admins visibility into what secrets exist and which projects they belong to. You can group secrets **by project** or **by secret**.

For each secret, you'll see:

* **Secret name**: The name of the secret (for example, `OpenAI API Key`). Secret values are not shown.
* **Associated project**: The project the secret belongs to
* **Type**: The type of secret, whether it is user-created or Lovable-generated
* **Publish status**: The associated project's publish status, whether it is not published, published internally to the workspace, or published externally to the public
* **Creation date**: When the secret was added
* **Security findings**: Project-level security findings and severity
* **View**: Opens the project's secrets page, where you can update or remove individual secrets
* **CSV export**: The **Export** dropdown offers multiple options:
  * **Export everything**: Downloads the full secrets table across all projects
  * **Export current filter**: Downloads only the filtered results when filters are active The export includes project name, project ID, publish status, secret name, secret type, integration, creation date, and project-level security findings. Secret values are not included.

You can search by secret name across all projects, filter by publish status, secret type, and security findings. If you apply filters, the **Export current filter** option appears and includes the full filtered result set, not just the current page.

<Note>
  Security findings shown alongside secrets are tied to the **project**, not the individual secret.
</Note>

### Schedule security scans (Enterprise only)

Workspace admins and owners on Enterprise plans can schedule **Deep security scans** to run automatically across selected projects. Scheduled scans help keep projects covered without requiring admins to trigger scans manually.

Each workspace can have one scan schedule. The schedule has two configuration fields:

* **Projects**: Choose which projects are included:
  * **No projects**: Turns the scheduled security scan off
  * **Published projects**: Scans only projects that have been published internally or externally
  * **All projects**: Scans every project in the workspace
* **Cadence**: Choose how often the scheduled security scan runs:
  * **Weekly**: Runs every Monday at 08:00 in your workspace timezone
  * **Monthly**: Runs on the 1st of each month at 08:00 in your workspace timezone

Changes are saved automatically.

You can also manage and monitor the schedule with:

* **Run now**: Trigger the scheduled scan immediately, without waiting for the next scheduled run
* **Last run status**: See when the schedule last ran, whether it succeeded, and a relative timestamp

Scheduled security scans consume credits. Each project included in a scheduled scan uses **1 credit** each time the schedule runs. For example, a weekly schedule covering 10 projects will use approximately 40 credits per month.

If your workspace moves off the Enterprise plan, scheduled scans stop running and stop using credits. Your schedule is kept, so scans resume if you upgrade back to Enterprise.

For details on how the **Deep scan** works, see [Security overview](/features/security).

## Why use the Security center

The Security center helps teams stay on top of security issues by making risks visible, comparable, and actionable across projects.

* **Centralized oversight**\
  Review security findings across your entire workspace without opening projects individually.
* **Portfolio-level prioritization**\
  Use [Workspace insights](/features/workspace-insights) to combine security findings, ownership, lifecycle, and activity into a single review priority per project, so externally published apps, abandoned projects, and projects with no owner surface first. On Enterprise plans, this also includes PII signals, so externally published apps with personal data surface too.
* **Clear prioritization**\
  Focus on projects with critical errors, high-severity vulnerabilities, or outdated scans.
* **Visibility into scan coverage**\
  See which projects are up to date and which may need security reviews.
* **Dependency risk awareness**\
  Understand how vulnerable dependencies affect multiple projects and coordinate updates efficiently.
* **Secrets visibility**\
  See every secret across your workspace in one place, identify stale credentials, and manage secrets from a centralized view.

## Running security scans

In addition to viewing results, you can trigger security scans from the Code analysis tab without opening individual projects.

* **Run scans centrally**: Start a **Deep security scan** for any project from the Code analysis tab
* **Last scan timestamps**: See when each project was last scanned so you can identify outdated results at a glance
* **Risky project identification**: Spot projects that are public or recently changed but have outdated or missing scan results
* **Never-scanned detection**: Flag projects that have never been scanned, catching cases where the scanning process may have been skipped entirely

This is especially useful for maintaining consistent scan coverage across a large number of projects without having to visit each one individually.

<Tip>
  **Schedule Deep security scans (Enterprise)**

  If you'd rather have **Deep scans** run on a recurring cadence instead of triggering them manually, configure a schedule in [Schedule security scans](#schedule-security-scans-enterprise-only). Scheduled scans are billed at 1 credit per project per run; on-demand scans from the Code analysis tab remain free.
</Tip>

## Common use cases

The Security center supports both routine reviews and time-sensitive security work, including:

* **Release readiness and audits**\
  Confirm projects meet security standards before shipping or compliance reviews.
* **Project onboarding and handoffs**\
  Ensure inherited or transferred projects have been scanned and don't introduce security risks.
* **Critical vulnerability response**\
  Quickly identify affected projects when new dependency issues are announced.
* **Secret auditing**\
  Search for a specific API key by name and see every project that uses it, making it easy to audit usage or coordinate key rotation.
* **Stale secret cleanup**\
  Sort secrets by creation date to find old credentials tied to unused projects, and remove them to reduce unnecessary exposure.
* **Security reporting**\
  Export dependency or secrets data as CSV files when you need a point-in-time snapshot for audits, reviews, or internal tracking.
* **Ongoing monitoring**\
  Regularly review findings and address new issues as part of a weekly or monthly cadence.

## Best practices for using the Security center

The Security center is designed for ongoing review rather than a fixed workflow. The following best practices reflect how teams commonly use it.

* **Start with the workspace overview**\
  Review overall security status to understand how many projects have errors, warnings, or outdated scans.
* **Prioritize projects that need attention**\
  Use filters to focus on projects with critical errors, high-severity vulnerabilities, or recent warnings.
* **Check scan freshness**\
  Identify projects that haven’t been scanned recently and may need updated security reviews.
* **Review dependency vulnerabilities**\
  Inspect vulnerable packages by severity to see which issues affect multiple projects and require coordinated updates.
* **Take action within individual projects**\
  Use the **View** action on a project to open its security details, run new scans, update dependencies, and resolve findings in the [Project security view](/features/security-view).

## FAQ

<AccordionGroup>
  <Accordion title="Who can access the Security center?">
    Workspace admins and owners on Business and Enterprise plans can access the **Security center** at **Settings → Workspace → Security center**.
  </Accordion>

  <Accordion title="Does the Security center run scans automatically?">
    No. It displays the most recent scan results for each project. You can run a security scan for any project directly from the **Security center**, or run one from within the project itself.

    Enterprise workspaces can also schedule security scans to run automatically across selected projects. Scheduled scans consume credits, while on-demand scans remain free.
  </Accordion>

  <Accordion title="What’s the difference between errors, warnings, and info?">
    * **Errors** are critical security issues that should be resolved before publishing.
    * **Warnings** are important concerns that may not be critical but should be reviewed.
    * **Info** findings provide additional context to help teams better understand their security posture.
  </Accordion>

  <Accordion title="Why do some projects show as never scanned?">
    Projects appear as never scanned if a security scan has not yet been run for them. Run a security scan in the project to generate results.
  </Accordion>

  <Accordion title="Does the Security center show historical data?">
    No. At the moment, the **Security center** shows only the latest scan results for each project.
  </Accordion>

  <Accordion title="Can I export security data?">
    Yes. Use the **Export** dropdown in the top-right corner. Export is available on the **Workspace insights**, **Code analysis**, **Supply chain security**, and **Secrets overview** tabs.

    All exports are CSV files. Secret values are not included in any export.
  </Accordion>

  <Accordion title="Can I see actual secret values in the Secrets overview?">
    No. The **Secrets overview** only shows secret names (for example, `OpenAI API Key`), not the secret values themselves. Secret values are not included in exports.
  </Accordion>

  <Accordion title="Can I update a secret from the Security center?">
    Not directly. You can click through from the **Secrets overview** to the specific project's secrets page, where you can update or remove individual secrets.
  </Accordion>

  <Accordion title="What do security findings mean on a secret row?">
    Security findings are tied to the project, not the individual secret. They indicate the overall security posture of the project that holds that secret.
  </Accordion>

  <Accordion title="Can I run a security scan from the Security center?">
    Yes. You can trigger a security scan for any project directly from the Security center without having to open the project first.
  </Accordion>
</AccordionGroup>
