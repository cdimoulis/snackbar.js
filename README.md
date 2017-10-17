# Snackbar.js (Vanilla-Snackbar)

A simple implementation of a full width snackbar message using "vanilla js".  
View exmple at http://chrisdimoulis.com/snackbar.js

[Changelog](https://github.com/cdimoulis/snackbar.js/blob/master/changelog.md)

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]

## Production Dependencies
**None!** (not even jquery)

## Installation

### Node

```
npm install --save vanilla-snackbar
```

## Usage

### Importing/Including

**Node**

Import `vanilla-snackbar` into your module:
```js
import Snackbar from 'vanilla-snackbar';
```

### Style
See `src/snackbar.scss` for default style and reference if you desire to override any styles.

### Pre DOM ready
If you create a snackbar and create a message before the DOM is ready the message will be stored in a queue which which will execute once the DOM is ready.

### Create Snackbar
```javascript
  // New snackbar with defaults
  var default_snack = new Snackbar();

  // New snackbar with custom default time
  var short_snack = new Snackbar({time: 2000});

  // New snackbar where the default behviour is to manually close
  var manual_snack = new Snackbar({manual_close: true});
```

All options passed when creating the snackbar object are default. Overrides can be passed in each call to display a message.

#### Available Options
* `manual_close`: Boolean. Provide a close X button (true) vs timed close (false). *Default:* false
* `time`: ms of time before automatic close. (ignored if `manual_close: true`). *Default:* 5000
* `class`: String containing desired classes to add to snackbar. *Default:* empty

**NOTE: Default Options and Multiple Snackbar Objects**

A new Snackbar object will not inject new `#snackbar-wrapper` elements. All Snackbar objects use the same wrapper. It simply creates a new object with a different set of default options for displaying a Snackbar message. See below for overriding default options on a message specific basis as opposed to creating multiple Snackbar objects.

### Displaying Messages

Displaying a message is as simple as calling the `.message(msg, opts)` function of the Snackbar. There are also four helper methods for common Snackbar usage. All of these functions take 2 parameters:

* `msg`: the message to be displayed.
* `opts`: the options to override default options.

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

Creating a Snackbar message will return a Promise object. This promise object will resolve when the Snackbar has finished fading in.

### Overriding Default Options

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

[npm]: https://img.shields.io/npm/v/vanilla-snackbar.svg
[npm-url]: https://npmjs.com/package/vanilla-snackbar

[node]: https://img.shields.io/node/v/vanilla-snackbar.svg
[node-url]: https://nodejs.org

[deps]: https://img.shields.io/david/cdimoulis/snackbar.js.svg
[deps-url]: https://david-dm.org/cdimoulis/snackbar.js

[tests]: https://img.shields.io/travis/cdimoulis/snackbar.js/master.svg
[tests-url]: https://travis-ci.org/cdimoulis/snackbar.js

[cover]: https://coveralls.io/repos/github/cdimoulis/snackbar.js/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/cdimoulis/snackbar.js?branch=master
