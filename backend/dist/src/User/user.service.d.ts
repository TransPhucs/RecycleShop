import { UserRepository } from "./user.repository";
import { UserHelper } from "./Helper/user.helper";
import { UserRequestDto } from "./DTO/user.request.dto";
import { UserResponseDto } from "./DTO/user.response.dto";
import { ChangePasswordDto } from "./DTO/user.changePass.dto";
export declare class UserService {
    private readonly userRepository;
    private readonly helperUser;
    constructor(userRepository: UserRepository, helperUser: UserHelper);
    createUser(createUserDto: UserRequestDto): Promise<UserResponseDto>;
    updateUser(id: number, updateUserDto: UserRequestDto): Promise<UserResponseDto>;
    updatePassword(id: number, changePassDto: ChangePasswordDto): Promise<UserResponseDto>;
    findOne(id: number): Promise<UserResponseDto | null>;
    findAll(): Promise<UserResponseDto[]>;
    deleteOne(id: number): Promise<UserResponseDto | null>;
    deleteMany(id: number[]): Promise<{
        count: number;
    }>;
}
