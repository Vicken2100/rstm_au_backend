import { Request } from "express";
import { AppServiceMap, BonusService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";
import { WrapAppHandler } from "../../handler/default.handler";
import { validate } from "../validate";
import { BonusValidator } from "../validate/bonus.validator";

export class BonusController extends BaseController {
    constructor() {
        super("bonus");
    }
    private service!: BonusService;
    init(service: AppServiceMap): void {
        this.service = service.bonus;
    }

    initRoute(): void {
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getBonus));
        this.router.post("/", defaultMiddleware(), WrapAppHandler(this.createBonus));
        this.router.delete("/:start", defaultMiddleware(), WrapAppHandler(this.deleteBonus));
    }

    getBonus = (req: Request): unknown => {
        return this.service.getBonus();
    };

    createBonus = (req: Request): unknown => {
        const payload = req.body;

        validate(BonusValidator.CreatePenilaian_Payload, payload);

        this.service.createBonus(payload);

        return "success";
    };

    deleteBonus = (req: Request): unknown => {
        const { start } = req.params;
        this.service.deleteBonus(Number(start));
        return "success";
    };
}
