import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AnswerProvider } from './answer.provider';
import { AnswerService } from './answer.service';

@Module({
  imports: [DatabaseModule],
  providers: [...AnswerProvider, AnswerService],
})
export class AnswerModule {}
