// Importa o módulo "mysql" para comunicar com bases de dados MySQL
const mysql = require('mysql');

// Importa as configurações da base de dados (servidor, utilizador, password, nome da BD)
const DBConfig = require('../config/db.config.js');

// Cria um objeto de ligação à base de dados MySQL com base nas configurações fornecidas
const connection = mysql.createConnection({
    host: DBConfig.DBSERVER,   
    user: DBConfig.DBUSER,     
    password: DBConfig.DBPASS, 
    database: DBConfig.DBNAME  
});


// Estabelece efetivamente a ligação à base de dados
// Se ocorrer um erro, a aplicação lança uma exceção e para
connection.connect(error => {
    if (error) throw error;
    console.log("Conexão à base de dados bem sucedida.");
});

// Exporta a ligação para que outros módulos (modelos, etc.) possam executar queries
module.exports = connection;