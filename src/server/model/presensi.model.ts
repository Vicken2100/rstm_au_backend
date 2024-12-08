import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { Optional, Model, Sequelize, DataTypes } from "sequelize";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface PresensiAttributes extends BaseSequelizeAttribute {
    userID: number;
    userName: string;
    jabatan: string;
    date: string;
    start: string | null;
    end: string | null;
    isOnTime: boolean;
    location: string | null;
    mealPay: number;
    overtimePay: number;
    information: string;
    statusPayment: boolean;
}

export interface AttendanceStats {
    userName: string;
    hadir: number;
    sakit: number;
    izin: number;
    cuti: number;
    alpha: number;
    totalDays: number;
}

export interface PresensiStats {
    userName: string;
    hadir: number;
    onTime: number;
    lembur: number;
}

export type PresensiCreationAttributes = Optional<PresensiAttributes, optionalSequelize>;

export class Presensi extends Model<PresensiAttributes, PresensiCreationAttributes> implements PresensiAttributes {
    id!: number;
    xid!: string;
    version!: number;
    modifiedBy!: ModifiedBy;
    updatedAt!: Date;
    createdAt!: Date;

    userID!: number;
    userName!: string;
    jabatan!: string;
    date!: string;
    start!: string | null;
    end!: string | null;
    isOnTime!: boolean;
    location!: string | null;
    mealPay!: number;
    overtimePay!: number;
    information!: string;
    statusPayment!: boolean;

    static initModels(sequelize: Sequelize): typeof Presensi {
        return Presensi.init(
            {
                id,
                xid,
                version,
                modifiedBy,
                updatedAt,
                createdAt,
                userID: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                userName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                jabatan: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                date: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                start: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                end: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                isOnTime: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                mealPay: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                overtimePay: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                information: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                statusPayment: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                tableName: "presensi",
                timestamps: false,
            }
        );
    }
}
