import { UserService } from "./user.service";
import { UserRequestDto } from "./DTO/user.request.dto";
import { UserResponseDto } from "./DTO/user.response.dto";
import { ChangePasswordDto } from "./DTO/user.changePass.dto";
import { UserDeleteDto } from "./DTO/user.delete.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(createUserDto: UserRequestDto): Promise<UserResponseDto>;
    updateUser(id: number, updateUserDto: UserRequestDto): Promise<UserResponseDto>;
    changpassword(id: number, changePasswordDto: ChangePasswordDto): Promise<UserResponseDto>;
    findOne(id: number): Promise<UserResponseDto | null>;
    findMany(): Promise<UserResponseDto[]>;
    deleteOne(id: number): Promise<UserResponseDto | null>;
    deleteMany(userDeleteDto: UserDeleteDto): Promise<{
        count: number;
    }>;
}
