> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/data/storage.md).

# Storage

### Storage <a href="#storage" id="storage"></a>

Anytype is offline first; hence, all data you create will be stored locally first. After that, the data is synced to the backup node and your devices for redundancy. We use a private [IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/) network to handle storage. It is a Peer-To-Peer file system that facilitates decentralized data storage across devices. Local P2P is supported, meaning that you can sync between your devices directly if they are connected through the same local network. This will work no matter what network mode you use, and it's the only way to sync between your devices if you are using local-only mode.

#### Media <a href="#media" id="media"></a>

Media files are not directly downloaded in overall syncing to save bandwidth. Instead, when that file is requested, it is streamed to your device from the backup node or your devices on the network. For example, if you have a 4K Video, it will be streamed from the backup node or P2P devices to your device. So when you open an object with an image, it downloads. When you press play on video & audio, it begins to download. After that, this file will be stored in the application cache.

Furthermore, we use the deduplication feature to reduce storage. For example, if the same picture is uploaded three times, there is only one image copy stored to reduce storage consumption.

You can remove all the media content from your mobile device via the clear cache option in iOS and Android. This will remove all the data altogether and force the app to sync once again entirely. Since the media download works on-premise, you will remove all cached media and clear some storage.

You can also manage your files on desktop by going into `Channel settings -> Manage Channel -> Manage files`.

{% hint style="info" %}
Files are stored inside `flatfs dir` in encrypted fragments, so they can’t be accessed outside of Anytype.
{% endhint %}


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/data/storage.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
