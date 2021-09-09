const express = require('express')
const https = require("https")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
const port = 3000

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/",(req,res)=>{
    const query = req.body.cityName
    const apiKey = "0f4abf9e48d2bdc335bac3abbe5c0e4b"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, (response) => {
        // get status code of the url/api
        console.log(response.statusCode);
        // get data from url/api
        response.on("data", (data) => {
            //get all data from url/api
            const ourData = JSON.parse(data)
            // console.log(ourData);
            //get specific data from url/api ex:temperature
            const temp = ourData.main.temp
            console.log(temp)
             //get specific data from url/api ex:name
             const name = ourData.name
             console.log(name)
             //icon set
             const icon = ourData.weather[0].icon
             const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
             //print data in website
             res.write("<h1>temp: " + temp + "</h1>")
             res.write("<p>name: " + name + "</p>")
             res.write("<img src="+imageURL+">")
             res.send()
        });
    });
})




app.listen(port, function () {
    console.log("Server online");
});