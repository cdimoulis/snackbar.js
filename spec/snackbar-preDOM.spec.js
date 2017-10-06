require('../src/snackbar');

afterAll( () => {
  clearElement(document.body);
});

// Remove the body before each test since this is the goal of this file
describe('Pre Dom actions', () => {
  let s; // Snackbar

  beforeEach( () => {
    if (document.body)
      document.body.remove();
  });

  // Snackbar handles DOM is not ready
  test('Snackbar waits to add DOM', () => {
    s = new Snackbar();
    expect(document.getElementById('snackbar-wrapper')).toBeNull();
    // Add a new body back to document
    document.body = document.createElement('body');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(document.getElementById('snackbar-wrapper')).toBeInstanceOf(HTMLDivElement);
  });

  // Snackbar handles DOM is not ready in IE<9 (this is dumb)
  test('Snackbar waits to add DOM (OLD BROWSER)', () => {
    // Use attachEvent for old ID
    document.attachEvent = document.addEventListener;
    document.detachEvent = document.removeEventListener;
    document.addEventListener = null;
    document.removeEventListener = null;
    let s = new Snackbar();
    expect(document.getElementById('snackbar-wrapper')).toBeNull();
    // Add a new body back to document
    document.body = document.createElement('body');
    let event = document.createEvent('Event');
    event.initEvent('onreadystatechange', true, true);
    document.dispatchEvent(event);
    expect(document.getElementById('snackbar-wrapper')).toBeInstanceOf(HTMLDivElement);
    // Reset document event functions
    document.addEventListener = document.attachEvent;
    document.removeEventListener = document.detachEvent;
    document.attachEvent = null;
    document.detachEvent = null;
  });

  // Snackbar stores calls pre DOM in the pre_dom_queue
  test('pre_dom_queue contents', () => {
    s = new Snackbar();
    expect(s.pre_dom_queue.length).toBe(0)
    s.stickyMessage('message');
    s.stickyMessage('temp');
    expect(s.pre_dom_queue.length).toBe(2)
    expect(s.pre_dom_queue[0]).toEqual({
      snackbar: s,
      message: 'message',
      opts: {manual_close: true, time: 5000}
    });
  });

  // Snackbar flush displays in correct order
  test('pre_dom_queue flushes in order', () => {
    expect(s.pre_dom_queue.length).toBe(2)
    document.body = document.createElement('body');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    let wrap = document.getElementById('snackbar-wrapper');
    let t1 = wrap.children[0].getElementsByClassName('snackbar-text');
    let t2 = wrap.children[1].getElementsByClassName('snackbar-text');
    expect(t1[0].textContent).toEqual('message');
    expect(t2[0].textContent).toEqual('temp');
  });
});
