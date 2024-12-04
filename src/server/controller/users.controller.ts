import { Request } from "express";
import { AppServiceMap, UsersService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { getListOption } from "../../utils/helper.utils";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";

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
    }

    getList = async (req: Request): Promise<unknown> => {
        const payload = getListOption(req);

        const result = await this.service.getList(payload);

        return result;
    };
}
