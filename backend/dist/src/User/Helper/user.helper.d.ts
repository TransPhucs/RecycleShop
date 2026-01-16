import { PrismaService } from "../../../prisma/prisma.service";
import { ChangePasswordDto } from "../DTO/user.changePass.dto";
export declare class UserHelper {
    private prismaService;
    constructor(prismaService: PrismaService);
    checkEmail(email: string): Promise<void>;
    checkUser(UserID: number): Promise<void>;
    checkPassword(UserID: number, changePass: ChangePasswordDto): Promise<void>;
}
