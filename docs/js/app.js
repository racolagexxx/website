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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/bootstrap/js/scrollspy.js":
/*!************************************************!*\
  !*** ./node_modules/bootstrap/js/scrollspy.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);


/***/ }),

/***/ "./node_modules/ev-emitter/ev-emitter.js":
/*!***********************************************!*\
  !*** ./node_modules/ev-emitter/ev-emitter.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),

/***/ "./node_modules/imagesloaded/imagesloaded.js":
/*!***************************************************!*\
  !*** ./node_modules/imagesloaded/imagesloaded.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(/*! ev-emitter/ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js")
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter ) {
      return factory( window, EvEmitter );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});


/***/ }),

/***/ "./node_modules/intersection-observer/intersection-observer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/intersection-observer/intersection-observer.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

(function(window, document) {
'use strict';


// Exits early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observering a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    this.intersectionRatio = intersectionArea / targetArea;
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibilty state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its executiong, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child elemnt (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }
  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}(window, document));


/***/ }),

/***/ "./node_modules/jquery/dist/jquery.slim.js":
/*!*************************************************!*\
  !*** ./node_modules/jquery/dist/jquery.slim.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if (  true && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/ajax-helpers.js":
/*!*****************************!*\
  !*** ./src/ajax-helpers.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.loadImage = function (imgSrc) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    var imgElement = new Image();
    imgElement.onload = resolve.bind(_this, imgElement);
    imgElement.src = imgSrc;
  });
};

exports.fetchHTML = function (url) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState == 4) {
        resolve(this.responseText);
      }
    };
    req.open('GET', url, true);
    req.send();
  });
};

/***/ }),

/***/ "./src/components/BackgroundCanvas.js":
/*!********************************************!*\
  !*** ./src/components/BackgroundCanvas.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");

var ajaxHelpers = __webpack_require__(/*! ~/ajax-helpers */ "./src/ajax-helpers.js");
var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;


  var imgElement = void 0;

  var BackgroundCanvas = function BackgroundCanvas(canvas) {
    _classCallCheck(this, BackgroundCanvas);

    this.el = $(canvas);
    var ctx = canvas.getContext('2d');
    var container = this.el.parent();

    var settings = {
      squareSize: this.el.data('squaresize') || 0.1, // Size of the square picked for the effect
      range: this.el.data('range') || 0.15, // Range (as a ratio) of the area in which the square is picked
      scrambleCount: this.el.data('scramblecount') || 400 // Number of scrambles per touch / move
    };

    canvas.width = container.width();
    canvas.height = container.height();

    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    var scramblePixels = function scramblePixels(pageX, pageY) {
      var squareSize = settings.squareSize,
          range = settings.range,
          scrambleCount = settings.scrambleCount;

      var squareW = squareSize * container.width();
      var squareH = squareSize * container.height();
      var x1 = pageX - container.offset().left - squareW / 2;
      var y1 = pageY - container.offset().top - squareH / 2;
      var x2 = x1 + (Math.random() * 2 - 1) * (canvas.width * range);
      var y2 = y1 + (Math.random() * 2 - 1) * (canvas.height * range);
      var imageData1 = ctx.getImageData(x1, y1, squareW, squareH);
      var imageData2 = ctx.getImageData(x2, y2, squareW, squareH);
      ctx.putImageData(imageData1, x2, y2);
      ctx.putImageData(imageData2, x1, y1);
    };

    container.mousemove(function (event) {
      scramblePixels(event.pageX, event.pageY);
    });
    container.on('touchstart', function (event) {
      for (var i = 0; i < settings.scrambleCount; i++) {
        scramblePixels(event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY);
      }
    });
  };

  BackgroundCanvas.loadBgImage = function () {
    return ajaxHelpers.loadImage(__webpack_require__(/*! ~/images/header-bg.jpg */ "./src/images/header-bg.jpg")).then(function (elem) {
      return imgElement = elem;
    });
  };

  return BackgroundCanvas;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/BackgroundCanvas.js"))

/***/ }),

/***/ "./src/components/LazyImage.js":
/*!*************************************!*\
  !*** ./src/components/LazyImage.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");
var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;


  var lazyImagesMap = new WeakMap();
  var lazyImageObserver = void 0;

  var LazyImage = function () {
    function LazyImage(el) {
      _classCallCheck(this, LazyImage);

      lazyImagesMap.set(el, this);
      this.el = $(el);
      lazyImageObserver.observe(this.el.get(0));
    }

    _createClass(LazyImage, [{
      key: 'load',
      value: function load() {
        this.el.attr('src', this.el.data('src'));
        lazyImageObserver.unobserve(this.el.get(0));
      }
    }]);

    return LazyImage;
  }();

  LazyImage.initObserver = function () {
    __webpack_require__(/*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js");

    lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var lazyImage = lazyImagesMap.get(entry.target);
          if (lazyImage) lazyImage.load();
        }
      });
    });

    return Promise.resolve(lazyImageObserver);
  };

  return LazyImage;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/LazyImage.js"))

/***/ }),

/***/ "./src/components/PopUp.js":
/*!*********************************!*\
  !*** ./src/components/PopUp.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");
var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;

  var PopUp = function () {
    function PopUp(element) {
      var _this = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, PopUp);

      this.opts = Object.assign({ mode: 'hide' }, opts);
      this.el = $(element);

      // Destroys/hides the popup when close button clicked
      this.el.find('.close').click(function (event) {
        if (_this.opts.mode === 'destroy') {
          _this.el.detach();
          if (_this.opts.onClose) _this.opts.onClose();
          event.stopImmediatePropagation();
        } else if (_this.opts.mode === 'hide') {
          _this.el.css({ 'visibility': 'hidden' });
        } else {
          throw new Error('invalid : ' + _this.opts.mode);
        }
      });
    }

    _createClass(PopUp, [{
      key: 'destroy',
      value: function destroy() {
        this.removeAllListeners();
        this.el.remove();
      }
    }]);

    return PopUp;
  }();

  return PopUp;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/PopUp.js"))

/***/ }),

/***/ "./src/components/PopUpStack.js":
/*!**************************************!*\
  !*** ./src/components/PopUpStack.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");
var imagesLoaded = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");
var PopUp = __webpack_require__(/*! ./PopUp */ "./src/components/PopUp.js");

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;

  var PopUpStack = function () {
    function PopUpStack(el) {
      _classCallCheck(this, PopUpStack);

      this.el = $(el);
      this.resetPopUps();
      this.el.find('.' + getClassName('reset') + ' button').click(this.resetPopUps.bind(this));
    }

    _createClass(PopUpStack, [{
      key: 'resetPopUps',
      value: function resetPopUps() {
        var _this = this;

        var elemList = this.el.find('.' + PopUp.getClassName()).css({ 'visibility': 'visible' }).toArray();

        if (this.el.data('variant') === 'neat') {
          if (this.el.data('reverse') === true) elemList = elemList.reverse();
          elemList.forEach(function (el, i) {
            var mult = Math.floor(i + 1 - elemList.length / 2);
            var margin = '' + mult * 1.2 + 'em';
            $(el).css({
              'margin-top': margin,
              'margin-left': margin
            });
          });
        } else if (this.el.data('variant') === 'messy') {
          var getRandomVal = function getRandomVal() {
            return (Math.random() * 2 - 1) * 3 + 'vw';
          };
          // Slightly move about randomly
          $(elemList[0]).css({
            position: 'relative',
            top: getRandomVal(),
            left: getRandomVal()
          });
          elemList.slice(1).forEach(function (el, i) {
            $(el).css({
              'margin-top': getRandomVal(),
              'margin-left': getRandomVal()
            });
          });

          if (this.el.data('autoresize')) {
            this.el.imagesLoaded(function () {
              var maxY = Math.max.apply(Math, _toConsumableArray(elemList.map(function (el) {
                return $(el).position().top + $(el).height();
              })));
              _this.el.css({ height: maxY + 50 });
            });
          }
        } else {
          throw new Error('invalid : ' + this.el.data('variant'));
        }
      }
    }]);

    return PopUpStack;
  }();

  return PopUpStack;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/PopUpStack.js"))

/***/ }),

/***/ "./src/components/Release.js":
/*!***********************************!*\
  !*** ./src/components/Release.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");
var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");
var ReleaseDetails = __webpack_require__(/*! ./ReleaseDetails */ "./src/components/ReleaseDetails.js");

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;

  var Release = function Release(el) {
    var _this = this;

    _classCallCheck(this, Release);

    this.el = $(el);
    this.releaseDetails = new ReleaseDetails(this.el.find('.' + ReleaseDetails.getClassName()), { releaseContainer: this.el });
    this.el.click(function () {
      return _this.releaseDetails.load();
    });
  };

  return Release;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/Release.js"))

/***/ }),

/***/ "./src/components/ReleaseDetails.js":
/*!******************************************!*\
  !*** ./src/components/ReleaseDetails.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");
var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");
var ajaxHelpers = __webpack_require__(/*! ~/ajax-helpers */ "./src/ajax-helpers.js");
var PopUp = __webpack_require__(/*! ./PopUp */ "./src/components/PopUp.js");
var PopUpStack = __webpack_require__(/*! ./PopUpStack */ "./src/components/PopUpStack.js");

var CONTAINER_ID = 'ReleaseDetailsContainer';

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;

  var ReleaseDetails = function () {
    function ReleaseDetails(el, opts) {
      _classCallCheck(this, ReleaseDetails);

      this.el = $(el);
      this.releaseContainer = $(opts.releaseContainer);
      this.moveAboveAll();
    }

    _createClass(ReleaseDetails, [{
      key: 'load',
      value: function load() {
        var _this = this;

        var position = this.releaseContainer.offset();

        // Place the popups on top of the release releaseContainer, making sure that
        // they don't overflow from the window
        var margin = 0.075 * $(window).width();
        position.left = Math.max(margin, position.left + this.releaseContainer.width() / 2 - this.el.width() / 2);
        position.left = Math.min(position.left, $(window).width() - this.el.width() - margin);

        // Move popups and make them visible
        this.moveAboveAll();
        this.el.css(position);
        this.el.show();

        if (!this.fetchHTMLPromise) this.fetchHTMLPromise = ajaxHelpers.fetchHTML(this.el.data('htmlfilename'));

        this.fetchHTMLPromise.then(function (str) {
          // Set the html for the popup stack and create JS components
          var popUpStackEl = $(_this.el.find('.' + PopUpStack.getClassName()).get(0));
          popUpStackEl.html(str);
          new PopUpStack(popUpStackEl);
          _this.el.find('.' + PopUp.getClassName()).each(function (i, el) {
            new PopUp(el, { mode: 'destroy' });
          });
        }).catch(function (err) {
          console.error(err);
        });
      }

      // Move the release details above other release details currently open

    }, {
      key: 'moveAboveAll',
      value: function moveAboveAll() {
        this.el.detach();
        var container = $('#' + CONTAINER_ID);
        if (container.length === 0) container = $('<div>', { id: CONTAINER_ID }).appendTo('body');
        container.append(this.el);
      }
    }]);

    return ReleaseDetails;
  }();

  return ReleaseDetails;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/ReleaseDetails.js"))

/***/ }),

/***/ "./src/components/page/Header.js":
/*!***************************************!*\
  !*** ./src/components/page/Header.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");
var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");
var PopUp = __webpack_require__(/*! ~/components/PopUp */ "./src/components/PopUp.js");

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;

  var Header = function Header(element) {
    _classCallCheck(this, Header);

    this.el = $(element);
    var headerPopupFront = this.el.find('.' + PopUp.getClassName()).first();
    var headerPopupBack = this.el.find('.' + PopUp.getClassName()).last();
    var headerPopupFrontView = new PopUp(headerPopupFront, { mode: 'hide' });
    var headerPopupBackView = new PopUp(headerPopupBack);
  };

  return Header;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/page/Header.js"))

/***/ }),

/***/ "./src/components/page/IndexPage.js":
/*!******************************************!*\
  !*** ./src/components/page/IndexPage.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");

var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");
var BackgroundCanvas = __webpack_require__(/*! ~/components/BackgroundCanvas */ "./src/components/BackgroundCanvas.js");
var LazyImage = __webpack_require__(/*! ~/components/LazyImage */ "./src/components/LazyImage.js");
var PopUp = __webpack_require__(/*! ~/components/PopUp */ "./src/components/PopUp.js");
var PopUpStack = __webpack_require__(/*! ~/components/PopUpStack */ "./src/components/PopUpStack.js");
var Release = __webpack_require__(/*! ~/components/Release */ "./src/components/Release.js");

var Nav = __webpack_require__(/*! ./Nav */ "./src/components/page/Nav.js");
var Header = __webpack_require__(/*! ./Header */ "./src/components/page/Header.js");

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;

  var IndexPage = function IndexPage() {
    _classCallCheck(this, IndexPage);

    new Nav($('.' + Nav.getClassName()));
    new Header($('.' + Header.getClassName()));
    $('.' + PopUp.getClassName()).each(function (i, el) {
      return new PopUp(el);
    });
    $('.' + PopUpStack.getClassName()).each(function (i, el) {
      return new PopUpStack(el);
    });
    $('.' + Release.getClassName()).each(function (i, el) {
      return new Release(el);
    });

    LazyImage.initObserver().then(function () {
      $('.' + LazyImage.getClassName()).each(function (i, el) {
        return new LazyImage(el);
      });
    });
    BackgroundCanvas.loadBgImage().then(function () {
      $('.' + BackgroundCanvas.getClassName()).each(function (i, el) {
        return new BackgroundCanvas(el);
      });
    });
  };

  return IndexPage;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/page/IndexPage.js"))

/***/ }),

/***/ "./src/components/page/Nav.js":
/*!************************************!*\
  !*** ./src/components/page/Nav.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, __filename) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");
var imagesLoaded = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
var declareJsComponent = __webpack_require__(/*! ~/declareJsComponent */ "./src/declareJsComponent.js");

module.exports = declareJsComponent(__filename, function (_ref) {
  var getClassName = _ref.getClassName;

  var Nav = function () {
    function Nav(element) {
      var _this = this;

      _classCallCheck(this, Nav);

      // Setup scrollspy to set nav item to "active" automatically when scrolling the page.
      var scrollspy = __webpack_require__(/*! bootstrap/js/scrollspy */ "./node_modules/bootstrap/js/scrollspy.js");
      $('body').scrollspy({ target: 'nav' }).imagesLoaded(function () {
        // TODO : FIX
        _this.scrollToHash();
      });
    }

    _createClass(Nav, [{
      key: 'scrollToHash',
      value: function scrollToHash() {
        if (HTMLElement.prototype.scrollIntoView && $(location.hash).length) $(location.hash).get(0).scrollIntoView();
      }
    }]);

    return Nav;
  }();

  return Nav;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), "src/components/page/Nav.js"))

/***/ }),

/***/ "./src/declareJsComponent.js":
/*!***********************************!*\
  !*** ./src/declareJsComponent.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cssClassesRegistry = __webpack_require__(/*! ~/registry-css-classes */ "./src/registry-css-classes.js");

// Function for declaring JS components.
module.exports = function (filename, closure) {
  var getClassName = cssClassesRegistry.getClassNameGenerator(filename);
  var component = closure({ getClassName: getClassName });
  return Object.assign(component, { getClassName: getClassName });
};

/***/ }),

/***/ "./src/images/header-bg.jpg":
/*!**********************************!*\
  !*** ./src/images/header-bg.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;charset=utf-8;base64,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bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nPgogIDxkYzpmb3JtYXQ+aW1hZ2UvanBlZzwvZGM6Zm9ybWF0PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiB4bWxuczpwaG90b3Nob3A9J2h0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8nPgogIDxwaG90b3Nob3A6TGVnYWN5SVBUQ0RpZ2VzdD45QTg5QUQ1RDI4NkRCQTIxMDJDOENCQTk2NzA1M0ZEQjwvcGhvdG9zaG9wOkxlZ2FjeUlQVENEaWdlc3Q+CiAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRUM2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogIDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6M2NkYjAxMjQtNTg1ZS0xMTc5LWFmMTAtYjE5OTlkODljZTc3PC9yZGY6bGk+CiAgICA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4NzM2YjhiMi01ODVjLTExNzktYWYxMC1iMTk5OWQ4OWNlNzc8L3JkZjpsaT4KICAgIDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkwZDVmZWQ4LTZkNGEtMTE3OS1iOGU5LWRkYjg1YzczMDBlNjwvcmRmOmxpPgogICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6ZjVlOWEwYmMtNmQ0ZS0xMTc5LWI4ZTktZGRiODVjNzMwMGU2PC9yZGY6bGk+CiAgICA8cmRmOmxpPnhtcC5kaWQ6MDQ4MDExNzQwNzIwNjgxMTg4QzY4OERENkRFRjQ0N0M8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogIDxwaG90b3Nob3A6TGVnYWN5SVBUQ0RpZ2VzdD45QTg5QUQ1RDI4NkRCQTIxMDJDOENCQTk2NzA1M0ZEQjwvcGhvdG9zaG9wOkxlZ2FjeUlQVENEaWdlc3Q+CiAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRUM2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogIDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgIDxyZGY6QmFnPgogICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6M2NkYjAxMjQtNTg1ZS0xMTc5LWFmMTAtYjE5OTlkODljZTc3PC9yZGY6bGk+CiAgICA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4NzM2YjhiMi01ODVjLTExNzktYWYxMC1iMTk5OWQ4OWNlNzc8L3JkZjpsaT4KICAgIDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkwZDVmZWQ4LTZkNGEtMTE3OS1iOGU5LWRkYjg1YzczMDBlNjwvcmRmOmxpPgogICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6ZjVlOWEwYmMtNmQ0ZS0xMTc5LWI4ZTktZGRiODVjNzMwMGU2PC9yZGY6bGk+CiAgICA8cmRmOmxpPnhtcC5kaWQ6MDQ4MDExNzQwNzIwNjgxMTg4QzY4OERENkRFRjQ0N0M8L3JkZjpsaT4KICAgPC9yZGY6QmFnPgogIDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiB4bWxuczp4bXBNTT0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyc+CiAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpiYzIzNjVmMS00NjhmLTQ3NTAtOTAzMy00NTY2NDExZTNmNWI8L3htcE1NOkluc3RhbmNlSUQ+CiAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjg3NzEzNmMyLWQxYTYtNDdlOS1hZjYwLTllNThmOGI0YzVmNzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6YmMyMzY1ZjEtNDY4Zi00NzUwLTkwMzMtNDU2NjQxMWUzZjViPC94bXBNTTpJbnN0YW5jZUlEPgogIDx4bXBNTTpEb2N1bWVudElEIHJkZjpyZXNvdXJjZT0nYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjUzNWU5YzNjLTc5NDktMTE3OS04NmIxLWEyMzZkNTQ4OTUzYicgLz4KICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6ODc3MTM2YzItZDFhNi00N2U5LWFmNjAtOWU1OGY4YjRjNWY3PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHhtbG5zOmV4aWY9J2h0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvJz4KICA8ZXhpZjpPcmllbnRhdGlvbj5Ub3AtbGVmdDwvZXhpZjpPcmllbnRhdGlvbj4KICA8ZXhpZjpYUmVzb2x1dGlvbj4xNTA8L2V4aWY6WFJlc29sdXRpb24+CiAgPGV4aWY6WVJlc29sdXRpb24+MTUwPC9leGlmOllSZXNvbHV0aW9uPgogIDxleGlmOlJlc29sdXRpb25Vbml0PkluY2g8L2V4aWY6UmVzb2x1dGlvblVuaXQ+CiAgPGV4aWY6U29mdHdhcmU+R0lNUCAyLjguMTA8L2V4aWY6U29mdHdhcmU+CiAgPGV4aWY6RGF0ZVRpbWU+MjAxNjowNzoxNyAyMDozODozOTwvZXhpZjpEYXRlVGltZT4KICA8ZXhpZjpDb21wcmVzc2lvbj5KUEVHIGNvbXByZXNzaW9uPC9leGlmOkNvbXByZXNzaW9uPgogIDxleGlmOlhSZXNvbHV0aW9uPjcyPC9leGlmOlhSZXNvbHV0aW9uPgogIDxleGlmOllSZXNvbHV0aW9uPjcyPC9leGlmOllSZXNvbHV0aW9uPgogIDxleGlmOlJlc29sdXRpb25Vbml0PkluY2g8L2V4aWY6UmVzb2x1dGlvblVuaXQ+CiAgPGV4aWY6RXhpZlZlcnNpb24+RXhpZiBWZXJzaW9uIDIuMjE8L2V4aWY6RXhpZlZlcnNpb24+CiAgPGV4aWY6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JFNlEMkJIBFtokklsltklBIttllthEsoBlksIogMMAtltlEJIEoIBsggMgIklMBhEtstlsttNtttkJklhANBAsgJkJltopJIAIAAJFltsoAJNAEANsplBIlkpkEBoslktkNhlstsoAAABAIkkltlshFAoIBIIJNFhhslkAhJMIAEIJsBNolpItJlossMNttMtlltIABhBNlsItkkslEkAkAJJtgMgIsshFIIABJAlBpgINlAtohltEsBklhttttpIBJIMMkFkksktlMNAABNJtlslJJAFINtEhppEhlBolpktlJllsokglNttltBABJIFktshBFhJlsBIABIMlktoJMFFtNtAJAIggMNFsAElsppkktlkptttslFopBsBJJMspIINkosklkptoEopNlIksktpJsgAAIJtoEkBNoFtskEkMtttkFAAAAAFttgtkllFglAJAItshoNMtgAsEttJFlAAssJJENJIhNFIBABBtsgBktklkskktsossklkNoAABJNsgBFlohkolsoIpMlFFhoNElINkotlFJkttgAIAIAIIAAIAJkBBhAFlhJtIIAJksEsFllFttgslkstAApgNsksshEhlMhtsAAIAIAJJJIAABAAMAIpNJJJBJAMggoEskgtgtEtsklpBJNsttMlkhIIAlNtgAIABIBBAAJBBJAIIIEttttltkpgMIgINBFttpskkloJIIAkkAsltoMANptsABAABAAAAAIAIIBJBAsttltFJNMNhNIhsEtthssIBpMhgttsEJFkkIBAtNtgAJIAFJAIJpIJJAJgAMklkststtsgEpABItkkkkIEMgkskhsslFkFNBtkslsAAJJIBJJJNJAJABNBAsktslstsJFoAIIJNotlkJolkMspsNkklkotNJtlNpgAIBJBBBBMoBBIIIhIFsllssssEIghABNkBNklptFkksslJFFlltsApgtptsAAJJAJIAFoFpJJANAIstklktIIEltoBlEAspNthIklkkltstktlthpMslNtgAIAAIBtoAttgBIIAAIFsIhlhJJpBsNNMMJgBhptosoAkskBtklstttlhstsABAAIJJJBoEgJIIFgNApkIgBggksgEEEsJsJkpEktogslstptksskoElsttgAJIIJAAFhsIBNIBNAAFJIBJBFNkJspFhlANlttkgElokkkslktsktNtlItsABBBAJhBpAJkphMsABJApIkkllJEghlNkkpNkIElFtsskskkklgklpktlNlgAAAAAIIMFNpBktMstkMNlMpNEssAFoNsksoEFtINstskkstkkkNkkklgBtsAAAAABhINlEJBlEAJBgFlhsgFpEIAoklglstlpNtspsgtktsstslkEslgNsgAAAAAAIIAAAJtEAIABhEJtgAtlhIlABpINpJttMlsttsthosNktltpgpsssAAAAIhFAkFIAAAABBAJAAAAEgNANsBoNIIMJEIlslttltttttllsNhkoskgAAAAAAIAAABEIBAAEABAABJAJFolMJEElosIABkoltltttklltlkNtIAMhlsABJtAtgMFFpAJJBJpBJoIJsAoAJJgpEhMMksJIIMBskllslllllssglsBNlgAAhoFlNthAgAAAAIJAplslJAMEhFgtEpoJFgotNhhMpNllltlsslktsMAkMAAJkJMEkEIBJJIAIgAABBBBAEkNEhstgtAABhloJBtkFkkEttkpEslkAMotgAAAJtMlBgAEAAAAIAAAFAAJglopgBsMIFopMIsolglBAEttlktsFplgAIgsAAABhIsABBBAAABJgAANlhJFoslhkpsglsAllhkBsMFBkksltskslplolMkgAAANIssgoAAAAAJMAAFssJAEptEBFpIooNoAgFpIJNAslssllklsophlsMEAAAAABAABAAAAAAJAAIlFJFBtppkttBMhhlNlslhEkgttktttkBNltJBAJIgAAAAAIABIAAAAABMAAktlItMEsosNltJAtkpkpNlloAIAtAEllBMklsolJEAAAAAIAAAAAAAAAAAIFBgIMtNEIgAthApksMJMtkBsklABIFptEMoMsNhJAgAAAABAAAAAAAAAJIABshJIJIEABANEoptEkFpktAkkoJJJtltBJJstsBMIMAAAAAABAAAAAAAAJAAEtkhJMkslhgosEEEoMAFlsskENBBAEhJgJIIgBBtJgAAAABAIAAAAAAABAAAktkJJlsFAhIMJJMsoBBJlpIshJAIEogNAAAMJJAlMAAAAAJBAAAAAAABIJAhkhoJpMooAtNpFFoslBJNItBBJoJANkpFAFlsJMJhgAAAAIBJIAAAAABIEIkIkktIMAtIBpMBJloEBBABIJBltBpJFIEhpkAkhNJEAAAABBABAAAAAAABpkkEFNsskpNBIENBskgpBJIIpAEkkJAApJtNolBlAJIgAAAAJJAAAAAAAAAAEpspsJhMFslgJJtNsskstttkJsskFstltkpstkothJEANAABBAIAAAABNIAFMABEEsNBgkFhktloNhMtttlskslkkklkkEploIFgoIgBgAJJIBAAAAJABABBlhBsskFhklMENIgsBotpsstsphMsktslhJFptNoBloAIAAABAIAAAAAAJAJkllkphABJtJJoMNFAAFNFstsAJMNtlhIlJsgtgkMBJAAIAIBJJIAAAJAAABAsBtstItgIgINtttBJMhEpBJksNkNFFtNlkFkhtkINIAJAAABJBAAABAAAAANFpNstgkkhIhIMlhllgpBtNpBgFtshEtkoBktkllhEAAkAAAAAAAAABAAAAIoogolptFotktNBosAIlBIgsBIMMkJplMFFApgMpMEgAAgAAAAAAAABEBBIAAJoJshBlBEJstglgABoktJBFtkokgksgIkNsJJtEkMkIEAAAAAAAAAAAAAIBAABBJEotlkAgsoEEpBlgEhAJBJABlNNEsskFsJIEBEEgAAAAAAAEAAAIJAAIBAJIMstJkFBgoJkkhJNBlMJJBAIBFslsEtlhsgBtlgAAAAAAAAMEAAJgAAAAAAAIJAkkhlkAJFEtlgIFooBBBAENgMotIEBFtJIJEgBgJJAJtlIltIphtslttkEsBBEMltsEgFAlsBAoIpBJBJEttNBgBsIIhJJEMNNNBsIMFkANhIEsthloJhopFpNBppElNhBBtIFsFBJIBAkNkkgMFhhNgIlppAJEtlolFgJpJspkglNplEIgksskllstspIJABpIskkkskAlJFsFlsNIopIhJJJEpBtBkNosklFttkIAopoIBoFtlsMlpBAoItItlsNlsttklthEBtsAhtMIJtlkBJlstBNAJNlAJsMtppFklkkslstsptEAFIoNllksklltlFJsIIIIllNkpkElsgBNElEspkktogJJtJFEpIJltsskIlslpJlJJBJJAttBJBNttkMAtJFJoIsBJJMAIsoslsIghFMIMANkAEsNttkoNIIIIMAtptpthslNsptshsMEkkgMEAANpJIltgggpAIABptBNAkklAEAJEkgsMhIgFgIsAAsABsoIkkskJAJFAJBFJItJAksptEhkghgFgJJIpJkskAtNpNlssBFAAAAAAABBIABEkAltBpAgJBIJJJJJJllJtIBMlttoktAkIokstFpMhFksJIhJJAAAJJMABAAJJEMsNJFJJJBJJJJIEkoFIAAthMhBIthtFAoAIoABABIJABBpJJJABABIJIFBIJpEpJpBJIJJJJJFltpBAlhJoFAAEttkothlpNEssktgIlIAJBABIpJJJBsBAkBEMtIJJBJJJJINklJtEIAEkBEshoBAlgopJINNtsksIJAJIIJIFIBJAtlskIBAJttktsktttgtsIBNlsJJltgIEkhEktoJNBsBkMoIBAIIAABBAJBAMMIMpAFJJJJJJJJJJBNMEJlloFsltkkktFJMAEItFNlgEEJFBAAAAJJJABJJtkgsoBpJJJJJJJJJJIEJFohNhogBoIEtpJMEFENApkFBkJBkIBAolkkElktlkgkNAFJJJJJJJJJJIBFIpANlsgAgIIkAtolJNhFkpEglgBBgAAABBBNkNBJJJJIEkJIIBJIAJJJJIFNINIklgNlNpBtpNoFgMsFElIMtoAJgAAABANooEkFgkkhJNJIABIBIJBJJIFEBppIJgJpBJBhAEhBtsgNEpEMpJJNlhAAIAgMEEksltsgBpIIIJNABAJJJBBNohgAlsgBsFIlAAIJNoksktFkkBBEtIAIIAAgAABkFsoBJJAAABBJJAJJJAIEAspNttAsBEosoEkEsFkttghNJsBtklJAtkstsllskggBpIBAIIIBIBJJJBNMtNAtlgNBENgBIIEFMFNIpNJNsNsgssAFtkststtlssBNIINIAJIAAJJJJANEFFpllkMNsJkgAkhoFtggBIBlJMpJEskFsstttltllBBpIIEABIBBBJJJJAMhNpJlkpIEFsplhlNpItEIIBEpAEBIMlANktlkstsMoBNIAEAgIIAJJJJJJIEJgBJJJsItpNBFNNoBNgIABlMMpNhBNhFksstkklgkpBpIEBAEBJAJJJJJJAphJBstEpElslllIEtJJAAABMIssJABNksltssllsEkBNJABABJJBBJJJJJJIsIItstthEttttskJAAoBBJIBJtIppJBlEsNJIJpAAltpIAJBoJIABJJJJJIJhIIMkklklIJJpFFNoAAlspsJMNAltlktthlkANgAlJFJBAJEBIAAJJJJJJIINFJstoBgNIJAFghJkFIJBlBJlJBgAJJFkMktBoIMAApBAAAAJAIJJJJJJJIEtMIhJIIsoNgEJktpoAIhslAtsAJAJJAthkAAJsMgJFJBBABJJJJJJJJJJJIIFsIBBAslBNAtoBlNEgNgkoplIMhBJJBkkAAMIAlpApJIABJJJJJJJJJJJJIJoEIJJItkltgBgIsktttlAtJgFtgJJIklgAokgIoBNJJJJJJJJJJJJJJJJJJMIhAIJItsshpMAJkkllhJBttssttklkslkklkptJApJJJJJJJJJJBAJJJJJJhJhBBAIFklMsNthBJAIFhAtslssstlslltoloIJANJABJJJJJJBBIBJJJAJEJJpAIBIJJsthlINspBJMBMkkslssktpttslpAABIpBBIJAAABIIAAJJJIBJpJIoBIBJJIsFtAAIJAIlhAttNsklkspkkllsAAABFJJJAJAAAIJJIABJIBBNJJIsoFMkgFgFJBBJAAEtNItsMlklstNsllktABBJpJJJJJJJJJJJIJBJAJJpJBpJAIAANskpAMAAIIFpBJtElMsltkltEkkohJIFJJJJJJJJJJJJJIJJJJFJIJJEIEgFssIpBBBBINlBAEotplkstlktslsMskJpJJJJJJJJJJJJIBJJJJpJEJAAAEgBlklllJBJAFJBIMtslskklsttttgIJBlJJJJJJJJJJJJJBJJJJMJIhJAgAAAFkpktAJltthtBBNkktlksttlstkIMlkpJJJJJJJJJJJJIJJJJIpJNJIMAgFAtkNkoIEttttoBEkllkstkstsltgMlkt//xAAUEQEAAAAAAAAAAAAAAAAAAADQ/9oACAEDAQE/EDCn/8QAIxEAAwACAgIDAQEBAQAAAAAAAAERECEgMTBAQVBRYXFgkf/aAAgBAgEBPxClKUpS4b2UpSlKUpSlKUpSlKUpSlKUpSlKUr4Uub4Jd4hCEJmEGoUrKUrKyvClKUpSlKUoiEIQhCYpSlExvZSlKUr+CspXhSlLhfE1v16XyzlMzCU8SOmLmH+cn6B5R/R9jFwmNr039AufXKl9N3x34V4HwQ8LEIT5xc9nWj/D+ESN+N8p7S4bJ414+gi+JiHy7eTo/wAELHWP6sPgyfmJOsVeJk5T2VwmYTEIQhCCzRc+mK+F8VzBafiTfDSF2IZ0PvHbzNCzFh+J8bynqrE5zms2eB4u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"

/***/ }),

/***/ "./src/main.app.js":
/*!*************************!*\
  !*** ./src/main.app.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var $ = global.jQuery = __webpack_require__(/*! jquery/dist/jquery.slim.js */ "./node_modules/jquery/dist/jquery.slim.js");

var IndexPage = __webpack_require__(/*! ~/components/page/IndexPage */ "./src/components/page/IndexPage.js");

$(document).ready(function () {
  new IndexPage();
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/registry-css-classes.js":
/*!*************************************!*\
  !*** ./src/registry-css-classes.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// The registry is used to associate a full classname with a shorter "mangled" classname
// at compile time :
//
//    { <full class name>: <mangled> }
//
// Our compile process generates a version of the registry which we load
// directly on the client as a separate js file. 
var CLASS_NAME_REGISTERY = global.CLASS_NAME_REGISTERY || {};

// This is used internally by components to get / set class names, but also 
// passed as a hook to jss to generate css rules (hence the strange implementation).   
exports.getClassNameGenerator = function (forFilename) {

  var componentName = forFilename.split('/').slice(-1)[0].replace('static', '').replace(/\W/g, '');

  return function (rule) {

    // Shorthand to get the class name of the root element of the component:
    // e.g. : getClassName()
    rule = rule || componentName;

    var className = void 0;
    // This is for `generateClassName` option from JSS, to define class names
    if (typeof rule.key === 'string') {

      // Empty string is a shorthand to define class for the root element of the component
      if (rule.key === '') className = componentName + '-' + componentName;else className = componentName + '-' + rule.key;

      // This is for our utils to get class names
    } else className = componentName + '-' + rule;

    // In production, mangle `className` and add to the registry
    if (false) { var mangled; } else {
      return className;
    }
  };
};

exports.getRegistry = function () {
  return Object.assign({}, CLASS_NAME_REGISTERY);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

/******/ });
//# sourceMappingURL=app.js.map