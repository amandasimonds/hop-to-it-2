
var modal = document.getElementById("myModal");
console.log("modal", modal.style)

//google map//
var map;
var la= 39.7392
var ln= -104.9903

var initMap = function() {
    map = new google.maps.Map(document.getElementById("mapg"), {
       center: {lat: la, lng: ln},
       zoom: 15
   });
   var marker = new google.maps.Marker({
   position: {lat: la, lng: ln},
   map: map
 });
}

//view on map click event
$(document).on("click", "#map", function(){


var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

la = $(this).data().lat
ln = $(this).data().lng
console.log(la);

(document.getElementById("mapg")).style.display = "block";

map = new google.maps.Map(document.getElementById("mapg"), {
       center: {lat: la, lng: ln},
       zoom: 15
   });

  var marker = new google.maps.Marker({
   position: {lat: la, lng: ln},
   map: map
 });

 modal.style.display == "block";

 // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
});


//brewery list generator click event
$("#search").on('click', function () {
    event.preventDefault();
    // console.log("button was clicked");

    var cityInput = $('#search-input').val();
    // cityInput = cityInput.split(' ');
    // cityInput = cityInput.join('-');
    console.log("city input: " + cityInput);

var APIkey = "cd3220993a88c09168f7e658ad27b100";
var breweryQuery ="https://beermapping.com/webservice/loccity/" + APIkey + "/" + cityInput + "&s=json";
var mapQuery = "https://beermapping.com/?lat=41.91034&lon=-87.67597&z=5";
var brewery  = [];
var rbAddress = "";
var URLstring = "";
var bURL = "";

//call brewery API
$.ajax({
      url: breweryQuery,
      method: "GET"
    }).then(function (response) {

      console.log(breweryQuery);

      for(let i = 0; i < 10; i++ ){

         let r = response[0];
         r = response[Math.floor(Math.random() * response.length)];

         //brewery address
         var bAddress = (r.street + " " + r.city + " " + r.state);
         console.log(bAddress);

         // //random brewery website
         URLstring = JSON.stringify(r.url);
         var newURLstring = URLstring.substring(1, URLstring.length);
         bURL = '<a target= "blank" href="https://' + newURLstring +  ">visit their website</a>" ;

        // brewery review link
        rURLstring = JSON.stringify(r.reviewlink);
         var rnewURLstring = rURLstring.substring(1, rURLstring.length);
         rURL = '<a target= "blank" href="https://' + rnewURLstring +  ">information & reviews</a>" ;

         // //google geocoding API//
         // //get coordinates for random brewery for geocode//
         var googleAPIkey = "AIzaSyAP6OXI1t3xgoiRrS2RrYY-pmOjKYFnyNU"

         // //change address spaces to plus signs so geocode can read it
         var gAddress = bAddress.replace(" ", "+");
         console.log("create address for geocode: " + gAddress)
         var breweryGeocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + bAddress + "&key=" + googleAPIkey;

         $.ajax({
          type: "GET",
          url: breweryGeocodeURL,
          datatype: "json"
            }).then(function (gresponse) {

               var cityLat = gresponse.results[0].geometry.location.lat;
               var cityLng = gresponse.results[0].geometry.location.lng;
               console.log("Inside ajax: " + cityLat + " | " + cityLng); 

               var tempBrewery = {
                     name: r.name,
                     address: r.street + " " + r.city + " " + r.state,
                     website: r.url,
                     websiteb: bURL,
                     review: r.reviewlink,
                     phone: r.phone,
                     reviewr: rURL,
                     lat: cityLat,
                     lng: cityLng
                        }

               var mapLink = "https://www.google.com/maps/search/?api=1&query=" + cityLat + "," + cityLng;

               brewery.push(tempBrewery);
               console.log("new array");
               console.log(brewery);

               // var mapBtn = $("<button id='map' data-lat=" + cityLat + "data-lng=" + cityLng + ">")
           
               $("#brewery-list").append(
                  "<b>" + r.name + "</b> | "   
                  + '<a target= "blank" href=' + r.reviewlink + '>information & reviews</a>' + " | " 
                  + r.phone + " | "
                  + r.street + " " + r.city + " " + r.state + " | "
                  + `<button id="map" data-lat=" + ${cityLat} + " data-lng="  + ${cityLng} + " >view on map</button><br>`
                  );
      });
         
      }
      
    })

});







{/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAP6OXI1t3xgoiRrS2RrYY-pmOjKYFnyNU&callback=initMap" async defer></script> */}