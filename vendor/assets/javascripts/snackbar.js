/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Snackbar = function () {
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
  function Snackbar(options) {
    _classCallCheck(this, Snackbar);

    this.options = options || { manual_close: false, time: 5000 };
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


  _createClass(Snackbar, [{
    key: 'message',
    value: function message(_message, opts) {
      var _this2 = this;

      opts = Object.assign({}, this.options, opts);
      var _snackbar = this._addSnackbar(_message, opts);
      // Show if _snackbar Element is created
      if (_snackbar) {
        _fadeIn(_snackbar);
        // If not manual_close then set timeout for removal
        if (!opts.manual_close) {
          setTimeout(function () {
            _this2._removeSnackbar(_snackbar);
          }, opts.time);
        }
      }
      // Add to queue to show after DOM is ready
      else {
          this.pre_dom_queue.push({ snackbar: this, message: _message, opts: opts });
        }
    }

    // Helper for message that sticks until manually closed
    // message: text to display
    // opt: default override options to send

  }, {
    key: 'stickyMessage',
    value: function stickyMessage(message, opts) {
      opts = Object.assign({}, this.options, opts);
      opts.manual_close = true;
      this.message(message, opts);
    }

    // Helper for success snackbar
    // message: text to display
    // opt: default override options to send

  }, {
    key: 'success',
    value: function success(message, opts) {
      opts = Object.assign({}, this.options, opts);
      opts.class = opts.class || '';
      opts.class += ' success';
      this.message(message, opts);
    }

    // Helper for error snackbar
    // message: text to display
    // opt: default override options to send

  }, {
    key: 'error',
    value: function error(message, opts) {
      opts = Object.assign({}, this.options, opts);
      opts.class = opts.class || '';
      opts.class += ' error';
      this.message(message, opts);
    }

    // Helper for warn snackbar
    // message: text to display
    // opt: default override options to send

  }, {
    key: 'warn',
    value: function warn(message, opts) {
      opts = Object.assign({}, this.options, opts);
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

  }, {
    key: '_setDom',
    value: function _setDom() {
      var _this3 = this;

      var _body = document.getElementsByTagName('body')[0];
      // If the Body exists
      if (_body) {
        // Add snackbar if not in DOM already
        if (!document.getElementById('snackbar-wrapper')) {
          var _outer_wrapper = document.createElement('div');
          _outer_wrapper.id = 'snackbar-wrapper';
          _body.appendChild(_outer_wrapper);
        }
        if (this.pre_dom_queue.length > 0) this._flushQueue();
      }
      // if body is not available then call when DOM is ready
      else {
          _ready(function () {
            _this3._setDom();
          });
        }
    }
  }, {
    key: '_flushQueue',


    // Flush out the pre_dom_queue
    value: function _flushQueue() {
      for (var i = 0; i < this.pre_dom_queue.length; i++) {
        var sb = this.pre_dom_queue[i];
        sb.snackbar.message(sb.message, sb.opts);
      }
      this.pre_dom_queue = [];
    }
  }, {
    key: '_addSnackbar',


    // Add the snackbar
    // message: text to display
    // opt: options to send
    value: function _addSnackbar(message, opts) {
      var _this4 = this;

      var _this = this;
      var _snackbar_wrapper = document.getElementById('snackbar-wrapper');
      // Only create snackbar if snackbar wrapper is in DOM
      if (_snackbar_wrapper) {
        var _snackbar = document.createElement('div');
        // Class names for snackbar element
        var snk_bar_class = 'snackbar';
        // Add option classes to snackbar
        if (opts.class) {
          snk_bar_class += ' ' + opts.class;
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
          _close.onclick = function () {
            _this4._removeSnackbar(_snackbar);
          };
          _snackbar.appendChild(_close);
        }
        _snackbar_wrapper.appendChild(_snackbar);
        return _snackbar;
      }
    }
  }, {
    key: '_removeSnackbar',


    // Remove a snackbar
    value: function _removeSnackbar(_el) {
      _fadeOut(_el, function () {
        // Remove the individual snackbar
        _el.remove();
      });
    }
  }]);

  return Snackbar;
}();

/**********
/ END PRIVATE FUNCTIONS
/**********/
;

/*******
* Helper FUNCTIONS
*******/

// Fade in individual snackbar
function _fadeIn(_el, cb) {
  _changeOpacity(_el, 1, 500, cb);
};

// Fade out individual snackbar
function _fadeOut(_el, cb) {
  _changeOpacity(_el, 0, 500, cb);
};

// Change opacity
//   _el: element
//   value: the opacity value
//   time: the amount of time
//   cb: callback when done
function _changeOpacity(_el, value, time, cb) {
  // rate of change
  var fps = 24;
  var time_per_frame = time / fps;
  // current opacity
  var current_opacity = parseFloat(_el.style.opacity) || 0;
  // change for opacity
  var diff = value - current_opacity;
  var delta = diff / time_per_frame;
  var interval = setInterval(change, time_per_frame);
  function change() {
    // Set new opacity
    current_opacity += delta;
    current_opacity = current_opacity < 0 ? 0 : current_opacity;
    current_opacity = current_opacity > 1 ? 1 : current_opacity;
    _el.style.opacity = current_opacity;
    // Check if done
    if (current_opacity === 1 || current_opacity === 0) {
      // Call cb if exists
      if (cb) cb();
      // End interval
      clearInterval(interval);
    }
  }
};

// Callback when DOM is ready
function _ready(cb) {
  // If add event listener is available
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', this.callee);
      cb();
    });
  }
  // Otherwise attach the state change event
  else if (document.attachEvent) {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
          document.detachEvent('onreadystatechange', this.callee);
          cb();
        }
      });
    }
};

window.Snackbar = Snackbar;

/***/ })
/******/ ]);