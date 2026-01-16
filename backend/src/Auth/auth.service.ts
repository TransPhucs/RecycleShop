import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {AuthLoginDto} from "./Dto/auth.login.dto";
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async validate(email: string, password: string): Promise<any> {
        const user = await this.prismaService.users.findFirst({
            where: {
                Email: email,
            }
        });
        if (!user) {
            throw new UnauthorizedException("Tài khoản không tồn tại");
        }
        const passwordCompare = await bcrypt.compare(password, user.PasswordHash);
        if (!passwordCompare) {
            throw new UnauthorizedException("Mật khẩu không chính xác");
        }
        if(user && passwordCompare){
            const {...results} = user;
            return results;
        }
        return null;
    }

    async authLogin(user: any) {
        const payload = {sub: user.UserID, fullname: user.fullname, email: user.email, phone: user.phone, role: user.role};
        return{
            token: this.jwtService.sign(payload)
        }
    }
}