> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/create/objects/formats.md).

# Formats

Everything in Anytype is an Object, however they can have a different format depending on how they are used.

* **Page** — A document-style experience for content.
* **View** — A database-style experience for multiple Objects.
* **Chat** — A message-style experience for communication.

## Page Format

This is the most common type of Object with an editor that's used to create all kinds of documents, such as Tasks, Movies, and Journals. Objects with a Page format follow a standard structure:

1. **Object Title Area** — Title, emoticon, cover image, description
2. **Object Header** — Properties in line or list style
3. **Object Body** — Content, blocks, inline links
4. **Object Discussion** — Comments, see [Discussions](/anytype/collaborate/discussions.md) for more

<div data-with-frame="true"><figure><img src="/files/8z3IAjnNDuGsYlya3I00" alt=""><figcaption></figcaption></figure></div>

#### Changing Settings

When viewing an Object, you can access the settings by clicking on the three dots button in the top right corner, and then clicking **Type settings**. These settings will apply to all Objects of that Type.

<div data-with-frame="true"><figure><img src="/files/nymK1EOUSTGcbJ3s4139" alt=""><figcaption></figcaption></figure></div>

#### Page Layouts

You can change how a Page is structured to suit your needs. A Page's layout is determined by the Type, where the same layout is applied to all objects of the same [Type](/anytype/organize/types.md). You can choose from:

<table><thead><tr><th width="201.328125">Page Layouts</th><th>Best For</th></tr></thead><tbody><tr><td><strong>Basic</strong></td><td>Standard document layout as the default</td></tr><tr><td><strong>Profile</strong></td><td>Adds an image to the title area—for people and companies</td></tr><tr><td><strong>Action</strong></td><td>Adds a checkbox to the title area—for tasks and action items</td></tr><tr><td><strong>Note</strong></td><td>Removes the need for a title—for quick notes and journals</td></tr></tbody></table>

#### Properties View

You can change how an Object's Properties are displayed. There are 'Line' and 'List' layouts. This setting will apply across all Objects of the same Type. Learn more in the [Properties section](/anytype/organize/properties.md#properties-in-the-object-header).

#### Page Width

You can change the default width of each Page to be 'full width', this is set in the [Type settings](/anytype/organize/types.md#editing-types). Alternatively, you can adjust the width of each Page individually by using the 'set layout width' button which can be found in the Object's title area. This can be set as a [Template](/anytype/organize/templates.md) as well.

<div data-with-frame="true"><figure><img src="/files/JlFRW7TfRwVyufxa6OUI" alt=""><figcaption></figcaption></figure></div>

## View Format

When viewing multiple objects together, this is the format that's used to keep things organized. This format is what you see when you're viewing [Types](/anytype/organize/types.md), [Queries](/anytype/organize/queries.md), and [Collections](/anytype/organize/collections.md).

<div data-with-frame="true"><figure><img src="/files/NRqPIhXkNopIg32oHkp4" alt=""><figcaption></figcaption></figure></div>

#### View Layouts

You can select from a variety of different layouts such as:

<table><thead><tr><th width="221.08203125">Type Layouts</th><th>Best For</th></tr></thead><tbody><tr><td><strong>List</strong></td><td>Simple vertical rows</td></tr><tr><td><strong>Grid</strong></td><td>Spreadsheet-like experience</td></tr><tr><td><strong>Calendar</strong></td><td>Date and time arrangement</td></tr><tr><td><strong>Kanban</strong></td><td>Grouping and project management</td></tr><tr><td><strong>Gallery</strong></td><td>Visual highlights</td></tr><tr><td><strong>Graph</strong></td><td>Inter-connected relationships</td></tr></tbody></table>

Unlike Page Layouts, you can have multiple View Layouts set for the same Type. To learn more, please see [Views](/anytype/organize/views.md) for more details.

## Chat Format

When you want to have conversations with others, this is the format that's used for messaging. It works just like most chat apps. You can send images, reference existing Objects in the space, share links, reply to messages, and have emoticon reactions.

There is only one standard Chat layout, which is the message stream.

<div data-with-frame="true"><figure><img src="/files/EnwPiJ7xfrHbEMKt4gwi" alt=""><figcaption></figcaption></figure></div>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/create/objects/formats.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
