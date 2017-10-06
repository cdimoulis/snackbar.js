require('../src/snackbar');

beforeAll( () => {
  clearElement(document.body);
});

describe('Wrapper', () => {
  // Snackbar wrapper added
  test('Snackbar _setDom wrapper added', () => {
    expect(document.getElementById('snackbar-wrapper')).toBeNull();
    let s = new Snackbar();
    expect(document.getElementById('snackbar-wrapper')).toBeInstanceOf(HTMLDivElement);
  });
});

describe('messages', () => {
  let s = new Snackbar();
  // Standard message
  test('Message', () => {
    s.message('message');
    let wrap = document.getElementById('snackbar-wrapper');
    expect(wrap.children.length).toBe(1);
    expect(wrap.firstChild.getAttribute('class')).toContain('snackbar');
    expect(wrap.firstChild.children.length).toBe(1);
    expect(wrap.firstChild.firstChild.getAttribute('class')).toContain('snackbar-text');
    expect(wrap.firstChild.firstChild.textContent).toBe('message');
  });
});



function clearElement(wrapper) {
  while (wrapper.hasChildNodes()) {
    wrapper.removeChild(wrapper.lastChild);
  }
}
