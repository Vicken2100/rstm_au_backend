import { baseValidator } from "./base.validator";

export class PresensiValidator {
    static UpdateLocationPresensi_Payload = baseValidator.compile({
        xid: "string|empty:false|required|length:26",
        location: "string|empty:false|required",
        version: "number|required|min:1",
        $$strict: true,
    });

    static UpdateInformationPresensi_Payload = baseValidator.compile({
        xid: "string|empty:false|required|length:26",
        information: "string|empty:false|required",
        version: "number|required|min:1",
        $$strict: true,
    });

    static UpdateStatusPaymentPresensi_Payload = baseValidator.compile({
        xid: "string|empty:false|required|length:26",
        version: "number|required|min:1",
        $$strict: true,
    });
}
