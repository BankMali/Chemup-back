module.exports = (sequelize, DataTypes) => {
  const UserCourse = sequelize.define(
    "UserCourse",
    {
      startDate: {
        type: DataTypes.DATE,
        allowNull: false, // cant firstName = null
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      timeUse: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      timeMax: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  UserCourse.associate = (models) => {
    UserCourse.hasMany(models.Payment, {
      foreignkey: {
        name: "paymentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    UserCourse.belongsTo(models.Course, {
      foreignkey: {
        name: "courseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    UserCourse.belongsTo(models.User, {
      foreignkey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return UserCourse;
};
