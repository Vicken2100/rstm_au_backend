import { JabatanGajiService } from "../../contract/service.contract";
import { JabatanGajiResult } from "../dto/jabatanGaji.dto";
import fs from "fs";
export class JabatanGaji implements JabatanGajiService {
    private jabatanGaji!: JabatanGajiResult[];
    constructor() {
        this.jabatanGaji = JSON.parse(fs.readFileSync("jabatan-gaji.json", "utf-8"));
    }

    getJabatanGaji(): JabatanGajiResult[] {
        return this.jabatanGaji;
    }

    updateJabatanGaji(jabatanGaji: JabatanGajiResult[]): void {
        this.jabatanGaji = jabatanGaji;
        fs.writeFileSync("jabatan-gaji.json", JSON.stringify(jabatanGaji, null, 2));
    }
}
