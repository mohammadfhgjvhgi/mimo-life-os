> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Cross-project referencing

> Reuse implementations across projects in your workspace, including code, assets, files, and chat history. Maintain consistency and avoid rebuilding the same features.

<head>
  <script type="application/ld+json">
    {`{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Can I reference projects from another workspace?", "acceptedAnswer": {"@type": "Answer", "text": "No. Cross-project referencing only works within the same workspace. Cross-workspace referencing is not supported."}}, {"@type": "Question", "name": "Will referencing a project modify it?", "acceptedAnswer": {"@type": "Answer", "text": "No. All cross-project access is read-only. The referenced project cannot be modified."}}, {"@type": "Question", "name": "Can team members reference my restricted projects?", "acceptedAnswer": {"@type": "Answer", "text": "No. Projects with Restricted visibility can only be referenced by their owner. Team members cannot reference restricted projects, even within the same workspace."}}, {"@type": "Question", "name": "Why can’t Lovable access another project?", "acceptedAnswer": {"@type": "Answer", "text": "If Lovable cannot access a project, check the following: - Verify that cross-project sharing has not been disabled at the workspace or project level. - Make sure both projects are in the same workspace. Cross-workspace access is not supported. - Verify project access. Projects set to Restricted are only accessible to their owner. - Confirm you have permission to access the project. You can only reference projects you have access to. If any of these controls block access, the reference will fail."}}]}`}
  </script>
</head>

Cross-project referencing lets Lovable access and reuse implementations from other projects in your workspace.

When referencing other projects, Lovable can explore file structures, read source code, search for relevant patterns, access related chat history, and reuse or copy assets such as images and fonts. This allows the agent to understand how something was built and recreate or adapt it in your current project.

You can explicitly reference a project using `@` mentions, or simply ask Lovable to use an existing project when relevant. **The referenced projects remain unchanged**.

## How to reference other projects

Type `@` in the chat and select a project, for example:

```text theme={null}
Use the logo and color palette from @BrandSite.
```

Ask Lovable to use an existing project, for example:

```wrap theme={null}
Build this using the same authentication setup as our existing main app.
```

Reference multiple projects in the same prompt. For example:

```text theme={null}
Build this onboarding flow using the auth setup from @MainApp
and the form validation pattern from @ContactApp.
```

Cross-project referencing works when prompting Lovable in [Build mode](/features/agent-mode) and [Plan mode](/features/plan-mode), or when responding in the **questions tool by selecting “Other.”**

You can also add references directly from the prompt box by clicking `+` and selecting **@ Add reference**. When project names are similar or vague, the project picker helps you choose the right one. It shows the full project name, description, and a preview image for each match, the same layout used in the command palette, and you can click the preview image to open that project in a new tab.

<Note>
  Large files or results may be truncated.
</Note>

## What you can reference

You can reuse:

* Components and layout systems
* Animations and styling systems
* Auth flows and API integrations
* Feature implementations
* Assets such as images and fonts
* Relevant chat history for implementation context

All access is read-only and limited to projects within your workspace.

## Permissions and access

Cross-project referencing is restricted by workspace boundaries and sharing settings.

* Only projects within the same workspace can be referenced. Cross-workspace referencing is not supported.
* Any workspace member, including collaborators, can reference any project they have permission to access.
* Cross-project access is read-only. Referenced projects cannot be modified.

## Disabling cross-project sharing

Cross-project sharing can be disabled at different levels:

* **Workspace level:** \
  Workspace admins and owners can disable cross-project sharing for the entire workspace in\
  **Workspace settings → Privacy & security → Cross-project sharing.**
* **Project level:** \
  Project editors and above can disable cross-project sharing for a specific project in\
  **Project settings → Cross-project sharing.** When disabled at the project level, that project cannot reference other projects, and other projects cannot reference it.

If any of these controls block access, the reference will fail.

## FAQ

<AccordionGroup>
  <Accordion title="Can I reference projects from another workspace?">
    No. Cross-project referencing only works within the same workspace. Cross-workspace referencing is not supported.
  </Accordion>

  <Accordion title="Will referencing a project modify it?">
    No. All cross-project access is read-only. The referenced project cannot be modified.
  </Accordion>

  <Accordion title="Can team members reference my restricted projects?">
    No. Projects with **Restricted** visibility can only be referenced by their owner. Team members cannot reference restricted projects, even within the same workspace.
  </Accordion>

  <Accordion title="Why can’t Lovable access another project?">
    If Lovable cannot access a project, check the following:

    * Verify that cross-project sharing has not been disabled at the workspace or project level.
    * Make sure both projects are in the same workspace. Cross-workspace access is not supported.
    * Verify project access. Projects set to **Restricted** are only accessible to their owner.
    * Confirm you have permission to access the project. You can only reference projects you have access to.

    If any of these controls block access, the reference will fail.
  </Accordion>
</AccordionGroup>
