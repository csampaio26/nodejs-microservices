// Set up mongoose connection
const Log = require('../models/log');

exports.newQRS = async(body) => {
    let log = new Log.clientQrsLog(
        {
            log: body
        }
    );

    log.save(function(err) {
        if (err) {
            console.log("error");
            throw err;
        }
    });
    return log;
};


exports.newCRS = async(body) => {
    let log = new Log.clientCrsLog(
        {
            log: body
        }
    );

    log.save(function(err) {
        if (err) {
            console.log("error");
            throw err;
        }
    });
    return log;
};
