import { AppRepositoryMap } from "../../contract/repository.contract";
import {
    AppServiceMap,
    AuthService,
    BonusService,
    JabatanGajiService,
    UangLemburService,
    UangMakanService,
    UsersService,
} from "../../contract/service.contract";
import { Auth } from "./auth.service";
import { BaseService } from "./base.service";
import { Bonus } from "./bonus.service";
import { JabatanGaji } from "./jabatan-gaji.service";
import { UangLembur } from "./uang-lembur.service";
import { UangMakan } from "./uang-makan.service";
import { Users } from "./users.service";

export class Service implements AppServiceMap {
    readonly auth: AuthService = new Auth();
    readonly users: UsersService = new Users();
    readonly jabatanGaji: JabatanGajiService = new JabatanGaji();
    readonly uangMakan: UangMakanService = new UangMakan();
    readonly uangLembur: UangLemburService = new UangLembur();
    readonly bonus: BonusService = new Bonus();

    init(repository: AppRepositoryMap) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseService) {
                r.init(repository);
                console.log(`initiate service ${k}`);
            }
        });
    }
}
