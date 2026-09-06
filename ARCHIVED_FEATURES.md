# Archived Features

Features removed from the live site but preserved here (plus, where noted, as still-present-but-unlinked files) in case they're wanted back later. If restoring one, read its whole entry first — some interacted with other parts of the page that may have since changed.

---

## Page-level description overlay (fixed bottom bar)

**Removed:** 2026-09-05, on request, in favor of putting each section's description text directly before its media in normal page flow (see `PROJECT_PLAN.md`'s "Description text" notes for the current approach). Kayla asked specifically to keep this documented in case it's wanted back.

**What it was:** A single bar fixed to the bottom of the viewport (`position: fixed`), styled like the site nav (solid background, top border, top-aligned content). It cross-faded its content to match whichever `.case-asset` section was centered in the viewport, using a scrollspy that compared each section's media-block and caption-block visibility (implemented with fresh `getBoundingClientRect()` checks on scroll/resize/`ResizeObserver`, not `IntersectionObserver` — see `DECISIONS.md`'s Phase 3 nav-adjacent entries for why). It only appeared once you were ~100px into an asset (not the instant it peeked into view), and only when the asset was on screen but its real in-page caption wasn't yet reachable (tall imagery, or more than one asset stacked under one caption). Its own text clamped to ~3 lines with a "Read more"/"Read less" toggle that only appeared when content actually overflowed; "View iteration examples" appeared in its action slot when the active section called for it.

**Files involved:**
- `scripts/overlay.js` — still present in the repo, **not deleted**, just no longer linked from any page's `<script>` tags. This is the file to re-link if restoring.
- HTML: a `.description-overlay` block, placed once per page (location didn't matter, since it's `position: fixed`) — see the snippet below.
- CSS: lived in `styles/case-study.css`; removed when this was archived. Snippet below has the last-known-working version.
- Each `.case-asset` needed a real `.case-caption` element for the scrollspy to read from (the overlay cloned its `innerHTML` into the bar). If restoring this feature now, note that the current page structure replaced `.case-caption` with `.item-heading`/`.case-prose`/`.item-list` — `overlay.js` would need updating to read from whichever elements hold the equivalent content at that time.

**HTML (page-level, once per page):**
```html
<div class="description-overlay">
  <div class="container description-overlay-inner">
    <div class="description-overlay-content text-measure">
      <div class="description-overlay-text"></div>
    </div>
    <div class="description-overlay-actions">
      <button class="btn-action" data-overlay-toggle>Read more</button>
      <button class="btn-action" data-open-modal hidden>View iteration examples</button>
    </div>
  </div>
</div>
```

**CSS (last-known-working, was in `styles/case-study.css`):**
```css
.description-overlay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  background: var(--color-bg);
  border-top: 1px solid var(--color-hairline);
  opacity: 0;
  transform: translateY(6px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.description-overlay.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.description-overlay-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
}

.description-overlay-content {
  min-width: 0;
}

.description-overlay-text {
  max-height: var(--overlay-collapsed-height); /* was 80px, in tokens.css */
  overflow: hidden;
  transition: max-height 0.25s ease;
}

.description-overlay-text.is-expanded {
  max-height: 600px;
}

.description-overlay-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

@media (max-width: 800px) {
  .description-overlay-inner {
    flex-direction: column;
    align-items: stretch;
  }

  .description-overlay-actions {
    justify-content: flex-end;
  }
}
```
Also needed the shared caption typography rules (font/size/color for the cloned text) and `--overlay-collapsed-height: 80px;` back in `tokens.css` if that token was removed too — check `tokens.css`'s history/current state before restoring.

**How to restore:**
1. Re-add `<script src="../scripts/overlay.js"></script>` to each case study page (it's unchanged on disk).
2. Re-add the HTML block above to each page.
3. Re-add the CSS above to `styles/case-study.css` (and the `--overlay-collapsed-height` token to `tokens.css` if it's gone).
4. Update `overlay.js`'s section-reading logic to match whatever holds each section's description text at the time of restoring (it read `.case-caption` and `.case-asset-block`; confirm those class names/structure still exist or adjust the selectors).
5. Re-test the scrollspy behavior per `DECISIONS.md`'s notes on how this was verified (headless screenshot testing can't simulate real scrolling reliably — see the "known limitation" notes in `PROJECT_PLAN.md`).
