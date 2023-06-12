module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        amount: {
            type: DataTypes.STRING,
            allowNull: false,       // cant firstName = null
        },
        total_price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: DataTypes.STRING,
    },
    {
        underscored: true // carmelCase to underscore
    }
    )

    Order.associate = models => {
        Order.belongsTo(models.Course, {
            foreignkey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
        Order.hasOne(models.Payment, {
            foreignkey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
        Order.belongsTo(models.User, {
            foreignkey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return Order
}