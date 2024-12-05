import { UangLemburService } from "../../contract/service.contract";
import { UangLemburResult } from "../dto/uang-lembur.dto";
import fs from "fs";

export class UangLembur implements UangLemburService {
    private uangLembur: UangLemburResult[];
    constructor() {
        this.uangLembur = JSON.parse(fs.readFileSync("uang-lembur.json", "utf-8"));
    }

    getUangLembur(): UangLemburResult[] {
        return this.uangLembur;
    }

    createUangLembur(uangLembur: UangLemburResult): void {
        if (this.uangLembur.some((item) => item.mulai === uangLembur.mulai)) {
            throw "E_REC_1";
        }

        this.uangLembur.push(uangLembur);
        fs.writeFileSync("uang-lembur.json", JSON.stringify(this.uangLembur, null, 2));
    }

    deleteUangLembur(mulai: string): void {
        this.uangLembur = this.uangLembur.filter((item) => item.mulai !== mulai);
        fs.writeFileSync("uang-lembur.json", JSON.stringify(this.uangLembur, null, 2));
    }
}
