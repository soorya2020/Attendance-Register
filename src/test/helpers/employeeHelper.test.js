const chai = require("chai");
const should = chai.should();
const employeeHelper = require("../../helpers/employeeHelper");

describe("#employee-controller", () => {
  context("getPagination", () => {
    it("should return default values if no query parameters are provided", function () {
      const result = employeeHelper.getPagination();
      result.should.deep.equal({
        offset: 0,
        limit: 3,
      });
    });

    it("should return the provided offset and limit if both are provided", function () {
      let page, size 
      const result = employeeHelper.getPagination({page:10, size:5})
      result.should.deep.equal({
        offset: 50,
        limit: 5,
      });
    });

    it("should return the provided offset and default limit if only offset is provided", function () {
      const result = employeeHelper.getPagination({page :10});
      result.should.deep.equal({
        offset: 30,
        limit: 3,
      });
    });


  });
});
