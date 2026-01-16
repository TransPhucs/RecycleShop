import { Module } from '@nestjs/common';
import {UserModule} from "./User/user.module";
import {AuthModule} from "./Auth/auth.module";

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
