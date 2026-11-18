# Alejandro Agredo — personal portfolio

Next.js Pages Router, React, strict TypeScript and Tailwind CSS. The original full-screen introduction, triangle-particle background, professional icon artwork and V-shaped contact footer are preserved. Projects show real laptop and phone captures; clicking a screen opens an accessible image dialog. Experiments run on this page through a categorized, extensible player.

## Local development

Use **Node 24 LTS** (`.nvmrc`). No database, email-service subscription or API key is needed to browse the portfolio.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3142. This avoids the existing Daya development server on port 3140. The legacy `/projects`, `/experiments` and `/contact` URLs still open their corresponding sections. Use the navigation or the introduction's subtle scroll cue to move through the page.

The Node engine is pinned to `24.x`. Vercel uses this declaration on the next deployment instead of the project's obsolete Node 14 setting; no dashboard setting or deployment is changed by a local build. See [Vercel runtime overrides](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions#version-overrides-in-package.json). The scoped Next launcher also accommodates this workstation's older Node 22.11, but Node 24 is the supported development target.

## Frequent changes

| Change                                             | Start here                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------ |
| Add/update a website or app                        | `components/projects/projectsList.ts`                                          |
| Laptop, overlapping phone, capture crop and modal  | `components/projects/DeviceMockups.tsx`, `DesktopCapture.tsx`, `PhoneCapture.tsx`, `ImageDialog.tsx` |
| Add an experiment or category                      | `components/experiments/catalog.ts`                                            |
| Inline autoplay, visibility and reduced motion     | `components/experiments/ExperimentPlayer.tsx`                                  |
| Original experiment source                         | `public/particle`, `public/math`, `public/render`, `public/genetic`            |
| Background triangle behavior                       | `components/canvas/particle.ts`, `components/canvas/index.tsx`                 |
| Palette, device geometry, spacing, glow and motion | `styles/globals.css`                                                           |
| Professional links and work phone                  | `components/shared/contact.ts`                                                 |
| Résumé PDF and paperclip destination               | `public/resume-alejandro-agredo-2026-11-18.pdf`, `components/shared/contact.ts`     |
| Tech logos and official destinations               | `components/skills/skills.ts`                                                  |
| Contact validation and length rules                | `features/contact/model.ts`                                                    |
| Mail delivery provider                             | `server/contact/smtp.ts`, `composition.ts`                                     |
| API method/origin, idempotency and rate limits     | `server/contact/handler.ts`, `limits.ts`                                       |

### Résumé

The paperclip icons in the introduction and footer open the approved PDF in a new tab, where the browser provides its download controls. For a revision, add a dated PDF filename and update `professionalContact.resume` so cached copies do not hide the update. Also replace `public/resume-alejandro-agredo.pdf` with the same bytes to preserve older direct links. The current two-page export was approved on November 18, 2026.

### Projects

Add a catalog entry with a unique ID, title, description, technology list and **both real desktop and phone screenshots** under `public/projects`. Keep personal work and current commerce/payment limitations accurately described. Do not mark a prospect as a paying client. Laptop and phone frames are original CSS geometry, without third-party product branding; their images are ordinary keyboard-operable buttons.

### Experiments

Add an entry to an existing category, or add a new category, in `catalog.ts`. Set a unique lowercase slug, original title, preview and the original local HTML entry point. Place its scripts/assets under `public/` and keep the scripts local. Run:

```sh
npm run prepare:experiments
```

Development/build runs this automatically. The script validates IDs and paths, preserves the original sources and generates isolated `public/experiments/runtime` players with a small animation-control bridge. The selected experiment loads and plays automatically when visible, then pauses outside the viewport and while the document is hidden. Only the original title appears below the canvas; there are no playback/restart buttons or helper captions. Transparent experiments retain their original white page background. The boids runtime adapter rebuilds its spatial grid on resize while leaving the archived bundle unchanged. Reduced-motion mode shows its static preview. Arrow keys, Home and End operate category tabs. The twelve entries and source bundles are the same selection as the original portfolio; two copied titles in the old catalog were corrected to match their actual source. This is not a claim that every historical entry in the separate prácticas archive works.

## Server email: reuse the existing Gmail account

The form posts only to `/api/send_email`; Nodemailer sends from the server to **agredoalejo@gmail.com**, with the visitor's validated email as Reply-To. There is no browser EmailJS integration, third-party email signup, or database requirement.

Keep the existing Vercel Gmail values as **server-only environment variables**:

```text
SMTP_TRANSPORT_USER
GOOGLE_APIS_CLIENT_ID
GOOGLE_APIS_CLIENT_SECRET
GOOGLE_APIS_REFRESH_TOKEN
```

Nodemailer refreshes access tokens itself. The old redirect-URI variable may remain in Vercel but is not needed by this adapter. Copy `.env.example` to ignored `.env.local` for local verification and supply values through an authorized private path. Never commit environment files, print tokens, prefix secrets with `NEXT_PUBLIC_`, or use a normal Gmail account password. An existing Gmail app password or authenticated SMTP server is also supported; no new service is required. See [Gmail authentication](https://nodemailer.com/usage/using-gmail) and the example environment file.

Server configuration fixes the recipient, restricts method/content type and approved origins, validates all inputs, bounds request size, rejects a honeypot, limits attempts and coalesces duplicate submission IDs. Vercel's exact deployment hostname is accepted for previews. Additional exact local origins can be set in `CONTACT_ALLOWED_ORIGIN`. The form preserves entered data on errors and reports success only after SMTP acceptance, not on a button click. SMTP acceptance is not a guarantee of inbox placement.

Rate limits are **per running instance**: three attempts per IP per 15 minutes, 20 attempts per hour overall, bounded maps and 15-minute duplicate tracking. They are not a distributed firewall or a provider spending cap. Gmail's own sending restrictions still apply. There are no automatic mail retries, message broadcasts or scheduled tasks.

### Contact data

The form collects name, reply email and message to answer an inquiry. The app does not persist message contents in a database or log them; accepted messages reside in the existing Gmail inbox. Provider request metadata and inbox retention are separate. No automatic mailbox retention or deletion policy is configured by this code. Privacy questions and deletion requests can be directed to the same professional email; do not promise automated deletion that has not been implemented. Existing legacy graphics files remain local static assets. No application analytics SDK is loaded by this version.

## Verification

```sh
npm run check
npm run build
npm run test:e2e
npm audit --omit=dev
```

The browser suite uses installed **Google Chrome**, one worker and zero retries. Build first. It starts the optimized app on 127.0.0.1:3141, a local SMTP sink on 3150 and a test-only fixture endpoint on 3151. It sends fictitious messages only to that local sink; it never contacts Gmail or sends messages to real recipients. Do not run a second test suite on those ports at the same time. Browser screenshots/traces are ignored under `artifacts/qa` and `test-results`.

The production dependency audit was clean during this upgrade. The full audit reports an upstream development-only picomatch advisory propagated through fourteen lint-tool packages; the latest available picomatch checked was 4.0.7 and the advisory covers it. Do not use `npm audit fix --force` to downgrade the Next lint configuration. Recheck a compatible patched release before further dependency maintenance.

See [ASSETS.md](ASSETS.md) for screenshots and icon attribution. Keep work on `development`; publication to Preview and promotion to production follow Alejandro's separate review and authorization.
