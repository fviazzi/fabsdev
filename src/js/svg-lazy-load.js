// Register load event
document.addEventListener("DOMContentLoaded", () => {
	svgLazyLoad();
});
	
function svgLazyLoad() {

	// Get all figures from website
	let figures = [].slice.call( document.querySelectorAll("figure.svg-loading") );

	figures.forEach( figure => {

		// Make sure this figure has images with loading class
		if ( figure.classList.contains('loading') ) {

			// Get figure images
			let images = figure.getElementsByTagName('object');

			for (let img of images) {
				// Set image src and listen to load and error events 
				img.src = img.dataset.src; 
				img.addEventListener('load',imageLoaded);
				img.addEventListener('error',imageError);
			}
		}

	});

	function imageLoaded(e) {
		this.parentNode.classList.remove("loading");
	}

	function imageError(e) {
		setTimeout( () => {
			svgLazyLoad();
		}, 200);
	}
};

export { svgLazyLoad };