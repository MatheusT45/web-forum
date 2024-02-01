import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnswerService } from '../services/answer.service';
import { Answer } from 'src/entities/answer.entity';
import { AnswerDto } from 'src/dtos/answer.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@Controller()
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  @Get('questionario/:exerciseId/respostas')
  findAll(
    @Param('exerciseId') exerciseId: string,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Answer>> {
    return this.service.findAll(+exerciseId, query);
  }

  @Post('questionario/:exerciseId/resposta')
  create(
    @Param('exerciseId') exerciseId: string,
    @Body() createAnswerDto: AnswerDto[],
  ): Promise<Answer[]> {
    return this.service.create(+exerciseId, createAnswerDto);
  }

  @Put('questionario/:exerciseId/resposta/:answerId')
  update(
    @Param('exerciseId') exerciseId: string,
    @Param('answerId') answerId: string,
    @Body() updateAnswerDto: Partial<AnswerDto>,
  ): Promise<Answer> {
    return this.service.update(+exerciseId, +answerId, updateAnswerDto);
  }

  @Delete('questionario/:exerciseId/resposta/:answerId')
  remove(
    @Param('exerciseId') exerciseId: string,
    @Param('answerId') answerId: string,
  ): Promise<{ success: boolean }> {
    return this.service.remove(+exerciseId, +answerId);
  }
}
