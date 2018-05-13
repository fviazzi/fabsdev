$(document).ready(function() {

  $('#loader').fadeOut();

  setTimeout(function(){
    $('#welcome').animate({
      'opacity': 1
    },500,'linear');
  },500);

  $(window).click(function(e){

    $('#welcome').fadeOut(300,function(){
      $('body').addClass('blur');
    });

  });

  $(function () {
    $('[data-toggle="popover"]').popover()
  });

  $('#profile-image').click(function(e){

    if ($('#profile-header').hasClass('open')) {

      $('#profile-header').removeClass('open')

    } else {

      $('#profile-header').addClass('open')

    }
  });

});
