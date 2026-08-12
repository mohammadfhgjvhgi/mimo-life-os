> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Instructing Devin Effectively

> How to achieve optimal results.

The most important thing to remember when instructing Devin is to **be as specific as possible**. Just as you would provide a detailed spec when asking a coworker to code something, you should do the same with Devin. This guide will help you structure your instructions/prompts to effectively use Devin. For broader strategies on working with coding agents effectively, also check out our [Coding Agents 101 guide](https://devin.ai/agents101).

## How to Write Effective Prompts

Here is an example prompt that demonstrates effective instruction:

<Note type="info">
  In the Devin repo, I want you to build a tool that monitors the RAM and CPU usage of the remote machines that Devin runs on. To do that, please perform the following tasks:

  * Create a background task that launches automatically when devin.rs starts.
  * The task should open a connection to all forked remote machines used in this Devin session and monitor their RAM and CPU usage.
  * If usage exceeds 80% of the available resource, emit a new type of Devin event to signal this (check how we use Kafka).
  * Architect this in a smart way that doesn't block other operations. You should understand how all the containers for the Devin sub-agents interact with each other.
</Note>

### Why This Works Well

<CardGroup cols={2}>
  <Card title="Provides Helpful Context" icon="circle-info">
    * **Detail:** Specifies the Devin repo and the broader purpose (monitoring resource usage).
    * **Benefit:** Devin knows the scope and domain clearly.
  </Card>

  <Card title="Gives Step-by-Step Instructions" icon="list-ol">
    * **Detail:** Tasks like "create a background task" and "emit an event at 80% usage."
    * **Benefit:** Breaks down the work into logical parts.
  </Card>

  <Card title="Defines Clear Success Criteria" icon="check">
    * **Detail:** Defines "success" as emitting a specific event upon 80% usage.
    * **Benefit:** Devin knows exactly what to achieve.
  </Card>

  <Card title="References Existing Patterns and Code" icon="code">
    * **Detail:** Mentions Kafka and container interactions.
    * **Benefit:** Encourages reuse of established code or design approaches.
  </Card>
</CardGroup>

## Best Practices: Do's and Don'ts

<AccordionGroup>
  <Accordion title="Be Opinionated and Specific" icon="bullseye">
    **Do: Provide Clear Directives**

    * **Why:** Devin can get stuck without a clear path or when faced with too many interpretations.
    * **How:**
      * Make important decisions and judgment calls for Devin.
      * Offer specific design choices and implementation strategies.
      * Define clear scope, boundaries, and success criteria.
    * **Example:** "Optimize the getOrderDetails query in orderService.js by adding a composite index on the order\_id and product\_id columns in the order\_items table. Refactor the query to replace the existing correlated subquery with a JOIN to the products table for fetching product details."

    **Don't: Leave Decisions Open-Ended**

    * **Why:** Vague instructions can lead Devin to implement solutions that don't align with your actual needs.
    * **How:**
      * Avoid statements that require Devin to make significant design or implementation decisions without guidance. This can lead to unexpected results.
    * **Example:** Don't: "Improve our database's performance."
  </Accordion>

  <Accordion title="Leverage Devin's Strengths" icon="rocket">
    **Do: Pick [tasks that Devin is good at](when-to-use-devin#evaluating-tasks-for-devin)**

    * **Why:**
      * **Maximize Results:** By assigning tasks that align with Devin's capabilities, you get the best results for the least amount of effort and ACUs spent.
    * **How:**
      * Read this guide: [When to use Devin](when-to-use-devin)
      * Provide examples, modules, resources, and templates that Devin can follow.
        * Share direct links to docs sites so Devin can read about details like API request bodies and features it might not know about.
        * Share specific filenames that you want Devin to look at and learn from.
      * Connect [MCP integrations](/work-with-devin/mcp) to give Devin access to Figma designs, databases, monitoring tools, and more.
      * **Example:** Do: "Refactor state management in the Header component to use React's useReducer hook for better scalability and maintainability. Ensure that all existing functionality is preserved and add unit tests to cover the new state logic."
      * **Example:** Do: "Use authTemplate.rs as a reference to maintain consistency in error handling."
      * **Example:** Do: "Check out the official Sequelize docs at [https://sequelize.org/docs/v6/getting-started/](https://sequelize.org/docs/v6/getting-started/) for migration steps."

    **Don't: Skip Providing Context for Complex Tasks**

    * **Why:** Even though Devin can handle complex work, it performs best when you provide context and clear direction.
    * **How:**
      * For tasks requiring domain knowledge, provide relevant docs, examples, or references.
      * For visual tasks, provide Figma files via the [Figma MCP](/work-with-devin/mcp), reference designs, or detailed specs — Devin can build from these but won't invent aesthetics on its own.
      * For Android apps, Devin can build and test on an [Android emulator](/onboard-devin/environment/android-emulation). For iOS apps, Devin doesn't have access to a phone emulator, so provide clear testing criteria.
    * **Example:** Don't: "Make the app look better" — instead, provide specific design specs or a Figma file.
    * **Example:** Don't: "Improve our database's performance" — instead, specify which queries to optimize and what metrics to target.
  </Accordion>

  <Accordion title="Use Feedback Loops" icon="rotate">
    **Do: Establish Clear and Frequent Checks**

    * **Why:** Frequent feedback (both from you and from tests/checks/linters) ensures Devin corrects mistakes effectively.
    * **How:**
      * Use tests (unit/integration) to confirm correctness.
      * Maintain build validations, lint checks, and static analysis for code quality.
      * Enable [Devin Review](/work-with-devin/devin-review) with [Auto-Fix](/work-with-devin/devin-review#auto-fix) so Devin automatically responds to review comments and CI failures — creating a closed loop where PRs iterate toward merge-ready quality without you in the loop.
    * **Example:** Do: "Run npm test after each iteration."
    * **Example:** Do: "Ensure the pipeline on CircleCI doesn't fail."
    * **Example:** Do: "Pass ESLint/Prettier checks before pushing any commits."

    **Don't: Neglect Providing Feedback**

    * **Why:** Without feedback, Devin won't know if its solutions meet your standards.
    * **How:**
      * Avoid assigning tasks without defining how you'll evaluate them.
  </Accordion>

  <Accordion title="Set Checkpoints" icon="check-double">
    **Do: Set Clear Checkpoints and Sub-Tasks**

    * **Why:** Breaking down complex tasks into smaller checkpoints helps Devin stay focused and reduces errors.
    * **How:**
      * Split tasks into verifiable sub-tasks, and start one Devin session for each sub-task.
      * Define what success looks like for each sub-task and optionally set checkpoints within each sub-task.
      * Ask Devin to report back after completing each checkpoint or sub-task.

    **Examples:**

    * **Example:** Do: "When working with the dataset, verify that it has at least 500 rows and contains columns X, Y, Z."
    * **Example:** Do: "When modifying the API, confirm the endpoint returns status 200 and includes all required fields."
    * **Example:** Do: "When updating UI, check that the component renders without console errors and matches the design spec."

    **Don't: Skip Specific Validation Requirements**

    * **Why:** Without defined validation steps, Devin cannot confidently complete tasks.
    * **How:**
      * Avoid vague success criteria.
      * Don't leave verification steps implicit or undefined.
    * **Example:** Don't: "Make sure it works."
  </Accordion>

  <Accordion title="Let Devin Test Its Own Work" icon="desktop">
    Devin has a full desktop environment — shell, IDE, and browser. Tell Devin to test its own work before opening a PR:

    * **Spin up the app:** "Run `npm run dev` and verify the new page renders at `/settings`."
    * **Browser testing:** "Open the browser, navigate to the login page, and confirm the OAuth flow completes successfully."
    * **Visual verification:** "Take screenshots at desktop (1440px) and mobile (375px) widths and confirm the layout matches the design."
    * **Screen recording:** "Record yourself testing the checkout flow end-to-end."

    This lets Devin QA its changes the same way you would — before you ever need to look at the PR.
  </Accordion>

  <Accordion title="Use Playbooks and Knowledge" icon="book">
    For repetitive or complex tasks, we suggest using and iterating on [Playbooks](/product-guides/creating-playbooks). Learn more about [using playbooks effectively](/product-guides/using-playbooks). Playbooks are reusable and shareable prompts that streamline task delegation. For example, if you want Devin to address ongoing CI build failures, create a playbook that includes the general steps Devin should follow each time.

    For persistent context that Devin should remember across all sessions — such as coding standards, common bugs and fixes, deployment workflows, or how to use internal tools — use [Knowledge](/product-guides/knowledge). Knowledge items are automatically recalled when relevant, so you don't need to repeat the same instructions in every prompt. You can pin Knowledge to specific repos or apply it globally.

    <Tip>**Playbooks vs. Knowledge:** Use Playbooks for step-by-step procedures tied to specific tasks. Use Knowledge for general tips, conventions, and context that apply broadly across sessions.</Tip>
  </Accordion>
</AccordionGroup>
