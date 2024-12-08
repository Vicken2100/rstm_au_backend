import {
    AppRepositoryMap,
    GajiRepository,
    PresensiRepository,
    UsersRepository,
} from "../../contract/repository.contract";
import { AppDataSource } from "../../module/datasource.module";
import { BaseRepository } from "./base.repository";
import { SequelizeGajiRepository } from "./gaji.repository";
import { SequelizePresensiRepository } from "./presensi.repository";
import { SequelizeUsersRepository } from "./users.repository";

export class Repository implements AppRepositoryMap {
    readonly users: UsersRepository = new SequelizeUsersRepository();
    readonly presensi: PresensiRepository = new SequelizePresensiRepository();
    readonly gaji: GajiRepository = new SequelizeGajiRepository();

    init(datasource: AppDataSource) {
        Object.entries(this).forEach(([k, r]) => {
            if (r instanceof BaseRepository) {
                r.init(datasource);
                console.log(`initiate repository ${k}`);
            }
        });
    }
}
