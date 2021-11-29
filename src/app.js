// Function to update last updated Date and Time data

function UpdateTime() {
  event.preventDefault();
  let currentTime = new Date();
  console.log(currentTime);

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  let year = currentTime.getFullYear();
  let month = months[currentTime.getMonth()];
  let date = currentTime.getDate();
  let day = days[currentTime.getDay()];
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0` + minute;
  }

  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${date}/${month}/${year}`;

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = `${day}`;

  let currentHrMin = document.querySelector("#current-time");
  currentHrMin.innerHTML = `${hour}:${minute}`;
}

//Functions for Celcius Button to recall temperature data based on city entered in searchfield

function CurrentTemperatureC(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  let roundedTemperature = Math.round(response.data.main.temp);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${roundedTemperature}`;

  let currentMetric = document.querySelector("#current-metric");
  currentMetric.innerHTML = `°C`;
}

function UpdateCityTemperatureC() {
  console.log(UpdateTime());

  let apiKey = `5a579885b4788b2ec3bfc35587baaacf`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let city = document.querySelector("#search-city-field").value;
  let unit = `metric`;
  let apiURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiURL).then(CurrentTemperatureC);
}
//https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=$5a579885b4788b2ec3bfc35587baaacf&unis=metric


let CButton = document.querySelector("#celsiusButton");
CButton.addEventListener("click", UpdateCityTemperatureC);

let DefaultButton = document.querySelector("#search-city-field");
DefaultButton.addEventListener("submit", UpdateCityTemperatureC);

//Functions for Fahrenheit Button to recall temperature data based on city entered in searchfield

function CurrentTemperatureF(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let roundedTemperature = Math.round(response.data.main.temp);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${roundedTemperature}`;

  let currentMetric = document.querySelector("#current-metric");
  currentMetric.innerHTML = `°F`;
}

function UpdateCityTemperatureF() {
  console.log(UpdateTime());
  let apiKey = `5a579885b4788b2ec3bfc35587baaacf`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let city = document.querySelector("#search-city-field").value;
  let unit = `imperial`;
  let apiURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiURL).then(CurrentTemperatureF);
}

let FButton = document.querySelector("#fahrenheitButton");
FButton.addEventListener("click", UpdateCityTemperatureF);

//Functions for Current Button to recall temperature data based on browser's current geolocation//

function UpdateCurrentTemperature(response) {
  document.querySelector(
    "#current-city"
  ).innerHTML = `${response.data.name}`;

  let roundedTemperature = Math.round(response.data.main.temp);
  let humidityPercentage =(response.data.main.humidty);

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${roundedTemperature}`;

  let currentMetric = document.querySelector("#current-metric");
  currentMetric.innerHTML =`°C`;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidityPercentage}%`;
}

function CurrentPositionTemperature(position) {
  let apiKey = `5a579885b4788b2ec3bfc35587baaacf`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let unit = `metric`;
  let apiURL = `${apiEndPoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(UpdateCurrentTemperature);
}

function CurrentPosition(event) {
  console.log(UpdateTime());
  navigator.geolocation.getCurrentPosition(CurrentPositionTemperature);
}

let CurrentPositionButton = document.querySelector("#currentButton");
CurrentPositionButton.addEventListener("click", CurrentPosition);
