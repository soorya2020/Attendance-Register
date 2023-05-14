const express = require("express");
const cors = require("cors");
const db = require("./src/models");
const app = express();
const userRoute=require('./src/routes/employee.router')
require('dotenv').config()


var corsOptions = {
  origin: "http://localhost:8085"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use('/api/employee',userRoute)


db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
