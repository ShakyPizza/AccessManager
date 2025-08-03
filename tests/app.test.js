const { updateColor } = require('../src/app');

describe('updateColor', () => {
  test('maps value to corresponding class', () => {
    const element = {
      className: 'color-box role-user',
      classList: { add: jest.fn() },
    };
    updateColor(element, 'role-', 'admin');
    expect(element.className).toBe('color-box');
    expect(element.classList.add).toHaveBeenCalledWith('role-admin');
  });

  test('resets classes when value is empty', () => {
    const element = {
      className: 'color-box role-user',
      classList: { add: jest.fn() },
    };
    updateColor(element, 'role-', '');
    expect(element.className).toBe('color-box');
    expect(element.classList.add).not.toHaveBeenCalled();
  });
});
