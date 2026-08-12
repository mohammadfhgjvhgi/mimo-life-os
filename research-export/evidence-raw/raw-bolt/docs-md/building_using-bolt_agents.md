> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Choose an agent

> Learn about the agents you can use to build your Bolt projects.

Bolt uses an AI agent to plan your project, write code, and troubleshoot as you build. Bolt offers two agents, Standard and Max, powered by large language models.

You choose the agent that matches your work, and Bolt handles model selection behind the scenes. As new models become available, Bolt can update how agents perform without changing your workflow.

<Info>
  To learn more about the technology behind Bolt's agents, see [Introduction to LLMs](/concepts/intro-llms).
</Info>

## Agents

Choose the agent that's best suited to what you're building.

<Note>
  Only Standard is available on the free plan. To use Max, [upgrade to a paid plan](/account-and-subscription/billing#upgrade-your-free-plan-to-a-paid-plan).
</Note>

### Standard

Balanced for everyday building.

Standard is fast and token-efficient, which makes it a good default for most development work. It performs best when the task is well defined.

Best for:

* Small or medium-scale applications
* UI updates
* General development
* Clear, well-defined tasks

### Max

Maximum reasoning for complex tasks.

Max thinks more about each step, which makes a difference when the task involves working through large codebases with complex dependencies or solving problems without an obvious solution. Max is also more responsive to detailed prompts: if you describe a specific problem and ask it to think carefully, it uses deeper reasoning in that area.

For tasks where Standard already performs well, Max may not show a noticeable difference.

Best for:

* Large-scale applications
* Complex or interconnected features
* Refactoring existing code
* Open-ended tasks

The best way to find what works for your projects is to experiment. Try both agents on the kinds of tasks you do most and see which one gives you the results you want.

## Switch agents

You can switch agents in two places: from the Bolt homepage when starting a build, or inside a project while working. For each project, Bolt remembers your selection and automatically uses the same agent the next time you open the project.

If you want all new projects to use a specific agent, you can [set a default agent in your account settings](/settings/account-settings#general-account-settings). Bolt then automatically selects that agent when you start a new project.

### Switch agents on the homepage

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784153314/choose-agent-homepage_fdh1sj.png" alt="On the Bolt homepage with the agent selection dialog open and showing the Standard and Max agents." />
</Frame>

From the Bolt homepage, use the drop-down selector at the bottom of the chatbox to choose your agent.

### Switch agents in a project

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1778777867/choose-agent-project_lftj51.png" alt="Inside a Bolt project with the agent selection dialog open from the chatbox and showing the Standard and Max agents." />
</Frame>

To switch agents while working inside a project:

1. In the bottom-left corner of the chatbox, click the **current agent name**.
2. Select the agent you want to use.

<Tip>
  Hover over an agent's name to see more details about it.
</Tip>
