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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const user_helper_1 = require("./Helper/user.helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserService = class UserService {
    userRepository;
    helperUser;
    constructor(userRepository, helperUser) {
        this.userRepository = userRepository;
        this.helperUser = helperUser;
    }
    async createUser(createUserDto) {
        await this.helperUser.checkEmail(createUserDto.Email);
        const password = await bcrypt_1.default.hash(createUserDto.PasswordHash, 10);
        createUserDto.PasswordHash = password;
        return this.userRepository.create(createUserDto);
    }
    async updateUser(id, updateUserDto) {
        await this.helperUser.checkUser(id);
        return this.userRepository.update(id, updateUserDto);
    }
    async updatePassword(id, changePassDto) {
        await this.helperUser.checkPassword(id, changePassDto);
        if (changePassDto.newPassword !== changePassDto.confirmPassword) {
            throw new common_1.ConflictException("Mật khẩu không trùng nhau");
        }
        const hashedPassword = await bcrypt_1.default.hash(changePassDto.confirmPassword, 10);
        return this.userRepository.updatePassword(id, hashedPassword);
    }
    async findOne(id) {
        await this.helperUser.checkUser(id);
        return this.userRepository.findOne(id);
    }
    async findAll() {
        return this.userRepository.findAll();
    }
    async deleteOne(id) {
        await this.helperUser.checkUser(id);
        return this.userRepository.deleteOne(id);
    }
    async deleteMany(id) {
        return this.userRepository.deleteMany(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_helper_1.UserHelper])
], UserService);
//# sourceMappingURL=user.service.js.map