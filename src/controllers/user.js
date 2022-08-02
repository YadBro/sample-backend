const {user} = require('../../models');
const { success } = require('../status-code');

exports.getUsers = async (req, res) => {
  try {

    const users = await user.findAll();
    res.status(success.statusCode).send({
      status: success.statusData,
      users
    });

  } catch (error) {

    res.status(500).send({
      status: error.name,
      message: error.message
    });

  }
}

exports.getUser = async (req, res) => {
  try {

    const {id} = req.body;
    const users = await user.findOne({id});

    res.status(success.statusCode).send({
      status: success.statusData,
      users : [users]
    });

  } catch (error) {

    res.status(500).send({
      status: error.name,
      message: error.message
    });

  }
}

exports.addUser = async (req, res) => {
  try {

    let data = req.body;
    data = {
      ...data,
      status: 'buyer',
    }
    const userOne = await user.create(data);

    res.status(success.statusCode).send({
      status: success.statusData,
      user : userOne
    });

  } catch (error) {

    res.status(500).send({
      status: error.name,
      message: error.message
    });

  }
}
