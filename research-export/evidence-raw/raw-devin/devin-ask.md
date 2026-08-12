> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Ask Devin

> Use Ask Devin to ask questions about your codebase, plan tasks, and generate high-context sessions

## Overview

**Ask Devin** is your AI assistant's window into your codebase. Once you've added a repository to Devin, it is automatically indexed so Devin can understand and reason about your code. With Ask Devin, you can:

* **Ask questions** about how your code works, explore architecture, dependencies, and key functions. Ask Devin uses advanced code search capabilities to produce detailed, accurate, and well-cited answers grounded in your codebase.
* **Plan tasks** by working with Devin to scope and plan implementation before writing code. Devin generates a context-rich prompt based on what it learns, ready to hand off to an Agent session.

Whether you're onboarding to a new repo, planning a feature, or exploring unfamiliar parts of the codebase, Ask Devin gives you a fast and reliable way to work with your code using natural language.

When you start a Devin session from Ask Devin, the **status of that session is visible directly in the Ask Devin conversation**, so you can track progress without switching context.

## Recommended Workflow

To get the most out of Devin, follow this workflow:

### 1. Index Your Repository

After connecting your GitHub, GitLab, or other source code provider, [index your repository](/onboard-devin/index-repo). Devin automatically indexes your codebase in the background, enabling powerful tools like **DeepWiki** and **Ask Devin**.

<Frame>
  <img src="https://mintcdn.com/cognitionai/bB1dXGApATpvBSfS/images/repo-index.png?fit=max&auto=format&n=bB1dXGApATpvBSfS&q=85&s=9dc8ea408a74e1fa210c9ea21df6f5f9" alt="Index Your Repository" width="1594" height="562" data-path="images/repo-index.png" />

  <figcaption style={{ textAlign: "center", fontStyle: "italic", marginTop: "0.5rem" }}>Index any repo after git permissions have been granted</figcaption>
</Frame>

### 2. Use Ask Devin to Explore and Plan

Go to [Ask Devin](https://app.devin.ai/search) to:

* Ask technical questions about your code and get detailed, accurately cited answers powered by advanced code search
* Plan and scope projects, break down tasks, and generate context-aware prompts for Agent sessions

<Frame>
  <img src="https://mintcdn.com/cognitionai/LP0rS7sU43UCdJ2z/images/ask-devin-input.png?fit=max&auto=format&n=LP0rS7sU43UCdJ2z&q=85&s=4ac5757abe0ccdaa6b2c803bccd242cb" alt="Ask Devin Input" width="2988" height="1864" data-path="images/ask-devin-input.png" />

  <figcaption style={{ textAlign: "center", fontStyle: "italic", marginTop: "0.5rem" }}>Ask Devin any question about your repo, or use Plan mode to scope tasks</figcaption>
</Frame>

<br />

<Frame>
  <img src="https://mintcdn.com/cognitionai/LP0rS7sU43UCdJ2z/images/ask-devin-results.png?fit=max&auto=format&n=LP0rS7sU43UCdJ2z&q=85&s=fffc4efe615c047f9bd057dc06266fc7" alt="Ask Devin Results" width="2988" height="1858" data-path="images/ask-devin-results.png" />

  <figcaption style={{ textAlign: "center", fontStyle: "italic", marginTop: "0.5rem" }}>Devin answers in natural language with code citations, always grounded in your codebase</figcaption>
</Frame>

### 3. Start a Session from Ask Devin

Once you have used Ask Devin to understand the code and clarify your goal, you can start a session directly from the conversation. This is the best way to initiate work with Devin because:

* Devin starts with clear context from your Ask Devin conversation
* The prompt is automatically tailored to your task and codebase
* You are more likely to get successful, relevant results
* The **session status is displayed directly in the Ask Devin conversation**, letting you monitor progress without leaving the page

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
  <Frame>
    <img src="https://mintcdn.com/cognitionai/LP0rS7sU43UCdJ2z/images/ask-devin-auto-generated-prompt.png?fit=max&auto=format&n=LP0rS7sU43UCdJ2z&q=85&s=80aaa62ec7c48c7c0946fedfb04be051" alt="Ask Devin Auto Generated Prompt" width="1330" height="1280" data-path="images/ask-devin-auto-generated-prompt.png" />

    <figcaption style={{ textAlign: "center", fontStyle: "italic", marginTop: "0.5rem" }}>Devin writes a context-rich prompt from your session</figcaption>
  </Frame>

  <Frame>
    <img src="https://mintcdn.com/cognitionai/LP0rS7sU43UCdJ2z/images/ask-devin-session-in-progress.png?fit=max&auto=format&n=LP0rS7sU43UCdJ2z&q=85&s=dd0656b62a5e49f281cf2a001563b20c" alt="Devin Session In Progress" width="1316" height="1264" data-path="images/ask-devin-session-in-progress.png" />

    <figcaption style={{ textAlign: "center", fontStyle: "italic", marginTop: "0.5rem" }}>Track session progress in the conversation</figcaption>
  </Frame>

  <Frame>
    <img src="https://mintcdn.com/cognitionai/LP0rS7sU43UCdJ2z/images/ask-devin-session-completed.png?fit=max&auto=format&n=LP0rS7sU43UCdJ2z&q=85&s=63b32747385f26a8a5dcc1f5d78956df" alt="Devin Session Completed" width="1316" height="1264" data-path="images/ask-devin-session-completed.png" />

    <figcaption style={{ textAlign: "center", fontStyle: "italic", marginTop: "0.5rem" }}>View completed results and PRs</figcaption>
  </Frame>
</div>
