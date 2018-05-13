$(document).ready(function() {

  $(window).on('resize',function(e){
    handleResize();
  });

  handleResize();

  function handleResize() {

    if (window.innerWidth < 992) {
      var headerHeight  = $('#profile-header').innerHeight(),
          sidebarHeight = window.innerHeight - headerHeight;

      $('#main-container').css('paddingTop',headerHeight);
      $('#sidebar').css({
        'paddingTop': headerHeight
      });

    } else {
      $('#main-container').css('paddingTop','100px');
      $('#sidebar').css({
        'paddingTop': '20px'
      });
    }
  }

});
