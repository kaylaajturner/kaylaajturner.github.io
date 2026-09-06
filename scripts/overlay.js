// Page-level description overlay: a single bar fixed to the bottom of the
// viewport, used only as a stand-in. Each ".case-asset" has a real, static
// ".case-caption" that lives in the page and stays put once you scroll to
// it. The fixed bar shows a copy of that caption only while its asset is in
// view but the real caption isn't yet (tall imagery, or more than one asset
// stacked in a section) — and fades out once the real caption is reachable.
//
// Uses fresh getBoundingClientRect() checks on scroll/resize rather than
// IntersectionObserver: video assets on this page resize once their
// metadata loads (see media.js's paintFirstFrame), shifting everything
// below them *after* an observer's first callback — IntersectionObserver
// doesn't reliably re-fire for that in time, leaving the bar stuck showing
// a stale section. Recomputing geometry directly avoids that entirely.
(function () {
  var overlay = document.querySelector('.description-overlay');
  if (!overlay) return;

  var textEl = overlay.querySelector('.description-overlay-text');
  var toggleBtn = overlay.querySelector('[data-overlay-toggle]');
  var modalBtn = overlay.querySelector('[data-open-modal]');
  if (!textEl) return;

  var sections = Array.prototype.slice.call(document.querySelectorAll('.case-asset'))
    .map(function (el) {
      return {
        el: el,
        media: el.querySelector('.case-asset-block'),
        caption: el.querySelector('.case-caption')
      };
    })
    .filter(function (s) { return s.media && s.caption; });

  if (!sections.length) return;

  var FADE_MS = 200;
  var TRIGGER_OFFSET = 100; // don't show until ~100px into the asset, not the instant it peeks into view
  var active = null;
  var swapTimer = null;

  function isOnScreen(rect) {
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  // The media needs to be meaningfully in view, not just barely peeking in —
  // wait until its top has scrolled up past TRIGGER_OFFSET from the bottom.
  function isMediaTriggered(rect) {
    return rect.bottom > 0 && rect.top < (window.innerHeight - TRIGGER_OFFSET);
  }

  function applySection(section) {
    textEl.innerHTML = section.caption.innerHTML;
    textEl.classList.remove('is-expanded');
    if (toggleBtn) {
      toggleBtn.textContent = 'Read more';
      // Only offer Read more if the collapsed height actually clips something.
      var collapsedMax = parseFloat(getComputedStyle(textEl).maxHeight) || 0;
      toggleBtn.hidden = textEl.scrollHeight <= collapsedMax + 1;
    }
    if (modalBtn) modalBtn.hidden = !section.el.hasAttribute('data-modal-trigger');
  }

  function setActive(section) {
    if (section === active) return;
    active = section;
    window.clearTimeout(swapTimer);

    if (!section) {
      overlay.classList.remove('is-visible');
      return;
    }

    if (overlay.classList.contains('is-visible')) {
      overlay.classList.remove('is-visible');
      swapTimer = window.setTimeout(function () {
        applySection(section);
        overlay.classList.add('is-visible');
      }, FADE_MS);
    } else {
      applySection(section);
      overlay.classList.add('is-visible');
    }
  }

  function update() {
    var match = null;
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      var mediaTriggered = isMediaTriggered(s.media.getBoundingClientRect());
      var captionOnScreen = isOnScreen(s.caption.getBoundingClientRect());
      if (mediaTriggered && !captionOnScreen) {
        match = s;
        break;
      }
    }
    setActive(match);
  }

  var ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }

  window.addEventListener('scroll', requestUpdate);
  window.addEventListener('resize', requestUpdate);

  // Asset metadata (video dimensions, image decode) can settle after the
  // initial paint and shift layout with no scroll/resize event of its own —
  // catch that directly rather than hoping scroll/resize covers it.
  if (window.ResizeObserver) {
    new ResizeObserver(requestUpdate).observe(document.body);
  } else {
    window.addEventListener('load', function () { window.setTimeout(update, 500); });
  }

  update();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var expanded = textEl.classList.toggle('is-expanded');
      toggleBtn.textContent = expanded ? 'Read less' : 'Read more';
    });
  }
})();
