import { Request } from "express";
import { AppServiceMap, PresensiService } from "../../contract/service.contract";
import { BaseController } from "./base.controller";
import { WrapAppHandler } from "../../handler/default.handler";
import { getListOption } from "../../utils/helper.utils";
import {
    UpdateInformationPresensi_Payload,
    UpdateLocationPresensi_Payload,
    UpdateStatusPayment_Payload,
} from "../dto/presensi.dto";
import { validate } from "../validate";
import { PresensiValidator } from "../validate/presensi.validator";
import { defaultMiddleware } from "../../utils/middleware-helper.utils";

export class PresensiController extends BaseController {
    constructor() {
        super("presensi");
    }

    private service!: PresensiService;

    initRoute(): void {
        this.router.get("/:pin/absent", WrapAppHandler(this.getAbsensi));
        this.router.get("/", defaultMiddleware(), WrapAppHandler(this.getList));
        this.router.get("/:month/stats", defaultMiddleware(), WrapAppHandler(this.getStats));
        this.router.get("/:month/information", defaultMiddleware(), WrapAppHandler(this.getPresensiStats));
        this.router.patch("/:xid/location", defaultMiddleware(), WrapAppHandler(this.updateLocation));
        this.router.patch("/:xid/payment", defaultMiddleware(), WrapAppHandler(this.updateStatus));
        this.router.patch("/:xid/information", defaultMiddleware(), WrapAppHandler(this.updateInformation));
    }

    init(service: AppServiceMap): void {
        this.service = service.presensi;
    }

    getAbsensi = async (req: Request): Promise<unknown> => {
        const pin = req.params.pin;

        await this.service.absent(pin);

        return "success";
    };

    getList = async (req: Request): Promise<unknown> => {
        const payload = getListOption(req);

        const result = await this.service.getList(payload);

        return result;
    };

    getStats = async (req: Request): Promise<unknown> => {
        const month = req.params.month;
        const jabatan = req.query.jabatan as string | undefined;

        const result = await this.service.getAttendanceStats(parseInt(month), jabatan);

        return result;
    };

    getPresensiStats = async (req: Request): Promise<unknown> => {
        const month = req.params.month;
        const jabatan = req.query.jabatan as string | undefined;

        const result = await this.service.getInformationStats(parseInt(month), jabatan);

        return result;
    };

    updateLocation = async (req: Request): Promise<unknown> => {
        const payload = req.body as UpdateLocationPresensi_Payload;

        payload.xid = req.params.xid;

        validate(PresensiValidator.UpdateLocationPresensi_Payload, payload);

        const result = await this.service.updateLocation(payload);

        return result;
    };

    updateStatus = async (req: Request): Promise<unknown> => {
        const payload = req.body as UpdateStatusPayment_Payload;

        payload.xid = req.params.xid;

        validate(PresensiValidator.UpdateStatusPaymentPresensi_Payload, payload);

        const result = await this.service.updateStatusPayment(payload);

        return result;
    };

    updateInformation = async (req: Request): Promise<unknown> => {
        const payload = req.body as UpdateInformationPresensi_Payload;

        payload.xid = req.params.xid;

        validate(PresensiValidator.UpdateInformationPresensi_Payload, payload);

        const result = await this.service.updateInformation(payload);

        return result;
    };
}
