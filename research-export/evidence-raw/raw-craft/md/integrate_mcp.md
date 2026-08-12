> ## Documentation Index
> Fetch the complete documentation index at: https://craft-support.mintlify.site/llms.txt
> Use this file to discover all available pages before exploring further.

# MCP

> Connect Craft with AI assistants and developer tools using the Model Context Protocol.

Craft supports MCP (Model Context Protocol), which lets you securely connect your Craft documents to external tools. This makes it possible for compatible apps – including AI assistants and developer tools – to read and work with the content you choose to share.

## What is MCP?

MCP (Model Context Protocol) is a standard that allows external applications to connect to a specific source of information. In Craft, MCP gives these tools controlled access to your selected content so they can read, process, and work with it safely.

With MCP enabled, external tools can:

* Read the content of your Craft documents
* Generate summaries, insights, or transformations
* Assist you with writing or restructuring content
* Use your documents as a live knowledge source
* Search across your selected documents

This removes the need for manual exporting or copy-pasting.

## How MCP Works in Craft

Create an **MCP Connection** from the **Imagine tab** in the sidebar to share the right parts of your workspace with external tools.

You can choose between:

* Creating an MCP connection that includes **all your daily notes**, or
* Setting up a **custom connection** where you pick specific documents (one or more) to include

Each connection lets you define access permissions and visibility, so you stay in control of what's shared. Once created, Craft automatically generates a **unique MCP endpoint** for that connection. You can then add this endpoint to any MCP-compatible tool to connect it securely to your chosen documents – keeping everything else in your workspace private.

<Info title="Full Space API Access (v3.3.5+)">
  The Craft MCP server now supports **full space-level access** with advanced capabilities:

  * **Search across all documents** with tag and date filtering
  * **Daily notes and tasks** are fully accessible via MCP
  * **Create, update, and delete** documents programmatically
  * **Collection management** including schema creation and editing
  * **Advanced search** with regex support and timezone-aware date filters

  See the [official MCP documentation](https://www.craft.do/imagine/) for complete details.
</Info>

After you create an MCP connection in Craft, copy the generated MCP link or credentials from the Imagine tab. The next steps happen outside of Craft.

Open the MCP-compatible tool you want to use (for example, an AI assistant or a developer environment), find its option to add an MCP server or connector, and paste in the details you copied. From that point on, the tool will be able to access only the notes or documents you included in that connection, based on the permissions you set.

## Supported MCP Connections

Craft currently supports MCP integrations with:

* **Claude** (Desktop and Claude Code)
* **ChatGPT**
* **Windsurf**
* **Cursor**
* **Visual Studio Code**
* **Raycast**
* **Other standard MCP clients**

These tools can connect directly to your Craft documents to read and assist you with their content.

## What You Can Do With MCP

With MCP enabled, you can:

* Ask AI assistants to analyze or summarize your documents
* Generate or rewrite content based on your Craft documents
* Use developer tools to build custom workflows or scripts using your Craft content
* Interact with your documents from coding environments like VS Code, Cursor, or Windsurf
* Search and filter documents programmatically
* Extend Craft with your own MCP-compatible tools or automations

MCP lets you blend Craft with your favorite AI and developer tools seamlessly.

## Using MCP with Multiple Spaces

Each MCP connection in Craft is linked to a single space. If you want to give an external tool access to documents across multiple spaces, you need to create a separate MCP connection for each space.

<Steps>
  <Step>
    Open the space you want to connect
  </Step>

  <Step>
    Go to the **Imagine tab** in the sidebar and create an MCP connection for that space
  </Step>

  <Step>
    Copy the MCP endpoint and add it to your external tool as a separate MCP server
  </Step>

  <Step>
    Repeat for each additional space you want to connect
  </Step>
</Steps>

<Info title="One connector per space">
  Your external tool (e.g., Claude, Cursor) will list each space as a separate MCP server. This is by design — it keeps permissions isolated so each space's access is controlled independently.
</Info>

## Full Guides & Documentation

All setup instructions and integration guides are available at:

👉 [**https://www.craft.do/imagine/**](https://www.craft.do/imagine/)

Here you'll find dedicated guides for Claude, ChatGPT, and other supported MCP tools.

## Troubleshooting

If you experience connection issues between Craft and your MCP client (especially with tools like Claude that update frequently), the following steps usually resolve the problem:

<Steps>
  <Step title="Reconnect">
    Try disconnecting and reconnecting the MCP server in your client app.
  </Step>

  <Step title="Recreate the connector">
    If reconnecting didn't help, remove the MCP connector from your client app and set it up again using the same link.
  </Step>

  <Step title="Recreate the link in Craft">
    If the issue persists, delete the MCP connection in Craft's Imagine tab and create a new one. Then add the new link to your client app.
  </Step>
</Steps>

<Info>
  Some MCP clients ship updates very frequently, which can occasionally break existing connections. These steps resolve most issues, though in rare cases you may need to wait for a fix from the client app.
</Info>

<CardGroup cols={2}>
  <Card title="MCP Security" href="/en/integrate/mcp/security">
    Learn about MCP security features and access controls
  </Card>

  <Card title="ChatGPT Limitations" href="/en/integrate/mcp/chatgpt-limitations">
    Understand current limitations when using MCP with ChatGPT
  </Card>
</CardGroup>
