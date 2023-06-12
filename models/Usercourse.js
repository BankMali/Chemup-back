module.exports = (sequelize, DataTypes) => {
    const UserCourse = sequelize.define('UserCourse', {
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,       // cant firstName = null
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
        status: DataTypes.STRING,
    },
    {
        underscored: true 
    }
    )

    UserCourse.associate = models => {
        UserCourse.belongsTo(models.Payment, {
            foreignkey: {
                name: 'usercourseId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
        UserCourse.belongsTo(models.Course, {
            foreignkey: {
                name: 'usercourseId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
        UserCourse.belongsTo(models.User, {
            foreignkey: {
                name: 'usercourseId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return UserCourse
}