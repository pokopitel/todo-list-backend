import { OmitType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

export class UserSafeWithNoPasswordDTO extends OmitType(UserDTO, [
  'refreshToken',
  'username',
  'password',
]) {}
