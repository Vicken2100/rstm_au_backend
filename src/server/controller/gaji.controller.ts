import { Request } from "express";
import { AppServiceMap, GajiService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { getListOption } from "../../utils/helper.utils";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";

export class GajiController extends BaseController {
    constructor() {
        super("gaji");
    }

    private service!: GajiService;

    initRoute(): void {
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getList));

        this.router.post("/", WrapAppHandler(this.createGaji));
    }

    init(service: AppServiceMap): void {
        this.service = service.gaji;
    }

    getList = async (req: Request): Promise<unknown> => {
        const payload = getListOption(req);

        const result = await this.service.getList(payload);

        return result;
    };

    createGaji = async (req: Request): Promise<string> => {
        await this.service.createGajiKaryawan();

        return "success";
    };
}
