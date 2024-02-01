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
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { UserDto } from 'src/dtos/user.dto';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('usuarios')
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    return this.service.findAll(query);
  }

  @Post('usuario')
  create(@Body() createUserDto: UserDto): Promise<User> {
    return this.service.create(createUserDto);
  }

  @Patch('usuario/:id')
  updatePatch(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UserDto>,
  ): Promise<User> {
    return this.service.patch(+id, updateUserDto);
  }

  @Put('usuario/:id')
  updatePut(
    @Body() updateUserDto: UserDto,
    @Param('id') id?: string,
  ): Promise<User> {
    return this.service.put(updateUserDto, +id);
  }

  @Delete('usuario/:id')
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.remove(+id);
  }
}
