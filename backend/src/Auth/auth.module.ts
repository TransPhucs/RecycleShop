import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {PrismaService} from "../../prisma/prisma.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: "1d"},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, LocalStrategy],
    exports: [AuthService, PrismaService, LocalStrategy],
})

export class AuthModule {}