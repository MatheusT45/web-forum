import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ExerciseService } from '../services/exercise.service';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseDto } from '../dtos/exercise.dto';

@Controller()
export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  @Get('questionarios')
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Exercise>> {
    return this.service.findAll(query);
  }

  @Get('questionario/:id')
  find(@Param('id') id: string): Promise<Exercise> {
    return this.service.find(+id);
  }

  @Post('questionario')
  create(@Body() createExerciseDto: ExerciseDto): Promise<Exercise> {
    return this.service.create(createExerciseDto);
  }

  @Patch('questionario/:id')
  updatePatch(
    @Param('id') id: string,
    @Body() updateExerciseDto: Partial<ExerciseDto>,
  ): Promise<Exercise> {
    return this.service.patch(+id, updateExerciseDto);
  }

  @Put('questionario/:id')
  updatePut(
    @Body() updateExerciseDto: ExerciseDto,
    @Param('id') id?: string,
  ): Promise<Exercise> {
    return this.service.put(updateExerciseDto, +id);
  }

  @Delete('questionario/:id')
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.remove(+id);
  }
}
