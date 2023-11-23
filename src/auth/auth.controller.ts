import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';

import { AuthService } from './auth.service';

import { AuthDTO, TokensDTO } from './dto';
import { CreateUserDTO } from 'src/user/dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({ type: TokensDTO })
  signup(@Body() createUserDto: CreateUserDTO) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @ApiOkResponse({ type: TokensDTO })
  signin(@Body() data: AuthDTO) {
    return this.authService.signIn(data);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TokensDTO })
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  logout(@Req() req: Request) {
    const userId = req.user['sub'];

    this.authService.logout(userId);
  }
}
