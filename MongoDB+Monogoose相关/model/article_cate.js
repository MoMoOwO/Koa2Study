var mongoose = require("./db.js");

var ArticleCateSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    add_time: Date
});

module.exports = mongoose.model("ArticleCate", ArticleCateSchema, "article_cate");
