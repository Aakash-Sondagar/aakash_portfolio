# Aakash Sondagar — Software Engineer Portfolio

A minimalist, high-performance developer portfolio and writing platform built with Next.js 16 (App Router, Turbopack), Tailwind CSS v4, and Content Collections.

---

## 🛠️ Tech Stack

- **Core**: Next.js 16 (React 19, Turbopack)
- **Styling**: Tailwind CSS v4, PostCSS, HSL curated dark-mode system
- **Content compiler**: Content Collections (dynamic MDX parsing & bundling)
- **Testing**: Vitest, React Testing Library, JSDOM, Coverage v8
- **Analytics**: Vercel Analytics

---

## ✨ Features

- **Dynamic Dark Mode**: Curated light/dark theme matching system configurations with flash-of-unstyled-theme prevention.
- **Mermaid.js Diagrams**: Native support for standard diagram blocks (` ```mermaid `) using lightweight client-side lazy-loading (zero bundle impact).
- **SEO & Schema Optimized**: Auto-generated XML Sitemaps, RSS feeds (`/feed.xml`), and custom JSON-LD structured search schema.
- **Fast Image Favicons**: Automated favicon loading overrides for target corporate logos.
- **Accessibility**: Screen reader skip-to-content links and semantically correct layouts.

---

## 📁 File Structure

```text
├── app/                  # Next.js App Router pages, api endpoints, and layouts
│   ├── components/       # Reusable React components (Navbar, Footer, ThemeProvider)
│   ├── favorites/        # Grid directory of curated links
│   ├── writing/          # Blog listing, individual post view, and writer preview
│   └── globals.css       # Core Tailwind config and custom font definitions
├── config/               # Site configuration configurations
│   ├── site.content.ts   # Core site content (Bio text, work items, and social links)
│   └── site.types.ts     # TypeScript type definitions
├── content/              # Blog essays in Markdown/MDX
├── lib/                  # Helper utilities (posts compiling, sitemaps, JSON-LD)
├── public/               # Static public assets (images, profile graphics, custom logos)
├── __tests__/            # Complete unit test suite
├── next.config.ts        # Next.js configuration properties
└── mdx-components.tsx    # MDX custom component bindings (Callout, Figure, YouTube)
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the local site.

### 3. Run Tests
```bash
# Interactive watch mode
npm run test

# Run once
npm run test:run

# Run with test coverage report
npm run test:coverage
```

### 4. Build Production Compilation
```bash
npm run build
```

---

## ✍️ Writing Content

Blog posts live in the `content/` folder as standard Markdown/MDX files. The metadata config is declared using YAML frontmatter:

```yaml
---
title: My First Essay
description: A short teaser summary of my post for search engine indexing.
publishDate: 28.Jun.2026
author: Aakash Sondagar
ogImage: https://aakashsondagar.vercel.app/assets/og-images/og-default.jpg
keywords: engineering, startup, nextjs
visibility: public # Set to "unlisted" to hide from index listings while keeping shareable URL
---
```

### Supported Custom Blocks:
Import components at the top of the file:
```mdx
import { Callout, Figure, YouTube } from "@/mdx-components"
```

- **Callouts**:
  ```html
  <Callout type="note" title="Note Title">Your message here</Callout>
  ```
- **Figures**:
  ```html
  <Figure src="/assets/profile.png" alt="Description" caption="Figure Caption" />
  ```
- **YouTube Embeds**:
  ```html
  <YouTube id="dQw4w9WgXcQ" title="Embed Title" />
  ```

---

## 📊 Deployment

This project is fully ready for deployment on **Vercel**. 
When pushing to a connected GitHub branch, Vercel will run `npm run build` and publish it dynamically.
