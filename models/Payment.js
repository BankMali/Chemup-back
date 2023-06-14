module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      info: {
        type: DataTypes.STRING,
        allowNull: false, // cant firstName = null
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slipImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true, // carmelCase to underscore
    }
  );

  Payment.associate = (models) => {
    Payment.hasOne(models.Order, {
      foreignkey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Payment.belongsTo(models.UserCourse, {
      foreignkey: {
        name: "userCourseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Payment;
};
