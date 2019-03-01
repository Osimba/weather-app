$(document).ready(getLocation());

var vLoc = document.getElementById("Location");
var vTemp = document.getElementById("Temperature");
var vState = document.getElementById("State");
var vWind = document.getElementById("Wind");
var weatherImg = document.getElementById("WeatherImg");

function getLocation() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        vLoc.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) { 
  
  var api = "https://fcc-weather-api.glitch.me/api/current?lon=" + position.coords.longitude + "&lat=" + position.coords.latitude;
  $.getJSON(api, showLocation);
}

function showLocation(json) {
  //Location of User
  vLoc.innerHTML = json.name + ", " + json.sys.country;
  
  //Temperature in F or C
  vTemp.innerHTML = json.main.temp + " <a id='D' url:'#'>C</a>";
  
  function handler1() {
    vTemp.innerHTML = Math.floor(json.main.temp * 1.8 + 32)  + " <a id='D' url:'#'>F</a>";
    $("#D").one("click", handler2);
  }

  function handler2() {
    vTemp.innerHTML = json.main.temp + " <a id='D' url:'#'>C</a>";
    $("#D").one("click", handler1);
  }
  
  $("#D").one("click", handler1);
  
  
  //What the weather is currently like
  vState.innerHTML = json.weather["0"].main;
  
  var degrees = json.wind.deg;
  if(degrees >= 0 && degrees < 22.5) var compass = "N";
  else if(degrees >= 22.5 && degrees < 67.5) var compass = "NE";
  else if(degrees >= 67.5 && degrees < 112.5) var compass = "E";
  else if(degrees >= 112.5 && degrees < 157.5) var compass = "SE";
  else if(degrees >= 157.5 && degrees < 202.5) var compass = "S";
  else if(degrees >= 202.5 && degrees < 247.5) var compass = "SW";
  else if(degrees >= 247.5 && degrees < 292.5) var compass = "W";
  else if(degrees >= 292.5 && degrees < 337.5) var compass = "NW";
  else if(degrees >= 337.5) var compass = "N";
  vWind.innerHTML = json.wind.speed + " knots, " + compass;
  
  weatherImg.src = json.weather["0"].icon;
}