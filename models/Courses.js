module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,       // cant firstName = null
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
            allowNull: false,
        },
        status: DataTypes.STRING,
        courseImg :DataTypes.STRING,
    },
    {
        underscored: true // carmelCase to underscore
    }
    )

    Course.associate = models => {
        Course.hasMany(models.Lesson, {
            foreignkey: {
                name: 'courseId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
        Course.belongsTo(models.UserCourse, {
            foreignkey: {
                name: 'courseId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
        Course.belongsTo(models.Order, {
            foreignkey: {
                name: 'courseId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return Course
}