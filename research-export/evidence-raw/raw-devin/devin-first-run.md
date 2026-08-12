> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Your First Session

> Start your first session and see what Devin can do

export const PromptBlock = ({children, type, agent, intent, playbookId}) => {
  var utm = 'utm_source=docs&utm_medium=use-case-gallery&utm_campaign=prompt-block';
  var tag = 'docs-use-case-gallery';
  var agentParams = (agent ? '&agent=' + agent : '') + (intent ? '&intent=' + intent : '') + (playbookId ? '&playbookId=' + playbookId : '');
  var label = type === 'schedule' ? 'Schedule in Devin' : type === 'playbook' ? 'Create Playbook' : type === 'knowledge' ? 'Add to Knowledge' : agent === 'advanced' ? 'Try in Devin' : agent === 'dana' ? 'Try in Dana' : agent === 'ada' ? 'Try in Ask Devin' : 'Try in Devin';
  var buildUrl = function (text) {
    var encoded = encodeURIComponent(text);
    if (type === 'schedule') return 'https://app.devin.ai/settings/schedules/create?' + utm + agentParams + '&prompt=' + encoded;
    if (type === 'playbook') return 'https://app.devin.ai/settings/playbooks/create?' + utm + '&body=' + encoded;
    if (type === 'knowledge') return 'https://app.devin.ai/knowledge?' + utm + '&body=' + encoded;
    if (agent === 'ada') return 'https://app.devin.ai/search?' + utm + '&noSubmit=true&prompt=' + encoded;
    return 'https://app.devin.ai/?tags=' + tag + '&' + utm + agentParams + '&prompt=' + encoded;
  };
  const ref = React.useRef(null);
  const [href, setHref] = React.useState('#');
  React.useEffect(() => {
    if (!ref.current) return;
    var codeEl = ref.current.querySelector('pre code');
    if (codeEl) {
      var text = codeEl.textContent.trim();
      if (text) setHref(buildUrl(text));
    }
    var header = ref.current.querySelector('[data-component-part="code-block-header"]');
    if (header && !header.querySelector('.prompt-block-devin-link')) {
      var link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'prompt-block-devin-link';
      link.style.cssText = 'display:inline-flex;align-items:center;gap:6px;text-decoration:none;color:#fff;font-size:11px;font-weight:500;padding:4px 10px;border-radius:6px;white-space:nowrap;background:#317CFF;transition:background 0.2s;margin-left:8px;';
      link.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> ' + label;
      link.onmouseenter = function () {
        link.style.background = '#2968D9';
      };
      link.onmouseleave = function () {
        link.style.background = '#317CFF';
      };
      header.appendChild(link);
    }
    var existingLink = ref.current.querySelector('.prompt-block-devin-link');
    if (existingLink && href !== '#') existingLink.href = href;
  });
  return <div className="prompt-block" ref={ref}>{children}</div>;
};

<Note>
  Before you start your first session, make sure you've [indexed](/onboard-devin/index-repo) and [set up](/onboard-devin/environment) your repositories. These are the foundational steps that help Devin understand and work with your codebase.
</Note>

Now that you're all set up, kick off your first Devin session! This guide will walk you through the new session interface and help you understand the best ways to interact with Devin.

<Tip>
  Prefer working from your terminal? [Devin CLI](/cli) lets you start sessions right from the command line. Install in 2 minutes with `curl -fsSL https://cli.devin.ai/install.sh | bash`.
</Tip>

## Understanding the Devin Session Page

When you start a new session, you'll see two primary modes: **Ask** and **Agent**.

<Note>
  Unless you already have a fully scoped plan, we recommend starting with Ask to work with Devin on constructing a plan, then moving to Agent mode to execute it.
</Note>

### Ask Mode

**Ask Devin** is a lightweight mode for exploring your codebase and planning tasks with Devin, without making changes to the actual code. Ask Devin now supports both asking questions and planning:

* **Ask questions** about how your code works. Uses advanced code search to produce detailed, accurate, and well-cited answers.
* **Plan tasks** by scoping and planning work before implementation. Devin generates context-rich prompts for Agent sessions.

When you start a Devin session from Ask Devin, the session status is visible directly in the conversation.

<Frame>
  <img src="https://mintcdn.com/cognitionai/KaxfltcA8G4WlgV5/images/get-started/ada-main-page.png?fit=max&auto=format&n=KaxfltcA8G4WlgV5&q=85&s=a66e840b304f9f6ca9c5dfa18dbbc89f" alt="Ask Mode" width="2758" height="1448" data-path="images/get-started/ada-main-page.png" />
</Frame>

#### Triggering Ask Mode

You can trigger Ask mode from the main page or from a DeepWiki page.

For Ask mode from the main page, toggle to Ask mode and select the repository/repositories you want to ask about.

<Frame>
  <img src="https://mintcdn.com/cognitionai/KaxfltcA8G4WlgV5/images/get-started/ada-session-page-entry.png?fit=max&auto=format&n=KaxfltcA8G4WlgV5&q=85&s=43193478bd6ed7faa4af38d98b28d281" alt="Ask Mode from Main Page" width="2758" height="1448" data-path="images/get-started/ada-session-page-entry.png" />
</Frame>

For Ask mode from a DeepWiki page, type a query in the chat input at the bottom of the page and click Ask. This will automatically scope Devin's knowledge to that repository specifically.

<Frame>
  <img src="https://mintcdn.com/cognitionai/KaxfltcA8G4WlgV5/images/get-started/ada-deepwiki-entry.png?fit=max&auto=format&n=KaxfltcA8G4WlgV5&q=85&s=d8bd2adc7aa530f6f32801f8e662ae83" alt="Ask Mode from DeepWiki" width="2878" height="1471" data-path="images/get-started/ada-deepwiki-entry.png" />
</Frame>

Learn more in our [Ask Devin guide](/work-with-devin/ask-devin).

Once you've worked with Devin to understand the problem and create a plan, you're ready to move to Agent mode.

### Agent Mode

Agent mode is Devin's full autonomous mode where it can write code, run commands, browse the web, and complete complex tasks end-to-end. Use Agent mode when you're ready to:

* Implement features or fix bugs
* Create pull requests
* Run tests and debug issues
* Perform multi-step tasks that require code changes

#### Triggering Agent Mode

You can trigger Agent mode from the main page or from an Ask Devin session. When a session is started from Ask Devin, its status is displayed in the Ask Devin conversation so you can track progress.

For tasks that are not fully scoped, we recommend:

* Start with **Ask mode** to plan out the task
* **Construct a Devin Prompt**, which will draw from your Ask session to create a scoped plan
* Click **Send to Devin** to move to Agent mode and execute the task

This flow is shown below:

<Frame>
  <img src="https://mintcdn.com/cognitionai/BYl4s8rnjUeg9-BI/images/get-started/ada-to-agent.gif?s=fe3afc60b81ee7fa2fdaae4b7eadbe09" alt="Ask Mode to Agent Mode" width="800" height="541" data-path="images/get-started/ada-to-agent.gif" />
</Frame>

For Agent mode from the main page, toggle to Agent mode and select the repository/repositories you want to work with.

<Frame>
  <img src="https://mintcdn.com/cognitionai/KaxfltcA8G4WlgV5/images/get-started/agent-mode.png?fit=max&auto=format&n=KaxfltcA8G4WlgV5&q=85&s=57d16a630c02c971df9e5a55bd77c734" alt="Agent Mode" width="2660" height="1431" data-path="images/get-started/agent-mode.png" />
</Frame>

When starting an Agent session, you'll configure a few options: selecting a Repository and selecting an Agent.

#### Selecting a Repository

Select the repository you want Devin to work with. Click the repository selector to see all repositories that have been [added to Devin's machine](/onboard-devin/environment).

<Frame>
  <img src="https://mintcdn.com/cognitionai/KaxfltcA8G4WlgV5/images/get-started/repo-selector.png?fit=max&auto=format&n=KaxfltcA8G4WlgV5&q=85&s=9595a223283d64396cf43cd1b8e245c9" alt="Repository Selector" width="2004" height="1094" data-path="images/get-started/repo-selector.png" />
</Frame>

Selecting a repository ensures Devin:

* Has access to your codebase and can make changes
* Uses the correct branch as a starting point
* Can create pull requests to the right repository

#### Selecting an Agent

You can choose which agent configuration Devin uses for your session. Different agents may have different capabilities or be optimized for specific types of tasks.

Available agents include:

* **Devin** (default) — A general-purpose AI software engineer for building features, fixing bugs, refactoring code, and most development tasks.
* **Fast Mode** — An optimized mode for quick, well-scoped tasks.
* **[Dana](/work-with-devin/data-analyst)** — A data analyst agent optimized for querying databases, analyzing data, and creating visualizations.

<Frame>
  <img src="https://mintcdn.com/cognitionai/KaxfltcA8G4WlgV5/images/get-started/agent-selector.png?fit=max&auto=format&n=KaxfltcA8G4WlgV5&q=85&s=7c10af743b77164b0288ae12defeefba" alt="Agent Selector" width="2046" height="908" data-path="images/get-started/agent-selector.png" />
</Frame>

<Tip>
  If you're unsure which agent to use, the default Devin agent works well for most tasks.
</Tip>

<Note>
  You don't need to start a new session to change modes. You can switch the agent mid-session using the agent toggle next to the message input on the session page — the change takes effect with your next message. In Slack, you can switch modes mid-session by starting a message with `!ultra`, `!fast`, `!lite`, `!fusion`, `!swe`, or `!normal` (see [Slack mode keywords](/integrations/slack)).
</Note>

## Using @ Mentions

Use `@` mentions to give Devin specific context about files, repositories, or other resources. When you type `@` in the chat input, you'll see a dropdown of available mentions:

* **@Repos** - Reference a specific repository
* **@Files** - Reference a specific file in your codebase
* **[@Macros](/product-guides/knowledge)** - Reference a macro for a Knowledge entry
* **[@Playbooks](/product-guides/creating-playbooks)** - Reference a team or community playbook, which are detailed prompt templates that can be used to guide Devin's behavior
* **[@Skills](/product-guides/skills)** - Reference a skill defined in your repository (reusable procedures committed as `SKILL.md` files)
* **[@Secrets](/product-guides/secrets)** - Reference a specific secret (e.g. API keys, credentials, etc.) from Devin's session manager
* **@Sessions** - Reference a previous Devin session for context

<Frame>
  <img src="https://mintcdn.com/cognitionai/KaxfltcA8G4WlgV5/images/get-started/at-mention.png?fit=max&auto=format&n=KaxfltcA8G4WlgV5&q=85&s=054556b638d4418a4da99871f57ed96e" alt="At Mentions" width="1860" height="1104" data-path="images/get-started/at-mention.png" />
</Frame>

@ mentions help Devin understand exactly what you're working with and reduce ambiguity in your prompts.

## Scoping Your First Session

Start with tasks that have **clear success criteria** and **provide Devin with the context it needs** — just as you would when handing off work to a teammate. As you get comfortable, try progressively more complex tasks. We've seen users work with Devin on everything from fixing small bugs to targeted refactors to large-scale migrations and building entire features from scratch.

<Tip>
  As a rule of thumb: if a task would take you three hours or less, Devin can most likely do it. For larger projects, break them into focused sessions and run them in parallel with [managed Devins](/work-with-devin/advanced-capabilities#managed-devins).
</Tip>

## First-time Prompt Ideas

<AccordionGroup>
  <Accordion title="Adding a new API endpoint" icon="code-pull-request">
    <PromptBlock>
      ```Adding a new API endpoint theme={null}
      Create a new endpoint /users/stats that returns a JSON object with user count and average signup age. 

      Use our existing users table in PostgreSQL. 

      You can reference the /orders/stats endpoint in statsController.js for how we structure responses. 

      Ensure the new endpoint is covered by the StatsController.test.js suite.
      ```
    </PromptBlock>
  </Accordion>

  <Accordion title="Small frontend features" icon="sun">
    <PromptBlock>
      ```Small frontend features theme={null}
      In UserProfileComponent, add a dropdown that shows a list of user roles (admin, editor, viewer). 

      Use the styling from DropdownBase. 

      When a role is selected, call the existing API to set the user role. 

      Validate by checking that the selection updates the user role in the DB. Refer to your Knowledge for how to test properly.
      ```
    </PromptBlock>
  </Accordion>

  <Accordion title="Write unit tests" icon="flask">
    <PromptBlock>
      ```Write unit tests theme={null}
      Add Jest tests for the AuthService methods: login and logout. 

      Ensure test coverage for these two functions is at least 80%. 

      Use UserService.test.js as an example.

      After implementation, run `npm test -- --coverage` and verify the coverage report shows >80% for both functions. 

      Also confirm that tests pass with both valid and invalid credentials, and that logout properly clears session data.
      ```
    </PromptBlock>
  </Accordion>

  <Accordion title="Migrating or refactoring existing code" icon="code-pull-request">
    <PromptBlock>
      ```Migrating or refactoring existing code theme={null}
      Migrate logger.js from JavaScript to TypeScript. 

      We already have a tsconfig.json and a LoggerTest.test.js suite for validation. 

      Make sure it compiles without errors and make sure not to change the existing config!

      After migration, verify by: 
      1) running `tsc` to confirm no type errors
      2) running the test suite with `npm test LoggerTest.test.js` to ensure all tests pass
      3) checking that all existing logger method calls throughout the codebase still work without type errors.
      ```
    </PromptBlock>
  </Accordion>

  <Accordion title="Updating APIs or database queries" icon="database">
    <PromptBlock>
      ```Updating APIs or database queries theme={null}
      We're switching from pg to sequelize (read https://sequelize.org/api/v6/identifiers). 

      Please update the UserModel queries to use Sequelize methods. 

      Refer to OrderModel for how we do it in this codebase.

      After implementation, verify by:
      1) running `npm run test:integration UserModel.test.js` to check all integration tests pass
      2) confirming query performance hasn't degraded by checking execution time on a test dataset of 1000 users
      3) validating that all CRUD operations still maintain data integrity by running `npm run test:e2e user-flows.test.js`
      ```
    </PromptBlock>
  </Accordion>

  <Accordion title="Create a quick PR (we recommend using this prompt in a Playbook)" icon="code-pull-request">
    <PromptBlock>
      ```txt Quick PR theme={null}
      ## Overview
      The task is to make a quick pull request to a repository.
      Since this is a 'quick' PR, you will not need to run any code or test anything; simply make a PR and the user will handle the testing. Your only responsibility is reading and writing code.

      ## What's Needed From User
      - The repository to create a pull request

      ## Procedure
      ### Prepare your workspace
      1. Navigate to the relevant repository on your machine (clarify with the user if you can't figure it out).
          - Check out the main branch and note down the name of the main branch.
          - Checkout to a new branch since you'll be making a pull request. The name of the branch has to be of the format `devin/<timestamp>-<your-branch-name>`. For example `devin/1700000000-fix-popup`. Run `git remote -v && git pull && git checkout -b devin/$(date +%s)-{branch-name}` and replace `{branch-name}` with the name of the branch you want to create.
      2. Study the request, codebase, and plan out the changes
          - Review the most relevant files and code sections, identifying relevant snippets.
          - Inform the user of your plan
      ### Work on the PR itself
      3. Make the code changes
          - Don't change anything that wasn't specifically requested by the user
      4. Make the PR
          - Commit and push the changes and tell the user.
          - See advice section for the exact command to make the PR
          - Make a pull request & review the pr to make sure it looks OK.
          - Ensure all GitHub actions pass successfully & make necessary changes until they do
          - Send the PR link to the user and summarize what you changed.
      5. Address any feedback from the review; send the PR link again every time you make any changes
          - If you need to make updates, just push more commits to the same branch; don't create a new one


      ## Task Specification
      - PR link is included in your messages to the user
      - PR was reviewed after creation
      - PR does not include any stray changes
      - PR does not change anything that wasn't specifically requested by the user
      - PR description should include a summary of the changes, formatted as a checklist
      - PR description should mention that the code was written without testing, and include - [ ] Test the changes as an item
      - PR description should include the following footer: "This PR was written by [Devin](https://devin.ai/) :angel:"
      - PR description should include any metadata that the user has provided (e.g. linear ticket tags in the appropriate syntax)
      - PR description should not be malformatted (use --body-file instead of --body if the newlines are garbled!)

      ## Forbidden Actions
      - Do NOT try to access github.com through the browser, you will not be authenticated.
      - NEVER force push on branches! Prefer merging over rebasing so that you don't lose any work.
      - Do NOT push directly to the main branch.

      ## Advice and Pointers
      - Double check the name of the main branch (which could be `main` or `master`) using `git branch`.
      - For repos with CI/CD on github actions, you can check build logs using the gh cli. if you're asked to fix a build/fix lint, you should start by looking at recent build logs
      - Check `git status` before committing or adding files.
      - Use `git diff` to see what changes you have made before committing.
      - If you're updating an existing repo, use `gh cli` to make pull requests.
      - Send the PR link to the user every time you update & ask them to re-review so that it's convenient for them
      - You should already be authorized to access any repositories the user tells you about. If not, ask the user for access.
      ```
    </PromptBlock>
  </Accordion>
</AccordionGroup>

If you'd like to dig in to some more detailed examples of what Devin can do (and how), check out our **use cases**.

<CardGroup cols={1}>
  <Card title="Browse Use Cases" icon="grid-2" href="/use-cases/gallery/index">
    Explore practical examples across engineering workflows — each includes prompts you can try immediately.
  </Card>
</CardGroup>

## After Your Session

Once Devin finishes, open [Session Insights](/product-guides/session-insights) and click **Generate Analysis** — you'll get a timeline of what happened, actionable feedback, and an improved prompt you can use for similar tasks in the future.

## Next Steps

Once you're comfortable with basic sessions, explore these resources to get more out of Devin:

<CardGroup cols={2}>
  <Card title="Integrations" icon="plug" href="/integrations/overview">
    Connect Devin to your existing tools like GitHub, Slack, Jira, and more.
  </Card>

  <Card title="Playbooks" icon="book" href="/product-guides/creating-playbooks">
    Learn how to use Playbooks to implement tasks.
  </Card>

  <Card title="Knowledge" icon="lightbulb" href="/product-guides/knowledge">
    Add knowledge to help Devin understand your team's practices.
  </Card>
</CardGroup>
