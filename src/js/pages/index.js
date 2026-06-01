import { PROGRAMS }         from '../data/programs.js';
import { renderCard, attachCardTracking } from '../components/Card.js';
import { renderFilterTabs }  from '../components/Filters.js';
import { initCalculator }    from '../components/Calculator.js';
import { initScrollReveal, initStickyHeader } from '../utils/helpers.js';

let activeCategory = 'all';

const grid      = document.getElementById('programs-grid');
const filterBar = document.getElementById('filter-tabs');

function renderPrograms() {
  const list = activeCategory === 'all'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.category === activeCategory);

  if (!list.length) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>Пока пусто</h3>
        <p>Скоро добавим программы в эту категорию</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(renderCard).join('');
  attachCardTracking(grid, list);

  grid.querySelectorAll('.program-card').forEach((card, i) => {
    card.classList.add('fade-in');
    setTimeout(() => card.classList.add('visible'), 60 + i * 50);
  });
}

function onCategorySelect(id) {
  activeCategory = id;
  renderFilterTabs(filterBar, activeCategory, onCategorySelect);
  renderPrograms();
}

document.addEventListener('DOMContentLoaded', () => {
  renderFilterTabs(filterBar, activeCategory, onCategorySelect);
  renderPrograms();
  initCalculator();
  initScrollReveal();
  initStickyHeader();
});
