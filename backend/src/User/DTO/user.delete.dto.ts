import {IsArray, IsNumber} from "class-validator";

export class UserDeleteDto {
    @IsArray()
    @IsNumber({}, {each: true})// Kiểm tra từng phần tử trong mảng phải là số
    UserIDs: number[];
}