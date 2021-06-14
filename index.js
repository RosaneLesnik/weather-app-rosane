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

function displayForecast() {

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu" , "Fri" , "Sat" , "Sun" , "Mon" , "Tue"];
    days.forEach(function (day) {
        forecastHTML = 
    forecastHTML + 
    `    
                    <div class="col-2">
                        <div class="weather-forecast-date">${day}</div>
                        <i class="fas fa-cloud-sun"></i>
                        <div class="weather-forecast-temperature">
                            <span class="weather-forecast-temperature-max"> 18º</span>
                            <span class="weather-forecast-temperature-min"> 12º </span>
                        </div>
                        </div>
    `; 
    });

    

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}


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

  

  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feelsLike").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
 
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;    
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#go-form");
form.addEventListener("submit", go);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search ("Lisbon");
displayForecast();