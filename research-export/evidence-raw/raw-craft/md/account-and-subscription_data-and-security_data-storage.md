> ## Documentation Index
> Fetch the complete documentation index at: https://craft-support.mintlify.site/llms.txt
> Use this file to discover all available pages before exploring further.

# How Your Data Is Stored

> Learn about Craft's data storage practices and security measures.

Craft stores your documents securely in the cloud so your content can sync across devices, stay backed up, and support collaboration features.

## Data Policy Overview

For the full policy details, read our [Craft Data Policy](https://www.craft.do/s/0L6qZ2ew0yQS1P).

## Key Points

### Cloud Storage

* All Craft documents are stored on secure cloud servers hosted on **Amazon Web Services (AWS)**
* This enables real-time syncing across all your devices
* Documents are encrypted at rest and in transit

### What Gets Stored

* **Document content**: All text, formatting, and structure
* **Media and attachments**: Images, files, and other embedded content
* **Metadata**: Document properties, collaboration data, and version history
* **Personal information**: Account details and preferences

### Security Measures

* **Encryption at rest**: AWS RDS default encryption for documents and personal data
* **Encryption in transit**: TLS protection for all data transmission
* **File encryption**: SSE-S3 encryption for uploaded files and media
* **SOC 2 certified**: Independent verification of security standards
* **Access controls**: Limited personnel access, fully logged

### Data Retention

Retention depends on the type of data and, for version history, your subscription plan.

| Data type                            | Retention period           | Notes                                                                                                   |
| ------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Active documents**                 | Until you delete them      | Documents remain in your space as long as your account and space are active.                            |
| **Deleted documents**                | 30 days                    | Deleted documents move to **Recently Deleted**, where they can be restored before permanent deletion.   |
| **Version history – Starter (Free)** | 7 days                     | Older document versions are automatically removed after the retention period.                           |
| **Version history – Plus, Family**   | 30 days                    | Applies to automatic document backups and restore points.                                               |
| **Version history – Team, Business** | 180 days                   | Longer retention for team and business workspaces.                                                      |
| **Disaster recovery backups**        | Limited operational period | Backups are maintained for service reliability and disaster recovery, not as a user-accessible archive. |

For more detail on restoring previous versions, see [Document Version History](/en/account-and-subscription/storage-and-recovery/version-history).

## Alternative Storage Options

If you prefer to keep specific documents outside Craft's cloud storage, Craft also offers **External Locations** where supported documents can be stored locally on your device. This option has limitations:

* Sharing and collaboration features are not available
* You must manually re-add folders when switching devices
* Sync depends on third-party services (like iCloud Drive)

Learn more about [External Locations](/en/account-and-subscription/storage-and-recovery/external-locations).

## Questions?

For more information about how Craft handles your data:

* Read our [Security Overview](https://www.craft.do/security)
* Review our [Data Policy](https://www.craft.do/s/0L6qZ2ew0yQS1P)
* Contact our support team with specific questions

## Related Articles

<CardGroup cols={2}>
  <Card title="Encryption and Data Protection" href="/en/account-and-subscription/data-and-security/encryption">
    Learn how Craft protects your data
  </Card>

  <Card title="External Locations" href="/en/account-and-subscription/storage-and-recovery/external-locations">
    Store content on your device or cloud provider
  </Card>

  <Card title="Check Storage Usage" href="/en/account-and-subscription/storage-and-recovery/storage-usage">
    Monitor your storage usage per space
  </Card>
</CardGroup>
