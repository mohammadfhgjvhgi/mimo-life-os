> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/basics/overview.md).

# Overview

Here is a quick map of Anytype. Understanding these core concepts will make everything else click.

<div data-with-frame="true"><figure><img src="/files/djQRoJVMXP9OyYioAFpN" alt=""><figcaption></figcaption></figure></div>

## 1. Vault

**This is your house.** Your [Vault](/anytype/basics/vault.md) is essentially your account. It is a container for everything you create and is protected by end-to-end encryption. The only way to access your content is with your [Key](/anytype/basics/key.md), nobody should have access to this.

## 2. Channels

**The rooms in your house.** [Channels](/anytype/basics/channels.md) are where all the work happens. Also known as Spaces, you can create as many as you like. Because Spaces are isolated from one another, they are ideal for separating different areas of your life, such as Personal, Family, or Work. You can keep them private or invite others to join shared ones.

## 3. Objects

**The stuff in your rooms.** In most apps, 'the stuff' consists of files organized into a folder hierarchy. In Anytype, we have [Objects](/anytype/create/objects.md). A recipe is an object, a meeting note is an object, and a photo is an object. Instead of items buried deep in folders, Objects float in like stars in space that are connected by links. Think of documents and files in Anytype as a network rather than a hierarchical folder tree.

## 4. Types

**The furniture holding your stuff.** [Types](/anytype/organize/types.md) give your Objects categories and prevent your Space from becoming a disorganized mess. Every Object is categorized into a Type, such as a Note, Task, Person, or Book. Even images, videos, and files are their own Type. This makes it easy to find and organize everything in your space.

## 5. Properties

**The labels on your stuff.** [Properties](/anytype/organize/properties.md) allow you to more deeply define your Objects. For example:

* For a task, the Properties might be 'Due Date' and 'Priority.'
* For a person, the Properties might be 'Birthday' and 'Email.'

These little details help you describe your Objects and link them together—such as connecting a book to its movie adaptation, or a meeting to a specific project.

## 6. Views

**The magic.** As your Space grows, you need tools to find, organize, and visualize your Objects. Anytype uses [Views](/anytype/organize/views.md) to do this:

* Put all your events in a 'Calendar layout' only showing those 'coming up next.'
* Display all your artwork in a 'Gallery layout' filtered by your 'favorites.'
* Have all your tasks in a 'Kanban layout' grouped by 'assignee.'

You can customize Views to suit your exact needs and have as many as you like. Additionally, every View can be turned into [Widgets](/anytype/basics/sidebar/widgets.md) for quick access in your sidebar.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/basics/overview.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
