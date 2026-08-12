> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Prompt effectively

> Tips for writing better prompts.

When building with Bolt, the quality of your results will often depend less on how well you know code and more on how clearly and effectively you can express your ideas through prompts.

Learning to prompt well is like learning a new language: the better you get at it, the more powerful and precise your builds will become. \
\
The prompting techniques video below is a great place to get started!

<Frame>
  <iframe width="700" height="394" src="https://www.youtube.com/embed/4216fio6XiA?si=qAhqDuPS-sv5hI78" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
</Frame>

## Plan your app, and your first prompt

When you start with a clear, well-structured prompt, you set yourself up for success.

Think of your prompt as a blueprint. The clearer your blueprint, the smoother the build process will be and the less likely you’ll need to rework things down the line.

Not sure where to begin? Our guide on [Planning your app](/get-started/project-lifecycle) walks you through practical ways to organize your ideas and start with a powerful first prompt.

## Automatically improve your prompt

Bolt has a built-in feature to help you create better prompts:

<Frame>
  <video className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/video/upload/f_auto,q_auto/v1776453551/enhance-prompt-guided-questions_t74hvs.mp4" alt="The chatbox with the Enhance prompt option open and guided questions displayed." controls={true} autoPlay={true} muted={true} loop={true} />
</Frame>

1. In the chatbox, type your prompt.
2. In the bottom-left corner of the chatbox, click the **plus icon**, then click **Enhance prompt**.
3. In the **Help us enhance your prompt** dialog, answer each question to give Bolt more information about what you're building.
4. Bolt generates a recommended prompt, which you can edit.

### Comparing original and enhanced prompt results

The image below compares two websites created with the same prompt. The version on the right was built with a simple prompt, while the version on the left was enhanced to produce a more engaging homepage and additional pages.

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1760456999/prompt-comparison_dkq44y.png" alt="Comparison of a website built with a simple prompt versus an enhanced prompt." />
</Frame>

## Prompting quick tips

* Start with the application architecture, including your choice of tools, frameworks, and so on.
* [Clear context](/best-practices/manage-context#clear-context) regularly, so long as you're sure Bolt doesn't need to remember anything short-term.
* Add individual components and features, one by one.
* Add in details in each component with small, specific prompts. Avoid overwhelming the LLM with too many instructions and requirements at once.
* Be explicit about what should and shouldn't change. You can [tell Bolt to change or not change specific files](#guide-bolts-focus). When possible, refer to specific elements, classes, or functions to guide Bolt to the exact place where you want the changes made.
* Don't expect the LLM to have common sense.

## Guide Bolt's focus

You'll get more accurate results if you're explicit about what Bolt should and shouldn't change.

### Limit Bolt to specific files

1. Open a Bolt project.
2. Click the **code icon (\<>)** in the top center of your screen to switch to Code view.
3. Right-click the files you want to focus on.
4. Click **Target file**.

### Exclude specific files or directories

1. Open a Bolt project.
2. Click the **code icon (\<>)** in the top center of your screen to switch to Code view.
3. Right-click the files or directories you want to exclude.
4. Click **Lock file** (single file) or **Lock all** (directory).

### Focus on a specific code section

1. Open a Bolt project.
2. Click the **code icon (\<>)** in the top center of your screen to switch to Code view.
3. Highlight the code you want to discuss or change.
4. Click the **Ask Bolt** button (if the button doesn't appear immediately, try right-clicking). Bolt links the selection in the prompt box.
5. Enter your question or request.

## Troubleshooting prompting

If Bolt doesn’t respond exactly as you expect, try these steps to work through common issues.

### Bolt didn’t complete everything you asked for

Break your request into smaller parts. Ask Bolt to make one change at a time.

1. Make one change.
2. Check that the change works.
3. Move on to the next update or feature.

### Bolt forgets what you told it earlier in the same chat

Bolt's ability to remember your chat history isn't infinite.

A way to preserve information while keeping the chat history window small is to ask Bolt to summarize your conversations so far, then reset your chat history by duplicating your project.

See [Clear context](/best-practices/manage-context#clear-context) for instructions.

## Customize knowledge for your account, project, or team

Knowledge is a set of persistent instructions Bolt uses for context when it responds in a project. You can use it to guide Bolt's tone, focus, or behavior every time it responds. You can set knowledge separately for your account, project, or team:

* Account knowledge applies to all your projects. Set it in your [Account settings](/settings/account-settings#knowledge).
* Project knowledge is specific to each project. Set it in your [Project settings](/settings/project-settings#knowledge).
* Team knowledge applies to all projects created within your team. Set it in your [team's workspace settings](/settings/workspace-settings#knowledge).
