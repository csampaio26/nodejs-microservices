const Order = require('../models/order');

exports.new = async(id, body) => {
    let order = new Order.orderOrder(
        {
            _id: id,
            ingredients: body.ingredients
        }
    );

    order.save(function(err) {
        if (err) {
            console.log("error");
            throw err;
        }
    });

    return order;
};

exports.delete = async(id) => {
    await Order.orderOrder.findOneAndDelete(id, {useFindAndModify: false}).exec();
    return new Order.clientOrder(
        {
            _id: id
        }
    )
};

exports.update = async(id, body) => {
    const update  = { ingredients: body.ingredients , status: body.status };

    await Order.orderOrder.findByIdAndUpdate(id, {$set: update}, { useFindAndModify: false }).exec();

    let updatedOrder = await Order.orderOrder.findById(id).exec();
    return updatedOrder;
};



