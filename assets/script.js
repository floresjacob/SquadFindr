
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
    apiKey: "AIzaSyBgc6oG6MD5ePoP3wLxuUdEN5HOgfelFFk",
    authDomain: "test1-1ab8a.firebaseapp.com",
    databaseURL: "https://test1-1ab8a.firebaseio.com",
    projectId: "test1-1ab8a",
    storageBucket: "test1-1ab8a.appspot.com",
    messagingSenderId: "143362573111"
  }
  firebase.initializeApp(config)

nameContainer.toggle()
ending.toggle()

$(".btn").on("click", function(e){
    e.preventDefault()
    
    console.log($(inputArray[pageIndex]).val())
    idArray[pageIndex].toggle()
    if (pageIndex < idArray.length-1){
        pageIndex++
        console.log(idArray[pageIndex])
        idArray[pageIndex].toggle()
    }
    else {
        ending.toggle()
        ending.html("<h1>The End</h1>")
    }
})

