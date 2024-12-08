"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt, xid, modifiedBy } = CommonColumn;
const name = "presensi";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(name, {
            id,
            version,
            createdAt,
            updatedAt,
            xid,
            modifiedBy,
            userID: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            date: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            jabatan: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            start: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            end: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            isOnTime: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            mealPay: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            overtimePay: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            information: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
