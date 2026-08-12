> ## Documentation Index
> Fetch the complete documentation index at: https://craft-support.mintlify.site/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect to AI Providers

> Use your own OpenAI or Anthropic credentials with Craft Assistant instead of Craft AI credits.

Craft Assistant uses Craft AI credits by default, but you can connect your own AI provider account instead. When you use a connected provider, no Craft AI credits are spent.

<Info>
  This feature is available on **macOS** and **iOS** only. It is not currently available on Web or Windows.
</Info>

## Available providers

| Provider         | Connection method                        |
| ---------------- | ---------------------------------------- |
| **OpenAI**       | Sign in with ChatGPT or paste an API key |
| **Anthropic**    | Paste an API key                         |
| **Local Models** | Run on-device, no connection needed      |
| **Craft**        | Default, uses Craft AI credits           |

<Info>
  When you use a connected provider, the conversation runs through that provider's API. Craft AI usage quota is not affected.
</Info>

## Connect a provider

<Steps>
  <Step title="Open Settings">
    Go to **Settings** > **Assistant**.
  </Step>

  <Step title="Find AI Provider Connections">
    Scroll to the **AI Provider Connections** section.
  </Step>

  <Step title="Tap Connect">
    Tap **Connect** next to the provider you want to add.
  </Step>

  <Step title="Verify the active provider">
    Open the Assistant panel and check that your new provider is selected. New conversations use the connected provider automatically, but chats that were already open may still be using Craft. See [Switch between providers](#switch-between-providers) to change it.
  </Step>
</Steps>

<Frame caption="Click to enlarge">
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/bring-your-own-key/en/content/settings-ai-provider-connections.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=b7258cea96e57b581394a1f82ad381cc" alt="AI Provider Connections section in Settings showing OpenAI and Anthropic options" width="1470" height="1067" data-path="images/ai-assistant/bring-your-own-key/en/content/settings-ai-provider-connections.png" />
</Frame>

### OpenAI

You have two ways to connect OpenAI:

* **Sign in with ChatGPT** -- Use your existing ChatGPT account and subscription. No API key needed.
* **Use OpenAI API Key** -- Paste an API key from the [OpenAI Platform](https://platform.openai.com/api-keys). Usage is billed to your OpenAI account.

<Frame>
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/bring-your-own-key/en/content/connect-openai-dialog.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=0c42784bf0718402b2f4b626a621f9a4" alt="Connect to OpenAI dialog with two options: Use OpenAI API Key and Sign in with ChatGPT" width="1470" height="1067" data-path="images/ai-assistant/bring-your-own-key/en/content/connect-openai-dialog.png" />
</Frame>

### Anthropic

To connect Anthropic, paste an API key from the [Anthropic Console](https://console.anthropic.com/). Usage is billed to your Anthropic account.

<Frame>
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/bring-your-own-key/en/content/connect-anthropic-dialog.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=99975bfc8d17d7a33ca55af604b3b23e" alt="Connect to Anthropic dialog with API key field and Open Anthropic Console button" width="1470" height="1067" data-path="images/ai-assistant/bring-your-own-key/en/content/connect-anthropic-dialog.png" />
</Frame>

## Switch between providers

Once you have connected a provider, you can switch between providers and models directly from the Assistant panel.

<Steps>
  <Step title="Open the Assistant panel">
    Open the Assistant from any document or Space view.
  </Step>

  <Step title="Tap the Assistant button">
    Below the input field, tap the **Assistant button**.
  </Step>

  <Step title="Select Model">
    Choose **Model** from the popup. Models from your connected providers appear alongside Craft models.
  </Step>
</Steps>

<Frame>
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/bring-your-own-key/en/content/model-selector-provider.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=58d8da8fb4d5adb65f5f04222a1b5f23" alt="Model selector in the Assistant panel showing OpenAI models" width="1076" height="1124" data-path="images/ai-assistant/bring-your-own-key/en/content/model-selector-provider.png" />
</Frame>

To change the active provider, tap **Configure** at the bottom of the model list and select a provider from the **Provider** dropdown.

<Frame>
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/bring-your-own-key/en/content/configure-provider-dropdown.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=e64aeb2da5097bb72d3e02a0366e762d" alt="Configure dialog showing provider dropdown with Craft, Local Models, OpenAI, and Anthropic" width="1024" height="967" data-path="images/ai-assistant/bring-your-own-key/en/content/configure-provider-dropdown.png" />
</Frame>

<Tip>
  You can tell which provider is active by looking at the badge in the chat. The provider's logo appears next to the model name, so you always know whether a conversation is using Craft credits or your own provider.
</Tip>

## Remove a connection

<Steps>
  <Step title="Open Settings">
    Go to **Settings** > **Assistant**.
  </Step>

  <Step title="Find the connection">
    In the **AI Provider Connections** section, find the provider you want to remove.
  </Step>

  <Step title="Remove">
    Tap the **3-dots button** next to the connection, then tap **Remove**.
  </Step>
</Steps>

<Frame>
  <img src="https://mintcdn.com/craft-support/mrn9h3Zv_F-f37nX/images/ai-assistant/bring-your-own-key/en/content/remove-connection.png?fit=max&auto=format&n=mrn9h3Zv_F-f37nX&q=85&s=d047ca8c12d7fb24a5e088400343bd1c" alt="AI Provider Connections showing connected providers with Remove button" width="1091" height="953" data-path="images/ai-assistant/bring-your-own-key/en/content/remove-connection.png" />
</Frame>

After removing a connection, the Assistant switches back to Craft AI credits.

<Columns cols={2}>
  <Card title="Choosing AI Models" href="/en/ai-assistant/models" />

  <Card title="AI Credits" href="/en/ai-assistant/usage" />
</Columns>
