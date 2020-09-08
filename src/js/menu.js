// Merge home and header menu buttons
let btns = [
	...document.querySelectorAll('#home-menu button'),
	...document.querySelectorAll('#main-menu button')
];

// Register click event for each one
btns.forEach( btn => {
	btn.addEventListener('click',switchTab);
});

function switchTab() {

	// Remove previous active button
	document.querySelector('#main-menu .active').classList.remove('active');

	// Add new active button on header menu
	let btnTarget = this.dataset.target;
	document.querySelector('#main-menu [data-target="' + btnTarget + '"]').classList.add('active');

	// Get current and target sections, 
	let section = document.querySelector('section.active');
	let target  = document.querySelector( this.dataset.target );

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
	target.classList.add('active',enter);

	// We need a timeout to wait for the animations to finish
	setTimeout( () => {

		// Remove classes from previous active section
		section.classList.remove('active','active-left','active-right','active-shrink','leave-left','leave-right','leave-shrink');

		// Swap menus between home and any other page, handle contact btn visibility as well
		if (target.id === 'home') {
			document.querySelector('#main-menu').classList.add('leave');
			document.querySelector('#menu-contact-btn').classList.add('leave');

			setTimeout( () => {
				document.querySelector('#main-menu').classList.remove('active','leave');
				document.querySelector('#menu-contact-btn').classList.remove('active','leave');
			},200);
		} else {
			document.querySelector('#main-menu').classList.add('active');
			document.querySelector('#menu-contact-btn').classList.add('active');
		}

	},400);
}