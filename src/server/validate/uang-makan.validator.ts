import { baseValidator } from "./base.validator";

export class UangMakanValidator {
    static CreateUangMakan_Payload = baseValidator.compile({
        location: { type: "string", empty: false, require: true },
        uangMakan: { type: "number", empty: false, require: true, min: 0 },
        $$strict: true,
    });
}
