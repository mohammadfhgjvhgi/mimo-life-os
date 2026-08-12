> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Brainstorm in Plan mode

> Plan mode helps you think, explore, and decide before any code is written. Use it to ask questions, debug issues, compare approaches, or create a structured plan when you are ready to build.

<head>
  <script type="application/ld+json">
    {`{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Does Plan mode ever change my code?", "acceptedAnswer": {"@type": "Answer", "text": "No. Code changes only happen after you approve a plan and Lovable switches to Build mode."}}, {"@type": "Question", "name": "Does Plan mode cost credits?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Every message in Plan mode deducts one credit."}}, {"@type": "Question", "name": "Where are plans stored?", "acceptedAnswer": {"@type": "Answer", "text": "The latest approved plan is saved to .lovable/plan.md. Earlier plans remain accessible from chat history."}}, {"@type": "Question", "name": "Can I access old plans?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Earlier plans remain accessible from chat history."}}, {"@type": "Question", "name": "Can I edit plans after they’re created?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Plans are fully editable before approval."}}, {"@type": "Question", "name": "Can I use Plan mode for debugging?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Plan mode is well suited for investigating issues and deciding on fixes before implementation."}}, {"@type": "Question", "name": "Where is Chat mode?", "acceptedAnswer": {"@type": "Answer", "text": "Plan mode was previously called Chat mode. The name was changed to better reflect how the mode is intended to be used before implementation."}}]}`}
  </script>
</head>

<Tip>
  **Choose a mode**

  Lovable has two modes:

  * **Plan mode** → think through the problem, explore options, and decide on an approach
  * [**Build mode**](/features/agent-mode) → implement changes and verify the outcome

  Plan mode is for decision-making. Build mode is for execution.

  The two modes are designed to work together, and you can switch between them at any time.
</Tip>

## Overview

<Tooltip tip="Plan mode was previously called Chat mode. The name was changed to better reflect how the mode is intended to be used before implementation.">Plan mode (previously Chat mode)</Tooltip> is Lovable’s planning and reasoning mode, designed for moments when thinking, exploration, or clarity is more valuable than immediate execution. It can reason across multiple steps and inspect files, logs, or other relevant project context as needed.

In Plan mode, you can explore ideas, investigate issues, and reason about changes before any code is written. Lovable often asks clarifying questions to better understand your goals and constraints. When there is a clear implementation to propose, Lovable creates a formal plan that you can inspect, edit, and refine.

Plan mode never modifies your code. Every message in Plan mode deducts **one credit**.

## What Plan mode is for

You can use Plan mode to:

* Explore product or feature ideas before committing to a direction
* Ask questions about your codebase or existing behavior
* Investigate bugs, errors, or confusing behavior safely before making code changes
* Compare multiple approaches and understand tradeoffs
* Design architecture or database schemas
* Understand the impact of potential changes before making them

Many Plan mode conversations are exploratory and end with clarity or direction. When a conversation does lead to a concrete change, Plan mode provides a safe way to review and refine the proposed approach before anything is implemented.

## How to use Plan mode

You can use Plan mode in two ways:

* **Start in Plan mode** when beginning a new project or exploring an idea
* **Switch to Plan mode** at any point during development to pause execution and think

Plan mode is intentionally interactive. Lovable may ask clarifying questions to understand requirements, constraints, or tradeoffs before proposing a plan.

### Activate Plan mode

Click **Plan** next to the message input, then describe what you want to explore or decide.

**Be specific about what you want**

```text wrap theme={null}
Add email/password authentication with password reset. 
Users should stay logged in for 30 days. Use Lovable Cloud.
```

**Use it for exploration**

```text wrap theme={null}
What's the best way to implement real-time notifications in this project? 
Walk me through the options and their tradeoffs.
```

**Use it for debugging**

```text wrap theme={null}
Users report the login form doesn't work on mobile. 
Help me figure out why.
```

**Request detailed breakdowns**

```text wrap theme={null}
Break down the implementation of a shopping cart feature. 
What components, database tables, and API endpoints will I need?
```

**Ask for reviews and improvements**

```text wrap theme={null}
Review my current authentication setup. 
What security improvements should I make?
```

## When Plan mode creates a plan

Plan mode does not always produce a structured implementation plan. A plan is created only when there is a clear implementation to propose.

If a plan is generated, it appears in a dedicated **Plan view** as a readable, structured document. You can open it in full screen to review the entire approach before anything is implemented.

A plan typically includes:

* A high-level overview of the approach
* Key decisions, assumptions, and constraints
* Components, data models, and APIs
* Step-by-step implementation sequencing
* Optional diagrams such as schemas, flows, or architecture

From the Plan view, you can:

* **Edit** the plan directly as markdown to add constraints, remove steps, or rewrite sections
* **Approve** the plan when you are satisfied with the approach

You can ask follow-up questions or request changes directly in the chat, and Lovable will update the plan accordingly.

When you approve a plan:

* Lovable switches to **Build mode**
* Implementation begins based strictly on the approved plan

You can return to Plan mode at any time to generate a new plan based on the current state of your codebase.

## Plans and persistence

When you approve a plan, the **latest approved version** is saved to `.lovable/plan.md`.

This file represents the current plan that Build mode will implement, and you can inspect it like any other project file.

**Previous plans are not lost**. They remain available in your **chat history** and can be reopened in the Plan view for reference or comparison, even though only the most recent approved plan is saved to `plan.md`.

This allows you to:

* Iterate on ideas over time
* Compare different approaches
* Re-plan safely as requirements evolve
* Help new collaborators understand the reasoning behind implementations

## FAQ

<AccordionGroup>
  <Accordion title="Does Plan mode ever change my code?">
    No. Code changes only happen after you approve a plan and Lovable switches to Build mode.
  </Accordion>

  <Accordion title="Does Plan mode cost credits?">
    Yes. Every message in Plan mode deducts **one credit**.
  </Accordion>

  <Accordion title="Where are plans stored?">
    The latest approved plan is saved to `.lovable/plan.md`. Earlier plans remain accessible from chat history.
  </Accordion>

  <Accordion title="Can I access old plans?">
    Yes. Earlier plans remain accessible from chat history.
  </Accordion>

  <Accordion title="Can I edit plans after they’re created?">
    Yes. Plans are fully editable before approval.
  </Accordion>

  <Accordion title="Can I use Plan mode for debugging?">
    Yes. Plan mode is well suited for investigating issues and deciding on fixes before implementation.
  </Accordion>

  <Accordion title="Where is Chat mode?">
    **Plan mode** was previously called **Chat mode**. The name was changed to better reflect how the mode is intended to be used before implementation.
  </Accordion>

  <Accordion title="Can I reference a specific file when chatting with Lovable?">
    Yes. You can reference code files from your current project directly in chat to make edits and discussion faster and more precise.

    Type `@` and select a file, or use the **Reference file in chat** button in the [code editor](/features/code-mode). For example:

    ```wrap theme={null}
    @src/components/UserProfile.tsx add a loading state here
    ```

    This only references files within your current project. To reference another project, see [Cross-project referencing](/features/cross-project-referencing).
  </Accordion>

  <Accordion title="Can Lovable reuse code or features from another project?">
    Yes. Lovable supports [cross-project referencing](/features/cross-project-referencing) within the same workspace.

    You can use `@` mentions to reference another project directly, or simply ask Lovable to reuse an existing implementation. The agent can access relevant code, files, assets, and chat history from other projects and adapt them to your current one.

    Cross-project access is read-only and respects workspace permissions.
  </Accordion>
</AccordionGroup>
