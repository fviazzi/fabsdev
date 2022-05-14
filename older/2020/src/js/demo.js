// Register load event
document.addEventListener("DOMContentLoaded", () => {

	// Open & close demo btns
	let buttons = [
		...document.querySelectorAll('.demo-btn'),
		...document.querySelectorAll('.leave-demo')
	];

	buttons.forEach( button => {
		button.addEventListener('click',displayDemo);
	});
});

// Shows/Hides selected demo
function displayDemo() {

	// Get target
	let target = this.dataset.target;

	// Add  open class to demo container
	document.querySelector( '#' + target ).classList.toggle('open');

	// Add demo open class to experience container
	document.querySelector( '#experience' ).classList.toggle('demo-open');

}