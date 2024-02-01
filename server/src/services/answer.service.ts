import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { CreateAnswerDto } from 'src/dto/answer/create-answer.dto';
import { UpdateAnswerDto } from 'src/dto/answer/update-answer.dto';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Question } from 'src/entities/question.entity';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_REPOSITORY')
    private answerRepository: Repository<Answer>,
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
  ) {}

  public findAll(
    exerciseId: number,
    query: PaginateQuery,
  ): Promise<Paginated<Answer>> {
    return paginate(query, this.answerRepository, {
      relations: ['question', 'user'],
      sortableColumns: ['id', 'description'],
      nullSort: 'last',
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['description'],
      select: [
        'id',
        'description',
        'createdAt',
        'question.id',
        'question.description',
        'user.id',
        'user.name',
        'user.cpf',
      ],
      filterableColumns: {
        description: [FilterOperator.EQ, FilterSuffix.NOT],
        id: true,
        user: true,
      },
      where: { question: { exercise: { id: exerciseId } } },
    });
  }

  async create(
    exerciseId: number,
    createAnswerDto: CreateAnswerDto[],
  ): Promise<Answer[]> {
    const answers = [];
    for (const answer of createAnswerDto) {
      const question = await this.questionRepository.findOne({
        where: { id: answer.questionId },
        relations: ['exercise'],
      });

      if (question.exercise.id !== exerciseId) {
        throw new Error('Invalid question');
      }

      answers.push(await this.answerRepository.save({ ...answer, question }));
    }

    return answers;
  }

  async update(
    exerciseId: number,
    answerId: number,
    updateAnswerDto: UpdateAnswerDto,
  ): Promise<Answer> {
    const question = await this.questionRepository.findOne({
      where: { id: updateAnswerDto.questionId },
      relations: ['exercise'],
    });

    if (question.exercise.id !== exerciseId) {
      throw new Error('Invalid question');
    }

    const { affected } = await this.answerRepository.update(
      answerId,
      updateAnswerDto,
    );

    if (affected > 0) {
      return this.answerRepository.findOne({ where: { id: answerId } });
    }
  }

  async remove(
    exerciseId: number,
    answerId: number,
  ): Promise<{ success: boolean }> {
    const { affected } = await this.answerRepository.delete(answerId);
    return {
      success: affected > 0,
    };
  }
}
