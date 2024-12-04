import { AppRepositoryMap, UsersRepository } from "../../contract/repository.contract";
import { AuthService } from "../../contract/service.contract";
import { bcryptModule } from "../../module/bcrypt.module";
import { jwtModule } from "../../module/jwt.module";
import { errorResponses } from "../../response";
import { LoginPayload, LoginResult } from "../dto/auth.dto";
import { BaseService } from "./base.service";
import { composeUsers } from "./users.service";

export class Auth extends BaseService implements AuthService {
    private userRepo!: UsersRepository;
    init(repository: AppRepositoryMap): void {
        this.userRepo = repository.users;
    }

    login = async (payload: LoginPayload): Promise<LoginResult> => {
        const { email, password } = payload;

        console.log(payload);

        const users = await this.userRepo.findByEmail(email);

        if (!users) {
            throw errorResponses.getError("E_AUTH_2");
        }

        const verify = await bcryptModule.compare(password, users.password);

        if (!verify) {
            throw errorResponses.getError("E_AUTH_2");
        }

        const result = composeUsers(users) as LoginResult;

        result.token = {
            accessToken: jwtModule.issue({
                xid: users.xid,
                email: users.username,
            }),
            refreshToken: jwtModule.issueRefresh(users.xid),
        };

        return result;
    };
}
