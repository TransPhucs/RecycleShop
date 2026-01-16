import { InputType, Field } from '@nestjs/graphql';
import {IsEmail, IsNotEmpty, MinLength} from "class-validator";
@InputType()
export class AuthLoginDto{
    @IsNotEmpty()
    @IsEmail({}, {message: 'Email không hợp lệ'})
    email: string;

    @IsNotEmpty()
    @MinLength(8, {message: "Mật khẩu phải 8 ký tự"})
    password: string;
}