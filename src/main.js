import { BikeService } from './bike-service.js';
import { QuoteService } from './quote-service.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    $("#inputs").hide();
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

    (async () => {
      let quoteService = new QuoteService();
      const quoteResponse = await quoteService.getRandomQuote();
      returnQuote(quoteResponse);
    })();

    const getElements = function(response) {
      if (response === false) {
        $("#results").append(`<div class='row'><div class="col-md-12">There was an error. <a href='index.html'>Click here</a> to try again.</div></div>`);
        $("#bikeStats").hide();
        $("#snapshot").hide();
        $("#results").show();
      } else if (response.bikes.length === 0) {
        $("#results").append(`<div class='row'><div class="col-md-12">There are no stolen bikes in your requested location. <a href='index.html'>Click here</a> to try another location.</div></div>`);
        $("#bikeStats").hide();
        $("#snapshot").hide();
        $("#results").show();
      } else if (response.bikes.length > 0) {
        $("#results").show();
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
        $(".totalStolenBikes").html(manufacturerArray.length);                      
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
    // Logic for random quote generator:
    const returnQuote = function(quoteResponse) {
      if (quoteResponse.text != "undefined" && quoteResponse.quoteAuthor != "undefined") {
        $(".jumbotron").append(`<p>"${quoteResponse.quoteText}" ~ ${quoteResponse.quoteAuthor}</p>`);
      }
    };
  });
});