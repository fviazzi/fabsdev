let btns = [
	...document.querySelectorAll('#home-menu button'),
	...document.querySelectorAll('#main-menu button')
];

btns.forEach( btn => {
	btn.addEventListener('click',switchTab);
});

function switchTab() {

	// Update active button
	document.querySelector('#main-menu .active').classList.remove('active');
	let btnTarget = this.dataset.target;
	document.querySelector('#main-menu [data-target="' + btnTarget + '"]').classList.add('active');

	this.classList.add('active');

	// Get current and target sections, declare enter and leave animations
	let section = document.querySelector('section.active');
	let target  = document.querySelector( this.dataset.target );
	let enter,leave;

	// Compare index to set enter and leave animation classes
	if ( parseInt( section.dataset.index ) > parseInt( target.dataset.index ) ) {
		leave = 'leave-right';
		enter = 'active-left';
	} else {
		leave = 'leave-left';
		enter = 'active-right';
	}

	// Start leave animation
	section.classList.add(leave);

	// Add active class to new active section
	target.classList.add('active',enter);

	setTimeout( () => {

		// Remove classes from former active section
		section.classList.remove('active','active-left','active-right','leave-left','leave-right');

		// Handle home and main menu visibility
		if (target.id === 'home') {
			document.querySelector('#main-menu').classList.add('leave');

			setTimeout( () => {
				document.querySelector('#main-menu').classList.remove('active','leave');
			},200);
		} else {
			document.querySelector('#main-menu').classList.add('active');
		}

	},400);
}

// Register load event
document.addEventListener("DOMContentLoaded", () => {
	document.querySelector('[data-target="#skills"]').click();
});