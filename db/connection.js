const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '198small',
    database: 'biznesstracker'
});

module.exports = db;