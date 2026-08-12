> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Version history, version control, and GitHub

> Learn why version history and control matter, and where GitHub fits.

<Note>
  This article introduces the basics of version history, version control, and GitHub. If you already understand these concepts and need guidance on integrating or managing your project with GitHub, see [GitHub for version control](/integrations/git).
</Note>

## What is version history?

Version history means being able to track changes to a file over time. Instead of saving multiple copies with different names, you can look back at previous versions, see what changed, and restore them if needed. It gives you an undo button for your entire project.

The old, clunky way of version history was saving full copies of a project with different file names, like `Project v1`, `Project final`, `Project final FINAL`, and so on. Today, many types of software have built-in version history features that automatically track changes and let you roll back, so you don't have to manage those copies manually.

Bolt is no exception, offering a built-in feature that allows you to easily switch between different saved copies (backups) of your project.

## What is version control (and how is it different from version history)?

Version control goes further than just recording history and allowing simple switching between backup copies of a project. It’s a whole system for managing changes across time and across people. Instead of only being able to “go back,” version control tools like GitHub let you:

* Create duplicate copies of your project to test new features without impacting the main project.
* Merge changes from different teammates, even if they worked on the same files.
* Track who made each change and why.
* Resolve conflicts when two people edit the same spot.

Version history is like keeping older editions of a book on the shelf so you can pull down an earlier copy. Version control is like running the whole library. You still have every edition, but you also track who borrowed each one, who added notes, how the editions connect, and where new copies should be approved and stored.

## Bolt’s Version History feature

Bolt has a Version History feature built in, which automatically keeps older versions of your work. If you make a mistake, you can roll back. If you want to compare what you had before, you can use the Preview feature to see what looks different. You can access the Version history panel by clicking **Version history** in your project's top menu.

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784056520/version-history-button_iy5kxq.png" alt="The version history button in Bolt highlighted and the version history panel open." />
</Frame>

To learn more about using Bolt's built-in Version History feature, see [Restore using Version History](/building/using-bolt/rollback-backup#restore-using-version-history).

This is a very useful feature for individual work and simple edits.

However, if you need to work on your project outside of Bolt or require advanced collaboration, branching, or detailed history, Bolt’s built-in system may not be sufficient. That's where GitHub comes in.

## GitHub: The most popular version control tool

GitHub is the most widely used platform for version control. While Bolt’s Version History tracks your work in Bolt, GitHub allows you to:

* Work with teammates on the same project without overwriting each other.
* Create branches to test new ideas without touching the main version.
* Keep a full, permanent history of every change.
* Review changes before they are accepted.

GitHub is built on a tool called [Git](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F), which records changes to files and makes it possible to go back in time. GitHub adds collaboration, sharing, and an online home for your projects.

The following video provides an official introduction for beginners:

<iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/r8jQ9hVA2qs?si=5Ipta7YRwOhx5MwP" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

## How GitHub works step by step

Working in GitHub can feel overwhelming at first, but the basics are easy to grasp.

If you are new and hear someone say, ***“push your commits from that branch to the repo because I’m looking at the pull request now,”*** you might have no idea what that means.

But if they said instead, ***“save your changes in the copy of the project you’re working on, because I’m reviewing everyone’s changes together now,”*** you would understand right away.

Working in GitHub can admittedly get complicated, but the core workflow is straightforward. Here are the main steps:

1. **Create or connect your main project folder.** GitHub calls this a **repository** or **repo**.
2. **Manually save your progress.** Each manual save is called a **commit**.
3. **Send your commits to GitHub.** This is called **pushing a commit**, which means recording your changes in the shared project online.
4. **Make experimental copies of your project.** These are called **branches**, and they let you test ideas without affecting the main project.
5. **Ask for a team review.** You bundle your changes into a **pull request**, which lets others review and approve before merging.
6. **Integrate changes into the main project.** This step is called a **merge**.

## Key terms in simple language

* **Repository (Repo):** The main folder for a project.
* **Commit:** A saved snapshot of your work.
* **Push / Pushing a Commit:** Sending your commits (saved snapshots) from your computer to GitHub so they are recorded in the shared project online.
* **Branch:** A separate copy of the project where you can test changes safely.
* **Merge:** Combining changes from a branch into the main project.
* **Pull Request (PR):** A way to propose changes and get feedback before merging them.
* **Fork:** Your own copy of someone else’s project that you can edit independently.
* **Clone:** A copy of the project stored on your computer.
* **Remote vs. Local:** Local is the version on your computer. Remote is the version stored on GitHub.

## Why this matters in Bolt

Integrating your project with GitHub keeps you flexible. You can work in Bolt as long as you like, switch to your repository directly, and return to Bolt whenever you are ready.

It also lets you publish your site to other hosting services if you prefer not to use [Bolt’s built-in hosting](/cloud/hosting) or [Netlify](/integrations/netlify).

Since GitHub is the global standard, learning it aligns you with how teams everywhere manage projects, whether you're working in software, writing, design, or research.

## Try it yourself

Now that you've got a grasp on what GitHub is and why it matters, you can give it a try yourself by using our [GitHub integration guide](/integrations/git) to connect your Bolt project to your GitHub account.

## Keep learning

If you want to learn more about GitHub, see the following resources:

* [Getting started with your GitHub account](https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account): a roadmap for how to set up an individual GitHub account and start using it.
