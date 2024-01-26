import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('usuarios')
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.service.findAll(query);
  }

  @Post('usuario')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.service.create(createUserDto);
  }

  @Patch('usuario/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.service.update(+id, updateUserDto);
  }

  @Delete('usuario/:id')
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.remove(+id);
  }
}
