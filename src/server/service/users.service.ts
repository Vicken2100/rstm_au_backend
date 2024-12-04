import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { UsersService } from "../../contract/service.contract";
import { List_Payload, ListResult } from "../../module/dto.module";
import { compose, composeResult } from "../../utils/helper.utils";
import { UsersResult } from "../dto/users.dto";
import { UsersAttributes } from "../model/users.model";
import { BaseService } from "./base.service";

export class Users extends BaseService implements UsersService {
    private usersRepo!: UsersRepository;
    init(repository: AppRepositoryMap): void {
        this.usersRepo = repository.users;
    }

    getList = async (payload: List_Payload): Promise<ListResult<UsersResult>> => {
        const result = await this.usersRepo.findList(payload);

        const items = compose(result.rows, composeUsers);

        return {
            items,
            count: result.count,
        };
    };
}

export function composeUsers(row: UsersAttributes): UsersResult {
    return composeResult(row, {
        username: row.username,
        birthDate: row.birthDate,
        isMale: row.isMale,
        nik: row.nik,
        noTelp: row.noTelp,
        namaBank: row.namaBank,
        noRek: row.noRek,
        namaRekening: row.namaRekening,
        alamatKecamatan: row.alamatKecamatan,
        alamatKota: row.alamatKota,
        alamatProvinsi: row.alamatProvinsi,
        jabatan: row.jabatan,
        dateIn: row.dateIn,
        email: row.email,
        pin: row.pin,
    });
}
