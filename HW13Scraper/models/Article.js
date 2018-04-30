var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Database format for Article scraper
var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
});

var Article= mongoose.model("Article", ArticleSchema);

module.exports = Article;