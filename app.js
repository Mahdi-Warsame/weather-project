const express = require("express");
const https = require("https");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){

	res.sendfile(__dirname+"/index.html");


});

app.post("/",function(req, res){
	const cityName = req.body.cityName;
	const apiKey = "80c752aa9655fb13ae1d12c833909669"
	const unit = "metric"
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + apiKey + "&units=" + unit + " ";

	https.get(url, function(response){
		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description  = weatherData.weather[0].description;
			const conditionImage = "http://openweathermap.org/img/wn/";
			const icon = weatherData.weather[0].icon+"@2x.png";
			const conditionUrlImage = conditionImage+icon;
		
			res.write("<p>Weather Description: "+description+"</p>");
			res.write("<h1>The Temprature of " +cityName+ " is "+temp+" degree Celcius.</h1>");
			res.write(" <img src = "+ conditionUrlImage +">");
			res.send();
		});
	});

});



app.listen(3000, function(){
	console.log("App has started listening on port 3000");
});
