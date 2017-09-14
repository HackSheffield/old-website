/* eslint-disable */
function initMap () {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map-div'), {
    center: {
      lat: 53.381256,
      lng: -1.478921
    },
    scrollwheel: false,
    draggable: false,
    zoom: 16,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true
  });

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  var marker = new google.maps.Marker({
    map: map,
    position: map.center
  });

  google.maps.event.addListener(map, 'click', function (event) {
    this.setOptions({
      draggable: true,
      scrollwheel: true
    });
  });

  google.maps.event.addListener(map, 'mouseover', function (event) {
    this.setOptions({
      draggable: true,
      streetViewControl: true,
      zoomControl: true
    });
  });

  google.maps.event.addListener(map, 'mouseout', function (event) {
    this.setOptions({
      scrollwheel: false,
      draggable: false
    });
  });
}
