module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      quantity: {
        type: DataTypes.STRING,
        allowNull: false, // cant firstName = null
      },
      totalPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true, // carmelCase to underscore
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Course, {
      foreignkey: {
        name: "courseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Order.hasOne(models.Payment, {
      foreignkey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Order.belongsTo(models.User, {
      foreignkey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Order;
};
