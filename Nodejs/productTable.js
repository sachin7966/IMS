
const { INTEGER, STRING } = require('sequelize');
const { sequelize } = require('./database');

const Products = sequelize.define("products", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    price: {
        type: INTEGER,
        allowNull: false,
    },
    category: {
        type: STRING,
        allowNull: false,
    },
    qty: {
        type: INTEGER,
        allowNull: false,
    },
}, { timestamps: false, freezeTableName: false });

module.exports = { Products }