> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Bolt QuickStart guide

> Build your first website or app with Bolt: no code required.

In this step-by-step guide, you’ll learn how to build, edit, and publish an example **Pet Name Picker** web app.

You can follow along in your own browser window, or use the prompts as a springboard for your own ideas.

<Info>
  Following this walkthrough will use just under 300K tokens, which is the daily limit of Bolt's free plan. If you’d prefer not to use tokens while you learn, you can simply read along and watch the example videos.
</Info>

If you're already familiar with how to build an app in Bolt, you can skip this guide and read our article on [planning your app from start to finish](/get-started/project-lifecycle).

## What you’ll need

* A Chrome or Chromium browser (Opera, Brave, Edge, Vivaldi, etc.)
* 10–15 minutes

Note that Bolt will build your app a bit differently from what you see in this guide. You'll be able to follow along step by step, but your individual results will vary slightly.

## Part 1: Build your app with your first prompt

You're about to see Bolt in action for the first time. Follow these steps and you'll have a working app in just a few minutes!

1. Open [Bolt.new](https://bolt.new).
2. In the chatbox, paste this <Tooltip tip="The text or instructions you give Bolt to tell it what you want it to do, answer, or create.">prompt</Tooltip>: \
   `Build a pet name picker app with dropdowns that allow people to choose animal types (e.g. dog, cat, bird, lizard, etc.) and name categories (e.g. cute, celebrity puns, movie inspired, etc.) Create user email sign up and log in functionality and the ability to save favorite names when logged in.`
3. Click **Build now** to submit the prompt.

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784219364/quickstart-prompt_z11jcu.png" alt="The Bolt home page with the pet picker prompt in the chatbox and an arrow pointing to the Build now button." />
</Frame>

4. Sign in or sign up (Google, GitHub, or email: no credit card required). To learn more, see [Sign up for Bolt](/account-and-subscription/account-management#sign-up-for-bolt).
5. Complete the survey.
6. Wait approximately five minutes while Bolt creates your app.
   <Note>
     Because your prompt includes features such as sign-up, login, and favorites, Bolt needs to set up databases, which takes a bit more time. Apps without database features usually build faster.
   </Note>
7. Try it out in the Preview window. Pick an animal, pick a category, and generate a name.

<Check>
  Congrats! You just built your first Bolt web app!
</Check>

## Understanding tokens

Bolt uses large language model (LLM) technology to process your prompts and build your site. You don’t need to know the technical details, but it's helpful to know that LLMs work on a token system, and Bolt’s free and paid plans are based on them.

Think of tokens as a measurement of Bolt’s efforts. Bolt “uses” tokens when it:

* reads
* thinks
* builds

The bigger and the more complex your website or app, the more tokens it will take to build it. The next step we'll take in this guide is to determine how many tokens we used to build the first iteration of our app.

## Part 2: Check token usage and turn on token display in chat

Check how many tokens your initial build used, and turn on the option to display token usage in chat. This helps you see how many tokens each of your prompts uses.

<video autoPlay muted controls loop playsInline src="https://res.cloudinary.com/dlq2nawz5/video/upload/v1758813018/quickstart-vid-token-on_aiwmw6.mp4" />

1. At the top of your screen, click your **profile icon**, then click **Settings**.
2. In the left menu, under Account, click **Subscription & Tokens**.
3. View how many tokens you have remaining to calculate how many tokens your build used.
   <Info>
     In the example video above, there are 96K tokens remaining, meaning the build used 204K. (Free accounts offer 1 million tokens monthly with a 300K per day limit.)
   </Info>
4. In the left menu under Account, click **General**.
5. Turn on **Display token usage in chat**.
6. Look above your chatbox to view your remaining tokens, which should match what you saw when looking at your subscription information.

## Part 3: Try out your app by signing up and saving favorites

Now that your app is built and you have a handle on how tokens work, take a moment to explore what you’ve created.

Start by testing the sign-up feature. Use some sample information to create an account and make sure everything works as expected. Once you’re signed in, try saving a few favorites to see how your app handles user data.

<video autoPlay muted controls loop playsInline src="https://res.cloudinary.com/dlq2nawz5/video/upload/v1759736940/quickstart2-vid-tryout_fyq10n.mp4" />

1. Click the **Sign Up** button.
2. Create an account using some dummy data.
3. Generate a few names and mark them as favorites.
4. Scroll down to check that your favorites were saved correctly.
   <Tip>
     If your favorites aren't showing immediately, try logging out and back in; that should fix the issue.
   </Tip>

## Part 4: View your database info

One of the reasons Bolt is so powerful is that it includes built-in database creation and management. Many web app builders require you to set up a third-party database and connect it manually, but Bolt handles this for you automatically as part of Bolt Cloud.

From your first prompt, Bolt recognized that your app needed databases and created them for you: one for storing user favorites and another for managing authentication data. In this section, you’ll see how to view that information.

<video autoPlay muted controls loop playsInline src="https://res.cloudinary.com/dlq2nawz5/video/upload/v1759737027/quickstart2-vid-database_a5zq5g.mp4" />

<Steps>
  <Step title="View your databases">
    1. Click the **database icon** in the top center of your screen.
    2. Click the **favorites** table.
    3. Notice how the names you've favorited appear as database entries. This is how Bolt manages the favorites feature: with a database that associates the name, animal type, and category with a user ID.
  </Step>

  <Step title="View User Management">
    Now that you’ve seen the information saved in your favorites database, take a moment to explore User Management to see how Bolt handles user sign-ups.

    1. Click the **gear icon** in the top center of your screen, then click **All project settings.**
    2. Click **User Management**.
    3. Notice the chart that shows user sign-ups, along with the database table below it that lists information for each registered user.
           <Tip>
             Note that the `user_id` under User Management will match the `user_id` in your Database favorites table.
           </Tip>
  </Step>
</Steps>

## Part 5: Use the selector tool to change your app title

Now let’s use the selector tool to update your app’s title.

By default, your app was automatically named *Pet Name Picker*. Let’s change it to *PetPick* to give it a more personalized touch.

<video autoPlay muted controls loop playsInline src="https://res.cloudinary.com/dlq2nawz5/video/upload/v1759737242/quickstart2-vid-namechange_eo3bmq.mp4" />

1. In the chatbox, click the **Select** icon.
2. Click the **Pet Name Picker** site title.
3. In the chatbox, paste the following prompt: `Change the title of the app to PetPick.`
4. Press **Enter** or click the blue arrow icon to submit.
5. Take note of your remaining tokens. In this example, the total dropped from 96K to 26K, so about 70K tokens were used, which is considerably fewer than the first build.

<Check>
  **Nice work!** Now you have an understanding of how to change your site after it's been created, as well as how many tokens it takes to perform an example update.
</Check>

## Part 6: Use Version History to restore an automatic backup

No matter how experienced you are, things don’t always go as planned. At some point, you may make changes to your site that you want to undo.

When that happens, the easiest solution is to restore a previous version of your build. In this example, you’ll restore the site to its original color scheme by following the steps below.

<video autoPlay muted controls loop playsInline src="https://res.cloudinary.com/dlq2nawz5/video/upload/v1758813005/quickstart-vid-restore_n1hw5z.mp4" />

1. In the top left of your screen, click the **project title**, then click **Version history.**
2. Click the bottom option, which opens its preview mode.
3. Click **Restore this version** in the top-right of your screen.
4. Click **Restore version** to confirm.

**Nice!** You just restored your site to an earlier backup! Notice how your project name has reverted to *Pet Name Picker* instead of *PetPick*.

<Tip>
  Did you notice your token balance didn't change? Restoring your site to a previous version doesn't use tokens!
</Tip>

## Part 7: Use code view to make changes

While you can do almost everything you need through prompting, it’s helpful to understand how code view works. Code view lets you make changes directly in your app’s code without using any tokens.

<Warning>
  If you’re new to coding, limit your edits to text and labels at first. It’s easy to break things when working directly in code, and version history doesn’t cover those changes. If something goes wrong, you’ll need to prompt Bolt to help you fix it.
</Warning>

<video autoPlay muted controls loop playsInline src="https://res.cloudinary.com/dlq2nawz5/video/upload/v1759737056/quickstart2-vid-code_ivqy6b.mp4" />

1. Click the **code view** icon in the top center of your screen.
2. If you know where to look to make your changes, that's great. However, a shortcut is to use the search bar to find the text you want to change. To do so, click the **Search** icon.
3. Enter `Pet Name Picker`.
4. Click the result that appears under `App.tsx`.
5. Change the name in the code from `Pet Name Picker` to `PetPick`.
6. Click **Save** in the top right corner of your screen.
7. Click the **eye icon** to return to Preview Mode and verify your changes have taken effect.
8. Take note that no tokens were used to complete this name change.

<Check>
  You just made code changes that didn't require any tokens!
</Check>

## Part 8: Publish your project

Now you’re ready to share your app with others! Follow the steps below to publish it using Bolt’s built-in hosting.

<video autoPlay muted controls loop playsInline src="https://res.cloudinary.com/dlq2nawz5/video/upload/v1758813047/quickstart-vid-publish_ltbrsa.mp4" />

1. Click **Publish** in the top-right corner of your screen.
2. Click the second **Publish** button that appears.
3. Wait about a minute for Bolt to deploy your site.
4. Click the link that appears in the chat window to open your site in a new browser tab.

<Check>
  Awesome! You just published your Bolt web app!
</Check>

## Next steps

Nice work, you're part of the Bolt builder community!

Now it's time to start building expertise and learning how to bring your ideas to life as accurately and efficiently as possible.

For your next project, you can start by learning how to [plan your app from start to finish](/get-started/project-lifecycle).

Once you've got the foundations of your first prompt down, you can then work on learning to [prompt effectively](/best-practices/prompting-effectively) and [use Plan mode](/best-practices/plan-mode) effectively.

Also be sure to check out one of the Help Center's most popular articles on [Maximizing token efficiency](/best-practices/maximizing-token-efficiency).

## Troubleshooting

If you get stuck, check out [Troubleshooting Bolt issues](/troubleshooting/issues) for steps to resolve common problems.

## You’ve got this

Starting out is often the toughest part, and now you're already ahead. Keep moving, stay curious, and remember: progress beats perfection every time!
