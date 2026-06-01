document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const program = PROGRAMS.find(p => p.id === id);

  const main = document.getElementById('program-main');
  if (!program) {
    main.innerHTML = `
      <div class="container" style="padding-top: 140px; text-align: center;">
        <h1 class="text-heading" style="font-size: 32px; margin-bottom: 16px;">Программа не найдена</h1>
        <p style="color: var(--text-muted); margin-bottom: 32px;">Возможно, она была удалена или ссылка неверная</p>
        <a href="index.html" class="btn btn-primary">← Вернуться в каталог</a>
      </div>
    `;
    return;
  }

  document.title = `${program.name} — ТЕМКА`;

  const howSteps = program.details.howItWorks
    .split('→')
    .map(s => s.trim())
    .filter(Boolean);

  const otherPrograms = PROGRAMS
    .filter(p => p.id !== program.id && p.category === program.category)
    .slice(0, 3);

  main.innerHTML = `
    <!-- Hero -->
    <section class="program-hero">
      <div class="container">
        <nav class="program-breadcrumb">
          <a href="index.html">Каталог</a>
          <span class="program-breadcrumb-sep">→</span>
          <span>${getCategoryName(program.category)}</span>
          <span class="program-breadcrumb-sep">→</span>
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
              ${program.isHot ? '<span class="badge badge-hot">🔥 Хит</span>' : ''}
              ${program.isNew ? '<span class="badge badge-new">Новое</span>' : ''}
            </div>
            <p class="program-tagline">${program.description}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="program-content">
      <div class="container">
        <div class="program-layout">

          <!-- Main -->
          <div class="program-main-content">
            <div class="program-section">
              <h2 class="program-section-title">Как это работает</h2>
              <div class="how-steps">
                ${howSteps.map((step, i) => `
                  <div class="how-step">
                    <div class="how-step-num">${i + 1}</div>
                    <div class="how-step-text">${step}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="program-section">
              <h2 class="program-section-title">Условия выплаты</h2>
              <div class="conditions-list">
                ${program.details.conditions.map(c => `
                  <div class="condition-item">
                    <div class="condition-check">✓</div>
                    <span>${c}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="program-section">
              <h2 class="program-section-title">Кому подходит</h2>
              <div style="font-size: 15px; color: var(--text-secondary); line-height: 1.7;">
                <p>Эта программа хорошо работает если у тебя есть:</p>
                <br>
                ${getTargetAudience(program)}
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="program-sidebar">
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
                  <span class="reward-meta-key">Выплата</span>
                  <span class="reward-meta-value">${program.details.payoutTime}</span>
                </div>
                <div class="reward-meta-item">
                  <span class="reward-meta-key">Мин. выплата</span>
                  <span class="reward-meta-value">${formatMoney(program.details.minPayout)}₽</span>
                </div>
                <div class="reward-meta-item">
                  <span class="reward-meta-key">Конверсия</span>
                  <span class="reward-meta-value">~${program.conversionEstimate}%</span>
                </div>
              </div>

              <a href="#" class="btn btn-primary take-btn" onclick="handleTake(event, '${program.id}')">
                Взять темку →
              </a>
              <p class="disclaimer">
                Ссылка откроется через нашу партнёрскую сеть. Вознаграждение получаешь ты.
              </p>
            </div>

            <a href="https://t.me/temka" target="_blank" rel="noopener"
               style="display: flex; align-items: center; gap: 10px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px; font-size: 13px; color: var(--text-secondary); transition: all var(--transition);"
               onmouseover="this.style.borderColor='var(--border-hover)'"
               onmouseout="this.style.borderColor='var(--border)'"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#2AABEE"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
              <span>Следи за новыми темками<br>в нашем Telegram-канале</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    ${otherPrograms.length > 0 ? `
    <!-- Other programs -->
    <section class="other-programs">
      <div class="container">
        <div class="section-header">
          <div class="text-label section-label">Похожие темки</div>
          <h2 class="text-heading" style="font-size: 28px;">Ещё в категории «${getCategoryName(program.category)}»</h2>
        </div>
        <div class="programs-grid">
          ${otherPrograms.map(renderCard).join('')}
        </div>
      </div>
    </section>
    ` : ''}
  `;

  // Scroll animations
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 100);
  });

  // Header scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
});

function handleTake(e, programId) {
  e.preventDefault();
  // In production: redirect to partner link via Admitad/ActionPay
  alert('Здесь будет ссылка на партнёрскую программу.\n\nДля запуска нужно подключить Admitad / ActionPay и подставить реальные ссылки.');
}

function getCategoryName(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat ? cat.label : categoryId;
}

function getTargetAudience(program) {
  const audiences = {
    banks: `
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Телеграм-чат или группа, где много студентов или молодёжи</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Аудитория в Instagram или VK которая ещё не открыла карту</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Друзья, которым ты лично можешь порекомендовать карту</li>
      </ul>
    `,
    delivery: `
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Знакомые, которые ищут подработку или хотят работать курьером</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Студенческие чаты — там всегда есть те, кому нужна работа</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Группы ищущих работу в своём городе</li>
      </ul>
    `,
    marketplaces: `
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Знакомые предприниматели или те, кто хочет открыть бизнес</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Чаты о бизнесе и маркетплейсах</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Тематические форумы и сообщества селлеров</li>
      </ul>
    `,
    education: `
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Родители, которые хотят дать детям дополнительное образование</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Молодёжь, которая хочет освоить новую профессию</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Сообщества по саморазвитию и карьере</li>
      </ul>
    `,
    investments: `
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Знакомые, которые интересуются финансовой грамотностью</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Чаты об инвестициях и личных финансах</li>
        <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--money)">→</span> Молодые специалисты, которые начинают копить</li>
      </ul>
    `
  };
  return audiences[program.category] || '<p>Широкая аудитория</p>';
}

function formatMoney(amount) {
  if (amount >= 1000) return (amount / 1000).toFixed(0) + ' 000';
  return amount.toString();
}

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
