const express = require("express");
const cors = require("cors");
const db = require("./src/models");
const app = express();
const userRoute=require('./src/routes/employee.router')
require('dotenv').config()
const chalk = require('chalk');
const ip = require('ip');



var corsOptions = {
  origin: "http://localhost:8085"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use('/api/employee',userRoute)


db.sequelize.sync()
  .then(() => {
    console.log(`${chalk.magenta('db synced')}`);
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  })

// set port, listen for requests
const divider = chalk.gray('\n-----------------------------------------------------------');

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://localhost:${PORT}`)}
On Your Network: ${chalk.magenta(`http://${ip.address()}:${PORT}`)}${divider}
`);
});
