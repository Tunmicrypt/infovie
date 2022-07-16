const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const app = express();

// let movieData = [];
// const title;
// const genre;
// const overview;
// const audienceRating;
// const posterPath;
// const imageURL;


const homeTitle = "Find any Movie you want along";
const homeContent = "It includes audience ratings and overview"
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));



app.get("/", function(req, res){
    res.render("home",{
      homeTitle: homeTitle,
      homeContent: homeContent
    })
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



    let loadedData = "";

    response.on("data", function(data){
      loadedData += data
    })

    response.on("end",function(data){
const  movieData = JSON.parse(loadedData);
      console.log(movieData);
      const  title = movieData.results[0].title;
        const  genre = movieData.results[0].genre_ids;
        const     overview = movieData.results[0].overview;
        const audienceRating =  movieData.results[0].vote_average;
        const   posterPath = movieData.results[0].poster_path;
        const imageURL = "https://image.tmdb.org/t/p/" + fileSize + "/" + posterPath + "";

        res.render("success",{
          title: title,
          overview: overview,
          audienceRating: audienceRating,
          imageURL: imageURL

      });
        // const  title = movieData.results.title;
        // const  genre = movieData.results.genre_ids;
        // const     overview = movieData.results.overview;
        // const audienceRating =  movieData.results.vote_average;
        // const   posterPath = movieData.results.poster_path;
        // const imageURL = "https://image.tmdb.org/t/p/" + fileSize + "/" + posterPath + "";
        //
        // res.render("success",{
        //   title: title,
        //   overview: overview,
        //   audienceRating: audienceRating,
        //   imageURL: imageURL
        // })


      // res.write("<h1> Title: " + title + "</h1>");
      //   res.write("<h1>Overview: " + overview + "</h1>");
      // res.write("<h1> AudienceRating: " + audienceRating + "</h1>");
      // res.write("<img src=" + imageURL + ">");
      // res.send();
    })

  })
})

app.get("/success", function(req, res){
  res.render("success", {
    title: title,
    overview: overview
  })
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Started server at port 3000");
})






//API KEY
//86597823d3c8b126cbfc64e09b47c93c
