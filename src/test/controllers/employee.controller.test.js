const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const should = chai.should();
const employeeController = require("../../controllers/employee.controller");
const { Employee, Attendance } = require("../../models");
const { response } = require("express");

chai.use(chaiHttp);

describe("#employee-controller", () => {
  let employeeData = {
    empName: "kuttus",
    email: "kuttus@gmail.com",
    mobile: "8561071554",
    joiningDate: "2022-12-12",
    role: "Developer",
  };

  afterEach(function (done) {
    Employee.destroy({ where: {} })
      .then(function () {
        done();
      })
      .catch(function (err) {
        console.log(err);
        done();
      });
  });

  beforeEach(function (done) {
    Attendance.destroy({ where: {} })
      .then(function () {
        done();
      })
      .catch(function (err) {
        console.log(err);
        done();
      });
  });

  context("GET /employee", () => {
    it("it should GET all employees", function (done) {
      //this.timeout(5000);
      chai
        .request("http://localhost:8085/api/employee")
        .get("/employees")
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          res.body.result.should.be.a("array");
          res.body.should.have.property("totalItems");
          res.body.should.have.property("totalPages");
          res.body.should.have.property("currentPage");
          done();
        });
    });
  });

  context("POST /add-employee", () => {
    it("it should create an employee", (done) => {
      chai
        .request("http://localhost:8085/api/employee")
        .post("/add-employee")
        .send(employeeData)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          res.should.be.an("object");
          res.body.should.have.property("id");
          done();
        });
    });
  });

  context("POST /mark-attendance", () => {
    it("it should mark attendace of an employe", function (done) {
      Employee.create(employeeData).then((response) => {
        let data = {
          empId: response.id,
          date: "2023-05-07",
          status: "Present",
        };

        chai
          .request("http://localhost:8085/api/employee")
          .post("/mark-attendance")
          .send(data)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            res.should.have.status(200);
            res.should.be.an("object");
            res.body.should.have.property("empId");
            res.body.should.have.property("date");
            res.body.should.have.property("status");
            done();
          });
      });
    });
  });

  context("GET /get-attendance", () => {
    it("it should get attendace of an employee with given id", (done) => {
      Employee.create(employeeData).then((response) => {
        let data = {
          empId: response.id,
          date: "2023-05-07",
          status: "Present",
        };
        Attendance.create(data).then((response) => {
          chai
            .request("http://localhost:8085/api/employee")
            .get("/get-attendance")
            .query({
              page: "0",
              size: "3",
              empId: response.empId,
              sortBy: "date",
            })
            .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(200);
              res.should.be.an("object");
              res.body.should.have.property("totalItems");
              res.body.should.have.property("totalPages");
              res.body.should.have.property("currentPage");
              res.body.should.have.property("result").that.is.an("array");
              done();
            });
        });
      });
    });
  });

  context("GET /attendance-by-date", () => {
    it("it should get the full attendacne data for given date", (done) => {
      Employee.create(employeeData).then((response) => {
        let data = {
          empId: response.id,
          date: "2023-05-07",
          status: "Present",
        };
        Attendance.create(data).then((response) => {
          chai
            .request("http://localhost:8085/api/employee")
            .get("/attendace-by-date")
            .query({ date: data.date })
            .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(200);
              res.should.be.an("object");
              done();
            });
        });
      });
    });
  });

  context("GET /search-employee", () => {
    it("to get employees search by text(name)", function (done) {
      Employee.create(employeeData).then((response) => {
        const testString='ku'
        chai
          .request("http://localhost:8085/api/employee")
          .get("/search-employee")
          .query({ text: testString })
          .end((err, res) => {
           
            if (err) {
              done(err);
            }
            res.should.have.status(200)
            res.body.should.be.an("array");
            res.body[0]?.should?.have?.property("empName").that.includes(testString)
            done();
          });
      });
    });

    it("to should return error if no data found for search text(name)", function (done) {
      Employee.create(employeeData).then((response) => {
        const testString='soor'
        chai
          .request("http://localhost:8085/api/employee")
          .get("/search-employee")
          .query({ text: testString })
          .end((err, res) => {
           
            if (err) {
              done(err);
            }
            
            res.should.have.status(404)
            res.should.be.json;
            res.body.should.be.an('object');
            done();
          });
      });
    });
    
  });




});
