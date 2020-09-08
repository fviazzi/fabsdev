// Register load event
document.addEventListener("DOMContentLoaded", () => {

	// Set age
	let age = new Date (new Date() - new Date('12/21/1989') ).getFullYear() - 1970;
	document.querySelector('#age span').innerHTML  = age;
});