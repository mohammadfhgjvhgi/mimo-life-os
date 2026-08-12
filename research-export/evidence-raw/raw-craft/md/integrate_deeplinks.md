> ## Documentation Index
> Fetch the complete documentation index at: https://craft-support.mintlify.site/llms.txt
> Use this file to discover all available pages before exploring further.

# URL Scheme

> Use the Craft URL scheme to automate workflows and integrate with other apps.

The URL scheme lets users and developers of other apps send commands to Craft. This page explains how it works and what the current capabilities are.

<Info title="Note">
  We are planning to add more capabilities to the existing ones in the future.
</Info>

## Available Commands

Here are the available commands that Craft understands:

* Open a document
* Create a document
* Append to an existing document
* Start search in a Space
* Access Daily Notes

## Open Page

**Inputs:**

* `blockId` – you can access it if you click **Copy Deeplink** in a doc, the link has a `blockId` parameter
* `spaceId` – your user id usually (random guid), if it's a shared workspace, you need to get it by clicking **Copy Deeplink**

**Example:**

```
craftdocs://open?spaceId=<spaceId>&blockId=<blockId>
```

<Warning title="Note">
  It does not work when you are not a member of the space.
</Warning>

## Open Space

**Inputs:**

* `spaceId` – you can get this from a simple deeplink, when clicking **Copy Deeplink**
* `tab` (optional) – `calendar` or `search` or `documents`

**Example:**

```
craftdocs://openspace?spaceId=<spaceId>&tab=<tab>
```

<Warning title="Note">
  It does not work when you are not a member of the space.
</Warning>

## Create New Empty Document

**Input:**

Simply use this URL to create a new empty document in your currently open space:

```
craftdocs://createnewdocument
```

## Create Document

**Inputs:**

* `spaceId` – you can get this from a simple deeplink, when clicking **Copy Deeplink**
* `content` – Percentage encoded markdown (images not supported yet)
* `title` – Percentage encoded plaintext title
* `folderId` – Parameter is required, but can be empty

**Example:**

```
craftdocs://createdocument?spaceId=<spaceId>&title=<title>&content=<content>&folderId=<folderId>
```

## Append to Doc

**Inputs:**

* `spaceId` – you can get this from a simple deeplink, when clicking **Copy Deeplink**
* `index` – index of new block (0 for prepend, huge number for append (more blocks than what you have in your doc)
* `parentBlockId` – blockId of document
* `content` – percentage encoded string

**Example:**

```
craftdocs://createblock?parentBlockId=<parentBlockId>&spaceId=<spaceId>&content=<content>&index=<index>
```

## Search in Workspace

Starts a search in a given workspace and prefills search textfield with the query contents.

**Inputs:**

* **spaceId** – you can get this from a simple deeplink, when clicking Copy Deeplink
* **query** – Make sure it's percentage encoded

**Example:**

```
craftdocs://opensearch?spaceId=<spaceId>&query=<query>
```

## Access to Daily Notes

* **Yesterday** – `craftdocs://openByQuery?query=yesterday&spaceId=<spaceId>`
* **Today** – `craftdocs://openByQuery?query=today&spaceId=<spaceId>`
* **Tomorrow** – `craftdocs://openByQuery?query=tomorrow&spaceId=<spaceId>`

## Related Articles

<CardGroup cols={2}>
  <Card title="Craft API" href="/en/integrate/api">
    Full REST API documentation for integrating with Craft
  </Card>

  <Card title="iOS Shortcuts" href="/en/integrate/apple-shortcuts">
    Automate Craft on iOS with Shortcuts
  </Card>

  <Card title="Deeplinks (User Guide)" href="/en/organize-and-find/linking/deeplinks">
    Learn how to use deeplinks in your workflow
  </Card>
</CardGroup>
