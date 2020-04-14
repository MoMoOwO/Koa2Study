var mongoose = require("./db.js");

var AuthorSchema = mongoose.Schema({
    name: String,
    password: String,
    age: Number,
    gender: {
        type: String,
        enum: ["男", "女"]
    },
    tel: Number,
    status: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Author", AuthorSchema, "author");
