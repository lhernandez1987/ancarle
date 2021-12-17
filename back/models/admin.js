'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;
var adminSchema = schema({

    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, required: true }

});

module.exports = mongoose.model('admin', adminSchema);