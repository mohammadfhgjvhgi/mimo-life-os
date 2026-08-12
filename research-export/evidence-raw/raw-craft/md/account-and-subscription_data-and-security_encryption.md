> ## Documentation Index
> Fetch the complete documentation index at: https://craft-support.mintlify.site/llms.txt
> Use this file to discover all available pages before exploring further.

# Encryption and Data Protection

> Understand how Craft protects your data with encryption and security measures.

At Craft, we take security and privacy seriously. While we currently do not offer end-to-end encryption (E2EE), your data is still protected using strong encryption protocols throughout its lifecycle.

## What Is End-to-End Encryption?

End-to-end encryption (E2EE) means that only the sender and the recipient can access the data – not even the service provider can decrypt it. In this model, your content is encrypted on your device and only decrypted on the recipient's device, ensuring maximum privacy.

Craft does not use E2EE, because the app relies on cloud-based collaboration, real-time syncing, and multi-device access – features that require server-side data handling.

## How Your Data Is Protected

While Craft does not currently offer end-to-end encryption, your data is protected using robust, industry-standard security measures at every stage.

### Encryption in Transit

All data sent between your device and Craft's servers is protected using **TLS (Transport Layer Security)**, preventing interception or tampering during transmission.

### Encryption at Rest

* **Document content and personal data** are stored using **AWS RDS default encryption**
* **Uploaded files and binary content** (such as images or attachments) are protected using **SSE-S3 encryption** on Amazon S3

### Secure Cloud Hosting

Craft is hosted on **Amazon Web Services (AWS)**, a secure and trusted cloud platform used by leading global companies for its scalability and reliability.

### SOC 2 Compliance

Craft has undergone independent audits and is certified for **SOC 2 Type I & II**, confirming that we maintain high standards in system security, availability, and confidentiality.

### Access Controls

Access to data is limited to authorized Craft personnel and only when necessary – for example, to provide support. All access is logged and carefully managed.

### Automated Backups

Regular backups are performed to ensure your content is safe and recoverable in the unlikely event of data loss.

### Secure Login

Craft uses email-based login with one-time verification codes instead of passwords, which helps reduce exposure to phishing and common security breaches.

## Learn More

For further information on our approach to protecting your data:

* Review our [Security Overview](https://www.craft.do/security)
* Read our [Note on Data Policy](https://documents.craft.me/0L6qZ2ew0yQS1P), which explains our encryption approach and how your data is handled at each layer

If you have any questions about data privacy or Craft's security model, feel free to reach out to our support team.

## Related Articles

<CardGroup cols={2}>
  <Card title="Authentication and Login Security" href="/en/account-and-subscription/data-and-security/authentication">
    Learn about login methods and app security
  </Card>

  <Card title="Data Storage" href="/en/account-and-subscription/data-and-security/data-storage">
    Understand where and how your data is stored
  </Card>

  <Card title="Document Version History" href="/en/account-and-subscription/storage-and-recovery/version-history">
    Automatic backups and version history
  </Card>
</CardGroup>
