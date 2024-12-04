import { AppServiceMap, AuthService } from "../../contract/service.contract";
import { LoginPayload } from "../dto/auth.dto";
import { BaseController } from "./base.controller";
import { Request } from "express";
import { AuthValidator } from "../validate/auth.validator";
import { validate } from "../validate";
import { WrapAppHandler } from "../../handler/default.handler";

export class AuthController extends BaseController {
    private service!: AuthService;
    constructor() {
        super("auth");
    }

    init(service: AppServiceMap): void {
        this.service = service.auth;
    }

    initRoute(): void {
        this.router.post("/", WrapAppHandler(this.login));
    }

    login = async (req: Request): Promise<unknown> => {
        const payload = req.body as LoginPayload;

        validate(AuthValidator.Login_Payload, payload);

        const result = await this.service.login(payload);

        return result;
    };
}
