import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

import { UserDTO, UserSafeDTO, UserSafeWithNoPasswordDTO } from './dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOkResponse({ type: UserSafeWithNoPasswordDTO || null })
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserSafeWithNoPasswordDTO> {
    return this.userService.findByIdSafe(id);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Patch()
  @ApiOkResponse({ type: UserSafeDTO })
  update(@Req() req: Request, @Body() data: UserSafeDTO): Promise<UserDTO> {
    const userId = req.user['sub'];

    return this.userService.update(userId, data);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Delete()
  @ApiOkResponse({ type: UserDTO })
  remove(@Req() req: Request): Promise<UserDTO> {
    const userId = req.user['sub'];

    return this.userService.remove(userId);
  }
}
