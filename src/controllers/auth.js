const jwt = require('jsonwebtoken');
const {user} = require('../../models');
const Joi = require('joi');
const { badRequestCode, success, notFoundCode } = require('../status-code');
const bcrypt = require('bcrypt');

let status;
let statusCode;
let message;
let token;
let data;

exports.login = async (req, res) => {
  try {

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const validation = schema.validate(req.body);
    let {value} = validation;

    if (validation.error) {
      status = validation.error.name;
      statusCode = badRequestCode.statusCode;
      message = validation.error.message;
      data = value;
    }

    const isRegistered = await user.findOne({
      where: {
        email: value.email
      }
    });


    if (!isRegistered) {

      status = notFoundCode.statusData;
      statusCode = notFoundCode.statusCode;
      message = 'The email is not registered';
      data = value
      token = '';
      
    }else {

      const {password, id} = isRegistered;
      const isPassword = bcrypt.compare(value.password, isRegistered.password)

      if (isPassword) {
        status = success.statusData;
        statusCode = success.statusCode;
        message = success.message;
        data = value;
        token = jwt.sign({password, id}, process.env.SECRET_KEY);
      } else {
        status = badRequestCode.statusData;
        statusCode = badRequestCode.statusCode;
        message = badRequestCode.message;
        data = value;
        token = '';
      }
    }


    res.status(statusCode).send(
      {
        status,
        user: {
          email: data?.email,
        },
        token,
        message,
      }
    );

  } catch (error) {

    res.status(500).send(
      {
        status: error.name,
        message: error.message
      }
    );
  }
}