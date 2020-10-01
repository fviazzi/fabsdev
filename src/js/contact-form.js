// Register load event
document.addEventListener("DOMContentLoaded", () => {

	// Register focus and blur events
	let inputs = document.querySelectorAll('input,textarea');

	inputs.forEach( input => {
		input.addEventListener('focus',handleFocus);
		input.addEventListener('blur',handleBlur);
	});

	// Register form submission
	document.querySelector('#contact-form').addEventListener('submit',handleSubmit);
});

// Focus handler
function handleFocus() {
	this.parentNode.classList.add('focus');
}

// Blur handler
function handleBlur() {

	let valid  = validateInput(this);

	if ( valid ) {
		this.classList.remove('error');
	} else {

		this.classList.add('error');

		if ( this.value.replace(' ','') === '' ) {
			this.parentNode.classList.remove('focus');
		}
	}
}

function handleSubmit(e) {

	e.preventDefault();

	// Validate form
	if ( validateForm() && !this.dataset.loading ) {

		const form = this;

		form.dataset.loading = true;

		// Set loading
		let containers = document.querySelectorAll('.input-container');

		containers.forEach( container => {
			container.classList.add('disabled');
		});

		form.querySelector('button').classList.add('loading');
		form.querySelector('.error-message').classList.remove('show');

		// Send data
		const data = new URLSearchParams( new FormData( form ) );
		const url  = './system/form_submission.php';

		fetch( url, {
			method : 'POST',
			body   : data,
		})
		.then( response => {
			form.querySelector('button').classList.remove('loading','done');
			return response.json();
		})
		.then(handleSuccess)
		.catch(handleError);

		function handleSuccess(response) {

			if ( response.success ) {
				form.querySelector('button').classList.add('done');
			} else {
				throw Error();
			}
		}

		function handleError() {

			// Show error
			form.querySelector('.error-message').classList.add('show');

			// Restore form
			form.querySelector('button').classList.remove('loading');
			delete  form.dataset.loading;

			containers.forEach( container => {
				container.classList.remove('disabled');
			});
		}

	} else {
		let invalid = document.querySelectorAll('.error');
		if (invalid.length) invalid[0].focus();
	}
}

function validateForm() {

	// Grab input elements
	let inputs    = document.querySelectorAll('input,textarea');
	let validForm = true;

	inputs.forEach( input => {

		let validInput  = validateInput(input);

		if ( validInput ) {
			input.classList.remove('error');
		} else {
			input.classList.add('error');
			validForm = false;
		}
	});

	return validForm;
}

function validateInput(input) {

	let val   = input.value;
	let valid = true;

	if ( input.type === 'email' ) {
		valid = val.replace(' ','').length > 2 && ( val.indexOf('@') > 0 ) && val.indexOf('.') > 1;
	} else {
		valid = val.replace(' ','').length > 2;
	}

	return valid;
}