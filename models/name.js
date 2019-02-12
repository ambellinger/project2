module.exports = function(sequelize, DataTypes) {
  var Names = sequelize.define("Names", {
    name: DataTypes.STRING,
    gender: DataTypes.TEXT,
    list: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Names.associate = function(models) {
    Names.hasMany(models.Origins, {
      onDelete: "cascade"
    });
  };

  return Names;
};
