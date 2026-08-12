> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Project settings

> Rename your project, manage domains and hosting, view analytics, set project knowledge, and restore backups.

Project settings let you manage the core aspects of your project, from its name and domains to analytics and backups.

## Open your project settings

* From inside a project, click the **gear icon** in the top center of the screen, then click **All project settings**.
  <Frame>
    <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784314912/project-settings_y5swde.png" alt="In a Bolt project, with the gear icon highlighted in the top navigation and All project settings selected in the project options menu." />
  </Frame>

This opens the General settings page. You can navigate to other project settings using the left navigation menu.

## General

Rename your project and clear context.

### Project name

To rename your project:

* In **Project name**, type a new name, then click **Save**.

<Tip>
  You can also change the project name [from the Projects page](/building/using-bolt/projects-files#rename-a-project) or by clicking the name in the left sidebar when you're in the project, then clicking **Rename**.
</Tip>

### Project agent

All projects use Bolt Agent. You can [switch between the Standard and Max agent from the chatbox](/building/using-bolt/agents#switch-agents).

### Context

To clear Bolt's short-term memory of your project:

* Click **Clear context**.

## Domains & Hosting

Edit your `.bolt.host` subdomain, buy or connect a custom domain, and unpublish your project.

### Bolt subdomain

All projects are published by default at a free `.bolt.host` subdomain. Bolt creates a URL automatically when you publish your project, but you can change the portion of the URL that comes before `.bolt.host`.

To edit your Bolt subdomain:

1. Click **Edit domain** (pencil icon).
2. Enter a new subdomain, then click **Save**.
3. Leave **Republish after updating** selected to make sure Bolt applies the new subdomain to your site right away.

You can also [buy a new domain](/cloud/domains/purchase) through Bolt or [connect a domain you own](/cloud/domains/connect).

### Unpublish project

<Info>
  Before you begin, check whether your project is using a custom domain. If so, you have to [disconnect the custom domain](/cloud/domains/connect#disconnect-a-domain) before you unpublish your site. After the site is unpublished, you can reconnect the domain at any time if you decide to publish again.
</Info>

To take your site offline:

* Click **Unpublish**, then click **Unpublish** again.

<Tip>
  You can also [unpublish your site from the **Publish** menu](/cloud/hosting/publish#unpublish-your-bolt-hosted-site) in your project.
</Tip>

## Analytics

View your published site's visitor and traffic data for a selected timeframe. To learn more, see [Analytics](/cloud/hosting/analytics).

## Knowledge

Add background instructions for Bolt to follow **for a specific project**. Project knowledge gives Bolt a reliable sense of context around goals, style expectations, terminology, constraints, and workflow habits. Instead of repeating these details in every prompt, add them in knowledge so the agent uses them automatically.

## Backups

Restore your project to an automatically saved backup.

<Tip>
  You can also restore a saved backup using Bolt's [Version History](/building/using-bolt/rollback-backup#restore-using-version-history). In general, we recommend using Version History to switch between project versions.
</Tip>

To restore from a backup:

1. Find the backup with the date and time you want.
2. Click **Load** next to that backup.
3. In the confirmation window, click **Create Fork**.

This creates a duplicate of your project using the backup, without affecting the current version.
