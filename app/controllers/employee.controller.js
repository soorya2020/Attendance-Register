const db = require("../models");
const helper = require("../helpers/employeeHelper");
const logger=require('../logger/logger')
const Employee = db.Employee;
const Attendance = db.Attendance;
const Op = db.Sequelize.Op;

//demo api
module.exports.test = (req, res) => {
  logger(req, req.metadata, 25);
  res.send("hellow soorya everything is working");
};

//create employee
module.exports.create = (req, res) => {
  const empData = req.body;

  Employee.create(empData)
    .then((data) => {
      
      res.send(data);

    })
    .catch((err) => {
      res.send(err.errors[0].message);

    });
};

//find all employees
module.exports.findAll = async (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = helper.getPagination(page, size);

  const data = await Employee.findAndCountAll({ limit, offset });

  const response = helper.getPaginationData(data, page, limit);

  res.send(response);
};

//mark attendence to employee
module.exports.markAttendance = async (req, res) => {
  try {
    let { empId, date, status } = req.body;
    // date=new Date(date)
    // console.log(date);

    const response = await Attendance.create({ empId, date, status });

    console.log(response);

    res.status(200).send(response);
  } catch (err) {
    res.status(err.status || 500).send(err.parent.sqlMessage);
  }
};

//get attendace of an employee
module.exports.getAttendance = async (req, res) => {
  try {
    const { page, size, empId, sortBy } = req.query;

    const { limit, offset } = helper.getPagination(page, size);

    const data = await Attendance.findAndCountAll({
      attributes: ["date", "status"],
      where: { empId },
      order: [[`${sortBy}`, "ASC"]],
      offset,
      limit,
    });

    const response = helper.getPaginationData(data, page, limit);

    res.send(response);
  } catch (err) {
    console.log(err);
    res.send(err.parent.code);
  }
};

//get attendace record for a given date
module.exports.getAllAttendace = async (req, res) => {
  try {
    const date = new Date(req.query.date);

    const data = await Attendance.findAll({
      attributes: ["empId", "status"],
      where: {
        date: date,
      },
    });

    res.send(data);

  } catch (error) {

    console.log(error);
    res.send(error);
  }
};

//search employee name by text
module.exports.searchByText = async (req, res) => {
  try {
    const text = req.query.text;

    const data = await Employee.findAll({
      where: {
        empName: {
          [Op.like]: `%${text}%`,
        },
      },
    });

    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
