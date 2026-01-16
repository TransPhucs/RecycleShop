import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    validate(email: string, password: string): Promise<any>;
    authLogin(user: any): Promise<{
        token: string;
    }>;
}
