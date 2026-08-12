> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Project settings

> Every Lovable project setting in one reference: rename a project, change its URL, control publishing and sharing, connect Git, manage domains, or delete a project.

**Project settings** is where you manage a single project: its name and URL, project type, monitoring, publishing options, sharing toggles, Git connection, domains, knowledge, and skills. This page walks through the settings tab by tab so you know exactly where each option lives.

To open it, click the project name in the top bar of the editor and select **Settings**. From the chat, open the **Chat actions** menu with the plus button and choose **Settings**, or press **Cmd+.** (Mac) or **Ctrl+.** (Windows/Linux). You can also find any setting by name through the [command palette](/features/projects/editor#command-palette). Your project's tabs appear in the settings sidebar alongside your workspace and account settings.

<Note>
  Access control does not live here. Who can access the project, collaborators, invite links, and share preview links all live in the **Share** menu in the top right of the editor. See [Share your project](/features/share-project).
</Note>

<Note>
  To view or edit the source code Lovable generates for your app, open the **Code** tab in the [project toolbar](/features/projects/editor#project-toolbar), not Project settings. See [Code editor](/features/code-mode).
</Note>

## General tab

The **General** tab opens by default and contains most settings, grouped into sections.

### Details

* **Project name**: Rename your project. Lovable names new projects automatically, and the name is visible only inside your workspace, never to visitors of your published app. Renaming only changes the display name, not your project's URL.
* **URL subdomain**: Change the subdomain of your published `lovable.app` address, which is where visitors find your app once you [publish](/features/publish).
* **Owner**: Shows who owns the project, with a link to their profile. See [project roles](/features/projects/overview#project-roles).
* **Messages count** and **AI edits count**: Read-only counters showing how much you've built in this project.
* **Use as a template**: Turn your project into a template that others in your workspace can start from. Available on Business and Enterprise plans. See [Design templates](/features/business/design-templates). On Enterprise workspaces that use [design systems](/features/design-systems), this appears as a **Project type** selection instead, with **Design system** as a third option.
* **Design system** (Enterprise): The design system Lovable builds this project with, so new UI matches your organization's components and styles. Click **Attach design system** to pick one, or **Manage design system** once attached. See [Design systems](/features/design-systems).

### Project monitoring

* **Project monitoring**: Have Lovable review your project's code and recent visitor errors on a daily or weekly schedule, and alert you to important issues in the editor and by email. Off by default, available on Pro plans and above. See [Project monitoring](/features/project-monitoring).

### Preview

* **Live preview**: Run your app live in the editor preview so changes appear as Lovable works. On by default. When you turn it off, the preview shows the most recent completed version of your app instead, and switching between versions in [version history](/features/projects/history) doesn't restart the live environment. Turn it back on any time. See [Turn off the live preview](/features/projects/preview#turn-off-the-live-preview).

### Publishing

* **Project category**: Categorize what kind of app this is, which helps Lovable and directories present it correctly.
* **Hide Lovable badge**: Removes the "Edit with Lovable" badge from your published app. Available on Pro plans and above. If your workspace later moves to a plan that doesn't include this, the badge comes back the next time you publish the project. Sites that are already live stay unchanged until you republish them.
* **Visitor analytics**: Collect visitor data for your published app, which powers the [Analytics](/features/analytics) view in the editor. On by default. When you turn it off, Lovable stops collecting and the Analytics view shows no new data.
* **AI app context**: Let Lovable use context from your app's AI calls to debug and improve its AI features. Secrets are removed from the logs automatically, and logs are kept for 90 days. See [AI features](/features/ai#let-lovable-debug-and-improve-your-ai-features).
* **Auto-fix security issues**: Let Lovable automatically fix low-risk issues found by [security scans](/features/security), so simple findings don't wait on you. Workspace owners and admins can set a workspace-wide default in **Workspace settings → Privacy & security**, and when they lock it there, the project setting can't be changed here.
* **Unpublish project**: Takes your published app offline. The button is available only while the project is published. See [Publish your project](/features/publish).

### Sharing

* **Project access**: A shortcut only: the **Open share menu** button takes you to the **Share** menu, where you control who can view and edit the project. See [Share your project](/features/share-project).
* **Public remixing**: Control whether anyone with your project's link can create their own copy of it. Off by default. See [Remix a project](/features/projects/remix).
* **Cross-project sharing**: Controls whether your other projects can reference this one as context. Workspace admins can disable this workspace-wide. See [Cross-project referencing](/features/cross-project-referencing).

### Project actions

* **Remix project**: Duplicate this app in a new project with the **Remix** button. See [Remix a project](/features/projects/remix).
* **Migrate to TanStack Start**: Upgrade an older React + Vite project to TanStack Start, Lovable's latest template, with the **Migrate** button, so your pages render on the server. The row appears only on projects that can upgrade. See [Upgrade a project to TanStack Start](/features/upgrade-to-tanstack-start).
* **Move workspace**: Move this project to a different [workspace](/features/workspace) you belong to with the **Move** button. See [Move a project to another workspace](#move-a-project-to-another-workspace) below.
* **Transfer ownership**: Make another member of your workspace the project owner. See [Transfer project ownership](#transfer-project-ownership) below.

#### Transfer project ownership

Click **Transfer ownership** and pick the new owner. The new owner must be a full member of the workspace: external collaborators and people with pending invites aren't eligible. After the transfer, the new owner has full control of the project, and what you can still do depends on your [workspace role](/features/people). If an owner leaves the workspace, their projects transfer automatically to the most senior remaining member. See [project roles](/features/projects/overview#project-roles).

#### Move a project to another workspace

Click **Move** on the **Move workspace** row and pick the destination workspace. You can also start a move from the dashboard: open a project card's menu and select **Transfer to workspace**, or select several projects to move them together. You can move projects you own, and workspace owners (plus workspace admins on paid plans) can move any project they can access. On Enterprise workspaces, project owners additionally need the [**Editor project transfers**](/features/privacy-and-security-settings#editor-project-transfers) setting turned on.

The move dialog includes a **Transfer project collaborators** checkbox:

* **Off (default)**: people invited directly to the project, and any pending project invites, are removed when the project moves. Access through workspace membership is not affected.
* **On**: Lovable keeps direct collaborators and pending invites when the destination workspace allows their role and you have permission to grant it there. Some collaborators may still be removed, for example when the destination workspace's [**External project collaborators**](/features/privacy-and-security-settings#external-project-collaborators) policy doesn't allow their role.

Two more things change during a move: the project leaves its dashboard [folder](/introduction/project-folders), and its access setting resets to the destination workspace's default, so check **Project access** after the move if the project should stay restricted.

### Danger zone

* **Delete project**: Permanently deletes the project. To confirm, you type the project's name.

<Warning>
  Deleting a project is permanent. You cannot restore a deleted project, so [download your code](/features/code-mode) or [remix the project](/features/projects/remix) first if you might need it later.
</Warning>

## Git tab

The **Git** tab is where you connect your project to a [GitHub](/integrations/github) or [GitLab](/integrations/gitlab) repository and manage the connection. The sync is two-way: Lovable pushes every change it makes to the repository, and commits you push to the synced branch flow back into Lovable. That gives you a full copy of your code outside Lovable and lets developers on your team work with their own tools. See [Git sync](/integrations/git-sync-overview) for how the sync works.

## Domains tab

The **Domains** tab is where you manage the web addresses of your published app. You can connect a domain you already own, buy a new domain directly through Lovable, and choose a primary domain that all your project's other addresses redirect to. Custom domains are available on paid plans. See [Set up a custom domain](/features/custom-domain).

## Knowledge tab

Open **Settings → Knowledge**, under **Customization** in the settings sidebar, or use the **Chat actions** menu in the editor. The Knowledge tab holds your project's instructions and guidelines. Lovable follows them in every request, so use this tab to describe your product, audience, and preferences once instead of repeating them in chat. Anyone with edit access can update project knowledge, and the same tab shows your workspace-wide knowledge. See [Knowledge](/features/knowledge).

## Skills tab

Open **Settings → Skills**, also under **Customization** in the settings sidebar, to manage the reusable instruction sets available in this project, such as a launch checklist or a release notes format. Workspace owners and admins manage which skills exist. See [Skills](/features/skills).

## FAQ

<AccordionGroup>
  <Accordion title="Where do I change who can see my project?">
    In the **Share** menu in the top right of the editor. That's where you manage project access, collaborators, invite links, and share preview links. The **Project access** row in settings is just a shortcut that opens the same menu. See [Share your project](/features/share-project).
  </Accordion>

  <Accordion title="How do I rename my project?">
    Open **Project settings → General** and edit **Project name**. You can also click the project name in the top bar of the editor and choose the rename option there. Renaming changes the display name only. To change your published address, edit **URL subdomain** instead.
  </Accordion>

  <Accordion title="What's the difference between Move, Transfer ownership, and Remix?">
    * **Move workspace** sends the project to another workspace you belong to.
    * **Transfer ownership** keeps the project in the same workspace but makes another workspace member the owner.
    * **Remix project** creates a separate copy of the project to build on, in this workspace or another one. See [Remix a project](/features/projects/remix).
  </Accordion>

  <Accordion title="Is deleting a project reversible?">
    No. Deleting a project is permanent, which is why **Delete project** asks you to type the project's name to confirm. If you might need the project later, download the code or remix it before deleting.
  </Accordion>

  <Accordion title="Does changing the URL subdomain break my old link?">
    Your published app moves to the new `lovable.app` address, so anyone using the old link needs the new one. If you want a stable address you control, connect a custom domain from the **Domains** tab. See [Set up a custom domain](/features/custom-domain).
  </Accordion>
</AccordionGroup>
