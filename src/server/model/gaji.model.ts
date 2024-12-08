import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { Optional, Model, Sequelize, DataTypes } from "sequelize";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface GajiAttributes extends BaseSequelizeAttribute {
    userID: number;
    userName: string;
    jabatan: string;
    gajiPokok: number;
    uangMakan: number;
    uangLembur: number;
    tunjanganKeluarga: number;
    tunjanganKesehatan: number;
}

export type GajiCreationAttributes = Optional<GajiAttributes, optionalSequelize>;

export class Gaji extends Model<GajiAttributes, GajiCreationAttributes> implements GajiAttributes {
    id!: number;
    xid!: string;
    version!: number;
    modifiedBy!: ModifiedBy;
    updatedAt!: Date;
    createdAt!: Date;

    userID!: number;
    userName!: string;
    jabatan!: string;
    gajiPokok!: number;
    uangMakan!: number;
    uangLembur!: number;
    tunjanganKeluarga!: number;
    tunjanganKesehatan!: number;

    static initModels(sequelize: Sequelize): typeof Gaji {
        return Gaji.init(
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
                gajiPokok: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                uangMakan: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                uangLembur: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                tunjanganKeluarga: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                tunjanganKesehatan: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "gaji",
                timestamps: false,
            }
        );
    }
}
