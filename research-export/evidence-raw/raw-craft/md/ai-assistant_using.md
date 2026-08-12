> ## Documentation Index
> Fetch the complete documentation index at: https://craft-support.mintlify.site/llms.txt
> Use this file to discover all available pages before exploring further.

# Using Craft Assistant

> Learn how to start conversations and work with the Assistant to understand and transform your content.

Craft Assistant helps you understand and work with your content using natural language. You can ask questions, summarize documents, explore information across your Space, and, on supported platforms, edit documents directly.

<img src="https://mintcdn.com/craft-support/bXGV3J9qfsAQZqJz/images/ai-assistant/using/en/content/assistant-interface.png?fit=max&auto=format&n=bXGV3J9qfsAQZqJz&q=85&s=c9647eefaea822f38e79503350d83b28" alt="Craft Assistant interface showing conversation panel" width="209" height="142" data-path="images/ai-assistant/using/en/content/assistant-interface.png" />

## Where Craft Assistant is available

Craft Assistant works across all major platforms:

<Tabs>
  <Tab title="macOS">
    Available at **space-level and document-level**. Works in Documents, Tasks, Calendar, Collections, Code Editor, and browse views.
  </Tab>

  <Tab title="iOS">
    Available at **space-level and document-level** on iPad and iPhone. Works in Documents, Tasks, Calendar, Collections, Code Editor, and browse views.
  </Tab>

  <Tab title="Windows">
    Available at **space-level and document-level**. Works in Documents, Tasks, Calendar, Collections, Code Editor, and browse views.
  </Tab>

  <Tab title="Web">
    Available at **space-level and document-level**. Works in Documents, Tasks, Calendar, Collections, Code Editor, and browse views.
  </Tab>
</Tabs>

## Start a conversation

<Steps>
  <Step>
    Open a document or stay in your Space view.
  </Step>

  <Step>
    Open the Assistant panel.
  </Step>

  <Step>
    Choose a model and mode, then type your prompt.
  </Step>

  <Step>
    Review the response or applied changes.
  </Step>
</Steps>

<img src="https://mintcdn.com/craft-support/bXGV3J9qfsAQZqJz/images/ai-assistant/using/en/content/assistant-prompt.png?s=db4cfe1c95f55a14f01ac4ecdf862da3" alt="Assistant showing example prompt and response" width="800" height="476" data-path="images/ai-assistant/using/en/content/assistant-prompt.png" />

## Sessions

Craft Assistant sessions are designed for continuity:

<img src="https://mintcdn.com/craft-support/8R3j8_MOUDKwTvNH/images/ai-assistant/using/en/content/assistant-sessions.png?fit=max&auto=format&n=8R3j8_MOUDKwTvNH&q=85&s=25b9e314a988f246b89800bd1a115482" alt="Conversation History showing past sessions" width="1568" height="943" data-path="images/ai-assistant/using/en/content/assistant-sessions.png" />

* Sessions **sync across your devices**.
* Sessions pause after **5 minutes** of inactivity. Your conversation history is preserved.
* You can reopen **previous sessions** from the list.
* You can run **parallel sessions**.
* A **notification dot** appears when a background session completes.

## Editing your documents

On macOS and iOS, use **Execute** mode to apply changes directly. Use **Explore** mode when you want to review proposed changes first.

* **Explore** — proposes changes and waits for your approval before modifying anything.
* **Execute** — applies changes directly.

You can undo the full last Assistant action with **⌘Z (Ctrl+Z)**.

For full editing details, see [Editing with Craft Assistant](/en/ai-assistant/editing).

<Tabs>
  <Tab title="macOS">
    Full editing support at document-level and space-level.
  </Tab>

  <Tab title="iOS">
    Full editing support at document-level and space-level on iPad and iPhone.
  </Tab>

  <Tab title="Windows">
    Assistant available, Execute mode coming later.
  </Tab>

  <Tab title="Web">
    Assistant available, Execute mode coming later.
  </Tab>
</Tabs>

## Example questions you can ask

**Understanding your content:**

* "What did I write about this topic last year?"
* "What tasks are still open for Project Y?"
* "Summarize all notes related to onboarding new hires."

**Working with specific content:**

* "Summarize this document in 3 bullet points"
* "Extract all action items from this meeting note"
* "What are the key decisions mentioned here?"

**Editing:**

* "Add a summary callout at the top of this document"
* "Restyle the headings with colors and add dividers"
* "Break this into subpages, one per section"
* "Create a new document with meeting notes from this page"

**Space-level queries:**

* "Find all documents about marketing campaigns"
* "What deadlines do I have this week?"
* "Show me everything related to the Q4 project"

<Info title="Collections Support">
  The Assistant can understand Collections, including properties and relationships.
</Info>

## Privacy and your data

Craft Assistant is designed with privacy first:

* Sessions sync across your devices for continuity.
* Craft does not use your content to train AI models.
* Only the minimum data required to process a request is sent to the model provider.
* Token usage and cost are recorded for usage tracking.

For details on AI usage, see [Usage & Limits](/en/ai-assistant/usage).

## Choosing a model

The model you select changes speed, capability, and AI usage:

* **Core:** Everyday in-document queries. Uses a low amount of AI usage. Read-only.
* **Fast:** Good for space-level questions and supports editing.
* **Max:** Best for complex reasoning and editing quality.
* **Local:** On-device models (Apple Foundation Model, LLaMa 3.2) that run locally on your device. Always free. Read-only.

Only **Fast** and **Max** support editing.

See [Choosing the right AI model](/en/ai-assistant/models) for details.

## Preferences

<Frame>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/_wA60pYNPJQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
</Frame>

Preferences let you give the Assistant background information that applies to every conversation. Unlike custom prompts, which you select per task, preferences are always active regardless of which model or provider you use.

Use preferences for things like your preferred language, tone, response length, or role context.

### Add a preference

<Steps>
  <Step title="Open Settings">
    Go to **Settings** > **Assistant**.
  </Step>

  <Step title="Find Preferences">
    Scroll to the **Preferences** section.
  </Step>

  <Step title="Add Preference">
    Tap **Add Preference**, type your instruction, and tap **Add**.
  </Step>
</Steps>

<Frame>
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/using/en/content/preferences-section.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=61dc95d450f0a4f478800c7b386557e3" alt="Preferences section in Assistant settings with Add Preference button" width="1091" height="953" data-path="images/ai-assistant/using/en/content/preferences-section.png" />
</Frame>

<Frame>
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/using/en/content/preferences-add-dialog.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=87224b57875d7d10139924d19f7e7140" alt="Add Preference dialog with example text" width="1091" height="953" data-path="images/ai-assistant/using/en/content/preferences-add-dialog.png" />
</Frame>

### Example preferences

* "Use British English spelling"
* "Keep responses under 3 paragraphs"
* "I work in marketing. Use brand-friendly language"
* "Always respond in Spanish"
* "When summarizing meetings, always extract action items with owners"

### Manage preferences

To edit or delete a preference, tap the **3-dots button** next to it and choose **Edit** or **Delete**.

<Frame>
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/using/en/content/preferences-manage.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=1488576dbca73a54eb52b841ce161604" alt="Preferences list showing Edit and Delete options" width="1091" height="953" data-path="images/ai-assistant/using/en/content/preferences-manage.png" />
</Frame>

## Disable the Assistant

You can turn the Assistant off per Space:

<Steps>
  <Step>
    Open Space settings.
  </Step>

  <Step>
    Turn off the Assistant toggle.
  </Step>
</Steps>

<Warning title="Device-Specific Setting">
  This setting is not synced across devices or users. If you disable it on one device, it remains enabled on others until changed there too.
</Warning>

## Related Articles

<CardGroup cols={2}>
  <Card title="Choosing AI Models" href="/en/ai-assistant/models">
    Select the right model for your task and editing needs
  </Card>

  <Card title="Editing with Craft Assistant" href="/en/ai-assistant/editing">
    Let the Assistant make changes directly in your documents
  </Card>

  <Card title="Custom Prompts" href="/en/ai-assistant/custom-prompts">
    Create reusable instructions for consistent results
  </Card>

  <Card title="Image and PDF Support" href="/en/ai-assistant/ocr-images-pdfs">
    Use OCR to extract text and generate descriptions
  </Card>

  <Card title="Help Agent" href="/en/ai-assistant/help-agent">
    Get instant help about Craft features without leaving the app
  </Card>
</CardGroup>
