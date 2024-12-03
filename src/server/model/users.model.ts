import { CommonColumn } from "../../module/default.module";
import { ModifiedBy } from "../../module/dto.module";
import { Optional, Model, Sequelize, DataTypes } from "sequelize";
import { BaseSequelizeAttribute, optionalSequelize } from "./common.model";

const { id, xid, version, modifiedBy, updatedAt, createdAt } = CommonColumn;

export interface UsersAttributes extends BaseSequelizeAttribute {
    username: string;
    birthDate: string;
    isMale: boolean;
    nik: string;
    noTelp: string;
    namaBank: string;
    noRek: string;
    namaRekening: string;
    alamatProvinsi: string;
    alamatKota: string;
    alamatKecamatan: string;
    jabatan: string;
    dateIn: string;
    email: string;
    password: string;
    pin: string;
}

export type UsersCreationAttributes = Optional<UsersAttributes, optionalSequelize>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
    id!: number;
    xid!: string;
    version!: number;
    modifiedBy!: ModifiedBy;
    updatedAt!: Date;
    createdAt!: Date;

    username!: string;
    birthDate!: string;
    isMale!: boolean;
    nik!: string;
    noTelp!: string;
    namaBank!: string;
    noRek!: string;
    namaRekening!: string;
    alamatProvinsi!: string;
    alamatKota!: string;
    alamatKecamatan!: string;
    jabatan!: string;
    dateIn!: string;
    email!: string;
    password!: string;
    pin!: string;

    static initModels(sequelize: Sequelize): typeof Users {
        return Users.init(
            {
                id,
                xid,
                version,
                modifiedBy,
                updatedAt,
                createdAt,
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                birthDate: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isMale: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                nik: {
                    type: DataTypes.STRING(16),
                    allowNull: false,
                    unique: true,
                },
                noTelp: {
                    type: DataTypes.STRING(13),
                    allowNull: false,
                    unique: true,
                },
                namaBank: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                noRek: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                namaRekening: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                alamatProvinsi: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                alamatKota: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                alamatKecamatan: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                jabatan: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                dateIn: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                pin: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "users",
                timestamps: false,
            }
        );
    }
}
