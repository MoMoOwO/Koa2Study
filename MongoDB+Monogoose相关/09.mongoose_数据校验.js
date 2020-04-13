var StudentsModel = require("./model/students.js");

var stu = new StudentsModel({
    name: "张四",
    id: 20130101002,
    gender: "女",
    age: 18,
    address: "山东省青岛市"
});

stu.save((err) => {
    if (err) {
        console.log(err);
    } else {
        StudentsModel.find({}, (error, docs) => {
            if (error) {
                console.log(error);
            } else {
                console.log(docs);
            }
        });
    }
});
