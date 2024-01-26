import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from 'src/entities/user.entity';
import { LoginDto } from 'src/dto/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  create(@Body() loginDto: LoginDto): Promise<User> {
    return this.service.login(loginDto);
  }
}
