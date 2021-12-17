"use strict";

var express = require("express");
var customerController = require("../controllers/CustomerContoller");

var auth = require('../middlewares/authenticate');

var api = express.Router();

api.post("/registration_customer", customerController.registration);
api.post("/login_customer", customerController.login);
api.get("/get_customers", auth.auth , customerController.getCustomers);
api.get("/get_customer/:id", auth.auth , customerController.getCustomer);
api.put("/update_customer/:id", auth.auth , customerController.updateCustomer)
api.delete("/delete_customer/:id", auth.auth , customerController.deleteCustomer)

module.exports = api;
