module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define('Lesson', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,       // cant firstName = null
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
        underscored: true // carmelCase to underscore
    }
    )

  
    Lesson.associate = models => {
        Lesson.hasMany(models.SubLesson, {
            foreignkey: {
                name: 'lessonId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    Lesson.associate = models => {
        Lesson.hasMany(models.Course, {
            foreignkey: {
                name: 'lessonId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return Lesson
}