import { PrismaService } from "../../prisma/prisma.service";
import { UserRequestDto } from "./DTO/user.request.dto";
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(UserID: number): Promise<{
        FullName: string;
        Email: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        UserID: number;
        CreatedAt: Date | null;
        googleId: string | null;
        avatar: string | null;
        provider: string | null;
    } | null>;
    findAll(): Promise<{
        FullName: string;
        Email: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        UserID: number;
        CreatedAt: Date | null;
        googleId: string | null;
        avatar: string | null;
        provider: string | null;
    }[]>;
    create(createUserDto: UserRequestDto): Promise<{
        FullName: string;
        Email: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        UserID: number;
        CreatedAt: Date | null;
        googleId: string | null;
        avatar: string | null;
        provider: string | null;
    }>;
    update(UserID: number, UpdateUserDto: UserRequestDto): Promise<{
        FullName: string;
        Email: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        UserID: number;
        CreatedAt: Date | null;
        googleId: string | null;
        avatar: string | null;
        provider: string | null;
    }>;
    updatePassword(UserID: number, newHash: string): Promise<{
        FullName: string;
        Email: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        UserID: number;
        CreatedAt: Date | null;
        googleId: string | null;
        avatar: string | null;
        provider: string | null;
    }>;
    deleteOne(UserID: number): Promise<{
        FullName: string;
        Email: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        UserID: number;
        CreatedAt: Date | null;
        googleId: string | null;
        avatar: string | null;
        provider: string | null;
    }>;
    deleteMany(UserIDs: number[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
