import { BaseResult } from "../../module/dto.module";

export interface UpdateLocationPresensi_Payload {
    xid: string;
    location: string;
    version: number;
}

export interface UpdateInformationPresensi_Payload {
    xid: string;
    information: string;
    version: number;
}

export interface UpdateStatusPayment_Payload {
    xid: string;
    version: number;
}

export interface PresensiResult extends BaseResult {
    userName: string;
    jabatan: string;
    date: string;
    start: string | null;
    end: string | null;
    isOnTime: boolean;
    location: string | null;
    mealPay: number;
    overtimePay: number;
    information: string;
    statusPayment: boolean;
}
