import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../User/user.service";
export declare class AuthService {
    private readonly prismaService;
    private readonly userService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, userService: UserService, jwtService: JwtService);
    validate(email: string, password: string): Promise<any>;
    validateGoogleUser(googleUser: any): Promise<{
        token: string;
        user: any;
    }>;
    authLogin(user: any): Promise<{
        token: string;
        user: any;
    }>;
    authRegister(user: any): Promise<import("../User/DTO/user.response.dto").UserResponseDto>;
}
