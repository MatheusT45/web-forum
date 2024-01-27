import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AnswerProvider } from '../providers/answer.provider';
import { AnswerService } from '../services/answer.service';
import { ExerciseProvider } from 'src/providers/exercise.provider';
import { QuestionProvider } from 'src/providers/question.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...AnswerProvider,
    ...ExerciseProvider,
    ...QuestionProvider,
    AnswerService,
  ],
})
export class AnswerModule {}
