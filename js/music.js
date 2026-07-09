/* ==========================================================================
   MUSIC.JS — Background music controls
   ========================================================================== */

(function () {
  const musicPlayer = document.getElementById('musicPlayer');
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const volumeSlider = document.getElementById('volumeSlider');
  const muteBtn = document.getElementById('muteBtn');
  const visualizer = document.getElementById('visualizer');

  let expanded = false;
  bgMusic.volume = 0.5;

  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {
        // Autoplay may be blocked until user interacts — this click counts as interaction.
      });
      musicToggle.textContent = '⏸';
      visualizer.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggle.textContent = '🎵';
      visualizer.classList.remove('playing');
    }
    expanded = !expanded;
    musicPlayer.classList.toggle('expanded', expanded);
  });

  volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value / 100;
    if (bgMusic.volume > 0) muteBtn.textContent = '🔊';
  });

  muteBtn.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
  });

  // Expose a helper so app.js can start music right after the curtain opens
  window.__startBgMusic = function () {
    bgMusic.play().then(() => {
      musicToggle.textContent = '⏸';
      visualizer.classList.add('playing');
      musicPlayer.classList.add('expanded');
      expanded = true;
    }).catch(() => {
      // Browser blocked autoplay — user can press the music button manually.
    });
  };
})();
