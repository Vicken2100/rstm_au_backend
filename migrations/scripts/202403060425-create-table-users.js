"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt, xid, modifiedBy } = CommonColumn;
const name = "user";
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
            username: {
                type: Sequelize.STRING(150),
                unique: true,
                allowNull: false,
            },
            birthDate: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            isMale: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            nik: {
                type: Sequelize.STRING(16),
                allowNull: false,
                unique: true,
            },
            noTelp: {
                type: Sequelize.STRING(13),
                unique: true,
                allowNull: false,
            },
            namaBank: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            noRek: {
                type: Sequelize.STRING(150),
                unique: true,
                allowNull: false,
            },
            namaRekening: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            alamatProvinsi: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            alamatKota: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            alamatKecamatan: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            jabatan: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            dateIn: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(150),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            pin: {
                type: Sequelize.STRING(10),
                unique: true,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
