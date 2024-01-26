import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AnswerProvider } from '../providers/answer.provider';
import { AnswerService } from '../services/answer.service';

@Module({
  imports: [DatabaseModule],
  providers: [...AnswerProvider, AnswerService],
})
export class AnswerModule {}
