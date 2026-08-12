> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# GitHub for version control

> Connect a GitHub repository to back up your Bolt project, sync commits automatically, and work across branches.

<Tip>
  If you're new to version control and GitHub, start with the [Introduction to version history, version control, and GitHub](/concepts/version-history-github) to get familiar with the basics.
</Tip>

Connecting GitHub to Bolt lets you automatically back up your Bolt project with a full history of changes that lives outside Bolt.

This gives you flexibility in where you work on your project. You can build in Bolt, switch to working directly in GitHub, and then come back to Bolt whenever you want. And since your code lives in GitHub, you can publish your site using [Bolt hosting](/cloud/hosting), the [Netlify integration](/integrations/netlify), or another service you choose.

Connecting GitHub to Bolt has these benefits:

* **Handles Git automatically**: Bolt manages the technical Git steps for you.
* **Keeps branches separate**: Each branch has its own memory, so nothing bleeds over between them.
* **Gives you control**: You decide which projects connect to GitHub.
* **For [GitHub orgs](/integrations/github-org), gives admins control**: Admins can decide which organization repos are available to which organization accounts.

You can bring an existing GitHub project into Bolt, or start building in Bolt and create a new GitHub repository for your project.

<Note>
  Bolt also offers a [GitHub MCP connector](/building/using-bolt/connect-mcp) for tasks like searching code, pulling in issues, and reviewing discussions. Use the GitHub integration described in this article to keep your project's code synced with a repository. Use the MCP connector for other GitHub workflows that don't involve syncing commits.
</Note>

For an introduction to version control and GitHub with Bolt, watch the video below:

<Frame>
  <iframe width="700" height="394" src="https://www.youtube.com/embed/22cixPj2EUs?si=z4-UJfYs3-VbrSLx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
</Frame>

## Prerequisites

To connect your GitHub account to Bolt, you need an **individual** GitHub account. Before starting, [sign up for a GitHub account](https://github.com/signup) if you don't already have one.

<Note>
  If your GitHub organization is connected to Bolt, you can access organization repositories through your org instead. See [GitHub organization setup](/integrations/github-org) for details.
</Note>

## Connect GitHub

To connect an individual GitHub account to Bolt:

1. Sign in to Bolt and open a project.

2. In the top-right corner of the screen, click the **GitHub icon**.

3. Click **Log in to GitHub**.

4. When prompted to let StackBlitz (Bolt's parent company) access your GitHub account, click **Authorize**.

5. Click **Install the GitHub App**.

6. Select whether Bolt can access **All repositories** or **Only select repositories**.

   The Install & Authorize Bolt.new (by StackBlitz) page opens.

7. Click **Install & Authorize** to confirm, then follow the on-screen instructions to enter your credentials.

### Change repository access

If you want Bolt to access additional repositories, or remove access to ones it no longer needs, you can update this at any time. You don't need to be an organization admin to do this for your own account.

1. In Bolt, open a project connected to GitHub.

2. In the top-right corner of the screen, click the **GitHub icon**.

3. Click **Configure the GitHub App**.

   The Install & Authorize Bolt.new (by StackBlitz) page opens.

4. Update your repository access, then click **Save**.

## Create a new repository from a Bolt project

1. Open the project you want to link with a new GitHub repository.

2. In the top-right corner of the screen, click the **GitHub icon**.

   The Create a repository page opens.

3. Enter a name for your new repository.

4. Click **Create repository**.

5. Click **Start building** to return to Bolt.

The repository starts as private, on a `main` branch. You can set the repository to public in your GitHub settings, and you can create new branches in Bolt or on GitHub. To learn more, see [Branching and merging](#branching-and-merging).

## Import an existing repository

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784822021/import-github-repo_ddwtsg.png" alt="The Bolt homepage with the GitHub icon highlighted below the chatbox." />
</Frame>

1. On the Bolt homepage, below the chatbox, click **GitHub**, then log in to your GitHub account.
2. Choose how you want to import:
   * Use the drop-down menu to select the repository.
   * Click **Import from URL**, then enter your GitHub repository URL.
3. Click **Choose this repository**.

   Bolt loads your repository as a new Bolt project.

## Branching and merging

When working with a shared GitHub repository, it's a good habit to create a new branch for your changes rather than committing directly to the `main` branch. This helps keep work isolated, reduces the chance of merge conflicts, and makes it easier to review and collaborate on changes. You can create a branch from the default branch and then open a pull request when your changes are ready to be merged.

When you create or import a repository in Bolt, you'll start on the **main** branch. This is usually the live version of your project. You can do all your work on main, or create branches.

Branches allow you to:

* Work with others without overwriting each other's changes.
* Work on different features separately, so unfinished work doesn't go live.

  <Info>
    For example, if you're building three new features on the main branch, you'd have to finish all three before publishing. With branches, you can finish and merge each one into main as they're ready.
  </Info>

### Create a new branch in Bolt

1. Open a project that's already linked to a GitHub repository.

2. In the top-right corner of the screen, click the **GitHub icon**.

   <Frame>
     <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784822021/github-create-branch_fu3amv.png" alt="The Bolt preview panel with the GitHub icon highlighted in the top menu, and the GitHub menu highlighting Create branch." />
   </Frame>

3. Click **Create new branch**, then enter a branch name.

4. Click **Create branch**.

<Check>
  You're now working on your new branch, which is also created in your GitHub repository.
</Check>

### Change branches in Bolt

1. Open a project that's already linked to a GitHub repository.
2. In the top-right corner of the screen, click the **GitHub icon**.
3. Select the branch you want to switch to.

<Tip>
  Bolt currently doesn't support merging branches in-app. You need to merge branches in GitHub.
</Tip>

### Committing and fetching

Bolt saves your work automatically. Every time you make a change that doesn't break the project, Bolt creates a commit for you.

It also checks GitHub every 30 seconds for any updates made outside Bolt and pulls those in.

<Warning>
  Very rarely, both Bolt and GitHub might update at almost the same time. If that happens, Bolt keeps your changes and overwrites the GitHub version.
</Warning>

## Connect to a GitHub organization

Bolt supports working with GitHub organizations, which allow teams to install the Bolt app at the organizational level and choose which repositories are visible to members inside Bolt.

To learn more, see [GitHub organization setup](/integrations/github-org).

## Collaborate on projects connected to GitHub

Only the project owner can connect and manage the GitHub integration. If you're a collaborator on a shared project, the GitHub icon isn't available to you, and changes you make sync to GitHub the next time the project owner opens the project.

To learn more about how integrations work in shared projects, see [Collaborate with others](/building/using-bolt/collaborate).

## Troubleshoot GitHub sync issues

In your own projects, Bolt syncs to GitHub every time you make a change. If collaborators edit your project, their changes sync the next time you open the project.

If your changes don't sync to GitHub as expected, reauthorizing the GitHub app can help refresh the connection and get your sync working again.

To reauthorize your GitHub connection:

1. On the Bolt homepage, below the chatbox, click the **GitHub** option.

2. In the Import a repository dialog, click **Configure the GitHub App**.

   The Install Bolt.new (by StackBlitz) page opens.

3. Select your GitHub account.

   The Install & Authorize Bolt.new (by StackBlitz) page opens.

4. Click **Install & Authorize**, then follow the on-screen instructions to enter your credentials.

   When GitHub finishes verifying your credentials, you're returned to Bolt, and your connection is refreshed.

## Disconnect a project

Disconnecting a project permanently removes its connection to the GitHub repository. The project no longer syncs to GitHub, and you can't manually reconnect it.

To disconnect a project:

1. Open a project that's already linked to a GitHub repository.
2. In the top-right corner of the screen, click the **GitHub icon**.
3. Click **Disconnect project**, then click **Disconnect** to confirm.

Your project is no longer connected to GitHub. Going forward, use Bolt's [Version history](/building/using-bolt/rollback-backup#understanding-backups-restoring-and-version-history) to view or restore a previous version of your project.

<Info>
  If you need to reconnect the project to the same GitHub repository, [contact support](/troubleshooting/contact-support).
</Info>

## Disconnect GitHub

Fully removing your GitHub integration is a one-step process if you used your GitHub account to create your Bolt account, or a two-step process if you didn't.

Either way, start by following the steps below:

<Steps>
  <Step title="Revoke access in GitHub">
    1. Log in to [GitHub](https://github.com/login).
    2. In the top-right corner of the screen, click your **profile icon**.
    3. Click **Settings**.
    4. In the left-side navigation menu (near the bottom), click **Applications**.
    5. Click the **Authorized GitHub Apps** tab.
    6. In the Bolt/StackBlitz row, click **Revoke**.
    7. Click **I understand, revoke access**.

    <Note>
      If you signed up for your StackBlitz/Bolt account using Google or your email address, continue to part 2 to complete the process. If you signed up using GitHub, your GitHub integration is now removed.
    </Note>
  </Step>

  <Step title="Delete the GitHub connection in StackBlitz">
    1. Log in to [StackBlitz](https://stackblitz.com/).
    2. In the left navigation menu, click **Settings**.
    3. Click the **Credentials** tab.
    4. In the GitHub section, click **Delete**.

    <Tip>
      If you added a second email to your account specifically for GitHub, you can go to **Settings** > **Profile** to delete it from your account.
    </Tip>
  </Step>
</Steps>
