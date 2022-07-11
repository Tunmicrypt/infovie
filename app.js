const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));



app.get("/", function(request, response){
  response.sendFile(__dirname + "/index.html");
})


app.post("/", function(req, res){
  console.log(req.body.query);

  const query = req.body.query;
  const apiKey = "86597823d3c8b126cbfc64e09b47c93c";
  const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query;
  const baseUrl = "https://image.tmdb.org/t/p/";
  const fileSize = "w300";



  https.get(url, function(response){
    console.log(response.statusCode);
    if(response.statusCode !== 200){
      res.sendFile(__dirname + "/failure.html");
    }



    let loadedData = "";

    response.on("data", function(data){
      loadedData += data
    })

    response.on("end",function(data){
      const movieData = JSON.parse(loadedData);
      console.log(movieData);
      const title = movieData.results[0].title;
      const genre = movieData.results[0].genre_ids;
      const overview = movieData.results[0].overview;
      const audienceRating =  movieData.results[0].vote_average;
      const posterPath = movieData.results[0].poster_path;
      const imageURL = "https://image.tmdb.org/t/p/" + fileSize + "/" + posterPath + "";


      res.write("<h1> Title: " + title + "</h1>");
        res.write("<h1>Overview: " + overview + "</h1>");
      res.write("<h1> AudienceRating: " + audienceRating + "</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })

  })
})

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Started server at port 3000");
})






//API KEY
//86597823d3c8b126cbfc64e09b47c93c
