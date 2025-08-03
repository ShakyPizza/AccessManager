import { roles } from './data/roles.js';
import { groups } from './data/groups.js';

function updateColor(element, color) {
  element.style.backgroundColor = color || '#ddd';
}

document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.getElementById('role-select');
  const groupSelect = document.getElementById('group-select');
  const roleDisplay = document.getElementById('role-display');
  const groupDisplay = document.getElementById('group-display');

  roles.forEach((role) => {
    const option = document.createElement('option');
    option.value = role.value;
    option.textContent = role.label;
    roleSelect.appendChild(option);
  });

  groups.forEach((group) => {
    const option = document.createElement('option');
    option.value = group.value;
    option.textContent = group.label;
    groupSelect.appendChild(option);
  });

  function onRoleChange() {
    const role = roles.find((r) => r.value === roleSelect.value);
    updateColor(roleDisplay, role && role.color);
  }

  function onGroupChange() {
    const group = groups.find((g) => g.value === groupSelect.value);
    updateColor(groupDisplay, group && group.color);
  }

  roleSelect.addEventListener('change', onRoleChange);
  groupSelect.addEventListener('change', onGroupChange);

  onRoleChange();
  onGroupChange();

  function resetForm() {
    roleSelect.selectedIndex = -1;
    groupSelect.selectedIndex = -1;
    roleDisplay.className = 'color-box';
    groupDisplay.className = 'color-box';
    roleDisplay.removeAttribute('style');
    groupDisplay.removeAttribute('style');
  }

  window.resetForm = resetForm;
});

if (typeof module !== 'undefined') {
  module.exports = { updateColor };
}
