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
  // If called before DOM is ready then maintain list to execute;
  var pre_dom_queue = [];

  /**********
  / PUBLIC FUNCTIONS
  /**********/

  // Main function to display the snackbar
  // message: text to display
  // opt: default override options to send
  this.message = function(message, opts) {
    opts = Object.assign({},options,opts);
    var _snackbar = _addSnackbar(message, opts);
    // Show if _snackbar Element is created
    if (_snackbar) {
      _fadeIn(_snackbar);
      // If not manual_close then set timeout for removal
      if (!opts.manual_close) {
        setTimeout(function() {
          _removeSnackbar(_snackbar);
        }, opts.time);
      }
    }
    // Add to queue to show after DOM is ready
    else {
      pre_dom_queue.push({snackbar: this, message: message, opts: opts});
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
  var _setDom = function() {
    var _body = document.getElementsByTagName('body')[0];
    // If the Body exists
    if (_body) {
      // Add snackbar if not in DOM already
      if (!document.getElementById('snackbar-wrapper')) {
        var _outer_wrapper = document.createElement('div');
        _outer_wrapper.id = 'snackbar-wrapper';
        _body.appendChild(_outer_wrapper);
      }
      if (pre_dom_queue.length > 0)
        _flushQueue();
    }
    // if body is not available then call when DOM is ready
    else {
      _ready(_setDom);
    }
  };

  // Flush out the pre_dom_queue
  var _flushQueue = function() {
    for(i = 0; i < pre_dom_queue.length; i++) {
      var sb = pre_dom_queue[i];
      sb.snackbar.message(sb.message, sb.opts);
    }
    pre_dom_queue = [];
  };

  // Add the snackbar
  // message: text to display
  // opt: options to send
  var _addSnackbar = function(message, opts) {
    var _this = this;
    var _snackbar_wrapper = document.getElementById('snackbar-wrapper');
    // Only create snackbar if snackbar wrapper is in DOM
    if (_snackbar_wrapper) {
      var _snackbar = document.createElement('div');
      // Class names for snackbar element
      var snk_bar_class = 'snackbar';
      // Add option classes to snackbar
      if (opts.class) {
        snk_bar_class += ' '+opts.class;
      }
      _snackbar.className = snk_bar_class;

      // Text node
      var _text_wrapper = document.createElement('span');
      _text_wrapper.className = 'snackbar-text';
      _text_wrapper.appendChild(document.createTextNode(message));
      _snackbar.appendChild(_text_wrapper);
      // Add X for manual close
      if (opts.manual_close) {
        var _close = document.createElement('span');
        _close.className = 'snackbar-close';
        var _x = document.createTextNode('X');
        _close.appendChild(_x);
        // Apply click event for X
        _close.onclick = function(){
          _removeSnackbar(_snackbar);
        };
        _snackbar.appendChild(_close);
      }
      _snackbar_wrapper.appendChild(_snackbar);
      return _snackbar;
    }
  };

  // Remove a snackbar
  var _removeSnackbar = function(_el) {
    _fadeOut(_el, function() {
      // Remove the individual snackbar
      _el.remove();
    });
  };

  // Fade in individual snackbar
  var _fadeIn = function(_el) {
    _changeOpacity(_el, 1, 500);
  };

  // Fade out individual snackbar
  var _fadeOut = function(_el, cb) {
    _changeOpacity(_el, 0, 500, cb);
  };

  // Change opacity
  //   _el: element
  //   value: the opacity value
  //   time: the amount of time
  //   cb: callback when done
  var _changeOpacity = function(_el, value, time, cb) {
    // rate of change
    var fps = 24;
    var time_per_frame = time/fps;
    // current opacity
    var current_opacity = parseFloat(_el.style.opacity) || 0;
    // change for opacity
    var diff = value - current_opacity;
    var delta = diff/time_per_frame;
    var interval = setInterval(change, time_per_frame);
    function change() {
      // Set new opacity
      current_opacity += delta;
      current_opacity = current_opacity < 0 ? 0 : current_opacity;
      current_opacity = current_opacity > 1 ? 1 : current_opacity;
      _el.style.opacity = current_opacity;
      // Check if done
      if (current_opacity === 1 || current_opacity === 0){
        // Call cb if exists
        if (cb)
          cb();
        // End interval
        clearInterval(interval);
      }
    }
  };

  // Callback when DOM is ready
  var _ready = function(cb) {
    // If add event listener is available
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee);
        cb();
      });
    }
    // Otherwise attach the state change event
    else if (document.attachEvent) {
      document.attachEvent('onreadystatechange'), function() {
        if (document.readyState === 'complete') {
          document.detachEvent('onreadystatechange',arguments.callee);
          cb();
        }
      }
    }
  };
  /**********
  / END PRIVATE FUNCTIONS
  /**********/

  // Setup DOM
  _setDom();
};
