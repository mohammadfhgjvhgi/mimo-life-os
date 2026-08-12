> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Backups, restore, and version history

> Restore a previous point in your project and manage backups using version history in the chat.

When you’re building, you may try a change and realize the previous version worked better for your project. For example, maybe you switched a project’s color scheme and later wanted the old one back.

Bolt backs up your projects in multiple ways and gives you different options for how to view version history and restore backups.

## Understanding backups, restoring, and version history

Backups, restoring, and version history all work together to keep your projects safe and flexible.

* **Backups** are saved copies of your project, created automatically or manually, so you always have something to fall back on.
* **Version history** (which you can see using the **View history** button) is a timeline of changes, letting you see how your project has evolved and pick out the exact point you want to return to.
* **Restoring** is the act of bringing back one of those saved states, whether it comes from your history, a dated backup in Project settings, or a manual download.

Having multiple backups and an easy way to switch between them means you can experiment without worrying about losing your progress. You can try out new ideas freely, knowing you can return to an earlier version at any time.

## Ways to restore your projects

Bolt gives you flexibility with multiple backup methods. Here are the different ways you can bring a project back to an earlier state:

* **Version history** (✅ Recommended) – Browse, preview, label, and restore older versions of your project automatically saved by Bolt using the **View history** button.
* **Chat history** – Scroll through the chat history and click the version you want to restore.
* **Manual Backups** – Download a local copy of your project and restore it through your StackBlitz account.
* **GitHub Integration** – Manage versioning through GitHub repositories.

## Restore using version history

<Tip>
  This is our recommended method of restoring your projects from backup.
</Tip>

You can see a clear visual timeline of your backups and edit their names for clarity. You can also preview a backup before restoring it to make sure it’s the one you want.

To restore a backup using version history, follow the steps below:

<Frame>
  <img className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/image/upload/f_auto,q_auto/v1784056520/version-history-button_iy5kxq.png" alt="The version history button in Bolt highlighted and the version history panel open." />
</Frame>

1. Open a project that you’ve made changes in.

2. In the top menu, click **Version history** (clock icon).

3. In the Version history list, click the version you want to restore.

   Bolt loads a preview of that version.

4. In the top-right of your screen, click **Restore this version**, then click **Restore version** to confirm.

<Check>
  After following these steps, you should see a success message in the chat history telling you that the version you selected has been restored.
</Check>

### Change a backup name in version history

Version history lets you change the auto-generated name of a backup so it's easier to recognize. To change a backup name:

1. Open a project that you’ve made changes in.
2. In the top menu, click **Version history** (clock icon).
3. In the Version history list, hover over a version, then click **Change name** (pencil icon).
4. Enter a new name, then press ENTER or click the down arrow to save.

### Bookmark a backup in version history

Version history also lets you bookmark backups so you can quickly find important versions later. To bookmark a backup:

1. Open a project that you’ve made changes in.
2. In the top menu, click **Version history** (clock icon).
3. In the Version history list, hover over a version, then click **Bookmark**.

<Check>
  You’ll now see that version listed in the Bookmarked Versions section of Version history.
</Check>

### Version history and database restores

Restoring to an earlier project version will not change your current Bolt or Supabase databases.

## Restore using your chat history

Version history gives you a quick overview of your backups so you can easily pick the right one without mixing them up. However, if you already know which backup you want and it’s recent, you may find it easier to restore directly from the chat.

To restore from chat, follow the steps below:

1. Scroll up in your chat history and find the version you want to restore.

   <img src="https://mintcdn.com/stackblitz/nD_bu5OTD145SDba/images/restore-chat.png?fit=max&auto=format&n=nD_bu5OTD145SDba&q=85&s=72013e38766da103127336dbb4795e65" alt="The restore button in the Bolt chat panel" width="1777" height="961" data-path="images/restore-chat.png" />
2. Click the **eye icon** to preview the version.
3. Click the **return arrow icon** when you're sure it's the version you want to restore.
4. Click **Restore version** to confirm.

## Export a local copy of your project

You can download a copy of your site to use locally or to restore it in Bolt later.

Follow these steps to export your project:

<img src="https://mintcdn.com/stackblitz/kES7OS7KYvbBVIun/images/export-download.png?fit=max&auto=format&n=kES7OS7KYvbBVIun&q=85&s=0dc95cf39ecfe386e88131e8a7797317" alt="The export and download option in Bolt" width="1777" height="960" data-path="images/export-download.png" />

1. Log in to your Bolt project.
2. In the top left of your screen, click the **project title**, then click **Export > Download**.

This downloads a zipped folder of your project files. You can later use this file to manually restore your project by following the steps in the next section.

## Restore from a downloaded copy

You can create a new project from a downloaded copy of your Bolt project using your StackBlitz account by following the steps below:

1. Log in to your [StackBlitz](https://stackblitz.com/) account.
2. Create a new empty project:
   1. In your StackBlitz account, go to **Projects**.
   2. Click **+ New**.
   3. Create a new project. It doesn't matter what type you choose, as you'll delete the contents.
3. Delete all the files in the project.
4. On your computer, unzip the downloaded copy of your Bolt project.
5. Drag and drop the files from your download into the StackBlitz IDE.
6. Click **Save**.
7. Click **Open in bolt.new | AI** to open the new project in Bolt.

## Restore from GitHub

If you're using the GitHub integration, you can follow the steps to [Import an existing repository](/integrations/git/#import-an-existing-repository). This creates a new Bolt project using the files from your GitHub repository.
