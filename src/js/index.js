import { $ } from './_selector';
import './about.js';
import './collapse.js';
import './contact-btn.js';
import './contact-form.js';
import './demo.js';
import { imgLazyLoad, imgbgLazyLoad } from './img-lazy-load.js';
import { navigateView, switchView } from './menu.js';
import './skills.js';

// Page load event
window.onload = pageLoaded;

function pageLoaded() {

	// Add body class for children styles
	document.body.classList.add('loaded');

	setTimeout( () => {

		// Create load event
		let event = new Event('pageReady');
		document.dispatchEvent(event);

		// Activate body

		setTimeout( () => {
			// Show Home view
			$('#home').classList.add('active');
		}, 300);

	}, 0);

	// Load view for testing
	//document.querySelector('[data-target="#experience"]').click();
	//document.querySelector('#menu-contact-btn').click();
}