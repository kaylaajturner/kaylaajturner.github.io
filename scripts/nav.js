// Site navigation scroll behavior.
// [data-nav-behavior="reveal"]        — home page: hidden over the hero,
//   slides in once the name scrolls out of view, then stays pinned.
// [data-nav-behavior="hide-on-scroll"] — case study pages: visible from the
//   top, hides on scroll-down, reveals on scroll-up.
(function () {
  // Signals "resume home already scrolled past the hero" across a real page
  // navigation. Implemented as a URL hash baked into the link's href on
  // load (not intercepted at click time, not sessionStorage) — a plain,
  // ordinary click just naturally goes to the right place. This is a
  // deliberate choice, verified working via a real <a> click end-to-end;
  // keep it this way rather than reintroducing a click handler or storage
  // write for this. See DECISIONS.md's "nav restore" entries for the full
  // history, including a testing pitfall worth knowing before changing
  // this file: a test page whose filename doesn't literally end in
  // "index.html" silently fails the `a[href$="index.html"]` selector below
  // and makes this look broken when it isn't — cost significant time to
  // catch. Always verify against a same-named copy (e.g. a page named
  // `test-index.html`, not `test_page.html`) when testing this specific file.
  var RETURN_HASH = '#nav-visible';

  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var behavior = nav.getAttribute('data-nav-behavior');

  if (behavior === 'reveal') {
    // Trigger point is the name itself, not the whole hero block — the nav
    // should appear as soon as the name scrolls away, not wait for the
    // subtitle/tagline/divider below it to clear the viewport too.
    var nameEl = document.querySelector('.site-name');
    if (!nameEl) return;

    // Coming back from a case study page: resume as if already scrolled
    // past the hero, instead of resetting to the very top.
    //
    // Keep the fonts.ready re-application below as a defensive measure:
    // Google Fonts load async with font-display: swap, so the page can in
    // principle reflow (fallback font swapping to Barlow/Merriweather)
    // *after* this initial scroll fires. If that reflow put .site-name back
    // inside the viewport, the IntersectionObserver below would fire again
    // and hide the nav this restore just showed. Re-running the same
    // restore once fonts settle guards against that scenario even though it
    // wasn't confirmed as an actual observed failure.
    if (window.location.hash === RETURN_HASH) {
      // Strip the marker immediately so it doesn't linger in the URL bar or
      // re-trigger on a manual refresh/bookmark.
      window.history.replaceState(null, '', window.location.pathname + window.location.search);

      var main = document.querySelector('main');

      function restoreScrolledNavState() {
        if (main) {
          // Instant, not smooth — this is a state restore, not a scroll animation.
          window.scrollTo({ top: Math.max(0, main.offsetTop - nav.offsetHeight), left: 0, behavior: 'instant' });
        }
        nav.classList.add('site-nav--visible');
      }

      restoreScrolledNavState();

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(restoreScrolledNavState);
      }
    }

    var observer = new IntersectionObserver(function (entries) {
      var nameVisible = entries[0].isIntersecting;
      nav.classList.toggle('site-nav--visible', !nameVisible);
    });
    observer.observe(nameEl);
    return;
  }

  if (behavior === 'hide-on-scroll') {
    // Case study pages always show nav from the top — if the visitor heads
    // back to home from here, home should resume with the nav already
    // showing rather than resetting to the unscrolled hero state. Bake the
    // hash into the link's real href up front — an ordinary click then just
    // follows it, no click-time interception involved.
    nav.querySelectorAll('a[href$="index.html"]').forEach(function (link) {
      link.setAttribute('href', link.getAttribute('href') + RETURN_HASH);
    });

    var lastScrollY = window.scrollY;
    var revealThreshold = 80;
    var ticking = false;

    function updateNav() {
      var currentY = window.scrollY;
      if (currentY <= revealThreshold || currentY < lastScrollY) {
        nav.classList.remove('site-nav--hidden');
      } else if (currentY > lastScrollY) {
        nav.classList.add('site-nav--hidden');
      }
      lastScrollY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    });
  }
})();
