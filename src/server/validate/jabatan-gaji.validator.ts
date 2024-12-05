import { baseValidator } from "./base.validator";

export class JabatanGajiValidator {
    static UpdateJabatanGaji_Payload = baseValidator.compile({
        data: {
            type: "array",
            items: {
                type: "object",
                props: {
                    jabatan: { type: "string", empty: false, require: true },
                    gajiPokok: { type: "number", empty: false, require: true, min: 0 },
                    tunjanganKeluarga: { type: "number", empty: false, require: true, min: 0 },
                    tunjanganKesehatan: { type: "number", empty: false, require: true, min: 0 },
                },
            },
        },
        $$strict: true,
    });
}
