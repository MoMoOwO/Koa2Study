var ArticleCateModel = require("./model/article_cate.js");
var AuthorModel = require("./model/author.js");
var ArticleModel = require("./model/article.js");

// article_cate 添加数据
/* var ac = new ArticleCateModel({
    title: "宋词",
    description: "古代文学-宋词",
    add_time: new Date()
});
ac.save(); */

// reader 添加数据
/* var author = new AuthorModel({
    name: "孙倩",
    password: "sq147852",
    age: 18,
    gender: "女",
    tel: 17815975326,
    status: 1
});
author.save(); */

// article 集合数据添加
/* var article = new ArticleModel();
article.title = "长虹";
article.cid = "5e95824424620234746f7aef";
article.author_id = "5e95856bd2e3794c389662d1";
article.author_name = "孙倩";
article.description = "长虹摘要描述";
article.content = "长虹内容";

article.save(); */



// 多表关联查询
// 查询文章信息，并显示文章的分类信息和作者信息
// 使用这种方式关联查询，只需要引入一个 ArticleModel 即可
ArticleModel.aggregate([{
    $lookup: {
        from: "article_cate",
        localField: "cid",
        foreignField: "_id",
        as: "cate_info"
    }
}, {
    $lookup: {
        from: "author",
        localField: "author_id",
        foreignField: "_id",
        as: "author_info"
    }
}], (err, docs) => {
    if (err) {
        console.log(err);
    } else {
        //console.log(docs);
        console.log(JSON.stringify(docs));
    }
});
