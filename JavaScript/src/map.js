var map;
var markers = []
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;


function initMap() {
  var london = {lat: 51.482924, lng: 0}
  var makers = {lat: 51.582924, lng: 0}
  map = new google.maps.Map(document.getElementById('map'), {
    center: london,
    zoom: 10
  });

var marker = new google.maps.Marker({
  position: london,
  title: 'Hello World!'
});
markers.push(marker)

var marker2 = new google.maps.Marker({
  position: makers,
  title: 'makers 2!'
});
markers.push(marker2)

for (var i=0;i<markers.length;i++){
  markers[i].setMap(map);
}

  getMarkers();
};

// $('#geoLocationSubmit').click(function(e){
//   e.preventDefault;
//   createMapMarker();
//
// })


  function getMarkers(){
    var url = "http://localhost:9292/api?maps=request";
    $.get(url, function(data){
      createMapMarker(data.task);
    });
  };

  function createMapMarker(task){
    for (var i=0; i<task.length; i++){
      if ($.isNumeric(task[i].lat)){
        var latIn = task[i].lat;
        var longIn = task[i].long;
        var location = {lat: latIn, lng: longIn};
        addMarker(location,map);
    }
    }
  }

  function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map
    });
  }
