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

  async login(cpf: string, password: string): Promise<User> {
    const user = await this.repository.findOne({ where: { cpf } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

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

  async findOne(id: number): Promise<User> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { affected } = await this.repository.update(id, updateUserDto);
    if (affected > 0) {
      return this.repository.findOne({ where: { id } });
    }
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const { affected } = await this.repository.delete(id);
    return {
      success: affected > 0,
    };
  }
}
