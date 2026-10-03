---
# Files starting with "_" are ignored by the site. Copy this file to
# content/projects/<slug>.md — the filename becomes the URL: /projects/<slug>.
# Only title, summary and category are required; every section below is
# optional and simply doesn't render when it's missing.

title: Project title
summary: One or two sentences for cards and search results.
category: Machine Learning            # groups projects on /projects
technologies: [Python, Pandas]        # also links matching skills on /skills
image: /images/projects/<slug>/cover.png   # put images in public/images/projects/<slug>/
imageAlt: Describe what the screenshot shows
github: https://github.com/<user>/<repo>
# demo: https://example.com
featured: true                        # shown on the homepage
order: 10                             # lower numbers come first
status: Completed                     # or "In progress"
date: 2026-01                         # YYYY-MM or YYYY-MM-DD
# dataset: Name of the dataset (size)

# Key facts strip (up to 4). Use real numbers only.
# highlights:
#   - value: "1,234"
#     label: rows analysed

# problem: >-
#   What question or need started the project?
# approach: >-
#   How you tackled it, at a high level.
# workflow:                           # rendered as a pipeline diagram
#   - title: Ingest
#     detail: Where the data came from
#   - title: Model
#     detail: What you built
# architecture:                       # optional diagram image
#   src: /images/projects/<slug>/architecture.png
#   alt: Describe the diagram
# challenges: [What was hard and how you solved it]
# outcome: >-
#   What the finished project does or showed.
# findings: [A concrete result from the analysis]
# learnings: [Something you'd do differently next time]
# nextSteps: [Planned improvement]
# gallery:
#   - src: /images/projects/<slug>/screen-1.png
#     alt: Describe the screenshot
#     caption: Optional caption
---

The Markdown body becomes the **Implementation** section. Write `##` headings
as usual; they're nested under the section automatically.
