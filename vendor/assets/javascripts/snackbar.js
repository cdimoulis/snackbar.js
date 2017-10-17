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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(1);

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
  // Returns a promise that will resolve when fully faded in OR
  // null if it cannot be added yet


  _createClass(Snackbar, [{
    key: 'message',
    value: function message(_message, opts) {
      var _this2 = this;

      opts = Object.assign({}, this.options, opts);
      var _snackbar = this._addSnackbar(_message, opts);
      // Show if _snackbar Element is created
      if (_snackbar) {

        // Fade in and when complete set timeout for fade out if not manual close
        return _fadeIn(_snackbar).then(function () {
          _this2._setClose(_snackbar, opts);
        });
      }
      // Add to queue to show after DOM is ready
      else {
          this.pre_dom_queue.push({ snackbar: this, message: _message, opts: opts });
        }
    }

    // Helper for message that sticks until manually closed
    // message: text to display
    // opt: default override options to send
    // Returns a promise that will resolve when fully faded in OR
    // null if it cannot be added yet

  }, {
    key: 'stickyMessage',
    value: function stickyMessage(message, opts) {
      opts = Object.assign({}, this.options, opts);
      opts.manual_close = true;
      return this.message(message, opts);
    }

    // Helper for success snackbar
    // message: text to display
    // opt: default override options to send
    // Returns a promise that will resolve when fully faded in OR
    // null if it cannot be added yet

  }, {
    key: 'success',
    value: function success(message, opts) {
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

  }, {
    key: 'error',
    value: function error(message, opts) {
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

  }, {
    key: 'warn',
    value: function warn(message, opts) {
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

  }, {
    key: '_setClose',
    value: function _setClose(snackbar, opts) {
      var _this3 = this;

      // If not manual_close then set timeout for removal
      return new Promise(function (resolve, reject) {
        if (!opts.manual_close) {
          setTimeout(function () {
            _this3._removeSnackbar(snackbar).then(function () {
              resolve();
            });
          }, opts.time);
        } else {
          resolve();
        }
      });
    }

    // Setup the elemends on the DOM

  }, {
    key: '_setDom',
    value: function _setDom() {
      var _this4 = this;

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
            _this4._setDom();
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
      var _this5 = this;

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
            // Returns the promise from removing snackbar
            return _this5._removeSnackbar(_snackbar);
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
      // _fadeOut returns a promise to use for completion
      return _fadeOut(_el).then(function () {
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
  var time_per_frame = time / fps;
  // current opacity
  var current_opacity = parseFloat(_el.style.opacity) || 0;
  // change for opacity
  var diff = value - current_opacity;
  var delta = diff / time_per_frame;

  // Return a promise so we know when this is done
  return new Promise(function (resolve, reject) {
    var interval = setInterval(change, time_per_frame);
    function change() {
      // Set new opacity
      current_opacity += delta;
      current_opacity = current_opacity < 0 ? 0 : current_opacity;
      current_opacity = current_opacity > 1 ? 1 : current_opacity;
      _el.style.opacity = current_opacity;
      // Check if done
      if (current_opacity === 1 || current_opacity === 0) {
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

exports.default = Snackbar;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js??ref--1-2!./snackbar.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js??ref--1-2!./snackbar.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "#snackbar-wrapper {\n  width: 100%;\n  position: fixed;\n  z-index: 999;\n  bottom: 0px;\n  display: block; }\n  #snackbar-wrapper .snackbar {\n    opacity: 0;\n    width: 105%;\n    margin-left: -2.5%;\n    background-color: #333;\n    color: #fff;\n    text-align: center;\n    font-size: 17px;\n    padding: 16px; }\n  #snackbar-wrapper .snackbar-close {\n    width: 12%;\n    cursor: pointer;\n    display: block;\n    top: .1em;\n    float: right;\n    margin-right: 3%; }\n  #snackbar-wrapper .snackbar-text {\n    width: 85%;\n    display: inline-block; }\n  #snackbar-wrapper .success {\n    background-color: #228822; }\n  #snackbar-wrapper .error {\n    background-color: #bb2222; }\n  #snackbar-wrapper .warn {\n    background-color: #f3b300; }\n  #snackbar-wrapper span.snackbar-close {\n    font-family: sans-serif;\n    font-weight: bolder;\n    font-size: inherit;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased; }\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);