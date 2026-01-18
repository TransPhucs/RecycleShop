import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import {UserService} from "../User/user.service";
@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
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
            const {PasswordHash, ...results} = user;
            return results;
        }
        return null;
    }

    // src/Auth/auth.service.ts

    async validateGoogleUser(googleUser: any) {
        const { email, firstName, lastName, picture, googleId } = googleUser;

        let user = await this.prismaService.users.findUnique({
            where: {
                Email: email
            },
        });

        if (user) {
            if (!user.googleId) {
                user = await this.prismaService.users.update({
                    where: { Email: email },
                    data: { googleId, avatar: picture, provider: 'google' },
                });
            }
        } else {
            user = await this.prismaService.users.create({
                data: {
                    Email: email, // Gán email vào cột Email
                    FullName: `${firstName} ${lastName}`,
                    PasswordHash: '',
                    avatar: picture,
                    googleId,
                    provider: 'google',
                },
            });
        }

        return this.authLogin(user);
    }

    async authLogin(user: any) {
        const payload = {sub: user.UserID, fullname: user.fullname, email: user.email, phone: user.phone, role: user.role};
        return{
            token: this.jwtService.sign(payload),
            user: user
        }
    }

    async authRegister(user: any) {
        return this.userService.createUser(user);
    }
}