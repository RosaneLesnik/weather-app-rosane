let now = new Date();

let h4 = document.querySelector("h4");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`; }
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;}
let year = now.getFullYear();

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[now.getDay()];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  let month = months[now.getMonth()];

h4.innerHTML = `${day}, ${month} ${date}, ${year}. ${hours}h${minutes}min.`;



function search(city){
  let apiKey = "4193082e2ca918e90336a1dd168a0a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

}

function go(event) {

event.preventDefault();
let city = document.querySelector("#go-input").value;

search(city);

}

function displayWeatherCondition(response) {  

  let iconElement = document.querySelector("icon");

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feelsLike").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  
  iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${responde.data.weather[0].icon}@2x.png`
      );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchLocation(position) {
 let apiKey = "4193082e2ca918e90336a1dd168a0a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayfahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (14 * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let form = document.querySelector("#go-form");
form.addEventListener("submit", go);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

search ("Lisbon");
