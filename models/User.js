module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      firstName: {
          type: DataTypes.STRING,
          allowNull: false,       // cant firstName = null
          validate: {
              notEmpty: true      // cant firstname = ' '
          }
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          vlidate: {
              notEmpty: true
          }
      },
      address: {
          type: DataTypes.STRING,
          allowNull: false,
          vlidate: {
              notEmpty: true
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          vlidate: {
              notEmpty: true
          }
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
              isEmail: true
          }
      },
      mobile: {
          type: DataTypes.STRING,
          // allowNull: true,
          unique: true,
          validate: {
              is:/^[0-9]{10}$/
          }
      },
      schoolName: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
              notEmpty: false
          }
      },
      role: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      profileImage :DataTypes.STRING,
  },
  {
      underscored: true // carmelCase to underscore
  }
  )

  User.associate = models => {
      User.hasMany(models.Order, {
          foreignkey: {
              name: 'userId',
              allowNull: false
          },
          onDelete: 'RESTRICT'
      })
      User.hasMany(models.UserCourse, {
          foreignkey: {
              name: 'userId',
              allowNull: false
          },
          onDelete: 'RESTRICT'
      })
  }

  return User
}