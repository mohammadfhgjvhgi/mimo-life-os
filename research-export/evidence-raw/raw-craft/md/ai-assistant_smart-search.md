> ## Documentation Index
> Fetch the complete documentation index at: https://craft-support.mintlify.site/llms.txt
> Use this file to discover all available pages before exploring further.

# Smart Search

> Use AI to search your space with natural language queries and semantic understanding.

Smart Search brings the power of AI to finding information across your workspace. Instead of relying only on exact keyword matches, Smart Search understands the **meaning** behind your query and finds relevant content even when the exact words don't appear in your documents.

## What is Smart Search?

Smart Search is an AI-powered semantic search feature that helps you find information across your entire space using natural language. It goes beyond traditional keyword matching by understanding context, relationships, and intent.

**Key differences from regular search:**

* **Semantic understanding** – finds content based on meaning, not just exact words
* **Natural language queries** – ask questions the way you naturally think
* **Cross-document connections** – understands relationships between different documents
* **Contextual relevance** – ranks results based on conceptual similarity, not just keyword frequency

## How to use Smart Search

Smart Search works through the Craft Assistant interface:

<Steps>
  <Step>
    Open Craft Assistant from any view in your workspace.
  </Step>

  <Step>
    Type your query using natural language. You can ask questions or describe what you're looking for.
  </Step>

  <Step>
    The Assistant will search across your space using AI to understand your intent and find relevant content.
  </Step>

  <Step>
    Review the results, which include context and connections between documents.
  </Step>
</Steps>

Smart Search is automatically enabled when you use space-level queries in the Assistant – there's no separate toggle or activation step.

## Example queries

Smart Search excels at understanding the **intent** behind your search, not just matching keywords.

### Concept-based searches

Instead of searching for exact terms, you can search by concept:

* *"Find documents about quarterly planning"* – finds content related to planning, goals, and Q1/Q2/Q3/Q4, even if "quarterly planning" isn't explicitly mentioned
* *"Show me everything related to the marketing campaign"* – understands synonyms like "promotion," "outreach," "launch"
* *"What did I write about hiring last year?"* – combines temporal and topical understanding

### Task and project queries

Ask about work status and next steps:

* *"What tasks are still open for Project Y?"*
* *"Show me all the decisions we made about the new feature"*
* *"Find notes from meetings with the design team"*

### Exploratory searches

Discover connections you might have forgotten:

* *"What have I written about remote work?"*
* *"Find all references to budget discussions"*
* *"Show me content related to onboarding new team members"*

## How Smart Search works differently

### Traditional keyword search

**Query:** "project planning"

**Finds:** Documents containing the exact words "project" AND "planning"

**Misses:** Content about "roadmaps," "strategy sessions," "quarterly goals" (related concepts with different words)

### Smart Search

**Query:** *"Find documents about project planning"*

**Finds:**

* Documents with "project planning"
* Documents about "roadmaps" and "milestones"
* Meeting notes about "Q4 strategy"
* Task lists with "planning phase" items

**Why:** AI understands these are semantically related concepts, even with different terminology.

## Usage and models

Smart Search uses your AI quota because it relies on advanced language models to understand your query and analyze your content.

**Model used:** Smart Search typically uses the **Fast** model for space-level semantic queries, balancing speed and understanding.

Usage varies based on query complexity and space size. You can check your current usage in the Assistant menu under **Usage & Limits**.

<Info title="Optimize usage">
  For simple keyword searches where you know the exact term, use regular search (`Cmd+F` / `Ctrl+F`) instead of Smart Search to keep usage low.
</Info>

## When to use Smart Search vs. regular search

**Use Smart Search when:**

* You're not sure of the exact words used in your documents
* You want to find conceptually related content
* You're exploring a topic across multiple documents
* You need to understand connections between different pieces of content

**Use regular search when:**

* You know the exact keyword or phrase
* You're looking for a specific document title
* You want fast results without using your AI quota
* You're searching for specific data like dates, names, or IDs

## Platform availability

Smart Search is available at the **space level** through Craft Assistant on Mac, iPad, iPhone, Windows, and the web. It works across all document types, collections, tasks, and calendar views.

## Privacy and data

Smart Search follows the same privacy principles as all Craft Assistant features:

* Your search queries are **not stored** on Craft servers
* Content is sent to the AI model provider only for the duration of processing a single request
* Your data is **never used** to train AI models
* Only token usage and cost are recorded for usage tracking

Search history remains local to your device and is never synced or persisted.

## Current limitations

Smart Search is designed for semantic understanding, but there are some things to keep in mind:

* **Space-level only** – Smart Search works at the space level, not within a single document (use document search or Find for that)
* **Uses your AI quota** – Unlike regular search, Smart Search counts toward your usage limit
* **Processing time** – May take longer than traditional keyword search, especially for complex queries

## Tips for better results

### Be specific about what you need

Instead of vague queries, provide context:

* ❌ *"Find stuff about the project"*
* ✅ *"Find all meeting notes and decisions related to the website redesign project"*

### Use time references when relevant

The AI can understand temporal context:

* *"What did I write about budgets last quarter?"*
* *"Show me recent notes about the new feature"*
* *"Find documents from around June about the conference"*

### Combine multiple concepts

Smart Search can handle complex, multi-faceted queries:

* *"Find tasks and notes related to hiring designers for the mobile team"*
* *"Show me documents that discuss both marketing strategy and budget constraints"*

### Refine your query

If the first results aren't quite right, try rephrasing:

* Add more context: *"...specifically about international markets"*
* Be more specific: *"meeting notes from Q1" → "weekly standup notes from January and February"*
* Use different terminology: *"client feedback" → "customer complaints and feature requests"*

## Related Articles

<CardGroup cols={2}>
  <Card title="Search and Quick Open" href="/en/organize-and-find/search">
    Learn about traditional keyword search and Quick Open navigation
  </Card>

  <Card title="Using Craft Assistant" href="/en/ai-assistant/using">
    Get started with AI-powered conversations and queries
  </Card>

  <Card title="Choosing AI Models" href="/en/ai-assistant/models">
    Understand which model to use for different tasks
  </Card>

  <Card title="Usage & Limits" href="/en/ai-assistant/usage">
    Learn about AI usage, top-ups, and monitoring your quota
  </Card>
</CardGroup>
