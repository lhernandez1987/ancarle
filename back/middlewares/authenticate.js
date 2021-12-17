"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "ancarle";
var propertie = require("../properties/propertie");

exports.auth = function (request, response, next) {
  if (!request.headers.authorization) {
    return response.status(400).send({
      status: {
        id: propertie.global.no_headers_error_id,
        name: propertie.global.no_headers_error_name,
      },
    });
  }

  var token = request.headers.authorization.replace(/['"]+/g, "");

  var segment = token.split(".");

  try {
    if (segment.length == 3) {
      var payload = jwt.decode(token, secret);
      if (payload.exp <= moment().unix()) {
        return response.status(401).send({
          status: {
            id: propertie.global.token_expired_id,
            name: propertie.global.token_expired_name,
          },
        });
      }
    }
  } catch (error) {
    return response.status(498).send({
      status: {
        id: propertie.global.invalid_token_id,
        name: propertie.global.invalid_token_name,
      },
    });
  }

  request.user = payload;

  next();
};
