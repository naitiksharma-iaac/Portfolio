(() => {
  const videos = [...document.querySelectorAll('video[data-course-motion]')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('[data-motion-toggle]');
  let automatic = !reduce.matches;
  const visible = new Set();
  const manualPause = new WeakSet();
  const sync = video => {
    if (automatic && visible.has(video) && !document.hidden && !manualPause.has(video)) {
      video.muted = true;
      video.play().catch(() => {});
    } else if (!visible.has(video) || document.hidden || !automatic) video.pause();
  };
  const label = () => { if(toggle) { toggle.textContent = automatic ? 'Pause automatic playback' : 'Enable automatic playback'; toggle.setAttribute('aria-pressed', String(automatic)); } };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if(entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
      sync(entry.target);
    }
  }, {threshold:0.3});
  for(const video of videos) {
    video.addEventListener('pause', () => {
      if(visible.has(video) && automatic && !document.hidden && !video.ended) manualPause.add(video);
    });
    observer.observe(video);
  }
  toggle?.addEventListener('click', () => {
    automatic = !automatic;
    for(const video of videos) manualPause.delete(video);
    label(); videos.forEach(sync);
  });
  reduce.addEventListener('change', () => { automatic=!reduce.matches; label(); videos.forEach(sync); });
  document.addEventListener('visibilitychange', () => videos.forEach(sync));
  label();
})();
