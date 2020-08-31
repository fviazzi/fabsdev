$(document).ready(function() {

  // Policy Cookies
  // Click event for hiding notice & setting cookie
  $('#close-cookies-policy , #policy-agree-button').click(function(){
    $('#close-cookies-policy').find('svg').popover('hide');
    $('#cookies-policy-container').addClass('closed');
    setCookie( 'cookiesAgree', 'agreed', 365 );
  });

  // Check if cookie is set before showing the cookies notice
  var cookie = getCookie('cookiesAgree');

  if ( !cookie ) {
    $('#cookies-policy-container').removeClass('closed');
  }

  // Language Cookies
  var language = getCookie('language') ? getCookie('language') : $('html').attr('data-language');

  if ( language ) {

    if (language == 'en')
      $('#language-english').addClass('active');
    else if (language == 'es')
      $('#language-spanish').addClass('active');
  }

  $('#language-english').click(function(e){
    setCookie( 'language', 'en', 365 );
    location.reload();
  });

  $('#language-spanish').click(function(e){
    setCookie( 'language', 'es', 365 );
    location.reload();
  });


  function setCookie(name, value, days) {

    var expires;

    if (days) {
      var date = new Date();
      date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }

    document.cookie = name+"="+value+expires+"; path=/";
  }

  function getCookie(name) {

    var value = "; " + document.cookie,
        parts = value.split("; " + name + "=");

    if (parts.length == 2)
      return parts.pop().split(";").shift();
    else
      return null;
  }
});
