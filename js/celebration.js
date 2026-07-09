/* ==========================================================================
   CELEBRATION.JS — Gift box, Secret Letter, Celebrate button, Finale fireworks
   ========================================================================== */

(function () {
  /* ---------------- GIFT BOX ---------------- */
  const gift3d = document.getElementById('gift3d');
  const giftHint = document.getElementById('giftHint');
  const giftReveal = document.getElementById('giftReveal');
  let giftOpened = false;

  if (gift3d && giftHint && giftReveal) {
    function openGift() {
      if (giftOpened) return;
      giftOpened = true;
      gift3d.classList.add('opened');
      giftHint.style.display = 'none';
      setTimeout(() => {
        giftReveal.classList.add('show');
        if (window.confetti) confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
      }, 500);
    }

    gift3d.addEventListener('click', openGift);

    const surpriseMessages = [
      '🫂 Life antha tough situation lo unna, 🌧️ naa chuttu enthamandhi unna, 👥 ninnu matram eppatiki vadalanu. ❤️ I will always care for you, 🥰 think about you, 💭 and protect you. 🛡️❤️ It’s my promise. 🤞💖',
    ];
    const anotherGiftBtn = document.getElementById('btnAnotherGift');
    if (anotherGiftBtn) {
      anotherGiftBtn.addEventListener('click', () => {
        const msg = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
        const h3 = giftReveal.querySelector('h3');
        h3.textContent = msg;
        if (window.confetti) confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#FFD700', '#C084FC'] });
      });
    }
  }

  /* ---------------- SECRET LETTER ---------------- */
  const lockCard = document.getElementById('lockCard');
  const envelopeWrap = document.getElementById('envelopeWrap');
  const envelope = document.getElementById('envelope');
  const unlockBtn = document.getElementById('unlockBtn');
  const letterText = document.getElementById('letterText');
  const letterSign = document.getElementById('letterSign');

  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      if (lockCard) lockCard.classList.add('hidden');
      if (envelopeWrap) envelopeWrap.classList.add('show');
      if (envelope) {
        envelope.classList.add('shake');
        setTimeout(() => {
          envelope.classList.remove('shake');
          envelope.classList.add('open');
          setTimeout(typeLetter, 1300);
        }, 500);
      } else {
        typeLetter();
      }
    });
  }

  function typeLetter() {
    if (!letterText) return;
    const fullText = letterText.dataset.fullText || letterText.textContent.trim();
    letterText.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    letterText.appendChild(cursor);

    let i = 0;
    function type() {
      if (i < fullText.length) {
        cursor.insertAdjacentText('beforebegin', fullText.charAt(i));
        i++;
        setTimeout(type, 28);
      } else if (letterSign) {
        letterSign.style.display = 'block';
      }
    }
    type();
  }

  /* ---------------- GRAND FINALE FIREWORKS ---------------- */
  const canvas = document.getElementById('fireworksCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let fwWidth, fwHeight, fireworks = [];

    function resizeFw() {
      fwWidth = canvas.width = canvas.parentElement.offsetWidth;
      fwHeight = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resizeFw);

    const fwColors = ['#FF69B4', '#A855F7', '#FFD700', '#C084FC', '#F43F5E', '#FFFFFF'];

    function spawnFirework() {
      const x = Math.random() * fwWidth;
      const y = Math.random() * fwHeight * 0.5 + 40;
      const color = fwColors[Math.floor(Math.random() * fwColors.length)];
      const particleCount = 34;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 1.5 + Math.random() * 2.5;
        fireworks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 60 + Math.random() * 20,
          color,
        });
      }
    }

    let fwRunning = false;
    function animateFw() {
      if (!fwRunning) return;
      ctx.fillStyle = 'rgba(6,8,18,0.15)';
      ctx.fillRect(0, 0, fwWidth, fwHeight);

      fireworks.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.life--;
        ctx.globalAlpha = Math.max(p.life / 80, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      fireworks = fireworks.filter((p) => p.life > 0);

      if (Math.random() < 0.03) spawnFirework();
      requestAnimationFrame(animateFw);
    }

    const finaleSection = document.getElementById('finale');
    if (finaleSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fwRunning) {
            resizeFw();
            fwRunning = true;
            spawnFirework();
            animateFw();
          } else if (!entry.isIntersecting) {
            fwRunning = false;
          }
        });
      }, { threshold: 0.3 });
      observer.observe(finaleSection);
    }
  }

  // Stars for finale sky
  const starsLayer = document.getElementById('starsLayer');
  if (starsLayer) {
    for (let i = 0; i < 60; i++) {
      const star = document.createElement('span');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 70 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      starsLayer.appendChild(star);
    }
  }

  // Lanterns
  const lanternsWrap = document.getElementById('lanterns');
  if (lanternsWrap) {
    for (let i = 0; i < 8; i++) {
      const lantern = document.createElement('span');
      lantern.textContent = '🏮';
      lantern.style.animationDelay = (i * 0.4) + 's';
      lanternsWrap.appendChild(lantern);
    }
  }
})();
