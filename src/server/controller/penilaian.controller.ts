import { Request } from "express";
import { AppServiceMap, PenilaianService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { validate } from "../validate";
import { PenilaianValidator } from "../validate/penilaian.validator";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";

export class PenilaianController extends BaseController {
    constructor() {
        super("penilaian");
    }

    private service!: PenilaianService;

    init(service: AppServiceMap): void {
        this.service = service.penilaian;
    }

    initRoute(): void {
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getPenilaian));

        this.router.put("/", defaultMiddleware(), WrapAppHandler(this.updatePenilaian));
    }

    getPenilaian = (req: Request): unknown => {
        return this.service.getPenilaian();
    };

    updatePenilaian = (req: Request): unknown => {
        const payload = req.body;

        validate(PenilaianValidator.UpdatePenilaian_Payload, payload);

        this.service.updatePenilaian(payload.data);

        return "success";
    };
}
