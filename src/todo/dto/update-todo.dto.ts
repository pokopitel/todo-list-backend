import { PartialType, PickType } from '@nestjs/swagger';

import { TodoDTO } from './todo.dto';

export class UpdateTodoDTO extends PartialType(
  PickType(TodoDTO, ['title', 'isCheked']),
) {}
