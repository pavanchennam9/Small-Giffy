/* ==========================================================================
   PARTICLES.JS — Ambient background particle system
   ========================================================================== */

(function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const shapes = ['❤', '✨', '★'];
  const colors = ['#FF69B4', '#A855F7', '#FFD700', '#C084FC', '#F43F5E'];

  function createParticle() {
    return {
      x: Math.random() * width,
      y: height + 20,
      size: 6 + Math.random() * 10,
      speed: 0.3 + Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 0.6,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.15 + Math.random() * 0.35,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
    };
  }

  const PARTICLE_COUNT = window.innerWidth < 768 ? 22 : 42;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = createParticle();
    p.y = Math.random() * height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift;
      p.rotation += p.rotSpeed;

      if (p.y < -20) {
        Object.assign(p, createParticle());
        p.y = height + 20;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.font = `${p.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.shape, 0, 0);
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }
  animate();

  // Reduce load when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) particles = particles.slice(0, 10);
  });
})();
