module.exports = function(sequelize, DataTypes) {
  var Origins = sequelize.define("Origins", {
    origin: DataTypes.STRING,
    origingender: DataTypes.STRING
  });

  Origins.associate = function(models) {
    Origins.belongsTo(models.Names, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Origins;
};
