import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { QuestionDto } from 'src/dtos/question.dto';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class QuestionService {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    private repository: Repository<Question>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Question>> {
    return paginate(query, this.repository, {
      sortableColumns: ['id', 'description'],
      nullSort: 'last',
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['description'],
      select: ['id', 'description', 'createdAt', 'updatedAt'],
      filterableColumns: {
        description: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async create(createQuestionDto: QuestionDto): Promise<Question> {
    return await this.repository.save(createQuestionDto);
  }

  async update(
    id: number,
    updateQuestionDto: Partial<QuestionDto>,
  ): Promise<Question> {
    const { affected } = await this.repository.update(id, updateQuestionDto);
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
