function hello() {
  var snack = new Snackbar();
  snack.message('Hello World');
}
function sticky() {
  var snack = new Snackbar();
  snack.stickyMessage('Acknowledge me!');
}
function success() {
  var snack = new Snackbar();
  snack.success('You did it!');
}
function error() {
  var snack = new Snackbar();
  snack.error("Something didn't work");
}
function warn() {
  var snack = new Snackbar();
  snack.warn("I'd be careful if I were you...");
}
function custom() {
  var snack = new Snackbar();
  snack.message("My special snackbar", {class: 'my-snackbar your-snackbar'})
}
