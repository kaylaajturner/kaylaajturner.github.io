// With preload="metadata", browsers only fetch duration/dimensions — the
// element shows nothing until playback starts, which reads as "the video
// never loaded". Seeking a hair into the video forces that one frame to be
// fetched and painted immediately, without downloading/playing the rest.
function paintFirstFrame(video) {
  function seek() {
    try { video.currentTime = 0.01; } catch (e) { /* ignore */ }
  }
  if (video.readyState >= 1) {
    seek();
  } else {
    video.addEventListener('loadedmetadata', seek, { once: true });
  }
}

// Compare/Pause toggle for the before/after comparison videos.
// Each ".media-compare" block owns one <video> and one [data-compare-btn].
(function () {
  function wireCompareBlock(block) {
    var video = block.querySelector('video');
    var btn = block.querySelector('[data-compare-btn]');
    if (!video || !btn) return;

    paintFirstFrame(video);

    function setPlaying(isPlaying) {
      btn.textContent = isPlaying ? 'Pause' : 'Compare to previous design';
      btn.setAttribute('aria-label', isPlaying ? 'Pause comparison' : 'Compare designs');
    }

    btn.addEventListener('click', function () {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    video.addEventListener('play', function () { setPlaying(true); });
    video.addEventListener('pause', function () { setPlaying(false); });

    setPlaying(false);
  }

  document.querySelectorAll('.media-compare').forEach(wireCompareBlock);
})();

// Case study asset videos: play once on scroll-into-view, then reveal a
// Replay button. Separate from the Compare/Pause blocks above.
(function () {
  function wireCaseVideo(video) {
    var container = video.closest('.case-media');
    var replayBtn = container ? container.querySelector('.case-media-replay') : null;
    var played = false;

    video.muted = true;
    video.setAttribute('playsinline', '');
    paintFirstFrame(video);

    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !played) {
        played = true;
        video.play();
      }
    }, { threshold: 0.25 });
    observer.observe(video);

    video.addEventListener('ended', function () {
      if (replayBtn) replayBtn.hidden = false;
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', function () {
        replayBtn.hidden = true;
        video.currentTime = 0;
        video.play();
      });
    }
  }

  document.querySelectorAll('.case-media video').forEach(wireCaseVideo);
})();

// Case study animated SVGs: plain <img>, no JS. Previously loaded via
// <object> specifically so media.js could reach contentDocument and
// pause/resume playback until scroll-into-view — confirmed (via a headless
// test) that contentDocument is always null for an <object>-embedded
// document under file://, so that gating silently never ran; the SVG just
// played natively and immediately on load regardless of scroll position.
// Rather than depend on a cross-document access pattern that's broken in
// exactly the context Kayla reviews in (opening pages directly via
// file://), the scroll-gating was dropped entirely and the element switched
// to <img> like every other static SVG on the page. Playing "immediately,
// once" on load is an acceptable fallback since the "play exactly once"
// guarantee already lives in the SVG source file itself (each animated
// element's `animation` shorthand includes `forwards`, so it holds its
// final frame indefinitely instead of resetting — see DECISIONS.md). If
// another animated SVG needs this treatment, give it the same `1 forwards`
// treatment at the source rather than reaching for contentDocument again.
