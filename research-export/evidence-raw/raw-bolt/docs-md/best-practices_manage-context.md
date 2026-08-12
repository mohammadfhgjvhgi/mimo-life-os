> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage project context

> Keep your context window small for better performance.

Bolt keeps track of your chat history in its context window, which is the working memory it uses to understand your project and prompts.

Context includes your project's files and everything you send Bolt in the chat, including your prompts and any files you upload. An uploaded file can add to your context even if it isn't stored in your project.

As your project grows and your chat history gets longer, Bolt has to store more information in your project's context. When the amount of context gets too large for Bolt to reliably process, you might see errors, slower responses, or lower-quality results.

Use the strategies in this article to manage your project context and help keep Bolt performing well.

<Tip>
  Managing context is related to managing tokens. Context management focuses on Bolt's performance, but it can improve token efficiency, too. To get the most out of your tokens, combine these strategies with ways to [maximize token efficiency](/best-practices/maximizing-token-efficiency).
</Tip>

## How Bolt handles context

Bolt agents support large context windows. However, to keep performance smooth, Bolt limits the active history to recent messages. This helps Bolt run more efficiently and use fewer tokens.

If an earlier detail becomes important again, restate it to bring it back into context.

## Use project knowledge for ongoing context

Context is Bolt's working memory, and its purpose is to keep track of recent messages. The context window has a limit, so Bolt can forget older messages, and context resets when you [clear it](#clear-context).

Knowledge, on the other hand, is persistent. Bolt can always access it, even in long conversations or after you've cleared the context.

Use [project knowledge](/settings/project-settings#knowledge) for information that always applies to your project, like its goals and core features. Because this information lives outside the active conversation, you don't have to restate it in every prompt, and it isn't cleared when you reset context.

## Use an agents.md file

Bolt supports using an `agents.md` file in your project. After you add an `agents.md` file, Bolt finds and uses it automatically.

To upload a file:

1. Open your project.
2. In the chatbox, click the **plus icon**.
3. Click **Attach file**, then choose your file.

You can use an `agents.md` file on its own or alongside [project knowledge](/settings/project-settings#knowledge). Project knowledge lets you enter text, so you can define your project's goals, core features, and design principles. The `agents.md` file is a Markdown file, which gives you more flexibility to include links or organize information across multiple files.

<Note>
  The `agents.md` file is the entry point for agent instructions. It can reference other files, but the main instructions need to be in `agents.md` itself. The file name is required. Agents look for instructions starting from `agents.md`, then follow any links or references you include from there.
</Note>

## Use shorter prompts as your project grows

A long, detailed prompt works well for starting a new project because it helps Bolt understand exactly what you want to build, and there's no other information Bolt has to keep in context.

When your project is already large, sending a very long prompt adds to a context window that's already close to full, which can affect how well Bolt handles the request.

As your project grows, break large requests into smaller, focused prompts instead. To learn more, see [Prompt effectively](/best-practices/prompting-effectively).

## Clear context

Clearing the context resets Bolt's understanding of your project. With less information in the context window, your requests use fewer tokens.

After you clear context, Bolt still has access to your codebase and files, but it evaluates them as if seeing them for the first time. It no longer remembers your recent chat history or how your codebase has changed over time.

Because of this, we recommend clearing context when your recent history becomes less important, like when you finish work on a feature or workflow in your project.

If your project is large, you can clear context proactively to keep it below the limit, rather than waiting until you notice slower responses.

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1783029285/clear-context_gdyhnq.png" alt="The chatbox with the /clear command showing as input and Clear context available in the menu." />
</Frame>

To clear context:

* In the chatbox, enter `/clear`, then click **Clear context** in the menu that appears.

## Reduce the size of your project

As your project grows, Bolt has to process more source material to understand your code and respond to your prompts. Reducing how much information Bolt needs to read helps keep your context manageable.

There are a couple ways to reduce your project size:

* Clean up unused files.
* Break up large files into smaller ones (also called *refactoring*).

### Before you start

Before you clean up or refactor your project, [download](/building/using-bolt/projects-files#download-a-project) your project as a backup.

By default, Bolt keeps a [version history](/building/using-bolt/rollback-backup#restore-using-version-history) of your project. If a cleanup causes unexpected changes, you can restore a version saved before the cleanup ran.

Downloading your files is still useful if you want to make specific updates after a cleanup, like adding back selected files instead of restoring an entire earlier version.

### Clean up unused files

You can ask Bolt to find and remove unused files from your project. If you're comfortable using the terminal, you can also run a cleanup command yourself in [Code view](/building/using-bolt/code-view), which doesn't use tokens.

#### Ask Bolt to clean up your files

Anyone can clean up files by prompting Bolt, with no Code view required. Try a prompt like:

`Remove any unused files and components from this project.`

As Bolt builds, it may add Markdown (`.md`) files for record-keeping. After storing these files, it reads them into your context on every prompt. To get rid of Markdown files you no longer need, try a prompt like:

`Look at the number of .md files in this project and keep only the ones that have necessary project context.`

#### Run Knip in the terminal (optional)

Knip is a tool that finds and removes unused files. Running it in the terminal doesn't use any tokens, so it's a good option if you're comfortable working from the command line.

1. Open the terminal in [Code view](/building/using-bolt/code-view).
2. Run the following command:

   `npx knip --production --fix --allow-remove-files`
3. Check the output in the terminal to confirm the command ran successfully.

### Break up large files

Large files are a common reason the context window gets too full. When Bolt has to process files with thousands of lines of code, the context window fills up quickly.

To break up large files:

1. Ask Bolt for a list of any files in your project longer than about 700 lines. For example, use a prompt like this:

   `Scan my entire project and list every file over 700 lines. For each one, show the file name, its path, and its line count, sorted by longest first. Don't change anything yet. I just want the list.`
2. Copy the list from the chatbox and save it somewhere you can refer back to, like a text file.
3. Ask Bolt to refactor each file. For example, use a prompt like this:

   `Please refactor [filename] by splitting it into multiple files. Keep the original file to act as a router so the app continues to function after the refactor. Add basic comments to these files to understand what each file and its parts are for.`

   Repeat this prompt for each file, and test your project after each refactor to make sure it works as expected. Testing one file at a time makes it easier to spot any unintended changes.

Refactoring uses tokens up front, but it reduces token use as you keep building. Smaller files are easier for Bolt to read, so it processes less code on each change.
