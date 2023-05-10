const router=require('express').Router()
const employee = require("../controllers/employee.controller.js");


// Create a new Employee
router.get("/", employee.test);

router.post('/add',employee.create)

router.get('/employees',employee.findAll)

router.post('/mark-attendance/',employee.markAttendance)

router.get('/get-attendance/',employee.getAttendance)

router.get('/attendace-by-date',employee.getAllAttendace)

router.get('/search-employee',employee.searchByText)

// router.

// Fetch all Employee
// router.get("/", (req,res)=>{
//   res.send('machane kitti poi')
// });




module.exports=router