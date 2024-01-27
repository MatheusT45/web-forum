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
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@Controller()
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Get('questionarios')
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Exercise>> {
    return this.service.findAll(query);
  }

  @Post('questionario')
  create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.service.create(createExerciseDto);
  }

  @Patch('questionario/:id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    return this.service.update(+id, updateExerciseDto);
  }

  @Delete('questionario/:id')
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.remove(+id);
  }
}
