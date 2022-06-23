<?php

  // Get data
  $_POST = json_decode(file_get_contents('php://input'), true);

  // Declare response
  $response = array(
    'success' => false
  );

  // Leave if data doesn't exists
  if (!isset($_POST['email']) || !isset($_POST['message']) ) {
    header('Content-Type: application/json');
    echo json_encode($response);
  }

  // Get request data...
  $data   = array(
    'email'   => strip_tags( $_POST['email'] ),
    'message' => strip_tags( $_POST['message'] )
  );

  if ( validate_data($data) ) {

    // Email Template
    ob_start();
      include "templates/form_email.php";
      $message = ob_get_contents();
    ob_end_clean();

    // Send Email
    $to       =	'fabricioviazzi@gmail.com';
    $subject  =	'Form Contact';

    $headers  = "From: Reach <reach@fabsdev.com.ar>" . "\r\n";
    $headers .= "Reply-To: " . $data['email'] . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    // Generate Response
    $response['data'] = $data;

    if (mail($to, $subject, $message, $headers)) {
      $response['success'] = true;
    }
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
