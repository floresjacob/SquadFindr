
var nameContainer = $("#namecon")
var zipContainer = $("#zipcon")
var ageContainer = $("#agecon")
var sportContainer = $("#sportcon")
var ending = $("#return")
var idArray = [nameContainer, zipContainer, ageContainer, sportContainer]

var name = "#name"
var age = "#age"
var zip = "#zip"
var sport = "#sport"

var inputArray = [name, zip, age, sport]

var pageIndex = 0

  var config = {
    apiKey: "AIzaSyA13XUmfMBdQRESumXGirRcCtDLLiMmNuk",
    authDomain: "hunter-project-ad36a.firebaseapp.com",
    databaseURL: "https://hunter-project-ad36a.firebaseio.com",
    projectId: "hunter-project-ad36a",
    storageBucket: "hunter-project-ad36a.appspot.com",
    messagingSenderId: "985231274110"
  };
  firebase.initializeApp(config);

// var config = {
//     apiKey: "AIzaSyBgc6oG6MD5ePoP3wLxuUdEN5HOgfelFFk",
//     authDomain: "test1-1ab8a.firebaseapp.com",
//     databaseURL: "https://test1-1ab8a.firebaseio.com",
//     projectId: "test1-1ab8a",
//     storageBucket: "test1-1ab8a.appspot.com",
//     messagingSenderId: "143362573111"
//   }
//   firebase.initializeApp(config)

var database = firebase.database()

nameContainer.toggle()
ending.toggle()

var userProfile = new Object()

database.ref("/count").on("value", function(snapshot){
    if (snapshot.child("Count").exists()){
        userCount = parseInt(snapshot.val().Count)
        console.log("user Count: " + userCount)
    }
    else {
        userCount = 0
        database.ref("/count").set({
            Count: userCount
        })
    }
})

$(".btn").on("click", function(e){
    e.preventDefault()
    
    console.log($(inputArray[pageIndex]).val())
    idArray[pageIndex].toggle()
    switch(pageIndex){
        case 0:
            userProfile.name = $(inputArray[pageIndex]).val()
            break
        case 1:
            userProfile.zip = $(inputArray[pageIndex]).val()
            break
        case 2:
            userProfile.age = $(inputArray[pageIndex]).val()
            break    
        case 3:
            userProfile.sport = $(inputArray[pageIndex]).val()
            break
    }
    if (pageIndex < idArray.length-1){
        console.log(userProfile)
        pageIndex++
        // console.log(idArray[pageIndex])
        idArray[pageIndex].toggle()
    }
    else {
        ending.toggle()
        ending.html("<h1>The End</h1>")
        console.log(userProfile.name)
        console.log(userProfile.age)
        console.log(userProfile.zip)
        console.log(userProfile.sport)
        console.log(userProfile)
        getWeather(userProfile.zip);
        //user pushed to firebase
        // database.ref().push({
        //     Profile: userProfile,
        //     userNum: userCount
        // })  
        userCount++
        //user count set to user #
        database.ref("/count").set({
            Count: userCount
        })
        
    }
})

$("#zipsbmt").on("click", function (){
    event.preventDefault()
    var zipReturn = $("#zip").val()
    console.log(zipReturn)
    getMap(zipReturn)
    getWeather(zipReturn)
    $("#dynamicInfo").css("display", "block")
    // $("#humidityDisplay").css("display", "block")
    // $("#cloudDisplay").css("display", "block")
   
    

})


var name;
var age;
var zip;
var sport;

// What's this? Needed for database & snapshot

// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });



// API calls / test
function getWeather (weatherZip){
    var zipinput = 'https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5abe8f6b0b78d90a100c6919a58c658b&zip=' + weatherZip + "&units=imperial"
    
    $.ajax({
        url: zipinput,
        method: 'GET'
    }).then(function(response) {
            console.log(response.name); 
            console.log(response); 
             
            $("#cityHeading").prepend(response.name)
            $("#tempDisplay").prepend(response.main.temp)
            $("#humidityDisplay").prepend(response.main.humidity)
            $("#cloudDisplay").prepend(response.clouds.all)
            // $("#lonDisplay").append(response.coord.lon)
            // $("#latDisplay").append(response.coord.lat)     
    })
}


function getMap(zipcode){
    // plug this zipcode to this dynamic url with geocoding with my api key
    
    var zipinput = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '&key=AIzaSyDAjDJyK8EWda9UqGkO0SR8kPjr4XPvMng'
    

    // Calls an ajax command 
    $.ajax({
        url: zipinput, // plug in the zip code url 
        method: 'GET' // retrieve data
    }).then(function(response) { //  
        console.log(response)
        var lat = response.results[0].geometry.location.lat; // latitude data
        var lng = response.results[0].geometry.location.lng; // longitude data
        //lat and long results
        console.log(lat);
        console.log(lng);
        var mapProp = { // define all the map properties to show the map 
            center: new google.maps.LatLng(lat,lng),
            zoom: 15
        }
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        // this is the code that will display the map to the page and load it
        var marker= new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map: map,
            title: 'Squad On'
        })     
    })
}

getWeather ();

    
database.ref().on("value", function(snapshot){
    console.log(snapshot.val())
    userArr = snapshot.val()
    newArray = []

    // Object.keys(userArr).map(function(key) {
    //     newArray.push([userArr[key]])
    //     // console.log(newArray)
    // })
    // console.log(newArray[1][0].Profile)
    
})

