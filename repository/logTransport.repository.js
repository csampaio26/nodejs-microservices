// Set up mongoose connection
const Log = require('../models/log');

exports.new = async(body) => {
    let log = new Log.transportLog(
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


