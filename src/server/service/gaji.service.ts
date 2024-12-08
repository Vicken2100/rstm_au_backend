import {
    AppRepositoryMap,
    GajiRepository,
    PresensiRepository,
    UsersRepository,
} from "../../contract/repository.contract";
import { GajiService } from "../../contract/service.contract";
import { List_Payload, ListResult, UserSession } from "../../module/dto.module";
import { compose, composeResult, createData } from "../../utils/helper.utils";
import { GajiResult } from "../dto/gaji.dto";
import { JabatanGajiResult } from "../dto/jabatanGaji.dto";
import { GajiAttributes, GajiCreationAttributes } from "../model/gaji.model";
import { BaseService } from "./base.service";
import fs from "fs";

export class Gaji extends BaseService implements GajiService {
    private presensiRepo!: PresensiRepository;
    private gajiRepo!: GajiRepository;
    private userRepo!: UsersRepository;
    init(repository: AppRepositoryMap): void {
        this.gajiRepo = repository.gaji;
        this.presensiRepo = repository.presensi;
        this.userRepo = repository.users;
    }

    getList = async (payload: List_Payload): Promise<ListResult<GajiResult>> => {
        const result = await this.gajiRepo.findList(payload);

        const items = compose(result.rows, composeGaji);

        return {
            items,
            count: result.count,
        };
    };

    createGajiKaryawan = async (): Promise<void> => {
        const users = await this.userRepo.findList({
            skip: 0,
            limit: 0,
            sortBy: "createdAt-desc",
            showAll: true,
            usersSession: {} as UserSession,
            filters: {},
        });

        const nowMonth = new Date().getMonth() + 1;

        const jabatanGaji: JabatanGajiResult[] = JSON.parse(fs.readFileSync("jabatan-gaji.json", "utf-8"));

        for (const u of users.rows) {
            const presensi = await this.presensiRepo.findList({
                skip: 0,
                limit: 0,
                sortBy: "createdAt-desc",
                showAll: true,
                usersSession: {} as UserSession,
                filters: {
                    userName: u.username,
                    month: nowMonth.toString(),
                },
            });

            const gajiPokok = jabatanGaji.find((item) => item.jabatan === u.jabatan);
            const uangMakan = presensi.rows.reduce((sum, item) => {
                if (item.information === "hadir") {
                    return sum + item.mealPay;
                }
                return sum;
            }, 0);
            const uangLembur = presensi.rows.reduce((sum, item) => sum + item.overtimePay, 0);

            const createdValues = createData<GajiCreationAttributes>({
                userID: u.id,
                userName: u.username,
                jabatan: u.jabatan,
                gajiPokok: gajiPokok ? gajiPokok.gajiPokok : 0,
                uangLembur,
                uangMakan,
                tunjanganKeluarga: 500000,
                tunjanganKesehatan: 200000,
            });

            await this.gajiRepo.createGaji(createdValues);
        }
    };
}

export function composeGaji(row: GajiAttributes): GajiResult {
    return composeResult(row, {
        userName: row.userName,
        jabatan: row.jabatan,
        gajiPokok: row.gajiPokok,
        uangLembur: row.uangLembur,
        uangMakan: row.uangMakan,
        tunjanganKeluarga: row.tunjanganKeluarga,
        tunjanganKesehatan: row.tunjanganKesehatan,
    });
}
