const { Sequelize } = require('sequelize');

const database = new Sequelize('ticketwave', 'root', 'Welcome0902@Ronaldoe10',  {
    host: 'localhost',
    dialect: 'mysql'
});

// Deixar apenas esse Log em desenvolivmento, não enviar em produção com o código abaixo.
database.authenticate()
    .then(function () { 
        console.log('Connection to the database was successful!');
        
    }).catch(function () {
        console.error('Database connection error!');
    })

module.exports = database;