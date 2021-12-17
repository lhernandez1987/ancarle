"use strict";

var customer = require("../models/customer");
var util = require("../controllers/UtilController");
var propertie = require("../properties/propertie");

const registration = async function (request, response) {

  util.registration(request.body, response, customer);

};

const login = async function (request, response) {

  util.login(request.body, response, customer);

};

const getCustomers = async function (request, response) {

  if (request.user && request.user.rol == propertie.global.rol_admin) {

    let customers = await customer.find();
    response.status(200).send({ data: customers });

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

const getCustomer =  async function (request, response) {

  if (request.user && request.user.rol == propertie.global.rol_admin) {

    try {

      var id = request.params['id'];

      let result = await customer.findById({_id: id});

      response.status(200).send({ data: result });
      
    } catch (error) {

      response.status(400).send({ data: undefined });
      
    }

  } else {

    response.status(500).send({
      data: undefined,
      status: {
        id: propertie.global.error_service_id,
        name: propertie.global.error_service_name,
      },
    });
  }
}

const updateCustomer = async function (request, response) {

  if (request.user && request.user.rol == propertie.global.rol_admin) {

    try {

      var id = request.params['id'];
      var data = request.body;

      let result = await customer.findByIdAndUpdate({_id: id}, {

        identification: data.identification,
        name: data.name,
        lastName: data.lastName,
        country: data.country,
        email: data.email,
        password: data.password,
        phone: data.phone,
        gender: data.gender,
        birthDate: data.birthDate

      });

      response.status(200).send({ data: result,
        status: {
          id: propertie.global.status_ok_id,
          name: propertie.global.status_ok_name,
        },
      });
      
    } catch (error) {

      response.status(400).send({ data: undefined });
      
    }

  } else {

    response.status(500).send({
      data: undefined,
      status: {
        id: propertie.global.error_service_id,
        name: propertie.global.error_service_name,
      },
    });
  }
}

const deleteCustomer = async function (request, response) {

  if (request.user && request.user.rol == propertie.global.rol_admin) {

    try {

      var id = request.params['id'];
      var data = request.body;

      let result = await customer.findByIdAndRemove({_id: id});

      response.status(200).send({ data: result,
        status: {
          id: propertie.global.delete_customer_id,
          name: propertie.global.delete_customer_name,
        },
      });
      
    } catch (error) {

      response.status(400).send({ data: undefined });
      
    }

  } else {

    response.status(500).send({
      data: undefined,
      status: {
        id: propertie.global.error_service_id,
        name: propertie.global.error_service_name,
      },
    });
  }
  
}

module.exports = {
  registration,
  login,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
};
