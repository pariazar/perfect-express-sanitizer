# perfect express sanitizer
[![npm](https://img.shields.io/npm/v/perfect-express-sanitizer.svg?style=flat-square)](https://www.npmjs.com/package/perfect-express-sanitizer)

![alt text](https://github.com/hamedpa/perfect-express-sanitizer/blob/master/img/logo.png?raw=true)


A complete package to control user input data to prevent Cross Site Scripting (XSS) ,Sql injection and no Sql injection attack.

it can control body, query and header of the requests and clear all dirty stuff that might effect on functionally of the application.

## Installation
Install via NPM:

```bash
npm install perfect-express-sanitizer

```

## Usage

#### simple usage

control input base on your requirements.
```javascript

const sanitizer = require("perfect-express-sanitizer");

app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    level: 5
}));
```

#### advance usage
use white list for some routes that you want to skip ignore
```javascript

const whiteList = ['/users', '/users/list', '/users/search?age'];

app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    noSqlLevel: 5,
    sqlLevel: 1
}, whiteList));
```
you can use more option 
setting level from 1 to 5 for sql or nosql sanitizer.
higher level suggested and it will check more keywords. 
```javascript

const sanitizer = require("perfect-express-sanitizer");

app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    sqlLevel: 5,
    noSqlLevel: 5
}));
```
you can add options to specify allowed keys to be skipped at sanitization

```javascript

app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    sqlLevel: 5,
    noSqlLevel: 5,
    allowedKeys: ['name']
}));
```
you can add options to specify allowed tags to sanitize it and remove other tags

```javascript

app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    sqlLevel: 5,
    noSqlLevel: 5,
    allowedKeys: ['h1']
}));
```
#### Usage as method
```javascript

const sanitize = require("perfect-express-sanitizer");

console.log(sanitize("<script>alert('test')</script>", { xss: true, noSql: true, sql: true, level: 5 }));
```

## License

This project is licensed under the terms of the
MIT license
