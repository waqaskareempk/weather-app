const express = require("express");
const https = require("https");
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apikey = "1488fe2bb3dc3e0594072c5dcabce5e7"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey + "&units=" + unit + ""
  https.get(url, function(response){

    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently <span>" + weatherDescription + "</span></p>")
      res.write("<h1>The temprature in " + query + " is <span>" + temp + "</span> desgree celcius.</h1>")
      res.write("<img src=" + imageURL +">")
      res.send()
    })
  })
})


app.listen(3000, function() {
  console.log("server is runnning on port 3000")
})
