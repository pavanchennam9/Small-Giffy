/* ==========================================================================
   APP.JS — Loading sequence, navigation, cursor, countdown, scroll effects
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- LOADING SCREEN ---------------- */
  const loadingScreen = document.getElementById('loadingScreen');
  const loaderFill = document.getElementById('loaderFill');
  const curtainWrap = document.getElementById('curtainWrap');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(finishLoading, 400);
    }
    loaderFill.style.width = progress + '%';
  }, 220);

  function finishLoading() {
    loadingScreen.classList.add('hidden');
    // Curtain opens
    gsap.to('.curtain-left', { xPercent: -100, duration: 1.2, ease: 'power3.inOut', delay: 0.2 });
    gsap.to('.curtain-right', { xPercent: 100, duration: 1.2, ease: 'power3.inOut', delay: 0.2, onComplete: () => {
      curtainWrap.style.display = 'none';
      if (window.__startBgMusic) window.__startBgMusic();
      animateHeroIn();
    }});
  }

  function animateHeroIn() {
    gsap.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
    gsap.fromTo('.hero-title .line', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, delay: 0.2 });
    gsap.fromTo('.hero-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.7 });
    gsap.fromTo('.countdown', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9 });
  }

  // Failsafe: if libraries fail to load, still reveal the site
  setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) finishLoading();
  }, 6000);

  /* ---------------- SCROLL PROGRESS ---------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (scrollTop / docHeight) * 100 + '%';
    navbar.classList.toggle('scrolled', scrollTop > 60);
  });

  /* ---------------- MOBILE NAV ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const hero = document.querySelector('.hero');

  const enablePageScroll = () => {
    document.documentElement.classList.add('page-open');
    document.body.classList.add('page-open');
  };

  const disablePageScroll = () => {
    document.documentElement.classList.remove('page-open');
    document.body.classList.remove('page-open');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  disablePageScroll();

  navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

  const sections = document.querySelectorAll('.page-section');

  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    link.addEventListener('click', (e) => {
      navMenu.classList.remove('active');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (href === '#home') {
            sections.forEach((section) => section.classList.remove('active'));
            hero.classList.remove('hero-hidden');
            disablePageScroll();
          } else {
            hero.classList.add('hero-hidden');
            sections.forEach((section) => section.classList.remove('active'));
            target.classList.add('active');
            enablePageScroll();
            target.scrollTop = 0;
          }
        }
      }
    });
  });

  /* ---------------- FLOATING HERO ELEMENTS ---------------- */
  const floaters = document.getElementById('floaters');
  const floaterEmojis = ['💖', '⭐', '☁️', '🦋', '🌹', '✨'];
  for (let i = 0; i < 22; i++) {
    const span = document.createElement('span');
    span.textContent = floaterEmojis[Math.floor(Math.random() * floaterEmojis.length)];
    span.style.left = Math.random() * 100 + '%';
    span.style.fontSize = (14 + Math.random() * 18) + 'px';
    span.style.animationDuration = (8 + Math.random() * 10) + 's';
    span.style.animationDelay = (Math.random() * 8) + 's';
    floaters.appendChild(span);
  }

  /* ---------------- COUNTDOWN TIMER ---------------- */
  // Set the target birthday date here (YYYY, monthIndex 0-11, day, hour, minute)
  const birthdayDate = new Date(new Date().getFullYear(), 6, 11, 0, 0, 0);

  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');
  const countdownBox = document.getElementById('countdown');
  const itsYourDay = document.getElementById('itsYourDay');

  function updateCountdown() {
    const now = new Date();
    let target = birthdayDate;
    if (target < now) target = new Date(target.getFullYear() + 1, target.getMonth(), target.getDate());
    const diff = target - now;

    if (diff <= 0 || isBirthdayToday()) {
      countdownBox.style.display = 'none';
      itsYourDay.style.display = 'block';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    cdDays.textContent = String(d).padStart(2, '0');
    cdHours.textContent = String(h).padStart(2, '0');
    cdMins.textContent = String(m).padStart(2, '0');
    cdSecs.textContent = String(s).padStart(2, '0');
  }

  function isBirthdayToday() {
    const now = new Date();
    return now.getMonth() === birthdayDate.getMonth() && now.getDate() === birthdayDate.getDate();
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------------- SCROLL REVEAL (AOS-like) ---------------- */
  const revealTargets = document.querySelectorAll(
    '.glass-card, .timeline-item, .gallery-item, [data-aos]'
  );
  revealTargets.forEach((el) => el.setAttribute('data-aos', ''));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-aos]').forEach((el) => revealObserver.observe(el));

  /* ---------------- ANIMATED COUNTERS ---------------- */
  const counters = document.querySelectorAll('.counter-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const increment = Math.max(target / 60, 1);
    const step = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    step();
  }

  /* ---------------- TILT EFFECT (about photo) ---------------- */
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -14;
      const rotateY = ((x / rect.width) - 0.5) * 14;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  });

  /* ---------------- CONTACT FORM ---------------- */
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactSuccess.textContent = 'Sent successfully';
          contactSuccess.style.display = 'block';
          contactForm.reset();
        } else {
          contactSuccess.textContent = 'Could not send. Please try again.';
          contactSuccess.style.display = 'block';
        }
      } catch (error) {
        contactSuccess.textContent = 'Could not send. Please try again.';
        contactSuccess.style.display = 'block';
      }
    });
  }

  /* ---------------- BACK TO TOP ---------------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- GSAP SCROLLTRIGGER PARALLAX (optional flourishes) ---------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.hero-bg', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }
});
