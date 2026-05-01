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
