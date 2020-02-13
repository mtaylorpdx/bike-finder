import { BikeService } from './bike-service.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { request } from 'https';


$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    $("#inputs").hide();
    $("#results").show();
    const searchRadius = parseFloat($("input#distance").val()); 
    let location = $("input#location").val();
    const locationArray = location.split("");
    const excludedChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "-", "_", "?", "/", ">", "<", ":", ";", "'", ",", "`", "~"];
    for (let i=0; i<locationArray.length; i++) {
      if (excludedChars.includes(locationArray[i])) {
        locationArray[i] = " ";
      }
    } 
    location = locationArray.join("");

    (async () => {
      let bikeService = new BikeService();
      const response = await bikeService.getStolenBikeByLocation(location, searchRadius);
      getElements(response);
    })();

    const getElements = function(response) {
      if (response === false) {
        $("#results").append(`<div class='row'><div class="col-md-12">There was an error. <a href='index.html'>Click here</a> to try again.</div></div>`);
      } else if (response.bikes.length === 0) {
        $("#results").append(`<div class='row'><div class="col-md-12">There are no stolen bikes in your requested location. <a href='index.html'>Click here</a> to try another location.</div></div>`);
      } else if (response.bikes.length > 0) {
        // Logic for most commonly stolen manufacturer:
        let manufacturerArray = [];
        response.bikes.forEach(function(bike){ 
          manufacturerArray.push(bike.manufacturer_name);
        });
        let maximumFrequency = 1;
        let counter = 0;
        let manufacturer;
        for (let i = 0; i<manufacturerArray.length; i++){
          for (let j=i; j<manufacturerArray.length; j++){
            if (manufacturerArray[i] === manufacturerArray[j]) {
              counter++;
            }
            if (maximumFrequency < counter) {
              maximumFrequency = counter;
              manufacturer = manufacturerArray[i];
            }
          }
          counter=0;
        }
        $(".snapshot").html(manufacturer);
        $(".maxFreq").html(maximumFrequency);

        // Logic for bike list:
        response.bikes.forEach(function(bike) {
          let unix_timestamp = `${bike.date_stolen}`;
          let date = new Date(unix_timestamp *1000);
          let bikeThumb;
          if (bike.thumb != null) {
            bikeThumb = bike.thumb;
          } else {
            bikeThumb = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWRA8lngFHUYDhz3N2Ct1y27pEw149bMN9tKqrZQNuER3vwdmh";
          }
          $("#bikeStats").append(`<div class='row'><div class='col-md-4'><strong>${bike.manufacturer_name}</strong> ${bike.frame_model}</div><div class='col-md-4'>${date}</div><div class='col-md-4'><center><img src='${bikeThumb}' alt='A photo of bike' height='200px' width='200px'></center></div> </div>`);
        });
      }
    };
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${THIRD-API-KEY}`, true);
    request.onload = function() {
      if (request.status === 200) {
        let data = JSON.parse(request.responseText);
        let coordinates = data.results[0].formatted;
        console.log(coordinates);
        return coordinates;
      } else if (request.status <= 500) {
        let data = JSON.parse(request.responseText);
        return data.status.message;
      } else {
        return "server error";
      }
    };
    request.onerror = function() {
      $("#results").append(`<div class='row'><div class="col-md-12">There was an error. <a href='index.html'>Click here</a> to try again.</div></div>`);
    };
    request.send();
  });
});






// let latLng = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.ANOTHER_API_KEY}`
// let map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });
// }