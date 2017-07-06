var sjb = {};
var map;
var coffee = [];
var bounds;
var info = new google.maps.InfoWindow();

function trace(message){ 
            if (typeof console != 'undefined') 
            {
                console.log(message);
            }
        }

/* Toggle the layer */
/*
sjb.toggleArrayLayer = function(arraylayer) 
        {
            if (arraylayer) {
                for (i in arraylayer) {                 
                    if (arraylayer[i].getVisible() == true)
                    {
                        arraylayer[i].setMap(null);
                        arraylayer[i].visible = false;
                    }
                    else
                    {
                        arraylayer[i].setMap(map);
                        arraylayer[i].visible = true;
                    }
                }
            }
        }
sjb.toggleArrayLayer(yelp);
*/



var myLoc = new google.maps.LatLng(42.338844, -71.0880);

/* end of the initialize() function */

/* Locates the user*/
sjb.locate = function(){
if(navigator.geolocation) {
/*   Querie the location */
  navigator.geolocation.getCurrentPosition(function(position) {
  var myLoc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  var markerImage = "img/marker.png"
  var locMarker = new google.maps.Marker({
          position: myLoc,
          map: map,
          icon: markerImage,
          title: "you are here!",
          draggable:true,
          animation: google.maps.Animation.DROP
    });
  google.maps.event.addListener(locMarker, 'click', toggleBounce);

function toggleBounce() {

  if (locMarker.getAnimation() != null) {
    locMarker.setAnimation(null);
  } else {
    locMarker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
    /* map.setCenter(myLoc); */
  },
  function() {
    handleNoGeolocation(true);
  });
}
else {
  // Browser doesn't support Geolocation
  handleNoGeolocation(false);
}
};
/* End of locate function */

/* Display's an alert to the user that their browser doesn't suopport location services */
function handleNoGeolocation(errorFlag) {
if (errorFlag) {
 alert("Oh no! There was an error with locatng you, please refresh this page.");
} else {
 alert("Jeez, it looks like your browser isn't going to work with this web app, sorry.");
}

var options = {
map: map,
position: new google.maps.LatLng(60, 105)
};


map.setCenter(options.position);
}

sjb.yelpMarkerMaker = function(i,latitude,longitude,title, infowindowcontent)
        {
        var markerLatLng = new google.maps.LatLng(latitude,longitude);
        bounds.extend(markerLatLng);
        map.fitBounds(bounds);
        coffee[i] = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                title: title,
                icon: "http://www.adachecklist.org/coffee/img/miniMapLogo.png"
        });
        google.maps.event.addListener(coffee[i], 'click', function() {
                info.setContent(infowindowcontent);
                info.open(map,coffee[i]);
        });
}
/* end of yelpMarkerMaker */

sjb.getYelpCoffee = function(){
  bounds = new google.maps.LatLngBounds ();
  $.getJSON('http://api.yelp.com/business_review_search?lat='+map.getCenter().lat()+'&long='+map.getCenter().lng()+'&limit=5&ywsid=UdhxwLwo4yqRq_K8wmNkfA&term='+'coffee'+'&callback=?',
  function(data)
  {
    $.each(data.businesses, function(i,item){
      trace(item);
      infowindowcontent = '<strong>'+item.name+'</strong><br>';
      infowindowcontent += '<img src="'+item.photo_url+'"><br>';
      infowindowcontent += '<a href="'+item.url+'" target="_blank">see it on yelp</a>';
      
      sjb.yelpMarkerMaker(i,item.latitude,item.longitude,item.name, infowindowcontent);
                    });                         
                }
            );
        }

sjb.initialize = function(){
  sjb.locate();
  var myOptions = {
    zoom: 15,
    center: myLoc,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  map = new google.maps.Map(document.getElementById('map_canvas'),myOptions);
  
  sjb.getYelpCoffee();
}