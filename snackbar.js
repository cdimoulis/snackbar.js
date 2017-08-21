/***************
Snackbar.js
https://github.com/cdimoulis/snackbar.js

A simple implementation of the snackbar message pops up at the bottom of the page.

view README.md for more in depth documentation

All options passed when creating the snackbar object are default. Overrides can
be passed in each call to display a message.

Usage:
Create a new snackbar ->
  var snack = new Snackbar();
Display a message ->
  snack.message('Hello World');

Helper functions:
Display a message that must be removed manually ->
  snack.stickyMessage('Acknowledge me!');
Display a message with a green background (adds class 'success') ->
  snack.success('You did it!');
Display a message with a red backbround (adds class 'error') ->
  snack.error("Something didn't work");
Display a message with a orangish/yellow backbround (adds class 'warn') ->
  snack.warn("I'd be careful if I were you...");

****************/

this.Snackbar = function(options) {
  /************
	Feature wide options. These options will be set at all time unless
  overridden by options passed in each call
    manual_close: Boolean. Provide a close X button (true) vs timed close (false)
      Default: false
    time: ms of time before automatic close. (ignored if manual_close: true)
      Default: 5000
    class: String containing desired classes.
      Default: null
  ************/
  options = options || {manual_close: false, time: 5000};

  /**********
  / PUBLIC FUNCTIONS
  /**********/

  // Main function to display the snackbar
  // message: text to display
  // opt: default override options to send
  this.message = function(message, opts) {
    var _this = this;
    opts = Object.assign({},options,opts);
    var $snackbar = _addSnackbar(message, opts);
    _fadeIn($snackbar);

    // If not manual_close then set timeout for removal
    if (!opts.manual_close) {
      setTimeout(function() {
        _removeSnackbar($snackbar);
      }, opts.time);
    }
  }

	// Helper for message that sticks until manually closed
  // message: text to display
  // opt: default override options to send
  this.stickyMessage = function(message, opts) {
    opts = Object.assign({},options,opts);
    opts.manual_close = true;
    this.message(message, opts);
  }

  // Helper for success snackbar
  // message: text to display
  // opt: default override options to send
  this.success = function(message, opts) {
    opts = Object.assign({},options,opts);
    opts.class = opts.class || '';
    opts.class += ' success';
    this.message(message, opts);
  }

  // Helper for error snackbar
  // message: text to display
  // opt: default override options to send
  this.error = function(message, opts) {
    opts = Object.assign({},options,opts);
    opts.class = opts.class || '';
    opts.class += ' error';
    this.message(message, opts);
	}

  // Helper for warn snackbar
  // message: text to display
  // opt: default override options to send
  this.warn = function(message, opts) {
    opts = Object.assign({},options,opts);
    opts.class = opts.class || '';
    opts.class += ' warn';
    this.message(message, opts);
	}

  /********
  / END PUBLIC FUNCTIONS
  *********/


  /**********
  / PRIVATE FUNCTIONS
  /**********/

  // Setup the elemends on the DOM
  _setDom = function() {
    var _this = this;
    var $body = $('body');
    // If the Body exists
    if ($body.length > 0){
      // Add snackbar wrapper if not in DOM already
      if ($('#snackbar-wrapper').length == 0) {
        var $outer_wrapper = $('<div id="snackbar-wrapper">');
        $body.append($outer_wrapper);
      }
    }
    else {
      // if body is not available then call when document is ready
      $(function() {
        _setDom();
      });
    }
  };

  // Add the snackbar
  // message: text to display
  // opt: options to send
  _addSnackbar = function(message, opts) {
    var _this = this;
    var $snackbar_wrapper = $('#snackbar-wrapper');
    if ($snackbar_wrapper.length > 0) {
      var $snackbar = $("<div class='snackbar'>");
      // Add Classes to snackbar
      if (opts.class) {
        $snackbar.addClass(opts.class);
      }
      var $text_wrapper = $('<span class="snackbar-text">');
      $text_wrapper.html(message);
      $snackbar.append($text_wrapper);
      // Add X for manual close
      if (opts.manual_close) {
        var $close = $('<span class="snackbar-close">');
        var $fa = $('<i>');
        $close.append($fa);
        // Apply click event for X
        $close.click(function() {
          _removeSnackbar($snackbar);
        });
        $snackbar.append($close);
      }
      $snackbar_wrapper.append($snackbar);
      return $snackbar;
    }
  };

  // Remove a snackbar
  _removeSnackbar = function($el) {
    _fadeOut($el, function() {
      // Remove the individual snackbar
      $el.remove();
    });
  };

  // Fade in individual snackbar
  _fadeIn = function($el) {
    $el.animate({opacity: 1}, 500);
  };

  // Fade out individual snackbar
  _fadeOut = function($el, end) {
    $el.animate({opacity: 0}, 500, end);
  };
  /**********
  / END PRIVATE FUNCTIONS
  /**********/

  // Setup DOM
  _setDom();
};
