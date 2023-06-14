module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define(
    "Lesson",
    {
      lessonName: {
        type: DataTypes.STRING,
        allowNull: false, // cant firstName = null
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true, // carmelCase to underscore
    }
  );

  // Lesson.associate = models => {
  //     Lesson.hasMany(models.SubLesson, {
  //         foreignkey: {
  //             name: 'lessonId',
  //             allowNull: false,
  //         },
  //         onDelete: 'RESTRICT'
  //     })
  //     Lesson.belongsTo(models.Course, {
  //         foreignkey: {
  //             name: 'a',
  //             allowNull: false
  //         },
  //         onDelete: 'CASCADE'
  //     })
  // }

  Lesson.associate = (models) => {
    Lesson.belongsTo(models.Course, {
      foreignKey: { name: "courseId", allowNull: false },
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
    Lesson.hasMany(models.SubLesson, {
      foreignkey: "lessonId",
      allowNull: false,
      onDelete: "RESTRICT",
    });
  };

  return Lesson;
};
