'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var customerRouter = require('./routers/customer');
var adminRouter = require('./routers/admin');

mongoose.connect('mongodb://127.0.0.1:27017/ancarle-data', { useUnifiedTopology: true, useNewUrlParser: true }, (err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log('run service');
        app.listen(port, function () {
            console.log('run service on port' + port);
        });
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    response.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', customerRouter);
app.use('/api', adminRouter);

module.exports = app;