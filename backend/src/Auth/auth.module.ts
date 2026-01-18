import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {PrismaService} from "../../prisma/prisma.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {UserService} from "../User/user.service";
import {UserModule} from "../User/user.module";
import {JwtStrategy} from "./jwt.strategy";
import {GoogleStrategy} from "./google-strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: "1d"},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy, GoogleStrategy],
    exports: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
})

export class AuthModule {}