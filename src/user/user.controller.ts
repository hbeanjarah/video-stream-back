import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entities';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const user = await this.userService.ceateUser(
      createUserDto.email,
      hashedPassword,
    );
    return user;
  }
}
