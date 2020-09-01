// Register load event
document.addEventListener("DOMContentLoaded", () => {
	svgLazyLoad();
});
	
function svgLazyLoad() {

	// Get all figures from website
	let figures = [].slice.call( document.querySelectorAll("figure.svg-loading") );

	figures.forEach( figure => {

		// Make sure this figure has images with loading class
		if ( figure.classList.contains('svg-loading') ) {

			// Get figure images
			let containers = figure.getElementsByTagName('object');

			for (let container of containers) {
				// Set image src and listen to load and error events
				container.data = container.dataset.src;
				container.addEventListener('load',imageLoaded);
				container.addEventListener('error',imageError);
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