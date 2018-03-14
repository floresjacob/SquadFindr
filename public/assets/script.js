// var count

// retrieve latest count
// countRef.on('value', function(snap) {
    //  count = snap.val().count
    // })
    
    // once the sport is passed through
    // userProfile.id = count
    // userRef.push(userProfile)
    // count++
    // countRef.set({count : count})
    
    
    
    
    
    
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
    var resultButton = "<button class='btn btn-primary' id='teamCut'>Ready to Play?</button>"
    //   var config = {
        //     apiKey: "AIzaSyA13XUmfMBdQRESumXGirRcCtDLLiMmNuk",
        //     authDomain: "hunter-project-ad36a.firebaseapp.com",
        //     databaseURL: "https://hunter-project-ad36a.firebaseio.com",
        //     projectId: "hunter-project-ad36a",
        //     storageBucket: "hunter-project-ad36a.appspot.com",
        //     messagingSenderId: "985231274110"
        //   };
        //   firebase.initializeApp(config);
        
        var config = {
            apiKey: "AIzaSyDN8ChQsxdXIIh4UcPywyKwVAjIqhw_CRg",
            authDomain: "squadfindr.firebaseapp.com",
            databaseURL: "https://squadfindr.firebaseio.com",
            projectId: "squadfindr",
            storageBucket: "squadfindr.appspot.com",
            messagingSenderId: "641766865705"
          };
          firebase.initializeApp(config);
        
        var database = firebase.database()
        var  userRef = database.ref('/users')
        var countRef = database.ref('/counter')
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
            console.log("zip: " + userProfile.zip)
            getWeather(userProfile.zip)
            getMap(userProfile.zip)
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
        ending.html("<img src='./assets/images/logo.png' height='200' width='200'>")
        ending.append(resultButton)
        console.log(userProfile)
        userRef.push(userProfile)
        userCount++
        //user count set to user #
        
        
    }
})

// $("#zipsbmt").on("click", function (){
//     event.preventDefault()
//     var zipReturn = $("#zip").val()
//     console.log(zipReturn)
//     getMap(zipReturn)
//     getWeather(zipReturn)
//     $("#dynamicInfo").css("display", "block")
// })

$("#return").on("click", "#teamCut", function(event){
    event.preventDefault()
    console.log("hit")
    $("#return").toggle()
    $("#resultCon").toggle()
    $("#dynamicInfo").css("display", "block")
    $("#team").append("<h3>THE TEAM: </h3><br>")
    for (i=0; i<teamArray.length; i++ ){    
        selectTeam(teamArray[i].name)
    }
})

// API calls / test
function getWeather (weatherZip){
    var zipinput = "https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5abe8f6b0b78d90a100c6919a58c658b&zip=" + weatherZip + "&units=imperial"
    
    $.ajax({
        url: zipinput,
        method: 'GET'
    }).then(function(response) {
            console.log(response.name) 
            console.log(response)              
            $("#cityHeading").text(response.name)
            userProfile.city = response.name
            $("#tempDisplay").text(response.main.temp+String.fromCharCode(176))
            userProfile.temp = response.main.temp
            $("#humidityDisplay").text(response.main.humidity+"%")
            userProfile.humidity = response.main.humidity
            $("#cloudDisplay").text(response.clouds.all+"%") 
            userProfile.clouds = response.clouds.all
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
        lat = response.results[0].geometry.location.lat // latitude data
        userProfile.lat = lat
        lng = response.results[0].geometry.location.lng // longitude data
        userProfile.lng = lng
        //lat and long results
        console.log(lat)
        console.log(lng)
        var mapProp = { // define all the map properties to show the map 
            center: new google.maps.LatLng(lat,lng),
            zoom: 15
        }
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp)
        // this is the code that will display the map to the page and load it
        var marker= new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map: map,
            title: 'Squad On',
            label: userArr[0].sport
        })     
        
    })
}

//convert snap to array
function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.key = childSnapshot.key

        returnArr.push(item)
    })

    return returnArr
}
    
userRef.orderByChild('name').on("value", function(snapshot){
    console.log(snapshotToArray(snapshot))
    //convert object of users into an array
    userArr = snapshotToArray(snapshot)
    //now have team array. use function to pass to map and weather
    teamArray = []
    for (i=0; i<userArr.length; i++){    
        //call on userArr objects
        if (userArr[i].sport === userArr[0].sport 
            && userArr[i].city === userArr[0].city){
            teamArray.push(userArr[i])
        }
    }
    // selectTeam(teamArray)
})

function selectTeam(teamArr){
    $("#team").append(teamArr + "<br>")
    teamMap = getMap(userArr[0].zip)
    teamWeather = getWeather(userArr[0].zip)
}
