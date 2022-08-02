'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    idProduct: DataTypes.NUMBER,
    idBuyer: DataTypes.NUMBER,
    idSeller: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};