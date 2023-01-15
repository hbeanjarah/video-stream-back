import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userEntity: Model<UserDocument>,
  ) {}

  async ceateUser(email: string, password: string): Promise<User> {
    return this.userEntity.create({
      email,
      password,
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userEntity.findById(id);
  }
}
