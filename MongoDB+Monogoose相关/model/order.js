var mongoose = require("./db.js");

var OrderSchema = mongoose.Schema({
    order_id: Number,
    uid: Number,
    trade_no: Number,
    all_price: Number,
    all_num: Number
});

module.exports = mongoose.model("Order", OrderSchema, "order");
