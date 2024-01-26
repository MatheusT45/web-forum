import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { CreateAnswerDto } from 'src/dto/answer/create-answer.dto';
import { UpdateAnswerDto } from 'src/dto/answer/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_REPOSITORY')
    private repository: Repository<Answer>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return await this.repository.save(createAnswerDto);
  }

  async findOne(id: number): Promise<Answer> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const { affected } = await this.repository.update(id, updateAnswerDto);
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
