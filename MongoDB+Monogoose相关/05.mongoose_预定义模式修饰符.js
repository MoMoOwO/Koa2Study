var NewsModel = require("./model/news.js");

var news = new NewsModel({
    title: "   title8   ",
    author: "AUthoR8",
    pic: "news pic 8",
    content: "News content 8",
});
news.save();

NewsModel.find({}, (err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
});
