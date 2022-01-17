// Fetching HTML Elements in Variables by ID.
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

window.onload = function () { //Random Ussr Source for data
    fetch("https://randomuser.me/api")
        .then(response => response.json())
        .then(data => dataReady(data))
}

function dataReady(data) { // Random User Applet
    console.log(data);
    var result = data.results[0];
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

    var country = result.location.country;
    document.getElementById("country").innerHTML = country;
}

function reloadDiv(){ // Random User reload button
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
    const numSent = data.split(".").length-1;
    document.getElementById("num-char").innerHTML = numChar;
    document.getElementById("num-words").innerHTML = numWords;
    document.getElementById("num-sent").innerHTML = numSent;
}