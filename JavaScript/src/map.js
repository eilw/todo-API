var map;
var markers = []
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var infos = [];


function initMap() {
  var london = {lat: 51.482924, lng: 0}
  map = new google.maps.Map(document.getElementById('map'), {
    center: london,
    zoom: 12
  });
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
        var taskContent = task[i].content
        addMarker(location,map, taskContent);
    }
    }
  }

  function addMarker(location, map, taskContent) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map
    })
      map.setCenter(marker.getPosition())
      var content = 'Task: ' + taskContent;
      var infowindow = new google.maps.InfoWindow()
      google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
              return function() {
              /* close the previous info-window */
              closeInfos();
                 infowindow.setContent(content);
                 infowindow.open(map,marker);

              /* keep the handle, in order to close it on next click event */
              infos[0]=infowindow;
              };
      })(marker,content,infowindow));
  };


function closeInfos(){

   if(infos.length > 0){

      /* detach the info-window from the marker ... undocumented in the API docs */
      infos[0].set("marker", null);

      /* and close it */
      infos[0].close();

      /* blank the array */
      infos.length = 0;
   }
}
