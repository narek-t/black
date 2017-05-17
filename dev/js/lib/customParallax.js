// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".parallax-section").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }


  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
  
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

function scrollToSlide(slideIndex) {
  currentSlideNumber = slideIndex;
  $(".parallax-section").removeClass('down-scroll up-scroll');
  if(slideIndex > 0) {
    for (var i = 0; i < slideIndex; i++) {
      $(".parallax-section").eq(i).addClass('down-scroll');
    }
  }
  
  previousItem()
}

$('.js--scrollto').click(function(event) {
  event.preventDefault();
  var id = $(this).data('src');
  scrollToSlide(id);

});

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
if($('body').hasClass('home')) {
  window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
}


// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".parallax-section").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
  if(currentSlideNumber == 0) {
    $('body').addClass('black__header');
    $('.up-arrow').removeClass('visible');
  }else {
    $('body').removeClass('black__header');
    $('.up-arrow').addClass('visible');
  }

  $(".parallax-section").removeClass('current__slide');
  $(".parallax-section").eq(currentSlideNumber).addClass('current__slide');
  // $(".parallax-section").eq(currentSlideNumber).find('.animate-init').addClass('animated');


}

function previousItem() {
  var $currentSlide = $(".parallax-section").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
  
  if(currentSlideNumber == 0) {
    $('body').addClass('black__header');
    $('.up-arrow').removeClass('visible');
  }else {
    $('body').removeClass('black__header');
    $('.up-arrow').addClass('visible');
  }


  $(".parallax-section").removeClass('current__slide');
  $(".parallax-section").eq(currentSlideNumber).addClass('current__slide');
  // $(".parallax-section").eq(currentSlideNumber).find('.animate-init').addClass('animated');

}