> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project monitoring

> Let Lovable check your app on a schedule, catch bugs and visitor errors early, alert you by email, and help you fix them in chat.

<head>
  <script type="application/ld+json">
    {`{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Does project monitoring fix issues automatically?", "acceptedAnswer": {"@type": "Answer", "text": "No. Project monitoring finds and explains issues. You decide whether to ask Lovable to fix a finding."}}, {"@type": "Question", "name": "Who receives email alerts?", "acceptedAnswer": {"@type": "Answer", "text": "The project owner receives email alerts for important findings. Each email highlights the most important new finding. All open findings appear in the editor, where project editors can review and act on them."}}, {"@type": "Question", "name": "What happens if I turn project monitoring off?", "acceptedAnswer": {"@type": "Answer", "text": "Scheduled checks stop running for that project. Your monitoring history and past findings stay available under View history in project settings."}}, {"@type": "Question", "name": "Why did I get an alert for something that works now?", "acceptedAnswer": {"@type": "Answer", "text": "Some findings come from recent visitor error logs. The issue may have been temporary or already addressed by another fix you made. Lovable checks whether an issue is still valid before attempting a fix."}}]}`}
  </script>
</head>

Project monitoring checks your project in the background and alerts you when Lovable finds important issues.

It looks at your project code and recent errors from visitors using your app, then shows findings in Lovable so you can review them and ask Lovable to fix them.

Monitoring is most useful for published apps with real visitors, projects with several collaborators, and any project you want to keep healthy between editing sessions. It helps you catch problems before your users do.

<Note>
  Project monitoring is in beta. It is available on Pro, Business, and Enterprise workspaces.
</Note>

## What project monitoring scans

Project monitoring checks two signals:

* **Project code:** Lovable reviews the app code for broken functionality, broken app logic, and broken UI.
* **Visitor errors:** Lovable checks recent errors that visitors to your app encountered and looks for underlying causes in the code.

Examples of findings include:

* Sign-in errors
* Failing payments
* Inputs that are not saved correctly
* UI elements that do not work
* Failing cron jobs
* Broken integrations

## Turn project monitoring on

You set up project monitoring separately for each project. Any project editor can turn it on or off.

<Steps>
  <Step title="Open project settings">
    Open your project, then go to **Settings**. The toggle lives in [**Project settings → General → Project monitoring**](/features/projects/settings#project-monitoring).
  </Step>

  <Step title="Enable project monitoring">
    Find **Project monitoring** and turn on the switch. By default, checks run daily at 6:00 in your timezone, and only if the project was edited since the last check. The first check runs at the next scheduled time, not immediately.
  </Step>

  <Step title="Set the schedule">
    To change the schedule, select **Configure**, then select the schedule (for example, **Daily at 6:00**) to switch between daily and weekly checks, pick the day for weekly checks, and set the time. Times are shown in your timezone, and checks run around the selected time.
  </Step>

  <Step title="Choose when checks can run">
    Next to **Runs**, select the run condition to choose between **Every time** and **If edited since last check**. For the second option, set the number of edits under **Minimum edits made**, then select **Done**.
  </Step>

  <Step title="Save your changes">
    Select **Save**. The **Project monitoring** section reflects the new schedule.
  </Step>
</Steps>

<Tip>
  Choose a daily schedule for published apps with regular visitors, and a weekly schedule for projects that change less often. **If edited since last check** avoids spending credits on checks when nothing has changed.
</Tip>

When project monitoring is off, new scheduled checks stop running for that project. Scheduled checks also stop running if your workspace moves to a plan that does not include project monitoring, and resume when you upgrade again.

## How findings are shared

Lovable shares project monitoring findings in two ways:

* **Email:** The project owner receives emails for important or time-sensitive findings. Each email highlights the most important new finding and links directly to it in the editor.
* **In the editor:** Project editors see summarized findings above the chat and can investigate, address, or ignore them. Members with view-only access do not see findings.

## Review and fix findings

When Lovable finds issues, a summary appears above the project chat. Select **View issues** to expand the full list. You have three options:

* **Try to fix:** Lovable works on the open findings in chat, like a regular request. You can review the changes in the chat when the fix completes.
* **Skip:** Closes the list without making changes. Skipped findings stay open and reappear the next time you open the project.
* **Ignore:** Removes a single finding from the list, for example when it is not relevant, already resolved, or not worth fixing. If you change your mind, select the undo button next to the ignored finding to reopen it.

If you want to investigate a finding first, reference project monitoring and the concrete issue in a question to Lovable before starting a fix. For example:

```text wrap theme={null}
Project monitoring found that the contact form fails to send messages. Before changing anything, explain what is causing this and how you would fix it.
```

## Review monitoring history

After the first check has run, the **Project monitoring** section in your project settings shows when the project was last checked. Select **View history** next to the last-checked date to see all previous checks, one row per check:

| Column           | What it shows                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **Date**         | When the check ran                                                                                            |
| **Credits used** | Credits the check used                                                                                        |
| **Issues**       | The number of issues found, **No issues** for clean checks, or **Check failed** if the check did not complete |

Select **Load more** to see older checks.

## Cost and credits

Project monitoring uses credits for each completed scheduled run. Cost varies with how much code and visitor activity Lovable checks, and each run's cost is shown in the monitoring history. Lovable always uses included daily grants before your credit balance.

Scheduled checks are skipped when the project has not met the minimum edit threshold you configured or when the workspace is out of credits. Skipped checks do not use credits.

## Limitations

* Project monitoring does not replace testing. Lovable can miss issues, especially when many issues exist in one scan.
* Finding status updates only when you fix, ignore, or chat about a specific finding. Changes made before then can make a finding outdated.
* Lovable can incorrectly flag working behavior as broken. Ignore false positives so they do not appear again.
* Monitoring is configured per project, not once for an entire workspace.

## FAQ

<AccordionGroup>
  <Accordion title="Does project monitoring fix issues automatically?">
    No. Project monitoring finds and explains issues. You decide whether to ask Lovable to fix a finding.
  </Accordion>

  <Accordion title="Who receives email alerts?">
    The project owner receives email alerts for important findings. Each email highlights the most important new finding. All open findings appear in the editor, where project editors can review and act on them.
  </Accordion>

  <Accordion title="What happens if I turn project monitoring off?">
    Scheduled checks stop running for that project. Your monitoring history and past findings stay available under **View history** in project settings.
  </Accordion>

  <Accordion title="Why did I get an alert for something that works now?">
    Some findings come from recent visitor error logs. The issue may have been temporary or already addressed by another fix you made. Lovable checks whether an issue is still valid before attempting a fix.
  </Accordion>
</AccordionGroup>
