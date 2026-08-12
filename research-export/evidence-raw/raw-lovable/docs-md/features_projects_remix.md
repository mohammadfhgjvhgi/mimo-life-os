> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Remix a project

> Remix a Lovable project to create your own independent copy. Learn what carries over to the copy, who can remix your project, and how to move projects between accounts.

Remixing creates your own independent copy of a project. The copy is a new project that you own, and changes you make to it never affect the original.

## Why remix a project

* **Duplicate your own work**: Keep a safe copy before a big change, or spin off a variation of an app you already built.
* **Start from a public project**: Use someone else's remixable project or a template as a starting point instead of building from scratch.
* **Move work between workspaces or accounts**: Remix a project into a different workspace, or use remixing to [move projects to another account](#move-a-project-to-another-account).

## Control who can remix your project

The **Public remixing** toggle in **Project settings → Sharing** controls whether other people can remix your project via its link. It is off by default: until you turn it on, your project is a starting point for yourself and your collaborators only. Public remixing is not available in Enterprise workspaces.

When public remixing is on, anyone with your project's link copies the **latest version** of the project. They can't edit your project, and the original stays unchanged. Because a copy contains your code, turning this on also lets people with the link view your project's source code. You can turn it off again at any time. Copies people already made stay theirs. See [Project access](/features/project-visibility).

<Note>
  Projects connected to an external [Supabase](/integrations/supabase) project can only be remixed by people with edit access to the source project.
</Note>

## How to remix

You can start a remix from three places:

* In the editor, click the project name in the top bar and select **Remix this project**.
* In **Project settings → Project actions**, click **Remix**.
* On the [dashboard](/introduction/dashboard-overview), open a project card's menu and select **Remix**.

### The Remix dialog

The dialog shows these fields:

* **Project name**: The name of the copy, pre-filled with the original name.
* **Target workspace**: Which workspace the copy is created in. This field only appears when you have more than one workspace. In Enterprise workspaces, remixing into a different workspace requires transfer permission: workspace admins and owners always have it, and editors have it when the workspace's [**Editor project transfers**](/features/privacy-and-security-settings#editor-project-transfers) setting is on.
* **Target folder**: Optionally place the copy in a [folder](/introduction/project-folders). Appears when the target workspace has folders.
* **Include project history**: Copies the chat history into the copy so the conversation context is preserved. This option appears when you have edit access to the original.
* **Include custom knowledge**: Copies the project's [knowledge](/features/knowledge). This option only appears when the project has custom knowledge.
* **Region**: For projects on the built-in backend (Cloud), the dialog also asks which region hosts the copy's backend. The region is locked once chosen; see [Region selection](/features/cloud#region-selection).

Some templates ask you to confirm a security acknowledgement before remixing. In that case, the button reads **Acknowledge and remix** instead of **Remix**.

## What carries over

A remix copies what you need to keep building and leaves behind everything tied to the original's identity, like its live URL, its collaborators, its secrets, and its [app users](/features/authentication).

**Carries over to the copy:**

* Your project's code
* Database structure (tables and schema, not the records in them)
* Chat history, if **Include project history** is on
* Custom knowledge, if **Include custom knowledge** is on

**Does not carry over:**

* Database data
* Version history: the copy's History panel starts fresh
* Secrets
* Custom domains
* Publish state: the copy starts unpublished
* Collaborators
* Service connections (Git sync and connectors)

In practice this means the copy is your app's code with a clean slate around it: it gets its own new API keys, and it isn't connected to the original's secrets, domains, GitHub repository, or other services. If your app relies on external services, reconnect them and add their credentials again in the copy before it can use them.

<Note>
  Remixed projects don't carry over subscription-level features unless the target workspace's plan also includes them.
</Note>

## Move a project to another account

Remixing is also the way to move a project between two Lovable accounts, for example when you want your projects under a new email address:

1. If the project is connected to an external [Supabase](/integrations/supabase) project, disconnect it first. The destination account has no edit access to the source project, so a connected project can't be remixed from there. You can reconnect Supabase after the move.
2. In the source account, turn on **Public remixing** in **Project settings → Sharing** and copy the project's link.
3. Sign in to the destination account and open the link.
4. Remix the project into the destination workspace.
5. Turn **Public remixing** off again in the source account if you want the original private.

The copy in the new account follows the normal remix rules: [what carries over](#what-carries-over) is the same, and subscription-level features apply only if the new workspace's plan includes them.

## FAQ

<AccordionGroup>
  <Accordion title="What is the difference between remixing and transferring a project?">
    Remixing creates a second, independent copy and leaves the original untouched. Transferring moves the one existing project to a new owner (**Project settings → Transfer ownership**) or to another workspace (**Project settings → Move workspace**), so there is still only one project. Remix when you want a copy. Transfer when you want to hand over or relocate the original.
  </Accordion>

  <Accordion title="Does the copy stay in sync with the original?">
    No. A remix is a snapshot of the project at the moment you remix it. Changes to the original never flow into the copy, and changes to the copy never affect the original.
  </Accordion>

  <Accordion title="Can I remix a deleted project?">
    No. Deleting a project is permanent, and there is no way to remix or otherwise recover it afterward. If you want a backup, remix the project before deleting it.
  </Accordion>

  <Accordion title="Why can't I remix a project?">
    The most common reasons are:

    * The project is connected to an external Supabase project, and you don't have edit access to the source project.
    * The owner turned off **Public remixing** in **Project settings → Sharing**, so it can't be remixed via its link.
    * The project is in an Enterprise workspace and you don't have permission to move projects out of it.
  </Accordion>
</AccordionGroup>
