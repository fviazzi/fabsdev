import './custom-events.js';
import $ from './_selector';
import './about.js';
import './collapse.js';
import './contact-btn.js';
import './contact-form.js';
import './demo.js';
import './img-lazy-load.js';
import './menu.js';
import './skills.js';

// Page load event
window.onload = pageLoaded;

function pageLoaded() {

	// Add body class for children styles
	document.body.classList.add('loaded');

	// Create load event
	let event = document.createEvent('Event');
	event.initEvent('pageReady', true, true);

	// Show Home view
	$('#home').classList.add('active');

	setTimeout( () => {

		// Dispatch "pageReady" event
		document.dispatchEvent(event);

		setTimeout( () => {
			// Show Home view
			$('#home').classList.add('active');
		}, 300);

	}, 0);

	// Load view for testing
	//document.querySelector('[data-target="#experience"]').click();
	//document.querySelector('#menu-contact-btn').click();
}