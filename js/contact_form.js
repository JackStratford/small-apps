
const appID = "446f4d120d2d737d3c1a5c466f05627f";
var map = L.map('Map').setView([51, 20], 4);

function startApp() {
    console.log("It works")

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;

                getWeather();
                getRandomUser();
                    
            }
        );
    }
}

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1, 
}).addTo(map);

var latlngs = [[51.800621, 19.521547], [60.147993, 8.666963]];

var path = L.polyline(latlngs, ).addTo(map); 

function getWeather() { // gets API from openweathermap
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${appID}`;
    console.log(url);

    fetch(url).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            loadWeatherData(data);
        });
    });
}

function getRandomUser() { //Random User Source for data limited to countries within europe for routing function 
    fetch("https://randomuser.me/api/?results=2&nat=de,dk,es,fr,gb,ie,nl").then(function (response) {
        response.json().then(function (userData) {

            dataReady(userData);
            for (var i = 0; i <= userData.results.length - 1; i++) {
                console.log(i);
                getWeatherForUser(userData.results[i], i);
                
            }
            
        })
    });
}

function getWeatherForUser(userData, userIndex) {
    var userCity = userData.location.city; //lat and long data from randomuser.me are not corresponding with the city and state. They're random so the weather data are not accurate
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${appID}`;
    console.log(url);
    console.log(userCity);

    fetch(url).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            loadWeatherForUser(data, userIndex);         

        });
    });
}

function loadWeatherData(data) { //Weather APP
    const city = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const feels_like = data.main.feels_like;
    const clouds = data.clouds.all;
    const pressure = data.main.pressure;
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const windSpeed = data.wind.speed;
    const dayLenght = new Date((data.sys.sunset * 1000) - (data.sys.sunrise * 1000));

    var imgURL = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    document.getElementById("WeatherImg").setAttribute("src", imgURL)

    document.getElementById("cityLink").innerHTML = city + ", " + country;
    const cityLink = document.getElementById("cityLink");
    cityLink.innerHTML = (city + ", " + country);
    cityLink.href = (`https://openstreetmap.org/#map=9/lat=${lat}&lon=${long}`);

    document.getElementById("temp").innerHTML = temp + " *C";
    document.getElementById("feels_like").innerHTML = " / " + feels_like + " *C";
    document.getElementById("clouds").innerHTML = clouds + " %";
    document.getElementById("windSpeed").innerHTML = windSpeed + " km/h";
    document.getElementById("pressure").innerHTML = pressure + " hPa";
    document.getElementById("sunrise").innerHTML = sunrise.getHours() + ":" + ("0" + sunrise.getMinutes()).slice(-2);
    document.getElementById("sunset").innerHTML = sunset.getHours() + ":" + ("0" + sunset.getMinutes()).slice(-2);
    document.getElementById("dayLenght").innerHTML = (dayLenght.getHours() + "h " + dayLenght.getMinutes() + "min");
}

function dataReady(dane) { // Random User Applet
    console.log(dane);
    var result = dane.results[0];
    var result1 = dane.results[1];
    var fullname = result.name.title + " " //user0
        + result.name.first + " "
        + result.name.last;
    document.getElementById("fullname").innerHTML = fullname;

    var img = result.picture.large;
    document.getElementById("avatar-img").src = img;

    var username = result.login.username;
    document.getElementById("username").innerHTML = "@" + username;

    var email = result.email;
    document.getElementById("email").innerHTML = email;

    var origin = result.location.country;
    var city = result.location.city;
    document.getElementById("origin").innerHTML = city + ", " + origin;

    var fullname1 = result1.name.title + " " // user1
        + result1.name.first + " "
        + result1.name.last;
    document.getElementById("fullname1").innerHTML = fullname1;

    var img1 = result1.picture.large;
    document.getElementById("avatar-img1").src = img1;

    var username1 = result1.login.username;
    document.getElementById("username1").innerHTML = "@" + username1;

    var email1 = result1.email;
    document.getElementById("email1").innerHTML = email1;

    var origin1 = result1.location.country;
    var city1 = result1.location.city;
    document.getElementById("origin1").innerHTML = city1 + ", " + origin1;

    var iconUrl= result.picture.large;
    var iconUrl1= result1.picture.large;
    var myIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [45, 45],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: false,
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    var myIcon1 = L.icon({
        iconUrl: iconUrl1,
        iconSize: [45, 45],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: false,
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    L.marker([30.505, 15.57], {icon: myIcon}).addTo(map);
    L.marker([`${result1.location.coordinates.latitude}`, `${result1.location.coordinates.longitude}`], {icon: myIcon1,}).addTo(map);
    // L.marker([`${data.coord.lat}`, `${data.coord.lon}`], {icon: `${myIcon1}`,}).addTo(map);
}

function loadWeatherForUser(data, userIndex) {
    var userTemp = data.main.temp;
    var imgURLUser = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    document.getElementById(`WeatherImgUser${userIndex}`).setAttribute("src", imgURLUser)
    document.getElementById(`user${userIndex}temp`).innerHTML = "Weather: " + userTemp + " *C";
}

var textAreaStatsDiv = document.getElementById("textStats");
var createArea = document.createElement('textarea'); //TextArea ?????
createArea.setAttribute("name", "textStats");
textAreaStatsDiv.appendChild(createArea);
var linebreak = document.createElement('br');
// createform.appendChild(linebreak);
// var textAreaStats = document.getElementsByTagName("textarea")[0]; 
createArea.addEventListener("input", onChange);
function onChange(e) {
    const data = createArea.value;
    const numChar = data.length;
    const numWords = data.replace(/[\r\n]/g, " ").split(" ").length;
    const numSent = data.split(".").length - 1;
    document.getElementById("num-char").innerHTML = numChar;
    document.getElementById("num-words").innerHTML = numWords;
    document.getElementById("num-sent").innerHTML = numSent;
}