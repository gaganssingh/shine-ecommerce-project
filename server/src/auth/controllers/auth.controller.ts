import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDetails } from 'src/users/interfaces/user-details.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { VerifyJwtDto } from '../dtos/verify-jwt.dto';
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

  @Post('/signin')
  @HttpCode(HttpStatus.ACCEPTED)
  async signin(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token: string } | null> {
    return this.authService.signin(loginUserDto);
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.ACCEPTED)
  async verifyJwt(@Body() verifyJwtDto: VerifyJwtDto) {
    const { jwt } = verifyJwtDto;
    return this.authService.verifyJwt(jwt);
  }
}
