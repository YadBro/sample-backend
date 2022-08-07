const {user} = require('../../models');
const { success } = require('../status-code');
const {Op} = require('sequelize');

exports.getUsers = async (req, res) => {
  try {
    let filters = {}
    if (Object.keys(req.query).length) {
      const {fullname, email, id} = req.query;
      filters = {
        [Op.or]: {
          fullname: {
            [Op.like]: `%${fullname}%`
          },
          email: {
            [Op.like]: `%${email}%`
          },
          id: {
            [Op.like]: `%${id}%`
          },
        }
      }
    }
    const users = await user.findAll(
      {
        where: filters
      },
      {
        order: [
          ['id', 'DESC']
        ]
      },
    );
    if(users.length === 0) throw new Error('Users not found!');
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
