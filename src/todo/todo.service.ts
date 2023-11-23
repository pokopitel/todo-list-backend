import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

import { CreateTodoDTO, TodoDTO, UpdateTodoDTO } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(userId: number, data: CreateTodoDTO) {
    await this.userService.doesUserExist(userId);

    return this.prisma.todos.create({
      data: { userId, title: data.title },
    });
  }

  async update(id: number, userId: number, data: UpdateTodoDTO) {
    const todo = await this.findById(id);

    if (todo.userId !== userId) throw new ForbiddenException('Access Denied');

    return this.prisma.todos.update({ data, where: { id } });
  }

  async findByUser(userId: number) {
    await this.userService.doesUserExist(userId);
    const todos = await this.prisma.todos.findMany({ where: { userId } });

    return todos.sort((a, b) => a.id - b.id);
  }

  async remove(id: number, userId: number) {
    const todo = await this.findById(id);
    if (todo.userId !== userId) throw new ForbiddenException('Access Denied');

    return this.prisma.todos.delete({ where: { id } });
  }

  removeByUser(id: number) {
    return this.prisma.todos.deleteMany({ where: { userId: id } });
  }

  private async findById(id: number): Promise<TodoDTO> {
    const todo = await this.prisma.todos.findUnique({ where: { id } });

    if (!todo)
      throw new BadRequestException(`Todo with ID ${id} does not exist`);

    return todo;
  }
}
