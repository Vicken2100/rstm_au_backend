"use strict";

const name = "presensi";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(name, "statusPayment", {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.removeColumn(name, "statusPayment");
    },
};
