import { baseValidator } from "./base.validator";

export class PenilaianValidator {
    static UpdatePenilaian_Payload = baseValidator.compile({
        data: {
            type: "array",
            items: {
                type: "object",
                props: {
                    indicator: { type: "string", empty: false, require: true },
                    percentage: { type: "number", empty: false, require: true, min: 0 },
                },
            },
        },
        $$strict: true,
    });
}
