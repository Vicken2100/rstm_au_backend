import { baseValidator } from "./base.validator";

export class UangLemburValidator {
    static UangLemburCreate_Payload = baseValidator.compile({
        mulai: { type: "string", empty: false, require: true },
        selesai: { type: "string", empty: false, require: true },
        uang: { type: "number", empty: false, require: true, min: 0 },
        $$strict: true,
    });
}
