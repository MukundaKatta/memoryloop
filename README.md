# MemoryLoop

> Bring old photos back to life.

Restore grainy family photos in one tap. Turn them into short videos you actually want to share.

## Stack

- **Next.js 15.3.1** · App Router · TypeScript strict
- **Tailwind v4** (`@tailwindcss/postcss`, CSS-first, no config file)
- `next/font/google` for Inter
- `pnpm` package manager

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo widget, features, waitlist form |
| `/try` | Upload a grainy photo → mocked CSS restore → before/after slider |
| `/api/waitlist` | POST `{ email }` → forwards to waitlist-api-sigma with `product: "memoryloop"` |

## Deploy

Zero config on Vercel — Next.js is auto-detected. No environment variables required.

```bash
pnpm build   # verify clean build locally
```

## Status

v0 skeleton — landing preserved, `/try` demo wired with CSS mock filters (no real AI call yet).

- **Live**: https://memoryloop.vercel.app
