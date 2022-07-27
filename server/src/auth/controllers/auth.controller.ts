import { Body, Controller, Post } from '@nestjs/common';
import { UserDetails } from 'src/users/interfaces/user-details.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDetails | null> {
    return this.authService.signup(createUserDto);
  }
}
