import { groups } from './data/groups.js';
import { doors } from './data/Doorlist.js';
import { updateColor } from './updateColor.js';

const group1Select = document.getElementById('group1-select');
const group2Select = document.getElementById('group2-select');
const group3Select = document.getElementById('group3-select');
const group1Display = document.getElementById('group1-display');
const group2Display = document.getElementById('group2-display');
const group3Display = document.getElementById('group3-display');
const listAOnly = document.getElementById('group-a-only-doors');
const listAB = document.getElementById('group-ab-doors');
const listABC = document.getElementById('group-abc-doors');

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
      lists[key].appendChild(li);
    }
  });
}

function onGroupChange(select, display) {
  const group = groups.find((g) => g.value === select.value);
  updateColor(display, group && group.color);
}

function resetForm() {
  [group1Select, group2Select, group3Select].forEach((select) => {
    select.value = '';
  });

  [group1Display, group2Display, group3Display].forEach((display) => {
    updateColor(display, '');
  });
}

function init() {
  [group1Select, group2Select, group3Select].forEach((select) => {
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

  group1Select.addEventListener('change', () => onGroupChange(group1Select, group1Display));
  group2Select.addEventListener('change', () => onGroupChange(group2Select, group2Display));
  group3Select.addEventListener('change', () => onGroupChange(group3Select, group3Display));

  populateDoorLists();
  resetForm();
}

init();
window.resetForm = resetForm;

