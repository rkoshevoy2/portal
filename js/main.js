
function initMap() {
  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 14,
     disableDefaultUI: true,
    zoomControl: true,
    center: {lat: 21.491247, lng: 39.204708},
    scrollwheel: false
  });

  var image = 'images/icon-marker.png';
  var beachMarker = new google.maps.Marker({
    position: {lat: 21.491247, lng: 39.204708},
    map: map,

    icon: image
  });
};


$('.projects-tabs__item').click(function(){
  var index = $(this).index();

  $('.project-tab').removeClass('active');
  $('.projects-tabs__item').removeClass('projects-tabs__item--active');

  $('.project-tab').eq(index).addClass('active');
  $(this).eq(index).addClass('projects-tabs__item--active');
});