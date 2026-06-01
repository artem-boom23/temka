import { PROGRAMS }          from '../data/programs.js';
import { renderCard }         from '../components/Card.js';
import { formatMoney, getCategoryName, initScrollReveal, initStickyHeader } from '../utils/helpers.js';

const id      = new URLSearchParams(location.search).get('id');
const program = PROGRAMS.find(p => p.id === id);
const main    = document.getElementById('program-main');

document.addEventListener('DOMContentLoaded', () => {
  if (!program) { renderNotFound(); return; }

  document.title = `${program.name} — ТЕМКА`;
  renderPage();
  initScrollReveal();
  initStickyHeader();
});

function renderNotFound() {
  main.innerHTML = `
    <div class="container" style="padding-top:140px;text-align:center">
      <h1 class="text-heading" style="font-size:32px;margin-bottom:16px">Программа не найдена</h1>
      <p style="color:var(--text-muted);margin-bottom:32px">Проверь ссылку или вернись в каталог</p>
      <a href="/" class="btn btn-primary">← В каталог</a>
    </div>`;
}

function renderPage() {
  const steps = program.details.howItWorks.split('→').map(s => s.trim()).filter(Boolean);
  const related = PROGRAMS.filter(p => p.id !== program.id && p.category === program.category).slice(0, 3);

  const hotBadge = program.isHot ? '<span class="badge badge-hot">🔥 Хит</span>' : '';
  const newBadge = program.isNew ? '<span class="badge badge-new">Новое</span>'  : '';

  main.innerHTML = `
    <section class="program-hero">
      <div class="container">
        <nav class="breadcrumb">
          <a href="/">Каталог</a>
          <span class="breadcrumb-sep">→</span>
          <span>${getCategoryName(program.category)}</span>
          <span class="breadcrumb-sep">→</span>
          <span>${program.name}</span>
        </nav>

        <div class="program-header">
          <div class="program-logo-large">
            <img src="${program.logo}" alt="${program.name}" onerror="this.style.display='none'">
          </div>
          <div class="program-meta">
            <h1 class="text-display program-name">${program.name}</h1>
            <div class="program-badges">
              <span class="badge badge-${program.difficulty}">${program.difficultyText}</span>
              ${hotBadge}${newBadge}
            </div>
            <p class="program-tagline">${program.description}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="program-content">
      <div class="container">
        <div class="program-layout">

          <div>
            <div class="program-section">
              <h2 class="program-section-title">Как это работает</h2>
              <div class="how-steps">
                ${steps.map((s, i) => `
                  <div class="how-step">
                    <div class="how-step-num">${i + 1}</div>
                    <div class="how-step-text">${s}</div>
                  </div>`).join('')}
              </div>
            </div>

            <div class="program-section">
              <h2 class="program-section-title">Условия выплаты</h2>
              <div class="conditions-list">
                ${program.details.conditions.map(c => `
                  <div class="condition-item">
                    <div class="condition-check">✓</div>
                    <span>${c}</span>
                  </div>`).join('')}
              </div>
            </div>
          </div>

          <aside class="program-sidebar">
            <div class="reward-card">
              <div class="reward-label">Вознаграждение</div>
              <div class="reward-amount">${program.rewardText}</div>
              <div class="reward-per">${program.rewardPer}</div>

              <div class="reward-meta">
                <div class="reward-meta-item">
                  <span class="reward-meta-key">Сложность</span>
                  <span class="reward-meta-value">${program.difficultyText}</span>
                </div>
                <div class="reward-meta-item">
                  <span class="reward-meta-key">Выплата через</span>
                  <span class="reward-meta-value">${program.details.payoutTime}</span>
                </div>
                <div class="reward-meta-item">
                  <span class="reward-meta-key">Мин. выплата</span>
                  <span class="reward-meta-value">${formatMoney(program.details.minPayout)}₽</span>
                </div>
                <div class="reward-meta-item">
                  <span class="reward-meta-key">Конверсия ~</span>
                  <span class="reward-meta-value">${program.conversionEstimate}%</span>
                </div>
              </div>

              <button class="btn btn-primary take-btn" onclick="handleTake()">
                Взять темку →
              </button>
              <p class="disclaimer">
                Откроется через партнёрскую ссылку. Ты получаешь то же вознаграждение.
              </p>
            </div>

            <a href="https://t.me/temka" target="_blank" rel="noopener" class="sidebar-tg-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#2AABEE"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
              <span>Следи за новыми темками в Telegram</span>
            </a>
          </aside>

        </div>
      </div>
    </section>

    ${related.length ? `
    <section class="related-section">
      <div class="container">
        <div class="section-header">
          <div class="text-label section-label">Похожие темки</div>
          <h2 class="text-heading" style="font-size:28px">Ещё в категории «${getCategoryName(program.category)}»</h2>
        </div>
        <div class="programs-grid">
          ${related.map(renderCard).join('')}
        </div>
      </div>
    </section>` : ''}
  `;
}

window.handleTake = () => {
  alert('Здесь будет реальная партнёрская ссылка (Admitad / ActionPay).\nДобавь ссылки в data/programs.js после регистрации в партнёрке.');
};
