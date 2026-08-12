> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Subagents

> Subagents help Lovable investigate complex tasks faster by splitting research, code exploration, and review into focused investigations.

When a task needs more investigation, Lovable can start temporary, read-only subagents to research, inspect, or review focused parts of the work. Each subagent works independently and, when useful, Lovable can run several in parallel.

Subagents report their findings back to the main Lovable agent. The main agent uses those findings to decide what to do next, continue building, or explain the result. Subagents can inform the work, but they cannot change your project. All file changes still come from the main Lovable agent.

You do not need to configure subagents or choose when they run. Lovable decides when subagents are useful based on your request.

## Why subagents help

Large requests often need a lot of investigation before Lovable can act confidently. This matters most on larger projects, where a change may depend on many files, features, and connected flows.

The chat can quickly fill with file contents, search results, logs, stack traces, implementation notes, and abandoned paths. That extra material can make the important parts harder to track.

Subagents keep that work contained. Instead of bringing every intermediate detail into the chat, Lovable can delegate focused investigations and return only the useful findings. This can make larger builds feel faster because Lovable can complete discovery work in parallel before deciding what to change.

This helps in three ways:

* **Cleaner context**: Requirements, decisions, and next steps stay easier to follow.
* **Parallel progress**: Independent questions can be investigated at the same time instead of one after another.
* **More focused results**: Each subagent works on a bounded question with fresh context, which helps it return sharper findings.

## Subagent types

Lovable has two kinds of subagents you may see appear in the activity card in chat. Both investigate focused questions. The difference is the kind of result Lovable needs.

* **Generic subagents** are useful when Lovable needs the findings in a specific shape, such as a comparison, checklist, summary, review, or recommendation. Their card title describes the task they are working on, such as `Check how notifications are implemented`
* **Explore** is useful when the answer needs traceable evidence, such as when you ask how something works, where something is handled, or why something behaves a certain way. Explore uses the most capable model available and follows a structured research process. For example, its card title could be `Explore: How does the current authentication flow work?`

## How subagents work

Subagents can search your project, inspect files, run read-only lookups, browse the web when needed, review work against your prompt, and return findings to Lovable. They cannot edit, create, delete files, or make any changes to your project.

Subagents start with fresh context. They do not automatically see the full chat, previous messages, or everything Lovable has already read. Each subagent only knows what Lovable passes into its task briefing, such as the question to investigate, relevant project context, file paths, or constraints.

When Lovable starts subagents, an activity card appears in the chat. You'll see subagent rows appear in the activity card showing what the subagents are investigating and their current status.

Open the activity card to see more detail about what the subagents did, including files they inspected, searches they ran, tools they used, and findings they returned. This helps you understand where Lovable’s conclusions came from.

When a subagent finishes, Lovable receives its findings automatically. Subagents do not coordinate directly with each other. Each one reports back to Lovable, and the main agent combines the findings before deciding what to do next.

If you asked for research or investigation, Lovable will typically surface what the subagent found. If you asked Lovable to build something, it may use the findings quietly and continue building without a separate summary.

## Prompting Lovable to use subagents

To encourage Lovable to delegate investigation work, mention subagents in your prompt and describe what you want investigated. This works best when the request has multiple parts, needs project exploration, or benefits from research before building.

Lovable will still decide whether to use subagents based on the task.

<AccordionGroup>
  <Accordion title="Explore an unfamiliar project">
    Use this when you want Lovable to inspect a project and explain how it works before making changes. For example:

    ```text wrap theme={null}
    Use subagents to explore my project and explain how it is structured. I have not touched this app in a while and want to understand the main pages, data flow, and important files before making changes.
    ```
  </Accordion>

  <Accordion title="Research before building a feature">
    Use this when you want Lovable to research best practices or implementation options before changing the app. For example:

    ```text wrap theme={null}
    Use subagents to help me redo my pricing page. Research what makes a strong pricing page, inspect my current page, and recommend what should change before building.
    ```
  </Accordion>

  <Accordion title="Investigate a performance issue">
    Use this when you want Lovable to inspect connected parts of the app and identify likely causes. For example:

    ```text wrap theme={null}
    Use subagents to investigate why my dashboard is sometimes slow. Look through the dashboard and anything connected to it, then tell me what might be causing the slowdown and how to improve it.
    ```
  </Accordion>

  <Accordion title="Plan a larger change">
    Use this when you want Lovable to assess the scope of a bigger feature before you commit to building it. For example:

    ```text wrap theme={null}
    Use subagents to help me plan adding comments and likes. Research how social features are usually built, inspect where they would fit in my app, and explain what I would be signing up for before I start.
    ```
  </Accordion>
</AccordionGroup>

## FAQ

<AccordionGroup>
  <Accordion title="Do I need to prompt differently?">
    No. Keep using Lovable the same way. Lovable decides when subagents can help.

    To encourage Lovable to use subagents, mention subagents in your prompt and describe what you want investigated. This does not guarantee subagents will be used, but it helps Lovable understand that you want the work split into focused investigations.
  </Accordion>

  <Accordion title="Can subagents edit my code?">
    No. Subagents are read-only at the moment. They can search, inspect, research, and review, but they cannot create, edit, or delete files.

    All project changes come from the main Lovable agent.
  </Accordion>

  <Accordion title="Can multiple subagents run at once?">
    Yes. When a request has several independent parts, Lovable can run multiple subagents in parallel.
  </Accordion>

  <Accordion title="Will subagents make my builds more expensive?">
    Subagents consume model usage like other agent work. Lovable routes routine research and lookups to lighter models where appropriate, which helps keep usage efficient.
  </Accordion>

  <Accordion title="Are subagents available on all plans?">
    Yes. Subagents are part of how Lovable works and do not require any setup.
  </Accordion>
</AccordionGroup>
