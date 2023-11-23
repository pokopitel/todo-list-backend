import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { TodoService } from './todo.service';

import { CreateTodoDTO, TodoDTO, UpdateTodoDTO } from './dto';

@Controller('todo')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoDTO })
  create(@Req() req: Request, @Body() data: CreateTodoDTO) {
    const userId = req.user['sub'];

    return this.todoService.create(userId, data);
  }

  @Get('get-by-user/')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [TodoDTO] })
  async getByUser(@Req() req: Request): Promise<TodoDTO[]> {
    const userId = req.user['sub'];

    return this.todoService.findByUser(userId);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoDTO })
  updateTodo(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTodoDTO,
  ) {
    const userId = req.user['sub'];

    return this.todoService.update(id, userId, data);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoDTO })
  removeTodo(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user['sub'];

    return this.todoService.remove(id, userId);
  }
}
