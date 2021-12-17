'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;
var customerSchema = schema({

    identification: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true }, //por ahora
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, default: 'profile.png', required: true },
    phone: { type: String, required: false },
    gender: { type: String, required: false },
    birthDate: { type: String, required: false },
    createAt: { type: Date, default: new Date(), require: true }

});

module.exports = mongoose.model('customer', customerSchema);