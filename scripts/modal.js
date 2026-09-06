// Iteration-examples modal: one per case study page.
// Desktop shows page edges + scrim on the sides; mobile is full-bleed (CSS).
// Close via the dismiss button, clicking the scrim, or Escape; focus returns
// to whichever [data-open-modal] trigger opened it.
(function () {
  var modal = document.querySelector('.iteration-modal');
  var scrim = document.querySelector('.iteration-modal-scrim');
  if (!modal || !scrim) return;

  var closeBtn = modal.querySelector('.iteration-modal-close');
  var lastTrigger = null;

  function openModal(trigger) {
    lastTrigger = trigger || null;
    modal.classList.add('is-open');
    scrim.classList.add('is-open');
    document.body.classList.add('iteration-modal-open');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    scrim.classList.remove('is-open');
    document.body.classList.remove('iteration-modal-open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openModal(trigger);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  scrim.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Minimal focus trap while open.
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = modal.querySelectorAll('button, a[href]');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
