import './snackbar.scss';

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

class Snackbar {
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
  constructor(options) {
    this.options = options || {manual_close: false, time: 5000};
    // If called before DOM is ready then maintain list to execute;
    this.pre_dom_queue = [];

    // Setup DOM
    this._setDom();
  }

  /**********
  / PUBLIC FUNCTIONS
  /**********/

  // Main function to display the snackbar
  // message: text to display
  // opt: default override options to send
  // Returns a promise that will resolve when fully faded in OR
  // null if it cannot be added yet
  message(message, opts) {
    opts = Object.assign({}, this.options, opts);
    var _snackbar = this._addSnackbar(message, opts);
    // Show if _snackbar Element is created
    if (_snackbar) {

      // Fade in and when complete set timeout for fade out if not manual close
      return _fadeIn(_snackbar).then( () => {
        this._setClose(_snackbar, opts);
      });
    }
    // Add to queue to show after DOM is ready
    else {
      this.pre_dom_queue.push({snackbar: this, message: message, opts: opts});
    }
  }

	// Helper for message that sticks until manually closed
  // message: text to display
  // opt: default override options to send
  // Returns a promise that will resolve when fully faded in OR
  // null if it cannot be added yet
  stickyMessage(message, opts) {
    opts = Object.assign({}, this.options, opts);
    opts.manual_close = true;
    return this.message(message, opts);
  }

  // Helper for success snackbar
  // message: text to display
  // opt: default override options to send
  // Returns a promise that will resolve when fully faded in OR
  // null if it cannot be added yet
  success(message, opts) {
    opts = Object.assign({}, this.options, opts);
    opts.class = opts.class || '';
    opts.class += ' success';
    return this.message(message, opts);
  }

  // Helper for error snackbar
  // message: text to display
  // opt: default override options to send
  // Returns a promise that will resolve when fully faded in OR
  // null if it cannot be added yet
  error(message, opts) {
    opts = Object.assign({}, this.options, opts);
    opts.class = opts.class || '';
    opts.class += ' error';
    return this.message(message, opts);
	}

  // Helper for warn snackbar
  // message: text to display
  // opt: default override options to send
  // Returns a promise that will resolve when fully faded in OR
  // null if it cannot be added yet
  warn(message, opts) {
    opts = Object.assign({}, this.options, opts);
    opts.class = opts.class || '';
    opts.class += ' warn';
    return this.message(message, opts);
	}

  /********
  / END PUBLIC FUNCTIONS
  *********/

  /**********
  / PRIVATE FUNCTIONS
  /**********/

  // Set the timeout for closing the snackbar if not opts.manual_close
  _setClose(snackbar, opts) {
    // If not manual_close then set timeout for removal
    return new Promise( (resolve, reject) => {
      if (!opts.manual_close) {
        setTimeout(() => {
          this._removeSnackbar(snackbar).then( () => {
            resolve();
          });
        }, opts.time);
      }
      else {
        resolve();
      }
    });
  }

  // Setup the elemends on the DOM
  _setDom() {
    var _body = document.getElementsByTagName('body')[0];
    // If the Body exists
    if (_body) {
      // Add snackbar if not in DOM already
      if (!document.getElementById('snackbar-wrapper')) {
        var _outer_wrapper = document.createElement('div');
        _outer_wrapper.id = 'snackbar-wrapper';
        _body.appendChild(_outer_wrapper);
      }
      if (this.pre_dom_queue.length > 0)
        this._flushQueue();
    }
    // if body is not available then call when DOM is ready
    else {
      _ready(() => {this._setDom();});
    }
  };

  // Flush out the pre_dom_queue
  _flushQueue() {
    for(let i = 0; i < this.pre_dom_queue.length; i++) {
      var sb = this.pre_dom_queue[i];
      sb.snackbar.message(sb.message, sb.opts);
    }
    this.pre_dom_queue = [];
  };

  // Add the snackbar
  // message: text to display
  // opt: options to send
  _addSnackbar(message, opts) {
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
        _close.onclick = () => {
          // Returns the promise from removing snackbar
          return this._removeSnackbar(_snackbar);
        };
        _snackbar.appendChild(_close);
      }
      _snackbar_wrapper.appendChild(_snackbar);
      return _snackbar;
    }
  };

  // Remove a snackbar
  _removeSnackbar(_el) {
    // _fadeOut returns a promise to use for completion
    return _fadeOut(_el).then( () => {
      _el.remove();
    });
  };
  /**********
  / END PRIVATE FUNCTIONS
  /**********/
};

/*******
* Helper FUNCTIONS
*******/

// Fade in individual snackbar
// Returns a promise to use for completion
function _fadeIn(_el) {
  // Change opacity returns a promise so we are passing that up
  return _changeOpacity(_el, 1, 500);
};

// Fade out individual snackbar
// Returns a promise to use for completion
function _fadeOut(_el) {
  // Change opacity returns a promise so we are passing that up
  return _changeOpacity(_el, 0, 500);
};

// Change opacity
//   _el: element
//   value: the opacity value
//   time: the amount of time
// Returns a promise to use for completion
function _changeOpacity(_el, value, time) {
  // rate of change
  var fps = 24;
  var time_per_frame = time/fps;
  // current opacity
  var current_opacity = parseFloat(_el.style.opacity) || 0;
  // change for opacity
  var diff = value - current_opacity;
  var delta = diff/time_per_frame;

  // Return a promise so we know when this is done
  return new Promise( (resolve, reject) => {
    var interval = setInterval(change, time_per_frame);
    function change() {
      // Set new opacity
      current_opacity += delta;
      current_opacity = current_opacity < 0 ? 0 : current_opacity;
      current_opacity = current_opacity > 1 ? 1 : current_opacity;
      _el.style.opacity = current_opacity;
      // Check if done
      if (current_opacity === 1 || current_opacity === 0){
        // End interval and resolve the promise
        clearInterval(interval);
        resolve();
      }
    }
  });
};

// Callback when DOM is ready
function _ready(cb) {
  // If add event listener is available
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
      document.removeEventListener('DOMContentLoaded', this.callee);
      cb();
    });
  }
  // Otherwise attach the state change event
  else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        document.detachEvent('onreadystatechange', this.callee);
        cb();
      }
    });
  }
};

window.Snackbar = Snackbar;

export default Snackbar
