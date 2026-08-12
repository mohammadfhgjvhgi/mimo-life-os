> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/features/local-api.md).

# Local API

Release 0.46.X marks an exciting and long-awaited moment in Anytype’s evolution: **the first iteration of our Local API**. It opens up powerful new possibilities for an ecosystem of plugins, automations and third-party integrations.

### Anytype Local API (Developer Preview)

Our API is now available and directly included with the desktop app, running entirely on localhost. It operates fully offline, meaning you can build and use integrations without any cloud dependencies - even while flying.

{% hint style="danger" %}
I**mportant Security Notice:** By providing an API key or using extensions, you grant limited access to your Anytype vault, enabling operations such as editing or deleting objects. Ensure you **use only trusted extensions**.
{% endhint %}

### Key Highlights

* **Secure Authentication:** Authenticate once via a 4-digit challenge in the desktop app, generating an API key. This key acts as a bearer token to authenticate subsequent requests. Additionally, API keys can be managed and generated directly through the desktop client's settings, making it easy to share keys with third-party integrations.
* **Comprehensive Documentation:** The OpenAPI specification and full documentation are available on our new [Developer Portal](https://developers.anytype.io/).
* **Robust API Capabilities:** Endpoints offer core Anytype functionality: creating objects, editing, querying and much more.
* **Growing Developer Ecosystem:** Early SDKs and community-driven tools are already underway: Python and Go clients, MCP server and Raycast extension.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/features/local-api.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
