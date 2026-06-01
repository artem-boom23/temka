import { PROGRAMS } from '../data/programs.js';
import { formatMoney } from '../utils/helpers.js';

const TOP_PROGRAMS = [...PROGRAMS].sort((a, b) => b.reward - a.reward).slice(0, 3);

export function initCalculator() {
  const slider    = document.getElementById('friends-slider');
  const valueEl   = document.getElementById('friends-value');
  const resultEl  = document.getElementById('calc-result');
  const breakdownEl = document.getElementById('calc-breakdown');
  const ctaBtn    = document.getElementById('calc-cta');

  if (!slider) return;

  const update = () => {
    const count = parseInt(slider.value, 10);
    valueEl.textContent = count;

    let total = 0;
    const lines = TOP_PROGRAMS.map(p => {
      const converted = Math.floor(count * (p.conversionEstimate / 100));
      const earned    = converted * p.reward;
      total += earned;
      return { name: p.name, converted, earned };
    });

    resultEl.textContent = formatMoney(total) + '₽';

    breakdownEl.innerHTML = lines
      .filter(l => l.converted > 0)
      .map(l => `
        <div class="calc-breakdown-item">
          <span class="calc-breakdown-company">${l.name} (${l.converted} чел.)</span>
          <span class="calc-breakdown-amount">+${formatMoney(l.earned)}₽</span>
        </div>
      `).join('');

    const pct = ((count - +slider.min) / (+slider.max - +slider.min)) * 100;
    slider.style.background =
      `linear-gradient(to right, #FF6B35 ${pct}%, #1A1A1A ${pct}%)`;
  };

  slider.addEventListener('input', update);
  update();
}
