import { Op, Order, WhereOptions } from "sequelize";
import { AppDataSource } from "../../module/datasource.module";
import { FindResult, List_Payload } from "../../module/dto.module";
import { Gaji, GajiAttributes, GajiCreationAttributes } from "../model/gaji.model";
import { BaseRepository } from "./base.repository";
import { GajiRepository } from "../../contract/repository.contract";

export class SequelizeGajiRepository extends BaseRepository implements GajiRepository {
    private gaji!: typeof Gaji;

    init(datasource: AppDataSource): void {
        this.gaji = datasource.sqlModel.Gaji;
    }

    createGaji = async (payload: GajiCreationAttributes): Promise<GajiAttributes> => {
        return this.gaji.create(payload);
    };

    findByXid = async (xid: string): Promise<GajiAttributes | null> => {
        return this.gaji.findOne({
            where: {
                xid,
            },
        });
    };

    findByUserId = async (userID: number): Promise<GajiAttributes | null> => {
        return this.gaji.findOne({
            where: {
                userID,
            },
        });
    };

    findGajiCount = async (): Promise<number> => {
        return this.gaji.count();
    };

    findList = async (payload: List_Payload): Promise<FindResult<GajiAttributes>> => {
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

        return this.gaji.findAndCountAll({
            where,
            order,
            limit,
            offset: skip,
        });
    };

    updateGaji = async (id: number, payload: Partial<GajiAttributes>, version: number): Promise<number> => {
        const result = await this.gaji.update(payload, {
            where: {
                id,
                version,
            },
        });

        return result[0];
    };

    deleteGaji = async (id: number): Promise<number> => {
        const result = await this.gaji.destroy({
            where: {
                id,
            },
        });

        return result;
    };

    findTotalGajiByPeriod = async (startDate: Date, endDate: Date): Promise<number> => {
        const result = await this.gaji.sum("gajiPokok", {
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        return result || 0;
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
            case "gajiPokok-asc": {
                order = [["gajiPokok", "ASC"]];
                break;
            }
            case "gajiPokok-desc": {
                order = [["gajiPokok", "DESC"]];
                break;
            }
            default: {
                order = [["createdAt", "DESC"]];
            }
        }

        return { order };
    };
}
