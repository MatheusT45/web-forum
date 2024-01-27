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
import { Question } from 'src/entities/question.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @Inject('EXERCISE_REPOSITORY')
    private exerciseRepository: Repository<Exercise>,
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Exercise>> {
    return paginate(query, this.exerciseRepository, {
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
    const exercise = await this.exerciseRepository.save(createExerciseDto);
    const createdQuestions: Question[] = [];

    for (const question of createExerciseDto.questions) {
      question.exercise = exercise;
      createdQuestions.push(await this.questionRepository.save(question));
    }

    // Avoid circular reference
    const response = {
      ...exercise,
      questions: createdQuestions.map(
        (q) =>
          ({
            id: q.id,
            description: q.description,
          }) as Question,
      ),
    };

    return response;
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    const { questions, ...exercise } = updateExerciseDto;

    if (questions) {
    }

    const { affected } = await this.exerciseRepository.update(id, exercise);
    if (affected > 0) {
      return this.exerciseRepository.findOne({ where: { id } });
    }
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const { affected } = await this.exerciseRepository.delete(id);
    return {
      success: affected > 0,
    };
  }
}
