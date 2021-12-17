"use strict";

var bcrypt = require("bcrypt-nodejs");
var propertie = require("../properties/propertie");
var jwt = require("../helpers/jwt");

const registration = async function (data, response, model) {
  console.log(data);
  encryptPassword(data, response, model);
};

const encryptPassword = (data, response, model) => {
  bcrypt.hash(data.password, null, null, async function (error, hash) {
    if (hash) {
      data.password = hash;
      validatePerson(data, response, model);
    } else {
      response.status(500).send({
        data: undefined,
        status: {
          id: propertie.global.error_service_id,
          name: propertie.global.error_service_name,
        },
      });
    }
  });
};

const validatePerson = async (data, response, model) => {
  var persons = [];

  persons = await model.find({ email: data.email });

  if (persons.length == 0) {

    await model.create(data);

    response.status(200).send({
      data: data,
      status: {
        id: propertie.global.status_ok_id,
        name: propertie.global.status_ok_name,
      },
    });
  } else {
    response.status(400).send({
      data: undefined,
      status: {
        id: propertie.global.existing_email_id,
        name: propertie.global.existing_email_name,
      },
    });
  }
};

const login = async (data, response, model) => {
  var persons = [];

  persons = await model.find({ email: data.email });

  if (persons.length == 0) {
    response.status(200).send({
      data: undefined,
      status: {
        id: propertie.global.not_found_id,
        name: propertie.global.not_found_name,
      },
    });
  } else {
    let user = persons[0];

    bcrypt.compare(data.password, user.password, async function (err, check) {
      check
        ? response.status(200).send({
            data: user,
            status: {
              id: propertie.global.status_ok_id,
              name: propertie.global.status_ok_name,
            },
            token: jwt.createToken(user),
          })
        : response.status(200).send({
            data: undefined,
            status: {
              id: propertie.global.invalid_password_id,
              name: propertie.global.invalid_password_name,
            },
          });
    });
  }
};

module.exports = {
  registration,
  login,
};
