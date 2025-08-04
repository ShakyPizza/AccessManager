import { groups } from './data/groups.js';
import { doors } from './data/Doorlist.js';
import { updateColor } from './updateColor.js';

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

function init() {
  populateGroupOptions();

  groupSelects.forEach((select, idx) => {
    select.addEventListener('change', () => onGroupChange(select, displays[idx]));
  });

  populateDoorLists();
  resetForm();
}

init();
window.resetForm = resetForm;
