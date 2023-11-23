import { PickType } from '@nestjs/swagger';

import { TodoDTO } from './todo.dto';

export class CreateTodoDTO extends PickType(TodoDTO, ['title']) {}
