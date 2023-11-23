import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { TodoController } from './todo/todo.controller';
import { AuthController } from './auth/auth.controller';

import { PrismaService } from './prisma.service';
import { AppService } from './prisma/app.service';
import { TodoService } from './todo/todo.service';
import { UserService } from './user/user.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    TodoModule,
    UserModule,
  ],
  controllers: [AppController, UserController, TodoController, AuthController],
  providers: [AppService, PrismaService, TodoService, UserService],
})
export class AppModule {}
