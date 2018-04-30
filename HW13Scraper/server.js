var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraper");

// Scrapes ESPN for articles
// app.get("/scrape", function (req, res) {
//     axios.get("http://www.espn.com/")
//         .then(function (response) {

//             var $ = cheerio.load(response.data);

//             // Scrapes by Section tags and pulls H1 headings
//             $("section h1").each(function (i, element) {
//                 var result = {};
//                 result.title = $(this).children("p").text();
//                 result.link = $(this).children("p").attr("href");

app.get("/scrape", function (req, res) {
    axios.get("http://www.echojs.com/")
        .then(function (response) {

            var $ = cheerio.load(response.data);

            // Scrapes by Section tags and pulls H1 headings
            $("article h2").each(function (i, element) {
                var result = {};
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");

                // Creates result with article title and link
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });
            res.send("Scraped!")
        });
});

// Finds articles from DB and sends them back to the client
app.get("/articles", function (req, res) {

    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Shows one article by id # and pulls in article notes
app.get("/article/:id", function (req, res) {

    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Updates article notes 
app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Starts server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });