import { groups } from './data/groups.js';
import { updateColor } from './updateColor.js';

document.addEventListener('DOMContentLoaded', () => {
  const group1Select = document.getElementById('group1-select');
  const group2Select = document.getElementById('group2-select');
  const group3Select = document.getElementById('group3-select');
  const group1Display = document.getElementById('group1-display');
  const group2Display = document.getElementById('group2-display');
  const group3Display = document.getElementById('group3-display');

  [group1Select, group2Select, group3Select].forEach((select) => {
    groups.forEach((group) => {
      const option = document.createElement('option');
      option.value = group.value;
      option.textContent = group.label;
      select.appendChild(option);
    });
  });

  function onGroupChange(select, display) {
    const group = groups.find((g) => g.value === select.value);
    updateColor(display, group && group.color);
  }

  group1Select.addEventListener('change', () => onGroupChange(group1Select, group1Display));
  group2Select.addEventListener('change', () => onGroupChange(group2Select, group2Display));
  group3Select.addEventListener('change', () => onGroupChange(group3Select, group3Display));

  onGroupChange(group1Select, group1Display);
  onGroupChange(group2Select, group2Display);
  onGroupChange(group3Select, group3Display);

  function resetForm() {
    [group1Select, group2Select, group3Select].forEach((select) => {
      select.selectedIndex = -1;
    });

    [group1Display, group2Display, group3Display].forEach((display) => {
      display.className = 'color-box';
      display.removeAttribute('style');
    });
  }

  window.resetForm = resetForm;
});

