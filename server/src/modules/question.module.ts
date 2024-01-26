import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { QuestionProvider } from '../providers/question.provider';
import { QuestionService } from '../services/question.service';

@Module({
  imports: [DatabaseModule],
  providers: [...QuestionProvider, QuestionService],
})
export class QuestionModule {}
