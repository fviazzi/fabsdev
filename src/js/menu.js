// Import selector
import $ from './_selector';

// Merge home and header menu buttons
let btns = [
	...$('#home-menu button'),
	...$('#main-menu button')
];

// Register click event for each one
btns.forEach( btn => {
	btn.addEventListener('click',switchView);
});

function switchView() {

	// Get previous and next active sections
	let section = $('section.active');
	let target  = $( this.dataset.target );

	if ( section !== target ) {

		// Remove previous active button
		$('#main-menu .active').classList.remove('active');

		// Add new active button on header menu
		let btnTarget = this.dataset.target;
		$('#main-menu [data-target="' + btnTarget + '"]').classList.add('active');

		// Declare enter and leave animations variables
		// (direction on the menu: left-> Right or Right -> Left)
		let enter,leave;

		// Compare section idex to determine direction
		if ( parseInt( section.dataset.index ) > parseInt( target.dataset.index ) ) {
			leave = 'leave-right';
			enter = 'active-left';
		} else {
			leave = 'leave-left';
			enter = 'active-right';
		}

		// Start leave animation for previous active section
		section.classList.add(leave);

		// Add active class to new active section
		setTimeout( () => {
			target.classList.add('active',enter);
		},0);

		// We need a timeout to wait for the animations to finish
		setTimeout( () => {

			// Remove classes from previous active section
			section.classList.remove('active','active-left','active-right','active-shrink','leave-left','leave-right','leave-shrink');

			// Swap menus between home and any other page, handle contact btn visibility as well
			if (target.id === 'home') {
				$('#main-menu').classList.add('leave');
				$('#menu-contact-btn').classList.add('leave');

				setTimeout( () => {
					$('#main-menu').classList.remove('active','leave');
					$('#menu-contact-btn').classList.remove('active','leave');
				},200);
			} else {

				// Show menu & contact btn
				$('#main-menu').classList.add('active');

				setTimeout( () => {
					$('#menu-contact-btn').classList.add('active');
				},600);
			}


			setTimeout( () => {
				// Register "navigation" event for height
				let event = document.createEvent('Event');
				event.initEvent('navigation', true, true);
				document.dispatchEvent(event);
			},0);

		},400);
	}
}
