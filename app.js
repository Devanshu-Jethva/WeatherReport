const express = require('express');
const app = express();
const https = require('https');

app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const appid = "196d4da8ed4f588a36061d6f61c29c1d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=metric";

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatehrDescription = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<h1>The temprature in " + weatherData.name + " is " + temp + " degree celcius.</h1>");
            res.write("<p>The weather is currently " + weatehrDescription + "</p>");
            res.write("<img src=" + icon + ">")
            res.send();
        })
    })
})










app.listen(3000, () => {
    console.log("server is running on port 3000 at http://localhost:3000");
})