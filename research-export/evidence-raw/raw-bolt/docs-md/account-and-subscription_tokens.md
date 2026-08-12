> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Tokens

> Understand tokens, buy more, and token FAQs.

Tokens are small pieces of text. Short, common words like "I", "love", and "cats" are typically one token each, but longer or less common words can be split into several. AI tokens are the basic unit AI uses to read and generate text. This applies to all AI apps, not just Bolt.

Bolt consumes tokens when it reads, thinks about, and builds your project.

### Token limits

Bolt has a limit on how many tokens it can work with in each conversation. This limit includes both your input (like questions or documents) and Bolt's output (like responses or generated code).

### Token costs

When you use Bolt, the cost is typically calculated based on how many tokens get processed, so using fewer tokens means lower costs.

Most of your token usage comes from Bolt reading, understanding, and syncing your project files, so larger projects use more tokens per message.

You can optimize your token usage and get better results by following our best practices in [Prompting effectively](/best-practices/prompting-effectively) and [Maximizing token efficiency](/best-practices/maximizing-token-efficiency).

### Token reset

Your token allowance resets on a regular schedule, but the timing depends on your plan type.

* **For users on a free plan:** tokens reset on the 1st of each calendar month.
* **For users on a paid subscription plan:** tokens reset on the renewal date. Example: If you subscribed to a paid plan on July 15, your tokens will reset on the 15th of every month thereafter.

<Note>
  If you cancel your paid subscription mid-month and have used more than 1 million tokens, you'll need to wait until next month to get free tokens. For example, if you've used 3 million tokens in July and downgrade to the free plan (1 million token limit), you'll need to wait until August 1 to continue working on your projects.
</Note>

## Buy more tokens

When you need more tokens, the most cost-effective option is to upgrade to a higher-tier plan. You can upgrade your plan by following these steps:

1. Log in to your Bolt account.
2. On the Bolt homepage, in the sidebar, click your profile icon in the bottom-left, then click **My Subscription**.
3. Click **Upgrade plan**.

On this page, you can also view your current token balance, including your rollover tokens.

<img src="https://mintcdn.com/stackblitz/2niB9aU-0UfYD5Bx/images/token-balance.png?fit=max&auto=format&n=2niB9aU-0UfYD5Bx&q=85&s=ee961b46bc8e4bc7be4ac7e444324a22" alt="The token balance display in Bolt" width="1806" height="1204" data-path="images/token-balance.png" />

If you're subscribed to the highest individual monthly Pro plan or to any annual Pro plan, you can purchase additional tokens by following the steps below:

1. Log in to your Bolt account.
2. On the Bolt homepage, in the sidebar, click your profile icon in the bottom-left, then click **My Subscription**.
3. Click **Reload tokens**.

<img src="https://mintcdn.com/stackblitz/2niB9aU-0UfYD5Bx/images/reload-tokens.png?fit=max&auto=format&n=2niB9aU-0UfYD5Bx&q=85&s=9112d0bfda563cf2a2e4767e12b11ce8" alt="The reload tokens option in Bolt" width="1904" height="898" data-path="images/reload-tokens.png" />

Any tokens purchased as a reload do not expire.

The price per token reload varies based on your plan. If you're on an annual plan, higher-tier plans have a lower price per 10M tokens than lower-tier plans. You'll see the cost for your plan when you go to reload tokens.

<Info>
  Free plans have a daily usage limit of 300K tokens. Upgrading to a paid plan removes that limitation.
</Info>

For details on subscription plans, check out our [Pricing page](https://bolt.new/pricing).

## Token rollover

Rollover tokens are unused tokens from a previous billing cycle that carry over into your current cycle. If you maintain a paid subscription, any unused tokens from your monthly allocation roll over and stay valid for two months from the start of the billing cycle in which you received them.

To view your token usage:

1. Log in to your Bolt account.
2. On the Bolt homepage, in the sidebar, click your profile icon in the bottom-left, then click **My Subscription**.
3. View your current token allocation, including any rollover tokens.

<img src="https://mintcdn.com/stackblitz/2niB9aU-0UfYD5Bx/images/token-balance.png?fit=max&auto=format&n=2niB9aU-0UfYD5Bx&q=85&s=ee961b46bc8e4bc7be4ac7e444324a22" alt="The token balance display in Bolt" width="1806" height="1204" data-path="images/token-balance.png" />

<Accordion title="Do I get any rollover tokens as a free plan user?">
  Tokens on the free plan don't roll over. Any tokens that you have accrued are assigned as fixed one-month buckets.
</Accordion>

<Accordion title="How are tokens consumed?">
  Tokens are consumed on a first-in, first-out basis, meaning the oldest (rollover) buckets are consumed before the newer tokens from your latest billing cycle.
</Accordion>

<Accordion title="How long are tokens valid upon rollover/renewal?">
  On rollover/renewal, you receive a new allocation, valid for two months.

  Example: You are on the Pro 50 plan in July with a renewal date of August 5. On August 5, you get a new allocation of Pro 50 valid until October 5. Any unused tokens from your July 5 allocation will remain available until September 5, as long as you maintain a paid subscription.

  If you upgrade a plan in the middle of a billing cycle, the tokens allocated in the upgrade are valid for two months from the start of the billing cycle in which you upgraded, rather than for two months from the day they're granted.
</Accordion>

<Accordion title="What happens when I cancel my paid plan?">
  When you cancel your paid plan, you lose access to all allocated tokens (including rollover tokens) when the billing cycle ends. To use your rollover tokens, resubscribe to a paid plan before they expire.

  Example: You are on the Pro 50 plan in July with a renewal date of August 5 but then you cancel at the end of the month, either voluntarily or your payment fails. On August 5, you lose access to all token allocations.

  When you resubscribe, you'll receive a token allocation based on your new plan, and regain access to any unexpired rollover tokens. In the above example, if you resubscribe before September 5, you can still use your remaining tokens from July, along with your new monthly tokens.
</Accordion>

<Accordion title="What happens if I downgrade from one paid plan to a lower-tier paid plan?">
  When you downgrade from one paid plan to a lower-tier paid plan, you retain access to any unused tokens from your previous (higher-tier) allocation until they expire, which is up to two months from their original issue date. On your next renewal date, you'll begin receiving tokens based on your new, lower-tier plan.

  Example: You're on the Pro 50 plan in July, with a renewal date of August 5. You downgrade to Pro 20 at the end of July.

  On August 5, your lower-tier plan begins, and you receive a Pro 20 token allocation (valid until October 5).

  Your unused higher-tier tokens from July remain available until September 5.
</Accordion>

<Accordion title="What happens if I upgrade my plan in the middle of a billing cycle?">
  If you upgrade in the middle of a billing cycle, the tokens from your upgrade are valid for two months from the start of that billing cycle, not two months from the day you upgrade.

  Example: Your billing cycle starts July 1 and you upgrade on July 15. The tokens you receive at upgrade are valid until September 1, not September 15.
</Accordion>

<Accordion title="I have an annual subscription. How is this handled in my case?">
  If you subscribe to an annual plan, tokens are still assigned on a monthly basis, and each monthly allocation follows the same two-month expiration rule.

  Example: You are on the Pro 50 plan in July with a renewal date of August 5. On August 5, you get a new allocation of Pro 50 valid until October 5. Any unused tokens from your July 5 allocation will remain available until September 5.

  You're billed for the next twelve months as soon as you subscribe to an annual plan.

  Check out the [Billing page](/account-and-subscription/billing#discounts) for more details.
</Accordion>

<Accordion title="How does token rollover work on team plans?">
  Tokens are assigned to each team member and stay linked to the person who accrued them.
</Accordion>
