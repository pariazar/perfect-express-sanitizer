# Perfect Express Sanitizer
[![npm](https://img.shields.io/npm/v/perfect-express-sanitizer.svg?style=flat-square)](https://www.npmjs.com/package/perfect-express-sanitizer)

![building workflow](https://github.com/hamedpa/perfect-express-sanitizer/actions/workflows/actions.yml/badge.svg)

![perfect_express_sanitizer banner](https://github.com/hamedpa/perfect-express-sanitizer/blob/master/img/logo.png?raw=true)


A complete package to control user input data to prevent Cross Site Scripting (XSS) ,Sql injection and no Sql injection attack.

it can control body, query and header of the requests and clear all dirty stuff that might effect on your application.

## Installation
Install via NPM:

```bash
npm install perfect-express-sanitizer
```

## Usage

#### simple usage

This package is not limited to express and you can easily use it by calling method in every JS project.
```javascript

const perfectExpressSanitizer = require("perfect-express-sanitizer");

const input = perfectExpressSanitizer.sanitize.prepareSanitize(
    "<script>alert('test')</script> bob miler",
     { xss: true, noSql: true, sql: true, level: 5 });
console.log(input);

//------------ output ---------------
// " bob miler"
```
##### Middleware
control input base on your requirements.
```javascript

const sanitizer = require("perfect-express-sanitizer");

app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true
}));
```

#### advance usage
##### WhiteList

use white list for some routes that you want to skip ignore
```javascript

const whiteList = ['/users', '/users/list', '/users/search?age'];

app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true
}, whiteList));
```

##### Limit sanitizing inputs
by default, this package sanitize all inputs from body, query and header you can custom parts that you want to filter and sanitize user inputs. </br> for example you want to sanitize only body and query you can use below config.

```javascript

app.use(sanitizer.clean({
            xss: true,
            noSql: true,
        }, whiteList = [], only = ["body", "query"]));
```

##### Levels
setting level from 1 to 5 for sql or nosql sanitizer.
<!-- ![alt text](https://github.com/hamedpa/perfect-express-sanitizer/blob/master/img/levels.png?raw=true) -->
<img src="./img/levels.png">

higher level contain lower level policies and check more keywords 
why define different level?
sometimes you need to check only general keywords and all of your routes or some of them sending query or you don't need to set entire policies for them at this point you can set proper level for your application, higher level suggested.



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

#### checking user input and detecting injection
you can check user input that it has dangerous keywords or not! with below code.

```javascript
const perfectExpressSanitizer = require("perfect-express-sanitizer");

//xss
const result = await perfectExpressSanitizer.detectXss('bob try to <"alert(1)');
console.log(result);
//------------ output ---------------
//true

//Sql Injection
const result = await perfectExpressSanitizer.detectSqlInjection(' bob try to create table', 5);
  console.log(result);
//------------ output ---------------
//true

//NoSql Injection
const result = await perfectExpressSanitizer.detectNoSqlInjection('bob try to findOne', 5);
console.log(result);
//------------ output ---------------
//true
```
## Support
  - [Bug Reports](https://github.com/hamedpa/perfect-express-sanitizer/issues/)

## Contributors
<p>
Pull requests are always welcome! Please base pull requests against the main branch and follow the contributing guide.

if your pull requests makes documentation changes, please update readme file.
</p>

## License

This project is licensed under the terms of the
MIT license
