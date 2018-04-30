var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Database format for notes

var NoteSchema = new Schema({
    title: String,
    body: String
});

var Note = mongoose.model("Note", NoteSchema)

module.exports = Note;