import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AnswerService } from '../services/answer.service';
import { Answer } from 'src/entities/answer.entity';
import { CreateAnswerDto } from 'src/dto/answer/create-answer.dto';
import { UpdateAnswerDto } from 'src/dto/answer/update-answer.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@Controller('answers')
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.service.create(createAnswerDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Answer>> {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Answer> {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<Answer> {
    return this.service.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.service.remove(+id);
  }
}
