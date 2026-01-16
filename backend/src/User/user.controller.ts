import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";
import {UserRequestDto} from "./DTO/user.request.dto";
import {UserResponseDto} from "./DTO/user.response.dto";
import {ChangePasswordDto} from "./DTO/user.changePass.dto";
import {UserDeleteDto} from "./DTO/user.delete.dto";
import {JwtAuthGuard} from "../Auth/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}


    @Post('create')
    async createUser(@Body() createUserDto: UserRequestDto): Promise<UserResponseDto> {
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(`update/:id`)
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UserRequestDto): Promise<UserResponseDto> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(`changpassword/:id`)
    async changpassword(@Param('id') id: number, @Body() changePasswordDto: ChangePasswordDto): Promise<UserResponseDto> {
        return this.userService.updatePassword(id, changePasswordDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`get/:id`)
    async findOne(@Param('id') id: number): Promise<UserResponseDto | null> {
        return this.userService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`getMany`)
    async findMany(): Promise<UserResponseDto[]> {
        return this.userService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteOne(@Param('id') id: number): Promise<UserResponseDto | null> {
        return this.userService.deleteOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteMany')
    async deleteMany(@Body() userDeleteDto: UserDeleteDto): Promise<{count: number}> {
        return this.userService.deleteMany(userDeleteDto.UserIDs);
    }
}