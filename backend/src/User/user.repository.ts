import {PrismaService} from "../../prisma/prisma.service";
import {UserRequestDto} from "./DTO/user.request.dto";
import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Injectable} from "@nestjs/common";
import {UserResponseDto} from "./DTO/user.response.dto";
import {ChangePasswordDto} from "./DTO/user.changePass.dto";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(UserID: number) {
        return this.prisma.users.findUnique({
            where: {
                UserID: UserID
            }
        });
    }

    async findAll(){
        return this.prisma.users.findMany();
    }

    async create(createUserDto: UserRequestDto) {
        return this.prisma.users.create({
            data:{
                FullName: createUserDto.FullName,
                Email: createUserDto.Email,
                PasswordHash: createUserDto.PasswordHash,
                PhoneNumber: createUserDto.PhoneNumber,
                Address: createUserDto.Address,
                RoleID: 1,
                CreatedAt: new Date(),
            },
        });
    }

    async update(UserID: number, UpdateUserDto: UserRequestDto) {
        return this.prisma.users.update({
            where: {
                UserID: UserID
            },
            data: {
                FullName: UpdateUserDto.FullName,
                PhoneNumber: UpdateUserDto.PhoneNumber,
                Address: UpdateUserDto.Address,
                RoleID: UpdateUserDto.RoleID,
            },
        });
    }

    async updatePassword(UserID: number, newHash: string) {
        return this.prisma.users.update({
            where: {UserID: UserID},
            data: {PasswordHash: newHash}
        });
    }

    async deleteOne(UserID: number) {
        return this.prisma.users.delete({
            where: {
                UserID: UserID
            }
        });
    }

    async deleteMany(UserIDs: number[]) {
        return this.prisma.users.deleteMany({
            where: {
                UserID: {
                    in: UserIDs // Sử dụng toán tử 'in' để xóa tất cả user có ID nằm trong danh sách
                }
            }
        });
    }
}