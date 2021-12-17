'use strict'

var express = require('express');
var adminController = require('../controllers/AdminController');
var auth = require('../middlewares/authenticate');

var api = express.Router();

api.post('/registration_admin', auth.auth, adminController.registration);
api.post('/login_admin', adminController.login);

module.exports = api;