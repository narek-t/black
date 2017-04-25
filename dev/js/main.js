$(document).ready(function() {
	$('.home-slider').slick({
		speed: 500,
		fade: true,
		cssEase: 'linear',
	});
	$('.custom-scroll').perfectScrollbar({
		maxScrollbarLength: 300,
	});
});