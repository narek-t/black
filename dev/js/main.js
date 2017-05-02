$(document).ready(function() {
	$('.home-slider').slick({
		speed: 700,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 5000,
	});
	$('.custom-scroll').perfectScrollbar({
		maxScrollbarLength: 300,
	});
});