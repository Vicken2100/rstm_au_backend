import { Router } from "express";
import { AppServiceMap } from "../../contract/service.contract";
import { AuthController } from "./auth.controller";
import { BaseController } from "./base.controller";
import { BonusController } from "./bonus.controller";
import { JabatanGajiController } from "./jabatan-gaji.controller";
import { UangLemburController } from "./uang-lembur.controller";
import { UangMakanController } from "./uang-makan.controller";
import { UsersController } from "./users.controller";
import { PenilaianController } from "./penilaian.controller";
import { PresensiController } from "./presensi.controller";
import { GajiController } from "./gaji.controller";
export class Controller {
    private readonly auth: BaseController = new AuthController();
    private readonly users: BaseController = new UsersController();
    private readonly jabatanGaji: BaseController = new JabatanGajiController();
    private readonly uangMakan: BaseController = new UangMakanController();
    private readonly uangLembur: BaseController = new UangLemburController();
    private readonly bonus: BaseController = new BonusController();
    private readonly penilaian: BaseController = new PenilaianController();
    private readonly presensi: BaseController = new PresensiController();
    private readonly gaji: BaseController = new GajiController();

    init(service: AppServiceMap): Router {
        const router = Router();
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseController) {
                r.init(service);
                r.initRoute();
                const prefix = `/${r.getPrefix()}`;
                router.use(prefix, r.getRouter());

                console.log(`initiate ${k} route`);
            }
        });

        return router;
    }
}
