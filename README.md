# Vivek Nilapalle — Portfolio

Personal portfolio and project case studies, built with Next.js and statically generated from content stored in this repository. Live at [viveknilapalle.vercel.app](https://viveknilapalle.vercel.app).

Everything personal (profile, skills, education, projects, experiments, posts) lives in [`content/`](content). The UI only reads that data, so **adding a project or an article never requires touching a component**: edit a file, commit, push, and Vercel redeploys.

```text
 edit content/ ──► git push ──► Vercel build ──► static pages updated
```

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with design tokens in [`src/app/globals.css`](src/app/globals.css) |
| Motion | Framer Motion, used sparingly and disabled under `prefers-reduced-motion` |
| Content | JSON + Markdown with front matter (`gray-matter`), validated with Zod at build time |
| Markdown | unified / remark / rehype, GitHub-flavoured Markdown, Shiki syntax highlighting |
| Data | Public GitHub REST API (optional enhancement, cached and revalidated hourly) |
| Hosting | Vercel |

No database, CMS, auth or backend API. The only client-side JavaScript is the navbar, scroll reveals, and the contact page's copy and compose helpers.

## Project structure

```text
content/                  ← all editable data
  profile.json            name, role, intro, socials, focus areas, about page
  skills.json             skill groups (no percentages)
  experience.json         work, education, certifications
  lab.json                experiments & smaller builds
  github.json             GitHub username + featured/excluded repositories
  projects/*.md           one case study per file (front matter + Markdown)
  posts/*.md              one article per file
public/
  images/                 profile photo, about banner, project screenshots
  resume/                 resume PDF
src/
  app/                    routes (/, /about, /projects/[slug], /writing/[slug], …),
                          sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/             reusable UI (Navbar, ProjectCard, SkillGroup, …)
  lib/
    schemas.ts            Zod schemas = the content contract
    content.ts            loaders that read + validate /content
    markdown.ts           Markdown → HTML pipeline
    github.ts             fault-tolerant GitHub client
    site.ts               site URL + per-page metadata helper
```

## Local setup

Requires Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run lint       # ESLint (next/core-web-vitals + TypeScript)
npm run typecheck  # tsc --noEmit
npm run build      # production build — also validates all content
npm start          # serve the production build
```

Optional environment variables (see [`.env.example`](.env.example)):

- `NEXT_PUBLIC_SITE_URL` sets the canonical URL for metadata, the sitemap and Open Graph. It defaults to `siteUrl` in `profile.json`.
- `GITHUB_TOKEN` is a read-only token that raises the GitHub API rate limit. The site works without it.

### With Docker

Only Docker is needed on the host. Node and all dependencies run inside the container.

```bash
docker compose up --build     # http://localhost:3000, with hot reload
docker compose down           # stop
```

- Source is bind-mounted, so edits on the host reload automatically. `node_modules` and `.next` live in Docker volumes, never on the host.
- The container runs `next dev --webpack` with file polling, because Turbopack's file watcher doesn't detect changes on Docker Desktop bind mounts. Production builds still use Turbopack.
- After changing dependencies, refresh the `node_modules` volume with `docker compose down -v && docker compose up --build`.
- Run other scripts in the container, for example `docker compose run --rm web npm run build`. Stop the dev server first, because both use the same `.next` volume.

## Working with content

### Content is validated

Every file in `content/` is checked against the schemas in [`src/lib/schemas.ts`](src/lib/schemas.ts) during the build. A typo fails the build with a message that names the file and the field, for example:

```text
Invalid content in content/projects/my-project.md:
  • summary: Invalid input: expected string, received undefined
  • github: Invalid URL
```

Files whose names start with `_` are ignored, which is how the templates work.

### Add a project

1. Copy [`content/projects/_template.md`](content/projects/_template.md) to `content/projects/<slug>.md`. The filename becomes the URL, `/projects/<slug>`.
2. Put screenshots in `public/images/projects/<slug>/` and reference them as `/images/projects/<slug>/cover.png`.
3. Fill in the front matter. Only `title`, `summary` and `category` are required. Each case-study section (problem, approach, workflow diagram, findings, gallery, learnings, …) renders only when its field is present.
4. The Markdown body becomes the **Implementation** section. Write `##` headings as normal.
5. Set `featured: true` to show it on the homepage, and use `order` to sort.

Technologies listed in a project are matched against `skills.json`. Matching skills are highlighted on `/skills` and linked back to the project automatically.

### Add an article

1. Copy [`content/posts/_template.md`](content/posts/_template.md) to `content/posts/<slug>.md`.
2. Set `title`, `date` (`YYYY-MM-DD`), `description` and `tags`, then write Markdown. Fenced code blocks get syntax highlighting.
3. `draft: true` shows the post in `npm run dev` but leaves it out of production builds.

The post appears on `/writing`, in "Latest notes" on the homepage, and in the sitemap. The homepage section stays hidden until at least one post exists.

### Add a lab entry

Append an object to `entries` in [`content/lab.json`](content/lab.json):

```json
{
  "title": "Experiment name",
  "description": "One or two sentences.",
  "type": "ML experiment",
  "technologies": ["Python"],
  "repo": "https://github.com/viveknilapalle/repo",
  "date": "2026-10"
}
```

Entries are grouped by `type` on `/lab` and sorted by date.

### Update profile, skills or experience

- **Profile / hero / about:** edit [`content/profile.json`](content/profile.json). `intro` is the hero paragraph, `focus` drives "What I build", and `about` drives the About page.
- **Skills:** edit [`content/skills.json`](content/skills.json). Add an item to a group, or add a new group with a unique `id`.
- **Experience:** add roles to `work` in [`content/experience.json`](content/experience.json). Each role takes `company`, `role`, `start`, `end`, `description`, `responsibilities` and `technologies`. The work timeline appears on `/experience` and on the homepage once the first role is added.
- **Resume:** replace `public/resume/vivek-nilapalle-resume.pdf`, or point `resume` in `profile.json` at a new file.

### GitHub integration

[`content/github.json`](content/github.json) sets which account to read, which repositories to feature on `/projects`, and which to hide. The live data covers the public repo count, a language breakdown and recently updated repositories. It is fetched at build time and refreshed hourly with ISR.

If the API is unavailable or rate-limited, the GitHub panels are omitted and every other page renders normally. There are no loading spinners because the data never reaches the browser as a pending request.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. The framework preset is detected as Next.js, so no build settings need changing.
3. Optionally add `NEXT_PUBLIC_SITE_URL` (your production domain) and `GITHUB_TOKEN` under **Settings → Environment Variables**.
4. Deploy. Every push to `main` triggers a new production deployment, and pull requests get preview URLs.

## Accessibility & performance notes

- Semantic landmarks, one `h1` per page, a skip link, visible focus styles, and labelled icon buttons.
- The mobile menu has `aria-expanded`/`aria-controls`, traps focus while open, closes on Escape and on navigation, and returns focus to its toggle.
- `prefers-reduced-motion` disables the CSS animations, and Framer Motion drops its transforms.
- Every route is statically generated, images go through `next/image` (AVIF/WebP, lazy-loaded below the fold), and fonts are self-hosted via `next/font`.
