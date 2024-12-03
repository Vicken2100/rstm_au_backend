import { FindResult, List_Payload } from "../module/dto.module";
import { UsersAttributes, UsersCreationAttributes } from "../server/model/users.model";

export interface AppRepositoryMap {
    users: UsersRepository;
}

export interface UsersRepository {
    createUsers(payload: UsersCreationAttributes): Promise<UsersAttributes>;

    findByEmail(email: string): Promise<UsersAttributes | null>;

    findByXid(xid: string): Promise<UsersAttributes | null>;

    findUsersCount(): Promise<number>;

    findList(payload: List_Payload): Promise<FindResult<UsersAttributes>>;

    updateUsers(id: number, payload: Partial<UsersAttributes>, version: number): Promise<number>;
}
