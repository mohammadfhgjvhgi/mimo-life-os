> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/features/graph.md).

# Graph

The **Graph** is a live, visual map of every Object in your Channel and how they connect to each other. Each Object is a node; each link or Property reference is an edge. Open the Graph and you see your Channel's structure — what's central, what's isolated, what clusters around which projects.

## Opening the Graph

The Graph icon (a small node-and-edge symbol) appears at the top of every Object. Click it to switch to Graph view.

<figure><img src="/files/nVr3gkBxrUphOjV5lCg5" alt=""><figcaption></figcaption></figure>

You can also press the keyboard shortcut listed in your shortcut settings to open Graph from any Object.

## Reading the Graph

Each **node** is an Object. Hover over a node to see its title and Type.

Each **edge** (line connecting two nodes) represents a relationship — either a link in the editor, an Object Property pointing to another Object, or a backlink.

The **direction of the edge** (when arrows are enabled) shows which Object references which:

* A → B means Object A links to or references Object B
* A bidirectional connection (A ↔ B) means both link to each other

## Display settings

Click the gear icon (or settings menu) on the top right of the Graph view to access display options:

#### Appearance

* **Show titles** — display Object names next to each node (toggle off for a cleaner view)
* **Show arrows** — show edge direction
* **Show icons** — display Object icons at each node

#### Connections

* **Show links** — show editor links between Objects
* **Show Properties** — show Object Property relationships
* **Show Unlinked** — show Objects with no connections (Orphans)

Each toggle changes the Graph in real time. You can build a focused view (e.g., "show only Property connections, hide editor links") to study one type of relationship at a time.

#### Filtering by Type

The **Filter by Types** menu lets you show only certain Object Types in the Graph:

1. Click the filter icon.
2. Toggle Types on or off.

This is the fastest way to study a slice — for example, "show only Tasks and Projects" to see how your work breaks down.

## Search in the Graph

The search at the top of the Graph lets you find specific Objects:

* Type any portion of an Object's title to highlight matching nodes
* Press Enter to navigate to the first match
* Use arrow keys to cycle through matches

Matched nodes are highlighted; the rest of the Graph dims so you can see them at a glance.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/features/graph.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
