import { Request } from "express";
import { AppServiceMap, UangLemburService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";
import { validate } from "../validate";
import { UangLemburValidator } from "../validate/uang-lembur.validator";

export class UangLemburController extends BaseController {
    constructor() {
        super("uang-lembur");
    }

    private service!: UangLemburService;
    init(service: AppServiceMap): void {
        this.service = service.uangLembur;
    }

    initRoute(): void {
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getUangLembur));
        this.router.post("/", defaultMiddleware(), WrapAppHandler(this.createUangLembur));
        this.router.delete("/:mulai", defaultMiddleware(), WrapAppHandler(this.deleteUangLembur));
    }

    getUangLembur = (req: Request): unknown => {
        return this.service.getUangLembur();
    };

    createUangLembur = (req: Request): unknown => {
        const payload = req.body;
        validate(UangLemburValidator.UangLemburCreate_Payload, payload);
        this.service.createUangLembur(payload);
        return "success";
    };

    deleteUangLembur = (req: Request): unknown => {
        const { mulai } = req.params;
        this.service.deleteUangLembur(mulai);
        return "success";
    };
}
