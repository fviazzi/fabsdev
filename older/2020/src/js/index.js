import './custom-events.js';
import $ from './_selector';
import './about.js';
import './contact-btn.js';
import './contact-form.js';
import './demo.js';
import './img-lazy-load.js';
import './menu.js';
import './projects-nav.js';
import './skills.js';

// Clear url from get vars
let path = window.location.pathname
window.history.replaceState({}, document.title,  path);

// Page load event
window.onload = pageLoaded;

function pageLoaded() {

	// Add body class for children styles
	document.body.classList.add('loaded');

	// Fix height and register resize event for it
	fixHeight();
	window.addEventListener('resize',fixHeight);
	window.addEventListener('navigation', fixHeight);

	// Create load event
	let event = document.createEvent('Event');
	event.initEvent('pageReady', true, true);

	// Show Home view
	$('#home').classList.add('active','active-done');

	setTimeout( () => {

		// Dispatch "pageReady" event
		document.dispatchEvent(event);

		// Load view for testing
		//document.querySelector('[data-target="#experience"]').click();
		//document.querySelector('#menu-contact-btn').click();

	}, 0);
}

// Fixes height for mobile browsers
function fixHeight () {

	setTimeout( () => {

		document.querySelector('main').style.height = window.innerHeight + 'px';
	},0);
}