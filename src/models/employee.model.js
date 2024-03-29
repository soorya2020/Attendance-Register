const EmployeeModel = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      empName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      joiningDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Employee;
  };
  
  module.exports = EmployeeModel;
  