<?php

  /*
    Message codes:
    1 - False Form Validation
    2 - Error sending Email
    3 - Success
  */

	// Get request data...
	$data   = $_POST['data'];

  if ( validate_data($data) ) {

    // Email Template
    ob_start();
      include "templates/form_email.php";
      $message = ob_get_contents();
    ob_end_clean();

  	// Send Email
  	$to       =	'reach@fabsdev.com';
  	$subject  =	'Form Contact';

  	$headers  = "From: Reach <reach@fabsdev.com.ar>" . "\r\n";
  	$headers .= "Reply-To: " . $data['email'] . "\r\n";
  	$headers .= "MIME-Version: 1.0\r\n";
  	$headers .= "Content-Type: text/html; charset=utf-8\r\n";

  	// Generate Response
  	$response = array();
    $response['data'] = $data;

  	if (mail($to, $subject, $message, $headers)) {
  		$response['success'] = true;
  		$response['message'] = 3;
  	} else {
  		$response['success'] = false;
  		$response['message'] = 2;
  	}

  } else {
    $response['success'] = false;
    $response['code']    = 1;
  }

  function validate_data($data) {

    foreach ($data as $value ) {
      if ( !validate_field($value) ) {
        return false;
      }
    }

    return true;
  }

  function validate_field( $value ) {

    $value = rtrim( $value );

    if ( empty($value) ) {
      return false;
    } else {
      return true;
    }

  }

	header('Content-Type: application/json');
	echo json_encode($response);
?>
