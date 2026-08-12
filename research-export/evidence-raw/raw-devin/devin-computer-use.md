> ## Documentation Index
> Fetch the complete documentation index at: https://docs.devin.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Computer Use

> How Devin uses a full desktop environment to interact with GUIs, test applications, and visually verify changes

Devin has access to a full desktop environment — not just a browser. It can move the mouse, click on UI elements, type on the keyboard, take screenshots, and interact with any application that runs on the desktop. This capability is called **Computer Use**, and it allows Devin to test and interact with your software the same way a human would.

Computer Use works on both **Linux** (the default session platform) and **Windows** sessions. See [Supported platforms](#supported-platforms) for details.

<video controls className="w-full aspect-video" src="https://mintcdn.com/cognitionai/lQBZeyJhpcluxU_P/images/computer-use-demo.mp4?fit=max&auto=format&n=lQBZeyJhpcluxU_P&q=85&s=6d33a326a338483ad74eb9e05f4a9d71" data-path="images/computer-use-demo.mp4" />

## What Is Computer Use?

Computer Use gives Devin direct access to a graphical desktop environment with a mouse and keyboard. This goes beyond browser automation — Devin can interact with **any application** that renders on screen, including:

* **Web applications** in Chrome (clicking buttons, filling forms, navigating pages)
* **Desktop applications** that run on the session's platform (Linux or Windows), including Electron apps, IDEs, and platform-native GUIs
* **Terminal-based UIs** (TUI programs, interactive CLIs)
* **Any visual interface** that can be displayed on the desktop

Devin sees the screen as a 1024×768 pixel display and can perform actions like clicking, typing, scrolling, dragging, and taking screenshots — just like a human sitting at the computer.

## Supported Platforms

| Platform        | Computer Use support                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Linux (default) | Supported — sessions run a full Linux desktop environment                                                                         |
| Windows         | Supported — sessions on [Windows environments](/onboard-devin/environment/windows-support) run a full Windows desktop environment |
| macOS           | Not supported                                                                                                                     |

The Computer Use experience is the same on both platforms: Devin uses the mouse and keyboard, takes screenshots, runs Chrome for web apps, and can record its testing sessions. On Windows, Devin can additionally test Windows-native desktop applications (e.g. WPF, WinForms, and other apps that only run on Windows). To run sessions on Windows, configure a Windows blueprint as described in [Windows support](/onboard-devin/environment/windows-support).

## How to Enable It

Computer Use is controlled by the **Enable desktop mode** toggle in your organization's customization options.

1. Go to [**Settings > Customization**](https://app.devin.ai/customization)
2. Under the **Browser interaction** section, toggle **Enable desktop mode** on
3. Devin will now use its desktop environment during sessions

<Info>Desktop mode is available on all plans. Only organization admins can change this setting.</Info>

## When Computer Use Runs

Once Desktop mode is enabled, Computer Use is available in every session. There are three ways it gets used:

### After creating a PR

When Devin creates a PR, it offers a **Test the app** button. Clicking it triggers the full [testing workflow](/work-with-devin/testing-and-recordings) — Devin starts your app, uses Computer Use to interact with the desktop, tests the changes, and sends you a recording.

<Frame>
  <img src="https://mintcdn.com/cognitionai/t3ELyAdF5CfeLLyT/images/test-the-app-button.png?fit=max&auto=format&n=t3ELyAdF5CfeLLyT&q=85&s=6e7cc949688beb051244c06844a7f509" alt="Test the app button" width="276" height="96" data-path="images/test-the-app-button.png" />
</Frame>

### On request during a session

You can ask Devin to test at any point during a session — no special syntax needed, just natural language. For example:

* "Test the changes you just made and send me a recording"
* "Open the app in the browser and verify the login page works"
* "Launch the desktop app and check that the new menu item appears"

### Autonomously when appropriate

Devin decides on its own when desktop interaction is the right tool for the job. If a task involves clicking UI elements, navigating an app, filling out forms, or visually verifying something, Devin will use Computer Use without being explicitly asked. You don't need to tell Devin *how* to interact with the screen — just tell it *what* to accomplish.

## What Devin Can Do with Computer Use

### Test web applications end-to-end

Devin can start your app locally, open it in Chrome, and click through entire user flows — login, navigation, form submission, checkout — verifying that everything works as expected.

### Test desktop applications

Any application that runs on Devin's session platform can be tested. On Linux sessions this includes Electron apps, Java Swing/AWT applications, GTK/Qt apps, and more. On [Windows sessions](/onboard-devin/environment/windows-support), Devin can also test Windows-native applications such as WPF and WinForms apps. Devin launches the app, interacts with its GUI, and verifies behavior.

### Visual verification

Devin can take screenshots at specific points during testing to verify that layouts, styling, and UI elements look correct. It can compare what it sees on screen against expected behavior and flag visual issues.

### Interact with complex UI flows

Some testing scenarios require multi-step GUI interactions that go beyond simple API calls or browser automation — things like drag-and-drop, context menus, keyboard shortcuts, or navigating between multiple windows. Computer Use handles all of these.

### Record testing sessions

Devin can record its screen while testing, annotating key moments in the video. The recording is then processed and sent to you so you can watch Devin interact with your app and confirm the changes work. See [Testing & Video Recordings](/work-with-devin/testing-and-recordings) for full details on the recording workflow.

## How Computer Use Works

When Devin uses Computer Use during a session, it follows this process:

1. **Takes a screenshot** of the current screen to understand what's visible
2. **Identifies interactive elements** — buttons, text fields, menus, links — and decides what to interact with
3. **Performs an action** — clicks, types, scrolls, or uses keyboard shortcuts
4. **Waits and observes** — takes another screenshot to see the result of the action
5. **Repeats** until the task is complete

This screenshot-action loop allows Devin to adapt to whatever is on screen, handling dynamic content, loading states, pop-ups, and unexpected dialogs just like a human would.

## Computer Use and Testing

Computer Use is the foundation of Devin's [testing and recording](/work-with-devin/testing-and-recordings) workflow. When Devin tests your application after creating a PR:

1. **Setup** — Devin installs dependencies, starts your app, and prepares the environment
2. **Test planning** — Devin reads the diff and creates a focused test plan
3. **Execution via Computer Use** — Devin uses its desktop to interact with your app, following the test plan step by step
4. **Recording** — The entire process is captured on video with annotations, then sent to you for review

The key difference between Computer Use and the Testing & Recordings workflow is scope: **Computer Use** is the underlying capability (desktop interaction), while **Testing & Recordings** is the structured workflow that uses Computer Use to test your PRs and deliver video proof.

## Tips for Getting the Best Results

<CardGroup cols={2}>
  <Card title="Be specific about what to test" icon="bullseye">
    * "Open the app, click the Settings button in the top-right, toggle dark mode, and verify all text remains readable"
    * "Launch the Electron app, create a new document, type some text, and verify it saves when you close the window"
  </Card>

  <Card title="Tell Devin what success looks like" icon="check">
    * "The dashboard should show three charts with no error messages"
    * "After submitting the form, a green success banner should appear at the top of the page"
  </Card>
</CardGroup>

### Pre-configure access

If your app requires authentication, set up [secrets](/product-guides/secrets) ahead of time so Devin can log in without asking you during the session. Complete [environment configuration](/onboard-devin/environment) to ensure Devin can install dependencies and start your app without issues.

### Create testing skills

For apps you test frequently, create a [Skill](/product-guides/skills) that tells Devin exactly how to set up and test your application. This saves time on repeated sessions and ensures consistent testing. See [Testing & Video Recordings — Skill Suggestions](/work-with-devin/testing-and-recordings#skill-suggestions) for examples.

## Scripted Browser Use via Playwright

Devin's Chrome browser exposes a **Chrome DevTools Protocol (CDP)** endpoint that Playwright can connect to. Devin can write and run Playwright scripts to automate browser interactions — such as login flows or systematic data entry — against its own running browser. You can also write these scripts yourself and check them into your repo. For most other browser actions, Devin's native Computer Use or browser tools are recommended.

### How it works

Devin's Chrome instance listens for CDP connections on port **29229**. A Playwright script can attach to this browser, perform actions (fill forms, click buttons, handle redirects), and then disconnect. Because the script connects to the *existing* browser rather than launching a new one, all state changes — cookies, localStorage, auth tokens — persist after the script exits.

This means Devin can immediately use the authenticated session: refresh pages, navigate, and interact with the app normally.

### Example: connecting to Devin's browser

```python theme={null}
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.connect_over_cdp("http://localhost:29229")
    context = browser.contexts[0]
    page = context.pages[0] if context.pages else context.new_page()

    # Example: navigate and log in
    page.goto("https://example.com/login")
    page.fill('input[name="email"]', "user@example.com")
    page.fill('input[name="password"]', "password")
    page.click('button[type="submit"]')
    page.wait_for_url("**/dashboard")
    print("Login successful!")
```

After this script runs, Devin's browser is logged in and ready to use — no manual interaction required.

### When to use this

<CardGroup cols={2}>
  <Card title="SSO / OAuth flows" icon="key">
    Automate multi-step login flows (e.g., Okta, Auth0, Google SSO) that would be tedious to click through manually every session.
  </Card>

  <Card title="Environment setup authentication" icon="gear">
    Include a login script in your [environment setup](/onboard-devin/environment) so Devin starts every session already authenticated.
  </Card>

  <Card title="Skills-based automation" icon="wand-magic-sparkles">
    Store login or data entry scripts in a [Skill](/product-guides/skills) so Devin can invoke them automatically when needed.
  </Card>

  <Card title="Systematic data entry" icon="table">
    Script repetitive form submissions or bulk data entry that would be slow and error-prone via point-and-click.
  </Card>
</CardGroup>

### Tips

* Store login scripts in your repo's `.agents/skills/` directory so they persist across sessions
* Use [Secrets](/product-guides/secrets) to store credentials — reference them via environment variables in your scripts
* The CDP endpoint is always `http://localhost:29229` — this is the same port whether Desktop mode is enabled or not
* After the script runs, Devin can use either Computer Use or browser tools to interact with the authenticated session

## Troubleshooting

### Devin can't find a UI element

If Devin is unable to locate a button or element on screen, try being more specific in your instructions — describe the element's location, label, or surrounding context. For example, "click the blue **Save** button at the bottom-right of the modal" is better than "click Save."

### The app doesn't render on Devin's desktop

By default, Devin runs a Linux environment. If your application only runs on Windows, run your sessions on a [Windows environment](/onboard-devin/environment/windows-support) so Devin can test it there. macOS-only applications are not supported. Web applications work regardless of platform since they run in Chrome. For desktop apps, ensure they have a build for the platform your sessions run on.

### Devin is clicking the wrong things

If Devin is misinteracting with your UI, provide a [Skill](/product-guides/skills) or [Knowledge](/product-guides/knowledge) entry with specific navigation instructions for your app. Describing the exact steps ("click the hamburger menu in the top-left, then click **Settings** in the dropdown") reduces ambiguity.
