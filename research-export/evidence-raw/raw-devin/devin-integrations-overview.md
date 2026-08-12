> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrations Overview

> Connect Devin to your existing tools and workflows

Devin integrates with the tools you already use, making it easy to incorporate AI-powered development into your existing workflows. From source control to project management to communication, Devin can work alongside your team in the platforms you rely on.

## How Integrations Work

You can connect Devin to your tools in several ways:

* **Native integrations** - Direct connections to platforms like GitHub, Slack, and Jira
* **Secrets Manager** - Store API keys and credentials securely for Devin to use
* **MCP (Model Context Protocol)** - Connect to hundreds of external tools and data sources

<Frame>
  <img src="https://mintcdn.com/cognitionai/SST7qBOGO28X2sVc/images/devin-tools.png?fit=max&auto=format&n=SST7qBOGO28X2sVc&q=85&s=eb213e32853cc6edb3fc239193f0f4e8" alt="Devin" width="1794" height="886" data-path="images/devin-tools.png" />
</Frame>

## Source Control

Connect Devin to your source control platform to enable repository access, pull request creation, and code contributions.

<CardGroup cols={2}>
  <Card title="GitHub" icon="github" href="/integrations/gh">
    Connect your GitHub account to allow Devin to access, create pull requests and contribute to your existing repositories.
  </Card>

  <Card title="GitLab" icon="gitlab" href="/integrations/gitlab">
    Connect GitLab to enable Devin to work with your GitLab repositories and merge requests.
  </Card>

  <Card title="Bitbucket" icon="bitbucket" href="/integrations/bitbucket">
    Connect Bitbucket to allow Devin to access your Bitbucket repositories and create pull requests.
  </Card>

  <Card title="Azure DevOps" icon="microsoft" href="/enterprise/integrations/azure-devops">
    Connect Azure DevOps to enable Devin to work with your Azure repositories and pipelines.
  </Card>
</CardGroup>

## Communication

Connect Devin to your team communication platforms to start sessions and receive updates directly in your chat tools.

<CardGroup cols={2}>
  <Card title="Slack" icon="slack" href="/integrations/slack">
    Connect Devin to your company Slack and kick off runs directly via Slack by tagging @Devin.
  </Card>

  <Card title="Microsoft Teams" icon="microsoft" href="/integrations/microsoft-teams">
    Connect Devin to Microsoft Teams and kick off runs directly via Teams by tagging @Devin.
  </Card>
</CardGroup>

## Project Management

Connect Devin to your project management tools to create sessions from tickets and track work automatically.

<CardGroup cols={2}>
  <Card title="Jira" icon="jira" href="/integrations/jira">
    Connect Jira to allow Devin to create and update issues, track work, and integrate with your project management workflow.
  </Card>

  <Card title="Linear" icon="square-check" href="/integrations/linear">
    Connect Linear to enable Devin to work with your Linear issues and projects.
  </Card>
</CardGroup>

## MCP Marketplace

The [Model Context Protocol (MCP)](/work-with-devin/mcp) allows you to connect Devin to hundreds of external tools and data sources. Browse the MCP Marketplace in Settings to enable integrations with:

* **Monitoring** - Sentry, Datadog, PagerDuty
* **Databases** - PostgreSQL, MySQL, MongoDB
* **Documentation** - Notion, Confluence
* **And many more**

<Card title="MCP Marketplace" icon="store" href="/work-with-devin/mcp">
  Browse the MCP Marketplace to connect Devin to hundreds of external tools and data sources.
</Card>

## Additional Configuration

<CardGroup cols={2}>
  <Card title="PR Templates" icon="file-code" href="/integrations/pr-templates">
    Configure pull request templates for Devin's contributions.
  </Card>

  <Card title="Self-Hosted SCM & Artifacts" icon="server" href="/integrations/self-hosted-scm-artifacts">
    Connect Devin to self-hosted source control and artifact repositories.
  </Card>
</CardGroup>

## API Integration

For automated workflows and programmatic access, you can use the Devin API to create sessions, retrieve results, and integrate Devin into your CI/CD pipelines.

<Card title="API Reference" icon="code" href="/api-reference/overview">
  Learn how to programmatically create sessions and retrieve structured results.
</Card>
