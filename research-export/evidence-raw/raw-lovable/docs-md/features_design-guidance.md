> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Design guidance

> Pick from three design previews before Lovable builds, and steer typography, color, and layout when you want a specific look.

**Design guidance** helps you shape the visual direction of your project before Lovable starts building. Depending on your prompt, Lovable either:

* shows three lightweight **design directions**,
* asks a short set of **design questions**, or
* **builds directly** when the visual direction is already clear.

**Design directions** help you compare different visual approaches before committing to one. **Design questions** help you steer typography, color, and layout when you already have preferences.

Both are designed to help you land closer to your intent on the first build, with fewer revision cycles.

## Key benefits

* **See before you build**. Compare three rendered previews side by side before committing to a direction.
* **Steer the visual identity**. Choose typography, color palettes, and layouts when you want a specific look.
* **Refine without restarting** Iterate on a direction while keeping its overall design language consistent.
* **Explore variations later**. Generate alternatives for specific sections of an existing project, such as a hero, navbar, pricing card, or footer.
* **Faster iteration**. Start with a stronger visual foundation and reduce back-and-forth revisions.

## Design directions

Design directions generate three different visual approaches for your project before Lovable starts the full build.

Each direction is rendered as a lightweight HTML and Tailwind preview so you can compare layouts, typography, color, spacing, and overall visual tone side by side.

### When design directions appear

Lovable shows three design directions when your request is visually open-ended. For example, when you:

* Ask for design options, directions, alternatives, concepts, or variations.
* Ask for something beautiful, polished, well-designed, high-end, visually impressive, or with strong visual quality.
* Ask to explore or draft designs, or see different concepts.
* Describe an open-ended UI without specifying colors, fonts, or a brand reference.

Example prompts that trigger three directions:

```text wrap theme={null}
Build me a beautiful landing page for a coffee subscription
Design a polished portfolio site with a high-end feel
Create a visually impressive marketing page for a new product
Show me some design options for a portfolio site
Give me a few directions for a travel blog
Landing page for a trendy tech company
Explore some concepts for a pricing page
```

### How to use design directions

<Steps>
  <Step title="Describe your project">
    Open Lovable and write a prompt for what you want to build. Keep the prompt high-level if you want a wider range of visual ideas.
  </Step>

  <Step title="Compare the three directions">
    Lovable generates three design directions in parallel. You can:

    * compare them side by side,
    * open one full-screen,
    * and switch between directions using thumbnails.

    <Tip>
      If none of the three directions feel right, you can ask Lovable to generate another set, or continue refining the closest option.
    </Tip>
  </Step>

  <Step title="Refine a direction">
    Each direction includes a **Describe changes** input and three **suggestions**  with prompts for common next iterations. Click a suggestion to paste its prompt into the  input field, then press the up-arrow to refine.

    You can also type your own refinement prompt, for example:

    ```text theme={null}
    Make it warmer
    Improve readability
    Use more whitespace
    Make it feel more premium
    ```

    Lovable preserves the overall design language while applying your requested changes.

    You can refine up to **six times total** before submitting. Refinements can be on any of the three directions, in any order, and each one shows up as a new card.

    <Note>
      Refined versions appear after you exit the fullscreen view. Press the up-arrow once, then close fullscreen to see the new version alongside the originals. Each press of the up-arrow counts as one refinement.
    </Note>
  </Step>

  <Step title="Submit the direction">
    When you choose a direction, click **Submit**. Lovable locks in that visual direction and starts the full build.
  </Step>
</Steps>

### Design directions for existing projects

Design directions also work on existing projects. Ask Lovable for variations of a specific section or component, such as:

```text theme={null}
Show me three options for the hero section
Three navbar variations
Give me three pricing card designs
Redesign the pricing page with three different concepts
Three options for the footer with a darker theme
```

You can also upload a screenshot of an existing section and ask Lovable to generate redesigns based on it.

## Design questions

Design questions help you define a visual identity before Lovable builds your project. Lovable walks you through a short set of guided choices for:

* **Typography**\
  Pick from font pairs (heading + body) grouped by feel: modern tech, editorial, creative, lifestyle, technical, and others.
* **Color palette**\
  Pick from curated swatches grouped by mood: warm and earthy, cool and calm, bold and vibrant, soft pastels, professional, and more.
* **Layout**\
  Pick from wireframe options: hero grid, single column, split screen, sidebar, masonry, bento grid, magazine, full-width sections, zigzag, card grid, asymmetric, broken grid, feed, gallery, and others.

After you submit, Lovable turns your choices into a detailed design brief with named fonts, hex colors, layout approach, and uses it as the spec for the build.

### When design questions appear

Lovable shows design questions when the project benefits from a stronger visual identity, or your prompt leaves important visual decisions open-ended.

This commonly includes:

* landing pages,
* portfolios,
* blogs,
* marketing sites,
* and other visually expressive surfaces.

You can also trigger design questions directly with prompts like:

```text theme={null}
Build me a portfolio site with a serif typeface
Landing page with a muted color palette
Marketing site with a split-screen layout
```

## When Lovable skips design guidance

Lovable builds directly when the visual direction is already clear or unnecessary.

This includes prompts that:

* specify fonts, colors, or branding,
* reference another product or style directly,
* include a URL to clone,
* or use a named design system.

Lovable also skips design guidance for:

* dashboards, admin panels, internal tools, and games,
* functional requests with little or no UI design work, such as authentication, database schema, RLS policies, and edge functions,
* projects created from a [design template](/features/business/design-templates) or connected to a [design system](/features/design-systems), as the design is already set.

To skip design guidance intentionally, include a detailed visual brief directly in your prompt.

## Limitations

* **Previews are placeholders.** Generated previews use generic copy and image placeholders. The full build replaces them with content tailored to your app.
* **Generation adds time.** The three-direction step takes a few seconds before the full build starts.
* **Refinements are capped.** You can refine **up to six times** total before submitting. The dialog disables further refinements when the limit is reached.
* **Curated assets.** The design questions flow draws from a curated set of font pairs, palettes, and layouts. To use custom tokens, components, or guidelines, see [Design systems](/features/design-systems).
* **No off switch.** To skip the design step, write a specific design brief into your prompt and Lovable will build directly.

## FAQ

<AccordionGroup>
  <Accordion title="Can I get three directions for an existing project?">
    Yes. Ask for variations of a specific part. For example:

    ```text theme={null}
    Show me three options for the hero section
    Show me three navbar variations
    ```

    Lovable generates alternatives you can pick from. You can also attach a screenshot of a section and ask for redesigns based on it.
  </Accordion>

  <Accordion title="What if I don't like any of the three directions?">
    Ask Lovable to generate new ones, or refine and describe what you want changed in the **Describe changes** input on the closest direction.
  </Accordion>

  <Accordion title="Can I combine elements from different directions?">
    Yes. Pick the closest direction, then refine. For example:

    ```text theme={null}
    Use this layout but the warmer palette from the second option
    ```

    Lovable keeps the overall visual language consistent while applying your requested changes.
  </Accordion>

  <Accordion title="How many times can I refine a direction?">
    Up to six refinements per round. Refinements can be on any of the three directions. After that, submit a direction to continue with the build, or generate a fresh set of three directions.
  </Accordion>

  <Accordion title="Can I bring my own typeface or palette?">
    Not through the design questions flow, as it draws from a curated list. You can choose **Describe your own** on any question to write a preference in your own words. To use custom tokens, components, or guidelines across projects, see [Design systems](/features/design-systems).
  </Accordion>

  <Accordion title="Does this work for dashboards or internal tools?">
    Lovable focuses the design step on surfaces where the visual direction matters most, such as landing pages, marketing sites, blogs, and portfolios. Dashboards, admin panels, internal tools, and games skip the step and use Lovable's standard build flow.
  </Accordion>

  <Accordion title="What happens if I'm using a design system or template?">
    Lovable skips design guidance automatically and builds using the existing tokens, components, and visual rules from the template or design system.
  </Accordion>

  <Accordion title="Does this cost extra credits?">
    No. Design guidance uses standard chat messages and does not add additional credit costs.
  </Accordion>
</AccordionGroup>
