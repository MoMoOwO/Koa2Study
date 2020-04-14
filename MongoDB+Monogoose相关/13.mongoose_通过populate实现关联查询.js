var ArticleCateModel = require("./model/article_cate.js");
var AuthorModel = require("./model/author.js");
var ArticleModel = require("./model/article.js");

// 使用 populate 实现多表关联查询，需要引入所有关联的 Model
// article 与 article_cate 关联
/* ArticleModel.find({}).populate("cid").exec((err, docs) => {
    if (err) {
        console.log(err);
    } else {
        console.log(docs);
    }
}); */

// article 与 article_cate 与 author 三个集合关联
ArticleModel.find({}).populate("cid").populate("author_id").exec((err, docs) => {
    if (err) {
        console.log(err);
    } else {
        console.log(docs);
    }
});

// 建议使用 aggregate 方法实现多表关联查询
