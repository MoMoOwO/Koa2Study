// order 表关联 order_item 表

var OrderModel = require("./model/order.js");

var OrderItemModel = require("./model/order_item.js");

// 查询 order 集合数据
/* OrderModel.find({}, (err, docs) => {
    if (err) {
        console.log(err);
    } else {
        console.log(docs);
    }
}); */

// 查询 order 表，即 order 下面的 order_item
OrderModel.aggregate([{
    $lookup: {
        from: "order_item", // 要关联的表
        localField: "order_id", // 关联所使用的字段
        foreignField: "order_id", // 关联的表中对应的字段
        as: "items" // 关联后存放的字段
    }
}, {
    $match: {
        "all_price": {
            $gte: 90
        }
    }
}], (err, docs) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(docs));
    }
});
