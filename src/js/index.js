import './about.js';
import './collapse.js';
import './contact-btn.js';
import './contact-form.js';
import { imgLazyLoad, imgbgLazyLoad } from './img-lazy-load.js';
import './menu.js';

// Page load event
window.onload = pageLoaded;

function pageLoaded() {
	document.body.classList.add('loaded')
}

// Register load event
document.addEventListener("DOMContentLoaded", () => {
	//document.querySelector('[data-target="#about-me"]').click();
	//document.querySelector('#menu-contact-btn').click();
});