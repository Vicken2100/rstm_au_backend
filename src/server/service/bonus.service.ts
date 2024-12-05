import { BonusService } from "../../contract/service.contract";
import fs from "fs";
import { BonusResult } from "../dto/bonus.dto";
export class Bonus implements BonusService {
    private Bonus: BonusResult[];

    constructor() {
        this.Bonus = JSON.parse(fs.readFileSync("bonus.json", "utf-8"));
    }

    getBonus(): BonusResult[] {
        return this.Bonus;
    }

    createBonus(Bonus: BonusResult): void {
        if (this.Bonus.some((item) => item.start === Bonus.start)) {
            throw "E_REC_1";
        }

        this.Bonus.push(Bonus);
        fs.writeFileSync("Bonus.json", JSON.stringify(this.Bonus, null, 2));
    }

    deleteBonus(start: number): void {
        this.Bonus = this.Bonus.filter((item) => item.start !== start);
        fs.writeFileSync("Bonus.json", JSON.stringify(this.Bonus, null, 2));
    }
}
