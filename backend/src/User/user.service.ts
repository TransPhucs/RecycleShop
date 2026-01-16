import {ConflictException, Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {UserHelper} from "./Helper/user.helper";
import {UserRequestDto} from "./DTO/user.request.dto";
import {UserResponseDto} from "./DTO/user.response.dto";
import bcrypt from "bcrypt";
import {ChangePasswordDto} from "./DTO/user.changePass.dto";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly helperUser: UserHelper,
    ) {}

    async createUser(createUserDto: UserRequestDto): Promise<UserResponseDto> {
        await this.helperUser.checkEmail(createUserDto.Email);
        const password = await bcrypt.hash(createUserDto.PasswordHash, 10);
        createUserDto.PasswordHash = password;
        return this.userRepository.create(createUserDto);
    }

    async updateUser(id: number, updateUserDto: UserRequestDto): Promise<UserResponseDto> {
        await this.helperUser.checkUser(id);
        return this.userRepository.update(id, updateUserDto);
    }

    async updatePassword(id: number, changePassDto: ChangePasswordDto): Promise<UserResponseDto> {
        await this.helperUser.checkPassword(id, changePassDto);
        if(changePassDto.newPassword !== changePassDto.confirmPassword) {
            throw new ConflictException("Mật khẩu không trùng nhau");
        }
        const hashedPassword = await bcrypt.hash(changePassDto.confirmPassword, 10);
        return this.userRepository.updatePassword(id, hashedPassword);
    }

    async findOne(id: number): Promise<UserResponseDto | null> {
        await this.helperUser.checkUser(id);
        return this.userRepository.findOne(id);
    }

    async findAll(): Promise<UserResponseDto[]> {
        return this.userRepository.findAll();
    }

    async deleteOne(id: number): Promise<UserResponseDto | null> {
        await this.helperUser.checkUser(id);
        return this.userRepository.deleteOne(id);
    }

    async deleteMany(id: number[]): Promise<{count: number}> {
        return this.userRepository.deleteMany(id);
    }
}