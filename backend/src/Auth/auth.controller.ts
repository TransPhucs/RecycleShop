import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {UserRequestDto} from "../User/DTO/user.request.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.authLogin(req.user);
    }

    @Post('register')
    async register(@Body() createUserDto: UserRequestDto) {
        return this.authService.authRegister(createUserDto);
    }
}