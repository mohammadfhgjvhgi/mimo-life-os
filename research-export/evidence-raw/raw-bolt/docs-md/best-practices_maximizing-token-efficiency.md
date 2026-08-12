> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Maximize token efficiency

> Optimize token usage to keep your costs down.

Tokens are small pieces of text that AI uses to read and generate content. Short, common words are typically one token each, but longer or less common words can be several. Bolt consumes tokens when it reads your prompts and project files, thinks, responds to your prompts, and builds in your project.

<Tip>
  Managing token use is related to managing context. Bolt processes fewer tokens when it has less context to process, so keeping your context low improves both performance and token efficiency. To get the most out of your tokens, combine these strategies with ways to [manage project context](/best-practices/manage-context).
</Tip>

## Plan before you build

Planning your app before you start building can save time and tokens by helping you avoid rework later. Decide what type of app you're making, who it's for, and the key features you need, then write a clear first prompt and build step by step. To learn more about project planning, see [Project lifecycle](/get-started/project-lifecycle).

Use [Plan mode](/best-practices/plan-mode) to talk through your plan, troubleshoot, or make decisions with Bolt without changing your code. In Build mode, every prompt you submit updates your code and uses tokens, but Plan mode uses fewer tokens because it doesn't make any changes to your project.

## Choose the right agent for efficient token use

Each Bolt agent uses tokens differently. For tasks of average complexity, the Standard agent gives you accurate results without the additional token cost of deeper reasoning. For more complex tasks, the Max agent uses more tokens to work through the full scope of your task.

Using the Max agent for straightforward tasks may use more tokens than necessary, and using the Standard agent for complex tasks may require more prompts to achieve your goal. To use tokens effectively, [choose the agent](/building/using-bolt/agents) best suited to your task.

## Keep your prompts specific and focused

When prompting, be clear and specific. Tell the agent to focus on specific files or functions rather than the entire codebase. See [Prompt effectively](/best-practices/prompting-effectively) for more detailed guidance on prompting.

## Use buttons instead of prompting where possible

Whenever they're available, use buttons and built-in actions rather than asking Bolt to do the same task for you. For example:

* Use the Publish button instead of prompting Bolt to [publish your site](/cloud/hosting/publish).
* Use the Version History feature instead of prompting Bolt to [revert to a previous version of your project](/building/using-bolt/rollback-backup#restore-using-version-history).

Clicking an on-screen button or action doesn't use tokens, but prompting Bolt does.

## Add functionality incrementally

Before adding advanced functionality, make sure your project's basic functionality is in place.

* **Create your core pages:** For example, a homepage, a dashboard, and a basic contact or help page
* **Set up navigation:** Make sure users can move between pages smoothly, like jumping from a leads page to a customer profile in a CRM
* **Keep the design consistent:** Use the same colors, fonts, and layout so the app feels professional and easy to use

Once you have that solid foundation, add new features one at a time.

* Start small, like adding a form to capture leads or customer data
* Next, add functionality to store and display those records, like a simple customer list or profile view
* Continue adding search, filters, or analytics so users can find data quickly
* Test after each new piece to catch problems early and avoid breaking what already works

This step-by-step approach makes it easier to test changes, fix issues as they arise, and maintain your app's stability as it grows. Think of it like building with blocks: get the base right, then stack on new pieces carefully so everything stays strong.

## Turn on connectors only when you need them

[Connectors](/building/using-bolt/connect-mcp) are a powerful way to give Bolt real-world information from your external tools and data sources. However, adding information to Bolt's context increases token consumption. We recommend turning on connectors for a project only when you need them. To learn more, see [Best practices for using connectors](/building/using-bolt/connect-mcp#best-practices-for-using-connectors).

## Avoid repeated automated error fix attempts

When an error occurs, Bolt gives you the option to try an automatic fix. Sometimes clicking it a second time will resolve the issue, but remember that each attempt uses tokens. Avoid clicking **Attempt fix** over and over, hoping for things to eventually work out.

If Bolt can’t resolve the issue with automatic fixes, research the errors you’re getting and step in manually.

You can also switch to Plan mode to ask focused questions, explore solutions, and confirm a plan before the next fix.

## Add error handling to your project

If you find yourself stuck in an error loop, a useful strategy is to prompt Bolt to enhance error handling and implement detailed logging throughout the problematic area.

When prompted to, Bolt excels at inserting robust error logs, even at a granular level, such as between functions or key steps. These logs provide valuable feedback that the AI can use to better understand the root cause of the issue.

This additional logging also provides more precise information when the error occurs again. With this detailed feedback, Bolt can make more accurate adjustments to fix the issue.

## Undo changes using the Version history feature

Use the [Version history](/building/using-bolt/rollback-backup) feature to restore your project to a previous state without consuming tokens. This is similar to an undo button that can take you back to any prior state of your project.

If you've made a change you don't like, rather than prompting Bolt to fix it, you can switch back to a previous version of your project without using tokens.

This can save time and tokens if something goes wrong with your project.

## Clear context

Clearing Bolt's context resets its understanding of your project so your requests use fewer tokens. To learn when and how to clear context, see [Clear context](/best-practices/manage-context#clear-context).

## Reduce the size of your project

A smaller project uses fewer tokens, because Bolt has less code to read and process. There are a few strategies that can reduce your project size, including cleaning up unused files and splitting large files into smaller ones. To learn more, see [Reduce the size of your project](/best-practices/manage-context#reduce-the-size-of-your-project).
