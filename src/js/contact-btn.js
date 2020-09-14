// Register load event
document.addEventListener("DOMContentLoaded", () => {

	// Home contact Btn
	document.querySelector('#contact-btn').addEventListener('click',enterContact);

	// Menu contact Btn
	document.querySelector('#menu-contact-btn').addEventListener('click',enterContact);

	// Close contact Btn
	document.querySelector('#contact-leave').addEventListener('click',leaveContact);
});

let previousView;

function enterContact() {

	// Grab contact section container
	let container = document.querySelector('#contact');

	// Store previous view
	previousView = document.querySelector('section.active');

	// Leave previous view
	previousView.classList.add('leave-shrink');

	// Scroll to top (mobile)
	container.querySelector('article').scrollTo(0,-10000);

	setTimeout(() => {
		previousView.classList.remove('active','active-left','active-right','active-shrink','leave-left','leave-right','leave-shrink');

		// Enter contact view
		container.classList.add('active','active-shrink');

		// Check if menu and contact btn have to be activated
		if ( previousView.id !== "home" ) {
			// Leave menu & contact btn
			document.querySelector('#main-menu').classList.add('leave');
			document.querySelector('#menu-contact-btn').classList.remove('active');
			document.querySelector('#menu-contact-btn').classList.add('leave');
		}
	}, 300);
}

function leaveContact() {

	// Grab contact section container
	let container = document.querySelector('#contact');

	// Leave contact view
	container.classList.add('leave-shrink')

	setTimeout(() => {
		container.classList.remove('active','active-shrink','leave-shrink');

		// Restore previous view
		if (previousView) {
			previousView.classList.add('active','active-shrink');
		}

		// Check if menu and contact btn have to be activated
		if ( previousView.id !== "home" ) {
			// Enter menu & contact btn
			document.querySelector('#main-menu').classList.remove('leave');
			document.querySelector('#main-menu').classList.add('active');
			document.querySelector('#menu-contact-btn').classList.remove('leave');
			document.querySelector('#menu-contact-btn').classList.add('active');
		}
	}, 300);
}