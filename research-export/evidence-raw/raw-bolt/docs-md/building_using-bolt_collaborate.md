> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Collaborate with others

> Invite collaborators to your project or site, work together in real time, and share integrations across your team.

Bolt lets you invite collaborators to your project at any stage, whether you're still building, ready for review, or preparing to make your site public. You can:

* [Invite collaborators](#invite-collaborators-to-your-project-or-site) and manage their access
* Find and access shared projects from the [projects dashboard](#use-the-projects-dashboard)
* [Work together in real time](#work-together-in-real-time) using multiplayer mode
* [Share integrations](#share-integrations) like databases and GitHub

## Invite collaborators to your project or site

You can invite collaborators using the **Share** or **Publish** button in the upper-right corner of your Bolt project. Which button you use depends on whether you're sharing your project or your published site, because these are two different things in Bolt.

* **Project**: The workspace where you build with Bolt. This is where your files, code, and development environment live. When you chat with Bolt, it automatically updates your project and displays the most recent version in the preview window.
* **Site**: The hosted version of your project that people can visit on the web. Your project becomes a site when you [publish it](/cloud/hosting/publish) to a live web address. However, publishing doesn't necessarily mean your site is fully public. You can publish your site as private to restrict access only to collaborators you invite. After publishing, updates you make in your project don't automatically appear on your site. You have to update your site from the **Publish** menu any time you want to make changes live.

[Sharing](/building/using-bolt/sharing) lets you manage who can access your project. [Publishing](/cloud/hosting/publish) lets you manage who can access your site.

In both cases, you can invite users and control the level of access they have. Sharing and publishing are available on all plans.

| Option  | Accessible to                                                                                    | Best use                         |
| :------ | :----------------------------------------------------------------------------------------------- | :------------------------------- |
| Project | <ul><li>Users you invite</li><li>Team members have automatic access (Teams plans)</li></ul>      | Design, development, and testing |
| Site    | <ul><li>Anyone on the web (public sites)</li><li>Only users you invite (private sites)</li></ul> | Review and launch readiness      |

## Use the projects dashboard

The projects dashboard on the Bolt homepage gives you a quick view of projects you created and projects that were shared with you, all in one place. From the dashboard, you can favorite projects for easy access, and rename or transfer them without opening them first.

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1776806171/projects-dashboard_ochisr.png" alt="The projects dashboard showing several projects favorited and the context menu open with the open, rename, transfer, and delete options showing." />
</Frame>

<Info>
  Project thumbnail images generate when you prompt Bolt. If you don't see a thumbnail for a project, it will appear the next time you prompt Bolt in that project.
</Info>

## Work together in real time

When your project visibility is set to public, collaborators can work together in multiplayer mode. This lets you prompt and edit in the same project at the same time. Every project has a single shared chat thread.

To prevent conflicting edits, Bolt processes one prompt at a time. Other collaborators can't submit prompts while Bolt is processing an update, but you can see when someone else is typing, so you know when to wait.

When collaborators prompt in a project, Bolt uses tokens from the prompter's account rather than from the project owner's.

## Share integrations

Shared projects give collaborators access to the project's data, but control over certain integrations stays with the project owner.

If your project has a [database](/cloud/database), collaborators can view the same data and make changes to the structure. Any collaborator can bring designs into Bolt using [Figma](/integrations/figma) or [Google Stitch](/integrations/google-stitch). If you're on a paid team plan, your team members can add and use [design systems](/building/design-system/introduction).

The [GitHub integration](/integrations/git) works differently. Only the project owner can connect and manage it, so if you're a collaborator, the GitHub button isn't available to you. When you make changes to the project, Bolt doesn't automatically push them to the repository. Instead, your changes sync to GitHub the next time the project owner opens the project. This ensures changes aren't pushed to the repository before the owner has a chance to see them. If the project owner isn't online while you're working in the project, you may see this message: `This project is linked to a private GitHub repo owned by the creator. Your changes won't sync to GitHub until the creator returns to the project.`

Similarly, only the project owner can [connect MCP servers](/building/using-bolt/connect-mcp) and prompt Bolt to use those connectors.
