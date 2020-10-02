// Register load event
document.addEventListener("pageReady", () => {
	imgBgLazyLoad();
});

function imgBgLazyLoad() {

	// Get all container with bg from website
	let containers = [].slice.call( document.querySelectorAll(".lazy-bg") );

	containers.forEach( (container,index) => {

		let img = document.createElement('img');

		// Make sure there is a background to load
		if (container.dataset.background) {


			// Check if body needs mobile image
			if (container === document.body) {

				if (window.innerWidth > 500) {
					img.src = container.dataset.background;
				} else {
					img.src = container.dataset.mobile;
				}
			}

			// Assign a image index
			img.dataset.index = index;
			img.addEventListener('load',imageLoaded);
			img.addEventListener('error',imageError);
		}

	});

	function imageLoaded(e) {
		containers[this.dataset.index].style.backgroundImage = 'url(' + this.src + ')';

		setTimeout( () => {

			// If body img is loaded, load the rest of the images
			if (this.dataset.index === "0") {
				imgLazyLoad();

				// Load videos
				setTimeout( () => {
					videoLazyLoad();
				},5000);
			}
		},0);
	}

	function imageError(e) {
		setTimeout( () => {
			imgBgLazyLoad();
		}, 300);
	}
}

function imgLazyLoad() {

	// Get all figures from website
	let figures = [].slice.call( document.querySelectorAll("figure.loading") );

	figures.forEach( figure => {

		// Get figure images
		let images = figure.getElementsByTagName('img');

		images.forEach( img => {
			// Set image src and listen to load and error events
			img.src = img.dataset.src;
			img.addEventListener('load',imageLoaded);
			img.addEventListener('error',imageError);
		});

	});

	function imageLoaded(e) {
		setTimeout(() => {
			this.parentNode.classList.remove("loading");
		}, 100);
	}

	function imageError(e) {

		// Make to retry just once
		if ( !this.datset.error ) {

			// Set error flag
			this.datset.error = true;

			// Retry after .2s
			setTimeout( () => {
				imgLazyLoad();
			}, 200);
		}
	}
}

function videoLazyLoad() {

	// Get all videos from website
	let videos = [].slice.call( document.querySelectorAll("video") );

	videos.forEach( video => {

		// Set video src and listen to load and error events
		video.src = video.dataset.src;
		video.addEventListener('error',videoError);

	});

	function videoError(e) {

		// Make to retry just once
		if ( !this.datset.error ) {

			// Set error flag
			this.datset.error = true;

			// Retry after .2s
			setTimeout( () => {
				videoLazyLoad();
			}, 200);
		}
	}
}