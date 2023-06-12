module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define('Lesson', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,       // cant firstName = null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        }
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
        Lesson.belongsTo(models.Course, {
            foreignkey: {
                name: 'lessonId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return Lesson
}