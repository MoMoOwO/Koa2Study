// 找出订单商品中含有“酸奶”的订单号已经点单的总价格

// 方式一，先从 order_item 集合中查询酸奶的 order_id，再根据 order_id 从 order 中查找对应信息
/* var OrderItemModel = require("./model/order_item.js");
var OrderModel = require("./model/order.js");

OrderItemModel.find({
    "title": "酸奶"
}, (err, docs) => {
    if (err) {
        console.log(err);
    } else {
        var res = JSON.parse(JSON.stringify(docs[0]));
        //console.log(docs[0].order_id);
        OrderModel.find({
            "order_id": res.order_id
        }, (error, doc) => {
            if (error) {
                console.log(error);
            } else {
                //console.log(doc);
                res.order_info = doc[0];
                console.log(res);
            }
        });
    }
}); */


// 方式二：表关联
// mongoose 中获取 ObjectId：mongoose.Types.ObjectId
var OrderItemModel = require("./model/order_item.js");

OrderItemModel.aggregate([{
    $lookup: {
        from: "order", // 要关联的表
        localField: "order_id", // 关联所使用的字段
        foreignField: "order_id", // 关联的表中对应的字段
        as: "order_info" // 关联后存放的字段
    }
}, {
    $match: {
        "title": "酸奶"
    }
}], (err, docs) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(docs));
    }
});
