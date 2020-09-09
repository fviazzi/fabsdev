// Register load event
document.addEventListener("DOMContentLoaded", () => {

	let skills = document.querySelectorAll('.skills-group .skill');

	skills.forEach( skill => {
		skill.addEventListener('click',showSkill);
	});

	document.querySelector('#skills-modal').addEventListener('click',hideSkill);

	function showSkill() {

		// Only Mobile
		if ( window.innerWidth < 930 ) {

			let desc      = this.querySelector('.description');
			let classList = this.classList.toString().replace(',',' ');

			let modal   = document.querySelector('#skills-modal');

			modal.querySelector('div').innerHTML = desc.innerHTML;
			modal.querySelector('div').className = classList;

			setTimeout( () => {
				document.body.classList.add('skill-open');
				modal.classList.add('active');
			});
		}
	}

	function hideSkill() {
		this.classList.remove('active');
		document.body.classList.remove('skill-open');
	}
});