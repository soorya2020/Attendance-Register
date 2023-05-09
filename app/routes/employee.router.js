const router=require('express').Router()
const tutorials = require("../controllers/employee.controller.js");


// Create a new Employee
router.post("/", tutorials.create);

// Fetch all Employee
router.get("/", (req,res)=>{
  res.send('machane kitti poi')
});




module.exports=router