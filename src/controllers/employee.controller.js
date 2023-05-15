const db = require("../models");
const helper = require("../helpers/employeeHelper");
const loggerFormat=require('../logger/logger');

const Employee = db.Employee;
const Attendance = db.Attendance;
const Op = db.Sequelize.Op;

const duration=0.005

//demo api
module.exports.test = (req, res) => {
  loggerFormat(req, req.metadata, 25);
  res.send("hellow soorya everything is working");
};

//create employee
module.exports.create = (req, res) => {
  const empData = req.body;

  Employee.create(empData)
    .then((data) => {
      
      loggerFormat(req, req.metadata, duration);
      res.status(200).send(data);

    })
    .catch((err) => {
      loggerFormat(req, req.metadata, duration);
      res.status(500).send(err.errors[0].message);

    });
};

//find all employees
module.exports.findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = helper.getPagination({page, size});
    const data = await Employee.findAndCountAll({ limit, offset }); 
    const response = helper.getPaginationData(data, page, limit);

    loggerFormat(req, req.metadata, duration);
    res.send(response);

  } catch (error) {

    loggerFormat(req, req.metadata, duration);
    res.status(500).send(error)
  }
};

//mark attendence to employee
module.exports.markAttendance = async (req, res) => {
  try {
    let { empId, date, status } = req.body;
    const response = await Attendance.create({ empId, date, status });

    loggerFormat(req, req.metadata, duration);
    res.status(200).send(response);

  } catch (err) {

    loggerFormat(req, req.metadata, duration);
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

    loggerFormat(req, req.metadata, duration);
    res.send(response);

  } catch (err) {

    loggerFormat(req, req.metadata, duration);
    res.status(500).send(err.parent.code);
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

    loggerFormat(req, req.metadata, duration);
    res.send(data);

  } catch (error) {

    loggerFormat(req, req.metadata, duration);
    res.status(500).send(error);
  }
};

//search employee name by text
module.exports.searchByText = async (req, res) => {
  try {
    const startTime = Date.now();
    const text = req.query.text;
    const data = await Employee.findAll({
      where: {
        empName: {
          [Op.like]: `%${text}%`,
        },
      },
    });

    if(data.length===0) throw new Error('data not found')

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    loggerFormat(req, req.metadata, duration);

    res.send(data);
  } catch (error) {

    loggerFormat(req, req.metadata, duration);
    res.status(404).send({error});
  }
};



