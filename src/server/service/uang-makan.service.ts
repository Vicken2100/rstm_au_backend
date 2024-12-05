import { UangMakanService } from "../../contract/service.contract";
import { errorResponses } from "../../response";
import { UangMakanResult } from "../dto/uang-makan.dto";
import fs from "fs";

export class UangMakan implements UangMakanService {
    private uangMakan!: UangMakanResult[];
    constructor() {
        this.uangMakan = JSON.parse(fs.readFileSync("uang-makan.json", "utf-8"));
    }

    getUangMakan(): UangMakanResult[] {
        return this.uangMakan;
    }

    createUangMakan(uangMakan: UangMakanResult): void {
        if (this.uangMakan.some((item) => item.location === uangMakan.location)) {
            throw errorResponses.getError("E_REC_1");
        }
        this.uangMakan.push(uangMakan);
        fs.writeFileSync("uang-makan.json", JSON.stringify(this.uangMakan, null, 2));
    }

    deleteUangMakan(location: string): void {
        this.uangMakan = this.uangMakan.filter((item) => item.location !== location);
        fs.writeFileSync("uang-makan.json", JSON.stringify(this.uangMakan, null, 2));
    }
}
