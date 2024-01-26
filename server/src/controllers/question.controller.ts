import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { Question } from 'src/entities/question.entity';
import { CreateQuestionDto } from 'src/dto/question/create-question.dto';
import { UpdateQuestionDto } from 'src/dto/question/update-question.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@Controller('questions')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.service.create(createQuestionDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Question>> {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Question> {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.service.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.remove(+id);
  }
}
