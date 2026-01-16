"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelper = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserHelper = class UserHelper {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async checkEmail(email) {
        const count = await this.prismaService.users.count({
            where: {
                Email: email
            }
        });
        if (count !== 0) {
            throw new common_1.NotFoundException("Email đã được sử dụng");
        }
    }
    async checkUser(UserID) {
        const count = await this.prismaService.users.count({
            where: {
                UserID: UserID
            }
        });
        if (count === 0) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${UserID}`);
        }
    }
    async checkPassword(UserID, changePass) {
        const checkUser = await this.prismaService.users.findUnique({
            where: { UserID: UserID }
        });
        if (!checkUser) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID ${UserID}`);
        }
        const checkOldPassword = await bcrypt_1.default.compare(changePass.oldPassword, checkUser.PasswordHash);
        if (!checkOldPassword) {
            throw new common_1.UnauthorizedException("Mật khẩu hiện tại không chính xác");
        }
    }
};
exports.UserHelper = UserHelper;
exports.UserHelper = UserHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserHelper);
//# sourceMappingURL=user.helper.js.map