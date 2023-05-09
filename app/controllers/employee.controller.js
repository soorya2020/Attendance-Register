
const db = require("../models");
const helper=require('../helpers/employeeHelper')
const Employee = db.Employee;
const Attendance = db.Attendance;
const Op = db.Sequelize.Op;

module.exports.test=(req,res)=>{
  res.send('hellow soorya everything is working')
}

module.exports.create = (req, res) => {
 
  const empData=req.body

  Employee.create(empData)
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      res.send(err.errors[0].message)
    })

};

module.exports.findAll=async(req,res)=>{

  const {page,size}=req.query

  const {limit,offset}=helper.getPagination(page,size)

  const data=await Employee.findAndCountAll({limit,offset})

  const response=helper.getPaginationData(data,page,limit)

  res.send(response)

}

module.exports.markAttendance=async(req,res)=>{

  const {empName,email}=req.query
  
  const data=await Employee.findOne({where:{empName,email},attributes:['id']})

  res.send({data})

}