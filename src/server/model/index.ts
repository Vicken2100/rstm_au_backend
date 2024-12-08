import { Sequelize } from "sequelize";
import { Users } from "./users.model";
import { Presensi } from "./presensi.model";
import { Gaji } from "./gaji.model";

export interface AppSqlModel {
    Users: typeof Users;
    Presensi: typeof Presensi;
    Gaji: typeof Gaji;
}

export function initSqlModels(sequelize: Sequelize): AppSqlModel {
    Users.initModels(sequelize);
    Presensi.initModels(sequelize);
    Gaji.initModels(sequelize);

    return {
        Users,
        Presensi,
        Gaji,
    };
}
