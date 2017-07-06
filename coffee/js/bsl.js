
var bsl = {};
function initialize () {
var hotel = new google.maps.LatLng(42.3470, -71.07788);
var myOptions  = {
  center: hotel,
  zoom: 17,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);

}
var $map = $('map_canvas');
var markers = [];
var markerMarker = function(location, locOptions){
  console.log(location + locOptions);
};
