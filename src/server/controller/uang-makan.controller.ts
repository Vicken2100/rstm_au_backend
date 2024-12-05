import { Request } from "express";
import { AppServiceMap, UangMakanService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { UangMakanResult } from "../dto/uang-makan.dto";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { validate } from "../validate";
import { UangMakanValidator } from "../validate/uang-makan.validator";
import { WrapAppHandler } from "../../handler/default.handler";

export class UangMakanController extends BaseController {
    constructor() {
        super("uang-makan");
    }

    private service!: UangMakanService;

    init(service: AppServiceMap): void {
        this.service = service.uangMakan;
    }

    initRoute(): void {
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getUangMakan));
        this.router.post("/", defaultMiddleware(), WrapAppHandler(this.createUangMakan));
        this.router.delete("/:location", defaultMiddleware(), WrapAppHandler(this.deleteUangMakan));
    }

    getUangMakan = (req: Request): unknown => {
        return this.service.getUangMakan();
    };

    createUangMakan = (req: Request): unknown => {
        const payload = req.body as UangMakanResult;

        validate(UangMakanValidator.CreateUangMakan_Payload, payload);

        this.service.createUangMakan(payload);

        return "success";
    };

    deleteUangMakan = (req: Request): unknown => {
        const { location } = req.params;

        this.service.deleteUangMakan(location);

        return "success";
    };
}
