> ## Documentation Index
> Fetch the complete documentation index at: https://support.bolt.new/llms.txt
> Use this file to discover all available pages before exploring further.

# Figma for design

> Bolt integrates directly with Figma to import designs and generate code.

<Tip>
  If you're new to Figma and designing UIs, start with the [Overview](#overview) to understand the benefits of this feature, then skip to [New to Figma and design](#new-to-figma-and-design) for an introduction to Figma and some design tips and resources.
</Tip>

## Overview

Figma is a widely used design tool. From their docs:

> Figma Design is for people to create, share, and test designs for websites, mobile apps, and other digital products and experiences. It is a popular tool for designers, product managers, writers and developers and helps anyone involved in the design process contribute, give feedback, and make better decisions, faster. [*What is Figma?*](https://help.figma.com/hc/en-us/articles/14563969806359-What-is-Figma).

Using Bolt's Figma integration, you can quickly load Figma designs into Bolt, and generate sites and UIs based on the designs. You can collaborate on and refine designs in Figma, before moving into Bolt for development.

Bolt uses [Anima](https://www.animaapp.com/) to handle turning Figma designs into apps.

## Connect to Figma and import a frame from the homepage

1. On the [Bolt homepage](https://bolt.new), click **Import from Figma**.
2. Follow the steps to connect your Figma account.
3. In the **Choose a Figma frame** window, paste the URL of the Figma frame you want to import.
4. Click **Import Figma frame into Bolt**. Bolt processes the frame and generates a project based on the layout.

## Import a Figma frame from the chatbox

In addition to starting your build from the Bolt homepage by importing a Figma frame, you can also import a Figma frame for design reference using the chatbox.

<Note>
  Learn more about [Figma frames](/integrations/figma#figma-frames).
</Note>

To import a Figma frame, follow the steps below:

<Frame>
  <video className="block mx-auto" src="https://res.cloudinary.com/dlq2nawz5/video/upload/f_auto,q_auto/v1766077013/figma-chatbox_h4c2yn.mp4" alt="A Figma frame being imported via the Bolt chatbox." controls autoPlay muted loop />
</Frame>

1. Log in to your Bolt project.
2. Click the plus icon in the bottom-left corner of the chatbox.
3. Click **Import Figma frame**.
4. Paste your Figma frame URL.
5. Click **Import Figma frame into Bolt**.

## Build from a Figma frame using your design system

If you're on a paid Team account, adding a [design system](/building/design-system/introduction) can help build your Figma frames into working webpages.

When you import a Figma frame while building with a design system, Bolt's design system agent processes the frame and recreates it using your real design system components.

<Note>
  To import from Figma, you need to be logged in to your Figma account. For instructions, see [Connect to Figma and import a frame from the homepage](/integrations/figma#connect-to-figma-and-import-a-frame-from-the-homepage).
</Note>

To import a Figma frame:

1. On the Bolt homepage, in the chat toolbar, click **Design System**, then select the design system you want to use.
2. In the chat toolbar, click the plus icon (**+**), then click **Import from Figma**.
3. Select **Screenshot**.

<Warning>
  When using a design system, always select the **Screenshot** option when importing from Figma. The **Code** option uses a tool that isn't aware of your design system, so it won't build with your components.
</Warning>

4. Paste the URL of your Figma frame and follow the prompts.
5. Add any additional context to your prompt, then click **Build now**.

### Tips for using Figma import with your design system

* Make sure your design system is set to the correct active revision before importing. Bolt uses whichever revision is marked active.
* If the output doesn't match what you expected, check that your design system has the relevant components. You can browse what Bolt knows about your design system by opening the **Storybook** from the project chat.
* Use your prompt to fill in any context Bolt can't infer from the screenshot alone — for example, interaction states, content guidelines, or component variants you want to prioritize.

## New to Figma and design

If you're completely new to Figma, or to designing apps, this section contains information to get you started.

### Key terms

* UI: user interface. Usually means a GUI.
* GUI: graphical user interface. Most interfaces are graphical, but sometimes people refer to GUIs to differentiate them from text-based interfaces such as command-line tools.
* Web apps: interactive software applications that run in a browser. For example, Bolt itself is a web app.
* Responsive design: a design that works on different devices and screen sizes.
* Accessibility: making your design usable for everyone. For example, ensuring your color contrast is clear for people who are colorblind, or making your font size readable.

### Figma frames

When importing from Figma, you use a single frame, not an entire Figma project.

> Frames are layers that act as containers to organize other layers—such as shapes, images, and text—into cohesive designs. You can even nest frames within other frames, allowing you to create more complex designs. [*Frames in Figma design*](https://help.figma.com/hc/en-us/articles/360041539473-Frames-in-Figma-Design)

To get the frame URL:

1. Right-click the frame.
2. Click **Copy/Paste as** > **Copy link to selection**.

<img src="https://mintcdn.com/stackblitz/ykXyLTItpmfmfeyD/images/figma-link-to-frame.png?fit=max&auto=format&n=ykXyLTItpmfmfeyD&q=85&s=7b6ef48f700c7721c88919457c99fa79" alt="The Figma menu path to copy a frame URL" width="1144" height="492" data-path="images/figma-link-to-frame.png" />

### Responsive design

A responsive design is one that works on multiple screen sizes and orientations. For example, you need to make your design responsive if you want it to work well on both mobile and desktop.

There are two ways to do this:

* Follow Anima's guide to [Create Responsive Designs in Figma](https://support.animaapp.com/en/articles/6431384-create-responsive-designs-in-figma). This is the best option: although it means taking more time to design your app, it gives you full control of the design in all sizes and on all platforms. It also saves tokens.
* Load your design into Figma, then ask Bolt to make it responsive.

To check your responsive design in Bolt:

1. In your app preview, click the **Responsive mode icon** in the top center of your screen.
2. Choose a device from the dropdown to see how your app appears, or choose **Responsive**, then resize by dragging the sides of the preview to check the appearance at different widths.

### More resources

Figma can feel complex at first. Explore the [Figma help center](https://help.figma.com/hc/en-us/categories/360002051613-Get-started) for learning resources and guidance.

For best results, follow Anima's [Figma best practices](https://support.animaapp.com/en/articles/6300035-figma-best-practices) guide.

Accessibility is another big topic, but an important one: accessible designs allow disabled people to use your site, but they also make your site more user-friendly for everyone. Figma has a short introduction to [Accessibility and inclusion in design](https://www.figma.com/resource-library/creating-accessible-and-inclusive-design/), as well as links to more resources. For a much deeper dive, the W3C (the organization that develops web standards) provides a free edX course: [W3Cx: Introduction to Web Accessibility](https://www.edx.org/learn/web-accessibility/the-world-wide-web-consortium-w3c-introduction-to-web-accessibility).
