
const request = require("supertest");
const { expect } = require("chai");
const { sanitize } = require("../index");

describe("try to detect dirty input", function () {
    it("should detect xss dirty input", function () {
        const dirtyXss = "bob is the <'alert(1)";
        const cleanInput = "bob send a picture";

        const xssResult = sanitize.detectXss(dirtyXss);
        expect(xssResult).to.equal(true);

        const cleanResult = sanitize.detectXss(cleanInput);
        expect(cleanResult).to.equal(false);

    });
    it("should detect sql dirty input", function () {
        const dirtySql = " bob try to create table ";
        const cleanInput = "bob send a picture";

        //detect sql injection
        const sqlResult = sanitize.detectSqlInj(dirtySql);
        expect(sqlResult).to.equal(true);

        const cleanResultSql = sanitize.detectSqlInj(cleanInput);
        expect(cleanResultSql).to.equal(false);

    });
    it("should detect nosql dirty input", function () {
        //detect nosql injection
        const dirtynoSql = "bob try to findOne";
        const cleanInput = "bob send a picture";

        const noSqlResult = sanitize.detectNoSqlInj(dirtynoSql);
        expect(noSqlResult).to.equal(true);

        const cleanResultNoSql = sanitize.detectNoSqlInj(cleanInput);
        expect(cleanResultNoSql).to.equal(false);
    });
});