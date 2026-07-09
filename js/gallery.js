/* ==========================================================================
   GALLERY.JS — Masonry gallery + Lightbox
   ========================================================================== */

(function () {
  const photoList = [
    { src: 'Gallery/1.jpeg', caption: 'Memory 1' },
    { src: 'Gallery/2.jpeg', caption: 'Memory 2' },
    { src: 'Gallery/3.jpeg', caption: 'Memory 3' },
    { src: 'Gallery/4.jpeg', caption: 'Memory 4' },
    { src: 'Gallery/5.jpeg', caption: 'Memory 5' },
    { src: 'Gallery/6.jpeg', caption: 'Memory 6' },
    { src: 'Gallery/7.jpeg', caption: 'Memory 7', position: 'center 24%' },
    { src: 'Gallery/8.jpeg', caption: 'Memory 8' },
    { src: 'Gallery/9.jpeg', caption: 'Memory 9', position: 'center 24%' },
  ];

  const photos = photoList.slice().sort((a, b) => {
    const aNum = parseInt((a.src.match(/(\d+)/) || [0])[0], 10);
    const bNum = parseInt((b.src.match(/(\d+)/) || [0])[0], 10);
    return aNum - bNum;
  });

  const grid = document.getElementById('galleryGrid');
  photos.forEach((photo, i) => {
    const angle = (Math.random() * 12 - 6).toFixed(2);
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.index = i;
    item.style.setProperty('--rotate-angle', `${angle}deg`);
    item.innerHTML = `
      <div class="gallery-photo" style="background-image: url('${photo.src}'); background-position: ${photo.position || 'center center'};"></div>
    `;
    grid.appendChild(item);
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbCounter = document.getElementById('lbCounter');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
  }
  function updateLightbox() {
    const photo = photos[currentIndex];
    lbImage.style.backgroundImage = `url('${photo.src}')`;
    lbImage.style.backgroundPosition = photo.position || 'center center';
    lbCaption.textContent = photo.caption;
    lbCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
  }
  function closeLightbox() { lightbox.classList.remove('active'); }
  function nextImage() { currentIndex = (currentIndex + 1) % photos.length; updateLightbox(); }
  function prevImage() { currentIndex = (currentIndex - 1 + photos.length) % photos.length; updateLightbox(); }

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) openLightbox(Number(item.dataset.index));
  });

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbNext').addEventListener('click', nextImage);
  document.getElementById('lbPrev').addEventListener('click', prevImage);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
})();
