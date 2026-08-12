> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Projects in Lovable

> What a project is in Lovable and how to work with one: create, organize, and publish projects, manage roles and ownership, and safely move or delete them.

A project is one app in Lovable. Every project lives inside a [workspace](/features/workspace), has a single project owner, and holds everything that belongs to that app:

* **[Chat](/features/projects/chat)**: The conversation where you tell Lovable what to build.
* **[Preview](/features/projects/preview)**: The live version of your app that updates as you build.
* **[Code](/features/code-mode)**: Your app's source code, which you can browse, edit, and download.
* **[Version history](/features/projects/history)**: Every change, saved automatically.
* **[Settings](/features/projects/settings)**: The project's name, URL, domains, knowledge, and more.

Lovable saves its work automatically: every edit it makes becomes a version in your project's version history, so there is nothing for you to save as you build.

Projects are the unit you build, share, and publish. Understanding how they work helps you keep work organized, collaborate with teammates, and make confident use of the few actions that are permanent, like deleting a project.

## Ways to create a project

* **From the dashboard**: Describe what you want to build in the [prompt input](/introduction/dashboard-overview#the-prompt-input), by typing or dictating with the microphone, and send it. Attach files or drag and drop them for context, and use the **+** menu to start from a [template](/features/business/design-templates) or apply a [design system](/features/design-systems). You can also start from a Figma design, a sketch, or a website whose layout you want Lovable to recreate: see the start paths in [Quick start](/introduction/getting-started).
* **By remixing**: Create your own independent copy of an existing project: one of your own, a project that allows remixing, or a template from the dashboard's **Resources** section. See [Remix a project](/features/projects/remix).
* **With Build with URL**: Generate a project from a shareable link that contains a prompt, useful for embedding a "Build with Lovable" button or sharing predefined prompts. See [Build with URL](/integrations/build-with-url).

Lovable also works beyond the browser: create and edit projects from the [desktop app](/integrations/desktop-app), the [mobile app](/integrations/lovable-mobile-app), the [ChatGPT app](/tips-tricks/chatgpt-app), the [Telegram bot](/tips-tricks/lovable-telegram-bot), or the [Lovable MCP server](/integrations/lovable-mcp-server) in your other AI tools.

## Draft and published states

A new project starts as a draft: only you and the people you share it with can see it, through the editor or a [preview link](/features/share-project#share-preview-links). When you're ready, publishing deploys a snapshot of your app to its live URL. By default anyone with the link can visit it. On Business and Enterprise plans you can restrict website access to your workspace or a custom audience. Edits you make after publishing stay in your draft until you publish again, so visitors never see half-finished work. See [Publish your project](/features/publish) and [Preview your app](/features/projects/preview).

### Your project URL

Every project gets a subdomain that forms its `lovable.app` web address after you publish. You can change it in **Project settings → URL subdomain**. Renaming a project changes only its display name, not its URL. On paid plans, you can also connect a [custom domain](/features/custom-domain) after you publish.

## Project roles

Every project has one **owner**, usually the person who created it. Everyone else works in a project with one of three roles, managed from the **Share** menu in the editor:

| Role       | What they can do                                                                                   | Availability                  |
| ---------- | -------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Owner**  | Everything: edit, publish, manage settings, transfer, or delete the project                        | Every project has exactly one |
| **Admin**  | Full access to the project, including all project settings, integrations, and external connections | Paid plans                    |
| **Editor** | Build, edit, and manage most project settings                                                      | All plans (the default role)  |
| **Viewer** | Read-only access to the project                                                                    | Paid plans                    |

Invite people from the **Share** menu, by email or with an invite link. You can invite members of your workspace, or external collaborators: people outside your workspace who get access to just this project.

Workspace roles matter too. Workspace owners keep full access to all projects in the workspace regardless of who owns each project, and workspace admins have the same access except for projects with restricted access.

See [Share a project](/features/share-project) for the full picture, including invite links and external collaborators.

### When ownership changes

* **Transfer ownership**: The owner can hand a project to another workspace member from **Project settings → Transfer ownership**.
* **When an owner leaves**: If a project owner leaves or is removed from the workspace, their projects are automatically transferred to the most senior remaining member (owners first, then admins, then editors). Projects with access set to **Restricted**, which only the owner and invited collaborators can open, are not transferred automatically.

## Organize and manage projects

Everyday project management lives in three places, and you can use whichever is closest: the project card's menu on the [dashboard](/introduction/dashboard-overview#manage-projects-from-the-dashboard), the project name menu in the [editor](/features/projects/editor), and [Project settings](/features/projects/settings).

* **Rename**: From the project name menu in the editor or **Project settings → Project name**.
* **Star**: Pin the project to your **Starred** list, from the project card or the project name menu.
* **Move to folder**: Organize projects into dashboard folders, from the project card or the project name menu. See [Project folders](/introduction/project-folders).
* **Move to another workspace**: From the project card menu (**Transfer to workspace**) or **Project settings → Move workspace**. The project keeps its history and settings. People invited directly to the project only move with it if you opt in. See [Move a project to another workspace](/features/projects/settings#move-a-project-to-another-workspace).
* **Transfer ownership**: From **Project settings → Transfer ownership**.
* **Delete**: From **Project settings → Danger zone → Delete project**. To confirm, you type the project's name.

<Warning>
  Deleting a project is permanent. There is no way to restore a deleted project, its version history, or its chat history. If you might need the project later, [remix it](/features/projects/remix) first to keep a copy, or [download the code](/features/code-mode).
</Warning>

## FAQ

<AccordionGroup>
  <Accordion title="Is my work saved automatically?">
    Yes. Every change Lovable makes is saved automatically as a version in your project's [version history](/features/projects/history). There is no save button, and you can revert to any earlier version at any time.
  </Accordion>

  <Accordion title="How many projects can I have?">
    There is no project limit. Every workspace member can create and work on as many projects as they want. Plans are priced by credits, not by projects or seats. See [Lovable workspace](/features/workspace).
  </Accordion>

  <Accordion title="Can a project belong to multiple workspaces?">
    No. A project lives in one workspace at a time. You can move it to another workspace from **Project settings → Move workspace**, or remix it into a different workspace to create an independent copy there.
  </Accordion>

  <Accordion title="Can I recover a deleted project?">
    No. Deleting a project is permanent and there is no restore option. Remix the project or download its code before deleting it if you want to keep a copy.
  </Accordion>

  <Accordion title="Why do I see 'Project not found'?">
    The project was most likely deleted, or you no longer have access to it. If neither should be true, contact [Support](https://lovable.dev/support).
  </Accordion>

  <Accordion title="Who can see my project?">
    That depends on your project access setting, which you manage from the **Share** button in the editor. See [Project access](/features/project-visibility) and [Share a project](/features/share-project).
  </Accordion>
</AccordionGroup>
