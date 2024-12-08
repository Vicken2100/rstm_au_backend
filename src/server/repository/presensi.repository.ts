import { Op, Order, Sequelize, WhereOptions } from "sequelize";
import { AppDataSource } from "../../module/datasource.module";
import { FindResult, List_Payload } from "../../module/dto.module";
import {
    AttendanceStats,
    Presensi,
    PresensiAttributes,
    PresensiCreationAttributes,
    PresensiStats,
} from "../model/presensi.model";
import { BaseRepository } from "./base.repository";
import { PresensiRepository } from "../../contract/repository.contract";

export class SequelizePresensiRepository extends BaseRepository implements PresensiRepository {
    private presensi!: typeof Presensi;

    init(datasource: AppDataSource): void {
        this.presensi = datasource.sqlModel.Presensi;
    }

    createPresensi = async (payload: PresensiCreationAttributes): Promise<PresensiAttributes> => {
        return this.presensi.create(payload);
    };

    findByXid = async (xid: string): Promise<PresensiAttributes | null> => {
        return this.presensi.findOne({
            where: {
                xid,
            },
        });
    };

    findByDateAndUserId = async (date: string, userID: number): Promise<PresensiAttributes | null> => {
        return this.presensi.findOne({
            where: {
                date,
                userID,
            },
        });
    };

    findByUserID = async (userID: number): Promise<PresensiAttributes | null> => {
        return this.presensi.findOne({
            where: {
                userID,
            },
        });
    };

    findPresensiCount = async (): Promise<number> => {
        return this.presensi.count();
    };

    findList = async (payload: List_Payload): Promise<FindResult<PresensiAttributes>> => {
        const { showAll, filters } = payload;

        const { order } = this.parseSortBy(payload.sortBy);

        const limit = showAll ? undefined : payload.limit;
        const skip = showAll ? undefined : payload.skip;

        const where: WhereOptions = {};

        if (filters.userName) {
            where.userName = filters.userName;
        }

        if (filters.jabatan) {
            where.jabatan = filters.jabatan;
        }

        if (filters.month) {
            const currentYear = new Date().getFullYear();
            const month = parseInt(filters.month) - 1;

            const startDate = new Date(currentYear, month, 1);
            const endDate = new Date(currentYear, month + 1, 0);

            where.createdAt = {
                [Op.between]: [startDate.toISOString(), endDate.toISOString()],
            };
        }

        if (filters.information) {
            where.information = filters.information;
        }

        return this.presensi.findAndCountAll({
            where,
            order,
            limit,
            offset: skip,
        });
    };

    updatePresensi = async (id: number, payload: Partial<PresensiAttributes>, version: number): Promise<number> => {
        const result = await this.presensi.update(payload, {
            where: {
                id,
                version,
            },
        });

        return result[0];
    };

    findUserPresensiByDate = async (userID: number, date: string): Promise<PresensiAttributes | null> => {
        return this.presensi.findOne({
            where: {
                userID,
                createdAt: {
                    [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
                },
            },
        });
    };

    getAttendanceStats = async (month: number, jabatan: string | undefined): Promise<AttendanceStats[]> => {
        const currentYear = new Date().getFullYear();
        const startDate = new Date(currentYear, month - 1, 1);
        const endDate = new Date(currentYear, month, 0);
        const totalDaysInMonth = endDate.getDate();

        const where: WhereOptions<PresensiAttributes> = {
            createdAt: {
                [Op.between]: [startDate, endDate],
            },
        };

        if (jabatan) {
            where.jabatan = jabatan;
        }

        // Get all attendance records for the month
        const records = await this.presensi.findAll({
            where,
            attributes: [
                "userName",
                "information",
                [Sequelize.fn("COUNT", Sequelize.col("*")), "total"],
                [Sequelize.fn("COUNT", Sequelize.literal(`CASE WHEN information = 'hadir' THEN 1 END`)), "hadir"],
                [Sequelize.fn("COUNT", Sequelize.literal(`CASE WHEN information = 'cuti' THEN 1 END`)), "cuti"],
                [Sequelize.fn("COUNT", Sequelize.literal(`CASE WHEN information = 'sakit' THEN 1 END`)), "sakit"],
                [Sequelize.fn("COUNT", Sequelize.literal(`CASE WHEN information = 'izin' THEN 1 END`)), "izin"],
            ],
            group: ["userName", "information"],
        });

        // Transform results and calculate alpha (missing days)
        const stats: AttendanceStats[] = records.map((record: any) => {
            const hadir = parseInt(record.dataValues.hadir) || 0;
            const sakit = parseInt(record.dataValues.sakit) || 0;
            const izin = parseInt(record.dataValues.izin) || 0;
            const cuti = parseInt(record.dataValues.cuti) || 0;
            const totalPresent = hadir + sakit + izin + cuti;
            const alpha = totalDaysInMonth - totalPresent;

            return {
                userName: record.userName,
                hadir,
                cuti,
                sakit,
                izin,
                alpha,
                totalDays: totalDaysInMonth,
            };
        });

        return stats;
    };

    getPresensiStats = async (month: number, jabatan: string | undefined): Promise<PresensiStats[]> => {
        const currentYear = new Date().getFullYear();
        const startDate = new Date(currentYear, month - 1, 1);
        const endDate = new Date(currentYear, month, 0);

        const where: WhereOptions<PresensiAttributes> = {
            createdAt: {
                [Op.between]: [startDate, endDate],
            },
        };

        if (jabatan) {
            where.jabatan = jabatan;
        }

        // Get all attendance records for the month
        const records = await this.presensi.findAll({
            where,
            attributes: [
                "userName",
                [Sequelize.fn("COUNT", Sequelize.col("*")), "total"],
                [Sequelize.fn("SUM", Sequelize.literal(`CASE WHEN information = 'hadir' THEN 1 ELSE 0 END`)), "hadir"],
                [
                    Sequelize.fn(
                        "SUM",
                        Sequelize.literal(`CASE WHEN "isOnTime" = true AND information = 'hadir' THEN 1 ELSE 0 END`)
                    ),
                    "onTime",
                ],
                [Sequelize.fn("SUM", Sequelize.literal(`CASE WHEN "overtimePay" > 0 THEN 1 ELSE 0 END`)), "overtime"],
            ],
            group: ["userName"],
        });

        // Transform results and calculate alpha (missing days)
        const stats: PresensiStats[] = records.map((record: any) => {
            const hadir = parseInt(record.dataValues.hadir) || 0;
            const onTime = parseInt(record.dataValues.onTime) || 0;
            const overtime = parseInt(record.dataValues.overtime) || 0;

            return {
                userName: record.userName,
                hadir,
                onTime,
                lembur: overtime,
            };
        });

        return stats;
    };

    findMonthlyPresensi = async (userID: number, year: number, month: number): Promise<PresensiAttributes[]> => {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        return this.presensi.findAll({
            where: {
                userID,
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
            order: [["createdAt", "ASC"]],
        });
    };

    private parseSortBy = (sortBy: string): { order: Order } => {
        let order: Order;
        switch (sortBy) {
            case "createdAt-asc": {
                order = [["createdAt", "ASC"]];
                break;
            }
            case "createdAt-desc": {
                order = [["createdAt", "DESC"]];
                break;
            }
            case "updatedAt-asc": {
                order = [["updatedAt", "ASC"]];
                break;
            }
            case "updatedAt-desc": {
                order = [["updatedAt", "DESC"]];
                break;
            }
            case "mealPay-asc": {
                order = [["mealPay", "ASC"]];
                break;
            }
            case "mealPay-desc": {
                order = [["mealPay", "DESC"]];
                break;
            }
            case "overtimePay-asc": {
                order = [["overtimePay", "ASC"]];
                break;
            }
            case "overtimePay-desc": {
                order = [["overtimePay", "DESC"]];
                break;
            }
            default: {
                order = [["createdAt", "DESC"]];
            }
        }

        return { order };
    };
}
