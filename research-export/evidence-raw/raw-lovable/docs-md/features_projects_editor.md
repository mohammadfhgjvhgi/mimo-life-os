> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Find your way around the Lovable editor

> A guided map of the Lovable editor: where every tool lives, from the chat panel and live preview to the project toolbar, More menu, and keyboard shortcuts.

Opening a project takes you to the **editor**. This is where you build: you describe what you want in the chat panel on the left, and you watch your app take shape in the preview on the right. Everything else, from version history to publishing, is one or two clicks away in the top bar.

This page is a map of the editor, so you always know where to find things.

<Note>
  The layout described here is the desktop browser experience. On smaller windows some controls collapse into overflow menus, and the [Lovable mobile app](/integrations/lovable-mobile-app) arranges the same areas as swipeable views instead of a top bar.
</Note>

## The two main areas

* **Chat panel** (left): Where you tell Lovable what to build and follow its progress. Learn more in [Chat with Lovable](/features/projects/chat).
* **Preview** (right): A live, interactive version of your app that updates as Lovable works. Learn more in [Preview your app](/features/projects/preview).

The rest of the editor's controls sit in the top bar.

## Lovable logo

The Lovable logo in the top corner opens the dashboard sidebar in place, so you can switch workspaces, jump to another project or folder, or reach any part of the [dashboard](/introduction/dashboard-overview) without leaving the editor.

## Project name menu

Click your project's name in the top bar to open a menu with project-level and account actions. At the top it shows your workspace, plan, and current credit usage. Below that:

* **Get free credits**: Earn additional credits through referrals. See [Share Lovable](/introduction/dashboard-overview#share-lovable).
* **Settings**: Open the settings dialog, covering both [project settings](/features/projects/settings) and your [workspace settings](/features/workspace-admin-settings).
* **Project connectors**: Manage the services your project connects to. See [Connectors](/integrations/introduction).
* **Remix this project**: Create an independent copy to build on. See [Remix a project](/features/projects/remix).
* **Design system**: Apply a shared design system to this project. Available on Enterprise plans. See [Design systems](/features/design-systems).
* **Rename project**: Change the project's display name.
* **Star project**: Pin the project to your **Starred** list on the dashboard.
* **Move to folder**: Organize the project into a dashboard [folder](/introduction/project-folders).
* **Details**: View project information such as its description, owner, and creation date.
* **Appearance**: A small submenu to switch the editor between light and dark themes.
* **Help**: Get support and helpful resources.

You need edit access to the project to see most of these items, so viewers get a reduced menu. A few items also depend on your plan, like **Design system** on Enterprise.

## History

The **History** toggle next to the project name opens your project's version history, where you can browse past versions, restore an earlier one, and manage bookmarks. Learn more in [Version history](/features/projects/history).

## Close sidebar

The **Close sidebar** toggle collapses the chat panel to give the preview the full window, and brings it back when you click it again. You can also press **Cmd+B** (Mac) or **Ctrl+B** (Windows/Linux).

## Project toolbar

The tabs in the project toolbar switch what the main area shows:

* **Preview**: The home tab. Shows your app running live, so you can click through it exactly as your users would. See [Preview your app](/features/projects/preview).
* **Files**: The files that live alongside your app: documents Lovable [generates for you](/features/generate-files) and files you upload, like reports, exports, and other deliverables.
* **Code**: A full code editor where you can read your project's code, edit it directly on paid plans, and download it. See [the code editor](/features/code-mode).
* **More**: Opens a panel with the rest of your project's tools, listed below.

### The More menu

Click **More** to open a panel with tools for growing and running your app:

| Section                | What it's for                                                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Analytics**          | Visitor counts, page views, and usage trends for your published app, without adding any tracking code. Learn more in [Analytics](/features/analytics).                                                               |
| **Cloud**              | Your app's backend in one place: the database and its records, user accounts, file storage, scheduled jobs, edge functions, secrets, logs, and usage. Learn more in [the built-in backend (Cloud)](/features/cloud). |
| **Agent integrations** | Publish your app as an MCP server, so AI assistants like ChatGPT and Claude can use it. Learn more in [Agent integrations](/features/agent-integrations).                                                            |
| **Payments**           | Accept payments in your app through the built-in **Paddle** and **Stripe** integrations, with Lovable wiring up products and checkout. Learn more in [Payments](/features/payments).                                 |
| **Connectors**         | See the services your project is connected to, with links to manage each connection. Learn more in [Connectors](/integrations/introduction).                                                                         |
| **Security**           | Review security findings for your project and fix them with Lovable's help. Learn more in [Security](/features/security) and the [project security view](/features/security-view).                                   |
| **SEO & AI search**    | Review how search engines and AI tools see your app, and fix metadata, indexing, and accessibility issues. Learn more in [SEO & AI search](/features/seo-aeo).                                                       |
| **Sensitive data**     | Appears when sensitive data scanning is enabled for your workspace, and shows what personal data your app handles. Learn more in [Sensitive data scanning](/features/sensitive-data-scanning).                       |

A few tools you might expect as their own sections live inside **Cloud**:

* **AI**: Monitor and manage the AI features inside your app, such as model usage and spend. Learn more in [AI](/features/ai).
* **Emails**: Send transactional email, like sign-up confirmations and receipts, from your app's own address. Requires the built-in backend (Cloud) and a paid plan. Learn more in [Send emails](/features/custom-emails).
* **Supabase**: Manage your external Supabase connection, when your project uses one. Learn more in [Supabase](/integrations/supabase).

<Note>
  What you see in the More menu depends on your project and plan: sections tied to a feature appear once you use it.
</Note>

## Top right controls

These controls sit above the preview and are available while the **Preview** tab is active. From left to right:

* **Preview toolbar button**: Brings back the [preview toolbar](/features/preview-toolbar) when it's hidden, so you can select elements, edit text inline, and draw on the preview.
* **Comments**: Open your project's comments to catch up on feedback from collaborators. This button shows when the preview toolbar is hidden. When the toolbar is visible, comments live in the toolbar itself. See [Project comments](/features/project-comments).
* **Collaborator avatars**: See who else is in the project right now, and invite others.
* **Share**: Invite collaborators, control who can access the project, and create preview links. See [Share your project](/features/share-project).
* **Publish**: Deploy your app to its live URL, or push an update to the published version. On Business and Enterprise plans you can publish to your workspace only, instead of the public web. You can also ask Lovable to publish in chat. See [Publish your project](/features/publish).

## Command palette

Press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux) anywhere in the editor to open the [command palette](/introduction/project-search-and-find#command-palette) and search for projects, folders, and settings from the keyboard.

## FAQ

<AccordionGroup>
  <Accordion title="Where do I find Cloud and my database?">
    Open the **More** tab in the project toolbar and select **Cloud**. That's where your database, users, storage, and backend logs live. See [the built-in backend (Cloud)](/features/cloud).
  </Accordion>

  <Accordion title="Where are my app's analytics?">
    Open the **More** tab in the project toolbar and select **Analytics**. See [Analytics](/features/analytics).
  </Accordion>

  <Accordion title="How do I open the code editor?">
    Click the **Code** tab in the project toolbar. See [the code editor](/features/code-mode).
  </Accordion>

  <Accordion title="Where are project settings?">
    Click your project's name in the top bar, then select **Settings**. See [Project settings](/features/projects/settings).
  </Accordion>

  <Accordion title="Where do I manage who can access my project?">
    In the **Share** menu in the top right, not in project settings. Share is where you invite collaborators, set roles, and control the project's visibility. See [Share your project](/features/share-project).
  </Accordion>

  <Accordion title="How do I switch to another project?">
    Click the Lovable logo in the top corner to open the dashboard sidebar and pick any project or folder, without leaving the editor.
  </Accordion>

  <Accordion title="I don't see a tab described here. Where did it go?">
    On smaller windows, some tabs collapse into an overflow menu at the end of the project toolbar, so try widening your browser window. Some tools also appear only when they're relevant to your project or included in your plan.
  </Accordion>
</AccordionGroup>
