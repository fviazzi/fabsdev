import './menu.js';
import { imgLazyLoad, imgbgLazyLoad } from './img-lazy-load.js';
import './collapse.js';

// Page load event
window.onload = pageLoaded;

function pageLoaded() {
	console.log('hey');
	document.body.classList.add('loaded')
}
