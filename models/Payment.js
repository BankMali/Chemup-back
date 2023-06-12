module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        info: {
            type: DataTypes.STRING,
            allowNull: false,       // cant firstName = null
        },
        status: DataTypes.STRING,
        slipImg :DataTypes.STRING,
    },
    {
        underscored: true ,// carmelCase to underscore
    }
    )

    Payment.associate = models => {
        Payment.belongsTo(models.Order, {
            foreignkey: {
                name: 'paymentId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
        Payment.belongsTo(models.UserCourse, {
            foreignkey: {
                name: 'paymentId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return Payment
}