require('../src/snackbar');

beforeAll( () => {
  clearElement(document.body);
});

test('temp',() =>{

});

function clearElement(wrapper) {
  while (wrapper.hasChildNodes()) {
    wrapper.removeChild(wrapper.lastChild);
  }
}
