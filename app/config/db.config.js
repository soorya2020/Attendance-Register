module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Root@123",
  DB: "soorya",
  dialect: "mysql", 
  // dialectOptions: {
  //   useUTC: true, // reading
  // },
  // timezone:'+08:00',//writing

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

