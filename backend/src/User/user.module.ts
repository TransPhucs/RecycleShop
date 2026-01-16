import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {UserHelper} from "./Helper/user.helper";
import {PrismaService} from "../../prisma/prisma.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, UserRepository, UserHelper, PrismaService],
    exports: [UserService, UserRepository, UserHelper, PrismaService],
})
export class UserModule {}