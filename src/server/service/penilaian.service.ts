import { PenilaianService } from "../../contract/service.contract";
import { errorResponses } from "../../response";
import { PenilaianResult } from "../dto/penilaian.dto";
import fs from "fs";

export class Penilaian implements PenilaianService {
    private penilaian: PenilaianResult[];

    constructor() {
        this.penilaian = JSON.parse(fs.readFileSync("penilaian.json", "utf-8"));
    }

    getPenilaian = (): PenilaianResult[] => {
        return this.penilaian;
    };

    updatePenilaian = (penilaian: PenilaianResult[]): void => {
        const totalPercentage = penilaian.reduce((total, item) => total + item.percentage, 0);

        if (totalPercentage !== 100) {
            throw errorResponses.getError("E_REQ_1");
        }

        this.penilaian = penilaian;
        fs.writeFileSync("penilaian.json", JSON.stringify(penilaian, null, 2));
    };
}
