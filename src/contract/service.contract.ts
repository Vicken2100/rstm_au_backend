import { List_Payload, ListResult } from "../module/dto.module";
import { LoginPayload, LoginResult } from "../server/dto/auth.dto";
import { BonusResult } from "../server/dto/bonus.dto";
import { GajiResult } from "../server/dto/gaji.dto";
import { JabatanGajiResult } from "../server/dto/jabatanGaji.dto";
import { PenilaianResult } from "../server/dto/penilaian.dto";
import {
    PresensiResult,
    UpdateInformationPresensi_Payload,
    UpdateLocationPresensi_Payload,
    UpdateStatusPayment_Payload,
} from "../server/dto/presensi.dto";
import { UangLemburResult } from "../server/dto/uang-lembur.dto";
import { UangMakanResult } from "../server/dto/uang-makan.dto";
import { CreateUsers_Payload, UpdateProfileRequest, UsersResult } from "../server/dto/users.dto";
import { AttendanceStats, PresensiStats } from "../server/model/presensi.model";

export interface AppServiceMap {
    auth: AuthService;
    users: UsersService;
    jabatanGaji: JabatanGajiService;
    uangMakan: UangMakanService;
    uangLembur: UangLemburService;
    bonus: BonusService;
    penilaian: PenilaianService;
    presensi: PresensiService;
    gaji: GajiService;
}

export interface AuthService {
    login(payload: LoginPayload): Promise<LoginResult>;

    register(payload: CreateUsers_Payload): Promise<UsersResult>;
}

export interface UsersService {
    getList(payload: List_Payload): Promise<ListResult<UsersResult>>;

    getProfile(xid: string): Promise<UsersResult>;

    updateProfile(payload: UpdateProfileRequest): Promise<UsersResult>;
}

export interface JabatanGajiService {
    getJabatanGaji(): JabatanGajiResult[];

    updateJabatanGaji(jabatanGaji: JabatanGajiResult[]): void;
}

export interface UangMakanService {
    getUangMakan(): UangMakanResult[];

    createUangMakan(uangMakan: UangMakanResult): void;

    deleteUangMakan(location: string): void;
}

export interface UangLemburService {
    getUangLembur(): UangLemburResult[];

    createUangLembur(uangMakan: UangLemburResult): void;

    deleteUangLembur(location: string): void;
}

export interface BonusService {
    getBonus(): BonusResult[];

    createBonus(Bonus: BonusResult): void;

    deleteBonus(location: number): void;
}

export interface PenilaianService {
    getPenilaian(): PenilaianResult[];

    updatePenilaian(payload: PenilaianResult[]): void;
}

export interface PresensiService {
    absent(pin: string): Promise<void>;

    getList(payload: List_Payload): Promise<ListResult<PresensiResult>>;

    updateLocation(payload: UpdateLocationPresensi_Payload): Promise<PresensiResult>;

    updateStatusPayment(payload: UpdateStatusPayment_Payload): Promise<PresensiResult>;

    updateInformation(payload: UpdateInformationPresensi_Payload): Promise<PresensiResult>;

    getAttendanceStats(month: number, jabatan: string | undefined): Promise<AttendanceStats[]>;

    getInformationStats(month: number, jabatan: string | undefined): Promise<PresensiStats[]>;
}

export interface GajiService {
    getList(payload: List_Payload): Promise<ListResult<GajiResult>>;

    createGajiKaryawan(): Promise<void>;
}
