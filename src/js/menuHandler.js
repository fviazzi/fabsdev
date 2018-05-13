$(document).ready(function() {

  $('#mobile-button').click(function(){

    if ($('#profile-header').hasClass('open')) {
      $('#profile-header').removeClass('open')
    }

    if ($('#sidebar').hasClass('open')) {
      $('body').removeClass('menu-open');
      $('#sidebar').removeClass('open');
      $('.mobile-menu').removeClass('show');
    } else {
      $('body').addClass('menu-open');
      $('#sidebar').addClass('open');
      $('.mobile-menu').addClass('show');
    }

  });

});
