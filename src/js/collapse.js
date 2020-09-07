// Register load event
document.addEventListener("DOMContentLoaded", () => {

	// Find every collapse element
	let containers = document.querySelectorAll('.collapse');

	containers.forEach( (container, index) => {

		// Register click listener
		container.addEventListener('click',collapse);

		// Store index for nav
		container.dataset.index = index;

		// Open first element
		if (index === 0) {
			container.click();
		}
	});

	// Register projects nav events
	document.querySelectorAll('#projects-nav button').forEach( btn => {
		if ( btn.dataset.direction === 'prev' ) {
			btn.addEventListener('click',prevProject);
		} else {
			btn.addEventListener('click',nextProject);
		}
	});
});

// Nav to the next project on the queue
function nextProject() {

	// Get open collapser and the collapsers list
	let open       = document.querySelector('#projects-container .open');
	let collapsers = document.querySelectorAll('.collapse');

	// Make sure there is a next project
	if ( parseInt(open.dataset.index) < ( collapsers.length - 1) ) {
		// Do next
		let nextIndex   = parseInt(open.dataset.index) + 1;
		let query       = '#projects-container [data-index="' + nextIndex + '"]';
		let nextProject = document.querySelector(query);
		nextProject.click();
	}
}

// Nav to the previous project on the queue
function prevProject() {

	let open = document.querySelector('#projects-container .open');

	// Make sure there is a prev project
	if ( parseInt(open.dataset.index) > 0 ) {
		// Do prev
		let prevIndex   = parseInt(open.dataset.index) - 1;
		let query       = '#projects-container [data-index="' + prevIndex + '"]';
		let prevProject = document.querySelector(query);
		prevProject.click();
	}
}

// Collapse/Uncollapse project
function collapse() {

	// Close any open collapse element
	let open      = this.parentElement.getElementsByClassName('open');
	let openIndex = 0;

	// Prevent collapse from "closing" itself
	if (open.length && open[0] !== this) {
		openIndex = parseInt(open[0].dataset.index);
		open[0].style.maxHeight = '180px';
		open[0].classList.remove('open');
	}

	// Make sure collapse needs to be "open"
	if ( !this.classList.contains('open') ) {

		// Add open class and set it's content height as max height
		this.classList.add('open');
		let inner = this.getElementsByTagName('article')[0];
		this.style.maxHeight = inner.offsetHeight + 'px';

		// Update position count
		let collapsers = document.querySelectorAll('.collapse');
		let index      = parseInt( this.dataset.index ) + 1;
		document.querySelector('#projects-nav span').innerHTML = index + ' / ' + collapsers.length;

		// Update open collapser index
		if ( index === 1 ) {
			document.querySelector('#projects-nav').dataset.index = 'first';
		} else if ( index === collapsers.length ) {
			document.querySelector('#projects-nav').dataset.index = 'last';
		} else {
			document.querySelector('#projects-nav').dataset.index = false;
		}

		// Scroll to project position
		let element   = this;
		let container = document.querySelector('#projects-container');

		if ( openIndex < parseInt( element.dataset.index ) ) {
			setTimeout( () => {
				scroll(container,element);
			},400);
		} else {
			scroll(container,element);
		}

		function scroll(container,element) {

			container.scrollTo({
				top      : element.offsetTop - 55,
				behavior : 'smooth',
			});
		}
	}
};