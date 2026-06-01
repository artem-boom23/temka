import { CATEGORIES } from '../data/programs.js';

export function formatMoney(amount) {
  if (amount >= 1000) return (amount / 1000).toFixed(0) + ' 000';
  return String(amount);
}

export function getCategoryName(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId)?.label ?? categoryId;
}

export function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

export function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}
