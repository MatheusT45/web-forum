import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import * as bcrypt from 'bcrypt';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.repository, {
      sortableColumns: ['id', 'name', 'cpf'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'cpf'],
      select: ['id', 'name', 'cpf', 'createdAt', 'updatedAt'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    return await this.repository.save({ ...createUserDto, password: hash });
  }

  async patch(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { affected } = await this.repository.update(id, updateUserDto);
    if (affected > 0) {
      return this.repository.findOne({ where: { id } });
    }
    throw new Error('Usuário não encontrado');
  }

  async put(updateUserDto: CreateUserDto, id?: number): Promise<User> {
    this.repository.create({ ...updateUserDto, id });

    return await this.repository.save({ ...updateUserDto, id });
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const { affected } = await this.repository.delete(id);
    return {
      success: affected > 0,
    };
  }
}
