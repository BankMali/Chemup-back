module.exports = (sequelize, DataTypes) => {
    const SubLesson = sequelize.define('SubLesson', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,       // cant firstName = null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        video: {
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

    SubLesson.associate = models => {
        SubLesson.belongsTo(models.Lesson, {
            foreignkey: {
                name: 'sublessonId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }


    return SubLesson
}