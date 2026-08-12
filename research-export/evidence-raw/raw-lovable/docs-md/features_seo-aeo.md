> ## Documentation Index
> Fetch the complete documentation index at: https://docs.lovable.dev/llms.txt
> Use this file to discover all available pages before exploring further.

# Optimize your app for SEO and AI search

> Run an SEO and AI search review, research keywords and competitors with live Semrush data, and connect a custom domain to help your Lovable app rank on Google, Bing, and AI search engines.

**Search Engine Optimization (SEO)** helps your project show up in traditional search engines like Google or Bing. **Answer Engine Optimization (AEO)** helps your project show up in AI search engines like ChatGPT, Perplexity, Claude, or Gemini.

Both depend on the same foundations: crawlable HTML, good metadata, clean content structure, fast loading, and links pointing to your site.

Lovable helps handle those technical foundations, but strong SEO and AEO still require intentional review and iteration. The SEO & AI search tab helps you audit your project, surface issues, research opportunities, and improve search visibility through SEO & AI search reviews, Semrush-powered SEO research, Google Search Console integration, and AI-search-friendly publishing features.

You'll find the SEO & AI search tab under **More → SEO & AI search** in the [project toolbar](/features/projects/editor#the-more-menu) at the top of the editor.

The SEO & AI search tab brings together:

* **SEO and AI search review**. Run on-demand audits for sitemap, `robots.txt`, metadata, semantic HTML, content structure, alt text, canonical tags, indexing, accessibility, mobile usability, and performance. Lovable surfaces clear recommendations and can apply most fixes in one click.
* **Speed and Lighthouse checks**. Performance, accessibility, mobile usability, and indexing checks from the old standalone Speed tab **now live directly inside the SEO & AI search review**. The SEO & AI search review replaces the previous Speed dashboard.
* **Google Search Console (GSC) setup**. If the [Google Search Console connector](/integrations/google-search-console) is enabled in your workspace, the SEO & AI search review can detect missing GSC setup and guide you through connecting GSC, verifying your site, and submitting your sitemap directly from chat.
* **Semrush-powered SEO research**. Use **Research SEO with Lovable** to research keywords, competitors, backlinks, rankings, and SEO strategy using live Semrush data.
* **Custom domains**. [**Buy or connect a custom domain**](/features/custom-domain) and build your search presence on a domain you control.

## Before you begin

* SEO & AI search reviews are scoped to a single project at a time.
* Running an SEO and AI search review is free on all plans.
* Applying fixes with **Try to fix** uses regular message credits.
* Semrush-powered SEO research has no additional cost through August 15, 2026. No Semrush account required and no separate billing.
* You can run SEO and AI search reviews on unpublished projects.
* Additional checks become available after your site is publicly published, including live indexing, AI markdown rendering, performance, and accessibility audits.
* Only **publicly published** apps can be indexed by search engines. Private or unpublished projects, and [branded workspace URLs](/features/branded-workspace-urls) (`https://{app-name}.{workspace-subdomain}.lovable.app`), are never indexable. [Connect a custom domain](/features/custom-domain) to build search presence. The review still checks `robots.txt` and sitemap on these so you can prepare before launch, but at lower priority.
* Sitemaps, `robots.txt`, metadata, and other SEO elements are not always generated up front. The review surfaces missing or out-of-sync items, and Lovable can create, update, or repair most things in one click.
* Google Search Console setup only appears after the [Google Search Console connector](/integrations/google-search-console) has been enabled in your workspace.
* New Lovable apps created from May 13, 2026 use TanStack Start with server-side rendering (SSR). Older React + Vite apps use **on-request pre-rendering** on deployed public URLs, served only to verified search and AI crawlers (Google, Bing, social-preview bots, and AI engines like ChatGPT, Perplexity, Claude, Gemini). Pre-rendering runs at request time, so dynamically loaded content is included. Third-party SEO scanners and other unverified agents see the regular single-page app. SEO and AI search visibility are supported across both stacks. You can [upgrade an older project to TanStack Start](/features/upgrade-to-tanstack-start) if you want full server-side rendering. For how hosting serves your pages to visitors and crawlers, see [How Lovable hosts your app](/features/hosting#search-engines-and-link-previews).

## Quick start

1. Open **More → SEO & AI search** from the project toolbar.
2. Click **Scan project** (first time) or **Scan again** to run an SEO & AI search review.
3. Review failing findings at the top of the report.
4. Click **Try to fix** on individual findings, or **Try to fix all** to send multiple fixes to the agent at once.
5. Publish your project if you want published-site checks like performance, indexing, accessibility, AI readiness, and Google Search Console setup.
6. Run the review again after publishing to surface those checks.
7. If the review surfaces missing Google Search Console setup, click **Try to fix** to connect the [Google Search Console connector](/integrations/google-search-console), verify your site, and submit your sitemap directly from chat. Publish your latest changes before the sitemap step. Google fetches the sitemap from your live site, so unpublished routes won't be submitted.
8. [Connect a custom domain](/features/custom-domain) if you want to build search presence on your own domain. After connecting one, rerun the review so Lovable can verify and update Google Search Console for the new domain.
9. Use **Research SEO with Lovable** for strategy questions. Click a suggested question or type your own. For example:
   * “Which keywords should I target next?”
   * “What competitors rank for similar products?”
   * “What backlinks should I try to get?”

## SEO and AI search review

SEO & AI search reviews run on demand and analyze your code, preview deployment, and, once publicly published, your live site. Lovable does not rerun reviews automatically when you publish.

Use **Scan project** the first time you run a review, or **Scan again** to rerun it later.

When a review is not actively running, a status badge at the top of the review shows whether the results reflect your latest code:

* **Up to date**: the scan matches the current state of your project.
* **Out of date**: you have made changes since the last scan. Run the review again before relying on the results.

While a review is running, the header switches to **Scanning your project…**

Findings reflect the most recent scan. If you make changes after a scan completes, run the review again before relying on the results.

### Understand findings

Each finding includes an icon that shows its state and, when failing, how much it affects search visibility:

* **Green check**: passing. Nothing to do.
* **Blue lightbulb**: low-impact issue. Nice to fix.
* **Amber warning triangle**: medium-impact issue.
* **Red X**: high-impact issue. Reserved for problems that can effectively hide your site from search engines, such as a sitewide `noindex` tag, a homepage that will not load, `robots.txt` blocking crawlers on a live site, or an `X-Robots-Tag: noindex` header on a server-rendered published deployment.

The review groups findings automatically:

* **Failing** findings appear at the top of the list.
* **Passing** findings appear below with a green check.
* **Fixed** appears as a badge on findings the agent just resolved. The next scan confirms whether the issue is actually fixed and moves the finding back to failing if the issue still exists.
* **Ignored** findings move into a collapsible **Ignored issues** section at the bottom of the review. Use **Restore** to move a finding back into the active list.

### What SEO & AI search review checks

The review combines code analysis, preview checks, and published-site audits.

* **Code-only checks** run on any project, including unpublished ones. These include page basics, metadata, Open Graph tags, structured data, indexing meta tags, and homepage content structure.
* **Preview checks** require a reachable preview deployment. These include homepage reachability, `robots.txt`, and `sitemap.xml`.
* **Published checks** run only against your live public site, not your preview deployment. These include Lighthouse performance audits, accessibility audits, mobile usability checks, indexing audits, and AI Markdown rendering checks.
* **Google Search Console checks** only appear for live public sites when the [Google Search Console connector](/integrations/google-search-console) has been enabled in your workspace.

Each check runs when you start a review, and Lovable can apply most fixes when you click **Try to fix**.

| Category          | Passing finding                                                                                                                  | Common issues                                                                                                                                                                                                                                                                                                 |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page basics       | Page basics are set                                                                                                              | Missing viewport configuration or missing `lang` attribute on `<html>`. <br />Appears as "Some basic page setup is missing"                                                                                                                                                                                   |
| Indexing          | Home page is reachable                                                                                                           | A homepage that returns errors, a sitewide `noindex` meta tag, or (on server-rendered apps) an `X-Robots-Tag: noindex` header blocks search engines. <br />May appear as: <ul><li>"Home page isn’t loading"</li><li>"Home page is blocked from search engines"</li></ul>                                      |
| Indexing          | Google Search Console is set up                                                                                                  | Missing GSC connection, site verification, or sitemap submission. Only appears if the [Google Search Console connector](/integrations/google-search-console) has been enabled in your workspace.<br />Appears as "Google Search Console isn’t fully set up"                                                   |
| robots.txt        | Crawler rules look good                                                                                                          | Missing `robots.txt`, blocked crawlers, missing `Sitemap:` directives, or invalid crawler rules. <br />May appear as: <ul><li>"Crawler rules are missing"</li><li>"Crawler rules need attention"</li></ul>                                                                                                    |
| Sitemap           | Sitemap looks good                                                                                                               | Missing sitemap, invalid XML, placeholder routes, relative URLs, host mismatches, or out-of-sync URLs between your routes and sitemap. <br />May appear as: <ul><li>"Sitemap is missing"</li><li>"Sitemap needs attention"</li></ul>                                                                          |
| Metadata          | Page metadata describes the site clearly                                                                                         | Duplicate titles, placeholder text, weak descriptions, or incorrect canonical URLs. <br />May appear as: <ul><li>"Page title and description are too generic"</li><li>"Search engines see placeholder text"</li><li>"Duplicate titles across routes"</li><li>"Canonical URLs point to the homepage"</li></ul> |
| Open Graph        | Social link previews look good                                                                                                   | Missing or generic Open Graph metadata and social previews per route. <br />May appear as: <ul><li>"Shared links still show Lovable's branding"</li><li>"Social previews aren't customized for this site"</li><li>"Open Graph tags are missing on most pages"</li></ul>                                       |
| Structured data   | Structured data is set up for rich search results<br />or<br />Structured data is optional here (on utility apps and dashboards) | Missing or incorrect JSON-LD structured data. <br />May appear as: <ul><li>"Search results won't show rich previews"</li><li>"Pages are missing schema for rich search results"</li><li>"JSON-LD type doesn't match the page"</li></ul>                                                                       |
| Content structure | Homepage content and structure are well-optimized                                                                                | Missing H1s, weak headings, missing alt text, poor link text, or accessibility labeling issues. <br />May appear as: <ul><li>"H1 is missing or too generic"</li><li>"Some images lack alt text"</li><li>"Link text doesn't describe its destination"</li><li>"Heading levels skip from H1 to H3"</li></ul>    |
| AI readiness      | AI assistants can see your site as Markdown                                                                                      | This is a positive-only check. It confirms Lovable is serving a clean Markdown version of your published site to AI crawlers.                                                                                                                                                                                 |
| Performance       | Page loads fast                                                                                                                  | Poor Lighthouse or PageSpeed performance metrics, including LCP, CLS, INP, render-blocking resources, image optimization, font loading, or JavaScript errors. <br />Appears as "Page loads slowly"                                                                                                            |
| Accessibility     | Accessibility is good                                                                                                            | Lighthouse accessibility issues such as low color contrast, missing ARIA labels, duplicate IDs, empty headings, or landmark/navigation problems. <br />Appears as "Has accessibility barriers"                                                                                                                |
| Mobile usability  | Comfortable on phones                                                                                                            | Mobile usability issues such as small tap targets, readability problems, spacing issues, or responsive layout problems. <br />Appears as "Awkward on phones"                                                                                                                                                  |

### Fix findings

Failing findings appear at the top of the review. For each one you can:

* **Try to fix**: sends the finding to the agent, which applies the changes across your project files.
* **Ignore**: hides the finding from future scans until you restore it.

The review header also includes:

* **Try to fix all**: sends every failing finding to the agent in a single message.
* **Scan again**: reruns the review.

After the agent finishes, publish your project if needed and run the review again to confirm the fixes landed successfully.

### Google Search Console

Connect Google Search Console directly from chat. Lovable can verify your site and submit your sitemap without leaving the SEO & AI search tab.

If the [Google Search Console connector](/integrations/google-search-console) is enabled in your workspace, the review includes a GSC setup check for publicly published projects.

The check verifies:

* Google Search Console is connected
* Your site is verified
* A sitemap has been submitted

If any step is incomplete, click **Try to fix** and Lovable handles the next setup step for you directly from chat.

When all steps pass, the finding changes to “Google Search Console is set up.”

Good to know:

* Verification may take a few minutes after publishing.
* Changing your [custom domain](/features/custom-domain) requires re-verification in GSC.
* Make sure your latest changes are published before clicking **Try to fix** on the sitemap step. Google fetches the sitemap from your live site, so any pages that are only in your unpublished code won't be included. If you've added or renamed routes since your last publish, publish first, then submit.

<Note>
  If the GSC connector has not been enabled for your workspace, this check does not appear.
</Note>

## Research SEO with Lovable

**Research SEO with Lovable** is powered by **live Semrush data**. It suggests SEO questions tailored to your project. Click a suggested question to send it to chat, or ask your own.

<Note>
  Semrush-powered SEO research has no additional cost through **August 15, 2026**. No Semrush account required and no separate billing.
</Note>

You can use it for:

* Keyword research
* Competitor analysis
* Content ideas
* Search trends
* Backlink opportunities
* SEO strategy
* Ranking analysis
* Site audits
* Landing page optimization

Examples:

* “What keywords should a site like mine target?”
* “Which competitors rank for similar products?”
* “Why is my homepage not ranking?”
* “What pages drive the most traffic for sites like this?”
* “What backlinks should I try to get?”
* “Audit `/pricing` for SEO issues.”
* “Suggest SEO improvements for my landing page copy.”

Click **New questions** to rotate to a fresh set of suggestions. Lovable labels Semrush-powered responses directly in chat.

The SEO & AI search review focuses on technical and indexing issues, while Semrush-powered SEO research helps with strategy, content, keywords, and competitive research.

## Custom domains

**Get a custom domain** lets you buy or connect a custom domain without leaving the SEO & AI search tab.

Using a custom domain helps consolidate your brand and search presence under a domain you control. Lovable supports both custom domains and subdomains, and lets you choose one primary domain so all other connected domains redirect to it automatically.

After connecting a custom domain, use the [Google Search Console connector](/integrations/google-search-console) to verify your site and submit your sitemap directly from chat, so Google indexes the correct host.

What you see depends on your project state:

* **Project not published yet**: buy and connect actions are disabled until the project is publicly published.
* **No custom domain yet**: Lovable suggests up to three domain ideas based on your project. Click a suggestion, or click **Search domains** to open the purchase dialog.
* **Already own a domain?** Click **Manage domains** to open **Project settings → Domains** and finish connecting it.
* **Already connected**: the section shows your live domain and links to **Project settings → Domains**.

Buying a domain requires a paid plan and workspace admin or owner permission.

For full setup details, see [Custom domains](/features/custom-domain).

## FAQ

<AccordionGroup>
  <Accordion title="Can my Lovable app rank well in search?">
    Yes. Lovable apps can rank like other modern web apps. New Lovable apps use TanStack Start with server-side rendering by default, and older React + Vite apps use **on-request pre-rendering** on deployed public URLs for **verified crawlers:** Google, Bing, social-preview bots, and AI engines like ChatGPT, Perplexity, Claude, and Gemini.

    Ranking still depends on factors outside Lovable's control, including content quality, search intent, backlinks, competition, performance, and search ranking algorithms.
  </Accordion>

  <Accordion title="How does Lovable handle crawlability?">
    Lovable apps run on one of two stacks, both of which return crawlable HTML to search engines and AI crawlers.

    * **New apps** created from May 13, 2026 use **TanStack Start** with server-side rendering (SSR). Every request returns fully rendered HTML, for humans and crawlers.
    * **Older React + Vite apps** use **on-request pre-rendering** on deployed public URLs. Human visitors get the single-page app experience. When a verified crawler arrives, Lovable renders the page on the fly and returns the resulting HTML. Pre-rendering is only served to **verified crawlers:** Google, Bing, social-preview bots, and AI engines like ChatGPT, Perplexity, Claude, and Gemini. Third-party SEO scanners, link checkers, and other agents will see the regular SPA shell, not the pre-rendered HTML. If you want to verify the pre-rendered output yourself, use Google's URL Inspection tool, the Mobile-Friendly Test, or social-platform link debuggers. Because pre-rendering runs at request time, dynamically loaded content is included.

    Both stacks support SEO and AI search visibility without requiring external pre-rendering services. What still matters is the quality of each page: metadata, content structure, semantic HTML, alt text, structured data, internal links, performance, and backlinks.
  </Accordion>

  <Accordion title="Do I need an external pre-rendering service?">
    No. Lovable-hosted projects do not need an external pre-rendering service for search engines or AI crawlers.

    If your project is on React + Vite, Lovable handles pre-rendering for deployed public URLs, but only for **verified crawlers:** Google, Bing, social-preview bots, and AI engines like ChatGPT, Perplexity, Claude, and Gemini. Other automated agents, including third-party SEO scanners, will see the regular single-page app and not the pre-rendered HTML.

    If your project is on TanStack Start, server-side rendering returns crawlable HTML to every request, so every visitor (humans, crawlers, scanners) sees the same rendered output.
  </Accordion>

  <Accordion title="Can existing React + Vite apps migrate to TanStack Start?">
    Yes. You can [upgrade an existing project to TanStack Start](/features/upgrade-to-tanstack-start), which gives it full server-side rendering. The upgrade runs in your existing project, uses credits, and leaves your published site unchanged until you publish again.

    If you stay on React + Vite, your project continues to get pre-rendering automatically, which makes your content accessible to crawlers.
  </Accordion>

  <Accordion title="Can AI search engines read Lovable apps?">
    Yes. Lovable is designed to serve crawlable content to AI search engines such as ChatGPT, Perplexity, Claude, and Gemini.

    New TanStack Start apps return fully rendered HTML to AI crawlers. Older React + Vite apps use pre-rendering on deployed public URLs so AI crawlers can still access rendered content.

    For best results, make your content easy to understand and cite:

    * Use clear headings and semantic HTML.
    * Add structured data where it fits the page.
    * Keep important facts visible on the page.
    * Write concise, factual answers to common questions.
  </Accordion>

  <Accordion title="Do I need an llms.txt file for AI search visibility?">
    No. Lovable does not require `llms.txt`, and the SEO & AI search review does not treat a missing file as a problem.

    Focus on crawlable HTML, semantic structure, descriptive metadata, structured data, useful content, and links. If your project already has an `llms.txt` file, Lovable continues to serve it.
  </Accordion>

  <Accordion title="Why do social previews show the wrong title or image?">
    Social platforms such as LinkedIn, Slack, Facebook, X/Twitter, and WhatsApp usually read Open Graph metadata directly from the HTML response and often do not execute client-side JavaScript.

    Lovable apps are designed to serve crawlable metadata to social-preview bots, but previews still depend on properly configured Open Graph metadata for each page.

    For best results:

    * Use unique `og:title`, `og:description`, and `og:image` values per route.
    * Avoid generic fallback images across your site.
    * Publish changes before testing previews.
    * Use the platform preview/debugging tools to refresh cached previews.
  </Accordion>

  <Accordion title="How long does it take Google to index my site?">
    Indexing can take from a few hours to a few days, and sometimes longer depending on Google's crawl schedule and your site's authority.

    To help Google discover updates faster:

    * Submit your sitemap in Google Search Console.
    * Use **URL Inspection** for important pages.
    * **Request indexing** for new or updated priority pages.
    * Make sure important pages are linked from your site.
  </Accordion>

  <Accordion title="What should I do if my page is not ranking?">
    Start by confirming that the page can be discovered and indexed:

    * Run an SEO & AI search review.
    * Check indexing in GSC through Coverage or URL Inspection.
    * Ensure your sitemap is submitted and confirm the page is in your sitemap.
    * Make sure it has a unique title and meta description.
    * Review headings, internal links, content quality, and search intent.
    * Confirm technical health: good performance scores, full mobile usability, and no blocked JavaScript or CSS.
    * Build relevant backlinks over time.

    Ranking also depends on competition and content quality, so passing technical checks does not guarantee high rankings.
  </Accordion>

  <Accordion title="Will a custom domain help my SEO?">
    Yes. A custom domain helps you build search presence on a domain you control. It also lets you consolidate branding, backlinks, and canonical URLs under one primary domain.

    Lovable supports custom domains and subdomains. You can choose one primary domain, and other connected domains redirect to it.

    See [Custom domains](/features/custom-domain) for more information.

    After connecting a custom domain, use the [Google Search Console connector](/integrations/google-search-console) to verify your domain and submit your sitemap.

    A `lovable.app` subdomain works well for:

    * MVPs and demos
    * Temporary or experimental landing pages
    * Internal tools
    * Projects driven primarily by social or paid traffic
  </Accordion>

  <Accordion title="What does the SEO & AI search review not check?">
    The review focuses on technical SEO, crawlability, metadata, indexing, accessibility, mobile usability, and related issues that Lovable can detect automatically.

    It does not guarantee rankings or fully evaluate:

    * Content quality and originality
    * Search intent alignment
    * Competitor strength
    * Backlink quality and authority
    * Brand reputation and trust
    * Conversion quality or engagement
    * Whether a topic is worth targeting

    Use the SEO & AI search review to keep your technical foundations healthy, then use Semrush-powered SEO research and your own product knowledge to improve content strategy and authority over time.
  </Accordion>

  <Accordion title="How can I get the best SEO and AEO results with Lovable?">
    Strong SEO and AEO results come from combining good technical foundations, high-quality content, and ongoing iteration.

    Start with the SEO & AI search review to catch issues with metadata, indexing, structured data, accessibility, mobile usability, performance, and crawlability. Then use Semrush-powered SEO research to identify keywords, competitors, backlink opportunities, and content gaps over time.

    Focus on these fundamentals:

    **Content and structure**

    * Write unique, high-quality content.
    * Match real search intent and answer specific questions clearly.
    * Use descriptive headings and semantic HTML.
    * Add structured data where it fits the page.
    * Keep important facts visible in the page HTML.

    **Metadata and discoverability**

    * Use unique titles and descriptions for important pages.
    * Maintain accurate sitemaps and `robots.txt`.
    * Configure Open Graph metadata for social previews.
    * Use a custom domain, set it as the primary domain, and verify it in Google Search Console.

    **Performance and usability**

    * Optimize Core Web Vitals and PageSpeed performance.
    * Ensure strong mobile usability and accessibility.
    * Compress images and use efficient formats like WebP or SVG.

    **Authority and backlinks**

    * Create useful, link-worthy content.
    * Build relevant backlinks over time.
    * Partner with complementary businesses and communities.
    * Share updates, launches, tools, and research publicly.

    Strong rankings and AI visibility usually improve gradually over time as your site gains authority, backlinks, and useful content.
  </Accordion>

  <Accordion title="How often should I maintain SEO and AEO?">
    Review SEO and AEO whenever you publish major changes, add or remove pages, change domains, or update routing.

    Use SEO & AI search review and Google Search Console regularly to monitor crawlability, indexing, metadata, performance, accessibility, and search visibility over time.

    As a baseline:

    * Weekly: check Google Search Console for indexing, coverage, and search performance issues.
    * Monthly: run an SEO & AI search review and review sitemap freshness, titles, descriptions, and Core Web Vitals/PageSpeed performance.
    * Quarterly: run an SEO & AI search review covering canonicals, `robots.txt`, structured data, indexing, performance, accessibility, and mobile usability. Review internal links, refresh declining content, and improve important landing pages as needed.
    * As needed: use Semrush-powered SEO research for keyword research, competitor analysis, backlink opportunities, and identifying new content opportunities.
  </Accordion>
</AccordionGroup>
