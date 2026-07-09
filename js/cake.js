/* ==========================================================================
   CAKE.JS — Light / Blow / Cut interactive cake
   ========================================================================== */

(function () {
  const cakeWrap = document.getElementById('cakeWrap');
  const candles = () => Array.from(document.querySelectorAll('.candle'));
  const knife = document.getElementById('cakeKnife');
  const message = document.getElementById('cakeMessage');
  const hint = document.getElementById('cakeHint');

  const btnLight = document.getElementById('btnLight');
  const btnBlow = document.getElementById('btnBlow');
  const btnCut = document.getElementById('btnCut');
  const btnRestart = document.getElementById('btnRestart');

  let lit = false;
  let cut = false;
  let micStream = null;

  function lightCandles() {
    candles().forEach((c, i) => setTimeout(() => c.classList.add('lit'), i * 250));
    lit = true;
    hint.textContent = 'Make a wish, then blow out the candles 🌬️';
  }

  function blowCandles() {
    if (!lit) return;
    candles().forEach((c) => c.classList.remove('lit'));
    lit = false;
    hint.textContent = 'Wish made ✨ Now cut the cake!';
    if (window.confetti) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#FFD700', '#FF69B4'] });
    }
  }

  function cutCake() {
    if (cut) return;
    cut = true;
    knife.classList.add('slice');
    cakeWrap.classList.add('cut');
    setTimeout(() => {
      message.classList.add('show');
      hint.textContent = 'Happy Birthday! 🎉';
      if (window.confetti) {
        confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 } });
        setTimeout(() => confetti({ particleCount: 100, spread: 140, origin: { y: 0.4 }, colors: ['#A855F7', '#F43F5E', '#FFD700'] }), 300);
      }
      flashCamera();
    }, 700);
  }

  function flashCamera() {
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:9997;opacity:0.85;pointer-events:none;transition:opacity 0.4s ease;';
    document.body.appendChild(flash);
    requestAnimationFrame(() => { flash.style.opacity = '0'; });
    setTimeout(() => flash.remove(), 500);
  }

  function restart() {
    cut = false;
    lit = false;
    candles().forEach((c) => c.classList.remove('lit'));
    knife.classList.remove('slice');
    cakeWrap.classList.remove('cut');
    message.classList.remove('show');
    hint.textContent = 'Light the candles, make a wish, then blow them out ✨';
    stopMic();
  }

  // Optional microphone-based blowing
  async function tryMicBlow() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(micStream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!micStream) return;
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > 55 && lit) {
          blowCandles();
          stopMic();
          return;
        }
        requestAnimationFrame(checkVolume);
      };
      checkVolume();
    } catch (err) {
      // Microphone unavailable or denied — button click still works.
    }
  }

  function stopMic() {
    if (micStream) {
      micStream.getTracks().forEach((t) => t.stop());
      micStream = null;
    }
  }

  btnLight.addEventListener('click', lightCandles);
  btnBlow.addEventListener('click', () => { blowCandles(); tryMicBlow(); });
  btnCut.addEventListener('click', cutCake);
  btnRestart.addEventListener('click', restart);
})();
