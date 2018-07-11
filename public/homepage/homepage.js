$(function(){
    zoom = $('.feature').css('background-size')
    zoom = parseFloat(zoom)/100
    size = zoom * $('.feature').width();
    $(window).on('scroll', function(){
      fromTop = $(window).scrollTop();
      newSize = size - (fromTop/3);
      if (newSize > $('.feature').width()) {
          $('.feature').css({
              '-webkit-background-size': newSize,
              '-moz-background-size': newSize,
              '-o-background-size': newSize,
              'background-size': newSize,
              '-webkit-filter':' grayscale(100%) blur('+ 0 + (fromTop/100) + 'px)',
              'opacity': 1 - (((fromTop + 230) / $('html').height()) * 1.9)
          });
      }
    });
});

$(function () {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if (isChrome || isSafari) {
    } else {
        $('.feature').append('<div class="opaque"></div>');
        $(window).on('scroll', function(){
            var opacity = 0 + ($(window).scrollTop()/5000);
            $('.opaque').css('opacity', opacity);
        });
    }
});

$(function () {
    $('#groupName').on('keypress', (event)=> {
        let group = event.target.value || '';

        if(event.which === 13) {
            window.location ='/' + group.replace(/ /g, '') + '/';
        }
    });
});