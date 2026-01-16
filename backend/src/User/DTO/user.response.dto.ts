import {Exclude, Expose} from 'class-transformer';
export class UserResponseDto{
    @Expose()
    UserID: number;

    @Expose()
    FullName: string;

    @Expose()
    Email: string;

    @Exclude()
    PasswordHash: string;

    @Expose()
    PhoneNumber: string | null;

    @Expose()
    Address: string | null;

    @Expose()
    RoleID: number | null;

    @Expose()
    CreatedAt: Date | null;
}