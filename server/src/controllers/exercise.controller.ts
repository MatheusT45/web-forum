import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from 'src/entities/exercise.entity';
import { CreateExerciseDto } from 'src/dto/exercise/create-exercise.dto';
import { UpdateExerciseDto } from 'src/dto/exercise/update-exercise.dto';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.service.create(createExerciseDto);
  }

  @Get()
  findAll(): Promise<Exercise[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Exercise> {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    return this.service.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.remove(+id);
  }
}
