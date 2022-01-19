var lat;
var long;
const appID = "446f4d120d2d737d3c1a5c466f05627f";
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
function getWeather() { // gets API from openweathermap
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${appID}`;
    console.log(url);

    fetch(url).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            LoadWeatherData(data);
        });
    });
}

function getRandomUser() { //Random User Source for data
    fetch("https://randomuser.me/api").then(function (response) {
        response.json().then(function (dane) {

            dataReady(dane);
        })
    });
}

function LoadWeatherData(data) { //Weather APP
    const city = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
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
    cityLink.href = (`https://openstreetmap.org/#map=4/lat=${lat}&lon=${long}`);

    document.getElementById("temp").innerHTML = temp + " *C";
    document.getElementById("clouds").innerHTML = clouds + " %";
    document.getElementById("windSpeed").innerHTML = windSpeed + " km/h";
    document.getElementById("pressure").innerHTML = pressure + " hPa";
    document.getElementById("sunrise").innerHTML = sunrise.getHours() + ":" + ("0" + sunrise.getMinutes()).slice(-2);
    document.getElementById("sunset").innerHTML = sunset.getHours() + ":" + ("0" + sunset.getMinutes()).slice(-2);
    document.getElementById("dayLenght").innerHTML = (dayLenght.getHours() + "h " + dayLenght.getMinutes() + "min");


}
var x = document.getElementById("Page4");
var createform = document.createElement('contact_form'); // Create New Element Form
createform.setAttribute("action", ""); // Setting Action Attribute on Form
createform.setAttribute("method", "post"); // Setting Method Attribute on Form
x.appendChild(createform);

var heading = document.createElement('h3'); // Heading of Form
heading.innerHTML = "contact me";
createform.appendChild(heading);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

var namelabel = document.createElement('label'); // Create Label for Name Field
namelabel.innerHTML = "Your Name : "; // Set Field Labels
createform.appendChild(namelabel);

var inputelement = document.createElement('input'); // Create Input Field for Name
inputelement.setAttribute("type", "text");
inputelement.setAttribute("name", "dname");
createform.appendChild(inputelement);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

var emaillabel = document.createElement('label'); // Create Label for E-mail Field
emaillabel.innerHTML = "Your Email : ";
createform.appendChild(emaillabel);

var emailelement = document.createElement('input'); // Create Input Field for E-mail
emailelement.setAttribute("type", "text");
emailelement.setAttribute("name", "demail");
createform.appendChild(emailelement);

var emailbreak = document.createElement('br');
createform.appendChild(emailbreak);

var messagelabel = document.createElement('label'); // Append Textarea
messagelabel.innerHTML = "Your Message : ";
createform.appendChild(messagelabel);

var texareaelement = document.createElement('input'); //TextArea ?????
texareaelement.setAttribute("name", "dmessage");
createform.appendChild(texareaelement);

var messagebreak = document.createElement('br');
createform.appendChild(messagebreak);

var submitelement = document.createElement('input'); // Append Submit Button
submitelement.setAttribute("type", "submit");
submitelement.setAttribute("name", "dsubmit");
submitelement.setAttribute("value", "send");
createform.appendChild(submitelement);


function dataReady(dane) { // Random User Applet
    console.log(dane);
    var result = dane.results[0];
    var fullname = result.name.title + " "
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
    document.getElementById("origin").innerHTML = origin;
}

function reloadDiv() { // Random User reload button
    window.location.reload();
}

var textAreaStatsDiv = document.getElementById("textStats");
var createArea = document.createElement('textarea'); //TextArea ?????
createArea.setAttribute("name", "textStats");
textAreaStatsDiv.appendChild(createArea);
var linebreak = document.createElement('br');
createform.appendChild(linebreak);
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

