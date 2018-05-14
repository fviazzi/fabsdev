$(document).ready(function() {

  $('input, textarea').focus(function(e){
    $(this).parent().addClass('focused');
    $(this).parent().addClass('dirty');
    $(this).removeClass('untouched');
  });

  $('input, textarea').blur(function(e){
    $(this).parent().removeClass('focused');

    if ( !$(this).val() ) {
      $(this).addClass('error');
      $('#submit-form').attr('disabled','true');
    } else {
      $(this).removeClass('error');
      if ( !$('.error').length && !$('.untouched').length ) {
        $('#submit-form').removeAttr('disabled');
      }
    }
  });

  $("#contact-form-message").on('change keyup paste', handleChange);

  $('input, textarea').change(handleChange);

  $('#contact-form').submit(handleSubmission);

  function handleChange(e) {

    if ( $(this).val() ) {

      $(this).parent().addClass('not-empty');
      $(this).removeClass('error');

      if ( !$('.error').length && !$('.untouched').length ) {
        $('#submit-form').removeAttr('disabled');
      }
    } else {
      $(this).parent().removeClass('not-empty');
      $(this).addClass('error');
      $('#submit-form').attr('disabled','true');
    }
  };

  function handleSubmission(e) {

    e.preventDefault();

    setInterval(ajax_call, 5000);

    function ajax_call() {

      var data  = {
                    name    : $('#contact-form-name').val(),
                    email   : $('#contact-form-email').val(),
                    message : $('#contact-form-message').val()
                  };

      $.ajax({
            type     : "POST",
            url      : "index.php?route=form_submission",
            timeout  : 5000,
            data     : data,
            dataType : "json",
            success  : handleSuccess,
            error    : handleError,
        });

      function handleSuccess(response) {
        console.log("Response: " + response);
      }

      function handleError(request, status, err) {

          if (status == "timeout") {
           clearInterval(ajax_call);
          } else {
            console.log("error: " + request + status + err);
          }
      }
    }
  }

});
