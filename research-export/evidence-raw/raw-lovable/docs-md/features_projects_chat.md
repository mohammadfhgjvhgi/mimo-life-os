> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat with Lovable to build your app

> Everything you can do in Lovable's chat panel. Write or dictate prompts, attach files, queue messages, answer Lovable's questions, undo changes, and fix errors.

The chat panel on the left side of the editor is where you tell Lovable what to build. You describe what you want in plain language, Lovable does the work, and each response shows what changed so you can review it, steer it, or undo it.

Behind every message, Lovable's agent works in a loop: it gathers context from your conversation and project, takes action with tools, and checks the result before moving on. You'll see that loop reflected in everything below, from activity cards to the questions Lovable asks.

<Tip>
  You can ask Lovable anything, not just build requests. Ask how your app works, what a term means, or anything else on your mind, and Lovable answers in chat.
</Tip>

## The prompt box

Type your message into the text field at the bottom of the chat panel, then press **Enter** or click the send button. You don't need any special phrasing. Describe the outcome you want rather than the implementation:

```text wrap theme={null}
Add a sign-up form with email and password fields.
```

See [Prompting best practices](/prompting/prompting-one) for more guidance.

Around the text field you'll find:

* **The microphone**: Dictate your message instead of typing. Click it to start recording, or press **Option+V** (Mac) or **Alt+V** (Windows/Linux). When you finish, click the check, and Lovable transcribes your words into the prompt box for you to review and send. Click the X instead to discard the recording.
* **The mode toggle**: Switch between [Build and Plan mode](#modes), or press **Option+P** (Mac) or **Alt+P** (Windows/Linux).
* **The <Icon icon="plus" size={14} /> button**: Open the [Chat actions menu](#chat-actions) to attach files, add references, and reach common project tools.

## Modes

The mode toggle next to the chat input switches how Lovable responds:

* **Build**: Lovable makes changes directly in your project. This is the default, and the right choice for most requests, from small tweaks to whole features. Cost is usage-based, and many requests cost less than one credit. See [Build mode](/features/agent-mode).
* **Plan**: Lovable discusses, investigates, and plans without touching your code. Use it to think through a bigger feature, debug an issue safely, or compare approaches before building. Each Plan mode message costs one credit. See [Plan mode](/features/plan-mode).

You can switch modes at any time, and the conversation carries across both.

## Chat actions

Click the **<Icon icon="plus" size={14} />** button next to the chat input to open the **Chat actions** menu, the quickest route to attaching context and common project tools:

* **Settings**: Open the settings dialog on your project's **General** tab, where you rename the project, manage publishing options, and more. See [Project settings](/features/projects/settings).
* **History**: Open your project's [version history](/features/projects/history) to browse and restore earlier versions.
* **Knowledge**: Write persistent instructions that Lovable follows in every request, such as your product context or design rules. See [Knowledge](/features/knowledge).
* **GitHub**: Connect your project to a GitHub repository with two-way sync, so changes flow in both directions. See [GitHub](/integrations/github).
* **GitLab**: Connect your project to a GitLab repository with two-way sync, so changes flow in both directions. See [GitLab](/integrations/gitlab).
* **Project connectors**: See the services your project is connected to and the chat connectors available to it, and click any connection to manage it. See [Connectors](/integrations/introduction).
* **Take a screenshot**: Capture the current preview and attach it to your message, useful for pointing at what you're discussing.
* **Add reference**: Open the `@` picker to point Lovable at:
  * **[Code](/features/code-mode)**: Files in your project's codebase.
  * **[Files](/features/generate-files)**: Documents you uploaded or Lovable generated.
  * **[Connectors](/integrations/introduction)**: A selection of popular connectors to pull content from.
  * **[Projects](/features/cross-project-referencing)**: Other projects in your workspace.
* **Add skill**: Browse your workspace's [skills](/features/skills), reusable instruction sets, and run one. Picking a skill types the `/` command for you.
* **Attach**: Add files from your computer to your message. See [Attach files as context](#attach-files-as-context).

## Attach files as context

Attachments show Lovable what you mean. Attach a design mockup to match, a screenshot of a bug to fix, or a document to build from, like a product brief, a spreadsheet of data, or an audio note. Attachments work the same when you [create a project](/features/projects/overview#ways-to-create-a-project) from the dashboard: attach files to your very first prompt.

To add files, use **Attach** in the **Chat actions** menu, drag files into the chat, or paste them. Lovable reads what you attach: images, PDF, Word, Excel, and PowerPoint files, and even audio recordings. Ask questions about an attached document, or tell Lovable to use its content in your app.

Each file can be up to **20 MB** on the Free plan, **256 MB** on paid plans, and **1 GB** on Enterprise. You can attach up to 10 files per message. Images can total up to 15 MB per message, and Lovable compresses large ones automatically. If an upload fails, try again with fewer or smaller files.

After attaching an image, click it to open the preview and draw on it, for example to circle the part you want changed. Lovable receives the annotated image with your message.

To put an image or video into your app itself rather than show it to Lovable, see the next section.

## Add images and videos to your app

To place media in the app you're building, use whichever of these fits:

* **Ask Lovable to generate it**: Lovable can generate images, edit existing ones (including making backgrounds transparent), and even generate short videos. Describe what you want:

  ```text wrap theme={null}
  Generate a hero image of a mountain at sunrise.
  ```

* **Attach the image in chat**: Upload the image and tell Lovable where it goes:

  ```text wrap theme={null}
  Replace the logo in the navbar with this image.
  ```

* **Point at an existing image**: In the preview, use **Select elements** in the [preview toolbar](/features/preview-toolbar) to select the image you want to change, attach the replacement or paste its URL, and describe the update.

* **Reference a hosted URL**: If the image already lives somewhere online, paste its URL in chat and tell Lovable where to use it. Be mindful of copyright.

* **Upload to your Git repository**: If your project is connected to [GitHub](/integrations/github) or [GitLab](/integrations/gitlab), upload media files to the repository's `public` folder, then reference them by path:

  ```text wrap theme={null}
  Add public/hero-image.jpg to the hero section.
  ```

* **Embed a video**: Link to a hosting service like YouTube and ask Lovable to embed it. For example:

```text wrap theme={null}
Embed this video https://www.youtube.com/watch?v=your-video-id in the hero section.
```

<Warning>
  Large files stored in your project make it slower to load and preview. Compress images to the size they're displayed at, and host videos on a service like YouTube instead of uploading the file to your repository.
</Warning>

## While Lovable works

Lovable working on one request doesn't block you. Here is what you can do in the meantime.

### Queue your next prompts

You don't have to wait for Lovable to finish before sending your next request. In both Build and Plan mode, new messages join a visible queue above the chat input and run one at a time, in order. You can pause and resume the queue, reorder prompts, edit, copy, or remove them, and repeat a queued prompt up to 50 times. Queued prompts keep the files, elements, and references you attached to them.

### Follow the work in activity cards

Lovable's individual actions show up in chat as expandable activity cards: file edits, commands, web searches, browser tests, and the [subagents](/features/subagents) it delegates research to. Expand a card to inspect the details. On bigger Build mode requests, Lovable also shows the tasks it's working through. See [Build mode](/features/agent-mode#tasks-and-execution-visibility).

### Stop mid-task

If you need to change course, click the **stop button** while Lovable is responding. Lovable keeps the work completed so far, and the message is charged for the work already done. You can then send a new message with better direction.

## Answer Lovable's questions

When Lovable needs more direction, it can pause and show a question card instead of guessing. The card holds up to four questions, each with answer options, and you can pick an option or write your own answer.

You stay in control of how much you answer:

* Move between questions and change earlier answers before submitting.
* Skip a single question, or skip them all. If you skip everything, Lovable picks reasonable defaults and continues.
* Draft answers are kept in your browser, so refreshing the page doesn't lose them.

For open-ended visual work, Lovable can also show design directions to choose from directly in chat, so you steer the look before it builds. See [Design guidance](/features/design-guidance#design-directions).

## Act on Lovable's responses

When Lovable finishes a task, its response summarizes what it did and what changed, and a row of actions lets you react without typing:

* **Undo latest edit** (latest response only): Reverse Lovable's most recent change in one click, with no confirmation.
* **Revert to this version** (earlier responses): Restore your project to that point after you confirm. Works the same as reverting from [version history](/features/projects/history).
* **Copy**: Copy the response text, for example to save an explanation Lovable gave you.
* **Helpful** / **Not helpful**: Rate the response to give feedback on the result.

The **More options** menu on a response shows:

* **Copy message link**: Copy a direct link to that message, handy for pointing a collaborator or support to the exact step where something happened.
* **Preview**: See your app as it was right after that message, without reverting anything.
* How long Lovable worked and **Credits used**: What the message cost. See [Credits and usage](/introduction/credits-and-usage).

On the activity card of a finished change, the **Bookmark in history** toggle saves that version to your bookmarks so it's easy to find and restore later. See [Version history](/features/projects/history).

## Edit a message and try again

If an earlier request sent things the wrong way, hover over one of your own past messages and select **Edit message**. Rewrite the message and confirm with **Revert and resend**: your project returns to the state before that message, and Lovable runs the new version instead.

This works on your own text-only messages. Learn more in [Version history](/features/projects/history).

## Fix errors and get unstuck

When a build error appears while Lovable works, a **Try to fix** button appears on the activity card. Click it and Lovable scans the logs, finds the issue, and attempts a fix. Fixing errors is free within our fair use policy. If you go beyond it, **Try to fix** runs as a normal chat message and is charged like any other request.

If the error keeps coming back, or your app runs without errors but doesn't behave as you intended, work through these steps instead of retrying the same prompt:

<Steps>
  <Step title="Ask Lovable to investigate">
    Describe what you see and what you expected. Lovable can inspect errors, logs, and console output, and test your app in a browser.

    ```text wrap theme={null}
    The login form does nothing on mobile. Walk me through what's happening.
    ```
  </Step>

  <Step title="Revert and re-prompt">
    Roll back to the version just before the issue appeared using [version history](/features/projects/history), then try a clearer, more specific prompt.
  </Step>

  <Step title="Plan before rebuilding">
    Switch to [Plan mode](/features/plan-mode) and ask Lovable to outline an approach first. Review the plan, adjust it, then build step by step.
  </Step>
</Steps>

If you're on a paid plan and believe the issue is with Lovable itself, contact [Support](https://lovable.dev/support).

<Tip>
  With [Project monitoring](/features/project-monitoring), Lovable can also watch your project on a schedule and post a brief in chat when it detects an issue, with the option to fix or ignore it. Monitoring is off by default: turn it on in **Project settings → General → Project monitoring**. Available on Pro plans and above.
</Tip>

## Suggestions from Lovable

After a response, Lovable may suggest features to build next as clickable chips near the chat input. Click one and it fills the prompt box, so you can adjust the wording before sending, or ignore the chips and write your own. Suggestions are based on your project and what you just built. You can turn them off with the **Chat suggestions** toggle in your [account settings](/introduction/lovable-account-settings).

## FAQ

<AccordionGroup>
  <Accordion title="Do chat messages cost credits?">
    Yes. Messages in both Build and Plan mode consume credits. You can see what a specific message cost from its **More options** menu under **Credits used**. See [Credits and usage](/introduction/credits-and-usage).
  </Accordion>

  <Accordion title="Does Try to fix cost credits?">
    Fixing errors is free within our fair use policy. This covers **Try to fix** on build errors as well as fixes suggested by the [Security](/features/security-center) scans. If you use it heavily in a short period, further fixes run as normal chat messages and are charged like any other request.
  </Accordion>

  <Accordion title="Can I send several instructions at once?">
    Yes. While Lovable is working, keep typing: new messages go into a queue and run one at a time, in order. You can pause, reorder, edit, or remove queued messages before they run. See [Build mode](/features/agent-mode#prompt-queue).
  </Accordion>

  <Accordion title="How do I undo what the last message did?">
    Click **Undo latest edit** under Lovable's latest response to reverse its most recent change in one click. To go further back, revert from [version history](/features/projects/history), or use **Edit message** on your own message and choose **Revert and resend** to rewrite it and try again.
  </Accordion>

  <Accordion title="How do I attach images and files?">
    Use **Attach** in the **Chat actions** menu, drag files into the chat, or paste them. You can also use **Take a screenshot** to capture the preview. See [Attach files as context](#attach-files-as-context).
  </Accordion>

  <Accordion title="Can I edit the code directly instead of using chat?">
    Yes. Open the **Code** tab in the project toolbar to read and edit your project's code by hand. See [Edit code](/features/code-mode).
  </Accordion>

  <Accordion title="Why do I see &#x22;The following file(s) exceed the 10 MB per-file commit limit&#x22;?">
    Single files larger than 10 MB cannot be saved into your project's code, usually after adding large images, videos, or other media. Ask Lovable in chat to migrate them, and it moves the files to Lovable's CDN and updates your code to load them from there:

    ```text wrap theme={null}
    Migrate large files to CDN assets.
    ```

    Files pushed from your own computer through GitHub or GitLab can be larger, but Lovable cannot change them afterwards.
  </Accordion>

  <Accordion title="What happens if I close my browser while Lovable is working?">
    Lovable keeps working. Your request runs on Lovable's servers, not in your browser, so you can close the tab and come back later to find the finished result in chat.
  </Accordion>

  <Accordion title="Can Lovable notify me when it's done?">
    Yes. On desktop, Lovable may offer to enable browser notifications so you know when it finishes a task or needs your input. You can dismiss the prompt and keep working without them.
  </Accordion>
</AccordionGroup>
