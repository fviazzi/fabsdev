import './about.js';
import './collapse.js';
import './contact-btn.js';
import './contact-form.js';
import { imgLazyLoad, imgbgLazyLoad } from './img-lazy-load.js';
import './menu.js';
import './skills.js';

// Page load event
window.onload = pageLoaded;

function pageLoaded() {
	document.body.classList.add('loaded')

	// Load view for testing
	//document.querySelector('[data-target="#experience"]').click();
	//document.querySelector('#menu-contact-btn').click();
}