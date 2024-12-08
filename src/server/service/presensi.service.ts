import { AppRepositoryMap, PresensiRepository, UsersRepository } from "../../contract/repository.contract";
import { PresensiService } from "../../contract/service.contract";
import { List_Payload, ListResult } from "../../module/dto.module";
import { errorResponses } from "../../response";
import { compose, composeResult, createData, updateData } from "../../utils/helper.utils";
import {
    PresensiResult,
    UpdateInformationPresensi_Payload,
    UpdateLocationPresensi_Payload,
    UpdateStatusPayment_Payload,
} from "../dto/presensi.dto";
import { UangLemburResult } from "../dto/uang-lembur.dto";
import { UangMakanResult } from "../dto/uang-makan.dto";
import {
    AttendanceStats,
    PresensiAttributes,
    PresensiCreationAttributes,
    PresensiStats,
} from "../model/presensi.model";
import { BaseService } from "./base.service";
import fs from "fs";

export class Presensi extends BaseService implements PresensiService {
    private presensiRepo!: PresensiRepository;
    private usersRepo!: UsersRepository;
    init(repository: AppRepositoryMap): void {
        this.presensiRepo = repository.presensi;
        this.usersRepo = repository.users;
    }

    absent = async (pin: string): Promise<void> => {
        const users = await this.usersRepo.findByPin(pin);

        if (!users) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const hourStr = `${hours}:${minutes}`;
        const date = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();

        const dateStr = `${date}-${month + 1}-${year}`;
        const presensi = await this.presensiRepo.findByDateAndUserId(dateStr, users.id);

        let overtimePay = 0;

        if (hours >= 18) {
            const uangLembur: UangLemburResult[] = JSON.parse(fs.readFileSync("uang-lembur.json", "utf-8"));

            overtimePay = this.calculateOvertimePay(hourStr, uangLembur);
        }

        if (!presensi) {
            const createdValues = createData<PresensiCreationAttributes>({
                userID: users.id,
                userName: users.username,
                jabatan: users.jabatan,
                date: dateStr,
                start: hours < 12 ? hourStr : null,
                end: hours >= 12 ? hourStr : null,
                isOnTime: hours < 8,
                location: null,
                mealPay: 0,
                overtimePay,
                information: "hadir",
                statusPayment: false,
            });

            await this.presensiRepo.createPresensi(createdValues);

            return;
        }

        const updatedValues = updateData(presensi, {
            end: presensi.end ? presensi.end : hours >= 12 ? hourStr : null,
        });

        const result = await this.presensiRepo.updatePresensi(presensi.id, updatedValues, presensi.version);

        if (!result) {
            throw errorResponses.getError("E_REQ_2");
        }
    };

    getList = async (payload: List_Payload): Promise<ListResult<PresensiResult>> => {
        const result = await this.presensiRepo.findList(payload);

        const items = compose(result.rows, composePresensi);

        return {
            items,
            count: result.count,
        };
    };

    updateLocation = async (payload: UpdateLocationPresensi_Payload): Promise<PresensiResult> => {
        const { xid, location, version } = payload;

        const presensi = await this.presensiRepo.findByXid(xid);

        if (!presensi) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const uangMakan: UangMakanResult[] = JSON.parse(fs.readFileSync("uang-makan.json", "utf-8"));

        const uangMakanEntry = uangMakan.find((item) => item.location === location);

        if (!uangMakanEntry) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const updatedValues = updateData<PresensiAttributes>(presensi, {
            location: uangMakanEntry.location,
            mealPay: uangMakanEntry.uangMakan,
        });

        const result = await this.presensiRepo.updatePresensi(presensi.id, updatedValues, version);

        if (!result) {
            throw errorResponses.getError("E_REQ_2");
        }

        Object.assign(presensi, updatedValues);

        return composePresensi(presensi);
    };

    updateStatusPayment = async (payload: UpdateStatusPayment_Payload): Promise<PresensiResult> => {
        const { xid, version } = payload;

        const presensi = await this.presensiRepo.findByXid(xid);

        if (!presensi) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const updatedValues = updateData<PresensiAttributes>(presensi, {
            statusPayment: true,
        });

        const result = await this.presensiRepo.updatePresensi(presensi.id, updatedValues, version);

        if (!result) {
            throw errorResponses.getError("E_REQ_2");
        }

        Object.assign(presensi, updatedValues);

        return composePresensi(presensi);
    };

    updateInformation = async (payload: UpdateInformationPresensi_Payload): Promise<PresensiResult> => {
        const { xid, information, version } = payload;

        const presensi = await this.presensiRepo.findByXid(xid);

        if (!presensi) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const option = [
            { value: "hadir", label: "hadir" },
            { value: "cuti", label: "cuti" },
            { value: "izin", label: "izin" },
            { value: "sakit", label: "sakit" },
        ];

        const informationEntry = option.find((item) => item.value === information);

        if (!informationEntry) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const updatedValues = updateData<PresensiAttributes>(presensi, {
            information: informationEntry.value,
        });

        const result = await this.presensiRepo.updatePresensi(presensi.id, updatedValues, version);

        if (!result) {
            throw errorResponses.getError("E_REQ_2");
        }

        Object.assign(presensi, updatedValues);

        return composePresensi(presensi);
    };

    getAttendanceStats = async (month: number, jabatan: string | undefined): Promise<AttendanceStats[]> => {
        return this.presensiRepo.getAttendanceStats(month, jabatan);
    };

    getInformationStats = async (month: number, jabatan: string | undefined): Promise<PresensiStats[]> => {
        return this.presensiRepo.getPresensiStats(month, jabatan);
    };

    private calculateOvertimePay(currentTime: string, overtimeRates: UangLemburResult[]): number {
        const [currentHour, currentMinute] = currentTime.split(":").map(Number);
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        let totalPay = 0;

        for (const rate of overtimeRates) {
            let [startHour, startMinute] = rate.mulai.split(":").map(Number);
            let [endHour, endMinute] = rate.selesai.split(":").map(Number);

            if (endHour === 0) {
                endHour = 24;
            }

            if (startHour === 0) {
                startHour = 0;
            }

            const startTimeInMinutes = startHour * 60 + startMinute;
            const endTimeInMinutes = endHour * 60 + endMinute;

            if (currentTimeInMinutes >= startTimeInMinutes) {
                totalPay += rate.uang;

                if (currentTimeInMinutes < endTimeInMinutes) {
                    break;
                }
            }
        }

        return totalPay;
    }
}

export function composePresensi(row: PresensiAttributes): PresensiResult {
    return composeResult(row, {
        userName: row.userName,
        date: row.date,
        jabatan: row.jabatan,
        start: row.start,
        end: row.end,
        isOnTime: row.isOnTime,
        location: row.location,
        mealPay: row.mealPay,
        overtimePay: row.overtimePay,
        information: row.information,
        statusPayment: row.statusPayment,
    });
}
