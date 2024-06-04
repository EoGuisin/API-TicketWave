const DataTypes = require('sequelize');
const database = require('./db');

const Evento = database.define('evento', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    area: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    logradouro: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    localidade: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    uf: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10,6),
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL(10,6),
        allowNull: true,
    },
    atracoes: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, { freezeTableName: true , timestamps: false});

module.exports = Evento;