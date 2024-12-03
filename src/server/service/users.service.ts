import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { GetDetail_Payload } from "../../module/dto.module";
import { BaseService } from "./base.service";

export class Users extends BaseService {
    private userRepo!: UsersRepository;
    init(repository: AppRepositoryMap): void {
        this.userRepo = repository.users;
    }
}
