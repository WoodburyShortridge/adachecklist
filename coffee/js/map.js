
var sjb = {};
var map;
var coffee = [];
var bounds;
var myLoc;
var info = new google.maps.InfoWindow();
var ywsid = 'UdhxwLwo4yqRq_K8wmNkfA';
var ywsid2 ='ynoYeq0HNwWfPKFRqK-5qg';
var searchLimit = 1;
var starShadow = "";
var instructionsContent ='<div class="instructions"><h3>You are here!</h3>';
  instructionsContent += 'Would you like to find coffee?<br><br>'
  instructionsContent += '<button onclick="sjb.getYelp('+'coffee'+')">Coffee</button><br>'
  instructionsContent += '<img src="./apple-touch-icon-114x114-precomposed.png" alt="coffee cup icon"/><br>'
  instructionsContent += '<br><strong>PS - you can move me to a new area to get coffee place there. :-)</strong></div>'
var searchMenu = new google.maps.InfoWindow({
  content: instructionsContent
});
  
function trace(message){ 
            if (typeof console != 'undefined') 
            {
                console.log(message);
            }
        }

sjb.locate = function(){
if(navigator.geolocation) {
/*   Querie the location */
  navigator.geolocation.getCurrentPosition(function(position){
  myLoc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  var markerImage = "img/marker.png"; 
  sjb.locMarker = new google.maps.Marker({
          position: myLoc,
          map: map,
          icon: markerImage,
          title: "you are here!",
          draggable:true,
          animation: google.maps.Animation.DROP
    });
    map.setCenter(myLoc);
    google.maps.event.addListener(sjb.locMarker, 'dragend', function(){
     sjb.getYelp('coffee'); 
    });
    google.maps.event.addListener(sjb.locMarker, 'click', function() {
      searchMenu.open(map, sjb.locMarker);
    });

},
  function(){
  handleNoGeolocation(true);
  });
/* do all these functions if supports geolocation */
}
else {
  // Browser doesn't support Geolocation
  handleNoGeolocation(false);
  return myLoc = new google.maps.LatLng(4233844, -71.0880);
}
}

/* End of locate function */  

/* Display's an alert to the user that their browser doesn't suopport location services */
var handleNoGeolocation = function(errorFlag) {
if (errorFlag) {
 alert("Oh no! There was an error with locatng you, please refresh this page.");
}
else {
 alert("Jeez, it looks like your browser isn't going to work with this web app, sorry.");
}
}


sjb.yelpMarkerMaker = function(i,latitude,longitude,title, infowindowcontent, starShadow)
  {
        var markerLatLng = new google.maps.LatLng(latitude,longitude);
        var shadow = new google.maps.MarkerImage(starShadow, new google.maps.Size(50, 10), new google.maps.Point(30,30) , new google.maps.Point(30, 30));
        bounds.extend(markerLatLng);
        map.fitBounds(bounds);
        coffee[i] = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                title: title,
                animation: google.maps.Animation.DROP,
                shadow: shadow,
                icon: "http://www.adachecklist.org/coffee/img/coffee.png"
                
        });
        google.maps.event.addListener(coffee[i], 'click', function() {
                info.setContent(infowindowcontent);
                info.open(map,coffee[i]);
                searchMenu.close();
                map.setcenter(coffee[i]);
        });
}
/* end of yelpMarkerMaker */
sjb.clearMarkers = function(){
  if (coffee) {
      for (var i = 0; i < coffee.length; i++ ) {
        coffee[i].setMap(null);
    }
  }
}


sjb.getYelp = function(term){
  sjb.clearMarkers();
  coffee=[];
  bounds = new google.maps.LatLngBounds ();
  bounds.extend(myLoc);
  $.getJSON('http://api.yelp.com/business_review_search?lat='+sjb.locMarker.position.lat()+'&long='+sjb.locMarker.position.lng()+'&limit='+searchLimit+'&ywsid='+ywsid2+'&term='+term+'&radius=1+&category=coffee&callback=?',
  function(data)
  {
    $.each(data.businesses, function(i,item){
      trace(item);
      var starShadow = item.rating_img_url_small;
      infowindowcontent = '<div class="info"><h2>'+item.name+'</h2>';
      infowindowcontent += '<h3>Yelp Rating:</h3><p>'+item.avg_rating +' / 5 Stars</p>';
      infowindowcontent += '<img src="'+item.rating_img_url+'"/><br>';
      infowindowcontent += '<p>'+item.review_count+' Reviews</p>';
      infowindowcontent += '<blockquote>"'+item.reviews[0].text_excerpt+'"</blockquote>';
      infowindowcontent += '<img class="place" src="' + item.photo_url+'"alt="Image from Yelp.com"/><br>';
      infowindowcontent += '<a href="'+ item.url +'" target="_blank">';
      infowindowcontent += 'See this place on Yelp</a><br>';
      infowindowcontent += '<img src="./img/miniMapLogo.png" alt="yelp.com logo"</a><br>';
      infowindowcontent += '<p>tel: ' + item.phone +'</p><br>';
      infowindowcontent += '<p class="address">'+item.address1+'<br>';
      infowindowcontent += '<p class="address">'+item.address2+'</p>';
      sjb.yelpMarkerMaker(i,item.latitude,item.longitude,item.name, infowindowcontent, starShadow);
                    });                         
                }
            );
}
/*
var walkingRoute = function(dest){
	var requestDir = {
    origin: myLoc,
    destination: dest,
    travelMode: google.maps.TravelMode.WALKING
  };
	directionService.route(request, function(result, status){
		if (status === google.maps.DirectionStatus.OK){
			directionDisplay.setDirections(result);
		}
	});
}
*/


sjb.initialize = function(){
  var myOptions = {
    streetViewControl: false,
    zoom: 17,
    rotateControl: true,
    center: new google.maps.LatLng(22, 21),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  map = new google.maps.Map(document.getElementById('map_canvas'),myOptions);
sjb.locate();
searchMenu.open();
}

