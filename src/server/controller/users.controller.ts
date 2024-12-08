import { Request } from "express";
import { AppServiceMap, UsersService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { getForceUsersSession, getListOption } from "../../utils/helper.utils";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";
import { UpdateProfileRequest } from "../dto/users.dto";
import { validate } from "../validate";
import { AuthValidator } from "../validate/auth.validator";

export class UsersController extends BaseController {
    constructor() {
        super("users");
    }

    private service!: UsersService;

    init(service: AppServiceMap): void {
        this.service = service.users;
    }
    initRoute(): void {
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getList));

        this.router.get("/profile", defaultMiddleware(), WrapAppHandler(this.getProfile));

        this.router.put("/", defaultMiddleware(), WrapAppHandler(this.updateProfile));
    }

    getList = async (req: Request): Promise<unknown> => {
        const payload = getListOption(req);

        const result = await this.service.getList(payload);

        return result;
    };

    getProfile = async (req: Request): Promise<unknown> => {
        const userSession = getForceUsersSession(req);

        const result = await this.service.getProfile(userSession.xid);

        return result;
    };

    updateProfile = async (req: Request): Promise<unknown> => {
        const payload = req.body as UpdateProfileRequest;
        const userSession = getForceUsersSession(req);

        payload.xid = userSession.xid;

        validate(AuthValidator.Update_Profile_Payload, payload);

        const result = await this.service.updateProfile(payload);

        return result;
    };
}
