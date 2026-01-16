import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../../../prisma/prisma.service";
import bcrypt from "bcrypt";
import {ChangePasswordDto} from "../DTO/user.changePass.dto";
@Injectable()
export class UserHelper {
    constructor(private prismaService: PrismaService) {}

    async checkEmail(email: string): Promise<void> {
        const count = await this.prismaService.users.count({
            where: {
                Email: email
            }
        });
        if(count !== 0) {
            throw new NotFoundException("Email đã được sử dụng");
        }
    }

    async checkUser(UserID: number): Promise<void> {
        const count = await this.prismaService.users.count({
            where: {
                UserID: UserID
            }
        });
        if(count === 0) {
            throw new NotFoundException(`Không tìm thấy người dùng với ID ${UserID}`);
        }
    }

    async checkPassword(UserID: number, changePass: ChangePasswordDto): Promise<void> {
        const checkUser = await this.prismaService.users.findUnique({
            where: {UserID: UserID}
        });
        if(!checkUser) {
            throw new NotFoundException(`Không tìm thấy người dùng với ID ${UserID}`);
        }
        const checkOldPassword = await bcrypt.compare(changePass.oldPassword, checkUser.PasswordHash);
        if(!checkOldPassword) {
            throw new UnauthorizedException("Mật khẩu hiện tại không chính xác");
        }
    }
}