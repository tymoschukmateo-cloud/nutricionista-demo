document.documentElement.classList.add('js');

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 55);
}, { passive: true });

const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-menu');
toggle.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
document.addEventListener('click', e => {
  if (!menu.contains(e.target) && !toggle.contains(e.target)) menu.classList.remove('open');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.querySelector('.cform');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando…';
    btn.disabled = true;
  });
}

// Parallax Spline background
(function () {
  var splineBg = document.querySelector('.spline-bg');
  if (!splineBg) return;
  // Buffer: 15vh arriba → max travel seguro antes de mostrar vacío
  var maxOffset = window.innerHeight * 0.13;
  window.addEventListener('scroll', function () {
    var offset = Math.min(window.scrollY * 0.07, maxOffset);
    splineBg.style.transform = 'translateY(' + (-offset).toFixed(1) + 'px)';
  }, { passive: true });
}());

// Parallax frutas
(function () {
  const hero   = document.querySelector('.hero');
  const fruits = document.querySelectorAll('.fruit');
  if (!hero || !fruits.length) return;

  hero.addEventListener('mousemove', function (e) {
    const rect = hero.getBoundingClientRect();
    const dx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2); // -1..1
    const dy = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2); // -1..1
    fruits.forEach(function (f) {
      const d = parseFloat(f.dataset.depth) || 0.3;
      f.style.setProperty('--px', (dx * 28 * d).toFixed(1) + 'px');
      f.style.setProperty('--py', (dy * 18 * d).toFixed(1) + 'px');
    });
  }, { passive: true });

  hero.addEventListener('mouseleave', function () {
    fruits.forEach(function (f) {
      f.style.setProperty('--px', '0px');
      f.style.setProperty('--py', '0px');
    });
  });
}());
