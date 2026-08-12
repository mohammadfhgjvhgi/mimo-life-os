> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# View and edit your project's code

> Open the code editor in Lovable to browse and search your app's source code, make manual edits, reference exact lines in chat, and download your codebase.

Everything Lovable builds is real, standard code, and the **code editor** is where you see it. Open it with the **Code** tab in the [project toolbar](/features/projects/editor#project-toolbar) to browse your project's files, make manual edits, point Lovable at exact files and lines from chat, or download your code.

You never need the code editor to build with Lovable. It's there for when you want to see exactly what Lovable built, make a quick manual tweak, or work alongside a developer.

## Browse and search your files

The left panel shows your project's file structure. Click a folder to expand or collapse it, or use the **Expand all** and **Collapse all** buttons at the top of the panel. Files you open appear as tabs at the top of the code area, so you can keep several open, drag them into a different order, and close them when you're done.

Right-click any file or folder for its menu:

* **Open**: Open the file in the editor.
* **Reference in chat**: Add the file to the chat input as a reference, so your next message points Lovable at it.

To find something across your project, use the **Search code** box at the top of the file panel, or press **Cmd+Shift+F** (Mac) or **Ctrl+Shift+F** (Windows/Linux). Results are grouped into **Files** (matching file names) and **In files** (matching content). To find text inside the open file, press **Cmd+F** (Mac) or **Ctrl+F** (Windows/Linux). On paid plans, the same panel also lets you replace text.

## View a file

While reading a file, the toolbar above it gives you:

* **Preview markdown**: For `.md` and `.markdown` files, click the eye icon to switch between the raw source and rendered text. The preview supports common Markdown formatting, including tables, task lists, links, and code blocks, which makes READMEs and docs easy to read without leaving the editor.
* **Copy file content**: Copy the whole file to your clipboard.
* **Download**: Save the open file to your computer. Available to everyone with project access.

## Edit code

<Note>
  Code editing is available on paid plans. On the Free plan the editor is read-only: you'll see a **Read only** label and an **Upgrade** option.
</Note>

To edit a file, click into it and type, like in any code editor. While you work:

* Save your changes with the **Save** button or **Cmd+S** (Mac) or **Ctrl+S** (Windows/Linux), or throw them away with **Discard**. If you leave the code editor with unsaved changes, Lovable asks you to confirm first.
* Each save becomes a version in your project's [version history](/features/projects/history), so a manual edit is as easy to revert as anything Lovable does.
* Use the format button in the file toolbar to clean up indentation and style.
* While Lovable is working on your project, the **Save** button is disabled until it finishes.

Saved changes apply to your project immediately, just like changes Lovable makes. Lovable doesn't review your manual edits, so if a change breaks something, revert it from [version history](/features/projects/history) or ask Lovable in chat to fix it.

## Reference code in chat

The code editor makes your chat messages more precise:

* **Reference a file**: click the **Reference file in chat** button in the file toolbar, use **Reference in chat** in a file's right-click menu, or type `@` in the chat input:

  ```text wrap theme={null}
  @src/components/UserProfile.tsx add a loading state here
  ```

* **Reference exact lines**: hover over a line number and click the **+** chip to add a file and line reference to the chat input, or drag the chip to reference a range of lines. You can also press **Cmd+Shift+L** (Mac) or **Ctrl+Shift+L** (Windows/Linux) to reference the line or selection at your cursor. References appear as pills like `Button.tsx:42`, and clicking a pill takes you back to that line.

<Tip>
  Pointing at the exact file or line is often faster than describing it. Lovable gets the precise context and doesn't have to search for what you mean.
</Tip>

## Download your project's codebase

You can download your project's full source code at any time. On paid plans, everyone with edit access to the project can click **Download codebase** at the bottom of the file panel to save the entire project as a `.zip` file. To save just one file, use the **Download** button in the [file toolbar](#view-a-file) instead, on any plan.

On Enterprise workspaces, admins can restrict codebase downloads so that only workspace admins and owners can use them. Everyone else sees the **Download codebase** option disabled. See [Privacy and security settings](/features/privacy-and-security-settings#code-downloads).

For ongoing work outside Lovable, connect your project to [GitHub](/integrations/github) or [GitLab](/integrations/gitlab) instead of downloading snapshots. [Git sync](/integrations/git-sync-overview) keeps a repository and your project in sync both ways, so you or a developer can edit in any tool and push changes back.

## FAQ

<AccordionGroup>
  <Accordion title="Do I need to know how to code to use Lovable?">
    No. Lovable writes and manages the code for you, and most people never open the code editor. It's optional, for inspection, quick manual tweaks, and developer collaboration.
  </Accordion>

  <Accordion title="Who can edit code?">
    Opening the code editor requires edit access to the project: project viewers see the app preview only, not the code. Editing and saving files additionally requires a paid plan. On the Free plan the editor is read-only.
  </Accordion>

  <Accordion title="Does editing code use credits?">
    No. Editing and saving code yourself doesn't use credits. Credits are only used when Lovable does work for you in chat. See [Credits and usage](/introduction/credits-and-usage).
  </Accordion>

  <Accordion title="Do my manual edits show up in version history?">
    Yes. Every save from the code editor creates a version in [version history](/features/projects/history), so you can review or revert manual edits the same way as Lovable's changes.
  </Accordion>

  <Accordion title="Can I export all of my code?">
    Yes. On paid plans, anyone with edit access can click **Download codebase** in the code editor to save the project as a `.zip` file.

    You can also sync your project to [GitHub](/integrations/github) or [GitLab](/integrations/gitlab) to get a full repository that stays up to date. Git sync is available on all plans.

    On Enterprise workspaces, admins can restrict `.zip` downloads to workspace admins and owners.
  </Accordion>
</AccordionGroup>
