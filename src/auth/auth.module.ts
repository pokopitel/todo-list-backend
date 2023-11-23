import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';

import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    PrismaService,
    UserService,
  ],
  controllers: [AuthController],
  imports: [JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
