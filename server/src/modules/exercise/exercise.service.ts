import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @Inject('USER_REPOSITORY')
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }
}
