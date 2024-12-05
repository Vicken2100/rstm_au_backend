import { List_Payload, ListResult } from "../module/dto.module";
import { LoginPayload, LoginResult } from "../server/dto/auth.dto";
import { BonusResult } from "../server/dto/bonus.dto";
import { JabatanGajiResult } from "../server/dto/jabatanGaji.dto";
import { UangLemburResult } from "../server/dto/uang-lembur.dto";
import { UangMakanResult } from "../server/dto/uang-makan.dto";
import { UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
    users: UsersService;
    jabatanGaji: JabatanGajiService;
    uangMakan: UangMakanService;
    uangLembur: UangLemburService;
    bonus: BonusService;
}

export interface AuthService {
    login(payload: LoginPayload): Promise<LoginResult>;
}

export interface UsersService {
    getList(payload: List_Payload): Promise<ListResult<UsersResult>>;
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
