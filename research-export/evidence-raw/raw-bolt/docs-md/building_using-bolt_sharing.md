> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Share your project

> Share your project, manage access, and invite collaborators.

Sharing lets you invite collaborators to your Bolt project and control the level of access they have. You can give collaborators view-only access, let them edit and prompt, or invite them to own the project with you.

Sharing is available on all plans.

Once you've invited collaborators, see Collaborate with others to learn about working together in real time and sharing integrations.

## Access by role

By default, you're the owner of any project you create. Assign collaborators a role that matches the level of access you want them to have. The Co-owner role is only available to other members of your team. If you're on a Teams plan and invite members outside your team, or if you're on a personal plan, only the Viewer and Editor roles are available.

| Permission                                        | Viewer | Editor | Co-owner |
| ------------------------------------------------- | ------ | ------ | -------- |
| Open the project                                  | ✓      | ✓      | ✓        |
| Duplicate the project                             | ✓      | ✓      | ✓        |
| View the preview and code                         | ✓      | ✓      | ✓        |
| View environment variables                        |        | ✓      | ✓        |
| Prompt and edit code                              |        | ✓      | ✓        |
| Invite users outside your team to collaborate     |        |        | ✓        |
| Publish the project and manage the published site |        |        | ✓        |

<Note>
  Environment variables are values your project uses to store sensitive information, like API keys and authentication tokens, without exposing them in your code. To keep your project secure, Bolt only allows Editors and Co-owners to view environment variables.

  If a project relies on environment variables, parts of it may not load or work as expected for Viewers, because there's no way to run the project in the browser while keeping those values hidden. In that case, Viewers see this message: `You have view-only access to this project. Environment variables aren't available in view-only mode, so some features may not work.`
</Note>

When collaborators prompt in a project, Bolt uses tokens from the prompter's account rather than from the project owner's.

## Share your project on a personal plan

On a personal plan, you can manage access separately for anyone with the link and for individual collaborators you invite.

### Share an invite link

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/v1773952576/individual-share-by-invite-link_cwqrbt.png" alt="Individual sharing menu with project access highlighted." />
</Frame>

1. In Bolt, open your project.
2. In the upper-right corner of the screen, click **Share**.
3. Under **Project Access**, set **Anyone with the link** to the level of access
   you want.

<Tip>
  Only set access to **Editor** if you want anyone with the link to be able to make changes to your project.
</Tip>

4. Click **Copy link**, then share the link with anyone you want to invite.

### Invite individual collaborators by email

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/v1773952575/individual-share-by-email_nxu7z8.png" alt="Individual sharing menu inviting an email address and pending email invite highlighted." />
</Frame>

1. In Bolt, open your project.
2. In the upper-right corner of the screen, click **Share**.
3. In the email field, enter the address of each collaborator you want to invite.
4. Set **Invite as** to the level of access you want to give them, then click
   **Send invite**.

The collaborator's status shows as `Pending` until they accept the invite.

## Share your project on a Teams plan

When you're part of a team, you can manage access separately for:

* Your entire team (options are No access, Viewer, Editor, or Co-owner)
* Individual members of your team (options are Viewer, Editor, or Co-owner)
* Invited collaborators who aren't members of your team (options are Viewer or Editor)
* Anyone else with the link (options are No access, Viewer, or Editor)

<Note>
  Inviting collaborators outside your team requires external sharing to be turned on in your team's workspace settings. If you're a team admin, you can manage this in your
  [Team settings](/settings/team-settings/#allow-members-to-invite-external-users-to-collaborate-on-projects).
</Note>

### Share an invite link

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/v1773951499/teams-share-invite-link_xz5k6s.png" alt="Teams sharing menu with project access highlighted." />
</Frame>

1. In Bolt, open your project.
2. In the upper-right corner of the screen, click **Share**.
3. Under **Project Access**, set the following permissions:
   * To define team access, find your team name, then select the level of access you want to give your team. Unless you change it, this is set to the [default member role](/settings/team-settings/#set-the-default-member-role) defined in your project settings, which is Viewer by default.
   * To define general access, set **Anyone else with the link** to the level of access you want to give other collaborators.

<Tip>
  Only set **Anyone else with the link** to **Editor** if you really want to let anyone with the link make changes to your project.
</Tip>

4. Click **Copy link**, then share the link with anyone you want to invite.

<Note>
  Team members are automatically assigned the access level you select in step 3. You don't need to send them the link.
</Note>

### Invite individual collaborators by email

Inviting collaborators by email lets you share with people outside your team or give specific team members a different access level than the rest of the team.

<Tip>
  To invite members outside your team, a team admin must have turned on **[External collaboration in teams projects](/settings/team-settings/#allow-members-to-invite-external-users-to-collaborate-on-projects)** in the team settings.
</Tip>

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/v1773951498/teams-share-by-email_ggcx93.png" alt="Teams sharing menu inviting an email address and pending email invite highlighted." />
</Frame>

1. In Bolt, open your project.
2. In the upper-right corner of the screen, click **Share**.
3. In the email field, enter the address of each collaborator you want to invite, or click **the team** to select from your team members.
4. Set **Invite as** to the level of access you want to give them, then click **Send invite**.

The collaborator's status shows as `Pending` until they accept the invite.

## How collaborators accept your invite

When you invite a collaborator to your project, they get an email that contains the project link.

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1779135641/project-invite-email_d9juqt.png" alt="Email invitation sent when you share a project with an Accept Invitation button." />
</Frame>

To see your project, collaborators must have a Bolt account and be signed in. If they don't have an account or aren't signed in, opening the invitation prompts them to create an account or sign in to their existing account.

After they sign in, they can see or interact with your project based on the [role](#access-by-role) you assigned them.

If they close the project, they can find it again by clicking **Shared with you** in the left navigation menu.

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784233749/shared-with-you_iwicpp.png" alt="Bolt homepage with Shared with you highlighted in the left navigation." />
</Frame>

## Resend an invitation or remove a collaborator

1. In the upper-right corner of your screen, click **Share**.
2. At the bottom of the menu, next to the collaborator you want to manage,
   select the menu that shows their current role (for example, **Editor**).
3. Do one of the following:
   * To resend a pending invitation, click **Resend invite**.
   * To remove their access, click **Remove**.

## Restrict access for collaborators

To change a collaborator's permissions or remove their access to your project:

1. In the upper-right corner of your screen, click **Share**.
2. Next to the collaborator you want to update, select the menu that shows their current role (for example, **Editor**).
3. Select the role you want them to have, or select **No access** to remove their access entirely.
