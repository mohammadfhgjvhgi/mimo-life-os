> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/collaborate/publish.md).

# Publish

**Web Publishing** lets you turn any Object into a public webpage at a URL anyone can visit. Pick an Object, click Publish, and Anytype generates a static HTML page hosted on your personal subdomain at `<your-id>.any.org/<slug>`.

This is for content you want **publicly readable** — blog posts, public profiles, documentation, meeting briefs, or anything you'd otherwise put on a personal website.

With Web Publishing, the Object you've already written is the published page. Update the Object, republish, and the public page updates. No second platform to maintain.

## Publishing an Object

1. Open the Object you want to publish.
2. Click **Share** in the top-right corner.
3. Review the **URL slug**.
4. Click **Publish**.

<div data-with-frame="true"><figure><img src="/files/OqHFVu56ezHyu9S4LI8i" alt=""><figcaption></figcaption></figure></div>

Within a few seconds, your Object is live at `<your-any-id>.any.org/<slug>`. Copy the URL or share directly from the dialog.

## Updating a published page

Edit the Object normally. Your edits don't auto-publish — you have to republish to push changes:

1. Open the Object.
2. Click **Share**.
3. Choose **Unpublish** or **Update**.

<div data-with-frame="true"><figure><img src="/files/8EBXo5OREmEDWlKIs5sM" alt=""><figcaption></figcaption></figure></div>

## Managing your published pages

**Vault Settings > My Sites** is the central management screen for everything you've published:

* See a list of every published Object with title, URL, last published date
* Click any URL to open the live page in a browser

<div data-with-frame="true"><figure><img src="/files/i2BSdFLRwwHztArD9pt4" alt=""><figcaption></figcaption></figure></div>

## What's supported and what isn't

Web Publishing is still in development.

#### Supported in published pages

* **All text formatting** — paragraphs, headings, lists, callouts, quotes
* **Images and image blocks** — included as part of the published page
* **Code blocks** with syntax highlighting
* **LaTeX math** — rendered as static MathML
* **Embeds** that work in static contexts — YouTube, Vimeo, Mermaid diagrams (rendered server-side), images
* **Custom Object icon and cover** — appears at the top of the page
* **Visible Properties** — chosen Properties appear in the page metadata or header
* **Toggle blocks** — collapsed by default in published view, expandable on click

#### Not yet supported

* **Linked Objects** — links to other Objects in your Channel point to a "page not published" placeholder unless those Objects are also published
* **Inline Queries and Collections** — these don't render in published pages
* **Chats and Discussions** — not exposed publicly
* **Multi-page sites** — you can publish many Objects but they're independent pages, not a connected site (multi-page is on the roadmap)
* **Custom themes or styling** — published pages use a default Anytype style
* **Custom domains** — published pages live on `<your-id>.any.org`; pointing a custom domain is on the roadmap

For multi-page sites, watch for updates in the Anytype changelog.

## Tips

{% hint style="warning" %}
**Don't publish Objects with sensitive Properties.** Properties like internal status, private notes, and personal information are uploaded too unless you exclude them in the publish dialog. Review what's visible before clicking Publish.
{% endhint %}

{% hint style="warning" %}
**Anyone with the URL can see a published page** — including web archivers, search engines, and screenshot tools. Treat the URL as effectively public, even if you don't share it widely.
{% endhint %}


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/collaborate/publish.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
