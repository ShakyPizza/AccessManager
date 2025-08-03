function updateColor(element, baseClass, value) {
  element.className = 'color-box';
  if (value) {
    element.classList.add(baseClass + value);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.getElementById('role-select');
  const groupSelect = document.getElementById('group-select');
  const roleDisplay = document.getElementById('role-display');
  const groupDisplay = document.getElementById('group-display');

  function onRoleChange() {
    updateColor(roleDisplay, 'role-', roleSelect.value);
  }

  function onGroupChange() {
    updateColor(groupDisplay, 'group-', groupSelect.value);
  }

  roleSelect.addEventListener('change', onRoleChange);
  groupSelect.addEventListener('change', onGroupChange);

  // Initialize displays
  onRoleChange();
  onGroupChange();
});

if (typeof module !== 'undefined') {
  module.exports = { updateColor };
}
