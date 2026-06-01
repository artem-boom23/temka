import { IS_SUPABASE_CONFIGURED, SUPABASE_URL, SUPABASE_ANON } from '../config.js';
import { PROGRAMS } from '../data/programs.js';

// ── Supabase client (lazy) ──────────────────────────────────────────────────
let db = null;
async function getDb() {
  if (db) return db;
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  db = createClient(SUPABASE_URL, SUPABASE_ANON);
  return db;
}

// ── Demo data (shown when Supabase is not yet configured) ───────────────────
function generateDemoData() {
  const programs = PROGRAMS.slice(0, 6);
  const now = Date.now();
  const clicks = [];

  for (let d = 6; d >= 0; d--) {
    const dayBase = now - d * 86400000;
    const count = Math.floor(Math.random() * 18) + (d === 0 ? 8 : 4);
    for (let i = 0; i < count; i++) {
      const p = programs[Math.floor(Math.random() * programs.length)];
      clicks.push({
        id:           Math.random().toString(36).slice(2),
        program_id:   p.id,
        program_name: p.name,
        category:     p.category,
        referrer:     ['direct','t.me/temka','instagram.com','vk.com'][Math.floor(Math.random()*4)],
        created_at:   new Date(dayBase - Math.random() * 80000000).toISOString(),
      });
    }
  }
  return clicks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

// ── Data fetching ───────────────────────────────────────────────────────────
async function fetchClicks() {
  if (!IS_SUPABASE_CONFIGURED) return generateDemoData();

  const client = await getDb();
  const since  = new Date(Date.now() - 7 * 86400000).toISOString();
  const { data, error } = await client
    .from('clicks')
    .select('*')
    .gte('created_at', since)
    .order('created_at', { ascending: false });

  if (error) { console.error(error); return generateDemoData(); }
  return data;
}

async function fetchUser() {
  if (!IS_SUPABASE_CONFIGURED) return null;
  const client = await getDb();
  const { data: { user } } = await client.auth.getUser();
  return user;
}

// ── Auth ────────────────────────────────────────────────────────────────────
async function handleLogin(email, password) {
  if (!IS_SUPABASE_CONFIGURED) {
    // Demo mode: allow any login
    return { user: { email }, error: null };
  }
  const client = await getDb();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  return { user: data?.user, error };
}

async function handleLogout() {
  if (!IS_SUPABASE_CONFIGURED) { renderAuth(); return; }
  const client = await getDb();
  await client.auth.signOut();
  renderAuth();
}

// ── Charts ──────────────────────────────────────────────────────────────────
function buildDailyChart(clicks) {
  const days = [];
  for (let d = 6; d >= 0; d--) {
    const date = new Date(Date.now() - d * 86400000);
    days.push({
      label: date.toLocaleDateString('ru', { weekday: 'short' }),
      date:  date.toDateString(),
      count: 0,
    });
  }
  clicks.forEach(c => {
    const d = new Date(c.created_at).toDateString();
    const slot = days.find(s => s.date === d);
    if (slot) slot.count++;
  });
  return days;
}

function renderBarChart(days) {
  const max = Math.max(...days.map(d => d.count), 1);
  return days.map(d => {
    const pct = Math.round((d.count / max) * 100);
    return `
      <div class="chart-bar-col">
        <div class="chart-bar" style="height:${pct}%">
          <div class="chart-bar-tip">${d.count}</div>
        </div>
        <span class="chart-label">${d.label}</span>
      </div>`;
  }).join('');
}

// ── Stats ───────────────────────────────────────────────────────────────────
function buildProgramStats(clicks) {
  const map = {};
  clicks.forEach(c => {
    if (!map[c.program_id]) {
      map[c.program_id] = { id: c.program_id, name: c.program_name, count: 0 };
    }
    map[c.program_id].count++;
  });
  return Object.values(map).sort((a, b) => b.count - a.count);
}

function todayCount(clicks) {
  const today = new Date().toDateString();
  return clicks.filter(c => new Date(c.created_at).toDateString() === today).length;
}

function formatTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - d) / 60000);
  if (diff < 1) return 'только что';
  if (diff < 60) return `${diff} мин назад`;
  if (diff < 1440) return `${Math.floor(diff / 60)} ч назад`;
  return d.toLocaleDateString('ru', { day: 'numeric', month: 'short' });
}

function topProgram(stats) {
  return stats[0]?.name ?? '—';
}

// ── Render auth screen ───────────────────────────────────────────────────────
function renderAuth() {
  document.getElementById('app').innerHTML = `
    <div class="auth-screen">
      <div class="auth-card">
        <div class="auth-logo">ТЕМКА<span>.</span></div>
        <div class="auth-subtitle">Личный кабинет</div>

        <form id="login-form">
          <div class="form-field">
            <label class="form-label" for="email">Email</label>
            <input class="form-input" type="email" id="email"
                   placeholder="you@example.com"
                   value="${IS_SUPABASE_CONFIGURED ? '' : 'demo@temka.ru'}" required>
          </div>
          <div class="form-field">
            <label class="form-label" for="password">Пароль</label>
            <input class="form-input" type="password" id="password"
                   placeholder="••••••••"
                   value="${IS_SUPABASE_CONFIGURED ? '' : 'demo'}" required>
          </div>
          <div class="form-error" id="login-error"></div>
          <button class="btn btn-primary auth-submit" type="submit" id="login-btn">
            Войти →
          </button>
        </form>

        ${!IS_SUPABASE_CONFIGURED ? `
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--border);
               font-size:12px;color:var(--text-muted);line-height:1.6">
            🎭 Демо-режим активен — данные ненастоящие.<br>
            Настрой Supabase в <code style="color:var(--accent)">src/js/config.js</code>
          </div>` : ''}
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('login-btn');
    const err = document.getElementById('login-error');
    btn.textContent = 'Входим…';
    btn.disabled = true;
    err.classList.remove('show');

    const email    = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { user, error } = await handleLogin(email, password);

    if (error || !user) {
      err.textContent = error?.message ?? 'Неверный email или пароль';
      err.classList.add('show');
      btn.textContent = 'Войти →';
      btn.disabled = false;
      return;
    }
    renderDashboard(user);
  });
}

// ── Render dashboard ─────────────────────────────────────────────────────────
async function renderDashboard(user) {
  const app = document.getElementById('app');

  // Skeleton placeholder while loading
  app.innerHTML = `
    <div class="admin-wrap">
      <header class="admin-header">
        <div class="container">
          <div class="admin-header-inner">
            <div class="admin-logo">ТЕМКА<span class="admin-logo-dot">.</span>
              <span class="admin-logo-sub">Кабинет</span>
            </div>
            <div class="admin-user">
              <span>${user.email}</span>
              <button class="btn btn-ghost" style="padding:6px 14px;font-size:12px" id="logout-btn">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="admin-main">
        <div class="container">
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="skeleton" style="height:48px;width:260px"></div>
            <div class="kpi-grid">
              ${[1,2,3,4].map(() => `<div class="skeleton" style="height:100px"></div>`).join('')}
            </div>
            <div class="skeleton" style="height:280px"></div>
          </div>
        </div>
      </main>
    </div>`;

  document.getElementById('logout-btn').addEventListener('click', handleLogout);

  const clicks = await fetchClicks();
  const days   = buildDailyChart(clicks);
  const stats  = buildProgramStats(clicks);
  const today  = todayCount(clicks);
  const maxCount = Math.max(...stats.map(s => s.count), 1);

  app.innerHTML = `
    <div class="admin-wrap">
      <header class="admin-header">
        <div class="container">
          <div class="admin-header-inner">
            <div style="display:flex;align-items:center">
              <a href="/" class="admin-logo" style="text-decoration:none;color:inherit">
                ТЕМКА<span class="admin-logo-dot">.</span>
              </a>
              <span class="admin-logo-sub">Кабинет</span>
            </div>
            <div class="admin-user">
              <span>${user.email}</span>
              <button class="btn btn-ghost" style="padding:6px 14px;font-size:12px" id="logout-btn">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="admin-main">
        <div class="container">

          ${!IS_SUPABASE_CONFIGURED ? `
          <div class="setup-banner">
            <div class="setup-banner-icon">⚙️</div>
            <div>
              <div class="setup-banner-title">Демо-режим — данные ненастоящие</div>
              <div class="setup-banner-desc">
                Создай проект на <strong>supabase.com</strong>, вставь ключи в
                <code>src/js/config.js</code>, выполни SQL-скрипт из
                <code>supabase/schema.sql</code> — и увидишь реальные клики.
              </div>
            </div>
          </div>` : ''}

          <div class="admin-page-title">Аналитика</div>
          <div class="admin-page-sub">Последние 7 дней • обновлено только что</div>

          <!-- KPIs -->
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-icon">👆</div>
              <div class="kpi-value accent">${clicks.length}</div>
              <div class="kpi-label">Кликов за 7 дней</div>
              <div class="kpi-delta up">↑ за последнюю неделю</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-icon">📅</div>
              <div class="kpi-value">${today}</div>
              <div class="kpi-label">Кликов сегодня</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-icon">🏆</div>
              <div class="kpi-value" style="font-size:18px;padding-top:6px">${topProgram(stats)}</div>
              <div class="kpi-label">Топ программа</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-icon">💳</div>
              <div class="kpi-value money">${stats.length}</div>
              <div class="kpi-label">Программ в работе</div>
            </div>
          </div>

          <!-- Chart + recent -->
          <div class="admin-grid-2">

            <!-- Bar chart -->
            <div class="panel">
              <div class="panel-header">
                <span class="panel-title">Клики по дням</span>
                <span class="panel-badge">7 дней</span>
              </div>
              <div class="chart-wrap">
                <div class="chart-bars">${renderBarChart(days)}</div>
                <div class="chart-summary">
                  <div class="chart-sum-item">
                    <div class="chart-sum-val">${clicks.length}</div>
                    Всего кликов
                  </div>
                  <div class="chart-sum-item">
                    <div class="chart-sum-val">${Math.round(clicks.length / 7)}</div>
                    В среднем / день
                  </div>
                  <div class="chart-sum-item">
                    <div class="chart-sum-val">${today}</div>
                    Сегодня
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent clicks -->
            <div class="panel">
              <div class="panel-header">
                <span class="panel-title">Последние клики</span>
                <span class="panel-badge">${clicks.length}</span>
              </div>
              <div class="clicks-list">
                ${clicks.slice(0, 12).map(c => `
                  <div class="click-item">
                    <div class="click-dot"></div>
                    <div class="click-info">
                      <div class="click-program">${c.program_name}</div>
                      <div class="click-meta">${c.referrer}</div>
                    </div>
                    <div class="click-time">${formatTime(c.created_at)}</div>
                  </div>`).join('')}
                ${clicks.length === 0 ? `
                  <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>Кликов пока нет</h3>
                    <p>Они появятся когда кто-то нажмёт «Взять темку»</p>
                  </div>` : ''}
              </div>
            </div>
          </div>

          <!-- Programs table -->
          <div class="panel">
            <div class="panel-header">
              <span class="panel-title">По программам</span>
              <span class="panel-badge">${stats.length} программ</span>
            </div>
            <div style="overflow-x:auto">
              <table class="prog-table">
                <thead>
                  <tr>
                    <th>Программа</th>
                    <th>Клики за 7 дн.</th>
                    <th>Выплата</th>
                    <th>Ест. доход</th>
                  </tr>
                </thead>
                <tbody>
                  ${stats.map(s => {
                    const prog = PROGRAMS.find(p => p.id === s.id);
                    const est  = Math.floor(s.count * ((prog?.conversionEstimate ?? 10) / 100) * (prog?.reward ?? 0));
                    const pct  = Math.round((s.count / maxCount) * 100);
                    return `
                      <tr>
                        <td>
                          <div class="prog-name-cell">
                            <div class="prog-logo-sm">
                              <img src="${prog?.logo ?? ''}" alt="${s.name}"
                                   onerror="this.style.display='none'">
                            </div>
                            <span class="prog-name">${s.name}</span>
                          </div>
                        </td>
                        <td>
                          <div class="prog-bar-wrap">
                            <div class="prog-bar-track">
                              <div class="prog-bar-fill" style="width:${pct}%"></div>
                            </div>
                            <span class="prog-count">${s.count}</span>
                          </div>
                        </td>
                        <td>${prog?.rewardText ?? '—'}</td>
                        <td class="prog-money">~${est.toLocaleString('ru')}₽</td>
                      </tr>`;
                  }).join('')}
                  ${stats.length === 0 ? `
                    <tr><td colspan="4">
                      <div class="empty-state">
                        <div class="empty-state-icon">📊</div>
                        <h3>Нет данных</h3>
                      </div>
                    </td></tr>` : ''}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>`;

  document.getElementById('logout-btn').addEventListener('click', handleLogout);
}

// ── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  if (!IS_SUPABASE_CONFIGURED) {
    // Demo mode — skip real auth
    renderAuth();
    return;
  }

  const user = await fetchUser();
  if (user) {
    renderDashboard(user);
  } else {
    renderAuth();
  }
});
