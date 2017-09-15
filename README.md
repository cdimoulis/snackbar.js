# Snackbar.js

A simple implementation of the snackbar message pops up at the bottom of the page.  
View exmple at http://chrisdimoulis.com/snackbar.js

## Dependencies
**None!**

## Usage

#### Create Snackbar
```javascript
  // New snackbar with defaults
  var snack = new Snackbar();

  // New snackbar with custom default time
  var snack = new Snackbar({time: 2000});
```

All options passed when creating the snackbar object are default. Overrides can
be passed in each call to display a message.

##### Options
* `manual_close`: Boolean. Provide a close X button (true) vs timed close (false). *Default:* false
* `time`: ms of time before automatic close. (ignored if manual_close: true). *Default:* 5000
* `class`: String containing desired classes to add to snackbar. *Default:* empty

*Note:* A new snackbar object will not inject new `#snackbar-wrapper` elements. It simply creates a new object with a different set of default options for displaying a snackbar.

#### Displaying Messages
*Basics:*
```javascript
  // Display a message
  snack.message('Hello World');

  // Helper functions:
  // Display a message that must be removed manually ->
  snack.stickyMessage('Acknowledge me!');
  // Display a message with a green background (adds class 'success') ->
  snack.success('You did it!');
  // Display a message with a red background (adds class 'error') ->
  snack.error("Something didn't work");
  // Display a message with a orangish/yellow background (adds class 'warn') ->
  snack.warn("I'd be careful if I were you...");
```

#### Overriding Default options

```javascript
  // New snackbar with defaults
  var snack = new Snackbar();
  // Require user to close message just this one time
  snack.message('Read this', {manual_close: true})

  // New snackbar with custom default time
  var snack = new Snackbar({time: 2000});
  // Make this message stick longer than default
  snack.message("A slightly longer message..."), {time: 7500});
  // Add your own classes to the snackbar
  snack.message("My special snackbar", {class: 'my-snackbar your-snackbar'})
```
