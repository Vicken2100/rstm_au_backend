import { baseValidator } from "./base.validator";

export class AuthValidator {
    static Login_Payload = baseValidator.compile({
        email: "email|empty:false|required|min:5|max:255",
        password: "string|empty:false|required|min:5|max:255",
        $$strict: true,
    });
}
