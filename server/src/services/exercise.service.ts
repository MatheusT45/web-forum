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
      relations: ['questions'],
      sortableColumns: ['id', 'name', 'description'],
      nullSort: 'last',
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['name', 'description'],
      select: [
        'id',
        'name',
        'questions.id',
        'questions.description',
        'description',
        'createdAt',
      ],
      filterableColumns: {
        description: [FilterOperator.EQ, FilterSuffix.NOT],
        id: true,
      },
    });
  }

  async find(id: number): Promise<Exercise> {
    return await this.exerciseRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = this.exerciseRepository.create(createExerciseDto);

    const createdQuestions = await this.questionRepository.save(
      createExerciseDto.questions,
    );

    exercise.questions.push(...createdQuestions);

    await this.exerciseRepository.save(exercise);

    return await this.exerciseRepository.findOne({
      where: { id: exercise.id },
      relations: ['questions'],
    });
  }

  async patch(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    const { questions } = updateExerciseDto;

    const exerciseToUpdate = await this.exerciseRepository.findOne({
      where: { id },
      relations: ['questions'],
    });

    const createdQuestions = await this.questionRepository.save(questions);

    exerciseToUpdate.questions.push(...createdQuestions);
    await this.exerciseRepository.save(exerciseToUpdate);

    return await this.exerciseRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async put(
    updateExerciseDto: CreateExerciseDto,
    id?: number,
  ): Promise<Exercise> {
    const { questions, ...exercise } = updateExerciseDto;

    const exerciseToUpdate = this.exerciseRepository.create({
      id,
      ...exercise,
    });

    exerciseToUpdate.questions = await this.questionRepository.save(questions);

    await this.exerciseRepository.save(exerciseToUpdate);

    return await this.exerciseRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const { affected } = await this.exerciseRepository.delete(id);
    return {
      success: affected > 0,
    };
  }
}
