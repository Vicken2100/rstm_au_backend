"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt, xid, modifiedBy } = CommonColumn;
const name = "gaji";

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
            jabatan: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gajiPokok: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            uangMakan: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            uangLembur: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            tunjanganKeluarga: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            tunjanganKesehatan: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
