import { groups } from './data/groups.js';
import { doors } from './data/Doorlist.js';
import { updateColor } from './updateColor.js';

// ── Existing list-view elements ───────────────────────────────────────────────
const groupSelects = [
  document.getElementById('group1-select'),
  document.getElementById('group2-select'),
  document.getElementById('group3-select'),
];

const displays = [
  document.getElementById('group1-display'),
  document.getElementById('group2-display'),
  document.getElementById('group3-display'),
];

const listAOnly = document.getElementById('group-a-only-doors');
const listAB = document.getElementById('group-ab-doors');
const listABC = document.getElementById('group-abc-doors');

// ── Tab switching ─────────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// ── List-view functions ───────────────────────────────────────────────────────
function getSelectedGroups() {
  return groupSelects.map((s) => s.value).filter(Boolean);
}

function updateDoorIndicators() {
  const selected = getSelectedGroups();
  document.querySelectorAll('.door-list li').forEach((li) => {
    const indicators = li.querySelector('.group-indicators');
    indicators.innerHTML = '';

    const doorGroups = li.dataset.groups.split(',');
    selected.forEach((value) => {
      if (doorGroups.includes(value)) {
        const group = groups.find((g) => g.value === value);
        if (group) {
          const span = document.createElement('span');
          span.style.backgroundColor = group.color;
          indicators.appendChild(span);
        }
      }
    });
  });
}

function populateGroupOptions() {
  groupSelects.forEach((select) => {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '';
    select.appendChild(placeholder);

    groups.forEach((group) => {
      const option = document.createElement('option');
      option.value = group.value;
      option.textContent = group.label;
      select.appendChild(option);
    });
  });
}

function onGroupChange(select, display) {
  const group = groups.find((g) => g.value === select.value);
  updateColor(display, group && group.color);
  updateDoorIndicators();
}

function resetForm() {
  groupSelects.forEach((select) => {
    select.value = '';
  });

  displays.forEach((display) => {
    updateColor(display, '');
  });

  updateDoorIndicators();
}

function populateDoorLists() {
  const lists = { aOnly: listAOnly, ab: listAB, abc: listABC };
  Object.values(lists).forEach((ul) => {
    ul.innerHTML = '';
  });

  doors.forEach((door) => {
    const hasA = door.groups.includes('a');
    const hasB = door.groups.includes('b');
    const hasC = door.groups.includes('c');

    let key = null;
    if (hasA && !hasB && !hasC) key = 'aOnly';
    else if (hasA && hasB && !hasC) key = 'ab';
    else if (hasA && hasB && hasC) key = 'abc';

    if (key) {
      const li = document.createElement('li');
      li.textContent = door.label;
      li.dataset.groups = door.groups.join(',');

      const indicators = document.createElement('div');
      indicators.className = 'group-indicators';
      li.appendChild(indicators);

      lists[key].appendChild(li);
    }
  });
}

// ── Swimlane view ─────────────────────────────────────────────────────────────
const TIER_COLORS = {
  aOnly: '#f1c40f',
  ab: '#9b59b6',
  abc: '#e67e22',
};

const activeChips = new Set();

function getDoorTier(door) {
  const hasA = door.groups.includes('a');
  const hasB = door.groups.includes('b');
  const hasC = door.groups.includes('c');
  if (hasA && !hasB && !hasC) return 'aOnly';
  if (hasA && hasB && !hasC) return 'ab';
  if (hasA && hasB && hasC) return 'abc';
  return null;
}

function renderDoorCard(door, tier) {
  const card = document.createElement('div');
  card.className = 'door-card';
  card.dataset.groups = door.groups.join(',');
  card.style.setProperty('--tier-color', TIER_COLORS[tier]);

  const name = document.createElement('div');
  name.className = 'card-name';
  name.textContent = door.label;
  card.appendChild(name);

  const dots = document.createElement('div');
  dots.className = 'card-groups';
  // Deduplicate groups for display
  [...new Set(door.groups)].forEach((gVal) => {
    const g = groups.find((x) => x.value === gVal);
    if (g) {
      const dot = document.createElement('span');
      dot.style.backgroundColor = g.color;
      dot.title = g.label;
      dots.appendChild(dot);
    }
  });
  card.appendChild(dots);

  return card;
}

function updateCardFilter() {
  document.querySelectorAll('.door-card').forEach((card) => {
    if (activeChips.size === 0) {
      card.classList.remove('dimmed', 'highlighted');
      return;
    }
    const cardGroups = card.dataset.groups.split(',');
    const matches = [...activeChips].some((g) => cardGroups.includes(g));
    card.classList.toggle('dimmed', !matches);
    card.classList.toggle('highlighted', matches);
  });
}

function renderSwimlaneView() {
  const chipBar = document.getElementById('chip-bar');
  const cardsAOnly = document.getElementById('cards-a-only');
  const cardsAB = document.getElementById('cards-ab');
  const cardsABC = document.getElementById('cards-abc');

  // Render filter chips
  groups.forEach((group) => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.group = group.value;
    btn.style.setProperty('--chip-color', group.color);

    const dot = document.createElement('span');
    dot.className = 'chip-dot';
    btn.appendChild(dot);
    btn.appendChild(document.createTextNode(group.label));

    btn.addEventListener('click', () => {
      if (activeChips.has(group.value)) {
        activeChips.delete(group.value);
        btn.classList.remove('active');
      } else {
        activeChips.add(group.value);
        btn.classList.add('active');
      }
      updateCardFilter();
    });

    chipBar.appendChild(btn);
  });

  // Render door cards into their swimlanes
  const targets = { aOnly: cardsAOnly, ab: cardsAB, abc: cardsABC };
  doors.forEach((door) => {
    const tier = getDoorTier(door);
    if (!tier) return;
    targets[tier].appendChild(renderDoorCard(door, tier));
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
  initTabs();
  populateGroupOptions();

  groupSelects.forEach((select, idx) => {
    select.addEventListener('change', () => onGroupChange(select, displays[idx]));
  });

  populateDoorLists();
  resetForm();
  renderSwimlaneView();
}

init();
window.resetForm = resetForm;
