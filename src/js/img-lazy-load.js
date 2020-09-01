// Register load event
document.addEventListener("DOMContentLoaded", () => {
	imgLazyLoad();
	imgBgLazyLoad();
});
	
function imgLazyLoad() {

	// Get all figures from website
	let figures = [].slice.call( document.querySelectorAll("figure.loading") );

	figures.forEach( figure => {

		// Make sure this figure has images with loading class
		if ( figure.classList.contains('loading') ) {

			// Get figure images
			let images = figure.getElementsByTagName('img');

			for (let img of images) {
				// Set image src and listen to load and error events 
				img.src = img.dataset.src; 
				img.addEventListener('load',imageLoaded);
				img.addEventListener('error',imageError);
			}
		}

	});

	function imageLoaded(e) {
		this.parentNode.classList.remove("loading","svg-loading");
	}

	function imageError(e) {
		setTimeout( () => {
			lazyLoad();
		}, 200);
	}
};

function imgBgLazyLoad() {

	// Get all container with bg from website
	let containers = [].slice.call( document.querySelectorAll(".lazy-bg") );

	containers.forEach( (container,index) => {

		let img = document.createElement('img');

		if (container.dataset.background) {
			img.src = container.dataset.background;
			img.dataset.index = index;
			img.addEventListener('load',imageLoaded);
			img.addEventListener('error',imageError);
		}

	});

	function imageLoaded(e) {
		containers[this.dataset.index].style.backgroundImage = 'url(' + this.src + ')';
	}

	function imageError(e) {
		setTimeout( () => {
			bgLazyLoad();
		}, 300);
	}
}

export { imgLazyLoad, imgBgLazyLoad };