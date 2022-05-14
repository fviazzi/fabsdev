import $ from './_selector';

// Register load event
document.addEventListener("pageReady", () => {
	try {

		// Find every project element
		let containers = $('.project');

		containers.forEach( (container, index) => {

			// Store index for nav
			container.dataset.index = index;

			// Open first element
			if (index === 0) {
				setTimeout( () => {
					nextProject();
				},800);
			}
		});

		// Register projects nav events
		$('#projects-nav button').forEach( btn => {
			if ( btn.dataset.direction === 'prev' ) {
				btn.addEventListener('click',prevProject);
			} else {
				btn.addEventListener('click',nextProject);
			}
		});

	} catch(error) {
		console.log(error);
	}
});

// Nav to the next project on the queue
function nextProject() {

	// Get open project and the projects list
	let open     = $('#projects-container .enter');
	let projects = $('.project');

	// Get index from open element, default to -1 otherwise
	let openIndex = open ? open.dataset.index : -1;

	// Get next project index
	let nextIndex = parseInt(openIndex) + 1;

	// Make sure there is a next project
	if ( parseInt(openIndex) < ( projects.length - 1) ) {
		navigate(openIndex,nextIndex);
	}
}

// Nav to the previous project on the queue
function prevProject() {

	// Get open project and the projects list
	let open       = $('#projects-container .enter');
	let projects = $('.projects');

	// Get index from open element, default to the last one otherwise
	let openIndex = open ? open.dataset.index : projects.length;

	// Get next project index
	let nextIndex = parseInt(openIndex) - 1;

	// Make sure there is a prev project
	if ( parseInt(openIndex) > 0 ) {
		navigate(openIndex,nextIndex);
	}
}

// Makes the swap between projects
function navigate(openIndex,nextIndex) {

	// Update nav position
	let projects = $('.project');
	$('#projects-nav span').innerHTML = (nextIndex + 1) + ' / ' + projects.length;

	// Update open collapser index
	if ( nextIndex === 0 ) {
		$('#projects-nav').dataset.index = 'first';
	} else if ( ( nextIndex + 1 ) === projects.length ) {
		$('#projects-nav').dataset.index = 'last';
	} else {
		$('#projects-nav').dataset.index = false;
	}

	// Get prev project
	let prevProject = $('#projects-container [data-index="' + openIndex + '"]');

	// Leave prev
	if (prevProject && prevProject.classList) {

		prevProject.classList.add('leave');

		// Cleanup classes
		setTimeout( () => {
			prevProject.classList.remove('enter','leave');
		},300);
	}

	// Get next project
	let nextProject = $('#projects-container [data-index="' + nextIndex + '"]');

	// Enter next
	if (nextProject && nextProject.classList) {
		setTimeout( () => {
			nextProject.classList.add('enter');
		},400);
	}

}