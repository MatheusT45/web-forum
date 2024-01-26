import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('USER_REPOSITORY')
    private answerRepository: Repository<Answer>,
  ) {}

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }
}
