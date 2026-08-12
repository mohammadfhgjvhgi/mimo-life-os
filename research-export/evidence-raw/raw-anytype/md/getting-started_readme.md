> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/getting-started/readme.md).

# Welcome

Anytype is a safe haven for your digital life. We believe your thoughts, plans, and private conversations should belong to you—and only you.

Most apps store your data to view, scan, monetize, and control it. You're essentially asking for permission to access your own digital life. Anytype puts you back in charge. We’ve built a tool where you are the sole owner of your digital world.

<div data-with-frame="true"><figure><img src="/files/7M4VJYKIu3z6sWu6wq1d" alt=""><figcaption></figcaption></figure></div>

## What makes Anytype different?

* **Local-First**: Everything you create lives on your device first, not on a corporate server. You can work completely offline, sync across your own devices, or self-host your data. Whether you’re on a remote mountain or in a high-security office, you remain in control.
* **End-to-End Encryption**: Your data is protected by a digital vault where it is scrambled into a secret code. Only you, and the people you explicitly choose to share with, can access the information. Nobody, not even the team at Anytype, can see what you’re working on.
* **No Lock-In**: You are never a hostage to a subscription or a service provider. You have access to your data and the Anytype software forever. Because you aren't dependent on any vendor, nobody can ever switch off your access to your own digital life—not even us.

## Quick Overview

In this short video, you will gain an overview of Anytype and how to get started.

{% embed url="<https://www.youtube.com/watch?v=DpPEl8VTPjg>" %}

## How does Anytype work?

Anytype lets you create different spaces for your work and personal life. Because each space is kept isolated, you never have to worry about your information being shared with the wrong people.

* **Personal Spaces**: A private sanctuary for your eyes only. Use these to organize your diary, manage to-do lists, and store important documents.
* **Collaborative Spaces**: Shared environments where you can work seamlessly with family, project teams, or entire communities. Chats and discussions live directly inside your spaces, allowing you to hold private conversations right alongside your documents, tasks, and media.

## What powers Anytype?

Anytype is powered by [AnySync](https://tech.anytype.io/any-sync/overview), which is an [open-source protocol](https://github.com/anyproto) we developed that supports high-performant collaboration over encrypted data and is offline-first. With every architectural choice, we aim to make [fundamental digital freedoms](https://youtu.be/6Hyr881Xi8A?si=tVftb8x9V5koMt0U) unconditional. Here you can read more of our thoughts on [cloud vs. local first internet](https://blog.anytype.io/from-cloud-to-local-first/).

***

## Join the Community

Have questions or ideas? Join our [Community Forum](https://community.anytype.io/).


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/getting-started/readme.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
