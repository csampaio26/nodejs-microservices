require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const receivers = require('./rabbit/receivers');

let app = express();
const bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));

receivers.clientReceiver();
receivers.orderReceiver();
receivers.transportReceiver();

app.use(require('./routes'));

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var server = app.listen( process.env.PORT || 8765, function(){
    console.log('Listening on port ' + server.address().port);
});

module.exports = app;
