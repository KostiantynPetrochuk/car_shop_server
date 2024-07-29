import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from './auth.guard';
import { RefreshJwtGuard } from './refresh.guard';
import { AuthService } from './auth.service';
import { Role } from 'src/enums/role.enum';
import { Roles } from './roles.decorator';
import { SignUpDto } from './dto/signUpDto.dto';
import { SignInDto } from './dto/signInDto.dto';
import { LoggerService } from '../logger/logger.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private readonly logger = new LoggerService(AuthController.name);

  // @Throttle({ short: { ttl: 1000, limit: 1 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.login, signInDto.pwd);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    console.log(signUpDto);
    return this.authService.signUp(signUpDto.login, signUpDto.pwd);
  }

  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: FastifyRequest) {
    this.logger.log('get profile, pls', AuthController.name);
    return true;
  }

  // @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Post('user')
  getUser(@Req() req: FastifyRequest) {
    this.logger.log('get user, pls', AuthController.name);
    return { id: 10, name: 'Mikey', email: 'mikey@gmail.com' };
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    return await this.authService.refreshToken(req.user);
  }
}
