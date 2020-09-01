(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imgLazyLoad = imgLazyLoad;
exports.imgBgLazyLoad = imgBgLazyLoad;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Register load event
document.addEventListener("DOMContentLoaded", function () {
  imgLazyLoad();
  imgBgLazyLoad();
});

function imgLazyLoad() {
  // Get all figures from website
  var figures = [].slice.call(document.querySelectorAll("figure.loading"));
  figures.forEach(function (figure) {
    // Make sure this figure has images with loading class
    if (figure.classList.contains('loading')) {
      // Get figure images
      var images = figure.getElementsByTagName('img');

      var _iterator = _createForOfIteratorHelper(images),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var img = _step.value;
          // Set image src and listen to load and error events 
          img.src = img.dataset.src;
          img.addEventListener('load', imageLoaded);
          img.addEventListener('error', imageError);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });

  function imageLoaded(e) {
    this.parentNode.classList.remove("loading", "svg-loading");
  }

  function imageError(e) {
    setTimeout(function () {
      lazyLoad();
    }, 200);
  }
}

;

function imgBgLazyLoad() {
  // Get all container with bg from website
  var containers = [].slice.call(document.querySelectorAll(".lazy-bg"));
  containers.forEach(function (container, index) {
    var img = document.createElement('img');

    if (container.dataset.background) {
      img.src = container.dataset.background;
      img.dataset.index = index;
      img.addEventListener('load', imageLoaded);
      img.addEventListener('error', imageError);
    }
  });

  function imageLoaded(e) {
    containers[this.dataset.index].style.backgroundImage = 'url(' + this.src + ')';
  }

  function imageError(e) {
    setTimeout(function () {
      bgLazyLoad();
    }, 300);
  }
}

},{}],2:[function(require,module,exports){
"use strict";

var _imgLazyLoad = require("./img-lazy-load.js");

require("./svg-lazy-load");

require("./menu.js");

},{"./img-lazy-load.js":1,"./menu.js":3,"./svg-lazy-load":4}],3:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var btns = [].concat(_toConsumableArray(document.querySelectorAll('#home-menu button')), _toConsumableArray(document.querySelectorAll('#main-menu button')));
btns.forEach(function (btn) {
  btn.addEventListener('click', switchTab);
});

function switchTab() {
  // Update active button
  document.querySelector('#main-menu .active').classList.remove('active');
  var btnTarget = this.dataset.target;
  document.querySelector('#main-menu [data-target="' + btnTarget + '"]').classList.add('active');
  this.classList.add('active'); // Get current and target sections, declare enter and leave animations

  var section = document.querySelector('section.active');
  var target = document.querySelector(this.dataset.target);
  var enter, leave; // Compare index to set enter and leave animation classes

  if (parseInt(section.dataset.index) > parseInt(target.dataset.index)) {
    leave = 'leave-right';
    enter = 'active-left';
  } else {
    leave = 'leave-left';
    enter = 'active-right';
  } // Start leave animation


  section.classList.add(leave); // Add active class to new active section

  target.classList.add('active', enter);
  setTimeout(function () {
    // Remove classes from former active section
    section.classList.remove('active', 'active-left', 'active-right', 'leave-left', 'leave-right'); // Handle home and main menu visibility

    if (target.id === 'home') {
      document.querySelector('#main-menu').classList.add('leave');
      setTimeout(function () {
        document.querySelector('#main-menu').classList.remove('active', 'leave');
      }, 200);
    } else {
      document.querySelector('#main-menu').classList.add('active');
    }
  }, 400);
} // Register load event


document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('[data-target="#skills"]').click();
});

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svgLazyLoad = svgLazyLoad;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Register load event
document.addEventListener("DOMContentLoaded", function () {
  svgLazyLoad();
});

function svgLazyLoad() {
  // Get all figures from website
  var figures = [].slice.call(document.querySelectorAll("figure.svg-loading"));
  figures.forEach(function (figure) {
    // Make sure this figure has images with loading class
    if (figure.classList.contains('svg-loading')) {
      // Get figure images
      var containers = figure.getElementsByTagName('object');

      var _iterator = _createForOfIteratorHelper(containers),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var container = _step.value;
          // Set image src and listen to load and error events
          container.data = container.dataset.src;
          container.addEventListener('load', imageLoaded);
          container.addEventListener('error', imageError);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });

  function imageLoaded(e) {
    this.parentNode.classList.remove("loading");
  }

  function imageError(e) {
    setTimeout(function () {
      svgLazyLoad();
    }, 200);
  }
}

;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW1nLWxhenktbG9hZC5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9tZW51LmpzIiwic3JjL2pzL3N2Zy1sYXp5LWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ25ELEVBQUEsV0FBVztBQUNYLEVBQUEsYUFBYTtBQUNiLENBSEQ7O0FBS0EsU0FBUyxXQUFULEdBQXVCO0FBRXRCO0FBQ0EsTUFBSSxPQUFPLEdBQUcsR0FBRyxLQUFILENBQVMsSUFBVCxDQUFlLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBZixDQUFkO0FBRUEsRUFBQSxPQUFPLENBQUMsT0FBUixDQUFpQixVQUFBLE1BQU0sRUFBSTtBQUUxQjtBQUNBLFFBQUssTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsU0FBMUIsQ0FBTCxFQUE0QztBQUUzQztBQUNBLFVBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxvQkFBUCxDQUE0QixLQUE1QixDQUFiOztBQUgyQyxpREFLM0IsTUFMMkI7QUFBQTs7QUFBQTtBQUszQyw0REFBd0I7QUFBQSxjQUFmLEdBQWU7QUFDdkI7QUFDQSxVQUFBLEdBQUcsQ0FBQyxHQUFKLEdBQVUsR0FBRyxDQUFDLE9BQUosQ0FBWSxHQUF0QjtBQUNBLFVBQUEsR0FBRyxDQUFDLGdCQUFKLENBQXFCLE1BQXJCLEVBQTRCLFdBQTVCO0FBQ0EsVUFBQSxHQUFHLENBQUMsZ0JBQUosQ0FBcUIsT0FBckIsRUFBNkIsVUFBN0I7QUFDQTtBQVYwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVzNDO0FBRUQsR0FoQkQ7O0FBa0JBLFdBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN2QixTQUFLLFVBQUwsQ0FBZ0IsU0FBaEIs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QjtBQUNBLE1BQUksT0FBTyxHQUFHLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBZSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsb0JBQTFCLENBQWYsQ0FBZDtBQUVBLEVBQUEsT0FBTyxDQUFDLE9BQVIsQ0FBaUIsVUFBQSxNQUFNLEVBQUk7QUFFMUI7QUFDQSxRQUFLLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLGFBQTFCLENBQUwsRUFBZ0Q7QUFFL0M7QUFDQSxVQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsb0JBQVAsQ0FBNEIsUUFBNUIsQ0FBakI7O0FBSCtDLGlEQUt6QixVQUx5QjtBQUFBOztBQUFBO0FBSy9DLDREQUFrQztBQUFBLGNBQXpCLFNBQXlCO0FBQ2pDO0FBQ0EsVUFBQSxTQUFTLENBQUMsSUFBVixHQUFpQixTQUFTLENBQUMsT0FBVixDQUFrQixHQUFuQztBQUNBLFVBQUEsU0FBUyxDQUFDLGdCQUFWLENBQTJCLE1BQTNCLEVBQWtDLFdBQWxDO0FBQ0EsVUFBQSxTQUFTLENBQUMsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBbUMsVUFBbkM7QUFDQTtBQVY4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVy9DO0FBRUQsR0FoQkQ7O0FBa0JBLFdBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN2QixTQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBMUIsQ0FBaUMsU0FBakM7QUFDQTs7QUFFRCxXQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUI7QUFDdEIsSUFBQSxVQUFVLENBQUUsWUFBTTtBQUNqQixNQUFBLFdBQVc7QUFDWCxLQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0E7QUFDRDs7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFJlZ2lzdGVyIGxvYWQgZXZlbnRcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG5cdGltZ0xhenlMb2FkKCk7XHJcblx0aW1nQmdMYXp5TG9hZCgpO1xyXG59KTtcclxuXHRcclxuZnVuY3Rpb24gaW1nTGF6eUxvYWQoKSB7XHJcblxyXG5cdC8vIEdldCBhbGwgZmlndXJlcyBmcm9tIHdlYnNpdGVcclxuXHRsZXQgZmlndXJlcyA9IFtdLnNsaWNlLmNhbGwoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmaWd1cmUubG9hZGluZ1wiKSApO1xyXG5cclxuXHRmaWd1cmVzLmZvckVhY2goIGZpZ3VyZSA9PiB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoaXMgZmlndXJlIGhhcyBpbWFnZXMgd2l0aCBsb2FkaW5nIGNsYXNzXHJcblx0XHRpZiAoIGZpZ3VyZS5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRpbmcnKSApIHtcclxuXHJcblx0XHRcdC8vIEdldCBmaWd1cmUgaW1hZ2VzXHJcblx0XHRcdGxldCBpbWFnZXMgPSBmaWd1cmUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaW1nIG9mIGltYWdlcykge1xyXG5cdFx0XHRcdC8vIFNldCBpbWFnZSBzcmMgYW5kIGxpc3RlbiB0byBsb2FkIGFuZCBlcnJvciBldmVudHMgXHJcblx0XHRcdFx0aW1nLnNyYyA9IGltZy5kYXRhc2V0LnNyYzsgXHJcblx0XHRcdFx0aW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLGltYWdlTG9hZGVkKTtcclxuXHRcdFx0XHRpbWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLGltYWdlRXJyb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBpbWFnZUxvYWRlZChlKSB7XHJcblx0XHR0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIixcInN2Zy1sb2FkaW5nXCIpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VFcnJvcihlKSB7XHJcblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdGxhenlMb2FkKCk7XHJcblx0XHR9LCAyMDApO1xyXG5cdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGltZ0JnTGF6eUxvYWQoKSB7XHJcblxyXG5cdC8vIEdldCBhbGwgY29udGFpbmVyIHdpdGggYmcgZnJvbSB3ZWJzaXRlXHJcblx0bGV0IGNvbnRhaW5lcnMgPSBbXS5zbGljZS5jYWxsKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxhenktYmdcIikgKTtcclxuXHJcblx0Y29udGFpbmVycy5mb3JFYWNoKCAoY29udGFpbmVyLGluZGV4KSA9PiB7XHJcblxyXG5cdFx0bGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuXHRcdGlmIChjb250YWluZXIuZGF0YXNldC5iYWNrZ3JvdW5kKSB7XHJcblx0XHRcdGltZy5zcmMgPSBjb250YWluZXIuZGF0YXNldC5iYWNrZ3JvdW5kO1xyXG5cdFx0XHRpbWcuZGF0YXNldC5pbmRleCA9IGluZGV4O1xyXG5cdFx0XHRpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsaW1hZ2VMb2FkZWQpO1xyXG5cdFx0XHRpbWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLGltYWdlRXJyb3IpO1xyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VMb2FkZWQoZSkge1xyXG5cdFx0Y29udGFpbmVyc1t0aGlzLmRhdGFzZXQuaW5kZXhdLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHRoaXMuc3JjICsgJyknO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VFcnJvcihlKSB7XHJcblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdGJnTGF6eUxvYWQoKTtcclxuXHRcdH0sIDMwMCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgeyBpbWdMYXp5TG9hZCwgaW1nQmdMYXp5TG9hZCB9OyIsImltcG9ydCB7IGltZ0xhenlMb2FkLCBpbWdiZ0xhenlMb2FkIH0gZnJvbSAnLi9pbWctbGF6eS1sb2FkLmpzJztcclxuaW1wb3J0ICcuL3N2Zy1sYXp5LWxvYWQnO1xyXG5pbXBvcnQgJy4vbWVudS5qcyc7IiwibGV0IGJ0bnMgPSBbXHJcblx0Li4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2hvbWUtbWVudSBidXR0b24nKSxcclxuXHQuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbWFpbi1tZW51IGJ1dHRvbicpXHJcbl07XHJcblxyXG5idG5zLmZvckVhY2goIGJ0biA9PiB7XHJcblx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxzd2l0Y2hUYWIpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHN3aXRjaFRhYigpIHtcclxuXHJcblx0Ly8gVXBkYXRlIGFjdGl2ZSBidXR0b25cclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1tZW51IC5hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRsZXQgYnRuVGFyZ2V0ID0gdGhpcy5kYXRhc2V0LnRhcmdldDtcclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1tZW51IFtkYXRhLXRhcmdldD1cIicgKyBidG5UYXJnZXQgKyAnXCJdJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG5cdHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG5cdC8vIEdldCBjdXJyZW50IGFuZCB0YXJnZXQgc2VjdGlvbnMsIGRlY2xhcmUgZW50ZXIgYW5kIGxlYXZlIGFuaW1hdGlvbnNcclxuXHRsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uYWN0aXZlJyk7XHJcblx0bGV0IHRhcmdldCAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCB0aGlzLmRhdGFzZXQudGFyZ2V0ICk7XHJcblx0bGV0IGVudGVyLGxlYXZlO1xyXG5cclxuXHQvLyBDb21wYXJlIGluZGV4IHRvIHNldCBlbnRlciBhbmQgbGVhdmUgYW5pbWF0aW9uIGNsYXNzZXNcclxuXHRpZiAoIHBhcnNlSW50KCBzZWN0aW9uLmRhdGFzZXQuaW5kZXggKSA+IHBhcnNlSW50KCB0YXJnZXQuZGF0YXNldC5pbmRleCApICkge1xyXG5cdFx0bGVhdmUgPSAnbGVhdmUtcmlnaHQnO1xyXG5cdFx0ZW50ZXIgPSAnYWN0aXZlLWxlZnQnO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRsZWF2ZSA9ICdsZWF2ZS1sZWZ0JztcclxuXHRcdGVudGVyID0gJ2FjdGl2ZS1yaWdodCc7XHJcblx0fVxyXG5cclxuXHQvLyBTdGFydCBsZWF2ZSBhbmltYXRpb25cclxuXHRzZWN0aW9uLmNsYXNzTGlzdC5hZGQobGVhdmUpO1xyXG5cclxuXHQvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIG5ldyBhY3RpdmUgc2VjdGlvblxyXG5cdHRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnLGVudGVyKTtcclxuXHJcblx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuXHRcdC8vIFJlbW92ZSBjbGFzc2VzIGZyb20gZm9ybWVyIGFjdGl2ZSBzZWN0aW9uXHJcblx0XHRzZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScsJ2FjdGl2ZS1sZWZ0JywnYWN0aXZlLXJpZ2h0JywnbGVhdmUtbGVmdCcsJ2xlYXZlLXJpZ2h0Jyk7XHJcblxyXG5cdFx0Ly8gSGFuZGxlIGhvbWUgYW5kIG1haW4gbWVudSB2aXNpYmlsaXR5XHJcblx0XHRpZiAodGFyZ2V0LmlkID09PSAnaG9tZScpIHtcclxuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tbWVudScpLmNsYXNzTGlzdC5hZGQoJ2xlYXZlJyk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tbWVudScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScsJ2xlYXZlJyk7XHJcblx0XHRcdH0sMjAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHJcblx0fSw0MDApO1xyXG59XHJcblxyXG4vLyBSZWdpc3RlciBsb2FkIGV2ZW50XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YXJnZXQ9XCIjc2tpbGxzXCJdJykuY2xpY2soKTtcclxufSk7IiwiLy8gUmVnaXN0ZXIgbG9hZCBldmVudFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcblx0c3ZnTGF6eUxvYWQoKTtcclxufSk7XHJcblx0XHJcbmZ1bmN0aW9uIHN2Z0xhenlMb2FkKCkge1xyXG5cclxuXHQvLyBHZXQgYWxsIGZpZ3VyZXMgZnJvbSB3ZWJzaXRlXHJcblx0bGV0IGZpZ3VyZXMgPSBbXS5zbGljZS5jYWxsKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZmlndXJlLnN2Zy1sb2FkaW5nXCIpICk7XHJcblxyXG5cdGZpZ3VyZXMuZm9yRWFjaCggZmlndXJlID0+IHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhpcyBmaWd1cmUgaGFzIGltYWdlcyB3aXRoIGxvYWRpbmcgY2xhc3NcclxuXHRcdGlmICggZmlndXJlLmNsYXNzTGlzdC5jb250YWlucygnc3ZnLWxvYWRpbmcnKSApIHtcclxuXHJcblx0XHRcdC8vIEdldCBmaWd1cmUgaW1hZ2VzXHJcblx0XHRcdGxldCBjb250YWluZXJzID0gZmlndXJlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvYmplY3QnKTtcclxuXHJcblx0XHRcdGZvciAobGV0IGNvbnRhaW5lciBvZiBjb250YWluZXJzKSB7XHJcblx0XHRcdFx0Ly8gU2V0IGltYWdlIHNyYyBhbmQgbGlzdGVuIHRvIGxvYWQgYW5kIGVycm9yIGV2ZW50c1xyXG5cdFx0XHRcdGNvbnRhaW5lci5kYXRhID0gY29udGFpbmVyLmRhdGFzZXQuc3JjO1xyXG5cdFx0XHRcdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJyxpbWFnZUxvYWRlZCk7XHJcblx0XHRcdFx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJyxpbWFnZUVycm9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VMb2FkZWQoZSkge1xyXG5cdFx0dGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkaW5nXCIpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VFcnJvcihlKSB7XHJcblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdHN2Z0xhenlMb2FkKCk7XHJcblx0XHR9LCAyMDApO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCB7IHN2Z0xhenlMb2FkIH07Il19
