import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { UsersService } from "../../contract/service.contract";
import { bcryptModule } from "../../module/bcrypt.module";
import { List_Payload, ListResult } from "../../module/dto.module";
import { errorResponses } from "../../response";
import { compose, composeResult, updateData } from "../../utils/helper.utils";
import { UpdateProfileRequest, UsersResult } from "../dto/users.dto";
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

    getProfile = async (xid: string): Promise<UsersResult> => {
        const result = await this.usersRepo.findByXid(xid);

        if (!result) {
            throw errorResponses.getError("E_FOUND_1");
        }

        return composeUsers(result);
    };

    updateProfile = async (payload: UpdateProfileRequest): Promise<UsersResult> => {
        const {
            xid,
            version,
            username,
            password,
            birthDate,
            isMale,
            nik,
            noRek,
            noTelp,
            namaBank,
            namaRekening,
            alamatKecamatan,
            alamatKota,
            alamatProvinsi,
        } = payload;

        const users = await this.usersRepo.findByXid(xid);

        if (!users) {
            throw errorResponses.getError("E_FOUND_1");
        }

        const newPassword = await bcryptModule.hash(password);

        const updateValues = updateData<UsersAttributes>(users, {
            username,
            password: newPassword,
            birthDate,
            isMale,
            nik,
            noRek,
            noTelp,
            namaBank,
            namaRekening,
            alamatKecamatan,
            alamatKota,
            alamatProvinsi,
        });

        const result = await this.usersRepo.updateUsers(users.id, updateValues, version);

        if (!result) {
            throw errorResponses.getError("E_REQ_2");
        }

        Object.assign(users, updateValues);

        return composeUsers(users);
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
