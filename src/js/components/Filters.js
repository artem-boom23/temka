import { CATEGORIES } from '../data/programs.js';

export function renderFilterTabs(container, activeId, onSelect) {
  container.innerHTML = CATEGORIES.map(cat => `
    <button
      class="filter-tab${cat.id === activeId ? ' active' : ''}"
      data-id="${cat.id}"
    >${cat.emoji} ${cat.label}</button>
  `).join('');

  container.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => onSelect(btn.dataset.id));
  });
}
