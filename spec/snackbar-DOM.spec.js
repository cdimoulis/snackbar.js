require('../src/snackbar');

beforeAll( () => {
  clearElement(document.body);
});

afterAll( () => {
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
    expect(wrap.lastChild.getAttribute('class')).toContain('snackbar');
    expect(wrap.lastChild.children.length).toBe(1);
    expect(wrap.lastChild.firstChild.getAttribute('class')).toContain('snackbar-text');
    expect(wrap.lastChild.firstChild.textContent).toBe('message');
  });

  // Success helper message
  test('success message', () => {
    s.success('yay');
    let wrap = document.getElementById('snackbar-wrapper');
    expect(wrap.lastChild.getAttribute('class')).toEqual(expect.stringContaining('success'));
  });

  // Error helper message
  test('error message', () => {
    s.error('oh no');
    let wrap = document.getElementById('snackbar-wrapper');
    expect(wrap.lastChild.getAttribute('class')).toEqual(expect.stringContaining('error'));
  });

  // Warn helper message
  test('warn message', () => {
    s.warn('maybe?');
    let wrap = document.getElementById('snackbar-wrapper');
    expect(wrap.lastChild.getAttribute('class')).toEqual(expect.stringContaining('warn'));
  });

  // Custom message
  test('custom message', () => {
    s.message('yay', {class: 'special'});
    let wrap = document.getElementById('snackbar-wrapper');
    expect(wrap.lastChild.getAttribute('class')).toEqual(expect.stringContaining('special'));
  });

  // Sticky helper message
  test('sticky message', () => {
    s.stickyMessage('yay');
    let wrap = document.getElementById('snackbar-wrapper');
    let el = wrap.lastChild;
    expect(el.lastChild.getAttribute('class')).toEqual(expect.stringContaining('snackbar-close'));
  });
});



function clearElement(wrapper) {
  while (wrapper.hasChildNodes()) {
    wrapper.removeChild(wrapper.lastChild);
  }
}
