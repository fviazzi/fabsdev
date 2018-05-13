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

  $("#textarea").on('change keyup paste', handleChange);

  $('input, textarea').change(handleChange);

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

});
