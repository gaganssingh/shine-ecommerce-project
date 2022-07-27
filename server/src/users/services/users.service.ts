import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from '../interfaces/user-details.interface';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}

  // HELPERS
  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.usersModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.usersModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  // BUSINESS METHODS
  async create(userDetails: User): Promise<UserDocument> {
    const user = new this.usersModel(userDetails);
    return user.save();
  }
}
