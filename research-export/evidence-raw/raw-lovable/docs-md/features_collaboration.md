> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Collaboration

> Invite teammates to projects or workspaces, assign roles and permissions, and see changes in real time as you build together.

Lovable lets you build websites together. Invite your designer, developer, agency, or anyone else. Everyone sees changes as they happen.

There are two ways of collaborating. You can invite collaborators to a specific project or to your entire workspace.

## Collaboration in a specific project

You can invite users to work together on a specific project by pressing **Share** in the project editor. Add their email, and they'll receive an invite to their email. See [Share a project](/features/share-project) for more information.

<Note>
  Collaborators will use credits from the project owner's workspace.
</Note>

### Check your role on a project

To see your role on a project, open the project and click **Share**. The **Project access** section lists everyone with access, including you, with the current role shown next to each name.

To see your role in a workspace, go to **Settings → People**. Your role appears next to your name in the members list.

### Project permissions

Please note that free plans do not have admin roles. Some of the features presented might be available on specific plans only.

Project roles are managed from the **Share** menu in the editor. See [project roles](/features/projects/overview#project-roles) for how they interact with workspace roles.

|                         | **Viewer**      | **Editor**           | **Admin**            | **Owner**            |
| ----------------------- | --------------- | -------------------- | -------------------- | -------------------- |
| **Project access**      |                 |                      |                      |                      |
| Magic Link              | **Yes**         | **Yes**              | **Yes**              | **Yes**              |
| Add Viewer              | **Yes**         | **Yes**              | **Yes**              | **Yes**              |
| Remove Viewer           | **Yes**         | **Yes**              | **Yes**              | **Yes**              |
| Add Editor              | No              | **Yes**              | **Yes**              | **Yes**              |
| Remove Editor           | No              | **Yes**              | **Yes**              | **Yes**              |
| Add Admin               | No              | No                   | **Yes**              | **Yes**              |
| Remove Admin            | No              | No                   | **Yes**              | **Yes**              |
| **Project management**  |                 |                      |                      |                      |
| Remix project           | **Yes**         | **Yes**              | **Yes**              | **Yes**              |
| Add Custom domain       | No              | **Yes**              | **Yes**              | **Yes**              |
| Edit project            | No              | **Yes**              | **Yes**              | **Yes**              |
| Remove Lovable badge    | No              | **Yes**              | **Yes**              | **Yes**              |
| Change project access   | No              | **Yes**              | **Yes**              | **Yes**              |
| Manage GitHub           | No              | **Yes**              | **Yes**              | **Yes**              |
| Publish<sup>\*</sup>    | No<sup>\*</sup> | **Yes**<sup>\*</sup> | **Yes**<sup>\*</sup> | **Yes**<sup>\*</sup> |
| Manage project settings | No              | **Yes**              | **Yes**              | **Yes**              |
| Disconnect Supabase     | No              | No                   | **Yes**              | **Yes**              |
| Transfer project        | No              | No                   | No                   | **Yes**              |
| Delete project          | No              | No                   | No                   | **Yes**              |

<sup>\*</sup>By default, editors and above can publish projects on all plans.

* On Business and Enterprise plans, this includes both publishing internally to the workspace and publishing externally to the web.
* On **Enterprise** plans, workspace admins and owners can go to **Workspace settings → Privacy & security → Who can publish externally** to restrict **external publishing** to:
  * Admins & owners
  * Owners only

<Note>
  If a project uses a connection with restricted access, only people with access to that connection can be viewers or editors in the project. Learn more about [Who can use connections and clients](/integrations/admin-controls#who-can-use-connections-and-clients).
</Note>

## Collaboration in a workspace

### What is a workspace?

A workspace is your shared space for building and collaborating on projects. You can invite as many teammates as you need into your workspace, and they can see, edit, and publish the workspace's projects (unless a project's access is [restricted](/features/project-visibility)). Each member can also create and work on as many of their own projects as they want.

<Warning>
  For granular permission control and role assignment in your workspace, a paid subscription is needed.
</Warning>

When you subscribe to a plan, it gets tied to your desired workspace, and all projects in the workspace share the workspace's credits, no matter who sends the messages. See [Workspace basics](/features/workspace#workspace-basics) for the key rules.

You can customize your workspace in the workspace settings by:

* Renaming it
* Changing the avatar
* Writing a description

See [Lovable workspace](/features/workspace) and [Workspace admin settings](/features/workspace-admin-settings) for more information.

### How do I add and manage collaborators in a workspace?

You manage and add collaborators from the People tab in the workspace settings. You can access it by going to **Settings** > **People**.

Here you can:

* Add new collaborators by inputting their email. They'll receive an invite to their email that they then can accept.
* Manage existing collaborators by changing their roles or removing them.
* Manage monthly credits usage for each collaborator

See [People](/features/people) for more information.

### Workspace permissions

Please note that free plans do not have admin roles.

|                                    | **Viewer** | **Editor** | **Admin** | **Owner** |
| :--------------------------------- | :--------- | :--------- | :-------- | :-------- |
| **Workspace access**               |            |            |           |           |
| Add Viewer                         | **Yes**    | **Yes**    | **Yes**   | **Yes**   |
| Remove Viewer                      | **Yes**    | **Yes**    | **Yes**   | **Yes**   |
| Add Editor                         | No         | **Yes**    | **Yes**   | **Yes**   |
| Remove Editor                      | No         | **Yes**    | **Yes**   | **Yes**   |
| Add Admin                          | No         | No         | **Yes**   | **Yes**   |
| Remove Admin                       | No         | No         | **Yes**   | **Yes**   |
| Add Owner                          | No         | No         | No        | **Yes**   |
| Remove Owner                       | No         | No         | No        | **Yes**   |
| **Workspace management**           |            |            |           |           |
| View members                       | **Yes**    | **Yes**    | **Yes**   | **Yes**   |
| Create new projects in a workspace | No         | **Yes**    | **Yes**   | **Yes**   |
| Manage Supabase                    | No         | **Yes**    | **Yes**   | **Yes**   |
| View usage                         | No         | No         | **Yes**   | **Yes**   |
| Manage plans & billing             | No         | No         | **Yes**   | **Yes**   |
| Manage SSO (Business plan)         | No         | No         | **Yes**   | **Yes**   |
| Manage Integrations                | No         | No         | **Yes**   | **Yes**   |
