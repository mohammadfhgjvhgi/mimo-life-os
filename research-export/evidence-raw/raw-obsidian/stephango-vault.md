[Steph Ango](/) / [Writing](/) [About](/about) [Now](/now)

# How I use Obsidian

I use [Obsidian](/obsidian) to think, take notes, write essays, and
publish this site. This is my bottom-up approach to note-taking and
organizing things I am interested in. It embraces chaos and laziness to
create emergent structure.

In Obsidian, a “vault” is simply a folder of files. This is important
because it adheres to my [file over app](/file-over-app) philosophy. If
you want to create digital artifacts that last, they must be files you
can control, in formats that are easy to retrieve and read. Obsidian
gives you that freedom.

The following is in no way dogmatic, just one example of how you can use
Obsidian. Take the parts you like.

## Vault template

1.  [Download my
    vault](https://github.com/kepano/kepano-obsidian/archive/refs/heads/main.zip)
    or clone it from [the Github
    repo](https://github.com/kepano/kepano-obsidian).
2.  Unzip the `.zip` file to a folder of your choosing.
3.  In Obsidian open the folder as a vault.

## Theme and related tools

-   My theme [Minimal](/minimal) with the [Flexoki](/flexoki) color
    scheme.
-   [Obsidian Web Clipper](/obsidian-web-clipper) to save articles and
    pages from the web, see my [clipper
    templates](https://github.com/kepano/clipper-templates) for specific
    sites I clip from.
-   [Obsidian Sync](https://obsidian.md/sync) to sync notes between my
    desktop, phone and tablet.
-   [Obsidian Bases](https://help.obsidian.md/bases) to view notes by
    category.
-   [Obsidian Maps](https://help.obsidian.md/bases/views/map) for maps
    used in some of my templates.

## Personal rules

Rules I follow in my personal vault:

-   Avoid splitting content into multiple vaults.
-   Avoid folders for organization.
-   Avoid non-standard Markdown.
-   Always pluralize categories and tags.
-   Use internal links profusely.
-   Use `YYYY-MM-DD` dates everywhere.
-   Use the 7-point scale for ratings.
-   Keep [a single to-do list](/todos) per week.

Having a [consistent style](/style) collapses hundreds of future
decisions into one, and gives me focus. For example, I always pluralize
tags so I never have to wonder what to name new tags. Choose rules that
feel comfortable to you and write them down. Make your own style guide.
You can always change your rules later.

## Folders and organization

I use very few folders. I avoid folders because many of my entries
belong to more than one area of thought. My system is oriented towards
speed and laziness. I don’t want the overhead of having to consider
where something should go.

I do not use nested sub-folders. I do not use the file explorer much for
navigation. I mostly navigate using the quick switcher, backlinks, or
links within a note.

My notes are primarily organized using the `categories` property.
Categories display an overview of related notes, using the
[bases](https://help.obsidian.md/bases) feature in Obsidian.

**Most of my notes are in the root of the vault**, not a folder. This
where I write about my personal world: journal entries, essays,
[evergreen](/evergreen-notes) notes, and other personal notes. If a note
is in the root, I know it’s something I wrote, or relates directly to
me.

Two reference folders I use:

-   **References** where I write about things that exist outside my
    world. Books, movies, places, people, podcasts, etc. Always named
    using the title e.g. `Book title.md` or `Movie title.md`.
-   **Clippings** where I save things other people wrote, mostly essays
    and articles.

Three admin folders exist so that their contents don’t show up in the
file navigation:

-   **Attachments** for images, audio, videos, PDFs, etc.
-   **Daily** for my daily notes, all named `YYYY-MM-DD.md`. I do not
    write anything in daily notes, they exist solely to be linked to
    from other entries.
-   **Templates** for templates.

Two folders are present in the downloadable version of my vault for the
sake of clarity. In my personal vault, these notes would be in the root,
not a folder.

-   **Categories** contains top-level overviews of notes per category
    (e.g. Books, Movies, Podcasts, etc).
-   **Notes** contains example notes.

## Links

I use internal links profusely throughout my notes. I try to always link
the first mention of something. My journal entries are often a stream of
consciousness cataloging recent events, finding connections between
things. Often the link is *unresolved*, meaning that the note for that
link isn’t created yet. Unresolved links are important because they are
breadcrumbs for future connections between things.

A journal entry in the **root** of my vault might look something like
this:

    I went to see the movie [[Perfect Days]] with [[Aisha]] at [[Vidiots]] and had Filipino food at [[Little Ongpin]]. I loved this quote from Perfect Days: [[Next time is next time, now is now]]. It reminds me of the essay ...

The movie, movie theater, and restaurant each link to entries in my
**References** folder. In these reference notes I capture properties, my
rating, and thoughts about that thing. I use [Web
Clipper](/obsidian-web-clipper) to help populate properties from
databases like IMDB. The quote was meaningful to me, so it became an
[evergreen note](/evergreen-notes) in my root folder. The essay I
mention is in my **Clippings** folder, because I didn’t write it myself.

This heavy linking style becomes more useful as time goes on, because I
can trace how ideas emerged, and the branching paths these ideas
created.

## Fractal journaling and random revisit

Fractal journaling and randomization are how I tame the wilderness that
a knowledge base can grow into.

Throughout the day I use Obsidian’s *unique note* hotkey to write
individual thoughts as they come up. This shortcut automatically creates
a note with the prefix `YYYY-MM-DD HHmm` to which I may add a title that
describes the idea.

Every few days I review these journal fragments and compile the salient
thoughts. I then review those reviews monthly, and review the monthly
reviews yearly (using [this template](/40-questions)). The result is a
fractal web of my life that I can zoom in and out of at varying degrees
of detail. I can trace back where individual thoughts came from, and how
they bubbled up into bigger themes.

Every few months I set aside time for a “random revisit”. I use
the *random note* hotkey to quickly travel randomly through my vault. I
often use the local graph at shallow depth to see related notes. This
helps me revisit old ideas, create missing links, and find inspiration
in past thoughts. It’s also an opportunity to do maintenance, like fix
formatting based on new rules in my personal style guide.

People have asked me if this could be automated with language models but
I do not care to do so. I enjoy this process. Doing this maintenance
helps me understand my own patterns. [Don’t delegate
understanding](/understand).

## Properties and templates

Almost every note I create starts from a
[template](https://github.com/kepano/kepano-obsidian/tree/main/Templates).
I use templates heavily because they allow me to lazily add information
that will help me find the note later. I have a template for every
category with [properties](https://help.obsidian.md/properties) at the
top, to capture data such as:

-   **Dates** — created, start, end, published
-   **People** — author, director, artist, cast, host, guests
-   **Themes** — grouping by genre, type, topic, related notes
-   **Locations** — neighborhood, city, coordinates
-   **Ratings** — more on this below

A few rules I follow for properties:

-   Property names and values should aim to be reusable across
    categories. This allows me to find things across categories, e.g.
    `genre` is shared across all media types, which means I can see an
    archive of *Sci-fi* books, movies and shows in one place.
-   Templates should aim to be composable, e.g. *Person* and *Author*
    are two different templates that can be added to the same note.
-   Short property names are faster to type, e.g. `start` instead of
    `start‑date`.
-   Default to `list` type properties instead of `text` if there is any
    chance it might contain more than one link or value in the future.

The
[.obsidian/types.json](https://github.com/kepano/kepano-obsidian/blob/main/.obsidian/types.json)
file lists which properties are assigned to which types (i.e. `date`,
`number`, `text`, etc).

## Rating system

Anything with a `rating` uses an integer from 1 to 7:

-   7 — **Perfect**, must try, life-changing, go out of your way to seek
    this out
-   6 — **Excellent**, worth repeating
-   5 — **Good**, don’t go out of your way, but enjoyable
-   4 — **Passable**, works in a pinch
-   3 — **Bad**, don’t do this if you can
-   2 — **Atrocious**, actively avoid, repulsive
-   1 — **Evil**, life-changing in a bad way

Why this scale? I like rating out of 7 better than 4 or 5 because I need
more granularity at the top, for the good experiences, and 10 is too
granular.

## Publishing to the web

This site is written, edited, and published directly from Obsidian. To
do this, I break one of my rules listed above — I have a separate vault
for my site. I use a *static site generator* called
[Jekyll](https://jekyllrb.com/) to automatically compile my notes into a
website and convert them from Markdown to HTML.

My publishing flow is easy to use, but a bit technical to set up. This
is because I like to have full control over every aspect of my site’s
layout. If you don’t need full control you might consider [Obsidian
Publish](https://obsidian.md/publish) which is more user-friendly, and
what I use for my [Minimal documentation
site](https://minimal.guide/publish/download).

For this site, I push notes from Obsidian to a GitHub repo using the
[Obsidian Git](https://obsidian.md/plugins?id=obsidian-git) plugin. The
notes are then automatically compiled using
[Jekyll](https://jekyllrb.com/) with my web host
[Netlify](https://www.netlify.com/). I also use my [Permalink
Opener](/permalink-opener) plugin to quickly open notes in the browser
so I can compare the draft and live versions.

The color palette is [Flexoki](/flexoki), which I created for this site.
My Jekyll template is not public, but you can get similar results from
[this
template](https://github.com/maximevaillancourt/digital-garden-jekyll-template)
by Maxime Vaillancourt. There are also many alternatives to Jekyll you
can use to compile your site such as
[Quartz](https://quartz.jzhao.xyz/), [Astro](https://astro.build/),
[Eleventy](https://www.11ty.dev/), and [Hugo](https://gohugo.io/).

## Related writing

-   [File over app](/file-over-app)
-   [Concise explanations accelerate progress](/concise)
-   [Evergreen notes turn ideas into objects that you can
    manipulate](/evergreen-notes)
-   [40 questions to ask yourself every year](/40-questions)
-   [40 questions to ask yourself every decade](/40-questions-decade)
-   [How I do my to-dos](/todos)

[Receive my updates](/subscribe)

Follow me via email, [RSS](/feed.xml), [X](https://x.com/kepano),
[Mastodon](https://mastodon.social/@kepano),
[Bluesky](https://bsky.app/profile/stephango.com), and [other
options](/subscribe)

[![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCA0MCA0MCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgY2xhc3M9InJvdW5kIiBhbHQ9IlN0ZXBoIEFuZ28iIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNGRkUxQzU7IGJvcmRlci1yYWRpdXM6NTAlOyI+CiAgICAgICAgICA8ZyBjbGlwLXBhdGg9InVybCgjYSkiPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjRkZFMUM1IiBkPSJNNDAgMTkuOTlBMTkuOTkgMTkuOTkgMCAwIDAgMjAgMGExOS45OSAxOS45OSAwIDEgMCAyMCAxOS45OFoiIC8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yNi45MyA3LjkyYTguOTUgOC45NSAwIDAgMC0yLjk4LjQ1Yy0yLjA0LjY1LTIuMS43LTEuOCAxLjQ2LjIzLjU4LjUxLjg0LjguNzZsMS40Mi0uNDdjMS4yMi0uNCAxLjIyLS40IDIuNDctLjQyLjcgMCAxLjQzIDAgMS42NC4wMi40Mi4wNCAxLjM3LjQ1IDIuNCAxLjA0LjM5LjIzLjkuNDggMS4xNC41OC41My4yLjU3LjE4LjktLjQ2LjQtLjczLjM0LTEtLjI1LTEuMjFhNi4wMiA2LjAyIDAgMCAxLTEuMy0uNjNjLS4yNy0uMTctLjgzLS40Ni0xLjI2LS42Ni0uNy0uMzEtLjg2LS4zNi0xLjUtLjQxLS40LS4wMy0xLjE1LS4wNS0xLjY4LS4wNVptLTE1Ljk5LS4xNWMtLjc4LjAzLTEuNzkuMTktMi4zNS4zOC0xLjIuNC0yLjggMS40NS0zLjIgMi4wOC0uMjkuNDQtLjMuNS0uMS45OS4yNS42Ni41Ni42NiAxLjUtLjAzIDEuNzktMS4zMyAyLjk2LTEuNzIgNC45OC0xLjYzLjg0LjA0Ljg1LjA1IDEuMy4zMi41Ny4zOC45OC40OSAxLjI2LjM0LjI2LS4xMy42Ni0uODIuNy0xLjIuMDItLjI0IDAtLjMtLjIxLS40M2ExLjI0IDEuMjQgMCAwIDAtLjUxLS4xM2MtLjIgMC0uMzktLjA3LS43LS4yNy0uNC0uMjctLjQ2LS4yOC0xLjMyLS4zNmExNy41IDE3LjUgMCAwIDAtMS4zNS0uMDZabTcuNzcgMi45MmEuNjUuNjUgMCAwIDEtLjI5LjA0Yy0uMjUtLjAyLS40My4yNS0uNDcuNzEtLjAzLjIyLS4xOC44LS4zNiAxLjI4YTQ2LjUgNDYuNSAwIDAgMC0uNjcgMi4xMWMtLjQxIDEuNDUtMS4xNiAzLjczLTIuMSA2LjM3bC0uODYgMi41Yy0uMjcuODQtLjkyIDMuMTYtLjk1IDMuMzktLjAzLjMuMzcgMS4xNi42NCAxLjQuNDkuNC44Mi40MyA0LjI1LjI1YTcxIDcxIDAgMCAxIDEuODctLjA3Yy44OC0uMDMgMi4xNi0uNDkgMi40LS44NmwuMjItLjM3Yy4wNS0uMDguMS0uMjkuMTItLjQ4LjAzLS4zMS4wMS0uMzUtLjItLjQ2LS4zNS0uMTgtLjk1LS4xMy0xLjY4LjE1LS40My4xNy0uNzcuMjQtMS4xMi4yNC0uMjggMC0uOTQuMDMtMS40Ni4wNy0yLjAyLjExLTMuMy4xMy0zLjM3LjAzLS4wMy0uMDQuNDgtMS44Ny43MS0yLjU3LjA5LS4zLjQ4LTEuNDEuODYtMi41YTE1My44IDE1My44IDAgMCAwIDIuMTYtNi41NGMuMzEtMS4wMi43LTIuMi44My0yLjY0LjE1LS40My4zLTEgLjMyLTEuMjguMDUtLjQ3LjA0LS41LS4xNy0uNjUtLjI1LS4xNy0uNDktLjIyLS42OC0uMTJabTExLjU5IDIuODVjLS4xNC4wNC0uMzIuMTUtLjM3LjI1bC0uNC42N2EzLjY1IDMuNjUgMCAwIDEtMS43MiAxLjRjLS40NC4xNy0xLjIzLjEzLTEuNzYtLjA3LS4yNy0uMS0uOTUtLjctMS4yMi0xLjA4YTEuOCAxLjggMCAwIDAtLjQtLjM3Yy0uMjItLjE1LS4zLS4xNy0uNjYtLjEzLS4yOS4wMi0uNDUuMDktLjU0LjItLjEzLjE2LS4xMi4yLjA2LjczLjIuNi41NiAxLjA2IDEuMzYgMS43Ny42Mi41NyAxLjAzLjcxIDIuMTkuOC45MS4wNi45NS4wNiAxLjU2LS4xN2E0LjgzIDQuODMgMCAwIDAgMi43My0yLjdjLjM1LS43My4zNy0xLjAxLjEtMS4yLS4yNi0uMTYtLjU1LS4xOS0uOTItLjFabS0xNi4wNi0uMS0uMjkuMDRjLS4xNC4wMi0uMzMuMTctLjYuNDgtLjM4LjQ0LTEuMDUuOS0xLjY0IDEuMTMtLjUuMi0xLjMuMjctMS44My4xN2EyLjE3IDIuMTcgMCAwIDEtMS40LS44OWMtLjM2LS40NC0uNzYtLjc2LTEuMDItLjc4LS4zMi0uMDQtLjc4LjEtLjg3LjI2LS4wNy4xMy0uMDYuMjcuMDYuNjMuMjguOCAxLjM0IDEuOTQgMi4xNiAyLjMzLjg1LjM5IDIuNTguMzQgMy42Ny0uMTEgMS4zMi0uNTUgMi41OC0xLjg0IDIuNjctMi43NC4wMy0uMjMgMC0uMy0uMTUtLjM5LS4xOC0uMS0uNTgtLjE3LS43Ni0uMTNaTTI4LjkgMjguNjVjLS4yLjA1LS4zOC4yLS42OC41N2ExMi42MSAxMi42MSAwIDAgMS05LjM3IDMuNzRjLS44LS4wOC0xLjIyIDAtMS4zLjIzLS4xLjI0LjE1Ljk1LjQyIDEuMjQuMTguMjEuMjUuMjQuODMuMy44OC4wOCAzLjEzLS4yIDQuNDYtLjU1LjctLjE3IDIuMDQtLjc0IDIuODctMS4xN2ExMy4zNyAxMy4zNyAwIDAgMCAzLjEyLTIuNDEgMy44NyAzLjg3IDAgMCAwIC42NC0xYy4wNC0uMDEuMDktLjIuMTEtLjQuMDMtLjM0LjAyLS40LS4xNS0uNDhhMS40MyAxLjQzIDAgMCAwLS45NS0uMDdaIiAvPgogICAgICAgICAgPC9nPgogICAgICAgICAgPGRlZnM+CiAgICAgICAgICAgIDxjbGlwcGF0aCBpZD0iYSI+CiAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg0MHY0MEgweiIgLz4KICAgICAgICAgICAgPC9jbGlwcGF0aD4KICAgICAgICAgIDwvZGVmcz4KICAgICAgICA8L3N2Zz4=)](/about "About me")
[GitHub](https://www.github.com/kepano)
