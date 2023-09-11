const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    user:'root',
    host:'localhost',
    password:'root123',
    database:'sample'
});

module.exports = connection;