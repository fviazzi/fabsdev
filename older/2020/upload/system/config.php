<?php

	// Set Language (deprecated for now)
	$lead = isset($_GET['r']) ? strip_tags( $_GET['r'] ) : null;

	// Make sure there is a lead
	if ( $lead && !empty($lead) ) {

		// Email Template
		ob_start();
			include "templates/lead_email.php";
			$message = ob_get_contents();
		ob_end_clean();

		// Send Email
		$to       =	'fabricioviazzi@gmail.com';
		$subject  =	'New Lead';

		$headers  = "From: Reach <leads@fabsdev.com>" . "\r\n";
		$headers .= "Reply-To: leads@fabsdev.com\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";

		if ( mail($to, $subject, $message, $headers) ) {
			// All good, do nothing
		} else {
			error_log("LEAD EMAIL MISSING, ID WAS: ",$lead);
		}
	}

	// Set Language (deprecated for now)
	$lang = isset($_COOKIE["language"]) ? $_COOKIE["language"] : substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

	switch ($lang) {

			case "es":
					require_once 'lang/ES_es.php';
					break;

			default:
					require_once 'lang/EN_us.php';
					break;
	}
?>
