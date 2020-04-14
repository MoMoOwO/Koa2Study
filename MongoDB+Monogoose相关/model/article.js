var mongoose = require("./db.js");

var ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    cid: {
        type: mongoose.Types.ObjectId,
        ref: "ArticleCate" // 通过 ref 引用，指定关联的 集合，ref 的值为可以操作集合的 Model
    },
    author_id: {
        type: mongoose.Types.ObjectId,
        ref: "Author"
    },
    author_name: String,
    description: String,
    content: String
});

module.exports = mongoose.model("Article", ArticleSchema, "article");
