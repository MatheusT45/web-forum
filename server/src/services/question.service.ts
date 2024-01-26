import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionDto } from 'src/dto/question/create-question.dto';
import { UpdateQuestionDto } from 'src/dto/question/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    private repository: Repository<Question>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return await this.repository.save(createQuestionDto);
  }

  async findOne(id: number): Promise<Question> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
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
