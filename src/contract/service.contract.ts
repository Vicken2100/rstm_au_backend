import { List_Payload, ListResult } from "../module/dto.module";
import { LoginPayload, LoginResult } from "../server/dto/auth.dto";
import { UsersResult } from "../server/dto/users.dto";

export interface AppServiceMap {
    auth: AuthService;
    users: UsersService;
}

export interface AuthService {
    login(payload: LoginPayload): Promise<LoginResult>;
}

export interface UsersService {
    getList(payload: List_Payload): Promise<ListResult<UsersResult>>;
}
