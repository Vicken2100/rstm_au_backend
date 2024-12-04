"use strict";

const { ulid } = require("ulidx");
const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt, xid, modifiedBy } = CommonColumn;
const name = "user";
const bcrypt = require("bcrypt");
const { Constants } = require("../constants");

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

        const password = await bcrypt.hash("Admin123!", 10);

        await queryInterface.bulkInsert(name, [
            {
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                xid: ulid(),
                modifiedBy: Constants.DEFAULT_MODIFIED_BY,
                username: "admin",
                birthDate: "1990-01-01",
                isMale: true,
                nik: "1234567890123456",
                noTelp: "081234567890",
                namaBank: "Bank BCA",
                noRek: "1234567890",
                namaRekening: "Admin System",
                alamatProvinsi: "DKI Jakarta",
                alamatKota: "Jakarta Selatan",
                alamatKecamatan: "Kebayoran Baru",
                jabatan: "admin",
                dateIn: "2024-01-01",
                email: "admin@gmail.com",
                password: password,
                pin: "483481",
            },
        ]);
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
