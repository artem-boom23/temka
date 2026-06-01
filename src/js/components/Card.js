import { trackClick } from '../utils/tracker.js';

export function renderCard(program) {
  const badges = [
    program.isHot && '<span class="badge badge-hot">🔥 Хит</span>',
    program.isNew && '<span class="badge badge-new">Новое</span>',
  ].filter(Boolean).join('');

  const href   = program.partnerUrl || `/pages/program.html?id=${program.id}`;
  const target = program.partnerUrl ? 'target="_blank" rel="noopener noreferrer"' : '';

  return `
    <a class="program-card${program.isHot ? ' is-hot' : ''}"
       href="${href}" ${target}
       data-program-id="${program.id}">
      <div class="card-header">
        <div class="card-logo">
          <img src="${program.logo}" alt="${program.name}" loading="lazy"
               onerror="this.style.display='none'">
        </div>
        <div class="card-badges">
          ${badges}
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

export function attachCardTracking(container, programs) {
  container.addEventListener('click', e => {
    const card = e.target.closest('.program-card');
    if (!card) return;
    const program = programs.find(p => p.id === card.dataset.programId);
    if (program) trackClick(program);
  });
}
