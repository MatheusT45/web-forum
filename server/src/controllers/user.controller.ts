import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
  updatePatch(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.service.patch(+id, updateUserDto);
  }

  @Put('usuario/:id')
  updatePut(
    @Body() updateUserDto: CreateUserDto,
    @Param('id') id?: string,
  ): Promise<User> {
    return this.service.put(updateUserDto, +id);
  }

  @Delete('usuario/:id')
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.remove(+id);
  }
}
