this.Snackbar = function(options) {
	// Feature wide options
	options = options || {};

	/**********
	/ PUBLIC FUNCTIONS
	/**********/
	this.message = function(message, opts) {
		var _this = this;
		opts = opts || {};
		opts.time = opts.time || 5000;
		var $snackbar = _addSnackbar(message, opts);
		_fadeIn($snackbar);

		if (!opts.manual_close) {
			setTimeout(function() {
				_removeSnackbar($snackbar);
			}, opts.time);
		}
	}

	// Helper for message that sticks until manually closed
	this.stickyMessage = function(message, opts) {
		opts = opts || {};
		opts.manual_close = true;
		this.message(message, opts);
	}

	// Helper for success snackbar
	this.success = function(message, opts) {
		opts = opts || {};
		opts.class = opts.class || '';
		opts.class += ' success';
		this.message(message, opts);
	}

	// Helper for error snackbar
	this.error = function(message, opts) {
		opts = opts || {};
		opts.class = opts.class || '';
		opts.class += ' error';
		this.message(message, opts);
	}

	/**********
	/ PRIVATE FUNCTIONS
	/**********/
	// Setup the elemends on the DOM
	_setDom = function() {
		var _this = this;
		var $body = $('body');
		// If the DOM is ready
		if ($body.length > 0){
			// Add Spinner if not in DOM already
			if ($('#snackbar-wrapper').length == 0) {
				var $outer_wrapper = $('<div id="snackbar-wrapper">');
				$body.append($outer_wrapper);
			}
		}
		else {
			// DOM is not ready to call when ready
			$(function() {
				_setDom()
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

	//Remove a snackbar
	_removeSnackbar = function($el) {
		_fadeOut($el, function() {
			$el.remove();
		});
	};

	//Fade in individual snackbar
	_fadeIn = function($el) {
		$el.animate({opacity: 1}, 500);
	};

	//Fade out individual snackbar
	_fadeOut = function($el, end) {
		$el.animate({opacity: 0}, 500, end);
	};
	/**********
	/ END PRIVATE FUNCTIONS
	/**********/

	// Setup DOM
	_setDom();
};
