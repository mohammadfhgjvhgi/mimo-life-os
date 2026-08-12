> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Credits and usage

> Learn how Lovable credits work, what uses credits, how to check usage, and how to add credits with top-ups.

Lovable uses one credit balance for building your app, hosting it and running its built-in backend (Cloud), and AI features your deployed app uses.

Use **Settings → Plans & credit usage** to understand your credit balance, track credit usage, add credits, and manage top-ups.

<Tip>
  **Looking for billing, plan changes, or how to cancel?** Open [Plans & credit usage](https://lovable.dev/settings/billing) directly, or go to **Settings → Plans & credit usage** in Lovable. From there, select **Manage** to update billing details or download invoices, and use **Manage → Downgrade to free** to cancel a paid subscription. See [Manage your subscription](/introduction/subscription-plans#manage-your-subscription) and [Cancel your subscription](/introduction/subscription-plans#cancel-your-subscription).
</Tip>

For available plans, plan feature differences, subscription tiers, billing cycles, invoices, and cancellation, see [Subscription plans](/introduction/subscription-plans).

<Note>
  **Rolling out gradually: Lovable now uses one credit balance for building your app, hosting it and running its built-in backend (Cloud), and AI features in deployed apps.**

  This update is rolling out gradually. Some workspaces may still see the previous Cloud and AI balance experience during the rollout.

  * **Cloud and AI balances became credits.** Any remaining Cloud and AI dollar balance was converted into credits at your plan's credit rate and added to your balance.
  * **Cloud and AI costs have not changed.** Monthly Cloud and AI grants are now issued as credits instead of dollars, but the cost for running your projects is the same.
  * **All credit controls now live in Plans & credit usage.** The old Cloud and AI balance tab, Cloud and AI specific top-ups, and dollar-based auto top-up have been replaced by credit-based controls in **Settings → Plans & credit usage**. Review your top-up settings there to make sure the threshold and amount still match your needs.

  No action is required, and your projects, hosting, and AI features keep running through the change.
</Note>

## What is a credit?

A credit is the unit Lovable uses to measure and pay for usage across your workspace. Credits let you build apps, run deployed apps, and power AI features from one balance.

Your credits cover three types of usage:

| Usage type       | What credits pay for                                                                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build usage      | Sending messages in Lovable to plan, generate, edit, or update your app                                                                                                 |
| Cloud usage      | Hosting your app and running its [built-in backend (Cloud)](/features/cloud), including database, network, storage, edge functions, and realtime usage in deployed apps |
| AI gateway usage | [AI features](/features/ai) your deployed app uses, such as calls your app makes to AI models                                                                           |

## Where credits come from

Your workspace receives credits from two kinds of sources:

1. [Usage-specific grants](#usage-specific-grants), which apply only to one type of usage.
2. [General credits](#general-credits), which can be used to build your app, host your app and run its built-in backend (Cloud), and power AI features in deployed apps.

<Note>
  Lovable always uses usage-specific grants before general credits. After usage-specific grants run out, Lovable uses the general credits closest to expiry first.
</Note>

### Usage-specific grants

Usage-specific grants are included credits that apply to one type of usage. Lovable always uses them before general credits.

For example, daily build credits apply only to build usage, the monthly Cloud grant applies only to Cloud usage, and the monthly AI grant applies only to AI gateway usage.

Usage-specific grants refresh automatically, but their refresh schedule depends on the grant and plan type. Unused usage-specific grants do not roll over.

| Grant               | What it covers                    | When it refreshes                                                                                                    | Expiry                                                                                       |
| :------------------ | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Daily build credits | Build usage only                  | Every day at 00:00 UTC                                                                                               | End of day                                                                                   |
| Monthly Cloud grant | Cloud usage only                  | <ul><li>Free: 1st of each calendar month at 00:00 UTC</li><li>Pro and Business: subscription billing cycle</li></ul> | <ul><li>Free: end of calendar month</li><li>Pro and Business: end of billing cycle</li></ul> |
| Monthly AI grant    | AI features in deployed apps only | <ul><li>Free: 1st of each calendar month at 00:00 UTC</li><li>Pro and Business: subscription billing cycle</li></ul> | <ul><li>Free: end of calendar month</li><li>Pro and Business: end of billing cycle</li></ul> |

Included usage-specific grants by plan:

| Plan     | Daily build credits           | Monthly Cloud grant  | Monthly AI grant    |
| :------- | :---------------------------- | :------------------- | :------------------ |
| Free     | 5 per day, up to 30 per month | 20 credits per month | 4 credits per month |
| Pro      | 5 per day                     | 20 credits per month | 4 credits per month |
| Business | 5 per day                     | 20 credits per month | 4 credits per month |

<Note>
  Monthly Cloud and AI grants are a temporary offering and subject to change.
</Note>

You can see the breakdown of included usage-specific grants by hovering the **info** icon next to **Free usage included** above the credit bar.

<Note>
  Free, Pro, and Business workspaces include monthly Cloud and AI grants so you can host apps, run their built-in backend (Cloud), and use AI features in deployed apps without spending general credits on that usage first. Once a grant runs out, general credits cover any additional Cloud or AI gateway usage.
</Note>

For the full plan comparison and paid subscription tiers, see [Subscription plans](/introduction/subscription-plans).

### General credits

General credits can be used after usage-specific grants run out to build your app, host your app and run its built-in backend (Cloud), and power AI features in deployed apps.

| Credit source                     | When it is added                           | Expiry                                                                                                                       |
| :-------------------------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| Monthly plan credits              | Start of billing period                    | <ul><li>Monthly plans: 2 months from issue date</li><li>Annual plans: 1 month after the annual billing period ends</li></ul> |
| Top-up credits (Pro and Business) | On one-time top-up purchase or auto top-up | 12 months from purchase                                                                                                      |
| Bonus credits                     | When granted (gifts and promotions)        | Depends on the grant, shown in [Credit balance details](#view-your-credit-balance)                                           |

You can see a breakdown of your general credit types and their expiry dates in the [Credit balance](#view-your-credit-balance) dialog.

All unused monthly plan credits automatically roll over at the end of each billing cycle, as long as your subscription remains active.

## Usage costs

Credits are used across three main areas: building your app, hosting it and running its built-in backend (Cloud), and powering AI features in deployed apps. Each area uses credits differently, based on the type of work performed or resources consumed.

To see where your credits are going over time, use [Usage details](#tracking-credit-usage).

### Build costs

Credits are used when you work with Lovable to plan, generate, edit, or update your app.

Lovable has two main modes:

| Mode       | How credits are charged                                              |
| :--------- | :------------------------------------------------------------------- |
| Plan mode  | Every message costs 1 credit                                         |
| Build mode | Cost depends on the complexity of the request and the work completed |

Use [Plan mode](/features/plan-mode) to think through an idea, investigate a problem, compare approaches, or create a plan before changing code. Plan mode never modifies your code, and every message deducts 1 credit.

Use [Build mode](/features/agent-mode) when you want Lovable to implement changes directly in your project. Build mode pricing is usage-based. Small, focused edits usually cost less than larger generations, multi-step changes, or requests that require more codebase exploration, verification, browser checks, web search, or image generation.

Here are some illustrative Build mode examples:

| User prompt                      | Work done                                                           | Credits used |
| :------------------------------- | :------------------------------------------------------------------ | :----------- |
| Make the button gray             | Changes the button styles                                           | 0.50         |
| Remove the footer                | Removes the footer component                                        | 0.90         |
| Add authentication               | Adds login and authentication logic                                 | 1.20         |
| Build a landing page with images | Creates a landing page with generated images, a theme, and sections | 2.00         |

<Note>
  Credit costs shown are illustrative examples. Actual credits used vary depending on the complexity and scope of your specific project.
</Note>

Click the three-dot menu below any Lovable response in the chat to see its exact cost. See [response actions](/features/projects/chat#act-on-lovables-responses). Stopped Build mode requests are charged based on the work completed so far.

<img src="https://mintcdn.com/lovable-f9060f1e/aKANBa3zauHImQcC/images/view-message-cost-1.png?fit=max&auto=format&n=aKANBa3zauHImQcC&q=85&s=acf176f0a2a50403b839ecff4a92297c" alt="View Message Cost" title="View Message Cost" className="mx-auto" style={{ width:"64%" }} width="978" height="858" data-path="images/view-message-cost-1.png" />

To review Build usage over time, go to **Settings → Plans & credit usage → Usage details** and select **Build credits**. You can filter by time range and view usage by project or person.

### Cloud costs

Cloud usage is measured based on the hosting and built-in backend resources your deployed app consumes. It draws from your available credits, starting with any monthly Cloud grant included in your plan.

| Usage driver     | What affects cost                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Database server  | The instance size your database runs on, how long it stays active, and how much traffic or querying it handles. Larger instances support more users, traffic, queries, and data, but use more credits. Paid plan users can choose a larger instance size from the Cloud tab. Free plan users can upgrade their plan to move beyond the default instance. See [Upgrade instance](/features/advanced-settings#upgrade-instance) for more information. |
| Database storage | The amount of data your database stores, such as users, orders, messages, and app records                                                                                                                                                                                                                                                                                                                                                           |
| Network          | Data sent or received by your app, such as API responses, downloads, uploads, images, and media                                                                                                                                                                                                                                                                                                                                                     |
| Storage          | The amount of uploaded or generated files your app stores, such as images, documents, and videos                                                                                                                                                                                                                                                                                                                                                    |
| Compute          | Your app's code running behind the scenes, such as processing payments or sending emails                                                                                                                                                                                                                                                                                                                                                            |
| Realtime         | Live updates sent through your app, such as chat messages, notifications, or collaborative updates                                                                                                                                                                                                                                                                                                                                                  |

Cloud usage usually increases when more people visit your app, your app stores more data or files, users upload or download larger files, your app sends more API responses or media, your app runs more code behind the scenes, or Realtime features send more messages. For more information, see [the built-in backend (Cloud)](/features/cloud).

To reduce a project's usage, work through the checklist in [Reduce a project's usage](/features/project-usage#reduce-a-projects-usage): pausing, right-sizing the instance, fixing slow queries, cleaning up storage, or removing the built-in backend entirely.

To review Cloud usage, go to **Settings → Plans & credit usage → Usage details**, then select **Run credits**. You can filter by time range and view usage by project. The **Cloud tab → Usage** view inside a project shows the same breakdown, already filtered to that project, so you can see which categories drive its usage while you work on it.

The **Run credits** view includes both Cloud and AI gateway usage. The usage chart breaks Cloud usage into categories such as Database, Network, Storage, Compute, and Realtime. Database usage includes both database server and database storage.

<Frame>
  <img src="https://mintcdn.com/lovable-f9060f1e/jYa9JaOLdesBFow9/images/run-credits-breakdown.png?fit=max&auto=format&n=jYa9JaOLdesBFow9&q=85&s=72389865f9bd9eae7bf6560b0f51cdbd" alt="Run Credits Breakdown" width="317" height="321" data-path="images/run-credits-breakdown.png" />
</Frame>

### AI gateway costs

AI gateway usage is measured when AI features inside your deployed app make model calls. These requests are separate from the Lovable agent that helps you plan, build, and edit your project.

The built-in AI connector runs on a usage-based pricing model, so credit usage scales with how much your app uses AI features. Each model call deducts credits based on the model used and the number of tokens processed.

On Free, Pro, and Business plans, AI gateway usage draws from the monthly AI grant first. After that, it draws from general credits if available.

AI gateway usage rates are based on the underlying provider model costs. To estimate relative model costs, refer to the official provider pricing sources linked from the [supported model list](/features/ai#supported-models-for-ai-features-in-your-app).

| Usage driver  | What affects cost                                                                                                      |
| :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| Model choice  | More capable models usually cost more than smaller or faster models                                                    |
| Input tokens  | Longer prompts, documents, chat history, or retrieved context increase usage                                           |
| Output tokens | Longer AI responses increase usage                                                                                     |
| Call volume   | More users or more frequent AI actions create more model calls                                                         |
| Feature type  | Chatbots, document question answering, image generation, embeddings, and automations can have different usage patterns |

For more information, see [AI features for your app](/features/ai).

To review AI gateway usage, go to **Settings → Plans & credit usage → Usage details** and select **Run credits**. You can filter by time range and view usage by project.

The **Run credits** view includes both Cloud and AI gateway usage. The usage chart shows the top models used (see image in Cloud costs).

## View your credit balance

You can check your credit balance from the dashboard, the project editor, or **Settings → Plans & credit usage**.

<Tip>
  To quickly check your credit balance, click your workspace name in the top-left of the dashboard, or click the project name when you are inside the project editor. Both places show a credit bar with a quick view of your remaining credits.

  Click the credit bar to open **Plans & credit usage** for more details.
</Tip>

The credit bar shows your remaining daily build credits, monthly credits, personal credits, team credits, or commitment credits, depending on your plan.

Workspace admins and owners on paid plans can also open the **Credit balance** dialog for a detailed view of workspace credits, including credit types, expiry dates, and recent credit activity.

Select **Details** to open the **Credit balance** dialog. The dialog has two tabs: **Breakdown** and **History**.

### Breakdown tab

Available on Pro and Business plans. Not shown for Enterprise.

The **Breakdown** tab lists your general credit grants, including each grant’s type, expiry date, and remaining amount. Grants expiring soonest appear first.

A note at the top of the tab confirms that Lovable uses the general credits closest to expiry first.

<Frame>
  <img src="https://mintcdn.com/lovable-f9060f1e/aKANBa3zauHImQcC/images/credit-balance-breakdown.png?fit=max&auto=format&n=aKANBa3zauHImQcC&q=85&s=073401468adc5e7245177bebfa4e2023" alt="Credit Balance Breakdown" width="516" height="469" data-path="images/credit-balance-breakdown.png" />
</Frame>

| Credit type\*    | Description                                                                                                                |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------- |
| Monthly credits  | General credits included with your plan. Issued at each billing cycle renewal.                                             |
| Rollover credits | Unused monthly credits carried forward from a previous billing period.                                                     |
| Bonus credits    | One-off promotional credits from Lovable support, a referral (when someone you invited signs up), or an affiliate program. |
| Top-up credits   | Credits purchased through one-time top-ups or auto top-ups.                                                                |

\**Not all credit types appear for every workspace.*

### History tab

Available on Pro, Business, and Enterprise plans.

The **History** tab shows credit activity for up to the past 12 months, sorted newest first.

<Note>
  Because credit history recording started on March 8, 2026, early history may show less than 12 months of activity. Over time, the tab will show a full 12 months of credit history.
</Note>

Each row shows the event type, date, and credit change. Positive values mean credits were added, and negative values mean credits were removed or expired.

<Frame>
  <img src="https://mintcdn.com/lovable-f9060f1e/aKANBa3zauHImQcC/images/credit-balance-history.png?fit=max&auto=format&n=aKANBa3zauHImQcC&q=85&s=2b913dda296942421bcda796b85d2a6c" alt="Credit Balance History" width="516" height="466" data-path="images/credit-balance-history.png" />
</Frame>

| Event type                 | Description                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Monthly credits granted    | Monthly plan credits were issued at renewal or plan start.                                                                                                     |
| Monthly credits expired    | Unused monthly plan credits expired at the end of their validity window.                                                                                       |
| Bonus credits granted      | Promotional credits were added to your account, for example from Lovable support, a referral, or an affiliate program.                                         |
| Bonus credits expired      | Promotional credits expired unused.                                                                                                                            |
| Top-up credits granted     | Credits purchased through a one-time top-up or auto top-up were added to your account.                                                                         |
| Top-up credits expired     | Purchased top-up credits expired unused.                                                                                                                       |
| Commitment credits granted | Enterprise only. Your committed credit balance was issued or renewed.                                                                                          |
| Credits converted          | A one-time entry created during the transition to credits as the single balance, reflecting the conversion of your previous Cloud and AI balance into credits. |

## Tracking credit usage

Go to **Settings → Plans & credit usage → Usage details** to see a detailed breakdown of where your credits go across build usage, Cloud usage, and AI gateway usage.

The **Usage** card on the **Plans & credit usage** page shows recent usage at a glance. Select **More usage details** to open the full **Usage details** page.

<Tip>
  **Ask Lovable about your workspace’s credit usage directly in chat.**

  Ask a question about credits, spend, or cost, and Lovable looks up your usage and answers in the conversation using the same numbers shown in **Settings → Plans & credit usage**.

  For example, ask *How many credits did this workspace use this month?*, *How many credits have I used?*, *Which project used the most Run credits?*, *Which AI gateway model is using the most credits?*, or *What's driving my Run credit usage?*

  Usage answers follow the same visibility rules as **Usage details**.
</Tip>

### Usage visibility by role

Usage visibility depends on your workspace plan, workspace role, the usage type, and whether you have access to the project.

| View                 | Who can see it              | Notes                                                                                                                  |
| :------------------- | :-------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Your own usage       | Editors, admins, and owners | You can see your own build usage.                                                                                      |
| Total usage          | Editors, admins, and owners | Shows total workspace usage across the selected filters.                                                               |
| Project usage        | Admins and owners           | Shows usage by project. If you do not have access to a project, its usage is included, but the project name is hidden. |
| Other members’ usage | Admins and owners           | Only admins and owners can view Build usage for other workspace members.                                               |

<Note>
  On Enterprise workspaces, usage details are visible to admins and owners only. Editors may see a limited **Plans & credit usage** summary with their own personal usage and remaining team credits, but they cannot view detailed usage, workspace commitment totals, project usage, or other members’ usage.
</Note>

### Filters

Narrow the view with these filters:

* **Credit type:** switch between **All credits**, **Build credits** for building and editing, or **Run credits** for Cloud and AI gateway usage.
* **Project:** admins and owners can see usage per project across **All credits**, **Build credits**, or **Run credits**. Selecting a project updates the chart to show that project’s usage for the selected credit type. Clear the selected project to return to the full view.
* **People:** see your own build usage, or, if you are an admin or owner, see build usage per workspace member. This filter is only available when viewing **Build credits**. Selecting a person updates the chart to show that person’s build credit usage. Select **View details** to open [User insights](/features/people#user-insights) for that member. Clear the selected person to return to the full view.
* **Group:** admins and owners can see build credit usage per group. This filter is only available when viewing **Build credits**, and is available to Business and Enterprise workspaces. Selecting a group updates the chart to show that group’s build credit usage. Clear the selected group to return to the full view.
* **Time range:** view the last 30 days, last 90 days, or a custom range of up to 90 days.

### Reading the chart

The heading above the chart shows your total credits for the current filter and time range, such as *5,352 credits in last 30 days*. The chart shows daily credit consumption. Hover over a bar to see the details for that day.

Usage data may be up to a minute behind your most recent activity. New Run credit usage can take up to 24 hours to appear.

Each bar breaks down by usage type:

* **Cloud usage** breaks down into Database (server and storage), Network, Storage, Compute, and Realtime.
* **AI gateway usage** shows a breakdown by the top three models used.

<Note>
  Run usage history, which includes Cloud and AI gateway usage, starts on the date your workspace switched to the unified credit balance (June 1, 2026 at the earliest). Dates before then show Build usage only.
</Note>

This helps you answer questions like *Which project is driving my hosting costs?* or *Which member used the most credits this month?* directly from **Usage details**.

### Projects and People tabs

Below the chart, usage is broken down in two tabs:

* **Projects:** credits used per project across the selected credit type. Search and sort projects by usage, then select a project to apply the filter and update the chart.
* **People:** build credits used per workspace member. This tab is available when viewing **Build credits**. Search and sort members by build credit usage, then select a person to apply the filter and update the chart.

<Note>
  Project usage is visible to admins and owners. If you do not have access to a project, its usage is included, but the project name is hidden.

  Editors, admins, and owners can view their own build usage. Usage for other workspace members is visible to admins and owners only.

  On Enterprise workspaces, all usage details are visible to admins and owners only.
</Note>

## Credit top-ups

Credit top-ups are available on **Pro and Business plans**. Use them to add credits to your workspace balance so you can continue building your app, hosting it and running its built-in backend (Cloud), and using AI features in deployed apps.

Workspace **owners** and **admins** on paid plans can add credits in two ways:

* **Auto top-up**: add credits automatically when your balance runs low
* **One-time top-up**: buy credits manually when you need them

You can buy credit top-ups from:

* **Settings → Plans & credit usage**
* The **low-credits alert in chat** when you’re running out of credits

Pricing depends on your plan. Top-up credits are purchased outside your monthly subscription, so they have their own price per credit.

| Plan     | Top-up price        | Price per credit  |
| -------- | ------------------- | ----------------- |
| Pro      | \$15 per 50 credits | \$0.30 per credit |
| Business | \$30 per 50 credits | \$0.60 per credit |

Credit top-ups are billed as one-time payments through Stripe. An invoice or receipt is generated for every purchase.

Top-up credits are valid for **12 months** from your most recent purchase.

<Tip>
  If you consistently need more credits each month, upgrading your plan is usually better value. See [Subscription plans](/introduction/subscription-plans) for more information.
</Tip>

### Auto top-up

Auto top-up automatically purchases credits when your balance reaches or falls below a threshold you set. Use it to keep building your app, hosting it and running its built-in backend (Cloud), and using AI features in deployed apps when your balance gets low.

Top-ups run as often as needed, as long as the next top-up would not exceed your monthly spend limit.

<Steps>
  <Step title="Open Plans & credit usage">
    Go to **Settings → Plans & credit usage**.
  </Step>

  <Step title="Open the auto top-up flow">
    Select **Add credits → Auto top-up → Set up**.
  </Step>

  <Step title="Set the auto top-up rules">
    Choose when auto top-up runs, how many credits it adds, and the maximum amount it can add each month.

    * **Top-up amount**: the number of credits added to your workspace each time auto top-up runs.
    * **When my balance falls below**: the credit threshold that triggers the auto top-up. Auto top-up runs when your balance reaches or falls below this amount.
    * **Monthly spend limit:** the maximum number of credits auto top-up can add in a calendar month. You are charged only for credits actually added. Use this to control monthly top-up charges, or leave it at **No limit**.

    | Setting                     | Default     | Credit options                                                          |
    | :-------------------------- | :---------- | :---------------------------------------------------------------------- |
    | Top-up amount               | 100 credits | 50, 100, 150, 200, 300, 500, 1,000 credits                              |
    | When my balance falls below | 25 credits  | 25, 50, 100 credits                                                     |
    | Monthly spend limit         | 400 credits | 100, 200, 400, 1,000, 2,000, 5,000, 10,000, 25,000 credits, or No limit |
  </Step>

  <Step title="Turn on auto top-up">
    Select **Turn on auto top-up**.

    The UI shows the cost for each top-up and, if you set a monthly spend limit, the maximum monthly cost.
  </Step>
</Steps>

Your default payment method is charged only when a top-up is triggered. Auto top-up runs only if both conditions are met:

1. Your balance reaches or falls below your selected threshold.
2. The top-up would not exceed your monthly spend limit.

The monthly spend limit resets on the 1st of each calendar month at 00:00 UTC, displayed in your timezone. It is not tied to your subscription billing cycle.

<Note>
  **Auto top-up is paused when you upgrade from Pro to Business**

  If you upgrade from Pro to Business, Lovable pauses auto top-up, because the price per credit changes with your plan. Review your auto top-up settings after upgrading and re-enable it if the new pricing works for you. Re-enabling auto top-up or saving new auto top-up settings clears the pause.
</Note>

### Turn off auto top-up

Workspace owners and admins can turn off auto top-up at any time to stop further automatic credit purchases.

<Steps>
  <Step title="Open Plans & credit usage">
    Go to **Settings → Plans & credit usage**.
  </Step>

  <Step title="Edit auto top-up enabled">
    Click **Edit** next to **Auto top-up enabled.**
  </Step>

  <Step title="Turn off auto top-up">
    Click **Turn off auto top-up** to stop future automatic charges. Your existing credit balance is not affected.
  </Step>
</Steps>

<Note>
  Turning off auto top-up does not refund previous purchases.
</Note>

You can still add credits manually with a one-time top-up at any time.

### One-time top-up

Use a one-time top-up to add credits manually without changing your subscription. This is useful if you run out of credits mid-cycle or have occasional spikes in usage.

<Steps>
  <Step title="Open Plans & credit usage">
    Go to **Settings → Plans & credit usage**.
  </Step>

  <Step title="Open the top-up flow">
    Select **Add credits**, then select **Buy once**.
  </Step>

  <Step title="Choose the credit amount">
    Choose between 50, 100, 150, 200, 250, 300, 400, 500, 1,000, 2,000, 3,000, 5,000, or 10,000 credits.

    The UI shows the cost before you buy.
  </Step>

  <Step title="Confirm payment">
    Select **Buy credits** and confirm payment.
  </Step>
</Steps>

Credits are added to your workspace instantly. Multiple purchases are allowed.

## Alerts and notifications

Lovable shows alerts when your workspace is close to a limit, runs out of credits, or needs billing attention. Alerts can appear as chat nudges, in-app banners, blocking dialogs, inline messages, or emails to workspace owners and admins.

You may be notified when:

* **Your workspace is running low on credits.** A nudge appears above the chat input with your remaining credits and an option to add more.
* **Your workspace runs out of credits.** When you try to continue building your app, Lovable shows a blocking dialog and building stops until credits are available.
* **A deployed app is paused because your workspace has no available credits.** Lovable shows an in-product message when a deployed app that relies on the built-in backend (Cloud) or AI features pauses.
* **Cloud or AI gateway usage approaches a limit.** Lovable shows an in-app alert on the **Plans & credit usage** page.
* **Credits are expiring soon.** A chat nudge may appear when top-up or rollover credits are nearing expiry.
* **Auto top-up fails.** Lovable emails workspace owners and admins and shows an in-app banner with options to retry the charge or update the payment method.
* **Auto top-up reaches its monthly spend limit.** Lovable emails workspace owners and admins when auto top-up reaches the monthly spend limit you set.
* **A non-admin runs out of credits.** They can send a credits ping to workspace owners and admins asking them to add credits.

## What happens when you run out of credits

Running out of credits affects each part of Lovable differently:

* **Building stops.** When you try to continue building, Lovable shows a blocking dialog until credits are available.
* **AI features in deployed apps stop working.** App features that call [AI](/features/ai) at runtime need available credits, so they fail while your balance is at zero.
* **Built-in backend services will pause.** If your app uses a backend service like a database, storage, or authentication, those services pause shortly after you run out of credits.

  Your database, storage, and authentication data stays safe while the services are paused. You cannot access or export it until the services run again. To learn how to get a copy of your data, see [Export Lovable Cloud data](/features/advanced-settings#export-lovable-cloud-data).

  To reduce costs, ask Lovable to optimize your project, or pause projects you don't use. Check your [usage page](https://lovable.dev/settings/billing) for more information on backend spend.

To keep your workspace and apps running:

* **Free plan:** upgrade to a paid plan to get more credits and unlock top-ups.
* **Paid plans:** enable auto top-up, or add credits with a one-time top-up.

<Tip>
  To prevent pauses and failing AI features from an empty balance, enable **auto top-up** on Pro or Business plans. Lovable then adds credits automatically when your balance falls below a threshold you set.

  For busier apps, set a higher trigger threshold, such as **50** or **100 credits**, so credits are added before your balance gets close to zero. You can also review **Usage details** over a 90-day range to see whether your usage is trending up.
</Tip>

## FAQ

<AccordionGroup>
  <Accordion title="How were Cloud and AI balances converted into credits?">
    Previous Cloud and AI balances were converted using each workspace’s **plan credit rate**.

    Pro and Business use different plan credit rates because Business plans include additional functionality, such as advanced controls and governance features. For the full feature comparison, see [Subscription plans](/introduction/subscription-plans).

    | Plan     | Plan credit rate  | Example conversion          |
    | :------- | :---------------- | :-------------------------- |
    | Pro      | \$0.25 per credit | \$10 converts to 40 credits |
    | Business | \$0.50 per credit | \$10 converts to 20 credits |

    Because Pro and Business use different plan credit rates, the same previous Cloud and AI balance can convert into a different number of credits depending on the workspace plan.

    This does **not** mean Cloud or AI gateway usage is cheaper on Business. It means fewer credits are deducted because each Business credit represents more dollars.

    The number of credits is different, but the Cloud and AI gateway value is the same.
  </Accordion>

  <Accordion title="What happens if credits run out?">
    Building stops until credits are available. Your published site stays live, and its pages keep serving. AI features in deployed apps stop working, and apps that rely on the built-in backend (Cloud) can pause. See [What happens when you run out of credits](#what-happens-when-you-run-out-of-credits) for the full breakdown.

    Normal operation resumes when credits become available again, either through a one-time top-up, auto top-up, or the next applicable grant refresh. Free plan monthly grants refresh on the 1st of each calendar month at 00:00 UTC. Pro and Business monthly Cloud and AI grants refresh with the subscription billing cycle.
  </Accordion>

  <Accordion title="How do I get more credits?">
    Go to **Settings → Plans & credit usage**.

    From there, you can upgrade your plan or, if you’re on a **Pro or Business plan**, buy one-time credit top-ups without changing your subscription.

    For plan upgrades and subscription tiers, see [Subscription plans](/introduction/subscription-plans).
  </Accordion>

  <Accordion title="Do my credits expire?">
    Yes. Different credit types expire at different times:

    * Monthly plan credits expire 2 months after issue on monthly plans. On annual plans, monthly plan credits are issued monthly and expire 1 month after the annual billing period ends.
    * Top-up credits expire 12 months after purchase.
    * Monthly Cloud grants expire at the end of the calendar month on Free plans, and at the end of the billing cycle on Pro and Business plans.
    * Monthly AI grants expire at the end of the calendar month on Free plans, and at the end of the billing cycle on Pro and Business plans.
    * Daily build credits expire at the end of the day.

    Your balance breakdown shows the expiry date of each general credit grant. Lovable spends soonest-expiring general credits first to minimize what you lose.
  </Accordion>

  <Accordion title="Do usage-specific grants roll over?">
    No. Unused usage-specific grants do not roll over.

    * Daily build credits refresh every day at 00:00 UTC.
    * On Free plans, monthly Cloud and AI grants refresh on the 1st of each calendar month at 00:00 UTC.
    * On Pro and Business plans, monthly Cloud and AI grants refresh with the subscription billing cycle.
  </Accordion>

  <Accordion title="Which plans include a monthly AI grant?">
    Free, Pro, and Business plans all include a 4-credit monthly AI grant for AI gateway usage in deployed apps. On Free, the grant refreshes on the 1st of each calendar month at 00:00 UTC. On Pro and Business, it refreshes with the subscription billing cycle. Unused AI grant credits do not roll over.

    Enterprise plans do not include the monthly AI grant. Contact your account team for account-specific details.
  </Accordion>

  <Accordion title="When do monthly plan credits reset?">
    Monthly plan credits are granted at the start of each billing period. This happens every month on the same date your subscription started.

    On annual billing, monthly plan credits are still issued monthly and expire 1 month after the annual billing period ends.

    To see your billing period, go to **Settings → Plans & credit usage**.
  </Accordion>

  <Accordion title="Can I see my balance without opening Settings?">
    Yes. You can quickly check your credit balance from the dashboard or from a project.

    From the dashboard, click your workspace name in the top-left. From a project, click the project name in the top-left of the editor.
  </Accordion>

  <Accordion title="Can I see which project or member is using the most credits?">
    Yes. Open **Usage details** from **Plans & credit usage**.

    You can filter by project across **All credits**, **Build credits**, and **Run credits**. You can filter by member or group (on Business and Enterprise) when viewing **Build credits**.
  </Accordion>

  <Accordion title="Can I limit how many credits members can spend?">
    Yes. Workspace owners and admins can set monthly credit limits for workspace members. Member credit limits apply to build usage only: run credits from deployed apps (Cloud and AI gateway usage) do not count against a member's monthly limit.

    There are two types of member credit limits:

    | Limit type                          | What it does                                                                                                                                                                   |
    | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
    | Default monthly member credit limit | Sets the default number of credits each member can use per calendar month. This applies to all members who do not have an individual override. Leave it empty to use no limit. |
    | Individual member credit limit      | Sets a custom monthly credit limit for a specific member. This overrides the workspace default for that member. Available on all paid plans.                                   |

    To set the workspace default, go to your workspace settings and update **Default monthly member credit limit**. See [General workspace settings](/features/workspace-admin-settings#general-workspace-settings). 

    To set an individual member limit on all paid plans:

    1. Go to **Settings → People**.
    2. Click the three-dot menu at the end of the member's row.
    3. Select **Set credit limit**.
    4. Enter the monthly credit limit and save.

    Member credit limits reset on the 1st of each month at 00:00 UTC, independent of your workspace billing cycle.

    When a member reaches their limit, they cannot use more build credits until the limit resets or an owner or admin changes their limit.
  </Accordion>

  <Accordion title="Who can manage billing and top-ups?">
    Workspace owners and admins can manage the plan, top-ups, and auto top-up.

    Editors, admins, and owners can view total usage and their own build usage. Project usage and other members’ usage are visible to admins and owners only. If someone does not have access to a project, the project name is hidden.

    On Enterprise workspaces, usage details are visible to admins and owners only.
  </Accordion>
</AccordionGroup>

## Troubleshooting

<AccordionGroup>
  <Accordion title="My auto top-up failed. What should I do?">
    If an auto top-up fails, Lovable shows a banner in the workspace dashboard and in **Settings → Plans & credit usage**. This can happen if your card is declined, expired, or no longer available.

    Use **Retry charge** to run the auto top-up again with your current default payment method. The banner is dismissed once the retry succeeds.

    Use **Update payment method** to open the Stripe customer portal and add or change your card. The next auto top-up attempt uses your updated payment method.

    Workspace owners and admins also receive an email when an auto top-up is declined.

    If your credit balance reaches zero before the charge succeeds, building stops, AI features in deployed apps stop working, and apps that rely on the built-in backend (Cloud) can pause until credits are added. Your published site stays live. See [What happens when you run out of credits](#what-happens-when-you-run-out-of-credits).
  </Accordion>

  <Accordion title="My auto top-up paused after I upgraded to Business. What should I do?">
    When you upgrade from Pro to Business, Lovable automatically pauses auto top-up because the per-credit top-up price changes. This prevents your next top-up from being charged at the new Business price without confirmation.

    After the upgrade, Lovable shows a prompt in the workspace dashboard and in **Settings → Plans & credit usage**.

    You can re-enable auto top-up at the new Business price. Your previous top-up amount and monthly spend limit are preserved, so you only need to confirm.

    You can also keep auto top-up off and use one-time top-ups instead.

    Auto top-up stays paused until you choose one of these options. Re-enabling auto top-up or saving new auto top-up settings clears the pause.
  </Accordion>

  <Accordion title="My deployed app stopped working. What should I do?">
    Check **Settings → Plans & credit usage** for your credit balance.

    If your balance and any applicable monthly Cloud or AI grants are at zero, add credits, enable auto top-up, or wait for the next applicable grant refresh. On Free plans, monthly Cloud and AI grants refresh on the 1st of each calendar month at 00:00 UTC. On Pro and Business plans, monthly Cloud and AI grants refresh with the subscription billing cycle.

    To prevent this in the future, consider enabling auto top-up on Pro or Business plans and reviewing **Usage details** to understand which projects or usage types are consuming credits.
  </Accordion>

  <Accordion title="I stopped receiving daily build credits. What happened?">
    You may have reached your monthly cap for daily build credits.

    Daily build credits are capped per calendar month on Free plans only. Free workspaces receive 5 daily build credits, up to 30 per calendar month. After a Free workspace reaches the cap, the daily 5 credits stop being granted for the rest of that calendar month. Daily build credits resume on the 1st of the next calendar month at **00:00 UTC**. For example, on Free, you receive daily build credits for the first 6 days each month (6 × 5 = 30), then none until the next month starts.

    Pro and Business workspaces receive 5 daily build credits every day at 00:00 UTC, with no monthly cap.

    If you need more credits before then, upgrade your plan or add credits with a one-time top-up on a Pro or Business plan.
  </Accordion>
</AccordionGroup>
