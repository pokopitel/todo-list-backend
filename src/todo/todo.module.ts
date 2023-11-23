import { Module } from '@nestjs/common';

import { TodoController } from './todo.controller';
import { PrismaService } from 'src/prisma.service';
import { TodoService } from './todo.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TodoService, PrismaService, UserService],
  controllers: [TodoController],
  exports: [TodoService],
  imports: [UserModule, AuthModule],
})
export class TodoModule {}
