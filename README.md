This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Header Theme Consistency (Home Page)

This update standardizes the visual styling of all header title views on the home page to match the theme used in the “Explore Collections” section.

### What changed
- Targeted Solutions ("Shop by Lifestyle")
  - Centered label with accent lines on both sides
  - Title typography unified (`text-4xl lg:text-5xl`, `font-extralight`, `text-foreground`, `tracking-tight`)
  - Italic accent sub-line for “Lifestyle” (`text-accent/80`)
  - Description styled consistently (`text-lg font-light text-secondary`)
- Our Philosophy ("Formulations rooted in tradition")
  - Centered label with accent lines
  - Unified title typography with italic accent sub-line for “rooted in”
  - Consistent description styling
- Latest Insights ("From our knowledge hub")
  - Centered label with accent lines
  - Unified title typography with italic accent sub-line for “knowledge hub”

### Principles applied
- Font family, size, weight, color, alignment, padding, background, and borders now follow one pattern across sections.
- Responsiveness preserved at all breakpoints using Tailwind classes (`text-4xl lg:text-5xl`, spacing utilities, containers).
- Existing interactions (links, motion animations, carousels) remain unchanged.

### Verification
- Tested in development at `http://localhost:3004/` and production at `http://localhost:3005/`.
- Confirmed consistent rendering across breakpoints and sections.

### Files touched
- `src/app/page.tsx`
  - Updated header blocks for Targeted Solutions, Our Philosophy, Latest Insights.
