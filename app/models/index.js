const dbConfig = require("../config/db.config.js");
const EmployeeModel = require('./employee.model');
const AttendanceModel = require('./attendance.model');
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
}); 

const Employee = EmployeeModel(sequelize, Sequelize);
const Attendance = AttendanceModel(sequelize, Sequelize);

Employee.hasMany(Attendance, {
  foreignKey: 'empId',
  
});

Attendance.belongsTo(Employee, {
  foreignKey: 'empId',
 
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Employee = Employee;
db.Attendance = Attendance;




module.exports = db;
