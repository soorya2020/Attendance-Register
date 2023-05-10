module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Root@123",
  DB: "soorya",
  dialect: "mysql", 
  dialectOptions: {
    useUTC: true, // tell the driver you want to use UTC
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
