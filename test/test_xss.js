
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { expect } = require("chai");
const { clean, sanitize } = require("../index");

describe("Express xss Sanitize", function () {
    describe("Sanitize all parts with default settings as middleware before routes", function () {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        const whiteList = ['/list/users'];

        app.use(clean({
            xss: true,
            noSql: true,
        }, whiteList));


        app.post("/body", function (req, res) {
            res.status(200).json({
                body: req.body,
            });
        });

        app.post("/headers", function (req, res) {
            res.status(200).json({
                headers: req.headers,
            });
        });

        app.get("/query", function (req, res) {
            res.status(200).json({
                query: req.query,
            });
        });

        app.post("/list/users", function (req, res) {
            res.status(200).json({
                body: req.body,
            });
        });
        describe("Sanitize simple object", function () {
            it("should sanitize clean body.", function (done) {
                request(app)
                    .post("/body")
                    .send({
                        y: 4,
                        z: false,
                        w: "bla bla",
                        a: "<p>Test</p>",
                    })
                    .expect(
                        200,
                        {
                            body: {
                                y: 4,
                                z: false,
                                w: "bla bla",
                                a: "<p>Test</p>",
                            },
                        },
                        done,
                    );
            });

            it("should sanitize clean headers.", function (done) {
                request(app)
                    .post("/headers")
                    .set({
                        y: "4",
                        z: "false",
                        w: "bla bla",
                        a: "<p>Test</p>",
                    })
                    .expect(200)
                    .expect(function (res) {
                        expect(res.body.headers).to.include({
                            y: "4",
                            z: "false",
                            w: "bla bla",
                            a: "<p>Test</p>",
                        });
                    })
                    .end(done);
            });

            it("should sanitize clean query.", function (done) {
                request(app)
                    .get("/query?y=4&z=false&w=bla bla&a=<p>Test</p>")
                    .expect(
                        200,
                        {
                            query: {
                                y: "4",
                                z: "false",
                                w: "bla bla",
                                a: "<p>Test</p>",
                            },
                        },
                        done,
                    );
            });

            it("should sanitize dirty body.", function (done) {
                request(app)
                    .post("/body")
                    .send({
                        a: "<script>alert(1);</script>",
                        b: '<p onclick="return;">Test</p>',
                        c: '<img src="/"/>',
                    })
                    .expect(
                        200,
                        {
                            body: {
                                a: "",
                                b: "<p>Test</p>",
                                c: "",
                            },
                        },
                        done,
                    );
            });

            it("should sanitize dirty query.", function (done) {
                request(app)
                    .get(
                        '/query?a=<script>Test</script>&b=<p onclick="return;">Test</p>&c=<img src="/"/>',
                    )
                    .expect(
                        200,
                        {
                            query: {
                                a: "",
                                b: "<p>Test</p>",
                                c: "",
                            },
                        },
                        done,
                    );
            });

            it("should sanitize dirty headers.", function (done) {
                request(app)
                    .post("/headers")
                    .set({
                        a: "<script>Test</script>",
                        b: '<p onclick="return;">Test</p>',
                        c: '<img src="/"/>',
                    })
                    .expect(200)
                    .expect(function (res) {
                        expect(res.body.headers).to.include({
                            a: "",
                            b: "<p>Test</p>",
                            c: "",
                        });
                    })
                    .end(done);
            });

            it("should sanitize exceptional route in white list with dirty body.", function (done) {
                request(app)
                    .post("/list/users")
                    .send({
                        a: "<script>alert(1);</script>",
                        b: '<p onclick="return;">Test</p>',
                        c: '<img src="/"/>',
                    })
                    .expect(
                        200,
                        {
                            body: {
                                a: "<script>alert(1);</script>",
                                b: '<p onclick="return;">Test</p>',
                                c: '<img src="/"/>',
                            },
                        },
                        done,
                    );
            });
        });
    });
    describe("Sanitize only limited parts as middleware before all routes", function () {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use(clean({
            xss: true,
            noSql: true,
        }, whiteList = [], only = ["body"]));


        app.post("/body", function (req, res) {
            res.status(200).json({
                body: req.body,
            });
        });

        app.post("/headers", function (req, res) {
            res.status(200).json({
                headers: req.headers,
            });
        });

        app.get("/query", function (req, res) {
            res.status(200).json({
                query: req.query,
            });
        });

        app.post("/list/users", function (req, res) {
            res.status(200).json({
                body: req.body,
            });
        });
        describe("Sanitize simple object", function () {
            it("should sanitize clean body.", function (done) {
                request(app)
                    .post("/body")
                    .send({
                        y: 4,
                        z: false,
                        w: "bla bla",
                        a: "<p>Test</p>",
                    })
                    .expect(
                        200,
                        {
                            body: {
                                y: 4,
                                z: false,
                                w: "bla bla",
                                a: "<p>Test</p>",
                            },
                        },
                        done,
                    );
            });

            it("should sanitize dirty body.", function (done) {
                request(app)
                    .post("/body")
                    .send({
                        a: "<script>alert(1);</script>",
                        b: '<p onclick="return;">Test</p>',
                        c: '<img src="/"/>',
                    })
                    .expect(
                        200,
                        {
                            body: {
                                a: "",
                                b: "<p>Test</p>",
                                c: "",
                            },
                        },
                        done,
                    );
            });

            it("shouldn't sanitize dirty query.", function (done) {
                request(app)
                    .get(
                        '/query?a=<script>Test</script>&b=<p onclick="return;">Test</p>&c=<img src="/"/>',
                    )
                    .expect(
                        200,
                        {
                            query: {
                                a: '<script>Test</script>',
                                b: '<p onclick="return;">Test</p>',
                                c: '<img src="/"/>'
                            },
                        },
                        done,
                    );
            });

            it("shouldn't sanitize dirty headers.", function (done) {
                request(app)
                    .post("/headers")
                    .set({
                        a: "<script>Test</script>",
                        b: '<p onclick="return;">Test</p>',
                        c: '<img src="/"/>',
                    })
                    .expect(200)
                    .expect(function (res) {
                        expect(res.body.headers).to.include({
                            a: '<script>Test</script>',
                            b: '<p onclick="return;">Test</p>',
                            c: '<img src="/"/>'
                        });
                    })
                    .end(done);
            });

            it("should sanitize exceptional route with dirty body.", function (done) {
                request(app)
                    .post("/list/users")
                    .send({
                        a: "<script>alert(1);</script>",
                        b: '<p onclick="return;">Test</p>',
                        c: '<img src="/"/>',
                    })
                    .expect(
                        200,
                        {
                            body: {
                                a: "",
                                b: '<p>Test</p>',
                                c: '',
                            },
                        },
                        done,
                    );
            });
            it("use as method", function () {
                const perfectExpressSanitizer = require("../index");
                const result = perfectExpressSanitizer.sanitize.prepareSanitize("<script>alert('test')</script> bob miler", { xss: true, noSql: true, sql: true, level: 5 });
                expect(result).to.equal(' bob miler');
            });
            it("test static digit", function () {
                const perfectExpressSanitizer = require("../index");
                const cleanResult = perfectExpressSanitizer.sanitize.prepareSanitize("55-56-89-85", { xss: true, noSql: true, sql: true, level: 5 });
                const dirtyResult = perfectExpressSanitizer.sanitize.prepareSanitize("55-56-89-85;'Drop'", { xss: true, noSql: true, sql: true, level: 5 });
                expect(cleanResult).to.equal('55-56-89-85');
                expect(dirtyResult).to.equal('55-56-89-85');
            });
        });
    });
});