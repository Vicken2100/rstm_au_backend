import { BaseResult } from "../../module/dto.module";

export interface UsersResult extends BaseResult {
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
    pin: string;
}

export interface CreateUsers_Payload {
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
