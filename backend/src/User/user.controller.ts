import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";
import {UserRequestDto} from "./DTO/user.request.dto";
import {UserResponseDto} from "./DTO/user.response.dto";
import {ChangePasswordDto} from "./DTO/user.changePass.dto";
import {UserDeleteDto} from "./DTO/user.delete.dto";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('create')
    async createUser(@Body() createUserDto: UserRequestDto): Promise<UserResponseDto> {
        return this.userService.createUser(createUserDto);
    }

    @Put(`update/:id`)
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UserRequestDto): Promise<UserResponseDto> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Put(`changpassword/:id`)
    async changpassword(@Param('id') id: number, @Body() changePasswordDto: ChangePasswordDto): Promise<UserResponseDto> {
        return this.userService.updatePassword(id, changePasswordDto);
    }

    @Get(`get/:id`)
    async findOne(@Param('id') id: number): Promise<UserResponseDto | null> {
        return this.userService.findOne(id);
    }

    @Get(`getMany`)
    async findMany(): Promise<UserResponseDto[]> {
        return this.userService.findAll()
    }

    @Delete('delete/:id')
    async deleteOne(@Param('id') id: number): Promise<UserResponseDto | null> {
        return this.userService.deleteOne(id);
    }

    @Delete('deleteMany')
    async deleteMany(@Body() userDeleteDto: UserDeleteDto): Promise<{count: number}> {
        return this.userService.deleteMany(userDeleteDto.UserIDs);
    }
}