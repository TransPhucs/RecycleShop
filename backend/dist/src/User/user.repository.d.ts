import { PrismaService } from "../../prisma/prisma.service";
import { UserRequestDto } from "./DTO/user.request.dto";
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(UserID: number): Promise<{
        UserID: number;
        Email: string;
        FullName: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        CreatedAt: Date | null;
    } | null>;
    findAll(): Promise<{
        UserID: number;
        Email: string;
        FullName: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        CreatedAt: Date | null;
    }[]>;
    create(createUserDto: UserRequestDto): Promise<{
        UserID: number;
        Email: string;
        FullName: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        CreatedAt: Date | null;
    }>;
    update(UserID: number, UpdateUserDto: UserRequestDto): Promise<{
        UserID: number;
        Email: string;
        FullName: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        CreatedAt: Date | null;
    }>;
    updatePassword(UserID: number, newHash: string): Promise<{
        UserID: number;
        Email: string;
        FullName: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        CreatedAt: Date | null;
    }>;
    deleteOne(UserID: number): Promise<{
        UserID: number;
        Email: string;
        FullName: string;
        PasswordHash: string;
        PhoneNumber: string | null;
        Address: string | null;
        RoleID: number | null;
        CreatedAt: Date | null;
    }>;
    deleteMany(UserIDs: number[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
