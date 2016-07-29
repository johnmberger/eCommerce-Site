$(window).resize(function() {
  resizeHelper();
});

$('img.carousel-image').load(function() {
  resizeHelper();
});

$(document).on('ready', function() {

  var $slider = $('.carousel');
  var $slide = 'img.carousel-image';

  // Breaks carousel auto-scroll on button click
  var breaker = false;

  function slides() {
    return $slider.find($slide);
  }

  function slideThrough() {
    var i = $slider.find($slide + '.active').index();

    slides().eq(i).removeClass('active');
    slides().eq(i).fadeOut(2000);

    if (slides().length == i + 1) {
      i = -1;
    }
    slides().eq(i + 1).fadeIn(2000);
    slides().eq(i + 1).addClass('active');
  }

  slides().fadeOut();
  slides().first().addClass('active');
  slides().first().fadeIn(2000);

  resizeHelper();

  // Sets auto-scroll of carousel
  setInterval(function() {
    if (breaker) {
      return false;
    }
    slideThrough();
  }, 8000);

  $('#pointer-left').on('click', function() {
    breaker = true;
    var i = $slider.find($slide + '.active').last().index();

    slides().eq(i).removeClass('active');
    slides().eq(i).fadeOut(2000);

    if (slides().length == i - 1) {
      i = 1;
    }
    slides().eq(i - 1).fadeIn(2000);
    slides().eq(i - 1).addClass('active');
    setInterval(function() {
      breaker = false;
    }, 6000);
  });

  $('#pointer-right').on('click', function() {
    breaker = true;
    slideThrough();
    setInterval(function() {
      breaker = false;
    }, 6000);
  });

  $('#emailInput').on('input', function() {

    var emailAddress = $(this).val();
    var IndexOfatSign = emailAddress.indexOf('@');
    var IndexOfPeriod = emailAddress.indexOf('.');
    var length = emailAddress.length;

    $(this).css({'border-color': 'red', 'box-shadow': '0 0 10px red'});
    $(this).removeClass('validEmail');
    if (length > 3 && emailAddress.includes('@') && emailAddress.includes('.') && IndexOfPeriod - IndexOfatSign > 1 && length - IndexOfPeriod > 2 && IndexOfPeriod !== length && !emailAddress.includes(')') && !emailAddress.includes('(') && emailAddress.charAt(length - 1) !== '.' && emailAddress.charAt(length - 1) !== '@' && emailAddress.charAt(length - 1) !== ' ' && emailAddress.charAt(0) !== '@') {
      $(this).css({'border-color': '#428bca', 'box-shadow': '0 0 10px #428bca'}).addClass('validEmail');
    }
  });

  $('#emailInput').on('blur', function() {
    if ($(this).hasClass('validEmail')) {
      $(this).css({'border-color': '', 'box-shadow': ''});
    }
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    var email = $('#emailInput').val();
    if ($('#emailInput').hasClass('validEmail') && email.length > 0) {
      $('form').trigger('reset');
      $('#emailInput').after('<div id="status" class="alert alert-success"><strong>Success! </strong>Thanks for signing up.</div>');
      $('#status').fadeIn(500, function () {
        $(this).delay(3000).fadeOut(500);
      });
    } else {
      var l = 20;
      for (var i = 0; i < 10; i++)
      $('#emailInput').animate({'margin-left': '+=' + (l = -l) + 'px', 'margin-right': '-=' + l + 'px'
      }, 50);
    }
  });

  $('.image-div').hover(function() {
    $(this).append('<div class="alert add-to-cart"><p class="text-center"><strong>Add to Cart</strong></p></div>');
    $(this).mouseleave(function() {
      $('.add-to-cart').remove();
    });
  });
  resizeHelper();
});

function resizeHelper() {
  var img = document.getElementsByClassName('carousel-image active');
  var height = img[0].clientHeight;  $('.featured-products').css('margin-top', height);
  $('.overlay').css('margin-top', height / 2.5);
}
