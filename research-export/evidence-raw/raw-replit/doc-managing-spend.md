> ## Documentation Index
> Fetch the complete documentation index at: https://docs.replit.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Managing Your Spend

> Control AI costs and monitor spending with usage limits, budgets, Plan Mode, and Agent modes. Learn strategies to optimize your Replit usage and reduce unnecessary token consumption.

export const CreditPackTable = () => <table>
    <thead>
      <tr>
        <th>Credit Pack</th>
        <th style={{
  textAlign: 'right'
}}>Price</th>
        <th style={{
  textAlign: 'right'
}}>Discount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$100 credits</td>
        <td style={{
  textAlign: 'right'
}}>$100</td>
        <td style={{
  textAlign: 'right'
}}>—</td>
      </tr>
      <tr>
        <td>$300 credits</td>
        <td style={{
  textAlign: 'right'
}}>$290</td>
        <td style={{
  textAlign: 'right'
}}>$10 off</td>
      </tr>
      <tr>
        <td>$500 credits</td>
        <td style={{
  textAlign: 'right'
}}>$480</td>
        <td style={{
  textAlign: 'right'
}}>$20 off</td>
      </tr>
      <tr>
        <td>$1,000 credits</td>
        <td style={{
  textAlign: 'right'
}}>$950</td>
        <td style={{
  textAlign: 'right'
}}>$50 off</td>
      </tr>
    </tbody>
  </table>;

export const OrganizationBudgetIncrement = '$500';

You can control your costs on Replit by using built-in budget controls, optimizing how you work with [AI Agent](/features/agent/overview), purchasing credit packs, and monitoring your usage patterns. Learn more about [AI billing](/billing/ai-billing).

## View usage

Use the [usage page](https://replit.com/usage) to see where your credits go across your personal account or workspace. Filter by date, resource, project, workspace, group, or member to find what drives usage.

Usage updates in near real time, so you can check recent activity without waiting for a daily report.

<Frame>
  <img src="https://mintcdn.com/replit/9DzvnT6JKI6YXROU/images/billing/usage-page.png?fit=max&auto=format&n=9DzvnT6JKI6YXROU&q=85&s=cc7695f49f4bba2dfbce8f9c69cd7dc5" alt="The usage page showing account usage totals, remaining credits, extra usage, active users, and a daily spend chart" width="3124" height="1636" data-path="images/billing/usage-page.png" />
</Frame>

## Optimize AI costs

AI features like [Agent](/features/agent/overview) are powerful tools, but strategic use can help you maximize value while controlling costs. Here are effective ways to reduce AI spending.

### Use Plan Mode for cost-effective collaboration

[Plan Mode](/features/agent/plan-mode) is one of the most effective ways to save on AI costs. When you enable Plan Mode, Agent creates a detailed plan without making any code changes. This approach offers several cost benefits:

* **Chat before committing**: Discuss and refine the approach with Agent before any work begins
* **Lower token costs**: Planning conversations use fewer tokens than code generation and editing
* **Precision targeting**: Review and adjust the plan to ensure Agent only works on what matters
* **Iterative refinement**: Get the scope right before spending tokens on implementation

Use [Plan Mode](/features/agent/plan-mode) when you're exploring solutions, refining requirements, or want to understand the approach before implementation.

### Control costs with Agent modes

[Agent modes](/features/agent/agent-modes) let you choose cost vs. capability:

* **Lite**: lightweight models for small, scoped edits.
* **Economy**: fewer credits per task—a good default for everyday builds.
* **Power**: the most capable models for complex work, with optional Turbo for faster (higher-cost) runs.

Agent reviews its own code automatically as it builds, catching mistakes and reducing costly rework—there's no setting to turn on or off. To keep more control over what you spend, scope work first with Plan Mode:

* **Review before execution**: See what Agent plans to do before it makes changes.
* **Selective approval**: Approve the changes that fit your goals and skip the rest.

<Tip>
  Combine [Plan Mode](/features/agent/plan-mode) with [Economy mode](/features/agent/agent-modes) for maximum cost control. Plan first, then approve changes step by step.
</Tip>

## Purchase credit packs

If you're on a Core or Pro plan and need additional credits beyond your monthly subscription allowance, you can purchase credit packs from **Settings** → **Account usage** → **Credits** → **Purchase credit pack**. Credit packs have discounts when you buy larger amounts, making them ideal for covering temporary usage spikes or preparing for larger projects.

### Available credit packs

Credit packs are available in four sizes, with increasing discounts on larger purchases:

<CreditPackTable />

### How credit packs work

* **Purchase location**: Available in **Settings** → **Account usage** → **Credits** → **Purchase credit pack** for Core and Pro plan customers
* **Expiration**: Credit packs expire six months after the purchase date
* **No renewal**: Credit packs do not automatically renew
* **No rollover**: Unused credits from a pack do not roll over after expiration
* **Automatic usage**: Credits are automatically used from the credit pack that expires earliest first, helping you maximize the value of your purchases
* **Auto-reload**: Turn on auto-reload to automatically purchase a *new* credit pack when your balance runs low, so you don't get interrupted mid-project
* **Manage anytime**: Enable, adjust, or turn off auto-reload from **Settings** → **Billing**

<Note>
  Your usage limits and budgets will apply to usage after you use any credit packs you may have. If you want to limit your usage to just credits you've purchased in your pack, set any limits to \$0.01.
</Note>

## Set up limits and budgets

You can establish monthly usage limits and budgets for all usage-based billing services to monitor and control your costs.

### Usage limits

Usage limits cap your spending beyond your monthly credits. When you reach your limit, usage-based services are blocked until the next billing cycle or until you increase the limit.

For Core accounts, open **Settings** → **Account** → **Billing** to set up a usage limit. For organizations, you can set your usage limit via the [usage page](https://replit.com/usage) by selecting **Manage** under **Usage total**.

### Service shutdown limit

When this limit is reached, services will be suspended until the budget is increased or the next billing cycle begins. This will help prevent extra charges.

For Core accounts, open **Settings** → **Account** → **Billing** to set up a service shutdown limit.

### Organization budgets

For organizations, you can set your usage budget from the [settings page](https://replit.com/t/replit/settings/billing). Budgets must be in increments of {OrganizationBudgetIncrement}.

<Note>You must have organization admin or owner permissions to enable a monthly usage limit. If you don't have access, contact your organization owner.</Note>

### Per-user spend limits

Enterprise admins can give individual members a different spend limit than the workspace default. Use this to grant power users a higher cap or to tighten a single member's spend without changing the rest of the workspace.

<Steps>
  <Step title="Open the workspace usage page">
    From your Enterprise workspace, open the [usage page](https://replit.com/usage). The **Agent users** table lists every member of your workspace alongside their current usage.
  </Step>

  <Step title="Edit a member's limit">
    Find the member you want to adjust and select the edit icon in the **Usage limit** column. The dialog shows the workspace default, any applicable group limit, and a field for the new per-user limit.

    <Frame>
      <img src="https://mintcdn.com/replit/ML4eWCPykwd8PoWM/images/billing/edit-usage-limit.png?fit=max&auto=format&n=ML4eWCPykwd8PoWM&q=85&s=4a94247111bd588b0a0b96160609de3a" alt="Edit usage limit dialog for a workspace member, showing the workspace default, current user-specific limit, applicable group limits, and a User threshold input set to $5" width="1202" height="916" data-path="images/billing/edit-usage-limit.png" />
    </Frame>
  </Step>

  <Step title="Save the override">
    Enter the new limit and select **Save**. The override takes effect immediately and the new value appears in the **Usage limit** column. To remove an override later, clear the field and save. The member then falls back to the most specific group or workspace limit that applies to them.
  </Step>
</Steps>

<Note>Per-user spend limits are available on the Enterprise plan. Members assigned to a [custom group](/teams/identity-and-access-management/groups-and-permissions) inherit that group's limit unless an individual override is set. Per-user overrides always take precedence over group and workspace defaults.</Note>

### Organization admin controls

Organization admins can manage AI model access and integrations from the [organization billing settings](https://replit.com/t/replit/settings/billing).

**Disable external AI model integrations**

Enable this setting to block all users in the organization from using external AI model integrations (such as OpenAI, Anthropic, xAI, and Perplexity through Replit's managed connectors).

Enable this setting to block all users in the organization from using Replit-managed AI integrations.
