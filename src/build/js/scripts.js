(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// Register load event
document.addEventListener("DOMContentLoaded", function () {
  // Find every collapse element
  var containers = document.querySelectorAll('.collapse');
  containers.forEach(function (container, index) {
    // Register click listener
    container.addEventListener('click', collapse); // Store index for nav

    container.dataset.index = index; // Open first element

    if (index === 0) {
      container.click();
    }
  }); // Register projects nav events

  document.querySelectorAll('#projects-nav button').forEach(function (btn) {
    if (btn.dataset.direction === 'prev') {
      btn.addEventListener('click', prevProject);
    } else {
      btn.addEventListener('click', nextProject);
    }
  });
}); // Nav to the next project on the queue

function nextProject() {
  // Get open collapser and the collapsers list
  var open = document.querySelector('#projects-container .open');
  var collapsers = document.querySelectorAll('.collapse'); // Make sure there is a next project

  if (parseInt(open.dataset.index) < collapsers.length - 1) {
    // Do next
    var nextIndex = parseInt(open.dataset.index) + 1;
    var query = '#projects-container [data-index="' + nextIndex + '"]';

    var _nextProject = document.querySelector(query);

    _nextProject.click();
  }
} // Nav to the previous project on the queue


function prevProject() {
  var open = document.querySelector('#projects-container .open'); // Make sure there is a prev project

  if (parseInt(open.dataset.index) > 0) {
    // Do prev
    var prevIndex = parseInt(open.dataset.index) - 1;
    var query = '#projects-container [data-index="' + prevIndex + '"]';

    var _prevProject = document.querySelector(query);

    _prevProject.click();
  }
} // Collapse/Uncollapse project


function collapse() {
  // Close any open collapse element
  var open = this.parentElement.getElementsByClassName('open');
  var openIndex = 0; // Prevent collapse from "closing" itself

  if (open.length && open[0] !== this) {
    openIndex = parseInt(open[0].dataset.index);
    open[0].style.maxHeight = '180px';
    open[0].classList.remove('open');
  } // Make sure collapse needs to be "open"


  if (!this.classList.contains('open')) {
    var scroll = function scroll(container, element) {
      container.scrollTo({
        top: element.offsetTop - 55,
        behavior: 'smooth'
      });
    };

    // Add open class and set it's content height as max height
    this.classList.add('open');
    var inner = this.getElementsByTagName('article')[0];
    this.style.maxHeight = inner.offsetHeight + 'px'; // Update position count

    var collapsers = document.querySelectorAll('.collapse');
    var index = parseInt(this.dataset.index) + 1;
    document.querySelector('#projects-nav span').innerHTML = index + ' / ' + collapsers.length; // Update open collapser index

    if (index === 1) {
      document.querySelector('#projects-nav').dataset.index = 'first';
    } else if (index === collapsers.length) {
      document.querySelector('#projects-nav').dataset.index = 'last';
    } else {
      document.querySelector('#projects-nav').dataset.index = false;
    } // Scroll to project position


    var element = this;
    var container = document.querySelector('#projects-container');

    if (openIndex < parseInt(element.dataset.index)) {
      setTimeout(function () {
        scroll(container, element);
      }, 400);
    } else {
      scroll(container, element);
    }
  }
}

;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

require("./menu.js");

var _imgLazyLoad = require("./img-lazy-load.js");

require("./collapse.js");

// Page load event
window.onload = pageLoaded;

function pageLoaded() {
  console.log('hey');
  document.body.classList.add('loaded');
}

},{"./collapse.js":1,"./img-lazy-load.js":2,"./menu.js":4}],4:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Merge home and header menu buttons
var btns = [].concat(_toConsumableArray(document.querySelectorAll('#home-menu button')), _toConsumableArray(document.querySelectorAll('#main-menu button'))); // Register click event for each one

btns.forEach(function (btn) {
  btn.addEventListener('click', switchTab);
});

function switchTab() {
  // Remove previous active button
  document.querySelector('#main-menu .active').classList.remove('active'); // Add new active button on header menu

  var btnTarget = this.dataset.target;
  document.querySelector('#main-menu [data-target="' + btnTarget + '"]').classList.add('active'); // Get current and target sections, 

  var section = document.querySelector('section.active');
  var target = document.querySelector(this.dataset.target); // Declare enter and leave animations variables
  // (direction on the menu: left-> Right or Right -> Left)

  var enter, leave; // Compare section idex to determine direction

  if (parseInt(section.dataset.index) > parseInt(target.dataset.index)) {
    leave = 'leave-right';
    enter = 'active-left';
  } else {
    leave = 'leave-left';
    enter = 'active-right';
  } // Start leave animation for previous active section


  section.classList.add(leave); // Add active class to new active section

  target.classList.add('active', enter); // We need a timeout to wait for the animations to finish

  setTimeout(function () {
    // Remove classes from previous active section
    section.classList.remove('active', 'active-left', 'active-right', 'leave-left', 'leave-right'); // Swap menus between home and any other page

    if (target.id === 'home') {
      document.querySelector('#main-menu').classList.add('leave');
      setTimeout(function () {
        document.querySelector('#main-menu').classList.remove('active', 'leave');
      }, 200);
    } else {
      document.querySelector('#main-menu').classList.add('active');
    }
  }, 400);
}

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29sbGFwc2UuanMiLCJzcmMvanMvaW1nLWxhenktbG9hZC5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUVuRDtBQUNBLE1BQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixXQUExQixDQUFqQjtBQUVBLEVBQUEsVUFBVSxDQUFDLE9BQVgsQ0FBb0IsVUFBQyxTQUFELEVBQVksS0FBWixFQUFzQjtBQUV6QztBQUNBLElBQUEsU0FBUyxDQUFDLGdCQUFWLENBQTJCLE9BQTNCLEVBQW1DLFFBQW5DLEVBSHlDLENBS3pDOztBQUNBLElBQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsR0FBMEIsS0FBMUIsQ0FOeUMsQ0FRekM7O0FBQ0EsUUFBSSxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNoQixNQUFBLFNBQVMsQ0FBQyxLQUFWO0FBQ0E7QUFDRCxHQVpELEVBTG1ELENBbUJuRDs7QUFDQSxFQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixzQkFBMUIsRUFBa0QsT0FBbEQsQ0FBMkQsVUFBQSxHQUFHLEVBQUk7QUFDakUsUUFBSyxHQUFHLENBQUMsT0FBSixDQUFZLFNBQVosS0FBMEIsTUFBL0IsRUFBd0M7QUFDdkMsTUFBQSxHQUFHLENBQUMsZ0JBQUosQ0FBcUIsT0FBckIsRUFBNkIsV0FBN0I7QUFDQSxLQUZELE1BRU87QUFDTixNQUFBLEdBQUcsQ0FBQyxnQkFBSixDQUFxQixPQUFyQixFQUE2QixXQUE3QjtBQUNBO0FBQ0QsR0FORDtBQU9BLENBM0JELEUsQ0E2QkE7O0FBQ0EsU0FBUyxXQUFULEdBQXVCO0FBRXRCO0FBQ0EsTUFBSSxJQUFJLEdBQVMsUUFBUSxDQUFDLGFBQVQs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QUFDLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsUUFBekIsRUFBa0MsYUFBbEMsRUFBZ0QsY0FBaEQsRUFBK0QsWUFBL0QsRUFBNEUsYUFBNUUsRUFIaUIsQ0FLakI7O0FBQ0EsUUFBSSxNQUFNLENBQUMsRUFBUCxLQUFjLE1BQWxCLEVBQTBCO0FBQ3pCLE1BQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsU0FBckMsQ0FBK0MsR0FBL0MsQ0FBbUQsT0FBbkQ7QUFFQSxNQUFBLFVBQVUsQ0FBRSxZQUFNO0FBQ2pCLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsU0FBckMsQ0FBK0MsTUFBL0MsQ0FBc0QsUUFBdEQsRUFBK0QsT0FBL0Q7QUFDQSxPQUZTLEVBRVIsR0FGUSxDQUFWO0FBR0EsS0FORCxNQU1PO0FBQ04sTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxTQUFyQyxDQUErQyxHQUEvQyxDQUFtRCxRQUFuRDtBQUNBO0FBRUQsR0FoQlMsRUFnQlIsR0FoQlEsQ0FBVjtBQWlCQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFJlZ2lzdGVyIGxvYWQgZXZlbnRcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG5cclxuXHQvLyBGaW5kIGV2ZXJ5IGNvbGxhcHNlIGVsZW1lbnRcclxuXHRsZXQgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2xsYXBzZScpO1xyXG5cclxuXHRjb250YWluZXJzLmZvckVhY2goIChjb250YWluZXIsIGluZGV4KSA9PiB7XHJcblxyXG5cdFx0Ly8gUmVnaXN0ZXIgY2xpY2sgbGlzdGVuZXJcclxuXHRcdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsY29sbGFwc2UpO1xyXG5cclxuXHRcdC8vIFN0b3JlIGluZGV4IGZvciBuYXZcclxuXHRcdGNvbnRhaW5lci5kYXRhc2V0LmluZGV4ID0gaW5kZXg7XHJcblxyXG5cdFx0Ly8gT3BlbiBmaXJzdCBlbGVtZW50XHJcblx0XHRpZiAoaW5kZXggPT09IDApIHtcclxuXHRcdFx0Y29udGFpbmVyLmNsaWNrKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIFJlZ2lzdGVyIHByb2plY3RzIG5hdiBldmVudHNcclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcHJvamVjdHMtbmF2IGJ1dHRvbicpLmZvckVhY2goIGJ0biA9PiB7XHJcblx0XHRpZiAoIGJ0bi5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gJ3ByZXYnICkge1xyXG5cdFx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHByZXZQcm9qZWN0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsbmV4dFByb2plY3QpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbi8vIE5hdiB0byB0aGUgbmV4dCBwcm9qZWN0IG9uIHRoZSBxdWV1ZVxyXG5mdW5jdGlvbiBuZXh0UHJvamVjdCgpIHtcclxuXHJcblx0Ly8gR2V0IG9wZW4gY29sbGFwc2VyIGFuZCB0aGUgY29sbGFwc2VycyBsaXN0XHJcblx0bGV0IG9wZW4gICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtY29udGFpbmVyIC5vcGVuJyk7XHJcblx0bGV0IGNvbGxhcHNlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2UnKTtcclxuXHJcblx0Ly8gTWFrZSBzdXJlIHRoZXJlIGlzIGEgbmV4dCBwcm9qZWN0XHJcblx0aWYgKCBwYXJzZUludChvcGVuLmRhdGFzZXQuaW5kZXgpIDwgKCBjb2xsYXBzZXJzLmxlbmd0aCAtIDEpICkge1xyXG5cdFx0Ly8gRG8gbmV4dFxyXG5cdFx0bGV0IG5leHRJbmRleCAgID0gcGFyc2VJbnQob3Blbi5kYXRhc2V0LmluZGV4KSArIDE7XHJcblx0XHRsZXQgcXVlcnkgICAgICAgPSAnI3Byb2plY3RzLWNvbnRhaW5lciBbZGF0YS1pbmRleD1cIicgKyBuZXh0SW5kZXggKyAnXCJdJztcclxuXHRcdGxldCBuZXh0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xyXG5cdFx0bmV4dFByb2plY3QuY2xpY2soKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vIE5hdiB0byB0aGUgcHJldmlvdXMgcHJvamVjdCBvbiB0aGUgcXVldWVcclxuZnVuY3Rpb24gcHJldlByb2plY3QoKSB7XHJcblxyXG5cdGxldCBvcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzLWNvbnRhaW5lciAub3BlbicpO1xyXG5cclxuXHQvLyBNYWtlIHN1cmUgdGhlcmUgaXMgYSBwcmV2IHByb2plY3RcclxuXHRpZiAoIHBhcnNlSW50KG9wZW4uZGF0YXNldC5pbmRleCkgPiAwICkge1xyXG5cdFx0Ly8gRG8gcHJldlxyXG5cdFx0bGV0IHByZXZJbmRleCAgID0gcGFyc2VJbnQob3Blbi5kYXRhc2V0LmluZGV4KSAtIDE7XHJcblx0XHRsZXQgcXVlcnkgICAgICAgPSAnI3Byb2plY3RzLWNvbnRhaW5lciBbZGF0YS1pbmRleD1cIicgKyBwcmV2SW5kZXggKyAnXCJdJztcclxuXHRcdGxldCBwcmV2UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xyXG5cdFx0cHJldlByb2plY3QuY2xpY2soKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vIENvbGxhcHNlL1VuY29sbGFwc2UgcHJvamVjdFxyXG5mdW5jdGlvbiBjb2xsYXBzZSgpIHtcclxuXHJcblx0Ly8gQ2xvc2UgYW55IG9wZW4gY29sbGFwc2UgZWxlbWVudFxyXG5cdGxldCBvcGVuICAgICAgPSB0aGlzLnBhcmVudEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3BlbicpO1xyXG5cdGxldCBvcGVuSW5kZXggPSAwO1xyXG5cclxuXHQvLyBQcmV2ZW50IGNvbGxhcHNlIGZyb20gXCJjbG9zaW5nXCIgaXRzZWxmXHJcblx0aWYgKG9wZW4ubGVuZ3RoICYmIG9wZW5bMF0gIT09IHRoaXMpIHtcclxuXHRcdG9wZW5JbmRleCA9IHBhcnNlSW50KG9wZW5bMF0uZGF0YXNldC5pbmRleCk7XHJcblx0XHRvcGVuWzBdLnN0eWxlLm1heEhlaWdodCA9ICcxODBweCc7XHJcblx0XHRvcGVuWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHR9XHJcblxyXG5cdC8vIE1ha2Ugc3VyZSBjb2xsYXBzZSBuZWVkcyB0byBiZSBcIm9wZW5cIlxyXG5cdGlmICggIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykgKSB7XHJcblxyXG5cdFx0Ly8gQWRkIG9wZW4gY2xhc3MgYW5kIHNldCBpdCdzIGNvbnRlbnQgaGVpZ2h0IGFzIG1heCBoZWlnaHRcclxuXHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG5cdFx0bGV0IGlubmVyID0gdGhpcy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYXJ0aWNsZScpWzBdO1xyXG5cdFx0dGhpcy5zdHlsZS5tYXhIZWlnaHQgPSBpbm5lci5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSBwb3NpdGlvbiBjb3VudFxyXG5cdFx0bGV0IGNvbGxhcHNlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2UnKTtcclxuXHRcdGxldCBpbmRleCAgICAgID0gcGFyc2VJbnQoIHRoaXMuZGF0YXNldC5pbmRleCApICsgMTtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1uYXYgc3BhbicpLmlubmVySFRNTCA9IGluZGV4ICsgJyAvICcgKyBjb2xsYXBzZXJzLmxlbmd0aDtcclxuXHJcblx0XHQvLyBVcGRhdGUgb3BlbiBjb2xsYXBzZXIgaW5kZXhcclxuXHRcdGlmICggaW5kZXggPT09IDEgKSB7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1uYXYnKS5kYXRhc2V0LmluZGV4ID0gJ2ZpcnN0JztcclxuXHRcdH0gZWxzZSBpZiAoIGluZGV4ID09PSBjb2xsYXBzZXJzLmxlbmd0aCApIHtcclxuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzLW5hdicpLmRhdGFzZXQuaW5kZXggPSAnbGFzdCc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtbmF2JykuZGF0YXNldC5pbmRleCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNjcm9sbCB0byBwcm9qZWN0IHBvc2l0aW9uXHJcblx0XHRsZXQgZWxlbWVudCAgID0gdGhpcztcclxuXHRcdGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtY29udGFpbmVyJyk7XHJcblxyXG5cdFx0aWYgKCBvcGVuSW5kZXggPCBwYXJzZUludCggZWxlbWVudC5kYXRhc2V0LmluZGV4ICkgKSB7XHJcblx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0XHRzY3JvbGwoY29udGFpbmVyLGVsZW1lbnQpO1xyXG5cdFx0XHR9LDQwMCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzY3JvbGwoY29udGFpbmVyLGVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNjcm9sbChjb250YWluZXIsZWxlbWVudCkge1xyXG5cclxuXHRcdFx0Y29udGFpbmVyLnNjcm9sbFRvKHtcclxuXHRcdFx0XHR0b3AgICAgICA6IGVsZW1lbnQub2Zmc2V0VG9wIC0gNTUsXHJcblx0XHRcdFx0YmVoYXZpb3IgOiAnc21vb3RoJyxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59OyIsIi8vIFJlZ2lzdGVyIGxvYWQgZXZlbnRcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG5cdGltZ0xhenlMb2FkKCk7XHJcblx0aW1nQmdMYXp5TG9hZCgpO1xyXG59KTtcclxuXHRcclxuZnVuY3Rpb24gaW1nTGF6eUxvYWQoKSB7XHJcblxyXG5cdC8vIEdldCBhbGwgZmlndXJlcyBmcm9tIHdlYnNpdGVcclxuXHRsZXQgZmlndXJlcyA9IFtdLnNsaWNlLmNhbGwoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJmaWd1cmUubG9hZGluZ1wiKSApO1xyXG5cclxuXHRmaWd1cmVzLmZvckVhY2goIGZpZ3VyZSA9PiB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoaXMgZmlndXJlIGhhcyBpbWFnZXMgd2l0aCBsb2FkaW5nIGNsYXNzXHJcblx0XHRpZiAoIGZpZ3VyZS5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRpbmcnKSApIHtcclxuXHJcblx0XHRcdC8vIEdldCBmaWd1cmUgaW1hZ2VzXHJcblx0XHRcdGxldCBpbWFnZXMgPSBmaWd1cmUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaW1nIG9mIGltYWdlcykge1xyXG5cdFx0XHRcdC8vIFNldCBpbWFnZSBzcmMgYW5kIGxpc3RlbiB0byBsb2FkIGFuZCBlcnJvciBldmVudHMgXHJcblx0XHRcdFx0aW1nLnNyYyA9IGltZy5kYXRhc2V0LnNyYzsgXHJcblx0XHRcdFx0aW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLGltYWdlTG9hZGVkKTtcclxuXHRcdFx0XHRpbWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLGltYWdlRXJyb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBpbWFnZUxvYWRlZChlKSB7XHJcblx0XHR0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIixcInN2Zy1sb2FkaW5nXCIpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VFcnJvcihlKSB7XHJcblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdGxhenlMb2FkKCk7XHJcblx0XHR9LCAyMDApO1xyXG5cdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGltZ0JnTGF6eUxvYWQoKSB7XHJcblxyXG5cdC8vIEdldCBhbGwgY29udGFpbmVyIHdpdGggYmcgZnJvbSB3ZWJzaXRlXHJcblx0bGV0IGNvbnRhaW5lcnMgPSBbXS5zbGljZS5jYWxsKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxhenktYmdcIikgKTtcclxuXHJcblx0Y29udGFpbmVycy5mb3JFYWNoKCAoY29udGFpbmVyLGluZGV4KSA9PiB7XHJcblxyXG5cdFx0bGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuXHRcdGlmIChjb250YWluZXIuZGF0YXNldC5iYWNrZ3JvdW5kKSB7XHJcblx0XHRcdGltZy5zcmMgPSBjb250YWluZXIuZGF0YXNldC5iYWNrZ3JvdW5kO1xyXG5cdFx0XHRpbWcuZGF0YXNldC5pbmRleCA9IGluZGV4O1xyXG5cdFx0XHRpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsaW1hZ2VMb2FkZWQpO1xyXG5cdFx0XHRpbWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLGltYWdlRXJyb3IpO1xyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VMb2FkZWQoZSkge1xyXG5cdFx0Y29udGFpbmVyc1t0aGlzLmRhdGFzZXQuaW5kZXhdLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHRoaXMuc3JjICsgJyknO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VFcnJvcihlKSB7XHJcblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdGJnTGF6eUxvYWQoKTtcclxuXHRcdH0sIDMwMCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgeyBpbWdMYXp5TG9hZCwgaW1nQmdMYXp5TG9hZCB9OyIsImltcG9ydCAnLi9tZW51LmpzJztcclxuaW1wb3J0IHsgaW1nTGF6eUxvYWQsIGltZ2JnTGF6eUxvYWQgfSBmcm9tICcuL2ltZy1sYXp5LWxvYWQuanMnO1xyXG5pbXBvcnQgJy4vY29sbGFwc2UuanMnO1xyXG5cclxuLy8gUGFnZSBsb2FkIGV2ZW50XHJcbndpbmRvdy5vbmxvYWQgPSBwYWdlTG9hZGVkO1xyXG5cclxuZnVuY3Rpb24gcGFnZUxvYWRlZCgpIHtcclxuXHRjb25zb2xlLmxvZygnaGV5Jyk7XHJcblx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKVxyXG59IiwiLy8gTWVyZ2UgaG9tZSBhbmQgaGVhZGVyIG1lbnUgYnV0dG9uc1xyXG5sZXQgYnRucyA9IFtcclxuXHQuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjaG9tZS1tZW51IGJ1dHRvbicpLFxyXG5cdC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtYWluLW1lbnUgYnV0dG9uJylcclxuXTtcclxuXHJcbi8vIFJlZ2lzdGVyIGNsaWNrIGV2ZW50IGZvciBlYWNoIG9uZVxyXG5idG5zLmZvckVhY2goIGJ0biA9PiB7XHJcblx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxzd2l0Y2hUYWIpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHN3aXRjaFRhYigpIHtcclxuXHJcblx0Ly8gUmVtb3ZlIHByZXZpb3VzIGFjdGl2ZSBidXR0b25cclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1tZW51IC5hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcblx0Ly8gQWRkIG5ldyBhY3RpdmUgYnV0dG9uIG9uIGhlYWRlciBtZW51XHJcblx0bGV0IGJ0blRhcmdldCA9IHRoaXMuZGF0YXNldC50YXJnZXQ7XHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tbWVudSBbZGF0YS10YXJnZXQ9XCInICsgYnRuVGFyZ2V0ICsgJ1wiXScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuXHQvLyBHZXQgY3VycmVudCBhbmQgdGFyZ2V0IHNlY3Rpb25zLCBcclxuXHRsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uYWN0aXZlJyk7XHJcblx0bGV0IHRhcmdldCAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCB0aGlzLmRhdGFzZXQudGFyZ2V0ICk7XHJcblxyXG5cdC8vIERlY2xhcmUgZW50ZXIgYW5kIGxlYXZlIGFuaW1hdGlvbnMgdmFyaWFibGVzXHJcblx0Ly8gKGRpcmVjdGlvbiBvbiB0aGUgbWVudTogbGVmdC0+IFJpZ2h0IG9yIFJpZ2h0IC0+IExlZnQpXHJcblx0bGV0IGVudGVyLGxlYXZlO1xyXG5cclxuXHQvLyBDb21wYXJlIHNlY3Rpb24gaWRleCB0byBkZXRlcm1pbmUgZGlyZWN0aW9uXHJcblx0aWYgKCBwYXJzZUludCggc2VjdGlvbi5kYXRhc2V0LmluZGV4ICkgPiBwYXJzZUludCggdGFyZ2V0LmRhdGFzZXQuaW5kZXggKSApIHtcclxuXHRcdGxlYXZlID0gJ2xlYXZlLXJpZ2h0JztcclxuXHRcdGVudGVyID0gJ2FjdGl2ZS1sZWZ0JztcclxuXHR9IGVsc2Uge1xyXG5cdFx0bGVhdmUgPSAnbGVhdmUtbGVmdCc7XHJcblx0XHRlbnRlciA9ICdhY3RpdmUtcmlnaHQnO1xyXG5cdH1cclxuXHJcblx0Ly8gU3RhcnQgbGVhdmUgYW5pbWF0aW9uIGZvciBwcmV2aW91cyBhY3RpdmUgc2VjdGlvblxyXG5cdHNlY3Rpb24uY2xhc3NMaXN0LmFkZChsZWF2ZSk7XHJcblxyXG5cdC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gbmV3IGFjdGl2ZSBzZWN0aW9uXHJcblx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScsZW50ZXIpO1xyXG5cclxuXHQvLyBXZSBuZWVkIGEgdGltZW91dCB0byB3YWl0IGZvciB0aGUgYW5pbWF0aW9ucyB0byBmaW5pc2hcclxuXHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblxyXG5cdFx0Ly8gUmVtb3ZlIGNsYXNzZXMgZnJvbSBwcmV2aW91cyBhY3RpdmUgc2VjdGlvblxyXG5cdFx0c2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCdhY3RpdmUtbGVmdCcsJ2FjdGl2ZS1yaWdodCcsJ2xlYXZlLWxlZnQnLCdsZWF2ZS1yaWdodCcpO1xyXG5cclxuXHRcdC8vIFN3YXAgbWVudXMgYmV0d2VlbiBob21lIGFuZCBhbnkgb3RoZXIgcGFnZVxyXG5cdFx0aWYgKHRhcmdldC5pZCA9PT0gJ2hvbWUnKSB7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdsZWF2ZScpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLW1lbnUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCdsZWF2ZScpO1xyXG5cdFx0XHR9LDIwMCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1tZW51JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdH0sNDAwKTtcclxufSJdfQ==
