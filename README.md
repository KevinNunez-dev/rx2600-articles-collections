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

The condition, business, physical therapy, chiropractic, sports performance, and practice-revenue articles are configured for publication. Their copy, clinical statements, business guidance, and images require review and approval before deployment. The example article remains an unpublished template.

The three practice-growth articles are configured for production at their own `/therapy/<slug>/` URLs. Review their copy, claims, and media before deployment; `draft: false` and `seo.noindex: false` make them public and eligible for indexing, not automatically indexed by search engines.

The searchable article archive is `/therapy/articles/`. Header searches use the `q` query parameter; filtering runs in the browser over published article titles, descriptions, categories, and tags. Without JavaScript, the archive still lists all published articles.

The homepage journal displays the five most recently updated published articles in a featured grid and all published articles in a horizontally scrollable rail. Drafts and noindex entries are excluded; the rail remains scrollable without JavaScript.

The business landing page is `/therapy/business/`. Its program terms, cost information, financial example, clinical claims, and media require review before publication; request current fee and eligibility details from RX2600 rather than assuming an unpublished amount.

Article pages render key takeaways as cards, Markdown level-two headings as an on-page contents menu, FAQ entries as expandable questions, and published entries listed in `related` as linked cards. Use Markdown lists to make practical steps scannable; draft and noindex articles do not appear in related cards.

Condition articles can use `anatomyModel` to display a Sketchfab-hosted iframe, not a locally hosted Three.js asset. The browser loads the viewer lazily as it approaches the viewport; Sketchfab may receive visitors' IP addresses and use cookies or similar technologies without a separate click. Review the site's privacy disclosures and any applicable consent requirements before deployment. Models include:

- Sciatica: [Deep muscles of the pelvis and Sacral plexus](https://sketchfab.com/3d-models/deep-muscles-of-the-pelvis-and-sacral-plexus-be6b3bfa96504111b79e5f37ccc27935) by [Q.art](https://sketchfab.com/Q.art).
- Back pain: [Lumbar Spine](https://sketchfab.com/3d-models/lumbar-spine-a45209131d464ad9b4e1a2d7735860fe) by [dennislo](https://sketchfab.com/dennislo), listed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); embedded without changes.
- Carpal tunnel: [All hand bones, muscles, nerves](https://sketchfab.com/3d-models/all-hand-bones-muscles-nerves-e7e3151818a04286a49b1fa428d58931) by [mosa-azazmah](https://sketchfab.com/mosaazazmah).

The site owner confirmed permission for commercial embedding; retain the written permission and verify that it covers each model and any required attribution or usage conditions before deployment. Review anatomical and clinical context before publishing. Viewers and their availability depend on Sketchfab.

Audience-specific marketing pages can use the optional `landing` frontmatter fields to render a shorter practice-landing template. Their revenue scenario is illustrative gross revenue, not profit or a forecast; verify program terms and all product or clinical claims before publishing. The decorative Three.js animation is not a representation of the robot and falls back to static artwork when reduced motion is requested or WebGL is unavailable.

The site-wide guided assistant in `src/components/GuidedAssistant.astro` provides prewritten answers and links; it is not live or AI chat and collects no visitor information. Update its answers when approved product or program terms change, and review clinical and financial wording before publication. Its topic disclosures work without JavaScript.

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
- `public/therapy/media/Robots-and-2-therapists-scaled.jpg`: higher-resolution clinicians and RX2600 systems image supplied by the site owner, replacing the former 1024px variant.
- `public/therapy/media/rpt-treatment.jpg`: [clinician using RX2600](https://rptclinic.com/wp-content/uploads/2025/12/rpt-process-3-scaled.jpg), from the RPT Clinic WordPress media library.
- `public/therapy/media/RPT-OfficePortraits-12-updated.jpg` and `public/therapy/media/6Ben-with-client-full-robot-and-logo-scaled.jpg`: additional treatment photos supplied by the site owner.

Confirm the right to reuse each image and any depicted individuals' permissions before publishing. The media files are local to the build; the REST API is not needed at runtime. Existing WordPress pages are references only and are not imported as articles.

The homepage links to the existing RX2600 inquiry form and to the physical therapy, chiropractic, and sports performance landing pages in this library. Review the current Growth Partner Program terms and all marketing claims before deployment.
