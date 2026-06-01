// State
let activeCategory = 'all';

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderPrograms();
  renderFilterTabs();
  initCalculator();
  initScrollEffects();
  initHeader();
});

// Render filter tabs
function renderFilterTabs() {
  const container = document.getElementById('filter-tabs');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button
      class="filter-tab ${cat.id === activeCategory ? 'active' : ''}"
      data-category="${cat.id}"
      onclick="setCategory('${cat.id}')"
    >
      ${cat.emoji} ${cat.label}
    </button>
  `).join('');
}

// Set category filter
function setCategory(categoryId) {
  activeCategory = categoryId;
  renderFilterTabs();
  renderPrograms();
}

// Render program cards
function renderPrograms() {
  const container = document.getElementById('programs-grid');
  if (!container) return;

  const filtered = activeCategory === 'all'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.category === activeCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>Пока пусто</h3>
        <p>Скоро добавим программы в эту категорию</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(program => renderCard(program)).join('');

  // Fade in animation
  container.querySelectorAll('.program-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
    card.classList.add('fade-in');
    setTimeout(() => card.classList.add('visible'), 50 + i * 50);
  });
}

// Render single card
function renderCard(program) {
  const badges = [];
  if (program.isHot) badges.push('<span class="badge badge-hot">🔥 Хит</span>');
  if (program.isNew) badges.push('<span class="badge badge-new">Новое</span>');

  return `
    <a class="program-card ${program.isHot ? 'is-hot' : ''}" href="program.html?id=${program.id}">
      <div class="card-header">
        <div class="card-logo">
          <img src="${program.logo}" alt="${program.name}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="card-badges">
          ${badges.join('')}
          <span class="badge badge-${program.difficulty}">${program.difficultyText}</span>
        </div>
      </div>

      <div class="card-body">
        <div class="card-name">${program.name}</div>
        <div class="card-desc">${program.description}</div>
      </div>

      <div class="card-reward">
        <span class="card-reward-amount">${program.rewardText}</span>
        <span class="card-reward-per">${program.rewardPer}</span>
      </div>

      <div class="card-footer">
        <div class="card-difficulty">
          <span class="difficulty-dot ${program.difficulty}"></span>
          <span>${program.difficultyText}</span>
        </div>
        <span class="btn btn-primary card-btn">Взять темку →</span>
      </div>
    </a>
  `;
}

// Calculator
function initCalculator() {
  const slider = document.getElementById('friends-slider');
  const valueDisplay = document.getElementById('friends-value');
  const resultDisplay = document.getElementById('calc-result');
  const breakdownContainer = document.getElementById('calc-breakdown');

  if (!slider) return;

  const update = () => {
    const count = parseInt(slider.value);
    valueDisplay.textContent = count;

    // Top 3 programs by reward
    const topPrograms = [...PROGRAMS]
      .sort((a, b) => b.reward - a.reward)
      .slice(0, 3);

    let totalMin = 0;
    let totalMax = 0;
    const breakdown = topPrograms.map(p => {
      const converted = Math.floor(count * (p.conversionEstimate / 100));
      const earned = converted * p.reward;
      totalMax += earned;
      totalMin += Math.floor(earned * 0.3);
      return { name: p.name, converted, earned };
    });

    resultDisplay.textContent = formatMoney(totalMax) + '₽';

    if (breakdownContainer) {
      breakdownContainer.innerHTML = breakdown
        .filter(b => b.converted > 0)
        .map(b => `
          <div class="calc-breakdown-item">
            <span class="calc-breakdown-company">${b.name} (${b.converted} чел.)</span>
            <span class="calc-breakdown-amount">+${formatMoney(b.earned)}₽</span>
          </div>
        `).join('');
    }

    // Update slider fill
    const pct = ((count - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    slider.style.background = `linear-gradient(to right, #FF6B35 ${pct}%, #1A1A1A ${pct}%)`;
  };

  slider.addEventListener('input', update);
  update();
}

// Format money
function formatMoney(amount) {
  if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'М';
  if (amount >= 1000) return (amount / 1000).toFixed(0) + ' 000';
  return amount.toString();
}

// Scroll effects
function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Sticky header
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}
