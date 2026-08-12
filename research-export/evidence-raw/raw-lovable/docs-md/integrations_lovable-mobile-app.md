> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Lovable mobile app

> Build, prompt, and review your Lovable projects from your phone or tablet.

Lovable is available as a native app on iOS and Android, so you can keep building when you're away from your computer.

<Note>
  This page is about the Lovable app you use to build projects from your phone or tablet. If you want to turn a project you built into an app that people install on their phones, see [Can I publish my project as a native iOS or Android app to the App Store or Play Store?](/features/publish#can-i-publish-my-project-as-a-native-ios-or-android-app-to-the-app-store-or-play-store) in the publishing FAQ.
</Note>

<Tip>
  Lovable on mobile shares the same account, projects, and credits as the web app. Sign in once and pick up where you left off on any device.
</Tip>

## Overview

The mobile app gives you access to your Lovable projects from your phone or tablet. You can start something new, continue an existing project, prompt with voice or images, and get notified when a build is ready to review.

It's designed to complement the desktop experience, not replace it. Most of what you do on the web is available on mobile, with a few exceptions listed below. Heavy editing, complex integrations, and detailed reviews are still better on a larger screen.

## Download

<CardGroup cols={2}>
  <Card title="App Store" icon="apple" href="https://apps.apple.com/us/app/lovable-build-apps-with-ai/id6757471107">
    iPhone and iPad. iOS 15 or later
  </Card>

  <Card title="Google Play" icon="google-play" href="https://play.google.com/store/apps/details?id=dev.lovable.build">
    Phones and tablets. Android 9 or later
  </Card>
</CardGroup>

## What's different on mobile

The mobile app uses a layout designed for one-handed use on smaller screens:

* **Swipe between chat and preview.** Inside a project, swipe left or right to switch between the chat and the live preview. On desktop they sit side by side. See [the editor layout](/features/projects/editor#the-two-main-areas).
* **Navigation gestures.** Swipe from the edge of the screen to go back. On Android, the hardware back button works too.
* **Voice and photo input.** Tap the mic to dictate prompts (with a live waveform while you speak), or use the camera to attach a photo directly to a message. You'll be asked for permission the first time.
* **Native sign-in.** Google and Apple sign-in use the system dialogs rather than redirecting through a browser.
* **Push notifications.** Opt in from your device settings to be notified when a build is ready or needs your input. Tapping a notification opens the relevant screen.
* **AI terms (iOS).** The first time you open the iOS app, you'll be asked to accept the AI terms and conditions. This is required by the App Store.
* **Auto-updates.** The app prompts you when a new version is available. Some updates are required to keep things working.

<Note>
  Detailed code review, the preview toolbar, and inline comments on the preview need a wider screen and are still best on desktop.
</Note>

## Buying credits and upgrading plans on mobile

<Note>
  **Billing works differently on iOS and Android**

  On **iOS**, credit top-ups and plan upgrades go through the App Store using Apple's in-app purchases. Web payment surfaces (upgrade buttons, pricing pages, billing settings) are replaced by the native flow. Receipts, refunds, and subscription management live in your Apple ID settings. If you prefer, you can also set up workspace billing on **lovable.dev** in your browser instead.

  On **Android**, in-app purchases aren't available yet. To top up credits or change your plan from an Android device, open **lovable.dev** in your mobile browser and check out with Stripe as you would on desktop. Your plan and credits sync back to the app automatically.
</Note>

|                 | iOS                       | Android                                        |
| --------------- | ------------------------- | ---------------------------------------------- |
| Buy credits     | In-app, via the App Store | In your mobile browser at lovable.dev (Stripe) |
| Upgrade plan    | In-app, via the App Store | In your mobile browser at lovable.dev (Stripe) |
| Manage / refund | Apple ID settings         | Lovable account settings on the web            |

Purchases sync back to the app automatically, regardless of which path you used.

## What's not available on mobile

Most of Lovable works the same on mobile as on desktop. The following flows aren't supported in the app yet. Open **lovable.dev** in your browser to use them.

### Account and sign-in

* **Creating a new account.** The mobile app's login screen only supports signing in. Sign up at **lovable.dev** first, then sign in to the app.
* **Apple Sign-In on Android.** Available on iOS and the web only. On Android, use Google, GitHub, email, or SSO.
* **Returning to the app after password reset.** The reset email opens in your browser. After resetting, come back to the app and sign in manually.

### Integrations

* **Connecting OAuth integrations.** Connectors that use OAuth (including Slack, GitHub, Google Drive, Airtable, and similar services) can't be connected from the mobile app. Set them up on **lovable.dev**; they'll work in the app once connected.

### Editor and project menu

* **Reduced project menu.** Tapping the project name in the editor opens a simplified sheet with **Credits**, **Settings**, **Rename project**, and **Appearance**. It's a compact version of the desktop [project name menu](/features/projects/editor#project-name-menu).
* **Preview toolbar.** The [preview toolbar](/features/preview-toolbar) used for selecting elements, leaving comments on the preview, drawing annotations, and editing text directly in the preview isn't shown on small screens. This is a screen-size limitation rather than a platform one, so the same toolbar is hidden on a narrow desktop browser window.
* **Mention and file picker.** When typing `@` in chat, the picker shows fewer items and no descriptions to fit the screen. To browse the full list, use the web app.

### Plans and billing

* **In-app purchases on Android.** See the section above.
* **Pricing page on iOS.** Browsing pricing in-app on iOS isn't supported. The page redirects you to the App Store flow.
* **Upgrade prompts.** Inline "Upgrade" buttons that open checkout on the web (for example, from templates or design systems) instead route you through the App Store on iOS or to **lovable.dev** on Android.
* **Billing and domain alerts.** Some warning banners (past-due payments, auto-renewal reminders, domain registrar verification) aren't shown in the mobile app. Watch for these by email or by checking your account on the web.

### Workspace management

* **Exporting workspace members.** The "Export members" action in workspace **People** settings is web-only.

### Project workflows

* **Offline use.** Lovable needs an active connection. There's no offline editing or draft mode.

### Operating system requirements

* iOS 14 and earlier, and Android 8 and earlier, are not supported.

If you run into something else that feels missing or broken on mobile, let us know. Tap your avatar in the app to open the user menu and use **Send feedback**. The app is updated frequently.

## FAQ

<AccordionGroup>
  <Accordion title="Is the mobile app free?">
    Yes. The app is free to download on iOS and Android. Your plan and credits are shared with your Lovable account, regardless of how you sign in.
  </Accordion>

  <Accordion title="Does the mobile app have all the same features as the web app?">
    Most of the product works the same way. A few flows (OAuth integrations, account creation, preview toolbar interactions and comments on the preview, some billing actions) still need to be done on **lovable.dev**. See "What's not available on mobile" above.
  </Accordion>

  <Accordion title="Can I use Lovable offline?">
    No. Lovable requires an active internet connection. If you go offline mid-session, you'll see an offline indicator until you reconnect.
  </Accordion>

  <Accordion title="Which devices and OS versions are supported?">
    iOS 15 or later on iPhone and iPad. Android 9 or later on phones and supported tablets.
  </Accordion>

  <Accordion title="How do I buy credits or upgrade on Android?">
    Open **lovable.dev** in your mobile browser and check out with Stripe as you would on desktop. Your plan and credits sync back to the app automatically.
  </Accordion>

  <Accordion title="How do I manage or cancel an iOS subscription?">
    iOS subscriptions are managed through your Apple ID. Open **Settings → \[Your name] → Subscriptions** on your iPhone or iPad to change or cancel.
  </Accordion>

  <Accordion title="Why don't I see Upgrade buttons in the iOS app?">
    On iOS, in-app payments go through the App Store. Tap your project name to find the **Credits** section, which links into the native purchase flow.
  </Accordion>
</AccordionGroup>
