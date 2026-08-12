> For the complete documentation index, see [llms.txt](https://doc.anytype.io/anytype/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://doc.anytype.io/anytype/basics/vault.md).

# Vault

Think of this as your account. A **Vault** is an encrypted container in Anytype that you own. Everything you create lives inside your Vault, stored directly on your device.

Unlike other apps with accounts and passwords, nobody holds the keys to your Vault on Anytype—not even Anytype itself. It is protected by cryptography so strong that it's virtually impossible for the most powerful computers on the planet to break into it. It is highly secure.

## Why it matters

Most apps store your data on their servers, and you trust them to keep it safe. In most cases, the company and its employees can access the content in your app because they also hold the keys to your account. This is not the case with Anytype.

On Anytype, your Vault is encrypted on your device before anything is ever synced—even between your own devices. You fully own your data. Only you, and the people you choose to share with, can read it.

This means your information stays private by default. It's not protected by a flimsy privacy policy, it's secured by cryptography and code. With end-to-end encryption, no third parties can view your data without your explicit permission.

## How it works

Your Vault is created the first time you set up Anytype. Along with it, you receive a Key—think of it like a master password that replaces the standard email and password combination.

* Your Key is a 12-word phrase that can never be changed or reset.
* It is generated locally on your device and never shared with Anytype, which ensures that your data is secure.
* Not requiring an email and password is what makes Anytype offline-first and decentralized. You don't need anybody's permission to create an account, use the app, and connect with others.

{% hint style="warning" %}
If you lose your Key and are logged out on all devices, there is no way to recover your Vault because Anytype itself does not store it. Save your Key somewhere safe. See [Key](/anytype/basics/key.md) for details.
{% endhint %}

{% hint style="info" %}
Your Vault syncs across your devices automatically when you're online. You can also work fully offline, as any changes will simply sync the next time you connect to a network.
{% endhint %}


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter, and the optional `goal` query parameter:

```
GET https://doc.anytype.io/anytype/basics/vault.md?ask=<question>&goal=<endgoal>
```

`ask` is the immediate question: it should be specific, self-contained, and written in natural language.
`goal` is optional and describes the broader end goal you are ultimately trying to accomplish on behalf of the user. GitBook uses it to tailor the answer towards what is most useful for that goal.

The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
