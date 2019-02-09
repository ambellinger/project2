module.exports = function(sequelize, DataTypes) {
  var Names = sequelize.define("Names", {
    name: DataTypes.STRING,
    gender: DataTypes.TEXT
  });

  Names.associate = function(models) {
    Names.hasMany(models.Origins, {
      onDelete: "cascade"
    });
  };

  return Names;
};
