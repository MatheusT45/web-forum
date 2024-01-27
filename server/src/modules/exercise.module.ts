import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExerciseProvider } from '../providers/exercise.provider';
import { ExerciseService } from '../services/exercise.service';
import { QuestionProvider } from 'src/providers/question.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...ExerciseProvider, ...QuestionProvider, ExerciseService],
})
export class ExerciseModule {}
