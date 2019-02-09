module.exports = function(sequelize, DataTypes) {
  var Name = sequelize.define("Names", {
    name: DataTypes.STRING,
    gender: DataTypes.TEXT,
    list: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Name;
};
