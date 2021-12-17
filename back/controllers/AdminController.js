"use strict";

var admin = require("../models/admin");
var customer = require("../models/customer");
var util = require("../controllers/UtilController");
var propertie = require("../properties/propertie");

const registration = async function (request, response) {
  if (request.user && request.user.rol == propertie.global.rol_admin) {
    util.registration(request.body, response, customer);
  } else {
    response.status(500).send({
      data: undefined,
      status: {
        id: propertie.global.error_service_id,
        name: propertie.global.error_service_name,
      },
    });
  }
};

const login = async function (request, response) {
  util.login(request.body, response, admin);
};

module.exports = {
  registration,
  login,
};
