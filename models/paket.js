'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_detail_transaksi",
        as: "paket"
      })
      this.belongsTo(models.outlet, {
        foreignKey: "id_outlet",
        as: "transaksi"
      })
    }
  };

  paket.init({
    id_paket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_outlet: DataTypes.INTEGER,
    jenis: DataTypes.ENUM('kiloan', 'selimut', 'bed_cover', 'kaos', 'lain'),
    nama_paket: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paket',
    tableName: "paket"
  });
  return paket;
};