import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDetails } from 'src/users/interfaces/user-details.interface';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // HELPERS
  async hashPassword(plainPassword: string): Promise<string> {
    // Salt & hash and save the password
    const salt = randomBytes(12).toString('hex');
    const hash = (await scrypt(plainPassword, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }

  // BUSINESS METHODS
  async signup(createUserDto: CreateUserDto): Promise<UserDetails | null> {
    const { email, password } = createUserDto;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(`Email address in use`);
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
}
