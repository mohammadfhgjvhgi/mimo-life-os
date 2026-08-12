> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Define reusable instructions with skills

> Define reusable, on-demand workflows for Lovable using workspace skills. Package focused instructions, playbooks, and checklists that Lovable applies whenever a matching task comes up across every project in your workspace.

Skills let you teach Lovable how to handle recurring tasks. Define a skill once at the workspace level, and Lovable can use it across every project in that workspace.

Each skill is a short, named playbook with:

* a name,
* a description that tells Lovable when to use it,
* and markdown instructions that Lovable follows when the skill applies.

You can invoke the skill as a `/` command paired with your prompt, or let Lovable apply it automatically when the task matches.

Skills are portable markdown-based files, so you can inspect exactly what Lovable is being told, share them with teammates, import them from GitHub or ZIP, and improve them over time.

## Skills vs. knowledge

Skills and knowledge complement each other.

* [Knowledge](/features/knowledge) is always included in context. Use it for rules and conventions that apply to everything Lovable does, such as coding standards, brand guidelines, or your project's domain terminology.
* **Skills** are loaded on demand when the request matches. Use them for instructions that only matter for specific kinds of tasks, such as running a release checklist, drafting a customer reply, or producing a particular kind of content.

<Tip>
  If an instruction is relevant on every message, put it in workspace knowledge. If it is only relevant when a specific topic comes up, make it a skill.
</Tip>

Skills are loaded only when relevant, so you can maintain many focused skills without loading them all into every conversation.

## Custom and built-in skills

The Skills page is split into two sections: **Workspace skills** and **Skills built by Lovable**.

**Workspace skills** are custom skills added by your team. They are shared with every project in the workspace and follow the [permission rules](#role-based-access-for-skills) below. Skills you build in chat, write manually, import from GitHub, or upload as a ZIP appear here.

**Skills built by Lovable** are maintained by Lovable and available in every workspace without setup. They cover common tasks, such as accessibility checks, redesigns, SEO reviews, skill creation, and video creation. You can use them when relevant, but you cannot edit, delete, or download them.

Workspace skills and Lovable-built skills appear in the slash menu, can be invoked directly, and can be applied automatically when your request matches the skill.

## What skills are for

Skills work best for repeatable, task-specific workflows. Use them when you want Lovable to handle the same kind of task the same way each time.

Common examples include:

* **Launch checks**: pre-ship checklists, release readiness reviews, and go/no-go reviews
* **Recurring content**: release notes, changelog entries, support replies, and marketing copy
* **Review playbooks**: landing-page reviews, copy reviews, accessibility passes, and search engine optimization reviews
* **Internal processes**: onboarding flow reviews, quality assurance passes, billing setup, and partner handoff steps
* **Task-specific style guides**: tone of voice, brand persona, or formatting rules for a particular kind of content
* **Reusable team workflows**: research routines, document templates, partner integrations, or other repeated team processes

Because skills are shared across the workspace, they are especially useful when you want every project to follow the same process.

## Role-based access for skills

Access to skills follows your workspace and project roles.

| Role                                                                                        | Allowed action                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Workspace owner and admin only                                                              | <ul><li>Create, edit, delete, and import custom workspace skills (from Skills page, chat, GitHub, or ZIP archive)</li><li>Enable or disable automatic use for a custom skill across the workspace</li></ul> |
| <ul><li>Workspace owner, admin, or editor</li><li>Project owner, admin, or editor</li></ul> | <ul><li>View and invoke all skills available to the workspace</li><li>Download custom workspace skills</li></ul>                                                                                            |

On Enterprise plans, skill changes are recorded in your workspace audit log.

## Add a skill

Workspace owners and admins can add custom skills in five ways. Four options are available from **Settings → Skills → Add**, and one starts from a project chat after Lovable does something you want to reuse.

### Build with Lovable

Choose **Add → Build with Lovable** to start a guided skill-building conversation. Lovable opens the dashboard with a starter prompt:

```text wrap theme={null}
Help me create a skill together using /skill-creator. First ask me what the skill should do.
```

Send the prompt, then answer Lovable’s questions about what the skill should do, when it should trigger, and what instructions it should follow. Lovable drafts the skill for you. When you approve the draft, the skill is published to your workspace.

### Write manually

Choose **Add → Write manually** to write a skill from scratch.

The form has three fields:

* **Name**: a short, permanent ID like `launch-checklist` or `support-reply`. Use lowercase letters, numbers, and hyphens only.
* **Description**: the trigger Lovable uses to decide when to load the skill. Start with “Use when...” and describe the skill’s scope and boundaries.
* **Content**: the instructions Lovable follows once the skill is loaded, such as steps, constraints, examples, and the expected output.

Click **Add skill** to publish it. The skill is available across the workspace immediately.

For field requirements, naming rules, and description examples, see [Anatomy of a skill](#anatomy-of-a-skill).

### Import from GitHub

Choose **Add → Import from GitHub**, and paste a public GitHub repository URL.

Lovable supports two GitHub URL formats:

* **Whole repository**: `https://github.com/owner/repo`\
  Use this when the repository contains one skill. The `SKILL.md` file must be at the root of the repository.
* **Subdirectory**: `https://github.com/owner/repo/tree/<branch>/path/to/skill`\
  Use this when a single repository contains multiple skills. The linked directory must contain `SKILL.md` directly. A direct file URL also works:
  ```text theme={null}
  https://github.com/owner/repo/blob/<branch>/path/to/SKILL.md
  ```
  When you use a `blob` URL, Lovable imports the parent folder that contains `SKILL.md`.

Lovable downloads the repository, validates it, and adds the skill to your workspace.

### Upload a ZIP

Choose **Add → Upload ZIP**, and drag in or browse for a `.zip` or `.skill` file. The archive must contain a `SKILL.md` file either at the root or inside one wrapping folder. Any bundled files referenced by the skill should sit alongside `SKILL.md` in the same directory.

Uploaded archives can be up to **50 MB**. Each individual bundled file can be up to **1 MB**, and the full skill package can include up to **200 files** totaling **10 MB**. macOS metadata files, such as `__MACOSX/` and `.DS_Store`, are ignored at the root.

**Example: importing a skill from Claude**

Skills in Lovable use the same `SKILL.md` shape as Anthropic’s Claude and any other tool that follows the Agent Skills convention. If you already built a skill in Claude, export it as a `.skill` or `.zip` file, then upload it in Lovable from **Settings → Skills → Add → Upload ZIP**.

Lovable validates the archive and publishes the skill to your workspace with its name, description, instructions, and bundled files intact. From there, it behaves like any other workspace skill.

This works in the other direction too: download any custom skill from Lovable as a `.zip`, then upload it into another tool that supports the same `SKILL.md` shape.

### Save from a project chat

You can turn a successful project chat interaction into a reusable skill without leaving the project. After Lovable completes a task the way you want, say “save that as a skill” and describe when the skill should apply.

Lovable drafts the skill, including a name, description, and instructions, then shows it in chat for you to review. When you approve the draft, the skill is published to your workspace.

## Use a skill

Lovable can use skills in two ways: automatically, or when you invoke one directly.

### Let Lovable choose automatically

When your request matches a skill’s description, Lovable can apply that skill automatically. You do not need to do anything special. Just describe what you want.

You can keep many skills in the same workspace. Lovable only loads the skills that seem relevant to the current request. A `launch-checklist` skill, for example, only applies when someone tells Lovable they are about to ship. It does not affect unrelated work.

<Note>
  If a workspace admin has disabled automatic use for a skill, Lovable will not apply it automatically, even when the task matches. You can still invoke the skill manually with a slash command (`/skill-name`). See [Enable or disable automatic use](#enable-or-disable-automatic-use) for details.
</Note>

### Invoke a skill directly

Type `/` in chat, choose a skill from the menu, and then continue typing your request. The skill appears as a tag at the start of your message, telling Lovable which instructions to apply.

Think of the skill as the **how** and your prompt as the **what**.

For example, with a `launch-checklist` skill in your workspace, you could send:

```text theme={null}
/launch-checklist Review the app for launch blockers before Friday’s release.
```

The slash menu filters as you type and shows each skill’s description on hover, so you can confirm you are choosing the right one.

After you send the message, the skill appears as a tag in the chat. Hover over the tag to see its description, click it to open the full skill preview, or use the pencil icon in the preview to open that skill’s settings.

<Note>
  Skills with automatic use disabled still appear in the slash menu and can be invoked directly with `/skill-name`. Disabling automatic use only prevents Lovable from applying the skill on its own; it does not hide the skill or block manual invocation.
</Note>

## Manage your skills

Use **Settings → Skills** to manage workspace skills. You can also open **Project settings → Skills** while working in a project. The available actions depend on your role. See [Role-based access for skills](#role-based-access-for-skills).

### Edit or delete a skill

Go to **Settings → Skills** to see every skill in your workspace. Open a custom skill to edit its description or instructions, or delete it if you no longer need it.

Deleting a skill removes it from the workspace and from every project in that workspace.

### Download a skill

Open any custom skill in **Settings → Skills** and click **Download** to export the full skill package as a `.zip`.

Use downloads to back up a skill, move it to another workspace, share it with a teammate to edit offline, or upload it into another tool that supports the same `SKILL.md` shape, such as Claude.

### Enable or disable automatic use

Every custom workspace skill has **Automatic use** enabled by default. When automatic use is enabled, Lovable can apply the skill automatically whenever the task matches, and you can also invoke it manually with a slash command (`/skill-name`).

When automatic use is disabled, Lovable does not apply the skill on its own in any project, even when the task matches. The skill stays available to the workspace. It appears in the slash menu, and you can invoke it manually with a slash command.

Workspace owners and admins can enable or disable automatic use for a skill from **Settings → Skills**, or from **Project settings → Skills** while working in a project. The setting applies across the entire workspace.

## Anatomy of a skill

Each skill has three required parts.

* **Name**: a short, permanent identifier for the skill, between 1 and 64 characters. Use lowercase letters, numbers, and hyphens only, for example, `launch-checklist`, `release-notes`, or `support-reply`. Names cannot start or end with a hyphen, and cannot contain consecutive hyphens. The name cannot be changed after creation. To rename a skill, delete it and create a new one.
* **Description**: a short sentence that tells Lovable when to use the skill. Start with “Use when...” and describe the trigger as concretely as possible. The description is the main signal Lovable uses to decide whether to load the skill for a message.
* **Instructions**: the markdown body Lovable follows once the skill is loaded. Include the steps, constraints, examples, edge cases, and output format Lovable should follow.

A good rule of thumb is to write the instructions you would give a new teammate doing the task for the first time: what to do, what to avoid, what to watch for, and what format to return.

The full `SKILL.md` file can be up to **100,000 characters**.

### Bundled files

A skill can also include bundled files. These are optional extra files that travel with the skill. Use bundled files for longer references, templates, or small scripts that the instructions point to, such as `reference.md`.

Bundled files appear in the **Bundled files** list when you expand the skill, and they are included when you download or import the skill. Skills authored in chat usually do not need bundled files. They are most common for skills imported from GitHub or a ZIP.

Each bundled file can be up to **1 MB**. A skill can include up to **200 files** and up to **10 MB** total across all files.

### Write clear skill descriptions

A well-written description is the most important part of a skill. The description tells Lovable when to load the skill.

If the description is vague, Lovable may not load the skill when you expect it to, or may load it for unrelated tasks. Good descriptions define both when the skill should apply and when it should not. Clear boundaries help Lovable load the right skill consistently without pulling it into unrelated tasks.

**Too vague**

```text wrap theme={null}
description: Helps with SEO.
```

This description does not clearly tell Lovable when to use the skill, what kind of SEO task it applies to, or what it should actually do.

**Specific and scoped**

```text wrap theme={null}
description: Use when auditing SEO health on an existing page: checking metadata, heading structure, and internal links. Not for writing new SEO copy from scratch.
```

This description names:

* the trigger (auditing an existing page),
* the scope (checking metadata, headings, internal links),
* and the boundary (not for writing new copy).

Well-scoped descriptions make skills load more consistently and reduce conflicts between similar skills.

### Example skill

Here is a complete example of a pre-launch checklist skill that runs whenever you tell Lovable you are about to ship:

**Name**

```text wrap theme={null}
launch-checklist
```

**Description**

```text wrap theme={null}
Use when I say I'm about to launch, ship, share, or release a project, or when I ask whether it is ready to go live. Run the checklist below before giving a go/no-go.
```

**Instructions**

```markdown wrap theme={null}
Launch checklist

Before approving the launch, walk through this checklist and report back on each item with pass, fail, or "needs manual check". Do not skip ahead.

Account flows
- Sign-up, sign-in, sign-out, and password reset are wired up end to end.
- Signed-out users cannot reach pages that require an account.
- Signed-in users land on the right page after login.

Core surfaces
- The home page and every primary route render without console errors.
- Every list, table, or feed has a real empty state, not "No data".
- Long-running actions show a loading state and surface errors with a retry path.
- At mobile width (375px) there is no horizontal scroll and primary actions are reachable.

Data and permissions
- Database tables that hold user data have row level security enabled.
- A user in one account cannot read or write another account's data. Flag this as "needs manual check". Ask me to verify with a second test account before launch.
- Destructive actions (delete, cancel, refund) ask for confirmation.

Content and trust
- App name, favicon, social preview image, and meta description are set.
- Footer links to a working privacy policy and terms page.
- No placeholder copy left in the UI ("Lorem ipsum", "TODO", "Your headline here").

Environment
- No dev URLs, localhost references, or test API keys (for example, Stripe `sk_test_*`) in production code.
- Required production environment variables and secrets are set.
- Analytics or product events fire on the actions you want to measure.

Final step
- Summarize anything that failed or needs a manual check, in priority order.
- Do not say "ready to launch" unless every item above passes or has been explicitly waived.
```

This skill could also include [bundled reference files](#bundled-files) alongside `SKILL.md`.

For example, the launch checklist could keep deeper search engine optimization and accessibility verification steps in separate bundled files instead of putting everything directly into `SKILL.md`.

```text theme={null}
launch-checklist/
├── SKILL.md
├── seo-checklist.md
└── accessibility-checklist.md
```

## Best practices

* **Lead with the trigger.** Start the description with “Use when...” and describe the request as concretely as you can. The description is how Lovable decides whether to load the skill.
* **Give each skill one job.** A skill that tries to cover too much may load in the wrong situations or fail to give Lovable clear guidance. Split broad guidance into focused skills, and let each one own a specific task.
* **Include boundaries and “avoid” sections.** Telling Lovable what not to do is often as important as telling it what to do. Strong skills define both the intended behavior and the behaviors to avoid.
* **Put always-on rules in knowledge instead.** If a rule should apply to every message, it belongs in workspace knowledge. Skills are for behavior that only matters in specific situations.
* **Write the instructions like a short playbook.** Use short sections, bullet points, and direct instructions. Skills become part of the context Lovable reads, so shorter, focused instructions are easier to follow.
* **Show, do not just tell.** Where helpful, include concrete values, example copy, or example outputs. Lovable follows specific instructions more reliably than abstract ones.
* **Review and prune.** As your workspace grows, retire skills that are no longer needed. A skill with stale or incorrect instructions is worse than no skill at all.

## FAQ

<AccordionGroup>
  <Accordion title="What is the character limit for a skill?">
    The full `SKILL.md`, including the description and instructions, can be up to 100,000 characters. Names are limited to 64 characters. A skill can also include bundled files alongside `SKILL.md`: each file can be up to 1 MB, and a skill can contain up to 200 files totaling 10 MB.
  </Accordion>

  <Accordion title="Can I rename a skill?">
    No. The name is set when the skill is created. To rename a skill, delete it and create a new one with the desired name. The description and instructions can always be edited.
  </Accordion>

  <Accordion title="Are skills shared across projects?">
    Yes. Every skill defined in a workspace is available to every project in that workspace. Workspace owners and admins can disable automatic use for a skill across the workspace without deleting it, so Lovable will not apply it on its own but workspace members can still invoke it manually with a slash command (`/skill-name`).
  </Accordion>

  <Accordion title="Can I disable automatic use for a skill?">
    Yes. Open **Settings → Skills** or **Project settings → Skills**, expand the skill, and switch off the **Automatic use** toggle. This applies across the workspace. Lovable will not apply the skill on its own in any project, even when the task matches, but workspace members can still invoke it manually with a slash command (`/skill-name`). Re-enable automatic use at any time from the same place.
  </Accordion>

  <Accordion title="How does Lovable decide when to use a skill?">
    Lovable reads the description of each skill and decides whether the skill is relevant to your current request. Clear, specific descriptions produce more reliable behavior. If a skill is not triggering when you expect, rewrite the description to be more explicit about the kind of request it applies to.
  </Accordion>

  <Accordion title="What is the difference between a skill and knowledge?">
    [Knowledge](/features/knowledge) is always included as background context for Lovable. Skills are loaded on demand when the request matches the skill's description. Use knowledge for rules that apply to every message, and skills for instructions that only matter for specific kinds of tasks.
  </Accordion>

  <Accordion title="Can more than one skill apply to the same request?">
    Yes. Lovable can use more than one skill in a single message. Keep skills focused so that overlapping skills combine cleanly rather than contradicting each other.
  </Accordion>

  <Accordion title="Do skills cost credits?">
    There is no additional skill-specific cost. Credits are tied to chat messages, not to skills themselves.

    * **Creating a skill from chat** (Build with Lovable or "save that as a skill"): costs standard credits, because it is a chat conversation.
    * **Adding a skill from Settings** (Write manually, Import from GitHub, or Upload ZIP): free. Settings actions do not consume credits.
    * **Using a skill**: no extra cost on top of the chat message. Standard credits apply to the message, based on its complexity. A skill may indirectly affect cost if the instructions it loads lead Lovable to do more work.
  </Accordion>

  <Accordion title="Where are skills stored?">
    Skills are stored in your workspace. On Enterprise plans, every edit and deletion is also recorded in the workspace audit log.
  </Accordion>

  <Accordion title="Can I move a skill between workspaces?">
    Yes. Download the skill as a `.zip` from one workspace, then import the ZIP into another. The imported skill arrives with the same name, description, and contents.
  </Accordion>

  <Accordion title="Can I download Lovable's built-in skills?">
    No. Only the skills you have added to the workspace can be downloaded. Lovable-built skills are read-only and managed by Lovable.
  </Accordion>
</AccordionGroup>
