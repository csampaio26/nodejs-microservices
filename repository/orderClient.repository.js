// Set up mongoose connection
const Order = require('../models/order');

exports.new = async(body) => {
    let order = new Order.clientOrder(
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

exports.delete = async(id) => {
    await Order.clientOrder.findOneAndDelete(id, {useFindAndModify: false}).exec();
    return new Order.clientOrder(
        {
            _id: id
        }
    )
};

exports.update = async(id, body) => {
    await Order.clientOrder.findByIdAndUpdate(id, {$set: body}, { useFindAndModify: false }).exec();

    let updatedOrder = await Order.clientOrder.findById(id).exec();
    return updatedOrder;
};

