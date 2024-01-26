import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';
import { CreateExerciseDto } from 'src/dto/exercise/create-exercise.dto';
import { UpdateExerciseDto } from 'src/dto/exercise/update-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @Inject('EXERCISE_REPOSITORY')
    private repository: Repository<Exercise>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return await this.repository.save(createExerciseDto);
  }

  async findOne(id: number): Promise<Exercise> {
    return await this.repository.findOne({ where: { id } });
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
