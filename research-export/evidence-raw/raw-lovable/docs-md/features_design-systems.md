> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Design systems

> Create reusable design systems in Lovable to standardize React component libraries, styling guidelines, and setup across enterprise projects.

<head>
  <script type="application/ld+json">
    {`{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is a design system just a Lovable project?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, a design system is a regular Lovable project that is marked as a design system. It can be opened and edited like any other project, and other projects can connect to it. If the design system wraps an external npm package, the package itself isn't editable from Lovable, only the wrapper layer in the design system project is. Changes to the underlying components have to be made in the upstream npm package and republished there."}}, {"@type": "Question", "name": "Can I connect more than one design system to a project?", "acceptedAnswer": {"@type": "Answer", "text": "No. A project can be connected to at most one design system at a time. To switch, remove the current one first: open the Design system section in Project settings → General, then choose ⋯ → Remove on the connected one."}}, {"@type": "Question", "name": "Can any project be turned into a design system?", "acceptedAnswer": {"@type": "Answer", "text": "No. A design system is created as its own dedicated project from the Create design system flow (the + menu, then Design systems). An existing project can't be converted into one. Once created and released, it becomes available for other projects in the workspace to connect to."}}, {"@type": "Question", "name": "How do I see which design system is connected to my project?", "acceptedAnswer": {"@type": "Answer", "text": "Select the project name in the top bar and choose Design system, or go to Project settings → General and open the Design system section. It shows the connected design system and opens a dialog to browse and attach available ones."}}, {"@type": "Question", "name": "Are design systems versioned?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Every release bumps the version. Connected projects record the version they were last attached at, and an Update available prompt appears in the chat whenever a newer version is released."}}, {"@type": "Question", "name": "What is the difference between a released and a draft design system?", "acceptedAnswer": {"@type": "Answer", "text": "A draft design system exists as a project but has not been released yet, so it has no schema or rendered documentation. You cannot use a draft design system as the basis for a new project. Release it first. Once released, the design system gets a version number and becomes selectable in the design system picker."}}, {"@type": "Question", "name": "Can I remove a design system from a project?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. In Project settings → General, open the Design system section, then choose ⋯ → Remove on the attached design system and confirm. This severs the managed link: your project stops receiving updates from that design system, and the agent no longer follows its rules. The component files stay under src/design-system as ordinary, editable code, so nothing already using them breaks; they are now yours to maintain."}}, {"@type": "Question", "name": "Can I edit the design system from a connected project?", "acceptedAnswer": {"@type": "Answer", "text": "The design system's source and documentation are managed by the design system project. The files in src/design-system// and .lovable/rules/libraries// are present in a connected project's git, so you can read and import them, but local edits will be replaced the next time you accept an update. For permanent changes, propose them in the design system project."}}, {"@type": "Question", "name": "Do I need to publish my design system to npm?", "acceptedAnswer": {"@type": "Answer", "text": "No. Design systems are an in-Lovable feature. Components and documentation flow directly between your Lovable projects. If you also want to publish your design system to a public npm or a private registry for use outside Lovable, that's a separate flow."}}, {"@type": "Question", "name": "What's the difference between a from-scratch and an npm-wrapper design system?", "acceptedAnswer": {"@type": "Answer", "text": "A from-scratch (local) design system holds its component source directly in the design system project. Lovable reads tokens and components from that source when you release. An npm-wrapper design system wraps an external npm package: Lovable reads the component surface from the package's published type definitions, and the project holds only a thin wrapper layer. For a public npm package nothing extra is needed. For a package on a private registry, the package must be scoped (@scope/name) and you add a scoped .npmrc backed by a workspace build secret so both releasing and connected projects can authenticate."}}, {"@type": "Question", "name": "What technologies do design systems support?", "acceptedAnswer": {"@type": "Answer", "text": "Lovable design systems support React-based component libraries out of the box. The design system declares its required stack and dependencies through its schema, and Lovable adapts the setup automatically. Your library determines what gets wired up, not a fixed list of supported frameworks. If your design system is built with other frameworks such as Vue, Angular, or Svelte, reach out to your CSM or FDE."}}, {"@type": "Question", "name": "Why does the agent sometimes make extra edits right after I attach a design system?", "acceptedAnswer": {"@type": "Answer", "text": "When you attach a design system, Lovable runs an automatic setup verification pass to check that the design system is wired up correctly (configuration, CSS imports, theme providers, dependencies, and import paths). If the agent finds gaps, it applies fixes and reruns verification. Successful verifications are silent and do not appear in the chat. Verification turns are billed at zero credits."}}, {"@type": "Question", "name": "Do design systems replace templates?", "acceptedAnswer": {"@type": "Answer", "text": "No, design systems do not replace templates. Templates and design systems serve different purposes and are often used together. Templates are best for initial project scaffolding, while design systems provide ongoing UI and design guidance across projects."}}, {"@type": "Question", "name": "React version mismatch", "acceptedAnswer": {"@type": "Answer", "text": "If your design system uses React 19 but the project defaults to React 18, or vice versa, tell Lovable explicitly. For example: My design system requires React 19. Please update the project dependencies accordingly."}}, {"@type": "Question", "name": "Conflicting dependencies", "acceptedAnswer": {"@type": "Answer", "text": "If your design system uses a different styling solution than the project's defaults, ask Lovable to remove the conflicting dependencies. For example: Please uninstall the project's default styling dependencies. My design system uses [your styling solution] instead."}}, {"@type": "Question", "name": "Preview looks broken right after connecting", "acceptedAnswer": {"@type": "Answer", "text": "Setup verification usually catches this and fixes the wiring automatically. If something still looks off, open the chat in the connected project and ask Lovable to verify the design system is wired up correctly. It will rerun the check and propose fixes."}}, {"@type": "Question", "name": "Lovable is not using the components I expect", "acceptedAnswer": {"@type": "Answer", "text": "The adherence scanner catches most violations automatically. If it misses something, point it out in the chat, for example by asking Lovable to use the Button from the design system, not a custom one. Lovable will replace the local implementation with the design system component."}}, {"@type": "Question", "name": "Release fails: private package needs a scoped registry", "acceptedAnswer": {"@type": "Answer", "text": "Your design system wraps a package on a private registry, but Lovable has no recorded way to authenticate to it. Make sure the package is scoped (@scope/name) and add the registry and auth lines for that scope to .npmrc, backed by a workspace build secret. Add the NPM_TOKEN secret under Workspace settings → Build secrets, then release again."}}, {"@type": "Question", "name": "Release fails: registry auth failed or package not found", "acceptedAnswer": {"@type": "Answer", "text": "The upstream package could not be fetched. Confirm the build-secret token can read the package, that the package name and scope are correct, and that the .npmrc registry line points at the right host. For the Lovable-managed registry, make sure the workspace's managed npm registry is enabled in workspace settings. Then release again."}}, {"@type": "Question", "name": "Release fails: the package ships no typed exports", "acceptedAnswer": {"@type": "Answer", "text": "A wrapped npm package is read through its published type definitions. If the upstream package ships no .d.ts types or exports map, there is nothing to extract. Wrap a package that ships types, or build the components as a local (from-scratch) design system instead."}}, {"@type": "Question", "name": "Release does nothing or reports an empty design system", "acceptedAnswer": {"@type": "Answer", "text": "Lovable could not identify any tokens or components in the project. For a local design system, check that tokens live in a top-level styling file (CSS variables, tailwind.config, or a theme/tokens file) and that components are exported from src/index.ts or live under src/components/. Ask Lovable to run the design system discovery step, then release again."}}]}`}
  </script>
</head>

<Info>
  Lovable design systems are available on **Enterprise plans** and work natively with design systems
  that are implemented as React components.
</Info>

**Design systems** let you define your component library, styling guidelines, and installation
instructions once, and reuse them across every project in your workspace. When a design system is
connected to a project, components, rules, and updates flow from the design system project into
every project connected to it.

In Lovable, a design system is created as a **dedicated project**. This project serves as the source
of truth for your design system and can be connected to other projects in your workspace.

### What you get

* Centralized source of truth for UI components, tokens, and styles
* Your library's React components delivered directly into every connected project, ready for use
* One-click updates: when you release a new version, connected projects see an **Update available**
  prompt in the chat
* Automatic setup verification after every connect or update — Lovable checks the wiring (build
  config, CSS imports, theme providers, dependencies) and fixes anything missing
* Adherence enforcement during ongoing work: Lovable catches raw colors, custom or customized components, and
  other deviations from your design system

## How design systems work

A design system in Lovable defines how components, styles, and setup instructions are applied across
projects. Design systems *are* Lovable projects and can be opened and edited like any other
project.

### What a design system consists of

A design system in Lovable combines three core parts:

1. **Components**: your React component library
2. **Schema and guidelines**: a machine-readable schema (tokens, component catalog, constraints)
   plus rendered documentation Lovable reads on every generation
3. **Installation**: setup instructions and required configuration

If you already have these in place, you can create a **design system project** in Lovable and
reference your existing materials. If your documentation is scattered or incomplete, you can create
and improve the design system directly inside Lovable.

### The design system project and the `.lovable` folder

The design system project owns a special `.lovable` folder. When you release your design system,
Lovable generates the following:

* `design-system.json`: the standardized, machine-readable schema, including tokens, component catalog
  (variants, props, examples), and stack constraints. This is the source of truth.
* `rules/components.md`: component catalog, rendered from the schema.
* `rules/design-tokens.md`: token reference, rendered from the schema.
* `rules/library-guidelines.md`: stack requirements and usage rules, rendered from the schema.
* `system.md`: high-level installation instructions and design philosophy. This file is preserved across
  releases, meaning that Lovable does not regenerate it from the schema.

You can edit `system.md` through the Knowledge tab in the project settings or by chatting with Lovable
directly. The other files are regenerated on every release.

### How design systems are applied to projects

When a project is connected to a design system, Lovable performs a **file-copy attach**:

* The design system's React components are copied into the connected project at
  `src/design-system/<design-system-slug>/`. Lovable imports components from there.
* The design system's `.lovable` knowledge files (schema, rendered rules, and `system.md`) are
  copied to `.lovable/rules/libraries/<design-system-slug>/`. Lovable reads them on every
  generation.
* Required runtime dependencies are merged into the connected project's `package.json`.
* A `[[libraries]]` entry in `lovable.toml` records which design system is connected and at what
  version.

The components are then ordinary local, readable, and usable React resources in the connected project.
Avoid editing them: local edits are replaced the next time you accept an update
from the design system. If you need permanent changes, propose them in the relevant design system
project.

### Updates

When you release a new version of your design system, every connected project sees an **Update
available** prompt in the chat. Accept the update and Lovable reruns the *file-copy attach* against the
new version: old design system files are removed, new ones are copied in, dependencies are
remerged, and setup verification reruns. The connected project's own code is untouched.

### Setup verification

After a design system is attached to a project (either at project creation or in an existing project),
the agent runs a silent verification pass to confirm that the design system is wired up correctly.
This pass checks that:

* Your build pipeline picks up the design system's source folder, and does not fail.
* The design system's styling entry is imported wherever your project loads styles.
* Any wrapper components or providers the design system requires are in place at the appropriate
  scope.
* All required dependencies are declared in `package.json`.

If everything is correctly wired up, the verification leaves no trace in the chat. If anything is missing,
Lovable corrects it in a follow-up generation and reruns the check, until everything is in place or
a short checklist of what couldn't be fixed surfaces in the chat.

<Note>
  Setup verification turns are billed at **zero credits** and do not count toward your workspace usage.
</Note>

### Adherence checks

While you're working in a connected project, every generation is scanned for violations of the
design system:

* Raw color literals where a design system token should be used
* One-off values that bypass the design system's tokens or scale
* Inline styles that override the design system's defaults
* Local component implementations for things that should come from the design system

When violations are found, Lovable automatically retries to correct them before finishing the
generation.

### Key notes and limitations

* The `.lovable` folder is owned by the design system project and cannot be edited from connected
  projects.
* Connected projects record the version of the design system they were last attached at. Updates
  apply when accepted from the chat prompt.
* Lovable design systems work natively with React component libraries.
* A design system is created as its own dedicated project from the **[Create a design system](#create-a-design-system)** flow.
* An unreleased design system cannot be used as the basis for a new project. Create an initial release first.
* A project can be connected to at most one design system at a time. To switch, remove the current
  one first: open the **Design system** section in **Project settings → General**, then choose
  **⋯ → Remove** on the connected one.
* Removing a design system severs the managed link: the project stops receiving updates and the
  agent no longer enforces its rules. The copied files stay under `src/design-system/` as ordinary,
  editable code, so nothing using them breaks; they are now yours to maintain.
* If your design system or related documentation is hosted within your VPC, reach out to your
  account team for guidance.
* Design systems are supported for React. Other frameworks such as Vue, Angular, or Svelte are not
  supported today, so your mileage may vary. Reach out to your CSM or FDE if you need them.
* New projects created from a design system currently scaffold on a TanStack template, even when the
  design system is a Vite/React one, and the styling framework is not always wired into the build
  automatically. A consumer that uses Vite can pull in Tailwind 3, which conflicts with Tailwind 4.
  When this happens, Lovable's setup verification usually corrects the wiring on the first
  generation; if styles still look wrong, ask Lovable in the connected project to wire up the design
  system's styling framework. Deterministic scaffolding and styling setup are known limitations
  being improved.

## Create a design system

<Steps>
  <Step title="Prepare access (private packages only)">
    If your component library or packages are private, go to **Workspace settings → Build
    secrets** and add the required [build secrets](/features/build-secrets) (for example, npm tokens).
  </Step>

  <Step title="Create a design system project">
    From the `+` dropdown of the [lovable.dev](https://lovable.dev) prompt box, select **Design**
    and select **Use a design system**.

    In the modal, select **Create design system**.

    This creates a new design system project. Lovable assigns a name to your project, which you
    can change from the project settings.

    Give your design system a meaningful name. This name is used when connecting the design
    system to projects later.
  </Step>

  <Step title="Configure the design system by chatting with Lovable">
    You can set up your design system in two main ways.

    **Option A: Bring an existing library**

    Tell Lovable in chat how your design system is distributed:

    * **An npm package**: give the package name. Public packages are fetched
      automatically; for a private package, add its npm token under **Workspace
      settings → Build secrets** first.
    * **A public Git repository**: share the repository URL and Lovable imports the
      components from it.
    * **A private repository, or loose files**: there is no private-repository
      fetch. Clone the repository yourself (or export the files) and upload them,
      and Lovable integrates them.

    Once imported, Lovable extracts a schema from your component source on release:
    variants, props, and examples are captured automatically. For usage context the
    schema can't infer (design philosophy, narrative usage rules, installation
    quirks), edit `system.md` via the Knowledge tab in project settings or by
    chatting with Lovable directly.

    <Info>
      When bringing an npm package or a public repository, you can skip the guided
      questions and just give the package name or repository URL.
    </Info>

    **Option B: Build your design system with structured instructions**

    If your documentation is scattered or incomplete, guide Lovable explicitly to build your
    design system. This approach lets you:

    * Import PDFs, Markdown files, screenshots, and other assets
    * Define components, patterns, tokens, and styling guidelines
    * Write installation and setup instructions
    * Update everything dynamically across connected projects

    **Suggested prompt structure**

    ```
    [High-level goal]

    [Install instructions]

    [Other context for setting up the system, for example tech stack and constraints]

    [Component library request]

    [Links to documentation, sites, PDFs, MCPs for more context. Lovable can crawl websites so
    feel free to include wide context here.]
    ```

    After the first run, Lovable will generate a working design system project, for example:
    [https://design-system-demo.lovable.app/](https://design-system-demo.lovable.app/)
  </Step>

  <Step title="Release the design system">
    Select **Release version** in the design system project. Lovable generates the schema, renders the
    documentation, bumps the version, and commits everything to the design system project's repository.
    The design system is now selectable when creating new projects or attaching to existing ones.

    Re-release whenever you want to push updates to connected projects.
  </Step>
</Steps>

## Prepare your library to release cleanly

How a design system releases depends on where its components come from. There
are two paths, each with its own prerequisites:

* **Local source (Path A)**: the component source lives in the design system
  project itself, whether built in Lovable, imported from a public Git
  repository, or uploaded by you. Releasing reads tokens and components straight
  from that source.
* **npm wrapper (Path B)**: the design system wraps an external npm package.
  Releasing reads the component surface from the package's published type
  definitions, and the project holds only a thin wrapper layer.

Lovable records the path when the project is created and uses it to build the
schema on release. Get the prerequisites below right, and release, attach, and
adherence all work without manual cleanup.

### Local source (Path A)

A local design system releases cleanly when Lovable can find your tokens and
components:

* **Tokens** are discovered from top-level styling files: CSS custom properties
  in files like `src/index.css` or `src/styles/tokens.css`, a `tailwind.config`,
  or a `theme`/`tokens` source file. Component-local stylesheets buried deeper in
  the tree are not treated as the token source.
* **Components** are discovered from a barrel (`src/index.ts` or `src/index.tsx`)
  when one exists, otherwise from the files under `src/components/`.
* **`system.md`** carries everything the schema can't infer: design philosophy,
  narrative usage rules, and installation quirks. Author it by hand; releasing
  never overwrites it.

<Info>
  When you build a from-scratch design system with structured instructions, you
  can seed it with uploads (PDFs, Markdown, screenshots, and other assets).
  Lovable interprets these on a best-effort basis. There is no guarantee that
  every file or format is turned into working components or tokens, so review the
  generated schema and components after the first run and iterate where the
  result isn't what you expected.
</Info>

### npm wrapper (Path B)

A wrapper design system releases cleanly when the upstream package and the
wrapper are both in good shape:

* **The upstream package must ship typed exports** (a `.d.ts` entry or an
  `exports` map). Releasing reads the component surface from those types. A
  package that ships no types has nothing to extract, and the release fails.
* **Keep `src/` near-empty.** With a wrapper, the real components come from the
  npm package, so the project only needs thin wrapper or provider files.
  Everything in `src/` that isn't excluded is copied into connected projects, so
  extra scaffolding in `src/` becomes noise in every consumer.

The wrapper itself splits into two cases depending on where the upstream package
is hosted.

#### Public npm package

If the upstream is published to the public npm registry, nothing else is
required: the design system just needs to be marked as wrapping that package
name. Releasing fetches the package from the public registry.

#### Private registry package

If the upstream lives on a private registry (for example GitHub Packages or a
self-hosted registry), two things are required so that both releasing and the
connected projects can install it:

* **The package must be scoped** (`@scope/name`).
* **A scoped `.npmrc` backed by a workspace build secret.** Add the registry and
  auth lines for the scope, for example:

  ```text theme={null}
  @scope:registry=https://your-registry.example.com
  //your-registry.example.com/:_authToken=${NPM_TOKEN}
  ```

  `NPM_TOKEN` references a token stored under **Workspace settings → Build
  secrets**. You can provide the registry URL and secret when you create the
  design system (Lovable writes the `.npmrc` for you) or author the `.npmrc`
  lines yourself. Without recorded auth for a scoped private package, releasing
  stops and asks you to add these lines, because the same configuration is what
  lets connected projects authenticate on attach.

<Note>
  This also covers packages you publish to your own private registry, including
  the Lovable-managed workspace registry (see [Managed registry](/features/managed-registry)). When the registry is set up and your
  package is published there, wrap it by name like any other scoped private
  package.
</Note>

### What gets copied to connected projects

Attach copies only two parts of the design system project into each connected
project: your component source under `src/`, and your `.lovable/` knowledge
files. A few things are excluded by default so they don't leak into consumers:

* **Showcase and demo pages.** Anything under `src/pages/` or `src/routes/`, and
  any `*.stories.ts`/`*.stories.tsx` file, is excluded. Put your showcase there
  so you can preview the library without shipping the preview app to every
  consumer.
* **Tests and scaffold entrypoints** (`src/main.tsx`, `src/App.tsx`, test files,
  and similar) are excluded too.
* **Knowledge files** live in `.lovable/rules/*.md` and are always propagated.
  Knowledge is never excluded.

You can adjust the exclusions with a `.dsignore` file at the project root, which
uses gitignore syntax and layers on top of the defaults. Use it to exclude extra
internal files, or to re-include something a default would otherwise drop.

## Connect a design system to projects

<Note>
  A project uses one design system at a time. You can remove it later from the **Design system**
  section in **Project settings → General** (open it, then **⋯ → Remove** on the connected one):
  this severs the managed link and leaves the copied files under `src/design-system/` as ordinary,
  editable code (nothing using them breaks, but they are no longer managed or updated).
</Note>

In each project's settings, you can see which design system is connected and which ones are
available to connect.

### Connect a design system to new projects

From the `+` dropdown of the [lovable.dev](https://lovable.dev) prompt box, go to **Design**
and select **Use a design system**, select the design system you want to use, then enter your prompt. Lovable
generates your new project using the selected design system.

<Note>
  Only released design systems are available for selection. If the design system you want to use is
  marked as **Draft**, open the design system project and release it first.
</Note>

### Connect a design system to existing projects

To connect a design system to an existing project, follow the steps below:

1. Select the project name in the top bar and choose **Design system** (or open **Project settings → General** and find the **Design system** section).
2. Click **Attach design system** to open the design-system dialog in the editor.
3. Select a design system from the grid.

Lovable copies the design system's components and knowledge files into your project, merges
dependencies, and runs setup verification automatically.

## Refine your design system

Design systems are meant to evolve. After the initial setup, iterate on the contents of the
`.lovable` folder and your component source.

1. **Check the structure**\
   Open the `.lovable` folder to see how Lovable generated your schema and documentation. These
   files are what gets applied to all connected projects on the next update.
2. **Fix inconsistencies**\
   If components do not render correctly, ask Lovable to fix them and update the schema at the same
   time. Re-release to push the fix to connected projects.
3. **Add detail**\
   Request additional component documentation, token definitions, or usage patterns as needed. Each
   release bumps the version and notifies connected projects of an available update.

## `.lovable` folder structure

Lovable generates this automatically when you release.

In the **design system project**:

```
.lovable/
├── design-system.json          # canonical schema (tokens, components, constraints)
├── system.md                   # high-level installation instructions, hand-authored
└── rules/
    ├── components.md           # rendered from design-system.json
    ├── design-tokens.md        # rendered from design-system.json
    └── library-guidelines.md   # rendered from design-system.json
```

In a **connected project**, the design system's `.lovable` files are copied to a namespaced
subfolder:

```
.lovable/
└── rules/
    └── libraries/
        └── <design-system-slug>/
            ├── design-system.json
            ├── system.md
            ├── components.md
            ├── design-tokens.md
            └── library-guidelines.md
```

The corresponding component source lives at `src/design-system/<design-system-slug>/` in the
connected project, imported as `@/design-system/<design-system-slug>/...`.

## Fetch external design system documentation with MCP servers

MCP servers can be used to fetch design system documentation that is stored separately from your npm
packages. See
[Integrate with your tools using chat connectors (MCP servers)](/integrations/chat-connectors) for more
information.

## Troubleshooting

<AccordionGroup>
  <Accordion title="React version mismatch">
    If your design system uses React 19 but the project defaults to React 18, or vice versa, tell
    Lovable explicitly. For example:

    ```text wrap theme={null}
    My design system requires React 19. Please update the project dependencies accordingly.
    ```
  </Accordion>

  <Accordion title="Conflicting dependencies">
    If your design system uses a different styling solution than the project's defaults, ask
    Lovable to remove the conflicting dependencies. For example:

    ```text wrap theme={null}
    Please uninstall the project's default styling dependencies. My design system uses
    [your styling solution] instead.
    ```
  </Accordion>

  <Accordion title="Preview looks broken right after connecting">
    Setup verification usually catches this and fixes the wiring automatically. If something
    still looks off, open the chat in the connected project and ask Lovable to verify the design
    system is wired up correctly. It will rerun the check and propose fixes.
  </Accordion>

  <Accordion title="Lovable is not using the components I expect">
    The adherence scanner catches most violations automatically. If it misses something, point it
    out in the chat. For example, "use the Button from the design system here, not a custom
    one." Lovable will replace the local implementation with the design system component.
  </Accordion>

  <Accordion title="Release fails: private package needs a scoped registry">
    Your design system wraps a package on a private registry, but Lovable has no recorded way to
    authenticate to it. Make sure the package is scoped (`@scope/name`) and add the registry and
    auth lines for that scope to `.npmrc`, backed by a workspace build secret:

    ```text wrap theme={null}
    @scope:registry=https://your-registry.example.com
    //your-registry.example.com/:_authToken=${NPM_TOKEN}
    ```

    Add the `NPM_TOKEN` secret under **Workspace settings → Build secrets**, then release again.
  </Accordion>

  <Accordion title="Release fails: registry auth failed or package not found">
    The upstream package could not be fetched. Confirm the build-secret token can read the package,
    that the package name and scope are correct, and that the `.npmrc` registry line points at the
    right host. For the Lovable-managed registry (see [Managed registry](/features/managed-registry)), make sure the workspace's managed npm registry is
    enabled in workspace settings. Then release again.
  </Accordion>

  <Accordion title="Release fails: the package ships no typed exports">
    A wrapped npm package is read through its published type definitions. If the upstream package
    ships no `.d.ts` types or `exports` map, there is nothing to extract. Wrap a package that ships
    types, or build the components as a local (from-scratch) design system instead.
  </Accordion>

  <Accordion title="Release does nothing or reports an empty design system">
    Lovable could not identify any tokens or components in the project. For a local design system,
    check that tokens live in a top-level styling file (CSS variables, `tailwind.config`, or a
    `theme`/`tokens` file) and that components are exported from `src/index.ts` or live under
    `src/components/`. Ask Lovable to run the design system discovery step, then release again.
  </Accordion>
</AccordionGroup>

## FAQ

<AccordionGroup>
  <Accordion title="Is a design system just a Lovable project?">
    Yes, a design system is a regular Lovable project that is marked as a design system. It can
    be opened and edited like any other project, and other projects can connect to it.

    If the design system wraps an external npm package, the package itself isn't editable from
    Lovable, only the wrapper layer in the design system project is. Changes to the underlying
    components have to be made in the upstream npm package and republished there.
  </Accordion>

  <Accordion title="Can I connect more than one design system to a project?">
    No. A project can be connected to at most one design system at a time. To switch, remove the
    current one first: open the **Design system** section in **Project settings → General**, then
    choose **⋯ → Remove** on the connected one.
  </Accordion>

  <Accordion title="Can any project be turned into a design system?">
    No. A design system is created as its own dedicated project from the **[Create a design system](#create-a-design-system)** flow.
    An existing project can't be converted into one. Once
    created and released, it becomes available for other projects in the workspace to connect to.
  </Accordion>

  <Accordion title="How do I see which design system is connected to my project?">
    Select the project name in the top bar and choose **Design system**, or go to
    **Project settings → General** and open the **Design system** section. It shows the
    connected design system and opens a dialog to browse and attach available ones.
  </Accordion>

  <Accordion title="Are design systems versioned?">
    Yes. Every release bumps the version. Connected projects record the version they were last
    attached at, and an **Update available** prompt appears in the chat whenever a newer version is
    released.
  </Accordion>

  <Accordion title="What is the difference between a released and a draft design system?">
    A draft design system exists as a project but has not been released yet, so it has no
    schema or rendered documentation. You cannot use a draft design system as the basis
    for a new project. Release it first. Once released, the design system gets a version
    number and becomes selectable in the design system picker.
  </Accordion>

  <Accordion title="Can I remove a design system from a project?">
    Yes. In **Project settings → General**, open the **Design system** section, then choose
    **⋯ → Remove** on the attached design system and confirm. This severs the managed link: your
    project stops receiving updates from that
    design system, and the agent no longer follows its rules. The component files stay under
    `src/design-system/` as ordinary, editable code, so nothing already using them breaks; they are
    now yours to maintain.
  </Accordion>

  <Accordion title="Can I edit the design system from a connected project?">
    The design system's source and documentation are managed by the design system project. The
    files in `src/design-system/<design-system-slug>/` and
    `.lovable/rules/libraries/<design-system-slug>/` are present in a connected project's git, so
    you can read and import them, but local edits will be replaced the next time you accept an
    update. For permanent changes, propose them in the design system project.
  </Accordion>

  <Accordion title="Do I need to publish my design system to npm?">
    No. Design systems are an in-Lovable feature. Components and documentation flow directly
    between your Lovable projects. If you also want to publish your design system to a public npm
    or a private registry for use outside Lovable, that's a separate flow.
  </Accordion>

  <Accordion title="What's the difference between a from-scratch and an npm-wrapper design system?">
    A from-scratch (local) design system holds its component source directly in the design system
    project. Lovable reads tokens and components from that source when you release. An npm-wrapper
    design system wraps an external npm package: Lovable reads the component surface from the
    package's published type definitions, and the project holds only a thin wrapper layer.

    For a public npm package nothing extra is needed. For a package on a private registry, the
    package must be scoped (`@scope/name`) and you add a scoped `.npmrc` backed by a workspace build
    secret so both releasing and connected projects can authenticate.
  </Accordion>

  <Accordion title="What technologies do design systems support?">
    Lovable design systems support **React-based component libraries** out of the box. The design
    system declares its required stack and dependencies through its schema, and Lovable adapts the
    setup automatically. Your library determines what gets wired up, not a fixed list of
    supported frameworks. If your design system is built with other frameworks such as Vue,
    Angular, or Svelte, reach out to your CSM or FDE.
  </Accordion>

  <Accordion title="Why does the agent sometimes make extra edits right after I attach a design system?">
    When you attach a design system, Lovable runs an automatic setup verification pass to check that the
    design system is wired up correctly (configuration, CSS imports, theme providers, dependencies, and
    import paths). If the agent finds gaps, it applies fixes and reruns verification. Successful
    verifications are silent and do not appear in the chat. Verification turns are billed at zero credits.
  </Accordion>

  <Accordion title="Do design systems replace templates?">
    No, design systems do not replace templates. Templates and design systems serve different purposes
    and are often used together. Templates are best for initial project scaffolding, while design systems
    provide ongoing UI and design guidance across projects.
  </Accordion>
</AccordionGroup>
