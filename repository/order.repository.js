// Set up mongoose connection
const Order = require('../models/order');

exports.new = async(body) => {
    let order = new Order(
        {
            body
        }
    );

    order.save(function(err, newOrder) {
        order._id = newOrder._id;
        if (err) {
            console.log("error");
            throw err;
        }
    });
    return order;
};

exports.getAll = async() => {
    return Order.find({});
};

exports.delete = async(id) => {

    const order = await Order.findById(id).exec();
    order.status = "deleted";

    await Order.findByIdAndUpdate(id, {$set: order}, { useFindAndModify: false }).exec();

    let updatedOrder = await Order.findById(id).exec();
    return updatedOrder;
};

exports.update = async(id, body) => {

    body.status = "updated";

    await Order.findByIdAndUpdate(id, {$set: body}, { useFindAndModify: false }).exec();

    let updatedOrder = await Order.findById(id).exec();
    return updatedOrder;
};

exports.confirm = async(id, body) => {

    body.status = "confirmed";

    await Order.findByIdAndUpdate(id, {$set: body}, { useFindAndModify: false }).exec();

    let updatedOrder = await Order.findById(id).exec();
    return updatedOrder;
};


exports.delivering = async(id, body) => {

    body.status = "delivering";

    await Order.findByIdAndUpdate(id, {$set: body}, { useFindAndModify: false }).exec();

    let updatedOrder = await Order.findById(id).exec();
    return updatedOrder;
};

exports.delivered = async(id, body) => {

    body.status = "delivered";

    await Order.findByIdAndUpdate(id, {$set: body}, { useFindAndModify: false }).exec();

    let updatedOrder = await Order.findById(id).exec();
    return updatedOrder;
};


exports.get = async(id,) => {
    const order = await Order.findById(id).exec();
    return order;
};
