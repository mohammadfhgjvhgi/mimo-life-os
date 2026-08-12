> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/basics/sidebar.md).

# Sidebar

The Sidebar is the main navigation tool to move around Anytype.

1. **Vault Sidebar** — to move between all channels in your Vault.
2. **Channel Sidebar** — to create, navigate, and organize everything in your Channel.

<div data-with-frame="true"><figure><img src="/files/WYmVv2HHnAhzWEPRh9oI" alt=""><figcaption></figcaption></figure></div>

## Vault Sidebar

On the left is the Vault Sidebar. Here you can navigate at the highest level across all the various spaces you are part of. You will find:

1. [Channel List](/anytype/basics/channels.md) — all of the spaces you are part of
2. [Vault Settings](/anytype/settings/vault-settings.md) — ability to manage your account
3. [Keyboard Shortcuts](/anytype/settings/keyboard-shortcuts.md) — to customize your shortcuts
4. Resources — contact, release notes, version, etc.

<div data-with-frame="true"><figure><img src="/files/E7L6j7RM4cXe3t1eF6TV" alt=""><figcaption></figcaption></figure></div>

## Channel Sidebar

The second panel is the Channel Sidebar. Here you can find everything that is inside your space. It is split into two areas, the Header and the Sections.

#### Header

At the very top, you'll see your Channel name and icon. You'll also find:

* **Create** — button to instantly add a new Object. The dropdown button reveals more options.
* **Search** — button to find any Object in this Channel.
* **Members** — button to see who's in the Channel and their roles.
* **Channel Menu** — access Channel Settings and manage sections in your sidebar.

#### Sections

Below the header are sections, which appear in this order by default:

1. **Pins** — Objects for everyone, set by the channel Owner.
2. **Favorites** — Objects for only you, set by you.
3. **Unread** — Notifications that display temporarily.
4. **Recently Edited** — Objects modified recently.
5. **Types** — Objects grouped by Type.
6. **Bin** — Objects archived that await permanent deletion.

Each section can be hidden, reordered, or fine-tuned. See [Widgets](/anytype/basics/sidebar/widgets.md) and [Sections](/anytype/basics/sidebar/sections.md) for details.

<div data-with-frame="true"><figure><img src="/files/sYxgKCPvFVVEf1cSkdez" alt=""><figcaption></figcaption></figure></div>

## Sidebar Settings

### Resize and Collapse

Drag the right edge of the Sidebar to resize it. You can:

* Make it wider for more space
* Make it narrower to save space
* Collapse it entirely by dragging the edge to the left until it disappears
* Turn on auto show/hide the sidebar in your [Vault Settings](/anytype/settings/vault-settings.md)

<div data-with-frame="true"><figure><img src="/files/UW5CaZmGMw6esXsTkDy5" alt=""><figcaption></figcaption></figure></div>

### Compact Vault Sidebar

To gain more visual space, the **Vault** has a compact mode. This narrow and compact Vault layout helps to provide more content space. The Channel sidebar can also be resized for even more room.

Drag the Vault's right edge to make it narrower past a threshold and it'll automatically switch to compact mode. Drag the edge wider to return to the regular Vault Sidebar layout.

<div data-with-frame="true"><figure><img src="/files/8SFRdwMN1FMF4AkLm65s" alt=""><figcaption></figcaption></figure></div>

### Focus Mode

To quickly switch to a focus mode, you can assign a keyboard shortcut to toggle on and off the **Vault** and **Channel Sidebar** at the same time. This hides both sidebars for maximum content space.

1. Click `?` button in the bottom-left corner of the app in the Vault Sidebar,
2. Choose **Keyboard shortcuts**.
3. Find **Toggle Vault & Channel Sidebar**.
4. Assign a shortcut.

<div data-with-frame="true"><figure><img src="/files/oFxyWbNuUzafHv4Bi5wg" alt=""><figcaption></figcaption></figure></div>

## Tips

{% hint style="info" %}
**Focus Mode with Tabs is handy for removing distractions from other channels.** When you're deep in work, hide both sidebars so you don't get distracted by other Channels and their notification badges. You can set up a custom keyboard shortcut to make this even faster.
{% endhint %}

{% hint style="info" %}
**Pin a Query, not just static Objects.** A pinned Query like "Tasks where Status = In Progress" or "Notes where Modified is this week" acts as live [Widgets](/anytype/basics/sidebar/widgets.md) — it updates itself as your data changes.
{% endhint %}

{% hint style="info" %}
**Switch to Links mode for archive Channels.** A Channel where you mostly read rather than create can benefit from the denser Links view — you see more at once.
{% endhint %}


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/basics/sidebar.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
