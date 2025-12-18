const mysql = require('mysql');
const DBConfig = require('../config/db.config.js');

const connection = mysql.createConnection({
    host: DBConfig.DBSERVER,
    user: DBConfig.DBUSER,
    password: DBConfig.DBPASS,
    database: DBConfig.DBNAME
});


connection.connect(error => {
    if (error) throw error;
    console.log("Conexão à base de dados bem sucedida.");
});

module.exports = connection;