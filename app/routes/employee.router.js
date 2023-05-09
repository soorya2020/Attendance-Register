const router=require('express').Router()
const employee = require("../controllers/employee.controller.js");


// Create a new Employee
router.get("/", employee.test);

router.post('/add',employee.create)

router.get('/employees',employee.findAll)

router.get('/attendace',employee.markAttendance)

// router.

// Fetch all Employee
// router.get("/", (req,res)=>{
//   res.send('machane kitti poi')
// });




module.exports=router