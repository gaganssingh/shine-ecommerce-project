import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDetails } from 'src/users/interfaces/user-details.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dtos/login-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // HELPERS
  async hashPassword(plainPassword: string): Promise<string> {
    // Salt & hash and save the password
    const salt = randomBytes(12).toString('hex');
    const hash = (await scrypt(plainPassword, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }

  async comparePasswords(
    plainPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    // Validate plain text password against the stores-hashed password
    const [salt, storedHash] = storedPassword.split('.');

    const providedPasswordToHash = (await scrypt(
      plainPassword,
      salt,
      32,
    )) as Buffer;
    return storedHash === providedPasswordToHash.toString('hex');
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<UserDetails | null> {
    const { email, password: plainPassword } = loginUserDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email "${email} not found"`);
    }

    const matchPasswords = await this.comparePasswords(
      plainPassword,
      user.password,
    );
    if (!matchPasswords) {
      throw new BadRequestException(
        `Invalid credentials provided; please try again`,
      );
    }

    return this.usersService._getUserDetails(user);
  }

  // BUSINESS METHODS
  async signup(createUserDto: CreateUserDto): Promise<UserDetails | null> {
    const { email, password } = createUserDto;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(`Email address already in use`);
    }

    const hashedPassword = await this.hashPassword(password);

    // Create the user
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Return the newly created user
    // by passing it through the password stripping helper method
    return this.usersService._getUserDetails(user);
  }

  // The signin method is used to respond to the client
  // with the JWT
  async signin(loginUserDto: LoginUserDto): Promise<{ token: string } | null> {
    const user = await this.validateUser(loginUserDto);

    if (!user) {
      throw new BadRequestException(
        `Invalid credentials provided; please try again`,
      );
    }

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return exp;
    } catch (error) {
      throw new UnauthorizedException(`Unauthorized request`);
    }
  }
}
