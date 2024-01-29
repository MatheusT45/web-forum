import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AnswerProvider } from '../providers/answer.provider';
import { AnswerService } from '../services/answer.service';
import { QuestionProvider } from 'src/providers/question.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...AnswerProvider, ...QuestionProvider, AnswerService],
})
export class AnswerModule {}
