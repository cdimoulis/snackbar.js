require('../src/snackbar');

beforeEach( () => {
  clearElement(document.body);
});

// Wait for promise to finish to test the _changeOpacity function
test('_changeOpacity', () => {
  let snack = new Snackbar();
  return snack.message('wait').then( () => {
    let s = document.getElementsByClassName('snackbar')[0];
    expect(s).not.toBeUndefined();
    expect(s.style.opacity).toBe('1');
  });
});

// Wait for promise on _removeSnackbar
test('_removeSnackbar', () => {
  let snack = new Snackbar();
  snack.stickyMessage('wait');
  let s = document.getElementsByClassName('snackbar')[0];
  return snack._removeSnackbar(s).then( () => {
    expect(s.style.opacity).toBe('0');
    expect(document.getElementsByClassName('snackbar')[0]).toBeUndefined();
  });
});

// Test the onclick of a sticky message
test('onclick', () => {
  let snack = new Snackbar();
  snack.stickyMessage('click');
  let close = document.getElementsByClassName('snackbar-close')[0];
  return close.onclick().then( () => {
    expect(document.getElementsByClassName('snackbar')[0]).toBeUndefined();
  });
});

function clearElement(wrapper) {
  while (wrapper.hasChildNodes()) {
    wrapper.removeChild(wrapper.lastChild);
  }
}
