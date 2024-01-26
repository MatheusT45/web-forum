import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';
import { CreateExerciseDto } from 'src/dto/exercise/create-exercise.dto';
import { UpdateExerciseDto } from 'src/dto/exercise/update-exercise.dto';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class ExerciseService {
  constructor(
    @Inject('EXERCISE_REPOSITORY')
    private repository: Repository<Exercise>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Exercise>> {
    return paginate(query, this.repository, {
      sortableColumns: ['id', 'name', 'description'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'description'],
      select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
      filterableColumns: {
        description: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return await this.repository.save(createExerciseDto);
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    const { affected } = await this.repository.update(id, updateExerciseDto);
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
