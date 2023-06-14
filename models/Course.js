module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // cant firstName = null
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      courseImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true, // carmelCase to underscore
    }
  );

  // Course.associate = models => {
  //     Course.hasMany(models.Lesson, {
  //         foreignkey:  'a',
  //         onDelete: 'RESTRICT'
  //     })
  //     Course.belongsTo(models.UserCourse, {
  //         foreignkey: {
  //             name: 'courseId',
  //             allowNull: false
  //         },
  //         onDelete: 'RESTRICT'
  //     })
  //     Course.belongsTo(models.Order, {
  //         foreignkey: {
  //             name: 'courseId',
  //             allowNull: false
  //         },
  //         onDelete: 'RESTRICT'
  //     })
  // }
  Course.associate = (models) => {
    Course.hasMany(models.Lesson, {
      foreignKey: {
        name: "courseId",
        allowNull: false,
      },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
    Course.hasMany(models.UserCourse, {
      foreignkey: {
        name: "userCourseId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Course.hasMany(models.Order, {
      foreignkey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Course;
};
