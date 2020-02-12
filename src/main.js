import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    $('form').hide();
    $('#results').show();
    const searchRadius = parseFloat($("input#distance").val());
    const zipcode = parseInt($('input#zipcode').val());

    (async () => {
      let response = await fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=10&location=${zipcode}&distance=${searchRadius}&stolenness=proximity&app_id=${process.env.API_KEY}`);
      let jsonifiedResponse = await response.json();
      getElements(jsonifiedResponse);
      console.log(jsonifiedResponse);
    })();

    const getElements = function(response) {
      response.bikes.forEach(function(bike) {
        let unix_timestamp = `${bike.date_stolen}`;
        let date = new Date(unix_timestamp *1000);
        let bikeThumb;
        if (bike.thumb != null) {
          bikeThumb = bike.thumb;
        } else {
          bikeThumb = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWRA8lngFHUYDhz3N2Ct1y27pEw149bMN9tKqrZQNuER3vwdmh";
        }
        $('#results').append(`<div class='row'><div class='col-md-4'><strong>${bike.manufacturer_name}</strong> ${bike.frame_model}</div><div class='col-md-4'>${date}</div><div class='col-md-4'><img src='${bikeThumb}' alt='A photo of bike' height='200px' width='200px'></div> </div>`);
      });
    }

  });

});