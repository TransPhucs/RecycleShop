import {IsNotEmpty, IsString, IsOptional, IsNumber, IsDate, IsEmail, MinLength, IsIn} from "class-validator";
export class UserRequestDto{
    @IsNotEmpty({message: 'Họ tên không được bỏ trống'})
    @IsString()
    FullName: string;

    @IsNotEmpty({message: 'Email không được bỏ trống'})
    @IsString()
    @IsEmail({}, {message: 'Email không đúng định dạng'})
    Email: string;

    @IsNotEmpty({message: 'Mật khẩu không được bỏ trống'})
    @IsString()
    @MinLength(8)
    PasswordHash: string;

    @IsString()
    @IsOptional()
    PhoneNumber?: string;

    @IsString()
    @IsOptional()
    Address?: string;

    @IsNumber()
    @IsOptional()
    @IsIn([1, 2], {message: "RoleID không hợp lệ, chỉ chấp nhận 1 (Admin) hoặc 2 (User)"})
    RoleID: number;
}