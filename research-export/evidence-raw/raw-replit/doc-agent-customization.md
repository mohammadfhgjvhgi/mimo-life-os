> ## Documentation Index
> Fetch the complete documentation index at: https://docs.replit.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Customization

> Teach Agent your team's conventions with workspace-wide custom instructions and skills, managed centrally in Workspace Settings.

Agent Customization gives Agent the context it needs to work the way you and your team work, from the very first prompt. Instead of re-explaining your conventions in every project, you define them once for your workspace and Agent applies them everywhere.

It has two parts:

* **Custom instructions**: always-on guidelines that apply to every project in your workspace.
* **Skills**: reusable instructions that Agent loads only when a relevant task comes up.

You manage both in **Workspace Settings → Customization**.

<Frame>
  <img src="https://mintcdn.com/replit/JdEkwxWZoS1i7-FA/images/replitai/agent-customization-create-skill.png?fit=max&auto=format&n=JdEkwxWZoS1i7-FA&q=85&s=9437a71d20c1fa676722d798624caac8" alt="The Customization tab in Workspace Settings, with Skills and Custom instructions sub-tabs and the Create a skill form open" width="2168" height="1350" data-path="images/replitai/agent-customization-create-skill.png" />
</Frame>

## Custom instructions vs. skills

Custom instructions load on every message; skills load only when Agent decides a task is relevant. Use custom instructions for the few guidelines that are always true, and skills for specific workflows, conventions, and reference material.

For the reasoning behind that split — the context budget, what belongs where, and how to author skills well — see [Agent skills](/learn/agent-skills). For how skills are structured and how Agent loads them, see [Agent Skills](/features/agent/skills).

## Custom instructions

Custom instructions are always-on guidelines injected into Agent's context on every project and every session, before anyone types a prompt. Write them once in Workspace Settings, and Agent applies them everywhere in your workspace. They are best for guidelines that are always true, such as security and compliance requirements, approved libraries and frameworks, or data-handling policies.

Keep them short. A focused, specific instruction is more likely to be followed closely, and it leaves more room for the work Agent is actually doing.

<Warning>
  Custom instructions may impact Agent performance. Agent is guided to follow them, but strict requirements aren't guaranteed. Shorter, more specific guidelines are followed more reliably.
</Warning>

<Note>
  Workspace custom instructions are different from a project's `custom_instruction/instructions.md` file. The workspace custom instruction is set once in Workspace Settings and applies to every project. The per-project file lives inside a single project — see [Create a custom design system](/teams/custom-design-system) for that pattern.
</Note>

## Skills

A skill is a reusable set of instructions Agent loads only when a relevant task comes up. Workspace skills appear at the top of the **+** menu in every project in your workspace, so your whole team shares the same set.

You can create a skill three ways:

* **Upload** an existing skill folder.
* **Write** a new skill directly in the form.
* **Ask Agent** to draft a skill for you, then refine it.

<Note>
  You can upload Skills drafted by Agent to your Workspace. Ask Agent to download the skill. Agent will package the skill as a downloadable `.zip` archive with a **Download file** button (shown below). Download the zip, then upload it back in **Workspace Settings → Customization → Skills** via **Create skill → Choose file or folder**, so it's shared across your workspace.
</Note>

<Frame>
  <img src="https://mintcdn.com/replit/JdEkwxWZoS1i7-FA/images/replitai/agent-customization-download-skill.png?fit=max&auto=format&n=JdEkwxWZoS1i7-FA&q=85&s=605f84287107eb7bcf3443ef29f59cff" alt="Agent has packaged a workspace skill as a downloadable ux-designer-skill.zip archive, with a Download file button" width="1716" height="864" data-path="images/replitai/agent-customization-download-skill.png" />
</Frame>

For the full skill structure (`SKILL.md`, supporting files, the open standard), see [Agent Skills](/features/agent/skills). To browse skills Replit and our partners have already built, see the [Skills directory](/features/agent/skills-directory).

<Note>
  Use skills sparingly. Agent reads every skill's name and description on each task, and too many (or overlapping ones) dilute its focus and can make it harder for Agent to pick the right one. Keep each skill tightly scoped, and remove ones you no longer need.
</Note>

## Availability and permissions

| Feature             | Available on       | Who can manage                                         |
| ------------------- | ------------------ | ------------------------------------------------------ |
| Custom instructions | Pro and Enterprise | Enterprise: admins. Pro: any workspace member          |
| Skills              | All paid plans     | Enterprise: admins. Core and Pro: any workspace member |

On Enterprise workspaces, only admins can create, edit, or delete custom instructions and skills. On Pro workspaces, any workspace member can. On Core workspaces, any member can manage skills — custom instructions aren't available on Core. Either way, every member of the workspace can use the skills that have been created.

## Create a custom instruction

<Steps>
  <Step title="Open Workspace Settings">
    Go to **Workspace Settings → Customization**.

    <Frame>
      <img src="https://mintcdn.com/replit/JdEkwxWZoS1i7-FA/images/replitai/agent-customization-tab.png?fit=max&auto=format&n=JdEkwxWZoS1i7-FA&q=85&s=db78105289bbe9001ef972a785499db2" alt="The Customization tab in Workspace Settings, showing the Skills and Custom instructions sub-tabs" width="1065" height="394" data-path="images/replitai/agent-customization-tab.png" />
    </Frame>
  </Step>

  <Step title="Write your instruction">
    In the **Custom instructions** section, write the guidelines you want Agent to apply across every project.
  </Step>

  <Step title="Save">
    Save your changes. The instruction applies to new projects in your workspace.
  </Step>
</Steps>

## Create a skill

<Steps>
  <Step title="Open Workspace Settings">
    Go to **Workspace Settings → Customization**.
  </Step>

  <Step title="Create the skill">
    In the **Skills** section, click **Create skill**, then upload a skill folder, write the instructions, or ask Agent to draft one.

    <Frame>
      <img src="https://mintcdn.com/replit/JdEkwxWZoS1i7-FA/images/replitai/agent-customization-create-skill.png?fit=max&auto=format&n=JdEkwxWZoS1i7-FA&q=85&s=9437a71d20c1fa676722d798624caac8" alt="The Customization tab in Workspace Settings, with Skills and Custom instructions sub-tabs and the Create a skill form open" width="2168" height="1350" data-path="images/replitai/agent-customization-create-skill.png" />
    </Frame>
  </Step>

  <Step title="Write a clear description">
    Give the skill a sharp description that says when to use it — and when not to. This is what Agent reads to decide whether the skill applies.
  </Step>

  <Step title="Save">
    Save the skill. It becomes available in the **+** menu of every project in your workspace.
  </Step>
</Steps>

## Use a workspace skill in a project

Sharp Skill description matters. Agent reads every workspace skill's description and pulls one in automatically when your prompt roughly matches what the skill is for, so you don't always need to pick a skill yourself.  You can also select a skill explicitly when you want to be sure it's applied.

To select one manually:

<Steps>
  <Step title="Open the skill picker">
    In a project, click the **+** button next to the chat input. Your workspace skills appear at the top, grouped together.

    <Frame>
      <img src="https://mintcdn.com/replit/JdEkwxWZoS1i7-FA/images/replitai/agent-customization-skill-picker.png?fit=max&auto=format&n=JdEkwxWZoS1i7-FA&q=85&s=7b1ffab08e0bcc9e60313820781a7350" alt="The skill picker opened from the + button, showing the Workspace skills group at the top above Replit skills" width="1668" height="1170" data-path="images/replitai/agent-customization-skill-picker.png" />
    </Frame>
  </Step>

  <Step title="Select a skill">
    Choose the skill you want active. You can also type `/` followed by the skill name to invoke it directly.
  </Step>

  <Step title="Keep prompting">
    Continue as normal. Agent uses the skill when the task matches its description.
  </Step>
</Steps>

## Manage instructions and skills

All management happens in **Workspace Settings → Customization**. From there you can edit a custom instruction, and edit, disable, or delete any skill. Changes apply to future chats, not ones already in progress.

## Next steps

<CardGroup cols={2}>
  <Card icon="users" href="/learn/agent-skills">
    The mental model and best practices for writing instructions and skills that scale across your team.
  </Card>

  <Card icon="puzzle-piece" href="/features/agent/skills">
    How skills are structured and how Agent loads them.
  </Card>

  <Card title="Skills directory" icon="grid" href="/features/agent/skills-directory">
    Browse skills built by Replit and our partners, and learn how to install them.
  </Card>

  <Card title="Use a skill" icon="wand-magic-sparkles" href="/build/use-agent-skills">
    Attach a skill to a message or install one in a project.
  </Card>
</CardGroup>
