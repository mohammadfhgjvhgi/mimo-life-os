> ## Documentation Index
> Fetch the complete documentation index at: https://craft-support.mintlify.site/llms.txt
> Use this file to discover all available pages before exploring further.

# Craft API

> Connect Craft to external tools, automate workflows, and build custom integrations with the Craft API.

Craft is becoming more flexible and powerful with the introduction of our API. This new capability allows you to connect Craft to external tools, automate workflows, and create custom integrations that adapt Craft to your needs.

## What is an API?

An API (Application Programming Interface) lets different applications communicate with each other securely. In practice, this means you can use Craft's API to:

* Send or receive data from other services
* Trigger actions in Craft based on events in another app
* Build custom tools, dashboards, or automations
* Connect Craft to AI assistants like Claude or ChatGPT through MCP or other integration methods

APIs enable Craft to work seamlessly alongside the tools you already use – without manual copying or repetitive tasks.

## How Craft's API Works

Create an **API Connection** from the **Imagine tab** in the sidebar to share the right parts of your workspace with external tools.

You can choose to:

* Connect **all of your daily notes**, or
* Create a **custom connection** where you select one or more specific documents to include

For each connection, you set the access permissions and visibility, so you stay in control of what is shared. Craft then generates a **unique API endpoint** for that connection, which you can plug into your API-based tools or workflows. Those tools will only be able to access the documents you selected, while everything else in your workspace remains private.

You can create, review and manage all your API connections in **Craft Settings → API**.

<img src="https://mintcdn.com/craft-support/bXGV3J9qfsAQZqJz/images/integrate/api/en/content/api-settings.png?s=a581d87e3a5d721049c4feaf776146b1" alt="API connection management in Settings" width="800" height="486" data-path="images/integrate/api/en/content/api-settings.png" />

After you create an API connection in Craft, copy the API endpoint and credentials shown in the Imagine tab.

You then take these to the external app or workflow you want to connect (for example an AI assistant, automation tool, or developer setup) and add them in its connector or API integration settings. Each tool handles this a little differently, but the idea is the same. You paste the Craft API details there, and the tool can access only the documents you selected for that connection.

<Info title="Space-Level API Access (v3.3.5+)">
  The Craft API now supports **full space-level access** with advanced capabilities:

  * **Search across all documents** with folder, tag, and date filtering
  * **Daily notes and tasks** are fully accessible via API
  * **Create, update, and delete** documents programmatically
  * **Collection management** including schema creation and editing
  * **Advanced search** with regex support and timezone-aware date filters

  See the [official API documentation](https://www.craft.do/imagine/) for complete endpoint details.
</Info>

## Use Cases

Here are a few examples of what you can build with the API:

* A personal dashboard that updates automatically
* A task list that syncs with another productivity app
* A reading log that fetches data from an external source
* A custom AI-powered assistant tailored to your Craft document
* Automated document creation from templates
* Scheduled backups or exports
* Integration with team communication tools

The possibilities are broad – the API lets you extend Craft however you imagine.

## Full Guides & Documentation

All step-by-step guides for the API, MCP connections, and example integrations (including Claude and ChatGPT) are available here:

[**https://www.craft.do/imagine/**](https://www.craft.do/imagine/)

This is the best place to explore tutorials, learn how to enable MCP, and understand how to connect Craft to third-party tools.

If you need help getting started or have questions, feel free to contact us – we're here to help.
