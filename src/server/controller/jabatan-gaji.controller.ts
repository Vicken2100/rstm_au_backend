import { Request } from "express";
import { AppServiceMap, JabatanGajiService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { JabatanGajiResult } from "../dto/jabatanGaji.dto";
import { validate } from "../validate";
import { JabatanGajiValidator } from "../validate/jabatan-gaji.validator";
import { WrapAppHandler } from "../../handler/default.handler";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";

export class JabatanGajiController extends BaseController {
    private service!: JabatanGajiService;
    constructor() {
        super("jabatan-gaji");
    }

    init(service: AppServiceMap): void {
        this.service = service.jabatanGaji;
    }

    initRoute(): void {
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getJabatanGaji));
        this.router.put("/", defaultMiddleware(), WrapAppHandler(this.updateJabatanGaji));
    }

    getJabatanGaji = (req: Request): unknown => {
        return this.service.getJabatanGaji();
    };

    updateJabatanGaji = (req: Request): unknown => {
        const payload = req.body as { data: JabatanGajiResult[] };

        validate(JabatanGajiValidator.UpdateJabatanGaji_Payload, payload);

        this.service.updateJabatanGaji(payload.data);

        return "success";
    };
}
