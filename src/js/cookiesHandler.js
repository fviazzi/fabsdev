$(document).ready(function() {

  // Click event for hiding notice & setting cookie
  $('#close-cookies-policy , #policy-agree-button').click(function(){
    $('#close-cookies-policy').find('svg').popover('hide');
    $('#cookies-policy-container').addClass('closed');
    document.cookie = 'cookiesAgree=agreed; expires=Fri, 31 Dec 2024 23:59:59 GMT';
  });

  // Check if cookie is set before showing the cookies notice
  var cookie = getCookie('cookiesAgree');
  if ( !cookie ) {
    $('#cookies-policy-container').removeClass('closed');
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
