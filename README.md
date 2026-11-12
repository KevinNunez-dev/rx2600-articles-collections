# RX2600 Therapy Library

An Astro static-site starter for the RX2600 practice-marketing hub and education library.

The project is designed to build pages under `/therapy/` for deployment alongside the main `rx2600.com` website. It uses an original visual direction and starter copy; it does not reuse competitor branding, text, or imagery.

## Requirements

- Node.js 22.19 or later
- npm

## Local development

```powershell
npm install
npm run dev
```

The library home is available at `/therapy/`.

## Add an article

1. Copy `src/content/articles/example-article.md` and rename it to the desired URL slug.
2. Replace the example metadata and copy with original, fact-checked article content.
3. Keep `draft: true` and `seo.noindex: true` while the article is being prepared.
4. After appropriate clinical and brand review, set `draft: false` and `seo.noindex: false`.
5. Run `npm run build` and inspect the generated page and sitemap before deployment.

Article URLs use `/therapy/<filename>/`. The frontmatter schema in `src/content.config.ts` validates metadata at build time. Drafts can be previewed at their direct URLs while running `npm run dev`, but are excluded from the production build and sitemap.

The initial business, physical therapy, chiropractic, sports performance, and practice-revenue articles are unpublished editorial drafts. Their copy, clinical statements, business guidance, and images require review and approval before publication.

The three practice-growth articles are configured for production at their own `/therapy/<slug>/` URLs. Review their copy, claims, and media before deployment; `draft: false` and `seo.noindex: false` make them public and eligible for indexing, not automatically indexed by search engines.

The searchable article archive is `/therapy/articles/`. Header searches use the `q` query parameter; filtering runs in the browser over published article titles, descriptions, categories, and tags. Without JavaScript, the archive still lists all published articles.

## Build and preview

```powershell
npm run build
npm run preview
```

The static output is written to `dist/`; the pages are under `dist/therapy/`. Shared build assets are emitted under `dist/therapy/_astro/`. The project includes `wrangler.jsonc` targeting the `dist/` output for a Cloudflare static-assets deployment.

The generated sitemap is `/therapy/sitemap.xml`. Add that URL to the existing `rx2600.com` robots.txt or sitemap index when integrating this library with the main site.

## Before launch

- Replace all starter copy with approved RX2600 product and health content.
- Confirm every capability, treatment statement, image, and claim with the appropriate product and clinical reviewers.
- Add approved RX2600 contact links, social metadata, and brand assets.
- Ensure deployment serves `/therapy/` and `/therapy/_astro/` from this build without changing the existing website's root routes.
- Verify canonical URLs, the sitemap, and live pages on the intended domain after deployment.

## Media sources

The starter uses selected assets from the public RX2600 WordPress media library:

- `public/therapy/media/rx2600-robot.png`: [RX2600 treatment head](https://rx2600.com/wp-content/uploads/2024/04/robot-up-close-transparent.png), media ID 2720.
- `public/therapy/media/rx2600-showcase.jpg`: [RX2600 in a clinical setting](https://rx2600.com/wp-content/uploads/2025/02/rpt-robot-showcase-scaled.jpg), media ID 3385.
- `public/therapy/media/rx2600-logo-white.png`: [RX2600 logo](https://rx2600.com/wp-content/uploads/2025/02/RX2600-logo-in-white-1024x401.png), media ID 3392 (1024px variant).
- `public/therapy/media/rx2600-clinicians.jpg`: [clinicians and RX2600 systems](https://rx2600.com/wp-content/uploads/2025/02/Robots-and-2-therapists-1024x683.jpg), media ID 3182 (1024px variant).
- `public/therapy/media/rpt-treatment.jpg`: [clinician using RX2600](https://rptclinic.com/wp-content/uploads/2025/12/rpt-process-3-scaled.jpg), from the RPT Clinic WordPress media library.

Confirm the right to reuse each image and any depicted individuals' permissions before publishing. The media files are local to the build; the REST API is not needed at runtime. Existing WordPress pages are references only and are not imported as articles.

The homepage links to the existing RX2600 inquiry form and the existing physical therapy, chiropractic, and sports pages while the new topic pages remain unpublished. Review the current Growth Partner Program terms and all marketing claims before deployment.
