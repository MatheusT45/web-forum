import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { QuestionProvider } from './question.provider';
import { QuestionService } from './question.service';

@Module({
  imports: [DatabaseModule],
  providers: [...QuestionProvider, QuestionService],
})
export class QuestionModule {}
