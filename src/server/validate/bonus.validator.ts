import { baseValidator } from "./base.validator";

export class BonusValidator {
    static CreatePenilaian_Payload = baseValidator.compile({
        start: { type: "number", empty: false, require: true, min: 0 },
        end: { type: "number", empty: false, require: true, min: 0 },
        startBonus: { type: "number", empty: false, require: true, min: 0 },
        endBonus: { type: "number", empty: false, require: true, min: 0 },
        $$strict: true,
    });
}
