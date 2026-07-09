/* ==========================================================================
   SCRAPBOOK.JS — Diary open + page flip interactions
   ========================================================================== */

(function () {
  const diary = document.getElementById('diary');
  const diaryCover = document.getElementById('diaryCover');
  const book = document.getElementById('book');
  const pages = () => Array.from(document.querySelectorAll('.page'));
  const prevBtn = document.getElementById('pagePrev');
  const nextBtn = document.getElementById('pageNext');
  let currentPage = 0;

  function buildPages() {
    if (!book || book.querySelector('.page')) return;

    const imageOrder = ['1', '1(1)', '1(2)', '2', '3', '4', '5', '5(2)', '6', '7', '8(1)', '8'];
    const imageCount = imageOrder.length;
    const pageCaptions = [
      "Eight years ago, we had our very first conversation at Siddu's house ❤️.",
      "👋 The moment you slapped me for the first time... 🥺",
      "💚✨ The comment I gave you when you wore a saree...",
      "Chatting with you every day has become a habit for me.",
      "When I ask you to come upstairs and you come, seeing you and talking to you fills me with so much happiness. 💙",
      "On May 26 2026, we went to the multiplex along with for the first time. Spending that day with you meant so much to me. 💕",
      "On May 29 2026, we sat together on the roadside in Tirupati. Resting my head on your shoulder felt so comforting and peaceful. 🫶",
      "The moment we were at the railway reservation counter together... ✨",
      "On May 30 2026, while we were sitting on bed, I was gently massaging your legs. Surprisingly, I didn't feel shy at all. Instead, it felt really nice and comforting. 🤍",
      "On May 31 2026, when you shared the half-eaten piece of mango with me, it made our bond grow so much stronger. It's a memory I'll always cherish. 💖",
      "The moment you left for Hyderabad... I missed you so much that tears filled my eyes. 😢❤️‍🩹✨",
      "Talking to you on the phone every night gave me an indescribable happiness. Those precious moments still find their way into my dreams. ✨",
    ];

    const pageTitles = [
      "First Talk",
      "First Slap",
      "Saree Comment",
      "Daily Chats",
      "Coming Upstairs",
      "First Outside",
      "Roadside Peace",
      "There For you",
      "Massage Moment",
      "Mango Memory",
      "First Cry",
      "Phone Nights",
    ];

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < imageCount; i++) {
      const page = document.createElement('div');
      page.className = 'page';
      page.dataset.page = String(i + 1);

      page.innerHTML = `
        <div class="page-inner">
          <span class="tape t-left"></span><span class="tape t-right"></span>
          <div class="polaroid">
            <div class="polaroid-photo">
              <img src="Scrap Book/${imageOrder[i]}.jpeg" alt="Memory ${imageOrder[i]}" loading="lazy">
            </div>
            <p>${pageTitles[i] || `Memory ${i + 1}`}</p>
          </div>
          <p class="page-text">${pageCaptions[i] || 'A cherished memory'}</p>
          <span class="doodle">✨</span>
        </div>
      `;

      fragment.appendChild(page);
    }

    book.appendChild(fragment);
    renderPages();
  }

  function openDiary() {
    diary.classList.add('open');
    buildPages();
    renderPages();
  }

  if (diaryCover) {
    diaryCover.addEventListener('click', openDiary);
  }

  function renderPages() {
    pages().forEach((page, i) => {
      page.classList.toggle('flipped', i < currentPage);
      page.classList.toggle('active', i === currentPage);
      page.style.zIndex = pages().length - i;
    });
  }

  function nextPage() {
    if (currentPage < pages().length - 1) {
      currentPage++;
      playPageSound();
      renderPages();
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      playPageSound();
      renderPages();
    }
  }

  function playPageSound() {
    // Optional: connect a real page-turn sound file here.
    // const sfx = new Audio('audio/page-turn.mp3'); sfx.volume = 0.4; sfx.play().catch(() => {});
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextPage);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevPage);
  }

  // Swipe support for touch devices
  let touchStartX = 0;
  if (diary) {
    diary.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
    diary.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 50) diff < 0 ? nextPage() : prevPage();
    });
  }

  buildPages();
  renderPages();
})();
