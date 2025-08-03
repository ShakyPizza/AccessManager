import { groups } from './data/groups.js';
import { doors } from './data/Doorlist.js';
import { updateColor } from './updateColor.js';

document.addEventListener('DOMContentLoaded', () => {
  const group1Select = document.getElementById('group1-select');
  const group2Select = document.getElementById('group2-select');
  const group3Select = document.getElementById('group3-select');
  const group1Display = document.getElementById('group1-display');
  const group2Display = document.getElementById('group2-display');
  const group3Display = document.getElementById('group3-display');
  const doorList = document.getElementById('door-list');

  [group1Select, group2Select, group3Select].forEach((select) => {
    groups.forEach((group) => {
      const option = document.createElement('option');
      option.value = group.value;
      option.textContent = group.label;
      select.appendChild(option);
    });
  });

  function getSelectedGroups() {
    return [group1Select.value, group2Select.value, group3Select.value].filter(Boolean);
  }

  function updateDoorList() {
    const selected = getSelectedGroups();
    const accessible = doors.filter((door) => door.groups.some((g) => selected.includes(g)));

    doorList.innerHTML = '';
    if (accessible.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Select groups to see doors';
      doorList.appendChild(li);
      return;
    }

    accessible.forEach((door) => {
      const li = document.createElement('li');
      li.textContent = door.label;

      const indicators = document.createElement('span');
      indicators.className = 'group-indicators';
      door.groups.forEach((groupValue) => {
        if (selected.includes(groupValue)) {
          const g = groups.find((gr) => gr.value === groupValue);
          const span = document.createElement('span');
          span.style.backgroundColor = g.color;
          indicators.appendChild(span);
        }
      });
      li.appendChild(indicators);
      doorList.appendChild(li);
    });
  }

  function onGroupChange(select, display) {
    const group = groups.find((g) => g.value === select.value);
    updateColor(display, group && group.color);
    updateDoorList();
  }

  group1Select.addEventListener('change', () => onGroupChange(group1Select, group1Display));
  group2Select.addEventListener('change', () => onGroupChange(group2Select, group2Display));
  group3Select.addEventListener('change', () => onGroupChange(group3Select, group3Display));

  onGroupChange(group1Select, group1Display);
  onGroupChange(group2Select, group2Display);
  onGroupChange(group3Select, group3Display);
  updateDoorList();

  function resetForm() {
    [group1Select, group2Select, group3Select].forEach((select) => {
      select.selectedIndex = -1;
    });

    [group1Display, group2Display, group3Display].forEach((display) => {
      display.className = 'color-box';
      display.removeAttribute('style');
    });

    updateDoorList();
  }

  window.resetForm = resetForm;
});

