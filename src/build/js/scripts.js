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

},{"./collapse.js":1,"./img-lazy-load.js":2,"./menu.js":4}],4:[function(require,module,exports){
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
  document.querySelector('[data-target="#experience"]').click();
});

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29sbGFwc2UuanMiLCJzcmMvanMvaW1nLWxhenktbG9hZC5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUVuRDtBQUNBLE1BQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixXQUExQixDQUFqQjtBQUVBLEVBQUEsVUFBVSxDQUFDLE9BQVgsQ0FBb0IsVUFBQyxTQUFELEVBQVksS0FBWixFQUFzQjtBQUV6QztBQUNBLElBQUEsU0FBUyxDQUFDLGdCQUFWLENBQTJCLE9BQTNCLEVBQW1DLFFBQW5DLEVBSHlDLENBS3pDOztBQUNBLElBQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsR0FBMEIsS0FBMUIsQ0FOeUMsQ0FRekM7O0FBQ0EsUUFBSSxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNoQixNQUFBLFNBQVMsQ0FBQyxLQUFWO0FBQ0E7QUFDRCxHQVpELEVBTG1ELENBbUJuRDs7QUFDQSxFQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixzQkFBMUIsRUFBa0QsT0FBbEQsQ0FBMkQsVUFBQSxHQUFHLEVBQUk7QUFDakUsUUFBSyxHQUFHLENBQUMsT0FBSixDQUFZLFNBQVosS0FBMEIsTUFBL0IsRUFBd0M7QUFDdkMsTUFBQSxHQUFHLENBQUMsZ0JBQUosQ0FBcUIsT0FBckIsRUFBNkIsV0FBN0I7QUFDQSxLQUZELE1BRU87QUFDTixNQUFBLEdBQUcsQ0FBQyxnQkFBSixDQUFxQixPQUFyQixFQUE2QixXQUE3QjtBQUNBO0FBQ0QsR0FORDtBQU9BLENBM0JELEUsQ0E2QkE7O0FBQ0EsU0FBUyxXQUFULEdBQXVCO0FBRXRCO0FBQ0EsTUFBSSxJQUFJLEdBQVMsUUFBUSxDQUFDLGFBQVQs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ckMsQ0FBK0MsR0FBL0MsQ0FBbUQsT0FBbkQ7QUFFQSxNQUFBLFVBQVUsQ0FBRSxZQUFNO0FBQ2pCLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsU0FBckMsQ0FBK0MsTUFBL0MsQ0FBc0QsUUFBdEQsRUFBK0QsT0FBL0Q7QUFDQSxPQUZTLEVBRVIsR0FGUSxDQUFWO0FBR0EsS0FORCxNQU1PO0FBQ04sTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxTQUFyQyxDQUErQyxHQUEvQyxDQUFtRCxRQUFuRDtBQUNBO0FBRUQsR0FoQlMsRUFnQlIsR0FoQlEsQ0FBVjtBQWlCQSxDLENBRUQ7OztBQUNBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNuRCxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLDZCQUF2QixFQUFzRCxLQUF0RDtBQUNBLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBSZWdpc3RlciBsb2FkIGV2ZW50XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuXHJcblx0Ly8gRmluZCBldmVyeSBjb2xsYXBzZSBlbGVtZW50XHJcblx0bGV0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2UnKTtcclxuXHJcblx0Y29udGFpbmVycy5mb3JFYWNoKCAoY29udGFpbmVyLCBpbmRleCkgPT4ge1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIGNsaWNrIGxpc3RlbmVyXHJcblx0XHRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGNvbGxhcHNlKTtcclxuXHJcblx0XHQvLyBTdG9yZSBpbmRleCBmb3IgbmF2XHJcblx0XHRjb250YWluZXIuZGF0YXNldC5pbmRleCA9IGluZGV4O1xyXG5cclxuXHRcdC8vIE9wZW4gZmlyc3QgZWxlbWVudFxyXG5cdFx0aWYgKGluZGV4ID09PSAwKSB7XHJcblx0XHRcdGNvbnRhaW5lci5jbGljaygpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBSZWdpc3RlciBwcm9qZWN0cyBuYXYgZXZlbnRzXHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3Byb2plY3RzLW5hdiBidXR0b24nKS5mb3JFYWNoKCBidG4gPT4ge1xyXG5cdFx0aWYgKCBidG4uZGF0YXNldC5kaXJlY3Rpb24gPT09ICdwcmV2JyApIHtcclxuXHRcdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxwcmV2UHJvamVjdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLG5leHRQcm9qZWN0KTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBOYXYgdG8gdGhlIG5leHQgcHJvamVjdCBvbiB0aGUgcXVldWVcclxuZnVuY3Rpb24gbmV4dFByb2plY3QoKSB7XHJcblxyXG5cdC8vIEdldCBvcGVuIGNvbGxhcHNlciBhbmQgdGhlIGNvbGxhcHNlcnMgbGlzdFxyXG5cdGxldCBvcGVuICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzLWNvbnRhaW5lciAub3BlbicpO1xyXG5cdGxldCBjb2xsYXBzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNlJyk7XHJcblxyXG5cdC8vIE1ha2Ugc3VyZSB0aGVyZSBpcyBhIG5leHQgcHJvamVjdFxyXG5cdGlmICggcGFyc2VJbnQob3Blbi5kYXRhc2V0LmluZGV4KSA8ICggY29sbGFwc2Vycy5sZW5ndGggLSAxKSApIHtcclxuXHRcdC8vIERvIG5leHRcclxuXHRcdGxldCBuZXh0SW5kZXggICA9IHBhcnNlSW50KG9wZW4uZGF0YXNldC5pbmRleCkgKyAxO1xyXG5cdFx0bGV0IHF1ZXJ5ICAgICAgID0gJyNwcm9qZWN0cy1jb250YWluZXIgW2RhdGEtaW5kZXg9XCInICsgbmV4dEluZGV4ICsgJ1wiXSc7XHJcblx0XHRsZXQgbmV4dFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcclxuXHRcdG5leHRQcm9qZWN0LmNsaWNrKCk7XHJcblx0fVxyXG59XHJcblxyXG4vLyBOYXYgdG8gdGhlIHByZXZpb3VzIHByb2plY3Qgb24gdGhlIHF1ZXVlXHJcbmZ1bmN0aW9uIHByZXZQcm9qZWN0KCkge1xyXG5cclxuXHRsZXQgb3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1jb250YWluZXIgLm9wZW4nKTtcclxuXHJcblx0Ly8gTWFrZSBzdXJlIHRoZXJlIGlzIGEgcHJldiBwcm9qZWN0XHJcblx0aWYgKCBwYXJzZUludChvcGVuLmRhdGFzZXQuaW5kZXgpID4gMCApIHtcclxuXHRcdC8vIERvIHByZXZcclxuXHRcdGxldCBwcmV2SW5kZXggICA9IHBhcnNlSW50KG9wZW4uZGF0YXNldC5pbmRleCkgLSAxO1xyXG5cdFx0bGV0IHF1ZXJ5ICAgICAgID0gJyNwcm9qZWN0cy1jb250YWluZXIgW2RhdGEtaW5kZXg9XCInICsgcHJldkluZGV4ICsgJ1wiXSc7XHJcblx0XHRsZXQgcHJldlByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcclxuXHRcdHByZXZQcm9qZWN0LmNsaWNrKCk7XHJcblx0fVxyXG59XHJcblxyXG4vLyBDb2xsYXBzZS9VbmNvbGxhcHNlIHByb2plY3RcclxuZnVuY3Rpb24gY29sbGFwc2UoKSB7XHJcblxyXG5cdC8vIENsb3NlIGFueSBvcGVuIGNvbGxhcHNlIGVsZW1lbnRcclxuXHRsZXQgb3BlbiAgICAgID0gdGhpcy5wYXJlbnRFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wZW4nKTtcclxuXHRsZXQgb3BlbkluZGV4ID0gMDtcclxuXHJcblx0Ly8gUHJldmVudCBjb2xsYXBzZSBmcm9tIFwiY2xvc2luZ1wiIGl0c2VsZlxyXG5cdGlmIChvcGVuLmxlbmd0aCAmJiBvcGVuWzBdICE9PSB0aGlzKSB7XHJcblx0XHRvcGVuSW5kZXggPSBwYXJzZUludChvcGVuWzBdLmRhdGFzZXQuaW5kZXgpO1xyXG5cdFx0b3BlblswXS5zdHlsZS5tYXhIZWlnaHQgPSAnMTgwcHgnO1xyXG5cdFx0b3BlblswXS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblx0fVxyXG5cclxuXHQvLyBNYWtlIHN1cmUgY29sbGFwc2UgbmVlZHMgdG8gYmUgXCJvcGVuXCJcclxuXHRpZiAoICF0aGlzLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpICkge1xyXG5cclxuXHRcdC8vIEFkZCBvcGVuIGNsYXNzIGFuZCBzZXQgaXQncyBjb250ZW50IGhlaWdodCBhcyBtYXggaGVpZ2h0XHJcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuXHRcdGxldCBpbm5lciA9IHRoaXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2FydGljbGUnKVswXTtcclxuXHRcdHRoaXMuc3R5bGUubWF4SGVpZ2h0ID0gaW5uZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHQvLyBVcGRhdGUgcG9zaXRpb24gY291bnRcclxuXHRcdGxldCBjb2xsYXBzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNlJyk7XHJcblx0XHRsZXQgaW5kZXggICAgICA9IHBhcnNlSW50KCB0aGlzLmRhdGFzZXQuaW5kZXggKSArIDE7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtbmF2IHNwYW4nKS5pbm5lckhUTUwgPSBpbmRleCArICcgLyAnICsgY29sbGFwc2Vycy5sZW5ndGg7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIG9wZW4gY29sbGFwc2VyIGluZGV4XHJcblx0XHRpZiAoIGluZGV4ID09PSAxICkge1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtbmF2JykuZGF0YXNldC5pbmRleCA9ICdmaXJzdCc7XHJcblx0XHR9IGVsc2UgaWYgKCBpbmRleCA9PT0gY29sbGFwc2Vycy5sZW5ndGggKSB7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1uYXYnKS5kYXRhc2V0LmluZGV4ID0gJ2xhc3QnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzLW5hdicpLmRhdGFzZXQuaW5kZXggPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTY3JvbGwgdG8gcHJvamVjdCBwb3NpdGlvblxyXG5cdFx0bGV0IGVsZW1lbnQgICA9IHRoaXM7XHJcblx0XHRsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzLWNvbnRhaW5lcicpO1xyXG5cclxuXHRcdGlmICggb3BlbkluZGV4IDwgcGFyc2VJbnQoIGVsZW1lbnQuZGF0YXNldC5pbmRleCApICkge1xyXG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0c2Nyb2xsKGNvbnRhaW5lcixlbGVtZW50KTtcclxuXHRcdFx0fSw0MDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2Nyb2xsKGNvbnRhaW5lcixlbGVtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzY3JvbGwoY29udGFpbmVyLGVsZW1lbnQpIHtcclxuXHJcblx0XHRcdGNvbnRhaW5lci5zY3JvbGxUbyh7XHJcblx0XHRcdFx0dG9wICAgICAgOiBlbGVtZW50Lm9mZnNldFRvcCAtIDU1LFxyXG5cdFx0XHRcdGJlaGF2aW9yIDogJ3Ntb290aCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufTsiLCIvLyBSZWdpc3RlciBsb2FkIGV2ZW50XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuXHRpbWdMYXp5TG9hZCgpO1xyXG5cdGltZ0JnTGF6eUxvYWQoKTtcclxufSk7XHJcblx0XHJcbmZ1bmN0aW9uIGltZ0xhenlMb2FkKCkge1xyXG5cclxuXHQvLyBHZXQgYWxsIGZpZ3VyZXMgZnJvbSB3ZWJzaXRlXHJcblx0bGV0IGZpZ3VyZXMgPSBbXS5zbGljZS5jYWxsKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZmlndXJlLmxvYWRpbmdcIikgKTtcclxuXHJcblx0ZmlndXJlcy5mb3JFYWNoKCBmaWd1cmUgPT4ge1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGlzIGZpZ3VyZSBoYXMgaW1hZ2VzIHdpdGggbG9hZGluZyBjbGFzc1xyXG5cdFx0aWYgKCBmaWd1cmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkaW5nJykgKSB7XHJcblxyXG5cdFx0XHQvLyBHZXQgZmlndXJlIGltYWdlc1xyXG5cdFx0XHRsZXQgaW1hZ2VzID0gZmlndXJlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKTtcclxuXHJcblx0XHRcdGZvciAobGV0IGltZyBvZiBpbWFnZXMpIHtcclxuXHRcdFx0XHQvLyBTZXQgaW1hZ2Ugc3JjIGFuZCBsaXN0ZW4gdG8gbG9hZCBhbmQgZXJyb3IgZXZlbnRzIFxyXG5cdFx0XHRcdGltZy5zcmMgPSBpbWcuZGF0YXNldC5zcmM7IFxyXG5cdFx0XHRcdGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJyxpbWFnZUxvYWRlZCk7XHJcblx0XHRcdFx0aW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJyxpbWFnZUVycm9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gaW1hZ2VMb2FkZWQoZSkge1xyXG5cdFx0dGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkaW5nXCIsXCJzdmctbG9hZGluZ1wiKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGltYWdlRXJyb3IoZSkge1xyXG5cdFx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cdFx0XHRsYXp5TG9hZCgpO1xyXG5cdFx0fSwgMjAwKTtcclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpbWdCZ0xhenlMb2FkKCkge1xyXG5cclxuXHQvLyBHZXQgYWxsIGNvbnRhaW5lciB3aXRoIGJnIGZyb20gd2Vic2l0ZVxyXG5cdGxldCBjb250YWluZXJzID0gW10uc2xpY2UuY2FsbCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sYXp5LWJnXCIpICk7XHJcblxyXG5cdGNvbnRhaW5lcnMuZm9yRWFjaCggKGNvbnRhaW5lcixpbmRleCkgPT4ge1xyXG5cclxuXHRcdGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHJcblx0XHRpZiAoY29udGFpbmVyLmRhdGFzZXQuYmFja2dyb3VuZCkge1xyXG5cdFx0XHRpbWcuc3JjID0gY29udGFpbmVyLmRhdGFzZXQuYmFja2dyb3VuZDtcclxuXHRcdFx0aW1nLmRhdGFzZXQuaW5kZXggPSBpbmRleDtcclxuXHRcdFx0aW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLGltYWdlTG9hZGVkKTtcclxuXHRcdFx0aW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJyxpbWFnZUVycm9yKTtcclxuXHRcdH1cclxuXHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGltYWdlTG9hZGVkKGUpIHtcclxuXHRcdGNvbnRhaW5lcnNbdGhpcy5kYXRhc2V0LmluZGV4XS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyB0aGlzLnNyYyArICcpJztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGltYWdlRXJyb3IoZSkge1xyXG5cdFx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cdFx0XHRiZ0xhenlMb2FkKCk7XHJcblx0XHR9LCAzMDApO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHsgaW1nTGF6eUxvYWQsIGltZ0JnTGF6eUxvYWQgfTsiLCJpbXBvcnQgJy4vbWVudS5qcyc7XHJcbmltcG9ydCB7IGltZ0xhenlMb2FkLCBpbWdiZ0xhenlMb2FkIH0gZnJvbSAnLi9pbWctbGF6eS1sb2FkLmpzJztcclxuaW1wb3J0ICcuL2NvbGxhcHNlLmpzJzsiLCJsZXQgYnRucyA9IFtcclxuXHQuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjaG9tZS1tZW51IGJ1dHRvbicpLFxyXG5cdC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtYWluLW1lbnUgYnV0dG9uJylcclxuXTtcclxuXHJcbmJ0bnMuZm9yRWFjaCggYnRuID0+IHtcclxuXHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHN3aXRjaFRhYik7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc3dpdGNoVGFiKCkge1xyXG5cclxuXHQvLyBVcGRhdGUgYWN0aXZlIGJ1dHRvblxyXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLW1lbnUgLmFjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdGxldCBidG5UYXJnZXQgPSB0aGlzLmRhdGFzZXQudGFyZ2V0O1xyXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLW1lbnUgW2RhdGEtdGFyZ2V0PVwiJyArIGJ0blRhcmdldCArICdcIl0nKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcblx0dGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcblx0Ly8gR2V0IGN1cnJlbnQgYW5kIHRhcmdldCBzZWN0aW9ucywgZGVjbGFyZSBlbnRlciBhbmQgbGVhdmUgYW5pbWF0aW9uc1xyXG5cdGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VjdGlvbi5hY3RpdmUnKTtcclxuXHRsZXQgdGFyZ2V0ICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHRoaXMuZGF0YXNldC50YXJnZXQgKTtcclxuXHRsZXQgZW50ZXIsbGVhdmU7XHJcblxyXG5cdC8vIENvbXBhcmUgaW5kZXggdG8gc2V0IGVudGVyIGFuZCBsZWF2ZSBhbmltYXRpb24gY2xhc3Nlc1xyXG5cdGlmICggcGFyc2VJbnQoIHNlY3Rpb24uZGF0YXNldC5pbmRleCApID4gcGFyc2VJbnQoIHRhcmdldC5kYXRhc2V0LmluZGV4ICkgKSB7XHJcblx0XHRsZWF2ZSA9ICdsZWF2ZS1yaWdodCc7XHJcblx0XHRlbnRlciA9ICdhY3RpdmUtbGVmdCc7XHJcblx0fSBlbHNlIHtcclxuXHRcdGxlYXZlID0gJ2xlYXZlLWxlZnQnO1xyXG5cdFx0ZW50ZXIgPSAnYWN0aXZlLXJpZ2h0JztcclxuXHR9XHJcblxyXG5cdC8vIFN0YXJ0IGxlYXZlIGFuaW1hdGlvblxyXG5cdHNlY3Rpb24uY2xhc3NMaXN0LmFkZChsZWF2ZSk7XHJcblxyXG5cdC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gbmV3IGFjdGl2ZSBzZWN0aW9uXHJcblx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScsZW50ZXIpO1xyXG5cclxuXHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblxyXG5cdFx0Ly8gUmVtb3ZlIGNsYXNzZXMgZnJvbSBmb3JtZXIgYWN0aXZlIHNlY3Rpb25cclxuXHRcdHNlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJywnYWN0aXZlLWxlZnQnLCdhY3RpdmUtcmlnaHQnLCdsZWF2ZS1sZWZ0JywnbGVhdmUtcmlnaHQnKTtcclxuXHJcblx0XHQvLyBIYW5kbGUgaG9tZSBhbmQgbWFpbiBtZW51IHZpc2liaWxpdHlcclxuXHRcdGlmICh0YXJnZXQuaWQgPT09ICdob21lJykge1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1tZW51JykuY2xhc3NMaXN0LmFkZCgnbGVhdmUnKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1tZW51JykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJywnbGVhdmUnKTtcclxuXHRcdFx0fSwyMDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tbWVudScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cclxuXHR9LDQwMCk7XHJcbn1cclxuXHJcbi8vIFJlZ2lzdGVyIGxvYWQgZXZlbnRcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhcmdldD1cIiNleHBlcmllbmNlXCJdJykuY2xpY2soKTtcclxufSk7Il19
