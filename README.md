# Babu Kaliyamoorthy — Portfolio

A premium, production-ready portfolio website for a Senior Android Engineer, built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion. Statically exported so it can be deployed for free on GitHub Pages.

## Tech Stack

- **Next.js 14** (App Router, static export)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for animation
- **Lucide Icons**
- **next-themes** for dark/light mode

## Features

- Animated hero with typing effect, floating tech badges and a canvas particle background
- Scroll-spy navigation with a scroll progress bar and back-to-top button
- Animated statistics counters, skills grid, and a responsive timeline for experience
- Dark/light theme toggle (dark by default, matching the brand palette)
- SEO: metadata, Open Graph/Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`
- Generated favicon, apple-touch-icon, PWA icons and Open Graph image
- A generated one-page resume PDF (`public/resume.pdf`) wired to the "Download Resume" button
- Fully responsive, keyboard accessible, and built for a 95+ Lighthouse score

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/            # App Router pages, layout, metadata routes (sitemap.ts, robots.ts)
  components/     # UI sections and reusable components
  components/icons/  # Custom SVG tech logos (Kotlin, Android, Compose, Hilt, MVVM)
  data/resume.ts  # Single source of truth for all resume content
  lib/utils.ts    # Small class-name merge helper
public/           # Static assets (favicon, icons, og-image, resume.pdf)
```

To update content (experience, skills, stats, etc.), edit [`src/data/resume.ts`](src/data/resume.ts) — every section reads from this file.

## Updating Your Resume PDF

`public/resume.pdf` is a generated placeholder built from the content in `src/data/resume.ts`. Replace it with your real resume file (keep the filename `resume.pdf`, or update `personal.resumeFile` in `src/data/resume.ts`) whenever you want the "Download Resume" button to serve a different file.

## Contact Form

The contact form works without a backend by composing a `mailto:` link with the visitor's message pre-filled. If you'd prefer real form submissions (e.g. via [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com)), swap the `handleSubmit` logic in [`src/components/Contact.tsx`](src/components/Contact.tsx) for a fetch call to your provider.

## Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that builds and deploys automatically on every push to `main`.

### 1. Push this project to a GitHub repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Enable GitHub Pages via Actions

In your repository on GitHub: **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.

### 3. Push to `main`

The workflow will build the site (`next build` with `output: 'export'`) and deploy the `out/` directory to GitHub Pages automatically. You can also trigger it manually from the **Actions** tab (`workflow_dispatch`).

### How `basePath` is handled

`next.config.mjs` automatically detects the repository name from the `GITHUB_REPOSITORY` environment variable (set by GitHub Actions):

- **Project page** (`https://<username>.github.io/<repo>`): `basePath` is set to `/<repo>` automatically — no changes needed.
- **User/org page** (repo named `<username>.github.io`): `basePath` is left empty automatically.
- **Custom domain**: add a `public/CNAME` file containing your domain, and the site will be served with no `basePath`. You may want to force `basePath` to `''` in that case (it already is, since a custom-domain repo is typically named `<username>.github.io` or you can rename the repo to match).

### Updating SEO URLs

The canonical URL, sitemap and JSON-LD in [`src/app/layout.tsx`](src/app/layout.tsx), [`src/app/sitemap.ts`](src/app/sitemap.ts) and [`src/app/robots.ts`](src/app/robots.ts) are set to `https://babukaliyamoorthy.github.io`. Update this constant/URL in all three files to match your actual GitHub Pages (or custom domain) URL after deploying.

## Building Locally

```bash
npm run build
```

The static site is emitted to `out/`. You can preview it with any static file server, e.g.:

```bash
npx serve out
```

## License

Personal portfolio source — feel free to fork and adapt for your own use.
