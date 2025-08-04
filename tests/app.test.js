import { updateColor } from '../docs/src/updateColor.js';

describe('updateColor', () => {
  test('sets provided color on element', () => {
    const element = { style: { backgroundColor: '' } };
    updateColor(element, '#123456');
    expect(element.style.backgroundColor).toBe('#123456');
  });

  test('uses default color when none provided', () => {
    const element = { style: { backgroundColor: 'red' } };
    updateColor(element, '');
    expect(element.style.backgroundColor).toBe('#ddd');
  });
});
