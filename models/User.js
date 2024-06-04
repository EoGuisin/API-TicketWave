const DataTypes = require('sequelize');
const database = require('./db');

const Usuario = database.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING(100)	,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100)	,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.CHAR(11),
        allowNull: false,
    },
    nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, { freezeTableName: true , timestamps: false});

module.exports = Usuario;