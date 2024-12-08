import { FindResult, List_Payload } from "../module/dto.module";
import { GajiAttributes, GajiCreationAttributes } from "../server/model/gaji.model";
import {
    AttendanceStats,
    PresensiAttributes,
    PresensiCreationAttributes,
    PresensiStats,
} from "../server/model/presensi.model";
import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
    presensi: PresensiRepository;
    gaji: GajiRepository;
}

export interface UsersRepository {
    createUsers(payload: UsersCreationAttributes): Promise<UsersAttributes>;

    findByEmail(email: string): Promise<UsersAttributes | null>;

    findByXid(xid: string): Promise<UsersAttributes | null>;

    findUsersCount(): Promise<number>;

    findByPin(pin: string): Promise<UsersAttributes | null>;

    findList(payload: List_Payload): Promise<FindResult<UsersAttributes>>;

    updateUsers(id: number, payload: Partial<UsersAttributes>, version: number): Promise<number>;
}

export interface PresensiRepository {
    createPresensi(payload: PresensiCreationAttributes): Promise<PresensiAttributes>;

    findByDateAndUserId(date: string, userID: number): Promise<PresensiAttributes | null>;

    findByXid(xid: string): Promise<PresensiAttributes | null>;

    findByUserID(userID: number): Promise<PresensiAttributes | null>;

    findPresensiCount(): Promise<number>;

    findList(payload: List_Payload): Promise<FindResult<PresensiAttributes>>;

    getAttendanceStats(month: number, jabatan: string | undefined): Promise<AttendanceStats[]>;

    getPresensiStats(month: number, jabatan: string | undefined): Promise<PresensiStats[]>;

    updatePresensi(id: number, payload: Partial<PresensiAttributes>, version: number): Promise<number>;

    findUserPresensiByDate(userID: number, date: string): Promise<PresensiAttributes | null>;

    findMonthlyPresensi(userID: number, year: number, month: number): Promise<PresensiAttributes[]>;
}

export interface GajiRepository {
    createGaji(payload: GajiCreationAttributes): Promise<GajiAttributes>;

    findByXid(xid: string): Promise<GajiAttributes | null>;

    findByUserId(userID: number): Promise<GajiAttributes | null>;

    findGajiCount(): Promise<number>;

    findList(payload: List_Payload): Promise<FindResult<GajiAttributes>>;

    updateGaji(id: number, payload: Partial<GajiAttributes>, version: number): Promise<number>;

    deleteGaji(id: number): Promise<number>;

    findTotalGajiByPeriod(startDate: Date, endDate: Date): Promise<number>;
}
