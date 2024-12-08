import { BaseResult } from "../../module/dto.module";

export interface GajiResult extends BaseResult {
    userName: string;
    jabatan: string;
    gajiPokok: number;
    uangMakan: number;
    uangLembur: number;
    tunjanganKeluarga: number;
    tunjanganKesehatan: number;
}
