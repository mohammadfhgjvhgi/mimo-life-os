> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Revert and restore your project with version history

> Lovable saves every change as a version automatically. Preview old versions of your project, revert to an earlier state, and bookmark stable versions.

Every change Lovable makes to your project creates a version automatically. There is no save button: version history is always complete and up to date, and you can go back to any earlier version at any time.

## Why version history matters

Version history is your safety net. If a change breaks something or takes the app in the wrong direction, you can preview an earlier version, revert to it, or go back to an earlier point and try a different instruction. Nothing gets lost along the way: all changes made after that point stay in the chat and can be reapplied anytime.

## Open version history

Open the History panel in either of two ways:

* Click the **History** toggle in the top bar of the editor.
* Click the **<Icon icon="plus" size={14} />** menu next to the message input and select **History**.

The panel has two tabs: **History**, which lists every version, and **Bookmarks**, which lists the versions you bookmarked.

## Work with a version

Click any version in the list to open it in a snapshot view, where you can look around that state of your app without changing anything. Use the **Back to latest** button in the top bar to return to your current version, or restore the snapshot from there.

Each version also has a row of actions:

* **More actions** menu:
  * **Open preview in new tab**: Look at that version full screen in its own browser tab.
  * **View code changes**: See exactly which files and lines that version changed, as a diff.
  * **Go to message in chat**: Jump to the conversation moment that produced the version, useful for remembering why a change happened.
* **Revert** (tooltip: **Revert to this version**): Restore your project to that version.
* **Bookmark** toggle: Save the version to the **Bookmarks** tab.

The version your users currently see shows a **Published** badge, which makes it easy to find the exact state that is live right now.

## Revert to an earlier version

Reverting restores your project to how it was at that version. It is not destructive to your chat: the conversation continues from where you are.

Clicking **Revert** asks you to confirm first, with the date of the version you're returning to. Confirm with **Revert**, or click **View in chat** to jump to the matching message before you decide.

<Warning>
  Reverting restores your project's **code only**, and redeploys your app's edge functions to match. It does not restore or roll back your **database data**. If messages after that version added records, changed data, or ran migrations against your data, reverting the code does not undo those data changes. Your chat history is preserved, and the edits made after that point stay in the chat, so you can reapply them anytime.
</Warning>

### Go back and try something different

If you want to return to an earlier point and take a different direction rather than just restore, edit a past message. Hover over one of your own messages, click **Edit message**, adjust the text, and confirm **Revert and resend**. Lovable reverts to that point and continues with your new instruction.

### When revert is unavailable

The **Revert** button is disabled when:

* You are already on that version.
* The project was remixed from a project on the [built-in backend (Cloud)](/features/cloud): versions from before the remix can't be restored.
* The version is very old. You can still open and preview it, but it can no longer be restored. The tooltip reads **Cannot revert this far back in history**.

## Bookmarks

Bookmarks let you mark the versions you care about, like a stable release or a design you want to return to, so you don't have to scroll through the full history to find them.

* Bookmark from chat: Select **Bookmark in history** on the activity card of a finished change.
* Bookmark from the History panel: Click the bookmark toggle on any version.

Bookmarks are kept per project and appear in the **Bookmarks** tab of the History panel.

<Tip>
  Bookmark a known-good version before starting a big change, like a redesign or a data model rework. If the change goes sideways, the version you want to return to is one click away instead of buried in history.
</Tip>

## FAQ

<AccordionGroup>
  <Accordion title="Can I revert only part of a version?">
    No. Revert is all or nothing per version: it restores the entire project to that state. If you only want to undo one specific change, ask Lovable in chat to restore that specific part:

    ```text wrap theme={null}
    Bring back the pricing section from before the redesign.
    ```
  </Accordion>

  <Accordion title="Does reverting refund the credits I spent?">
    No. Credits pay for the work Lovable performs, so messages you later revert still count. See [Credits and usage](/introduction/credits-and-usage).
  </Accordion>

  <Accordion title="How far back does version history go?">
    All versions are kept, and you can scroll back through your project's entire history. Very old versions can be opened and previewed but no longer restored. For those, the revert button shows **Cannot revert this far back in history**.
  </Accordion>

  <Accordion title="What happens to my database when I revert?">
    Nothing. Reverting only restores your project's code. Your database data stays exactly as it is, which also means reverting cannot undo data changes made after that version.
  </Accordion>
</AccordionGroup>
