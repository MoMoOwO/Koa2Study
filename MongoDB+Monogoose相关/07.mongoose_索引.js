var UserModel = require("./model/user.js");

UserModel.find({
    age: 18
}, (err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
});
