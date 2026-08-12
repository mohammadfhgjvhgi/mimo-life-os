> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Plan before building with Plan Mode

> Chat with Bolt to get help without immediately generating code.

Bolt has a chat mode called **Plan Mode** where you can plan and ask questions without making changes to your code. Plan Mode provides project-specific help, drawing on Bolt's documentation and other online sources when needed.

Using Plan Mode lets you explore ideas safely, save tokens by avoiding unnecessary code exchanges, and ensure you get things right before moving into Build Mode.

## Features

### Project context awareness

Every discussion message includes your project codebase for context-aware responses, as well as the most recent messages.

Because Plan Mode has the entire context of your project, there is a wide range of use cases, including:

* Debugging assistance
* Recommendations on tools, libraries and APIs
* Product/project decision-making
* Suggestions on how to improve design
* Suggestions for new features
* Understanding and integrating external APIs
* Generating implementation plans for later execution
* Use the Inspector tool to highlight a component within a page, and discuss potential changes

### Web research

When Bolt answers a question, it can pull in real-time, up-to-date information from trusted web sources instead of just relying on what it was trained on. This helps ensure the answers are accurate, relevant, and not outdated. When a search has been conducted, Bolt displays the sources at the top of the response.

For example:

* If you ask about the latest Stripe API updates, Bolt won't just rely on old knowledge; it will search for the latest documentation and give you a more reliable answer.
* If you ask about a bug in a popular library, it can check forums or support pages for the most recent solutions.

### Quick action buttons

If your question or prompt has an intuitive action associated with it, Bolt will likely generate quick action buttons at the end of its response.

With these buttons, you can take immediate actions such as:

* **Implement this plan** (auto-switches to Build Mode to apply changes)
* **Show an example**
* **Refine this idea**

The quick action buttons are contextual and will vary depending on your project and the topic of discussion.

## How to use Plan Mode

Plan Mode helps you map out steps, reason through complex problems, and build strategies.

While its main strength is structured planning, it can also search the web or explore your codebase if needed.

### Use Plan Mode on the Bolt homepage

You can begin your Bolt project in Plan Mode right from the first prompt. This lets you create and refine a plan through back-and-forth discussion before executing a build, helping you avoid unwanted changes and use fewer tokens overall.

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784302705/plan-mode-homepage_bl6hgi.png" alt="The Bolt homepage with a prompt entered in the chatbox and the Plan mode button activated and showing blue text." />
</Frame>

Click **Plan** before submitting your prompt to generate a plan for your build. Plan Mode highlights blue when active. Click it again to turn it off and return to Build Mode.

<Warning>
  When you use Plan Mode from the homepage, it starts by creating the base structure of your app. After that, it shares a plan in the chatbox. You can review this plan, suggest changes, and continue building step by step.
</Warning>

<Note>
  If you want to create a mobile app, it’s important to mention this directly in your prompt. For example, you might prompt: “Build a mobile app that helps people track their daily habits.”
</Note>

### Use Plan Mode in a project

<img src="https://mintcdn.com/stackblitz/xh8ll6PCqxO7eT6E/images/plan-project-in.png?fit=max&auto=format&n=xh8ll6PCqxO7eT6E&q=85&s=6323370be73fac50e6b94b619d03fbab" alt="Plan Mode enabled in a Bolt project" width="1778" height="1006" data-path="images/plan-project-in.png" />

1. Open your project.
2. In the bottom-right corner of the chatbox, click **Plan**.
3. Enter your question or prompt, and read the response. You can then either:
   * Continue the discussion.
   * Use one of the quick action buttons to implement the suggestion.

<Tip>
  Plan Mode highlights blue when active. Click it again to turn it off and return to Build Mode.
</Tip>
