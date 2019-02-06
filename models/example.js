module.exports = function(sequelize, DataTypes) {
  var Name = sequelize.define("Name", {
    name: DataTypes.STRING,
    gender: DataTypes.TEXT
  });
  return Name;
};
