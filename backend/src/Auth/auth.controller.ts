import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {UserRequestDto} from "../User/DTO/user.request.dto";
import {AuthGuard} from "@nestjs/passport";

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

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Request() req) {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req) {
        // req.user chứa thông tin từ hàm validate bên GoogleStrategy
        return this.authService.validateGoogleUser(req.user);
    }
}