async function toDTO(order, operation, sender){
    return {
        order: order,
        "operation": operation,
        "sender": sender
    }
}

module.exports = toDTO;
