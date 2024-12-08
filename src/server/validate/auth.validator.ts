import { baseValidator } from "./base.validator";

export class AuthValidator {
    static Login_Payload = baseValidator.compile({
        email: "email|empty:false|required|min:5|max:255",
        password: "string|empty:false|required|min:5|max:255",
        $$strict: true,
    });

    static Register_Payload = baseValidator.compile({
        username: "string|empty:false|required|min:3|max:255",
        birthDate: "string|empty:false|required",
        isMale: "boolean|required",
        nik: "string|empty:false|required|length:16", // NIK is typically 16 digits
        noTelp: "string|empty:false|required|min:10|max:13", // Phone numbers typically 10-13 digits
        namaBank: "string|empty:false|required|min:2|max:255",
        noRek: "string|empty:false|required|min:10|max:20", // Bank account numbers vary but typically in this range
        namaRekening: "string|empty:false|required|min:3|max:255",
        alamatProvinsi: "string|empty:false|required|min:3|max:255",
        alamatKota: "string|empty:false|required|min:3|max:255",
        alamatKecamatan: "string|empty:false|required|min:3|max:255",
        jabatan: "string|empty:false|required", // Based on the options in your form
        dateIn: "string|empty:false|required|date",
        email: "email|empty:false|required|min:5|max:255",
        password: "string|empty:false|required|min:5|max:255",
        pin: "number|required|min:1|max:299",
        $$strict: true,
    });

    static Update_Profile_Payload = baseValidator.compile({
        xid: "string|empty:false|required",
        version: "number|required|min:0",
        username: "string|empty:false|min:3|max:255|optional",
        password: "string|min:5|max:255|optional",
        birthDate: "string|empty:false|optional",
        isMale: "boolean|optional",
        nik: "string|empty:false|length:16|optional",
        noTelp: "string|empty:false|min:10|max:13|optional",
        namaBank: "string|empty:false|min:2|max:255|optional",
        noRek: "string|empty:false|min:10|max:20|optional",
        namaRekening: "string|empty:false|min:3|max:255|optional",
        alamatProvinsi: "string|empty:false|min:3|max:255|optional",
        alamatKota: "string|empty:false|min:3|max:255|optional",
        alamatKecamatan: "string|empty:false|min:3|max:255|optional",
        $$strict: true,
    });
}
