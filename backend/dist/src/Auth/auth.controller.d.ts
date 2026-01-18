import { AuthService } from "./auth.service";
import { UserRequestDto } from "../User/DTO/user.request.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        token: string;
        user: any;
    }>;
    register(createUserDto: UserRequestDto): Promise<import("../User/DTO/user.response.dto").UserResponseDto>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        token: string;
        user: any;
    }>;
}
