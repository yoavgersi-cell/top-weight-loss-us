# Medical review (E-E-A-T)

Reviewer: Francheska Capistrano, RMT, MPH (`src/data/reviewers.ts`). Byline wording: "Reviewed for medical accuracy by" (she is a medical laboratory scientist with an MPH, not a prescribing clinician). Never add credentials, employers or claims she has not supplied.

## The review log is the only source of truth
- `REVIEW_LOG` in `src/data/reviewers.ts` maps page path -> { reviewer, reviewedAt }. A page shows the dated byline and emits `reviewedBy` / `lastReviewed` ONLY if it is in the log.
- Add entries only when the owner confirms she reviewed those pages; use the confirmed date; never backfill. Add a dated batch constant (like `OCT31_REVIEWED_PATHS`) - newest entry wins.
- Articles rewritten after their review drop out automatically (`updatedAt` > review date). Non-article routes that were rewritten go into `REVIEW_PENDING_PATHS` until re-reviewed.
- New articles carry no review until she signs them off. Tell the owner which pages to send her.

## Schema placement
- `reviewedBy` and `lastReviewed` are WebPage properties. Never spread `pageReviewSchema()` onto an Article node; use `mainEntityOfPage: reviewedPageNode(path, url, "WebPage" | "MedicalWebPage")`. CollectionPage / WebPage nodes may take the spread directly.
- Health content is `MedicalWebPage`; provider-business pages stay `WebPage`.
- A page that carries the schema must also show the visible byline (`MedicalReviewBar`), and vice versa. `site_check.py` flags mismatches.

## Reviewer profile (`/reviewers/[slug]`)
ProfilePage + Person (stable `@id`, credentials, alumniOf, hasCredential, hasOccupation, ImageObject, sameAs) and a dated list of every LIVE page she reviewed (filtered to the sitemap). `dateModified` = latest review date.
