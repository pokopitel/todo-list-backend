import { OmitType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

export class UserSafeDTO extends OmitType(UserDTO, [
  'refreshToken',
  'username',
  'id',
]) {}
