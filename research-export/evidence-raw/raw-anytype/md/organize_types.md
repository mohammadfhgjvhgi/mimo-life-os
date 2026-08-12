> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/organize/types.md).

# Types

If an Object is a cookie, then the Type is the cookie cutter. It's a blueprint that defines what the Object is. Notes, Tasks, Books, People, Images—these are all Types. Imagine a cookie cutter helping you to apply a standardised shape to all of your Objects.

* **Tasks** will have a due date, priority, and status.
* **Books** will have a genre, author, and release date.
* **People** will have a phone, email, and relationship.

## Why it matters

1. **Finding what you need**: when you have hundreds of Objects, being able to search by Type is handy. "Show me all my Ideas." "Show me all my Recipes."
2. **Applying your standards**: Objects that belong together will share the same standard blueprint. All your Movies have a release date. All your Meetings have a transcript.
3. **Defining your relationships**: with Types on all Objects, you're able to clearly link between them. Your Books are linked to Authors. Your Tasks are linked to Projects.

## How it works

Every Object has one Type, which you apply on creation and can change at any time. Anytype comes with built-in Types, but you can create your own custom Types to match your needs. Every Type has:

* [Properties](/anytype/organize/properties.md) — adds definition, such as address, date created, and tags.
* [Views](/anytype/organize/views.md) — adds organisation, such as a calendar for all important events.
* [Templates](/anytype/organize/templates.md) — adds standards, such as all vacations having a photo album.

## Create Types

#### Sidebar

Both the Create Button and Channel Sidebar reveal the Types in your space. Click on the 'Create Type' buttons to add a new type to your Space.

Importantly, only Types that have at least one Object will display in the Sidebar. If the Type you're looking for is not in the Sidebar, add an Object to it and the Type will automatically display.

<div data-with-frame="true"><figure><img src="/files/POqw2ssJfd99c5bT0T3K" alt=""><figcaption></figcaption></figure></div>

#### Channel Settings

You can view all your Types in your [Channel Settings](/anytype/settings/channel-settings.md) under Content Model. Click on the 'New' button to add a new type to your Space.

Additionally, you can set the **Default Object Type** in the Channel Settings. This changes which Type is applied to your Object when clicking the Create button.

<div data-with-frame="true"><figure><img src="/files/tJHL9rBnvwzIWflb5OeW" alt=""><figcaption></figcaption></figure></div>

## Editing Types

To access the Type settings, there are three primary ways:

1. Navigate to the Type from the [Sidebar](/anytype/basics/sidebar.md) and click **Edit Type** on the top right-hand side.
2. When viewing an [Object](/anytype/create/objects.md), click on the 'three dots' button on the top right corner, and select the **Type settings** option.
3. Navigate to the [Channel Settings](/anytype/settings/channel-settings.md), click on **Object Types**, and select your desired Type.

<div data-with-frame="true"><figure><img src="/files/C4ximz3hMchnjRakK3tH" alt=""><figcaption></figcaption></figure></div>

In this panel, you can make various edits:

* Change the Type name and icon.
* Change the content width
* Add/remove Properties and Templates.
* Make edits to the Object Header.
* Edit the [Object layout](/anytype/create/objects/formats.md#page-format).

### Object Header

Every Object can display its Properties in the Object Header, which is the section below the title and above the content blocks. You can choose which Properties show in the header by dragging and dropping the properties into the 'Header' section.

If the desired property is not in the list, you can add it using the 'plus' button.

<div data-with-frame="true"><figure><img src="/files/jAW1nHFHcpizDldmROmo" alt=""><figcaption></figcaption></figure></div>

#### Header Layout Types

You can choose how your Properties are displayed in the Object Header. These can be found in the layout section under 'Properties view'.

1. Line—for a more minimal look
2. List—for displaying more structured information.

## Changing Types

You can change an Object's Type at any time. There are multiple ways:

* Navigate to the Type, right click on the Object, and click **Change type** from the menu.
* If the 'Object type' Property is in the Object's Header, select it and click **Change type** from the menu.

When changing Types, the Properties are retained on the Object. This means that you can change the Type back and forth without losing any of the Properties on your Objects.

<div data-with-frame="true"><figure><img src="/files/FHc9r2cwSC2icqs4YpSB" alt=""><figcaption></figcaption></figure></div>

#### Bulk-changing Types

If you want to change the Type for multiple Objects at the same time, it's best to use [Views](/anytype/organize/views.md). Please [see here](/anytype/organize/views.md#bulk-editing-objects) for more details.

## Deleting Types

To delete a Type, you can do so from the Sidebar, Channel Settings, or editor settings (three dots icon on the top right). This will move the Type to the Bin where it can be restored or permanently deleted.

If the Type still has Objects that are part of it, it will trigger a confirmation window where you can choose to delete or keep the Objects part of the Type.

<div data-with-frame="true"><figure><img src="/files/yiW1k4Un7IQqdjCsw4TO" alt=""><figcaption></figcaption></figure></div>

## Duplicating Types to other Channels

Types are specific to each Channel. If you want your Type to exist in other Spaces, please see [Import & Export](/anytype/data/import-and-export.md). At the moment, you cannot share Types between spaces that stay in sync because they are separated with different encryption keys.

## Tips

{% hint style="info" %}
**Keep it simple**. Creating too many Types usually leads to a complex system that becomes overwhelming. Start with the built-in Types and only add in more when you feel the need.
{% endhint %}

{% hint style="info" %}
**Use properties**. To fully take advantage of Types, add relevant properties to it. This way, you can sort and filter your Objects into useful Views. Imagine a Project Type with a Kanban view only showing your highest priority tasks.
{% endhint %}


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/organize/types.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
