> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Expo for mobile apps

> Using Bolt with Expo to create mobile apps and publish them to app stores.

<Tip>
  If you're new to mobile development and Expo, start with the [Overview](#overview) to understand the benefits of Expo, then skip to [New to Expo](#new-to-expo) for a brief introduction to key concepts.
</Tip>

## Overview

Expo is a platform that lets you build mobile apps for both iPhone and Android using the same code. When you ask Bolt to create a mobile app, it automatically uses Expo to make your app work on multiple platforms.

Bolt's Expo integration aims to:

* Make mobile app development accessible to everyone, regardless of coding experience.
* Provide a seamless path from idea to app store, handling the complex technical setup for you.
* Give you complete control over your app's publishing and distribution.

You can publish to:

* The web.
* iOS: TestFlight (for testing) and the Apple App Store (for public access).
* Android: Google Play Beta (for testing) and Google Play Store (for public access).

## Build your project as a mobile app from the first prompt

If you know you want your project to be a mobile app, it’s important to say so right from the start. Projects created for web do not easily switch over to mobile. By mentioning `mobile app` in your very first prompt, you’ll set up the right foundation from the beginning.

This way, Bolt will generate your project with mobile features in mind and ensure your app is designed for phones and tablets.

Here are a few examples:

* `Build a mobile app for meal planning and grocery lists.`
* `Create a mobile app where users can track their workouts and share progress with friends.`
* `Build a mobile app for learning a new language with flashcards and quizzes.`

## Quick testing with Expo Go

While working on your app, you can quickly test it on your own phone using Expo Go.

<img src="https://mintcdn.com/stackblitz/E5BNjfCNSmyrcX8b/images/expo-icon.png?fit=max&auto=format&n=E5BNjfCNSmyrcX8b&q=85&s=bee613434d289eda42d2a660f366af29" alt="The Device Preview icon location in Bolt" width="1775" height="1003" data-path="images/expo-icon.png" />

1. Log in to Bolt and open your mobile project.
2. Click the **Device Preview icon** in the top center of your screen.
3. Open your Expo Go app, then scan the QR code.

   <Info>
     The first time you do this, it will take some time to build.
   </Info>

## Build and publish with Expo Application Services

You need to build and publish your app in order to:

* Thoroughly test it, including making it available for other people to test.
* Make it available to the public on app stores.

The instructions below will help you get your app from Bolt to your users' phones. If you prefer learning by watching, check out this tutorial. Note that it assumes you already have Expo installed and set up.

<Warning>
  While this video shows an older interface, the fundamental steps for working with Expo are still the same.
</Warning>

<iframe width="560" height="315" src="https://www.youtube.com/embed/iCwxkm2PkQE?si=AsXufyku-0pAQgr7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />

### Prerequisites

Before you can publish your app, you'll need:

* A computer with [Node.js LTS](https://nodejs.org/en) and [Git](https://git-scm.com/) installed.
* An [Expo](https://expo.dev) account.
* For iPhone apps: an [Apple Developer account](https://developer.apple.com/account/).
* For Android apps: a [Google Play Developer account](https://play.google.com/apps/publish/signup/).

<Note>
  You can test your app for free using Expo's development tools. You'll need paid developer accounts for Apple and Google if you want to distribute your app through the official app stores.
</Note>

### Set up your development environment

After building your app with Bolt, download the code and open it in a code editor such as [VS Code](https://code.visualstudio.com/).

Install the EAS CLI (Expo's command-line tool) by opening a terminal and running:

```bash theme={"system"}
npm install -g eas-cli
```

Log in to your Expo account:

```bash theme={"system"}
eas login
```

Navigate to your project folder and install dependencies:

```bash theme={"system"}
npm install
```

Check that everything is set up correctly:

```bash theme={"system"}
npx expo-doctor
```

This command will identify and help you fix any setup issues.

### Configure your app

Before publishing, customize your app's basic information:

1. Open the `app.json` file in your project.
2. Update the `"name"` field with your app's display name:

   ```json theme={"system"}
   "name": "Example Name"
   ```
3. Update the `"slug"` field with a URL-friendly version:

   ```json theme={"system"}
   "slug": "example-slug"
   ```

<Warning>
  You can't change the slug after you create your first build, so choose carefully.
</Warning>

Initialize your project with EAS:

```bash theme={"system"}
eas init
```

Configure EAS Build:

```bash theme={"system"}
eas build:configure
```

This creates the necessary configuration files for building your app.

### Publish to web

Publish your app as a website. This is a quick way to share your app.

1. Build your web app:

   ```bash theme={"system"}
   npx expo export --platform web
   ```
2. Publish to Expo's hosting:

   ```bash theme={"system"}
   eas deploy --prod
   ```
3. Choose a URL for your project and press `Enter`.

Your app is now live on the web. Share the URL with anyone to let them try your app in their browser.

### Publish to iOS

To get your app on iPhones, submit it to Apple's TestFlight for testing, then to the App Store for public release.

#### TestFlight (testing)

Use TestFlight to share your app with testers before it's publicly available.

Run this command:

```bash theme={"system"}
eas build --platform ios --auto-submit
```

Follow the prompts. EAS will:

* Build your app for iPhone
* Create an app listing in your Apple Developer account
* Set up a TestFlight testing group
* Submit your build for internal testing

When the build is ready, you'll receive an email invitation to test your app through TestFlight.

#### App Store (public release)

Once you're happy with your app:

1. Go to [App Store Connect](https://appstoreconnect.apple.com/).
2. Fill in your app's details.
3. Submit for App Store review.
4. Once approved, your app will be publicly available on the App Store.

### Publish to Android

To get your app onto Android devices, you'll use Google Play Console.

#### Build for Android

Create a production build:

```bash theme={"system"}
eas build --platform android
```

When complete, download the build file (APK or AAB) from the link provided in the CLI.

#### Testing

1. Go to [Google Play Console](https://play.google.com/console/).
2. Create a new app.
3. Set up internal testing:
   1. Go to **Testing** > **Internal testing**.
   2. Create a release.
   3. Upload your build file.
   4. Add email addresses of people you want to test the app.
4. Share the testing link with your testers.

#### Public release

When ready for public release:

1. In Google Play Console, go to **Production**.
2. Create a release and upload your build.
3. Fill in your app's store listing details.
4. Submit for review.
5. Once approved, your app will be live on Google Play.

## Manage your app

Steps to update and monitor your app.

### Update your app

When you make changes in Bolt and want to update the app you published:

1. Download the updated code from Bolt.
2. For web updates:

   ```bash theme={"system"}
   npx expo export --platform web
   eas deploy --prod
   ```
3. For mobile updates, rebuild and resubmit:

   ```bash theme={"system"}
   eas build --platform ios --auto-submit
   eas build --platform android
   ```

### Monitor your app

Use Expo's dashboard at [expo.dev](https://expo.dev) to:

* View build status and logs.
* Monitor app crashes and errors.
* Track app usage and performance.

## Adding in-app purchases to your Expo app

If you want users to pay for some of your app features, you need to add subscription and payment functionality.

RevenueCat is a tool to power in-app purchases. They've provided a guide to adding RevenueCat to a Bolt Android app: [How to add subscriptions to a Bolt-generated Expo app](https://www.revenuecat.com/blog/engineering/how-to-add-in-app-purchases-to-your-bolt-generated-expo-app/). You can also use RevenueCat in iOS apps.

## Troubleshooting

How to handle common issues, and where to get help with Expo.

### Common issues

Build fails: Check that all required certificates are set up in your Apple and Google Developer accounts. EAS can guide you through certificate setup.

App crashes on device: Check the error logs in your Expo dashboard. Most crashes are due to missing dependencies or platform-specific code issues.

Upload rejected: Make sure your app meets platform requirements (App Store guidelines for iOS, Google Play policies for Android).

### Get help

If you have issues with Expo:

* Check the [Expo documentation](https://docs.expo.dev/).
* Visit the [Expo Discord community](https://discord.gg/expo).
* Post questions in the [Expo forums](https://forums.expo.dev/).

## New to Expo

If you're completely new to mobile app development, here's what you need to know to use Expo with Bolt.

Expo is a platform that simplifies mobile app development by handling the complex technical setup for you. Instead of learning platform-specific languages (Swift for iPhone, Kotlin for Android), you can build apps that work on both platforms using web technologies.

Benefits of using Expo:

* Cross-platform: write once, run on iPhone, Android, and web.
* Fast iteration: see changes immediately without rebuilding.
* Simplified publishing: EAS handles the complex build and submission process.

Key terms:

* Build: Creating the app file that can be installed on devices.
* TestFlight: Apple's system for testing iPhone apps before they go live.
* Play Console: Google's system for managing Android apps.
* EAS: Expo Application Services. This is the Expo cloud platform that builds and manages your apps.

Resources to learn more about Expo:

* [Expo documentation](https://docs.expo.dev/): comprehensive guides and API reference.
* [Expo blog](https://blog.expo.dev/): latest updates and best practices.
* [React Native basics](https://reactnative.dev/docs/getting-started): understand the underlying technology.
